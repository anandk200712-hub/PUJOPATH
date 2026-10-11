import React from 'react';
import { usePujo } from '../../context/PujoContext';
import { MapPin, Sparkles, Navigation, Users, Flame, ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, requestLocation } = usePujo();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-white to-red-50/40 py-16 sm:py-24 border-b border-amber-200/50">
      {/* Decorative Traditional Motifs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-red-500/10 to-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-rose-500/10 to-orange-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Festival Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-100 via-amber-100 to-rose-100 border border-red-300 text-red-900 text-xs sm:text-sm font-bold tracking-wide shadow-sm animate-bounce-subtle">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span>Kolkata Durga Puja 2026 • UNESCO Heritage Festival</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
            Find your Pujo. <br />
            <span className="festive-text-gradient font-display italic">
              Follow the feeling.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Experience the city that never sleeps during Sharodiya. Navigate real-time crowd heatmaps, discover architectural themes, catch sacred ritual schedules, and track your personal parikrama pilgrimage.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => setActiveTab('map')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 hover:from-red-700 hover:to-rose-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5 text-amber-200" />
              <span>Explore Interactive Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('pandals')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-stone-800 font-bold text-sm sm:text-base border border-stone-200 shadow-sm hover:border-red-300 hover:bg-stone-50 transition-all"
            >
              <span>View All Pandals</span>
            </button>

            <button
              onClick={() => {
                requestLocation();
                setActiveTab('map');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500/10 text-amber-900 font-bold text-sm border border-amber-300 hover:bg-amber-100/60 transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-700" />
              <span>Locate Pandals Near Me</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-amber-200/60 text-xs font-semibold text-stone-600">
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/60 border border-stone-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Pandals</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/60 border border-stone-100">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Crowd Heatmaps</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/60 border border-stone-100">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Ritual Schedules</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/60 border border-stone-100">
              <Navigation className="w-4 h-4 text-indigo-600" />
              <span>Metro Walk Guides</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
