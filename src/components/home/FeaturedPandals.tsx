import React from 'react';
import { usePujo } from '../../context/PujoContext';
import { Pandal } from '../../types';
import { 
  MapPin, 
  Train, 
  Users, 
  Clock, 
  CheckCircle2, 
  MessageSquarePlus, 
  Sparkles, 
  Eye,
  Star
} from 'lucide-react';

export const FeaturedPandals: React.FC = () => {
  const { 
    pandals, 
    visitedPandalIds, 
    markPandalVisited, 
    openPandalModal, 
    openReportModal,
    setActiveTab 
  } = usePujo();

  const getCrowdBadge = (level?: string) => {
    switch (level) {
      case 'Low':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'Low Crowd',
        };
      case 'High':
      case 'Peak':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-300',
          dot: 'bg-rose-500 animate-ping',
          label: level === 'Peak' ? 'Peak Crowd' : 'High Crowd',
        };
      case 'Medium':
      default:
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-300',
          dot: 'bg-amber-500',
          label: 'Medium Crowd',
        };
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1 font-mono">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Featured Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Iconic Kolkata Pandals
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time status across demonstration heritage pujas and theme spectacles.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('pandals')}
          className="text-xs sm:text-sm font-bold text-red-700 hover:text-red-800 flex items-center gap-1 group"
        >
          View all 5 pandals & filters
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pandals.map((pandal) => {
          const isVisited = visitedPandalIds.includes(pandal.id);
          const crowd = getCrowdBadge(pandal.current_crowd_level);

          return (
            <div
              key={pandal.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Cover Image & Overlays */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={pandal.image_url || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'}
                    alt={pandal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                      {pandal.area}
                    </span>

                    {/* Crowd Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-sm ${crowd.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${crowd.dot}`} />
                      <span>{crowd.label}</span>
                    </div>
                  </div>

                  {/* Rating & Bottom overlay info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{pandal.popularity_score}</span>
                    </div>

                    {isVisited && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Visited
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 
                      onClick={() => openPandalModal(pandal)}
                      className="text-lg font-bold font-serif text-stone-900 group-hover:text-red-700 transition-colors cursor-pointer"
                    >
                      {pandal.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-800 line-clamp-1 mt-0.5">
                      {pandal.theme}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {pandal.description}
                  </p>

                  {/* Key Metadata */}
                  <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <Train className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="truncate">{pandal.nearest_metro_station} ({pandal.metro_distance_km} km)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{pandal.best_visiting_hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => openPandalModal(pandal)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-red-700 hover:border-red-200 text-xs font-semibold shadow-sm transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => openReportModal(pandal)}
                  className="py-2 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 text-xs font-semibold shadow-sm transition-all"
                  title="Report current crowd"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-amber-700" />
                </button>

                <button
                  onClick={() => markPandalVisited(pandal.id)}
                  disabled={isVisited}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isVisited
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isVisited ? 'Visited ✓' : 'Mark Visited'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
