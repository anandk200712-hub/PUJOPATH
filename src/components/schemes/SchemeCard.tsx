import React from 'react';
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  PhoneCall,
  ExternalLink,
  Volume2,
  ArrowRight,
  ShieldCheck,
  Coins,
} from 'lucide-react';
import { Scheme } from '../../types';
import { useApp } from '../../context/AppContext';

interface SchemeCardProps {
  scheme: Scheme;
  onApply: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onApply }) => {
  const { language, speakText } = useApp();

  const handleSpeakScheme = () => {
    const text =
      language === 'hi'
        ? `${scheme.name}। प्रायोजक: ${scheme.sponsoringMinistry}। वित्तीय लाभ: ${scheme.financialBenefit}। मुख्य पात्रता: ${scheme.eligibilityCriteria.join(', ')}। आवश्यक दस्तावेज़: ${scheme.documentsRequired.join(', ')}। हेल्पलाइन: ${scheme.tollFreeHelpline}।`
        : `${scheme.name}. Sponsored by ${scheme.sponsoringMinistry}. Benefit: ${scheme.financialBenefit}. Key eligibility: ${scheme.eligibilityCriteria.join(', ')}. Required documents: ${scheme.documentsRequired.join(', ')}. Toll-free helpline: ${scheme.tollFreeHelpline}.`;
    speakText(text);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between space-y-5 group">
      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
              {scheme.badgeText}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              {scheme.code}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSpeakScheme}
            title="Read scheme details aloud"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-700 transition-colors"
            aria-label="Listen to Scheme"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Scheme Title & Sponsoring Ministry */}
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
            {language === 'hi' ? scheme.hindiName : scheme.name}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{scheme.sponsoringMinistry}</span>
          </p>
        </div>

        {/* Direct Financial Benefit Hero Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            Direct Financial Benefit
          </span>
          <strong className="text-sm sm:text-base font-black text-emerald-950 block">
            {scheme.financialBenefit}
          </strong>
        </div>

        {/* Short Summary Description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {scheme.shortSummary}
        </p>

        {/* Eligibility Criteria Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-900 block">
            Key Eligibility Criteria:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {scheme.eligibilityCriteria.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents Pill Tags */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-900 block">
            Required Documents Checklist:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {scheme.documentsRequired.map((doc, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-slate-400" />
                <span>{doc}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA & Helpline Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
          <span>Toll-Free Helpline: <strong className="font-mono text-slate-700">{scheme.tollFreeHelpline}</strong></span>
        </div>

        <button
          type="button"
          onClick={() => onApply(scheme)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Check Eligibility / Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;
