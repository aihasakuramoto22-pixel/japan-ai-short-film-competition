import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';

const translations = {
  ja: {
    title: 'お問い合わせ',
    subtitle: 'ご質問やご不明な点がございましたら、お気軽にお問い合わせください。',
    name: 'お名前',
    namePlaceholder: '山田 太郎',
    email: 'メールアドレス',
    emailPlaceholder: 'your.email@example.com',
    subject: '件名',
    subjectPlaceholder: '件名を入力してください',
    message: 'メッセージ',
    messagePlaceholder: 'お問い合わせ内容を入力してください',
    send: '送信する',
    sending: '送信中...',
    backHome: 'ホームに戻る',
    directEmail: 'または、直接メールを送信',
    directEmailDesc: '下記のメールアドレスに直接お問い合わせいただくことも可能です。'
  },
  en: {
    title: 'Contact Us',
    subtitle: 'If you have any questions or concerns, please feel free to contact us.',
    name: 'Name',
    namePlaceholder: 'John Doe',
    email: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'Enter subject',
    message: 'Message',
    messagePlaceholder: 'Enter your message',
    send: 'Send',
    sending: 'Sending...',
    backHome: 'Back to Home',
    directEmail: 'Or, send email directly',
    directEmailDesc: 'You can also contact us directly at the email address below.'
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState('ja');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const userLang = navigator.language.toLowerCase();
    if (userLang.startsWith('ja')) {
      setLang('ja');
    } else {
      setLang('en');
    }
  }, []);

  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link
    const mailtoLink = `mailto:japanaishortfilmcompetition@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-80 backdrop-blur-xl z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold hover:text-gray-600 transition-colors">
            JAPAN AI SHORT FILM COMPETITION
          </Link>
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className="text-sm text-gray-600 hover:text-black transition-colors font-medium"
          >
            {lang === 'ja' ? 'EN' : '日本語'}
          </button>
        </div>
      </nav>

      {/* Contact Form Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Mail className="w-16 h-16 mx-auto mb-6 text-gray-400" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {t.subject}
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t.subjectPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t.message}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-xl transition-all inline-flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {t.send}
            </button>
          </form>

          {/* Direct Email Option */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-2">{t.directEmail}</p>
            <p className="text-gray-600 mb-4">{t.directEmailDesc}</p>
            <a
              href="mailto:japanaishortfilmcompetition@gmail.com"
              className="text-black hover:text-gray-600 transition-colors font-medium text-lg"
            >
              japanaishortfilmcompetition@gmail.com
            </a>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← {t.backHome}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Japan AI Short Film Competition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
