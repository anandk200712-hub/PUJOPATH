import React, { useState } from 'react';
import { usePujo } from '../../context/PujoContext';
import { Pandal } from '../../types';
import { 
  X, 
  Users, 
  MessageSquarePlus, 
  CheckCircle2, 
  AlertTriangle, 
  Send,
  Sparkles,
  Clock
} from 'lucide-react';

export const CrowdReportModal: React.FC = () => {
  const { reportModalPandal, closeReportModal, submitCrowdReport } = usePujo();

  const [crowdLevel, setCrowdLevel] = useState<'Low' | 'Medium' | 'High' | 'Peak'>('Medium');
  const [crowdScore, setCrowdScore] = useState(3);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  if (!reportModalPandal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await submitCrowdReport(reportModalPandal.id, crowdLevel, crowdScore, note);
    setIsSubmitting(false);

    if (success) {
      setSuccessToast(true);
      setTimeout(() => {
        setSuccessToast(false);
        closeReportModal();
      }, 1500);
    }
  };

  const crowdOptions: { level: 'Low' | 'Medium' | 'High' | 'Peak'; score: number; label: string; desc: string; color: string }[] = [
    { level: 'Low', score: 1, label: 'Low Crowd', desc: '< 15 mins wait, comfortable entry', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
    { level: 'Medium', score: 3, label: 'Medium Crowd', desc: '15-40 mins wait, moving queue', color: 'border-amber-500 bg-amber-50 text-amber-900' },
    { level: 'High', score: 4, label: 'High Crowd', desc: '40-75 mins wait, tight barricades', color: 'border-orange-500 bg-orange-50 text-orange-900' },
    { level: 'Peak', score: 5, label: 'Peak Crowd', desc: '> 75 mins wait, slow movement', color: 'border-rose-500 bg-rose-50 text-rose-900' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-scale-up space-y-5">
        
        <button
          onClick={closeReportModal}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close report modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-extrabold text-xl text-stone-900">
              Report Live Crowd
            </h3>
            <p className="text-xs text-stone-500">
              {reportModalPandal.name} ({reportModalPandal.area})
            </p>
          </div>
        </div>

        {successToast ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900 text-base">
              Crowd Report Logged!
            </h4>
            <p className="text-xs text-emerald-700">
              Thank you for helping fellow festival pilgrims make informed visits.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Crowd Level Radio Blocks */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Observed Footfall Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {crowdOptions.map((opt) => (
                  <div
                    key={opt.level}
                    onClick={() => {
                      setCrowdLevel(opt.level);
                      setCrowdScore(opt.score);
                    }}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      crowdLevel === opt.level ? opt.color : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="font-bold text-xs">{opt.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Optional Ground Note / Advisory
              </label>
              <input
                type="text"
                placeholder="e.g. 'Ramp entry free, light rain delay, queue moving well.'"
                maxLength={200}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Advisory Info */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-500 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Reports are tagged as <strong>Community Verified</strong> to prevent congestion and assist parikrama route safety.
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeReportModal}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs shadow-md shadow-red-600/20 hover:from-red-700 hover:to-rose-800 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
