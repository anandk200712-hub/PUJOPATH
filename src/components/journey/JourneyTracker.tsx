import React, { useState, useEffect, useRef } from 'react';
import { usePujo } from '../../context/PujoContext';
import { 
  Play, 
  Pause, 
  Square, 
  Award, 
  CheckCircle2, 
  Footprints, 
  Navigation, 
  Share2, 
  Sparkles, 
  AlertCircle,
  ShieldCheck,
  MapPin
} from 'lucide-react';

// Haversine formula to calculate distance between two coordinates in km
function calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const JourneyTracker: React.FC = () => {
  const {
    journeySummary,
    pandals,
    markPandalVisited,
    isTracking,
    trackingSessionId,
    startLiveTracking,
    stopLiveTracking,
  } = usePujo();

  const [sessionDistance, setSessionDistance] = useState(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [trackingConsentGiven, setTrackingConsentGiven] = useState(false);
  const [lastCoords, setLastCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPandalToMark, setSelectedPandalToMark] = useState(pandals[0]?.id || '');
  const [shareSuccessToast, setShareSuccessToast] = useState(false);

  const watchIdRef = useRef<number | null>(null);

  // Live GPS tracking with noise filtering (> 5m threshold)
  useEffect(() => {
    if (isTracking && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newLat = pos.coords.latitude;
          const newLng = pos.coords.longitude;

          if (lastCoords) {
            const distanceDelta = calculateHaversineDistanceKm(
              lastCoords.lat,
              lastCoords.lng,
              newLat,
              newLng
            );

            // Noise filter: only record movements greater than 0.005 km (5 meters)
            // and less than 1.0 km (reject crazy GPS teleport jumps)
            if (distanceDelta >= 0.005 && distanceDelta <= 1.0) {
              setSessionDistance((prev) => prev + distanceDelta);
              // Approximate step estimate: ~1300 steps per km
              const addedSteps = Math.round(distanceDelta * 1300);
              setSessionSteps((prev) => prev + addedSteps);

              // Log to backend
              fetch('/api/journey/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: 'user_demo_kolkata',
                  sessionId: trackingSessionId || 'session_default',
                  latitude: newLat,
                  longitude: newLng,
                  distanceTraveledKm: Number(distanceDelta.toFixed(3)),
                  stepsEstimated: addedSteps,
                }),
              }).catch((e) => console.error('Error logging waypoint:', e));
            }
          }

          setLastCoords({ lat: newLat, lng: newLng });
        },
        (err) => console.warn('Geolocation error during journey tracking:', err),
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking, lastCoords, trackingSessionId]);

  const handleStartTracking = () => {
    if (!trackingConsentGiven) {
      setTrackingConsentGiven(true);
    }
    startLiveTracking();
  };

  const handleManualMark = () => {
    if (selectedPandalToMark) {
      markPandalVisited(selectedPandalToMark, 'manual');
    }
  };

  const handleShareSummary = () => {
    const text = `🪔 My Kolkata Durga Puja 2026 Parikrama with PujoPath:
📍 ${journeySummary?.visitedCount || 0} Pandals Visited
👟 ${((journeySummary?.totalDistanceKm || 0) + sessionDistance).toFixed(1)} km Walked
🏆 ${journeySummary?.badges?.length || 1} Milestone Badges Earned!
Join the parikrama: ${window.location.origin}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareSuccessToast(true);
      setTimeout(() => setShareSuccessToast(false), 2500);
    }
  };

  const allBadges = [
    { key: 'first_steps', name: 'First Steps', desc: 'Started your first live PujoPath journey session.', icon: '👟' },
    { key: 'first_pandal', name: 'First Pandal', desc: 'Marked your first pandal as visited.', icon: '🪔' },
    { key: 'pujo_explorer', name: 'Pujo Explorer', desc: 'Visited 5 prominent demonstration pandals.', icon: '🌺' },
    { key: 'pujo_marathon', name: 'Pujo Marathon', desc: 'Visited 10 pandals in a grand city pilgrimage.', icon: '🏆' },
    { key: 'ten_km_trailblazer', name: '10 KM Trailblazer', desc: 'Covered 10 kilometers during Durga Puja Parikrama.', icon: '⚡' },
  ];

  const earnedKeys = (journeySummary?.badges?.map((b) => b.badge_key as string) || []) as string[];

  return (
    <div className="space-y-8">
      
      {/* Live Tracking Console */}
      <div className="bg-gradient-to-br from-red-950 via-rose-950 to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-red-900/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/60 border border-red-700 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5" />
              <span>Live Parikrama Tracker</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {isTracking ? 'Active Parikrama Session' : 'Track Your Puja Walk'}
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm max-w-lg leading-relaxed">
              Records walking distance, estimates step count with noise filtering, and awards milestone badges as you visit pandals.
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Live Journey</span>
              </button>
            ) : (
              <button
                onClick={stopLiveTracking}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-bold text-sm shadow-lg shadow-red-900/30 transition-all"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Session</span>
              </button>
            )}

            <button
              onClick={handleShareSummary}
              className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareSuccessToast ? 'Copied Card! ✓' : 'Share Journey'}</span>
            </button>
          </div>

        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              {((journeySummary?.totalDistanceKm || 0) + sessionDistance).toFixed(2)} km
            </div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold mt-1">
              Total Distance
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
              {journeySummary?.visitedCount || 0}
            </div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold mt-1">
              Pandals Visited
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono">
              {(journeySummary?.totalStepsEstimated || 0) + sessionSteps}
            </div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold mt-1">
              Estimated Steps*
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-300 font-mono">
              {journeySummary?.badges?.length || 1} / 5
            </div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold mt-1">
              Badges Earned
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-[10px] text-stone-400 italic">
          *Step count calculated using distance stride metrics; GPS distance threshold filtered for stationary noise.
        </div>
      </div>

      {/* Manual Mark Fallback & Visited List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Manual Mark Section */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-red-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Manual Pandal Check-in
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            If GPS signal is weak inside crowded pandal barricades, check in manually to record your visit and unlock milestone badges.
          </p>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Select Pandal:
            </label>
            <select
              value={selectedPandalToMark}
              onChange={(e) => setSelectedPandalToMark(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 text-xs font-medium text-stone-800 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              {pandals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.area})
                </option>
              ))}
            </select>

            <button
              onClick={handleManualMark}
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Confirm Visit Check-in
            </button>
          </div>
        </div>

        {/* Right: Visited Pandals History */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            My Visited Pandals ({journeySummary?.visitedPandals?.length || 0})
          </h3>

          {journeySummary?.visitedPandals && journeySummary.visitedPandals.length > 0 ? (
            <div className="space-y-3">
              {journeySummary.visitedPandals.map((vp: any) => (
                <div
                  key={vp.id}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-900">{vp.pandal_name}</div>
                      <div className="text-[11px] text-stone-500">{vp.pandal_area} • Checked in via {vp.source}</div>
                    </div>
                  </div>
                  <span className="font-mono text-stone-400 text-[10px]">
                    {new Date(vp.visited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200/60">
              No pandals marked visited yet. Start hopping to collect stamps!
            </div>
          )}
        </div>

      </div>

      {/* Gamification Badges Trophy Cabinet */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1 font-mono">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Trophy Cabinet</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-serif text-stone-900">
            Milestone Badges & Parikrama Achievements
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Unlock festive badges as you walk, check into pandals, and complete routes across Kolkata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {allBadges.map((badge) => {
            const isEarned = earnedKeys.includes(badge.key);

            return (
              <div
                key={badge.key}
                className={`p-5 rounded-2xl border transition-all text-center space-y-2.5 flex flex-col items-center justify-between ${
                  isEarned
                    ? 'bg-gradient-to-b from-amber-50 to-orange-50/40 border-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-stone-50/60 border-stone-200 opacity-60'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm ${
                  isEarned ? 'bg-amber-100 border-2 border-amber-300' : 'bg-stone-200 border-2 border-stone-300 grayscale'
                }`}>
                  {badge.icon}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-stone-900">{badge.name}</h4>
                  <p className="text-[11px] text-stone-600 leading-tight mt-1">
                    {badge.desc}
                  </p>
                </div>

                <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isEarned ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-200 text-stone-600'
                }`}>
                  {isEarned ? 'Unlocked ✓' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
