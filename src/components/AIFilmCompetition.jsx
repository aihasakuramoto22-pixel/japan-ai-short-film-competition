import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Upload, Award, Calendar, Mail, Check, X, AlertCircle, Lock } from 'lucide-react';
import ProgressBar from './ProgressBar';
import PaymentIcons from './PaymentIcons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const DEADLINE = new Date('2025-11-30T23:59:59');

const translations = {
  ja: {
    title: 'Japan AI Short Film Competition',
    subtitle: 'AIが切り拓く、映像表現の新時代。',
    headline: '創造の、その先へ。',
    deadline: '応募締切',
    announcement: '受賞者発表',
    awards: '受賞部門',
    grandPrize: { name: 'グランプリ', slots: '1作品' },
    screenplay: { name: 'ベストストーリーテリング賞', slots: '3作品' },
    technical: { name: 'テクニカルエクセレンス賞', slots: '3作品' },
    creative: { name: 'クリエイティブビジョン賞', slots: '3作品' },
    pioneer: { name: 'イノベーション賞', slots: '3作品' },
    submitTitle: '応募する',
    email: 'メールアドレス',
    name: 'お名前',
    filmTitle: '作品タイトル',
    videoFile: '動画ファイル',
    selectFile: 'ファイルを選択',
    entryFee: '応募費: ¥2,000',
    entryFeeUSD: '約 ${usd}',
    agreeTerms: 'コンペティションの',
    terms: '利用規約',
    agreeTerms2: 'に同意したものとします。',
    submitButton: '支払いに進む',
    processing: '処理中...',
    successTitle: '応募完了',
    successMessage: '応募が完了しました。動画リンクと確認内容をメールでお送りしました。',
    errorTitle: 'エラー',
    fillAll: 'すべての項目を入力してください',
    uploadError: 'アップロードエラーが発生しました。もう一度お試しください。',
    paymentError: '支払いがキャンセルされました。',
    deadlinePassed: '応募期限が過ぎました',
    deadlineMessage: '応募受付は2025年11月30日に終了しました。',
    termsTitle: '利用規約',
    rateLimitError: 'リクエストが多すぎます。しばらくしてからもう一度お試しください。',
    termsContent: `1. 応募資格
本コンペティションは、世界中のすべてのクリエイターに開かれています。

2. 著作権
応募作品の著作権は、作者に帰属します。ただし、主催者は作品をプロモーション目的で使用する権利を有します。

3. 応募料
応募料は2,000円(税込)です。一度お支払いいただいた応募料は、いかなる理由があっても返金いたしません。

4. 作品の要件
• AIツールを使用して制作されたショートフィルムであること
• 長さは1分〜10分以内であること
• オリジナル作品であること
• 第三者の権利を侵害しないこと

5. 審査
審査は主催者が選定した審査員により行われます。審査基準や結果に関する問い合わせには応じかねます。

6. 発表
受賞作品は2025年12月12日に発表されます。

7. 免責事項
主催者は、応募作品の紛失、破損、遅延について一切の責任を負いません。

8. その他
本規約は予告なく変更される場合があります。応募をもって、本規約のすべてに同意したものとみなします。`,
    close: '閉じる'
  },
  en: {
    title: 'Japan AI Short Film Competition',
    subtitle: 'The new era of visual storytelling, powered by AI.',
    headline: 'Create.\nBeyond imagination.',
    deadline: 'Submission Deadline',
    announcement: 'Winner Announcement',
    awards: 'Award Categories',
    grandPrize: { name: 'Grand Prize', slots: '1 Winner' },
    screenplay: { name: 'Best Storytelling', slots: '3 Winners' },
    technical: { name: 'Technical Excellence', slots: '3 Winners' },
    creative: { name: 'Creative Vision', slots: '3 Winners' },
    pioneer: { name: 'Innovation', slots: '3 Winners' },
    submitTitle: 'Submit',
    email: 'Email Address',
    name: 'Your Name',
    filmTitle: 'Film Title',
    videoFile: 'Video File',
    selectFile: 'Select File',
    entryFee: 'Entry Fee: ¥2,000',
    entryFeeUSD: 'approx. ${usd}',
    agreeTerms: 'By submitting, you agree to the ',
    terms: 'Terms and Conditions',
    agreeTerms2: '.',
    submitButton: 'Proceed to Payment',
    processing: 'Processing...',
    successTitle: 'Submission Complete',
    successMessage: 'Your submission has been received. Video link and confirmation have been sent to your email.',
    errorTitle: 'Error',
    fillAll: 'Please fill in all fields',
    uploadError: 'Upload error occurred. Please try again.',
    paymentError: 'Payment was cancelled.',
    deadlinePassed: 'Deadline Passed',
    deadlineMessage: 'Submissions closed on November 30, 2025.',
    termsTitle: 'Terms and Conditions',
    rateLimitError: 'Too many requests. Please try again later.',
    termsContent: `1. Eligibility
This competition is open to all creators worldwide.

2. Copyright
Copyright of submitted works remains with the creator. However, the organizer reserves the right to use the works for promotional purposes.

3. Entry Fee
The entry fee is ¥2,000 (tax included). Entry fees are non-refundable under any circumstances.

4. Work Requirements
• Must be a short film created using AI tools
• Duration must be between 1-10 minutes
• Must be an original work
• Must not infringe on third-party rights

5. Judging
Judging will be conducted by judges selected by the organizer. Inquiries regarding judging criteria or results will not be accepted.

6. Announcement
Winners will be announced on December 12, 2025.

7. Disclaimer
The organizer assumes no responsibility for loss, damage, or delay of submitted works.

8. Other
These terms may be changed without notice. By submitting, you agree to all terms and conditions.`,
    close: 'Close'
  }
};

export default function AIFilmCompetition() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('ja');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    filmTitle: '',
    videoFile: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('uploading');
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState('');

  useEffect(() => {
    const userLang = navigator.language.toLowerCase();

    // Detect language based on browser settings
    if (userLang.startsWith('ja')) {
      setLang('ja');
    } else {
      setLang('en'); // Default to English
    }

    // Fetch exchange rate
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      // Using a free exchange rate API
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/JPY');
      const rate = response.data.rates.USD;
      setExchangeRate(rate);
      const usd = (2000 * rate).toFixed(2);
      setUsdAmount(`$${usd} USD`);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Fallback to approximate rate if API fails
      const fallbackRate = 0.0067; // Approximate JPY to USD rate
      setExchangeRate(fallbackRate);
      const usd = (2000 * fallbackRate).toFixed(2);
      setUsdAmount(`$${usd} USD`);
    }
  };

  // Check deadline
  useEffect(() => {
    const checkDeadline = () => {
      setIsDeadlinePassed(new Date() > DEADLINE);
    };
    checkDeadline();
    const interval = setInterval(checkDeadline, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const t = translations[lang];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        setErrorMessage('File size must be less than 500MB');
        setShowError(true);
        return;
      }
      setFormData({ ...formData, videoFile: file });
    }
  };

  const handleSubmit = async () => {
    if (isDeadlinePassed) {
      setErrorMessage(t.deadlineMessage);
      setShowError(true);
      return;
    }

    if (!formData.email || !formData.name || !formData.filmTitle || !formData.videoFile) {
      setErrorMessage(t.fillAll);
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadStage('uploading');
    const startTime = Date.now();

    try {
      // Step 1: Create submission record
      setUploadProgress(5);
      const initResponse = await axios.post(`${API_URL}/submit/init`, {
        name: formData.name,
        email: formData.email,
        filmTitle: formData.filmTitle,
        language: lang,
        fileSize: formData.videoFile.size,
        fileName: formData.videoFile.name
      });

      const initResult = initResponse.data;

      if (!initResult.success) {
        if (initResult.error === 'RATE_LIMIT') {
          throw new Error(t.rateLimitError);
        }
        throw new Error(initResult.error || 'Initialization failed');
      }

      // Step 2: Upload to InfiniCloud with progress tracking
      setUploadProgress(10);
      setUploadStage('uploading');

      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.videoFile);
      uploadFormData.append('submissionId', initResult.submissionId);

      const uploadResponse = await axios.post(`${API_URL}/upload`, uploadFormData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 70) / progressEvent.total) + 10;
          setUploadProgress(percentCompleted);

          // Calculate estimated time
          const elapsed = (Date.now() - startTime) / 1000;
          const rate = progressEvent.loaded / elapsed;
          const remaining = (progressEvent.total - progressEvent.loaded) / rate;
          setEstimatedTime(remaining);
        }
      });

      const uploadResult = uploadResponse.data;

      if (!uploadResult.success) {
        throw new Error(t.uploadError);
      }

      // Step 3: Processing payment with Stripe
      setUploadProgress(80);
      setUploadStage('processing');
      setEstimatedTime(null);

      const paymentResponse = await axios.post(`${API_URL}/create-payment-intent`, {
        submissionId: initResult.submissionId,
        language: lang
      });

      const paymentResult = paymentResponse.data;

      if (!paymentResult.success) {
        throw new Error('Payment creation failed');
      }

      setUploadProgress(90);

      // Store submission ID and payment info for Stripe checkout
      sessionStorage.setItem('submissionId', initResult.submissionId);
      sessionStorage.setItem('clientSecret', paymentResult.clientSecret);
      sessionStorage.setItem('paymentIntentId', paymentResult.paymentIntentId);

      setUploadProgress(100);
      setUploadStage('complete');

      // Redirect to Stripe payment page
      setTimeout(() => {
        navigate('/payment');
      }, 500);

    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'An error occurred');
      setShowError(true);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-80 backdrop-blur-xl z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/about" className="text-xl font-semibold hover:text-gray-600 transition-colors">
            JAPAN AI FILM COMPETITION
          </Link>
          <div className="flex items-center gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-sm text-gray-600 hover:text-black bg-transparent border border-gray-300 rounded px-2 py-1 cursor-pointer transition-colors"
            >
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight whitespace-pre-line">
            {t.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Dates Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">{t.deadline}</p>
              <p className="text-3xl font-semibold">November 30</p>
              <p className="text-gray-500">2025</p>
            </div>
            <div className="text-center p-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">{t.announcement}</p>
              <p className="text-3xl font-semibold">December 12</p>
              <p className="text-gray-500">2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16">{t.awards}</h2>

          {/* Grand Prize */}
          <div className="mb-12 p-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl">
            <Award className="w-16 h-16 mb-6" />
            <h3 className="text-3xl font-semibold mb-2">{t.grandPrize.name}</h3>
            <p className="text-gray-400">{t.grandPrize.slots}</p>
          </div>

          {/* Other Awards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.screenplay.name}</h3>
              <p className="text-gray-500 text-sm">{t.screenplay.slots}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.technical.name}</h3>
              <p className="text-gray-500 text-sm">{t.technical.slots}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.creative.name}</h3>
              <p className="text-gray-500 text-sm">{t.creative.slots}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.pioneer.name}</h3>
              <p className="text-gray-500 text-sm">{t.pioneer.slots}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16">{t.submitTitle}</h2>

          {isDeadlinePassed ? (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200 text-center">
              <Lock className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-semibold mb-4">{t.deadlinePassed}</h3>
              <p className="text-gray-600">{t.deadlineMessage}</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">{t.name}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
                    placeholder={t.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">{t.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
                    placeholder={t.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">{t.filmTitle}</label>
                  <input
                    type="text"
                    value={formData.filmTitle}
                    onChange={(e) => setFormData({ ...formData, filmTitle: e.target.value })}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
                    placeholder={t.filmTitle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">{t.videoFile}</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center gap-3 w-full px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {formData.videoFile ? formData.videoFile.name : t.selectFile}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <p className="font-semibold text-lg">{t.entryFee}</p>
                  {usdAmount && (
                    <p className="text-sm text-gray-600 mt-1">{t.entryFeeUSD.replace('${usd}', usdAmount)}</p>
                  )}
                </div>

                {/* Payment Methods */}
                <PaymentIcons />

                <div className="text-center text-sm text-gray-500">
                  {t.agreeTerms}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-black hover:underline font-medium"
                  >
                    {t.terms}
                  </button>
                  {t.agreeTerms2}
                </div>

                {/* Progress Bar */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="mb-6">
                    <ProgressBar
                      progress={uploadProgress}
                      stage={uploadStage}
                      estimatedTime={estimatedTime}
                      lang={lang}
                    />
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isSubmitting ? t.processing : t.submitButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Japan AI Short Film Competition</p>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.successTitle}</h3>
              <p className="text-gray-600 mb-8">{t.successMessage}</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-xl transition-all"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.errorTitle}</h3>
              <p className="text-gray-600 mb-8">{errorMessage}</p>
              <button
                onClick={() => setShowError(false)}
                className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-xl transition-all"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full my-8 shadow-2xl">
            <h3 className="text-3xl font-semibold mb-6">{t.termsTitle}</h3>
            <div className="text-gray-700 space-y-4 max-h-96 overflow-y-auto mb-8 whitespace-pre-line leading-relaxed">
              {t.termsContent}
            </div>
            <button
              onClick={() => setShowTerms(false)}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-xl transition-all"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
