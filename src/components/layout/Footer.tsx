import React from 'react';
import { Phone, Shield, Heart, Sparkles, AlertCircle, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-amber-900/40 mt-auto">
      {/* Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-red-950 via-rose-950 to-amber-950 border-b border-red-900/50 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-200 font-semibold">
            <Shield className="w-4 h-4 text-red-400" />
            <span>Kolkata Festival Emergency Contacts:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-stone-200">
              <span className="text-amber-400 font-bold">Police:</span> 100 / (033) 2214-3230
            </div>
            <div className="flex items-center gap-1.5 text-stone-200">
              <span className="text-rose-400 font-bold">Women Helpline:</span> 1090
            </div>
            <div className="flex items-center gap-1.5 text-stone-200">
              <span className="text-emerald-400 font-bold">Ambulance:</span> 102
            </div>
            <div className="flex items-center gap-1.5 text-stone-200">
              <span className="text-amber-400 font-bold">Metro Railway:</span> 139
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Festival Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center text-amber-200 font-bold text-xl shadow-md">
                🪔
              </div>
              <span className="font-display font-extrabold text-2xl text-amber-100 tracking-wide">
                PujoPath
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              Your comprehensive smart companion for navigating the grandeur of Kolkata Durga Puja 2026. Real-time crowd tracking, transport insights, verified event schedules, and personal parikrama journey gamification.
            </p>
            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-xs text-stone-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Notice:</strong> PujoPath is curated for festival demonstrations. Real-time crowd scores and event schedules represent realistic simulated and crowdsourced festival patterns.
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 font-mono">
              Festival Zones
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><span className="hover:text-amber-200 transition-colors">North Kolkata (Heritage & Bonedi)</span></li>
              <li><span className="hover:text-amber-200 transition-colors">South Kolkata (Grandeur & Adda)</span></li>
              <li><span className="hover:text-amber-200 transition-colors">Central Kolkata (Illuminations & Lakes)</span></li>
              <li><span className="hover:text-amber-200 transition-colors">Kolkata Metro Blue & Green Lines</span></li>
            </ul>
          </div>

          {/* Cultural Greeting */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 font-mono">
              Shubho Sharodiya
            </h4>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/60 to-stone-900 border border-red-900/40 text-stone-300 text-xs leading-relaxed space-y-2">
              <p className="font-serif italic text-amber-200 text-sm">
                “Ma aschen! May the sacred dhak beats and autumn skies bring peace, prosperity, and joyous celebrations to all.”
              </p>
              <p className="text-[11px] text-stone-400">
                Durga Puja 2026 • UNESCO Intangible Cultural Heritage
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 PujoPath. Built with pride for Kolkata Durga Puja.
          </div>
          <div className="flex items-center gap-4">
            <span>Safety Guidelines</span>
            <span>•</span>
            <span>Accessibility Accommodations</span>
            <span>•</span>
            <span>Volunteer Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
