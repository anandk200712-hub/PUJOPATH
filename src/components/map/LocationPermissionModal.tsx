import React from 'react';
import { Navigation, ShieldCheck, MapPin, X } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative animate-scale-up space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Heading */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/30 flex items-center justify-center text-red-600">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-extrabold text-xl text-stone-900">
              Location Permission
            </h3>
            <p className="text-xs text-stone-500">
              Enable precise nearby pandal discovery
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2 text-xs text-stone-700">
          <p className="font-bold text-amber-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Why PujoPath requests your location:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-stone-600">
            <li>Sort pandals by exact walking distance from your current spot.</li>
            <li>Suggest nearest metro stations with walking time estimates.</li>
            <li>Draw your real-time parikrama journey trail on the map.</li>
          </ul>
        </div>

        <p className="text-[11px] text-stone-500 italic">
          Your location coordinates remain private in your browser session and are never broadcast publicly. If denied, PujoPath defaults gracefully to central Kolkata.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
          >
            Keep Default View
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs shadow-md shadow-red-600/20 hover:from-red-700 hover:to-rose-800 transition-all"
          >
            Allow & Locate
          </button>
        </div>

      </div>
    </div>
  );
};
