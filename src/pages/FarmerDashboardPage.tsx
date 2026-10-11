import React, { useState } from 'react';
import {
  Sprout,
  TrendingUp,
  Users,
  Award,
  Calculator,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Volume2,
  DollarSign,
  Truck,
  IndianRupee,
  Calendar,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BuyerOffer } from '../types';

interface FarmerDashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const FarmerDashboardPage: React.FC<FarmerDashboardPageProps> = ({ onNavigate }) => {
  const {
    farmerProfile,
    buyerOffers,
    crops,
    schemes,
    language,
    speakText,
    acceptOffer,
    rejectOffer,
  } = useApp();

  // Net Revenue Calculator State
  const [calcQuantityQtl, setCalcQuantityQtl] = useState<number>(150);
  const [calcGrossRate, setCalcGrossRate] = useState<number>(2550);
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(85);
  const [calcFreightRateKm, setCalcFreightRateKm] = useState<number>(4.0);

  // Revenue Math Formulas
  const grossRevenue = calcQuantityQtl * calcGrossRate;
  const totalLogisticsCost = Math.round(calcQuantityQtl * calcDistanceKm * calcFreightRateKm);
  const estimatedNetProfit = grossRevenue - totalLogisticsCost;
  const middlemanSaved = Math.round(grossRevenue * 0.08); // 8% commission saved

  // Key metrics
  const activeOffersCount = buyerOffers.length;
  const acceptedOffers = buyerOffers.filter((o) => o.status === 'Accepted');
  const totalEscrowLockedValue = acceptedOffers.reduce((acc, curr) => acc + curr.totalOfferValue, 0);

  const handleSpeakDashboard = () => {
    const text =
      language === 'hi'
        ? `किसान डैशबोर्ड: ${farmerProfile.fullName}, कुल भूमि ${farmerProfile.landSizeAcres} एकड़। आपके पास ${activeOffersCount} सक्रिय खरीद प्रस्ताव हैं। स्वीकृत सौदों का एस्क्रो मूल्य ₹${totalEscrowLockedValue.toLocaleString('en-IN')} है। मौसम शुष्क और फसल कटाई के लिए 100% अनुकूल है।`
        : `Farmer Dashboard for ${farmerProfile.fullName}. Landholding ${farmerProfile.landSizeAcres} Acres. You have ${activeOffersCount} active buyer bids, with ₹${totalEscrowLockedValue.toLocaleString('en-IN')} locked in accepted escrow contracts. Weather forecast is clear and sunny for harvesting.`;
    speakText(text);
  };

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Hero Banner & Farmer Greeting */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Digital Kisan Passbook & Command Center</span>
              <button
                type="button"
                onClick={handleSpeakDashboard}
                title="Read dashboard overview"
                className="ml-1 p-0.5 hover:bg-emerald-700 rounded text-amber-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {language === 'hi'
                ? `नमस्ते, ${farmerProfile.hindiName || farmerProfile.fullName}`
                : `Welcome back, ${farmerProfile.fullName}`}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state} • {farmerProfile.landSizeAcres} Acres ({farmerProfile.soilType} Soil) • KCC Card Active
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => handleNavigate('/prices')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Check Prices</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate('/buyers')}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              <Users className="w-4 h-4" />
              <span>View Buyers ({buyerOffers.length})</span>
            </button>
          </div>
        </div>

        {/* 1. Weather Alert & Market Intelligence Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-blue-500/10 border border-amber-300/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <CloudSun className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  72-Hour Harvest Weather Alert
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {farmerProfile.district} Agrometeorological Advisory
                </span>
              </div>
              <p className="text-xs text-slate-800 mt-1 font-medium leading-relaxed">
                Clear skies & dry sunny conditions (28°C - 33°C, 0% rain probability). <strong>Optimal window for Tomato, Potato, and Rabi harvesting.</strong> Vashi & Azadpur Mandi tomato rates up +5.2%.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(`Weather Advisory for ${farmerProfile.district}: Next 3 days will remain dry and sunny with zero rain. Ideal window for harvesting. Tomato prices are surging in Azadpur and Vashi Mandis.`)}
            className="self-start md:self-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shrink-0 transition-colors flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Weather Advisory</span>
          </button>
        </div>

        {/* 2. Four Key Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Active Crops */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                {farmerProfile.landSizeAcres} Acres
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {farmerProfile.primaryCrops.length} Crops
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5">
                Primary Harvest Portfolio
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                {farmerProfile.primaryCrops.join(', ')}
              </p>
            </div>
          </div>

          {/* Card 2: Best Discovered Price */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                +5.2% Today
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
                ₹2,620<span className="text-xs text-slate-500 font-normal"> / Qtl</span>
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5">
                Best Net Realization (Tomato)
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Vashi & Azadpur Mandi Peak
              </p>
            </div>
          </div>

          {/* Card 3: Active Buyer Bids */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Escrow Protected
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {activeOffersCount} Demands
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5">
                Active B2B Buyer Quotes
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                ₹{totalEscrowLockedValue.toLocaleString('en-IN')} in locked contracts
              </p>
            </div>
          </div>

          {/* Card 4: Matched Schemes */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <span className="text-[10px] font-extrabold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                100% Eligible
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {schemes.length} Schemes
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5">
                Government Subsidies Matched
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                PM-KISAN ₹6k DBT + 4% KCC Credit
              </p>
            </div>
          </div>

        </div>

        {/* 3. Net Revenue Calculator Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Calculator className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Net Revenue & Freight Profit Calculator
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Formula: Quantity × Gross Rate − Logistics Freight = Estimated Net Profit
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-extrabold rounded-full">
              Zero Middleman Commission
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls: Interactive Sliders & Inputs */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Quantity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Harvest Quantity:</span>
                  <span className="text-emerald-800 font-mono">{calcQuantityQtl} Quintals (≈ {calcQuantityQtl * 100} kg)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={calcQuantityQtl}
                  onChange={(e) => setCalcQuantityQtl(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Best Mandi Gross Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Best Mandi Gross Price:</span>
                  <span className="text-emerald-800 font-mono">₹{calcGrossRate} / Quintal</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="50"
                  value={calcGrossRate}
                  onChange={(e) => setCalcGrossRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Transit Distance & Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Distance:</span>
                    <span className="font-mono text-slate-900">{calcDistanceKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={calcDistanceKm}
                    onChange={(e) => setCalcDistanceKm(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Freight Rate:</span>
                    <span className="font-mono text-slate-900">₹{calcFreightRateKm}/Qtl-km</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="6.0"
                    step="0.5"
                    value={calcFreightRateKm}
                    onChange={(e) => setCalcFreightRateKm(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>

            </div>

            {/* Right Output: Net Profit Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 space-y-4 border border-emerald-500/30 shadow-xl">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Net Proceeds Breakdown
              </span>

              <div className="space-y-2 text-xs border-b border-emerald-800 pb-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Gross Sales Value:</span>
                  <span className="font-mono font-bold text-white">₹{grossRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-red-300">
                  <span>Transit Freight Deduction:</span>
                  <span className="font-mono font-bold">-₹{totalLogisticsCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-emerald-200 block">Estimated Net Take-Home:</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono mt-1">
                  ₹{estimatedNetProfit.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 bg-emerald-800/60 rounded-xl text-xs text-emerald-100 border border-emerald-500/30 flex items-center justify-between">
                <span>Middleman Brokerage Saved:</span>
                <strong className="text-amber-300 font-mono font-bold">+₹{middlemanSaved.toLocaleString('en-IN')}</strong>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Recent Transactions & Active Offers Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Recent Direct Buyer Offers & Deals
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Live status synced across KisanSetu B2B procurement network.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate('/buyers')}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <span>Explore All Buyer Demands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Offers Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px] bg-slate-50">
                  <th className="py-3 px-4 rounded-l-xl">Buyer Organization</th>
                  <th className="py-3 px-3">Crop & Grade</th>
                  <th className="py-3 px-3">Quantity</th>
                  <th className="py-3 px-3">Offered Rate</th>
                  <th className="py-3 px-3">Total Value</th>
                  <th className="py-3 px-3">Payment Terms</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buyerOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{offer.buyerName}</div>
                      <span className="text-[11px] text-slate-500">{offer.location}</span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800">
                      {offer.cropName} (G-{offer.requiredGrade})
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold">
                      {offer.requestedQuantityQuintals} Qtl
                    </td>
                    <td className="py-3.5 px-3 font-mono font-black text-emerald-800">
                      ₹{offer.offeredPricePerQuintal}/Qtl
                    </td>
                    <td className="py-3.5 px-3 font-mono font-black text-slate-900">
                      ₹{offer.totalOfferValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3 text-[11px] text-slate-600">
                      {offer.paymentTerms}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          offer.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : offer.status === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {offer.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => acceptOffer(offer.id)}
                            className="px-2.5 py-1 bg-emerald-700 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-800 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => rejectOffer(offer.id)}
                            className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold text-[11px] hover:bg-red-50 hover:text-red-700 transition-colors"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboardPage;
