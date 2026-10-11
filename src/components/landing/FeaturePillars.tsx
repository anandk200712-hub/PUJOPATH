import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Building2,
  CheckCircle2,
  FileCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FeaturePillarsProps {
  onNavigate?: (route: string) => void;
}

export const FeaturePillars: React.FC<FeaturePillarsProps> = ({ onNavigate }) => {
  const { language, speakText } = useApp();
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: language === 'hi' ? 'निष्पक्ष मंडी भाव खोज' : language === 'bn' ? 'ন্যায্য বাজার দর অনুসন্ধান' : 'Fair Price Discovery',
      subtitle: language === 'hi' ? '20 से अधिक मंडियों के लाइव भाव व भाड़ा कैलकुलेटर' : language === 'bn' ? '২০টির বেশি মান্ডির লাইভ দর ও পরিবহন খরচ' : '20+ APMC Mandis & Transit Freight Calculator',
      description:
        language === 'hi'
          ? 'उत्तर, मध्य, पूर्व, पश्चिम और दक्षिण भारत की प्रमुख मंडियों के दैनिक मॉडल भाव की तुलना करें। अपनी दूरी के अनुसार वास्तविक परिवहन खर्च जोड़कर सर्वोत्तम लाभ का अनुमान लगाएं।'
          : language === 'bn'
          ? 'ভারতের ২০টি প্রধান এপিএমসি মান্ডির রিয়েল-টাইম দর তুলনা করুন এবং আপনার খামার থেকে পরিবহন খরচের সঠিক হিসাব পান।'
          : 'Compare real-time modal prices across 20 major APMC mandis nationwide. Factor in transit distance and freight costs to identify the most lucrative market for your produce.',
      icon: TrendingUp,
      badgeText: 'Live Agmarknet Sync',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      borderColor: 'hover:border-emerald-500',
      accentColor: 'text-emerald-700',
      route: '/prices',
      actionLabel: language === 'hi' ? 'मंडी भाव की तुलना करें' : language === 'bn' ? 'মান্ডি দর তুলনা করুন' : 'Compare Mandi Rates',
      highlights: [
        'Live modal, min & max rates updated daily',
        'Automatic transit freight calculation (₹/qtl-km)',
        'Clear Grade A, B & C pricing matrix',
      ],
    },
    {
      id: 2,
      title: language === 'hi' ? 'सीधा खरीदार संपर्क व एस्क्रो' : language === 'bn' ? 'সরাসরি ক্রেতা সংযোগ ও এস্ক্রো' : 'Direct Buyer Linkage',
      subtitle: language === 'hi' ? 'सत्यापित एफपीओ, खुदरा श्रृंखला और खाद्य प्रसंस्करण इकाइयां' : language === 'bn' ? 'যাচাইকৃত এফপিও, রিটেল চেইন ও প্রসেসিং ইউনিট' : 'Verified FPOs, Retail Chains & Food Processors',
      description:
        language === 'hi'
          ? 'बिचौलियों और आढ़तियों की भारी कटौती को समाप्त करें। सत्यापित संस्थागत खरीदारों से सीधे जुड़ें और किसानसेतु डिजिटल एस्क्रो के साथ 100% सुरक्षित भुगतान प्राप्त करें।'
          : language === 'bn'
          ? 'দালাল ও মধ্যস্বত্বভোগীদের কমিশন এড়িয়ে সরাসরি এফপিও এবং প্রক্রিয়াকরণ সংস্থাগুলির সাথে যুক্ত হোন। কিষাণসেতু এস্ক্রোর মাধ্যমে সুরক্ষিত পেমেন্ট পান।'
          : 'Bypass traditional commission agents and middleman deductions. Trade directly with verified institutional buyers, exporters, and retail hubs with guaranteed 100% KisanSetu Escrow protection.',
      icon: Users,
      badgeText: '100% Escrow Protected',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      borderColor: 'hover:border-blue-500',
      accentColor: 'text-blue-700',
      route: '/buyers',
      actionLabel: language === 'hi' ? 'सत्यापित खरीदार देखें' : language === 'bn' ? 'যাচাইকৃত ক্রেতা দেখুন' : 'Explore Direct Buyers',
      highlights: [
        'Pre-verified GST & trade-tested buyers',
        'Instant deal acceptance & counter-offer tools',
        'Doorstep farm pickup or hub delivery',
      ],
    },
    {
      id: 3,
      title: language === 'hi' ? 'सरकारी योजनाएं व पात्रता' : language === 'bn' ? 'সরকারি প্রকল্প ও যোগ্যতা' : 'Government Schemes',
      subtitle: language === 'hi' ? 'पीएम-किसान, फसल बीमा, केसीसी व मृदा स्वास्थ्य कार्ड' : language === 'bn' ? 'পিএম-কিষাণ, ফসল বীমা, কেসিসি ও মৃত্তিকা স্বাস্থ্য' : 'PM-KISAN, PMFBY, KCC & Soil Health Card',
      description:
        language === 'hi'
          ? 'एक क्लिक में जानें कि आप किन-किन केंद्रीय एवं राज्य स्तरीय कृषि सब्सिडी योजनाओं के पात्र हैं। आवश्यक दस्तावेजों की सूची पाएं और आधिकारिक पोर्टल पर सीधा आवेदन करें।'
          : language === 'bn'
          ? '১-ক্লিকে জানুন আপনি কোন কোন সরকারি প্রকল্পের জন্য যোগ্য। প্রয়োজনীয় নথিপত্র এবং সরাসরি আবেদন করার লিংক এক জায়গায় পান।'
          : 'Discover agricultural subsidies and welfare programs tailored to your landholding. Check instant eligibility for PM-KISAN, PMFBY, 4% KCC loans, and Soil Health Cards with official links.',
      icon: Award,
      badgeText: 'Direct Benefit Transfer (DBT)',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      borderColor: 'hover:border-amber-500',
      accentColor: 'text-amber-700',
      route: '/schemes',
      actionLabel: language === 'hi' ? 'पात्र योजनाएं जांचें' : language === 'bn' ? 'প্রকল্পগুলি দেখুন' : 'Check Scheme Eligibility',
      highlights: [
        '5 top central & state agricultural initiatives',
        'Transparent eligibility criteria & checklists',
        'Direct links to official ministry portals',
      ],
    },
  ];

  const handleActionClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Core Solution Pillars</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'hi'
              ? 'भारतीय किसानों के लिए 3 सशक्त स्तंभ'
              : language === 'bn'
              ? 'ভারতীয় কৃষকদের জন্য ৩টি শক্তিশালী স্তম্ভ'
              : 'Built Around Three Core Farmer Needs'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'पारदर्शी भाव खोज, सुरक्षित प्रत्यक्ष व्यापार और सरकारी कल्याणकारी योजनाओं का सुगम संगम।'
              : language === 'bn'
              ? 'স্বচ্ছ বাজার দর, সরাসরি নিরাপদ বাণিজ্য এবং সরকারি কল্যাণমূলক সুবিধার সহজ সংযোগ।'
              : 'Delivering end-to-end fair value through transparency, institutional demand aggregation, and direct government access.'}
          </p>
        </div>

        {/* 3 Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isHovered = hoveredPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                className={`relative rounded-3xl border border-slate-200 bg-slate-50/50 p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHovered ? 'shadow-2xl scale-[1.02] bg-white border-emerald-400' : 'hover:shadow-lg'
                }`}
              >
                <div className="space-y-6">
                  {/* Top Row: Icon, Badge, Audio */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center ${pillar.accentColor}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${pillar.badgeColor}`}
                      >
                        {pillar.badgeText}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakText(`${pillar.title}. ${pillar.description}`)}
                        title="Read aloud pillar details"
                        className="p-1.5 rounded-full hover:bg-slate-200/80 text-slate-500 hover:text-emerald-700 transition-colors"
                        aria-label="Listen to Card"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature Highlights Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-200/70">
                    {pillar.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleActionClick(pillar.route)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all group"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturePillars;
