import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  DollarSign,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  PriceDiscoveryForm,
  PriceDiscoveryParams,
  CROP_OPTIONS,
  LOCATION_OPTIONS,
} from '../components/prices/PriceDiscoveryForm';
import {
  MarketComparisonTable,
  EvaluatedMandi,
} from '../components/prices/MarketComparisonTable';
import { AiAdvisorCard } from '../components/prices/AiAdvisorCard';
import { PriceHistoryChart } from '../components/prices/PriceHistoryChart';

interface PriceDiscoveryPageProps {
  onNavigate?: (route: string) => void;
}

export const PriceDiscoveryPage: React.FC<PriceDiscoveryPageProps> = ({ onNavigate }) => {
  const { mandis, crops, language, speakText } = useApp();

  // 1. Initial Default Parameters (Tomato, 500 kg, Kolkata, Grade A)
  const [params, setParams] = useState<PriceDiscoveryParams>({
    cropId: 'crop-tomato',
    quantityValue: 500,
    quantityUnit: 'kg',
    location: 'kolkata',
    grade: 'A',
  });

  const handleReset = () => {
    setParams({
      cropId: 'crop-tomato',
      quantityValue: 500,
      quantityUnit: 'kg',
      location: 'kolkata',
      grade: 'A',
    });
  };

  // 2. Active Crop & Location Objects
  const selectedCrop = useMemo(() => {
    return crops.find((c) => c.id === params.cropId) || crops[0];
  }, [crops, params.cropId]);

  const selectedLocationObj = useMemo(() => {
    return LOCATION_OPTIONS.find((l) => l.id === params.location) || LOCATION_OPTIONS[0];
  }, [params.location]);

  // Convert quantity to Quintals
  const quantityInQuintals =
    params.quantityUnit === 'kg' ? params.quantityValue / 100 : params.quantityValue;

  // Grade price multiplier & base pricing
  const gradeMultiplier = params.grade === 'A' ? 1.2 : params.grade === 'B' ? 1.0 : 0.8;

  // 3. Compute Distance & Real-Time Net Realization for All Relevant Mandis
  const evaluatedMandis: EvaluatedMandi[] = useMemo(() => {
    // Determine regional distance offsets based on farmer's selected location
    const baseDistanceMap: Record<string, Record<string, number>> = {
      patna: {
        'mandi-gulabbagh-bihar': 220,
        'mandi-sheoraphuli-wb': 480,
        'mandi-siliguri-wb': 390,
        'mandi-bargarh-odisha': 540,
        'mandi-azadpur-delhi': 1050,
        'mandi-vashi-navi-mumbai': 1720,
      },
      kolkata: {
        'mandi-sheoraphuli-wb': 45,
        'mandi-siliguri-wb': 480,
        'mandi-gulabbagh-bihar': 320,
        'mandi-bargarh-odisha': 410,
        'mandi-azadpur-delhi': 1450,
        'mandi-vashi-navi-mumbai': 1680,
      },
      anand: {
        'mandi-gondal-gujarat': 160,
        'mandi-unjha-gujarat': 195,
        'mandi-vashi-navi-mumbai': 420,
        'mandi-lasalgaon-mh': 380,
        'mandi-indore-mp': 310,
        'mandi-neemuch-mp': 260,
      },
      nashik: {
        'mandi-lasalgaon-mh': 45,
        'mandi-vashi-navi-mumbai': 165,
        'mandi-indore-mp': 390,
        'mandi-gondal-gujarat': 520,
        'mandi-azadpur-delhi': 1180,
      },
      delhi: {
        'mandi-azadpur-delhi': 25,
        'mandi-karnal-haryana': 92,
        'mandi-khanna-punjab': 260,
        'mandi-agra-up': 180,
        'mandi-kota-rajasthan': 460,
      },
      ludhiana: {
        'mandi-khanna-punjab': 35,
        'mandi-karnal-haryana': 160,
        'mandi-azadpur-delhi': 285,
        'mandi-agra-up': 460,
      },
      indore: {
        'mandi-indore-mp': 20,
        'mandi-bhopal-mp': 190,
        'mandi-neemuch-mp': 260,
        'mandi-kota-rajasthan': 320,
        'mandi-lasalgaon-mh': 390,
      },
      kolar: {
        'mandi-kolar-karnataka': 30,
        'mandi-guntur-ap': 460,
        'mandi-dindigul-tn': 380,
        'mandi-nizamabad-telangana': 620,
      },
    };

    const locationDistances = baseDistanceMap[params.location] || {};

    const list: EvaluatedMandi[] = mandis.map((mandi) => {
      // Find commodity price for this crop in the mandi, or synthesize from base
      const commodityEntry = mandi.commodityPrices.find((p) => p.cropId === params.cropId);
      const rawModalPrice = commodityEntry?.modalPrice || selectedCrop.basePricePerQuintal;

      // Adjusted gross rate with grade factor
      const grossPricePerQtl = Math.round(rawModalPrice * gradeMultiplier);

      // Distance for this mandi relative to selected district
      const distanceKm = locationDistances[mandi.id] || (mandi.region === selectedLocationObj.region ? mandi.distanceKm : mandi.distanceKm + 350);

      // Freight calculation
      const freightPerQtl = Math.round(distanceKm * mandi.transitRatePerQuintalKm);
      const totalFreightCost = Math.round(freightPerQtl * quantityInQuintals);

      // Net realization
      const netPricePerQtl = grossPricePerQtl - freightPerQtl;
      const totalNetValue = netPricePerQtl * quantityInQuintals;

      return {
        mandi,
        distanceKm,
        grossPricePerQtl,
        freightPerQtl,
        totalFreightCost,
        netPricePerQtl,
        totalNetValue,
        isHighestNet: false,
        advantageOverLowest: 0,
      };
    });

    // Sort by highest net realizable rate
    list.sort((a, b) => b.netPricePerQtl - a.netPricePerQtl);

    // Filter to top 5 most relevant mandis for clean display
    const topList = list.slice(0, 5);

    if (topList.length > 0) {
      topList[0].isHighestNet = true;
      const lowestNet = topList[topList.length - 1].netPricePerQtl;
      topList[0].advantageOverLowest = topList[0].netPricePerQtl - lowestNet;
    }

    return topList;
  }, [mandis, params.cropId, params.location, params.grade, quantityInQuintals, selectedCrop, gradeMultiplier, selectedLocationObj]);

  const topMandi = evaluatedMandis[0];
  const secondMandi = evaluatedMandis[1];

  // Fair Price Range bounds
  const fairPriceMin = Math.round(selectedCrop.basePricePerQuintal * gradeMultiplier * 0.95);
  const fairPriceMax = Math.round(selectedCrop.basePricePerQuintal * gradeMultiplier * 1.15);
  const marketAveragePrice = selectedCrop.basePricePerQuintal;

  // Handle CTA Navigation to Direct Buyers
  const handleSellToBuyers = () => {
    if (onNavigate) {
      onNavigate('/buyers');
    } else {
      window.location.href = `/buyers?crop=${encodeURIComponent(selectedCrop.name)}&grade=${params.grade}&qtl=${quantityInQuintals}`;
    }
  };

  const handleSpeakOverview = () => {
    const text =
      language === 'hi'
        ? `मूल्य खोज परिणाम: ${params.quantityValue} ${params.quantityUnit} ${selectedCrop.name} ग्रेड ${params.grade} के लिए सबसे अधिक शुद्ध भाव ${topMandi?.mandi.name} में ₹${topMandi?.netPricePerQtl} प्रति क्विंटल है।`
        : language === 'bn'
        ? `মূল্য আবিষ্কার ফলাফল: ${params.quantityValue} ${params.quantityUnit} ${selectedCrop.name} গ্রেড ${params.grade} এর জন্য সর্বোচ্চ নিট দর ${topMandi?.mandi.name} এ ₹${topMandi?.netPricePerQtl} প্রতি কুইন্টাল।`
        : `Price Discovery Result: For ${params.quantityValue} ${params.quantityUnit} of ${selectedCrop.name} Grade ${params.grade}, the highest net realization is at ${topMandi?.mandi.name} with ₹${topMandi?.netPricePerQtl} per quintal.`;
    speakText(text);
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Multi-Mandi Freight Optimization Engine</span>
              <button
                type="button"
                onClick={handleSpeakOverview}
                title="Read discovery summary"
                className="ml-1 p-0.5 hover:bg-emerald-700 rounded text-amber-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Smart Price Discovery & Market Intelligence
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Compare gross modal prices across 20 APMC Mandis, automatically calculate distance-based transit freight deductions, and unlock the true net earnings for your harvest.
            </p>
          </div>

          {/* Quick Direct Buyer Linkage CTA Banner */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center sm:text-left space-y-3 shrink-0 relative z-10">
            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Escrow Trading</span>
            </div>
            <p className="text-xs text-white font-medium">
              Want to skip mandi loading & fees entirely?
            </p>
            <button
              type="button"
              onClick={handleSellToBuyers}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <span>Sell to Buyers at Discovered Price</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Price Discovery Form */}
        <PriceDiscoveryForm
          params={params}
          onChange={setParams}
          onReset={handleReset}
        />

        {/* 2. AI Advisor Rule-Based Card */}
        <AiAdvisorCard
          cropName={selectedCrop.name}
          grade={params.grade}
          quantityInQuintals={quantityInQuintals}
          topMandi={topMandi}
          secondMandi={secondMandi}
          fairPriceMin={fairPriceMin}
          fairPriceMax={fairPriceMax}
          marketAveragePrice={marketAveragePrice}
        />

        {/* 3. Market Comparison Table */}
        <MarketComparisonTable
          evaluatedMandis={evaluatedMandis}
          cropName={selectedCrop.name}
          grade={params.grade}
          quantityInQuintals={quantityInQuintals}
        />

        {/* 4. Recharts Historical Price History Chart */}
        <PriceHistoryChart
          cropName={selectedCrop.name}
          basePrice={topMandi?.grossPricePerQtl || selectedCrop.basePricePerQuintal}
        />

        {/* 5. Direct Conversion CTA Bar */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black text-white">
              Ready to sell {quantityInQuintals} Quintals of {selectedCrop.name} (Grade {params.grade})?
            </h3>
            <p className="text-xs text-emerald-200">
              Lock verified contracts with FPOs, retail sourcing hubs, and exporters at ₹{topMandi?.netPricePerQtl}/Qtl with 100% Escrow security.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleSellToBuyers}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              <span>Sell to Buyers at Discovered Price</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:18001801551"
              className="inline-flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 font-bold text-xs px-4 py-3.5 rounded-2xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PriceDiscoveryPage;
