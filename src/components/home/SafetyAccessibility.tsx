import React from 'react';
import { Shield, HeartPulse, Accessibility, PhoneCall, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SafetyAccessibility: React.FC = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-stone-900 text-stone-200 rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl">
        
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-red-400" />
            <span>Civic & Health Safety Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            Safety & Accessibility Guidelines
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Kolkata Police, civil defense volunteers, and medical services operate 24/7 across all major pandal hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Medical Booths */}
          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">
              First-Aid & Medical Booths
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every major demonstration pandal (Sovabazar, College Square, Maddox Square, Kumartuli, Ekdalia) houses dedicated first-aid kiosks with basic oxygen support, oral hydration salts, and ambulance standby.
            </p>
          </div>

          {/* Card 2: Accessibility */}
          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Accessibility className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">
              Senior Citizens & Wheelchair Access
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designated priority queue lanes and gentle gradient ramps exist at Natmandir courtyards and park grounds. Volunteers wearing yellow identification armbands assist differently-abled visitors.
            </p>
          </div>

          {/* Card 3: Police & Lost-and-Found */}
          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">
              Police Outposts & Lost Children
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Kolkata Police assistance desks broadcast continuous loudspeaker announcements for missing group members. Fast-track helpline: dial 100 or approach any police kiosk on street junctions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
