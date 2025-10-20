import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import streamBuffers from 'stream-buffers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Cloudflare R2 (S3-compatible)
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT, // https://<account_id>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["https://js.stripe.com", "https://hooks.stripe.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(mongoSanitize());

// 圧縮ミドルウェアの追加（レスポンスを圧縮して転送量を削減）
app.use(compression());

// DDoS Protection - Rate limiting
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'RATE_LIMIT' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'RATE_LIMIT' }
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 10,
  delayMs: 500
});

app.use(generalLimiter);
app.use(speedLimiter);

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Configure multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

// In-memory storage for submissions (replace with database in production)
const submissions = new Map();

// Deadline check
const DEADLINE = new Date('2025-11-30T23:59:59');

function isDeadlinePassed() {
  return new Date() > DEADLINE;
}

// Cloudflare R2 storage management functions
async function uploadToR2(fileBuffer, fileName, mimeType) {
  try {
    const bucketName = process.env.R2_BUCKET_NAME || 'japan-ai-film-competition';
    const key = `submissions/${fileName}`;

    // Upload to R2
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await r2Client.send(putCommand);
    console.log('File uploaded successfully to R2:', key);

    // Generate a presigned URL for viewing (valid for 365 days)
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const viewLink = await getSignedUrl(r2Client, getCommand, { expiresIn: 365 * 24 * 60 * 60 });

    return {
      fileId: key,
      fileName: fileName,
      viewLink: viewLink,
      downloadLink: viewLink,
      size: fileBuffer.length
    };
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw new Error('UPLOAD_FAILED');
  }
}

// Initialize submission
app.post('/api/submit/init', strictLimiter, [
  body('name').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('filmTitle').trim().notEmpty().isLength({ max: 200 }).escape(),
  body('language').isIn(['ja', 'en']),
  body('fileSize').isNumeric().custom(value => value <= 500 * 1024 * 1024),
  body('fileName').trim().notEmpty()
], async (req, res) => {
  if (isDeadlinePassed()) {
    return res.status(403).json({
      success: false,
      error: 'DEADLINE_PASSED',
      message: 'Submission deadline has passed'
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_INPUT',
      details: errors.array()
    });
  }

  try {
    const { name, email, filmTitle, language, fileSize, fileName } = req.body;
    const submissionId = uuidv4();

    submissions.set(submissionId, {
      id: submissionId,
      name,
      email,
      filmTitle,
      language,
      fileSize,
      fileName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ip: req.ip
    });

    // Auto-cleanup after 1 hour if not completed
    setTimeout(() => {
      const submission = submissions.get(submissionId);
      if (submission && submission.status === 'pending') {
        submissions.delete(submissionId);
      }
    }, 60 * 60 * 1000);

    res.json({ success: true, submissionId });
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
});

// Upload video file to Cloudinary
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (isDeadlinePassed()) {
    return res.status(403).json({
      success: false,
      error: 'DEADLINE_PASSED'
    });
  }

  try {
    const { submissionId } = req.body;
    console.log('Upload request received for submission:', submissionId);

    if (!submissionId || !submissions.has(submissionId)) {
      console.error('Invalid submission ID:', submissionId);
      return res.status(400).json({ success: false, error: 'INVALID_SUBMISSION_ID' });
    }

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ success: false, error: 'NO_FILE_UPLOADED' });
    }

    console.log('File received:', {
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    const submission = submissions.get(submissionId);

    // Upload to R2
    const uniqueFileName = `${submissionId}_${Date.now()}_${req.file.originalname}`;
    console.log('Uploading to R2:', uniqueFileName);

    const r2File = await uploadToR2(
      req.file.buffer,
      uniqueFileName,
      req.file.mimetype
    );

    console.log('R2 upload successful:', r2File.fileId);

    submission.r2FileId = r2File.fileId;
    submission.r2FileName = r2File.fileName;
    submission.r2ViewLink = r2File.viewLink;
    submission.r2DownloadLink = r2File.downloadLink;
    submission.uploadedAt = new Date().toISOString();

    submissions.set(submissionId, submission);

    res.json({
      success: true,
      fileId: r2File.fileId,
      viewLink: r2File.viewLink
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'UPLOAD_FAILED',
      message: error.message || 'Failed to upload to cloud storage'
    });
  }
});

// Create Stripe Payment Intent (supports Apple Pay)
app.post('/api/create-payment-intent', async (req, res) => {
  if (isDeadlinePassed()) {
    return res.status(403).json({
      success: false,
      error: 'DEADLINE_PASSED'
    });
  }

  try {
    const { submissionId, language, paymentMethod } = req.body;
    console.log('Payment intent request for submission:', submissionId);

    if (!submissionId || !submissions.has(submissionId)) {
      console.error('Invalid submission ID for payment:', submissionId);
      return res.status(400).json({ success: false, error: 'INVALID_SUBMISSION_ID' });
    }

    const submission = submissions.get(submissionId);

    if (!submission.r2FileId) {
      console.error('File not uploaded for submission:', submissionId);
      return res.status(400).json({ success: false, error: 'FILE_NOT_UPLOADED' });
    }

    console.log('Creating Stripe payment intent...');

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // ¥2,000 in cents (JPY doesn't use decimal)
      currency: 'jpy',
      payment_method_types: ['card'],
      metadata: {
        submissionId: submissionId,
        filmTitle: submission.filmTitle,
        applicantName: submission.name
      }
    });

    console.log('Stripe payment intent created:', paymentIntent.id);

    submission.stripePaymentIntentId = paymentIntent.id;
    submissions.set(submissionId, submission);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    res.status(500).json({
      success: false,
      error: 'PAYMENT_CREATION_FAILED',
      message: error.message || 'Failed to create payment intent'
    });
  }
});


// Confirm Stripe payment and send email
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Find submission by payment intent ID
    let submission = null;
    for (const [id, sub] of submissions.entries()) {
      if (sub.stripePaymentIntentId === paymentIntentId) {
        submission = sub;
        submission.status = 'completed';
        submission.paymentStatus = 'paid';
        submission.completedAt = new Date().toISOString();
        submissions.set(id, submission);
        break;
      }
    }

    if (!submission) {
      return res.status(404).json({ success: false, error: 'SUBMISSION_NOT_FOUND' });
    }

    // Send confirmation email
    await sendConfirmationEmail(submission);

    res.json({ success: true, submission });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
});


// Helper function to send confirmation email
async function sendConfirmationEmail(submission) {
  const emailContent = submission.language === 'ja' ? {
    subject: 'Japan AI Short Film Competition - 応募完了',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #000; margin-bottom: 24px;">応募ありがとうございます</h2>
        <p style="color: #666; margin-bottom: 16px;">以下の内容で応募を受け付けました:</p>
        <div style="background: #f5f5f5; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="margin: 8px 0;"><strong>お名前:</strong> ${submission.name}</p>
          <p style="margin: 8px 0;"><strong>作品タイトル:</strong> ${submission.filmTitle}</p>
          <p style="margin: 8px 0;"><strong>応募ID:</strong> ${submission.id}</p>
          <p style="margin: 8px 0;"><strong>動画リンク:</strong> <a href="${submission.r2ViewLink}" style="color: #0066cc;">動画を表示</a></p>
        </div>
        <p style="color: #666; margin-bottom: 16px;">受賞者発表は2025年12月12日を予定しております。</p>

        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="color: #856404; margin: 0; font-weight: bold;">⚠️ 重要なお知らせ</p>
          <p style="color: #856404; margin: 8px 0 0 0;">このメールは自動送信されています。このメールには返信しないでください。</p>
        </div>

        <div style="border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 32px;">
          <h3 style="color: #000; margin-bottom: 12px;">お問い合わせ</h3>
          <p style="color: #666; margin-bottom: 8px;">ご質問やお問い合わせは以下までご連絡ください:</p>
          <p style="margin: 0;">
            <strong>Email:</strong> <a href="mailto:japanaishortfilmcompetition@gmail.com" style="color: #0066cc;">japanaishortfilmcompetition@gmail.com</a>
          </p>
        </div>

        <p style="color: #999; font-size: 14px; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          Japan AI Short Film Competition 運営チーム<br/>
          © 2025 JAPAN AI SHORT FILM COMPETITION. All rights reserved.
        </p>
      </div>
    `
  } : {
    subject: 'Japan AI Short Film Competition - Submission Confirmed',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #000; margin-bottom: 24px;">Thank you for your submission</h2>
        <p style="color: #666; margin-bottom: 16px;">We have received your submission with the following details:</p>
        <div style="background: #f5f5f5; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${submission.name}</p>
          <p style="margin: 8px 0;"><strong>Film Title:</strong> ${submission.filmTitle}</p>
          <p style="margin: 8px 0;"><strong>Submission ID:</strong> ${submission.id}</p>
          <p style="margin: 8px 0;"><strong>Video Link:</strong> <a href="${submission.r2ViewLink}" style="color: #0066cc;">View Video</a></p>
        </div>
        <p style="color: #666; margin-bottom: 16px;">Winners will be announced on December 12, 2025.</p>

        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="color: #856404; margin: 0; font-weight: bold;">⚠️ Important Notice</p>
          <p style="color: #856404; margin: 8px 0 0 0;">This email was sent automatically. Please do not reply to this email.</p>
        </div>

        <div style="border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 32px;">
          <h3 style="color: #000; margin-bottom: 12px;">Contact Us</h3>
          <p style="color: #666; margin-bottom: 8px;">If you have any questions, please contact us at:</p>
          <p style="margin: 0;">
            <strong>Email:</strong> <a href="mailto:japanaishortfilmcompetition@gmail.com" style="color: #0066cc;">japanaishortfilmcompetition@gmail.com</a>
          </p>
        </div>

        <p style="color: #999; font-size: 14px; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
          Japan AI Short Film Competition Team<br/>
          © 2025 JAPAN AI SHORT FILM COMPETITION. All rights reserved.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: submission.email,
      subject: emailContent.subject,
      html: emailContent.html
    });
  } catch (emailError) {
    console.error('Email sending error:', emailError);
    // Don't fail the whole operation if email fails
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const r2Configured = !!(process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME);

  res.json({
    status: 'ok',
    deadline: DEADLINE.toISOString(),
    deadlinePassed: isDeadlinePassed(),
    cloudStorage: 'Cloudflare R2',
    cloudStorageStatus: r2Configured ? 'configured' : 'not configured',
    maxFileSize: '500MB',
    paymentMethods: ['Stripe (Credit Card, Apple Pay, Google Pay)']
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Deadline: ${DEADLINE.toISOString()}`);
  console.log(`Deadline passed: ${isDeadlinePassed()}`);
  console.log(`Cloud Storage: Cloudflare R2`);
  console.log(`Max File Size: 500MB`);
  console.log(`Payment Methods: Stripe (Credit Card, Apple Pay, Google Pay)`);
});
