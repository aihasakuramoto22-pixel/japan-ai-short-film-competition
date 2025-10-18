import React from 'react';

const translations = {
  ja: {
    uploading: 'アップロード中',
    processing: '処理中',
    complete: '完了',
    estimatedTime: '残り予想時間'
  },
  en: {
    uploading: 'Uploading',
    processing: 'Processing',
    complete: 'Complete',
    estimatedTime: 'Estimated time remaining'
  }
};

export default function ProgressBar({ progress, stage, estimatedTime, lang = 'ja' }) {
  const t = translations[lang];

  const getStageText = () => {
    switch (stage) {
      case 'uploading':
        return t.uploading;
      case 'processing':
        return t.processing;
      case 'complete':
        return t.complete;
      default:
        return t.uploading;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{getStageText()}</span>
        <div className="flex items-center gap-3">
          {estimatedTime !== null && estimatedTime !== undefined && (
            <span className="text-xs text-gray-500">
              {t.estimatedTime}: {formatTime(estimatedTime)}
            </span>
          )}
          <span className="text-sm font-semibold text-black">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
        </div>
      </div>

      {/* Stage indicators */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <div className={`flex items-center gap-1 ${progress > 0 ? 'text-black font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${progress > 0 ? 'bg-black' : 'bg-gray-300'}`} />
          <span>{t.uploading}</span>
        </div>
        <div className={`flex items-center gap-1 ${progress > 50 ? 'text-black font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-black' : 'bg-gray-300'}`} />
          <span>{t.processing}</span>
        </div>
        <div className={`flex items-center gap-1 ${progress === 100 ? 'text-black font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${progress === 100 ? 'bg-black' : 'bg-gray-300'}`} />
          <span>{t.complete}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
