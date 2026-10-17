import React, { useEffect, useState } from 'react';
import { usePujo } from '../../context/PujoContext';
import { Pandal, EventSchedule } from '../../types';
import { 
  X, 
  MapPin, 
  Train, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Accessibility, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Navigation,
  Compass,
  Copy
} from 'lucide-react';

export const PandalDetailModal: React.FC = () => {
  const { 
    selectedPandal, 
    closePandalModal, 
    visitedPandalIds, 
    markPandalVisited,
    pandals,
    openPandalModal
  } = usePujo();

  const [events, setEvents] = useState<EventSchedule[]>([]);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    if (selectedPandal) {
      fetch(`/api/events?pandalId=${selectedPandal.id}`)
        .then((res) => res.json())
        .then((json) => setEvents(json.data || []))
        .catch((err) => console.error('Failed to load pandal events:', err));
    }
  }, [selectedPandal]);

  if (!selectedPandal) return null;

  const isVisited = visitedPandalIds.includes(selectedPandal.id);

  // Nearby pandals in the same or adjacent area
  const nearbyPandals = pandals
    .filter((p) => p.id !== selectedPandal.id && (p.area === selectedPandal.area || Math.abs(p.latitude - selectedPandal.latitude) < 0.05))
    .slice(0, 2);

  const handleShare = () => {
    const url = `${window.location.origin}/#pandal-${selectedPandal.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto animate-scale-up custom-scrollbar">
        
        {/* Sticky Close Header Button */}
        <button
          onClick={closePandalModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900">
          <img
            src={selectedPandal.image_url || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80'}
            alt={selectedPandal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/90 text-[11px] font-bold uppercase tracking-wider">
                {selectedPandal.area}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold">
                ⭐ {selectedPandal.popularity_score} Popularity
              </span>
              {isVisited && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Visited
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {selectedPandal.name}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 font-medium">
              Theme: {selectedPandal.theme}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-bold">Crowd Status:</span>
              <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${
                selectedPandal.current_crowd_level === 'Low' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                selectedPandal.current_crowd_level === 'Peak' || selectedPandal.current_crowd_level === 'High' ? 'text-rose-700 bg-rose-50 border border-rose-200' :
                'text-amber-700 bg-amber-50 border border-amber-200'
              }`}>
                ● {selectedPandal.current_crowd_level || 'Medium'} Crowd
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>{copiedToast ? 'Copied Link! ✓' : 'Share'}</span>
              </button>

              <button
                onClick={() => markPandalVisited(selectedPandal.id)}
                disabled={isVisited}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                  isVisited
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isVisited ? 'Marked Visited ✓' : 'Mark as Visited'}
              </button>
            </div>
          </div>

          {/* Description & Cultural Notes */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 mb-1">
                About this Pandal & Theme
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedPandal.description}
              </p>
            </div>

            {selectedPandal.cultural_notes && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Cultural Heritage Significance:
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {selectedPandal.cultural_notes}
                </p>
              </div>
            )}
          </div>

          {/* Transit & Timings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Train className="w-4 h-4 text-sky-600" />
                Nearest Transport Hubs
              </div>
              <p className="text-stone-600">
                <strong>Metro:</strong> {selectedPandal.nearest_metro_station} ({selectedPandal.metro_distance_km} km)
              </p>
              <p className="text-stone-600">
                <strong>Railway:</strong> {selectedPandal.nearest_railway_station} ({selectedPandal.railway_distance_km} km)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                Recommended Visiting Hours
              </div>
              <p className="text-stone-600 leading-relaxed">
                {selectedPandal.best_visiting_hours}
              </p>
            </div>
          </div>

          {/* Safety & Accessibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Accessibility className="w-4 h-4 text-emerald-700" />
                Accessibility
              </div>
              <p className="text-stone-600 leading-relaxed">
                {selectedPandal.accessibility_information || 'Ramps and volunteer assistance available.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/60 space-y-1">
              <div className="font-bold text-rose-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                Safety & Police Desks
              </div>
              <p className="text-stone-600 leading-relaxed">
                {selectedPandal.safety_information || 'Kolkata Police assistance kiosk and fire standby.'}
              </p>
            </div>
          </div>

          {/* Event Schedules */}
          {events.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                Scheduled Rituals & Performances
              </h3>
              <div className="space-y-2">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-900">{ev.event_name}</div>
                      <div className="text-stone-500">{ev.event_date}</div>
                    </div>
                    <div className="font-mono font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                      {ev.start_time} – {ev.end_time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Cluster Pandals */}
          {nearbyPandals.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                Nearby Demonstration Pandals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearbyPandals.map((np) => (
                  <div
                    key={np.id}
                    onClick={() => openPandalModal(np)}
                    className="p-3.5 rounded-2xl border border-stone-200 hover:border-red-300 bg-white hover:bg-stone-50 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={np.image_url}
                      alt={np.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 text-xs">
                      <div className="font-bold text-stone-900 truncate">{np.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">{np.area}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
