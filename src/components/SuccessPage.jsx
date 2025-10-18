import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, Calendar, Home } from 'lucide-react';

const translations = {
  ja: {
    title: '応募完了',
    thankYou: '応募ありがとうございます',
    message: 'あなたの作品を受け付けました。確認メールと動画リンクをお送りしましたので、ご確認ください。',
    whatNext: '次のステップ',
    step1Title: '確認メールをチェック',
    step1Desc: '応募内容の確認メールが届きます。メールが届かない場合は、迷惑メールフォルダをご確認ください。',
    step2Title: '審査結果を待つ',
    step2Desc: '受賞者は2025年12月12日に発表されます。発表はメールでお知らせします。',
    step3Title: '作品をシェア',
    step3Desc: 'SNSで作品や応募についてシェアしていただけると嬉しいです。',
    importantNote: '重要なお知らせ',
    autoEmail: 'このメールは自動送信されています。このメールには返信しないでください。',
    contact: 'お問い合わせ',
    contactInfo: 'ご質問やお問い合わせは以下までご連絡ください:',
    contactEmail: 'contact@jaisfc.com',
    backHome: 'ホームに戻る',
    learnMore: 'コンペティションについて詳しく見る'
  },
  en: {
    title: 'Submission Complete',
    thankYou: 'Thank you for your submission',
    message: 'We have received your submission. A confirmation email with your video link has been sent to you.',
    whatNext: 'What\'s Next',
    step1Title: 'Check Your Email',
    step1Desc: 'You will receive a confirmation email with your submission details. If you don\'t see it, please check your spam folder.',
    step2Title: 'Wait for Results',
    step2Desc: 'Winners will be announced on December 12, 2025. You will be notified via email.',
    step3Title: 'Share Your Work',
    step3Desc: 'We\'d love it if you shared your submission and experience on social media.',
    importantNote: 'Important Note',
    autoEmail: 'This email was sent automatically. Please do not reply to this email.',
    contact: 'Contact Us',
    contactInfo: 'If you have any questions, please contact us at:',
    contactEmail: 'contact@jaisfc.com',
    backHome: 'Back to Home',
    learnMore: 'Learn more about the competition'
  }
};

export default function SuccessPage() {
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    const userLang = navigator.language.toLowerCase();
    if (userLang.startsWith('ja')) {
      setLang('ja');
    } else {
      setLang('en');
    }
  }, []);

  const t = translations[lang];

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
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            {lang === 'ja' ? 'EN' : '日本語'}
          </button>
        </div>
      </nav>

      {/* Success Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            {t.thankYou}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t.message}
          </p>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            {t.whatNext}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step1Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step2Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step3Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              {t.importantNote}
            </h3>
            <p className="text-gray-700 mb-6">
              {t.autoEmail}
            </p>

            <div className="border-t border-yellow-200 pt-6">
              <h4 className="font-semibold mb-3">{t.contact}</h4>
              <p className="text-gray-700 mb-2">{t.contactInfo}</p>
              <a
                href="mailto:contact@jaisfc.com"
                className="text-black font-medium hover:underline inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {t.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-black text-white font-medium px-8 py-4 rounded-xl hover:bg-gray-800 transition-all"
            >
              {t.backHome}
            </Link>
            <Link
              to="/about"
              className="inline-block bg-white border-2 border-black text-black font-medium px-8 py-4 rounded-xl hover:bg-gray-50 transition-all"
            >
              {t.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Japan AI Short Film Competition</p>
        </div>
      </footer>
    </div>
  );
}
