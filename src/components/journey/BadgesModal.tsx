import React from 'react';
import { usePujo } from '../../context/PujoContext';
import { Award, Sparkles, X, CheckCircle2 } from 'lucide-react';

export const BadgesModal: React.FC = () => {
  const { unlockedBadgeAlert, closeBadgeAlert, setActiveTab } = usePujo();

  if (!unlockedBadgeAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-b from-amber-50 via-white to-red-50 rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl border-2 border-amber-300 relative animate-scale-up space-y-4">
        
        <button
          onClick={closeBadgeAlert}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close badge alert"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30 mx-auto animate-bounce">
          🏆
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-red-700 px-3 py-1 rounded-full bg-red-100 border border-red-200">
            Achievement Unlocked!
          </span>
          <h3 className="font-serif font-extrabold text-2xl text-stone-900 mt-2">
            {unlockedBadgeAlert.badge_name}
          </h3>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {unlockedBadgeAlert.badge_description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              closeBadgeAlert();
              setActiveTab('journey');
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs shadow-md shadow-red-600/25 hover:from-red-700 hover:to-rose-800 transition-all"
          >
            View My Trophy Cabinet
          </button>
        </div>

      </div>
    </div>
  );
};
