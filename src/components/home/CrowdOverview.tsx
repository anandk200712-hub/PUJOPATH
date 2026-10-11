import React from 'react';
import { usePujo } from '../../context/PujoContext';
import { Users, Info, ShieldAlert, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export const CrowdOverview: React.FC = () => {
  const { pandals } = usePujo();

  // Compute area-level crowd stats
  const areas = ['North Kolkata', 'South Kolkata', 'Central Kolkata'] as const;

  const areaSummaries = areas.map((areaName) => {
    const areaPandals = pandals.filter((p) => p.area === areaName);
    const avgScore = areaPandals.length
      ? areaPandals.reduce((acc, p) => acc + (p.current_crowd_score || 3), 0) / areaPandals.length
      : 3;
    
    let status = 'Moderate';
    let badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    if (avgScore <= 2.2) {
      status = 'Calm / Low Wait';
      badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    } else if (avgScore >= 3.8) {
      status = 'Heavy / Extended Queues';
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
    }

    return {
      name: areaName,
      count: areaPandals.length,
      status,
      badgeColor,
      pandals: areaPandals,
    };
  });

  const timePredictions = [
    { time: '07:00 AM – 11:30 AM', level: 'Low (15-20 min wait)', note: 'Sacred pushpanjali & tranquil heritage photography.', bar: 'w-1/4 bg-emerald-500' },
    { time: '12:00 PM – 04:30 PM', level: 'Medium (30-45 min wait)', note: 'Afternoon bhog viewing & leisurely family parikrama.', bar: 'w-1/2 bg-amber-500' },
    { time: '05:00 PM – 09:30 PM', level: 'High (60-90 min wait)', note: 'Dhunuchi dance competitions & illuminated light displays.', bar: 'w-4/5 bg-orange-600' },
    { time: '10:00 PM – 03:30 AM', level: 'Peak (90-120 min wait)', note: 'Citywide midnight parikrama footfall. Barricaded queues.', bar: 'w-full bg-rose-600' },
  ];

  return (
    <section className="py-12 bg-amber-50/40 border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real-Time Footfall Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Citywide Crowd Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time heatmaps combined with historical festival footfall predictions.
          </p>
        </div>

        {/* Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {areaSummaries.map((area, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-stone-500 font-mono">
                  {area.count} Pandals Monitored
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${area.badgeColor}`}>
                  {area.status}
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">
                {area.name}
              </h3>

              <div className="space-y-2 mt-4 text-xs text-stone-600">
                {area.pandals.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-1 border-b border-stone-100 last:border-none">
                    <span className="font-medium text-stone-800 truncate pr-2">{p.name}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      p.current_crowd_level === 'Low' ? 'text-emerald-700 bg-emerald-50' :
                      p.current_crowd_level === 'Peak' || p.current_crowd_level === 'High' ? 'text-rose-700 bg-rose-50' :
                      'text-amber-700 bg-amber-50'
                    }`}>
                      {p.current_crowd_level || 'Medium'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Time-of-day Forecast Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-900">
                Historical Daily Footfall Trajectory
              </h3>
              <p className="text-xs text-stone-600">
                Plan optimal visiting windows to minimize queue wait times during festival days.
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium">Demonstration predictive model</span>
            </div>
          </div>

          <div className="space-y-4">
            {timePredictions.map((pred, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div className="w-48 font-bold font-mono text-stone-800">
                  {pred.time}
                </div>
                <div className="flex-1 w-full max-w-xs">
                  <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pred.bar}`} />
                  </div>
                </div>
                <div className="w-44 font-semibold text-stone-700">
                  {pred.level}
                </div>
                <div className="text-stone-500 italic flex-1">
                  {pred.note}
                </div>
              </div>
            ))}
          </div>

          {/* Explicit Disclaimer */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Advisory:</strong> Predictions are formulated from historical festival crowds. Actual transit density may vary based on weather, special deity aartis, and Kolkata Police traffic diversions.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
