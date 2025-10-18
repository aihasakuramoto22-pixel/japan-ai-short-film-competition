import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Film, Lightbulb, Users, Trophy } from 'lucide-react';

const translations = {
  ja: {
    title: 'Japan AI Short Film Competition について',
    subtitle: 'AIが切り拓く、映像表現の新時代',
    overview: '概要',
    overviewText: 'Japan AI Short Film Competition (JAISFC) は、AI技術を活用した短編映画の可能性を探求し、クリエイターの創造性を称えるコンペティションです。世界中のクリエイターが、AIツールを使用して制作した独創的な作品を応募できます。',
    mission: 'ミッション',
    missionText: '私たちは、AI技術と人間の創造性を融合させた新しい映像表現の形を発見し、次世代のストーリーテリングを推進することを目指しています。',
    categories: '受賞部門',
    grandPrize: 'グランプリ',
    grandPrizeDesc: '最も優れた作品に贈られる最高賞',
    storytelling: 'ベストストーリーテリング賞',
    storytellingDesc: '物語性と構成が優れた作品',
    technical: 'テクニカルエクセレンス賞',
    technicalDesc: '技術的な完成度が高い作品',
    creative: 'クリエイティブビジョン賞',
    creativeDesc: '独創的な視点と表現が光る作品',
    innovation: 'イノベーション賞',
    innovationDesc: 'AI技術の革新的な使用が見られる作品',
    timeline: 'スケジュール',
    submissionPeriod: '応募期間',
    submissionDate: '2025年11月30日まで',
    announcementDate: '受賞発表',
    announcement: '2025年12月12日',
    requirements: '応募要件',
    req1: 'AIツールを使用して制作された短編映画',
    req2: '長さは1分〜10分以内',
    req3: 'オリジナル作品であること',
    req4: '第三者の権利を侵害しないこと',
    entryFee: '審査費: ¥2,000',
    applyNow: '今すぐ応募する',
    backToHome: 'ホームに戻る'
  },
  en: {
    title: 'About Japan AI Short Film Competition',
    subtitle: 'The new era of visual storytelling, powered by AI',
    overview: 'Overview',
    overviewText: 'The Japan AI Short Film Competition (JAISFC) is a competition that explores the possibilities of short films utilizing AI technology and celebrates the creativity of creators. Creators from around the world can submit their original works created using AI tools.',
    mission: 'Mission',
    missionText: 'We aim to discover new forms of visual expression that fuse AI technology with human creativity and promote next-generation storytelling.',
    categories: 'Award Categories',
    grandPrize: 'Grand Prize',
    grandPrizeDesc: 'The highest award for the most outstanding work',
    storytelling: 'Best Storytelling',
    storytellingDesc: 'Works with excellent narrative and composition',
    technical: 'Technical Excellence',
    technicalDesc: 'Works with high technical perfection',
    creative: 'Creative Vision',
    creativeDesc: 'Works with unique perspectives and expressions',
    innovation: 'Innovation Award',
    innovationDesc: 'Works showing innovative use of AI technology',
    timeline: 'Timeline',
    submissionPeriod: 'Submission Period',
    submissionDate: 'Until November 30, 2025',
    announcementDate: 'Winner Announcement',
    announcement: 'December 12, 2025',
    requirements: 'Requirements',
    req1: 'Short film created using AI tools',
    req2: 'Duration between 1-10 minutes',
    req3: 'Must be an original work',
    req4: 'Must not infringe on third-party rights',
    entryFee: 'Screening Fee: ¥2,000',
    applyNow: 'Apply Now',
    backToHome: 'Back to Home'
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    const userLang = navigator.language.toLowerCase();
    if (userLang.startsWith('ja')) {
      setLang('ja');
    } else if (userLang.startsWith('zh')) {
      setLang('zh');
    } else if (userLang.startsWith('ko')) {
      setLang('ko');
    } else if (userLang.startsWith('es')) {
      setLang('es');
    } else if (userLang.startsWith('fr')) {
      setLang('fr');
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
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-sm text-gray-600 hover:text-black bg-transparent border border-gray-300 rounded px-2 py-1 cursor-pointer transition-colors"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ko">한국어</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">{t.overview}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t.overviewText}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">{t.mission}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.missionText}
          </p>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Trophy className="w-8 h-8" />
            <h2 className="text-4xl font-semibold">{t.categories}</h2>
          </div>

          {/* Grand Prize */}
          <div className="mb-8 p-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl">
            <Award className="w-16 h-16 mb-4" />
            <h3 className="text-3xl font-semibold mb-2">{t.grandPrize}</h3>
            <p className="text-gray-400">{t.grandPrizeDesc}</p>
          </div>

          {/* Other Awards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.storytelling}</h3>
              <p className="text-gray-600 text-sm">{t.storytellingDesc}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.technical}</h3>
              <p className="text-gray-600 text-sm">{t.technicalDesc}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.creative}</h3>
              <p className="text-gray-600 text-sm">{t.creativeDesc}</p>
            </div>
            <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t.innovation}</h3>
              <p className="text-gray-600 text-sm">{t.innovationDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Calendar className="w-8 h-8" />
            <h2 className="text-4xl font-semibold">{t.timeline}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">{t.submissionPeriod}</p>
              <p className="text-3xl font-semibold mb-2">November 30</p>
              <p className="text-gray-500">2025</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">{t.announcementDate}</p>
              <p className="text-3xl font-semibold mb-2">December 12</p>
              <p className="text-gray-500">2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Users className="w-8 h-8" />
            <h2 className="text-4xl font-semibold">{t.requirements}</h2>
          </div>

          <div className="bg-gray-50 rounded-3xl p-12">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-700">{t.req1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-700">{t.req2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-700">{t.req3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-700">{t.req4}</span>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-gray-300">
              <p className="text-2xl font-semibold text-center">{t.entryFee}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">
            {lang === 'ja' ? '創造の、その先へ。' : 'Create. Beyond imagination.'}
          </h2>
          <Link
            to="/"
            className="inline-block bg-white text-black font-medium px-12 py-4 rounded-xl hover:bg-gray-100 transition-all text-lg"
          >
            {t.applyNow}
          </Link>
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
