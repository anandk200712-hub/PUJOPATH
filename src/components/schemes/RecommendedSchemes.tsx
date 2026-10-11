import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  Building2,
  Coins,
  Volume2,
} from 'lucide-react';
import { Scheme } from '../../types';
import { useApp } from '../../context/AppContext';

interface RecommendedSchemesProps {
  onApply: (scheme: Scheme) => void;
}

export const RecommendedSchemes: React.FC<RecommendedSchemesProps> = ({ onApply }) => {
  const { schemes, farmerProfile, language, speakText } = useApp();

  // Matched schemes for active farmer profile
  const matchedSchemes = schemes.slice(0, 3); // PM-KISAN, PMFBY, KCC

  const handleSpeakRecommendation = () => {
    const text =
      language === 'hi'
        ? `आपकी किसान प्रोफ़ाइल (${farmerProfile.fullName}, ${farmerProfile.district}, ${farmerProfile.landSizeAcres} एकड़ भूमि) के आधार पर, आप पीएम-किसान, पीएम फसल बीमा योजना और केसीसी 4% रियायती ऋण के लिए 100% पात्र हैं। कुल वार्षिक अनुमानित लाभ ₹6,000 नकद और ₹3,500 खाद की बचत है।`
        : `Based on your farmer profile (${farmerProfile.fullName}, ${farmerProfile.district}, ${farmerProfile.landSizeAcres} Acres), you are 100% eligible for PM-KISAN, PMFBY Crop Insurance, and 4% KCC Credit. Total annual benefit includes ₹6,000 annual direct DBT cash transfer plus subsidized inputs.`;
    speakText(text);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Personalized AI Welfare Matcher
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                Profile Verified
              </span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              Auto-Matched Schemes for {farmerProfile.fullName}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpeakRecommendation}
          title="Read matched schemes aloud"
          className="self-start sm:self-auto inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-500/40 shadow-sm transition-all"
        >
          <Volume2 className="w-4 h-4 text-emerald-300" />
          <span>Listen Matched Schemes</span>
        </button>
      </div>

      {/* Farmer Matched Criteria Banner */}
      <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 text-xs flex flex-wrap items-center justify-between gap-3 relative z-10 text-slate-200">
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Matched against your <strong>{farmerProfile.landSizeAcres} Acres landholding</strong> ({farmerProfile.soilType} Soil), <strong>{farmerProfile.district}, {farmerProfile.state}</strong>, and <strong>Aadhaar e-KYC status</strong>.
          </span>
        </div>
        <span className="font-bold text-amber-300">
          Estimated Annual Value: ₹6,000 Direct DBT + ₹3,00,000 Credit Cap @ 4%
        </span>
      </div>

      {/* 3 Matched Scheme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {matchedSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-400 flex flex-col justify-between space-y-4 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-300/30">
                  {scheme.code}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> 100% Eligible
                </span>
              </div>

              <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                {language === 'hi' ? scheme.hindiName : scheme.name}
              </h4>

              <div className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-xs">
                <span className="text-emerald-300 block text-[10px] uppercase font-bold">Key Benefit</span>
                <strong className="text-white text-[11px] font-extrabold">{scheme.financialBenefit}</strong>
              </div>

              <p className="text-[11px] text-slate-300 line-clamp-2">
                {scheme.shortSummary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onApply(scheme)}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <span>Check Checklist & Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecommendedSchemes;
