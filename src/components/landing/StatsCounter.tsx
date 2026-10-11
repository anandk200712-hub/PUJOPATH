import React from 'react';
import {
  IndianRupee,
  Users2,
  Scale,
  Store,
  ShieldCheck,
  Zap,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatsCounter: React.FC = () => {
  const { language, speakText } = useApp();

  const stats = [
    {
      id: 'stat-earnings',
      value: '₹4.2 Cr+',
      label: language === 'hi' ? 'किसानों की सीधी कमाई' : language === 'bn' ? 'কৃষকদের প্রত্যক্ষ আয়' : 'Fair Farmer Earnings',
      sublabel: language === 'hi' ? 'बिना आढ़त कटौती के' : language === 'bn' ? 'দালাল কমিশন মুক্ত' : 'Zero middleman deduction',
      icon: IndianRupee,
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      id: 'stat-buyers',
      value: '1,200+',
      label: language === 'hi' ? 'सत्यापित खरीदार व एफपीओ' : language === 'bn' ? 'যাচাইকৃত ক্রেতা ও এফপিও' : 'Verified Buyers & FPOs',
      sublabel: language === 'hi' ? 'संस्थागत व कॉर्पोरेट' : language === 'bn' ? 'প্রাতিষ্ঠানিক ও পাইকারি' : 'Direct procurement hubs',
      icon: Users2,
      color: 'text-blue-700 bg-blue-100',
    },
    {
      id: 'stat-tonnes',
      value: '18,000+',
      label: language === 'hi' ? 'टन फसल का सुरक्षित व्यापार' : language === 'bn' ? 'টন ফসল সুরক্ষিত বাণিজ্য' : 'Tonnes Produce Traded',
      sublabel: language === 'hi' ? 'टमाटर, आलू, प्याज, गेहूं' : language === 'bn' ? 'টমেটো, আলু, পেঁয়াজ, গম' : 'Grade A & B verified',
      icon: Scale,
      color: 'text-amber-700 bg-amber-100',
    },
    {
      id: 'stat-mandis',
      value: '20 APMCs',
      label: language === 'hi' ? 'राष्ट्रीय मंडी नेटवर्क' : language === 'bn' ? 'জাতীয় মান্ডি নেটওয়ার্ক' : 'Integrated Mandi Hubs',
      sublabel: language === 'hi' ? '5 भौगोलिक क्षेत्रों में' : language === 'bn' ? '৫টি অঞ্চলে বিস্তৃত' : 'Across 5 national zones',
      icon: Store,
      color: 'text-purple-700 bg-purple-100',
    },
  ];

  const handleReadStats = () => {
    const text =
      language === 'hi'
        ? 'किसानसेतु का प्रभाव: 4.2 करोड़ रुपये से अधिक की सीधी किसान कमाई, 1200 से अधिक सत्यापित खरीदार, 18000 टन से अधिक फसल व्यापार, और 20 प्रमुख मंडियों का लाइव नेटवर्क।'
        : language === 'bn'
        ? 'কিষাণসেতুর প্রভাব: ৪.২ কোটি টাকার বেশি কৃষকদের আয়, ১২০০+ যাচাইকৃত ক্রেতা, ১৮,০০০+ টন ফসল বাণিজ্য, এবং ২০টি প্রধান মান্ডির নেটওয়ার্ক।'
        : 'KisanSetu Impact Metrics: Over 4.2 Crore Rupees earned by farmers, 1,200 verified buyers and FPOs, 18,000 tonnes of produce traded, across 20 integrated APMC mandis.';
    speakText(text);
  };

  return (
    <section className="relative -mt-10 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-6 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'hi'
                ? 'राष्ट्रीय स्तर पर किसानसेतु का प्रभाव'
                : language === 'bn'
                ? 'জাতীয় স্তরে কিষাণসেতুর প্রভাব'
                : 'Real-World Agricultural Impact'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live transaction metrics aggregated from verified direct farm trades and e-NAM lots.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReadStats}
            title="Read aloud statistics"
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Impact Summary</span>
          </button>
        </div>

        {/* 4 Large Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Escrow-backed trade settlement guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Direct bank transfer (DBT) within 24 hours of weighment</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Toll-free Kisan Call Center support (1800-180-1551)</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsCounter;
