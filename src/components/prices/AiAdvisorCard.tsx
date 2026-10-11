import React from 'react';
import {
  BrainCircuit,
  Volume2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EvaluatedMandi } from './MarketComparisonTable';
import { QualityGradeType } from '../../types';

interface AiAdvisorCardProps {
  cropName: string;
  grade: QualityGradeType;
  quantityInQuintals: number;
  topMandi: EvaluatedMandi | undefined;
  secondMandi?: EvaluatedMandi;
  fairPriceMin: number;
  fairPriceMax: number;
  marketAveragePrice: number;
}

export const AiAdvisorCard: React.FC<AiAdvisorCardProps> = ({
  cropName,
  grade,
  quantityInQuintals,
  topMandi,
  secondMandi,
  fairPriceMin,
  fairPriceMax,
  marketAveragePrice,
}) => {
  const { language, speakText } = useApp();

  if (!topMandi) return null;

  const extraEarnings = secondMandi
    ? Math.max(0, Math.round(topMandi.totalNetValue - secondMandi.totalNetValue))
    : Math.round(topMandi.grossPricePerQtl * 0.08 * quantityInQuintals);

  // Dynamic Rule-Based Advisory Narrative
  const advisoryExplanation =
    language === 'hi'
      ? `${topMandi.mandi.name} आपकी उपज के लिए सबसे अधिक शुद्ध लाभ प्रदान करती है। यद्यपि यह ${topMandi.distanceKm} किमी की दूरी पर है और प्रति क्विंटल ₹${topMandi.freightPerQtl} का परिवहन भाड़ा लगता है, फिर भी इसका सकल भाव ₹${topMandi.grossPricePerQtl}/क्विंटल होने के कारण आपको ₹${topMandi.netPricePerQtl}/क्विंटल का शुद्ध लाभ मिलता है, जिससे आपको कुल ₹${extraEarnings.toLocaleString('en-IN')} का अतिरिक्त मुनाफा होगा।`
      : language === 'bn'
      ? `${topMandi.mandi.name} আপনার ফসলের জন্য সর্বোচ্চ নেট লাভ নিশ্চিত করে। ${topMandi.distanceKm} কিমি দূরত্বের জন্য প্রতি কুইন্টালে ₹${topMandi.freightPerQtl} পরিবহন খরচ বাদ দেওয়ার পরেও ₹${topMandi.netPricePerQtl}/কুইন্টাল নিট দর পাওয়া যাবে, যা আপনাকে মোট ₹${extraEarnings.toLocaleString('en-IN')} বাড়তি মুনাফা দেবে।`
      : `Based on algorithmic net realization, ${topMandi.mandi.name} is your optimal selling terminal. Even after deducting ₹${topMandi.freightPerQtl}/Qtl in transit freight across ${topMandi.distanceKm} km, its higher gross rate of ₹${topMandi.grossPricePerQtl}/Qtl leaves you with a top net realization of ₹${topMandi.netPricePerQtl}/Qtl, netting you an extra ₹${extraEarnings.toLocaleString('en-IN')} compared to secondary options.`;

  const handleSpeakRecommendation = () => {
    speakText(
      `AI Price Advisory for ${cropName} Grade ${grade}. ${advisoryExplanation} Recommended fair price band is between ₹${fairPriceMin} and ₹${fairPriceMax} per quintal.`
    );
  };

  // Compute percentage positions on the visual range bar
  const rangeFloor = Math.round(marketAveragePrice * 0.75);
  const rangeCeiling = Math.round(fairPriceMax * 1.2);
  const totalSpan = rangeCeiling - rangeFloor;

  const currentPercent = Math.min(
    100,
    Math.max(0, Math.round(((topMandi.netPricePerQtl - rangeFloor) / totalSpan) * 100))
  );
  const fairMinPercent = Math.min(
    100,
    Math.max(0, Math.round(((fairPriceMin - rangeFloor) / totalSpan) * 100))
  );
  const fairMaxPercent = Math.min(
    100,
    Math.max(0, Math.round(((fairPriceMax - rangeFloor) / totalSpan) * 100))
  );

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-emerald-800/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
            <BrainCircuit className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Rule-Based Smart Market Advisor
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300/30">
                Grade {grade} Calibration
              </span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              Optimal Market Recommendation
            </h3>
          </div>
        </div>

        {/* Read Aloud Button */}
        <button
          type="button"
          onClick={handleSpeakRecommendation}
          title="Read recommendation aloud"
          className="self-start sm:self-auto inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-500/40 shadow-sm transition-all"
        >
          <Volume2 className="w-4 h-4 text-emerald-300" />
          <span>Listen to AI Advice</span>
        </button>
      </div>

      {/* Main Analysis Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Explanation Box */}
        <div className="lg:col-span-8 space-y-3">
          <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 leading-relaxed text-xs sm:text-sm text-slate-200">
            <p className="font-normal">{advisoryExplanation}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Recommended Terminal</span>
              <strong className="text-emerald-300 text-sm font-bold truncate block">
                {topMandi.mandi.name}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Net Realization Rate</span>
              <strong className="text-white text-sm font-black font-mono">
                ₹{topMandi.netPricePerQtl} / Qtl
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[11px]">Extra Margin Benefit</span>
              <strong className="text-amber-300 text-sm font-black font-mono">
                +₹{extraEarnings.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Metric Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-800/70 to-slate-800 border border-emerald-400/30 text-center space-y-2">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block">
            Total Net Proceeds
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">
            ₹{Math.round(topMandi.totalNetValue).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-300">
            For {quantityInQuintals} Quintals of {cropName} (Grade {grade})
          </p>
          <div className="pt-2 border-t border-emerald-600/40 text-[11px] text-slate-300 font-medium">
            100% Escrow & Weighment Guaranteed
          </div>
        </div>

      </div>

      {/* Visual Fair Price Range Bar */}
      <div className="space-y-2.5 pt-2 relative z-10 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Fair Price Band Benchmark (Assayed Grade {grade})</span>
          </span>
          <span className="font-mono text-emerald-300 font-bold">
            Fair Range: ₹{fairPriceMin.toLocaleString('en-IN')} – ₹{fairPriceMax.toLocaleString('en-IN')}/Qtl
          </span>
        </div>

        {/* Range Bar Graphical Track */}
        <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          {/* Fair Range Highlight Band */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-emerald-600/60 to-green-500/70 border-x-2 border-emerald-400"
            style={{
              left: `${fairMinPercent}%`,
              width: `${Math.max(12, fairMaxPercent - fairMinPercent)}%`,
            }}
          />

          {/* Current Realized Marker */}
          <div
            className="absolute top-0 bottom-0 w-3 bg-amber-400 rounded-full shadow-lg -ml-1.5 animate-pulse"
            style={{ left: `${currentPercent}%` }}
            title={`Your Discovered Net Rate: ₹${topMandi.netPricePerQtl}/Qtl`}
          />
        </div>

        {/* Bar Labels */}
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Low (₹{rangeFloor})</span>
          <span className="text-emerald-400 font-bold">
            Target Modal (₹{topMandi.netPricePerQtl})
          </span>
          <span>High Ceiling (₹{rangeCeiling})</span>
        </div>
      </div>
    </div>
  );
};

export default AiAdvisorCard;
