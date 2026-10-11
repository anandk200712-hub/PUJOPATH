import React from 'react';
import { usePujo } from '../../context/PujoContext';
import { Compass, Train, Users, Award, ArrowUpRight } from 'lucide-react';

export const QuickAccessCards: React.FC = () => {
  const { setActiveTab, requestLocation } = usePujo();

  const cards = [
    {
      title: 'Nearby Pandals',
      description: 'Find pandals within walking distance using geolocation with walking time estimates.',
      icon: Compass,
      tag: 'GPS Proximity',
      color: 'from-amber-500/10 to-orange-500/20 text-orange-950 border-orange-200',
      iconColor: 'text-orange-600',
      action: () => {
        requestLocation();
        setActiveTab('map');
      },
    },
    {
      title: 'Metro Guide',
      description: 'Blue Line (North-South) and Green Line (East-West) stations mapped to pandals.',
      icon: Train,
      tag: 'Transit Routes',
      color: 'from-sky-500/10 to-indigo-500/20 text-indigo-950 border-indigo-200',
      iconColor: 'text-indigo-600',
      action: () => setActiveTab('metro'),
    },
    {
      title: 'Crowd Updates',
      description: 'Real-time footfall reports, wait times, and time-of-day crowd predictions.',
      icon: Users,
      tag: 'Live Heatmap',
      color: 'from-rose-500/10 to-red-500/20 text-red-950 border-red-200',
      iconColor: 'text-red-600',
      action: () => setActiveTab('pandals'),
    },
    {
      title: 'My Journey',
      description: 'Track your parikrama distance, mark visited pandals, and earn festive badges.',
      icon: Award,
      tag: 'Gamification',
      color: 'from-emerald-500/10 to-teal-500/20 text-emerald-950 border-emerald-200',
      iconColor: 'text-emerald-600',
      action: () => setActiveTab('journey'),
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={card.action}
              className={`p-6 rounded-3xl bg-gradient-to-br ${card.color} border shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/80 border border-black/5">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif mb-2 text-stone-900 group-hover:text-red-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end text-xs font-bold text-stone-700 group-hover:text-red-700">
                <span className="flex items-center gap-1">
                  Open <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
