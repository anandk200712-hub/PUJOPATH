import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export const FestivalCountdown: React.FC = () => {
  // Target: Durga Puja Maha Sasthi 2026 (Oct 16, 2026)
  const targetDate = new Date('2026-10-16T08:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const scheduleDays = [
    { day: 'Maha Sasthi', date: 'Oct 16, 2026', ritual: 'Bodhon & Amontron' },
    { day: 'Maha Saptami', date: 'Oct 17, 2026', ritual: 'Kola Bou Snan' },
    { day: 'Maha Ashtami', date: 'Oct 18, 2026', ritual: 'Pushpanjali & Sandhi Puja' },
    { day: 'Maha Nabami', date: 'Oct 19, 2026', ritual: 'Dhunuchi Naach & Maha Aarti' },
    { day: 'Vijayadashami', date: 'Oct 20, 2026', ritual: 'Sindoor Khela & Immersion' },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-red-900 via-rose-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-500/30 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Headline & Countdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Festival Dates • Sharodiya 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-100">
              The Grand Countdown to Maha Sasthi
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed max-w-lg">
              The sacred drums are warming their rhythms, and the master artisans of Kumartuli are applying the divine chakshudaan.
            </p>

            {/* Countdown Blocks */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md pt-2">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/10"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider font-semibold mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Festival Calendar Matrix */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider pb-2 border-b border-white/10">
              <Calendar className="w-4 h-4" />
              <span>Sharodiya 2026 Panjika Timetable</span>
            </div>

            <div className="space-y-2">
              {scheduleDays.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 text-xs border-b border-white/5 last:border-none">
                  <div>
                    <span className="font-bold text-amber-100 block sm:inline mr-2">{s.day}</span>
                    <span className="text-[11px] text-stone-400">({s.ritual})</span>
                  </div>
                  <span className="font-mono text-amber-300 font-semibold">{s.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
