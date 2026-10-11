import React, { useState } from 'react';
import { usePujo } from '../../context/PujoContext';
import { 
  Train, 
  MapPin, 
  Navigation, 
  Compass, 
  ExternalLink, 
  Footprints, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const MetroGuide: React.FC = () => {
  const { pandals, openPandalModal } = usePujo();
  const [selectedZone, setSelectedZone] = useState<'All' | 'North' | 'Central' | 'South'>('All');

  const metroLines = [
    {
      name: 'Blue Line (North – South Corridor)',
      route: 'Dakshineswar ⇄ Kavi Subhash (New Garia)',
      description: 'The backbone of Kolkata pandal hopping. Directly connects Shyambazar, Sovabazar, Central, Park Street, Netaji Bhavan, and Kalighat.',
      color: 'bg-blue-600 text-white',
      badge: 'Blue Line Line 1',
    },
    {
      name: 'Green Line (East – West Corridor)',
      route: 'Howrah Maidan ⇄ Esplanade & Sealdah ⇄ Sector V',
      description: 'Under-river tunnel marvel connecting Howrah Railway Station to Central Esplanade, College Street and Salt Lake pandals.',
      color: 'bg-emerald-600 text-white',
      badge: 'Green Line Line 2',
    },
  ];

  const curatedRoutes = [
    {
      name: 'North Kolkata Heritage Walk',
      zone: 'North',
      distance: '1.2 km walking',
      estTime: '2.5 – 3.5 hours',
      metroGate: 'Sovabazar Sutanuti Metro (Gate 1)',
      pandals: ['Sovabazar Rajbari', 'Kumartuli Park Sarbojanin'],
      highlights: '1757 Bonedi Bari open courtyard, generational idol sculptors workshops, Bagbazar ghat breeze.',
    },
    {
      name: 'Central Heritage & Light Reflection',
      zone: 'Central',
      distance: '1.5 km walking',
      estTime: '2 – 3 hours',
      metroGate: 'Central Metro (Gate 3) or MG Road Metro',
      pandals: ['College Square Sarbojanin'],
      highlights: 'Chandannagar illuminations over the water lake, historic Presidency & Calcutta University streets, famous paramount sherbets.',
    },
    {
      name: 'South Kolkata Grandeur & Adda Trail',
      zone: 'South',
      distance: '2.1 km walking',
      estTime: '3.5 – 5 hours',
      metroGate: 'Netaji Bhavan Metro or Kalighat Metro',
      pandals: ['Maddox Square Sarbojanin', 'Ekdalia Evergreen Club'],
      highlights: 'Lush park adda at Maddox, Gariahat street food, towering South Indian temple replica mandap at Ekdalia with German chandeliers.',
    },
  ];

  const filteredRoutes = curatedRoutes.filter((r) => selectedZone === 'All' || r.zone === selectedZone);

  return (
    <div className="space-y-8">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sky-800/40">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider">
            <Train className="w-3.5 h-3.5" />
            <span>Kolkata Metro & Transit Guide 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-sky-50">
            Navigate the City on Rails
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            During Durga Puja festival nights, Kolkata Metro runs special overnight parikrama trains with extended frequencies every 6-8 minutes between major station hubs.
          </p>
        </div>

        {/* Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {metroLines.map((line, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${line.color}`}>
                {line.badge}
              </span>
              <h4 className="font-bold text-sm text-white pt-1">{line.name}</h4>
              <p className="font-mono text-amber-300 text-[11px]">{line.route}</p>
              <p className="text-stone-400 leading-relaxed">{line.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Walking Route Clusters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold font-serif text-stone-900">
              Curated Multi-Pandal Walking Trails
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Optimized walking clusters linking nearby pandals with designated metro exits.
            </p>
          </div>

          {/* Zone Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-bold">
            {(['All', 'North', 'Central', 'South'] as const).map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedZone === zone
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {zone === 'All' ? 'All Routes' : `${zone} Kolkata`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRoutes.map((route, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    {route.zone} Kolkata
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-500">
                    {route.distance}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-lg text-stone-900">
                  {route.name}
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <Train className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Start: {route.metroGate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Est. Time: {route.estTime}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                    Covered Demonstration Pandals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {route.pandals.map((pName, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60"
                      >
                        {pName}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-500 italic leading-relaxed pt-1">
                  "{route.highlights}"
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={`https://www.google.com/maps/dir/?api=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-colors border border-stone-200"
                >
                  <span>Open Walk Route in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Station Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-xl text-stone-900">
          Demonstration Pandals Transit Proximity Matrix
        </h3>
        <p className="text-xs text-stone-500">
          Walking distance from nearest metro and circular/suburban railway stations.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase tracking-wider">
                <th className="py-3 px-4">Pandal</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Nearest Metro</th>
                <th className="py-3 px-4">Metro Dist</th>
                <th className="py-3 px-4">Nearest Railway</th>
                <th className="py-3 px-4">Railway Dist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {pandals.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-stone-900 cursor-pointer hover:text-red-700" onClick={() => openPandalModal(p)}>
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">{p.area}</td>
                  <td className="py-3.5 px-4 text-sky-700 font-medium">{p.nearest_metro_station}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-800">{p.metro_distance_km} km</td>
                  <td className="py-3.5 px-4 text-stone-600">{p.nearest_railway_station}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-800">{p.railway_distance_km} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
