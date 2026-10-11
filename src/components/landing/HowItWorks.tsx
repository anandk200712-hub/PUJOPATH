import React from 'react';
import {
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  Banknote,
  ArrowRight,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { language, speakText } = useApp();

  const steps = [
    {
      number: '01',
      title: language === 'hi' ? 'भाव व ग्रेड जांचें' : language === 'bn' ? 'দর ও গ্রেড যাচাই' : 'Check Prices & Grade',
      subtitle: language === 'hi' ? 'लाइव मंडी दरें एवं गुणवत्ता' : language === 'bn' ? 'লাইভ মান্ডি দর ও গুণমান' : 'Live APMC & Assaying',
      description:
        language === 'hi'
          ? 'अपनी फसल का ग्रेड (A, B, C) तय करें और 20 प्रमुख मंडियों के लाइव भाव व परिवहन खर्च की तुलना करें।'
          : language === 'bn'
          ? 'আপনার ফসলের গ্রেড (A, B, C) নির্বাচন করুন এবং ২০টি মান্ডির লাইভ দর ও পরিবহন খরচ তুলনা করুন।'
          : 'Determine your harvest quality grade (A, B, C) and compare real-time APMC rates factoring in net transit freight.',
      icon: TrendingUp,
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      number: '02',
      title: language === 'hi' ? 'सीधे ऑफर प्राप्त करें' : language === 'bn' ? 'সরাসরি অফার পান' : 'Get Direct B2B Bids',
      subtitle: language === 'hi' ? 'सत्यापित खरीदारों की मांग' : language === 'bn' ? 'যাচাইকৃত ক্রেতাদের চাহিদা' : 'Verified Buyer Demands',
      description:
        language === 'hi'
          ? 'संस्थागत खरीदारों, एफपीओ और खुदरा विक्रेताओं से बिना किसी बिचौलिए के पारदर्शी खरीद प्रस्ताव प्राप्त करें।'
          : language === 'bn'
          ? 'এফপিও, রপ্তানিকারক ও রিটেল চেইনের থেকে সরাসরি কোনো দালাল ছাড়াই স্বচ্ছ প্রস্তাব পান।'
          : 'Review verified purchase bids from FPOs, food processors, and exporters with upfront pricing and quantity commitments.',
      icon: FileCheck2,
      accentBg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      number: '03',
      title: language === 'hi' ? 'एस्क्रो से सौदा सुरक्षित करें' : language === 'bn' ? 'এস্ক্রো দ্বারা চুক্তি নিশ্চিত' : 'Lock Escrow Deal',
      subtitle: language === 'hi' ? '100% सुरक्षित भुगतान गारंटी' : language === 'bn' ? '১০০% নিরাপদ পেমেন্ট গ্যারান্টি' : '100% Protected Terms',
      description:
        language === 'hi'
          ? 'प्रस्ताव स्वीकार करें। किसानसेतु एस्क्रो में राशि जमा होने के बाद खेत से पिकअप या हब डिलीवरी की सुविधा।'
          : language === 'bn'
          ? 'অফার গ্রহণ করুন। কিষাণসেতু এস্ক্রোতে টাকা জমা হওয়ার পর ফার্ম থেকে পিকআপের সুবিধা পান।'
          : 'Accept the deal with full confidence. Buyer funds are deposited into KisanSetu Escrow before farm-gate dispatch.',
      icon: ShieldCheck,
      accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      number: '04',
      title: language === 'hi' ? 'खाते में सीधा भुगतान' : language === 'bn' ? 'ব্যাংক অ্যাকাউন্টে টাকা' : 'Instant Direct Payout',
      subtitle: language === 'hi' ? '24 घंटे में डीबीटी क्रेडिट' : language === 'bn' ? '২৪ ঘণ্টায় সরাসরি ব্যাংক ট্রান্সফার' : '24-Hour DBT Transfer',
      description:
        language === 'hi'
          ? 'तौल पर्ची सत्यापन के साथ 24 घंटे के भीतर सीधे आधार-लिंक्ड बैंक खाते में पूरी राशि हस्तांतरित।'
          : language === 'bn'
          ? 'ওজন ও গুণমান পরীক্ষার পর ২৪ ঘণ্টার মধ্যে সরাসরি আধার-সংযুক্ত ব্যাংক অ্যাকাউন্টে সম্পূর্ণ টাকা জমা।'
          : 'Upon automated weighbridge verification, 100% of proceeds are transferred directly into your Aadhaar-linked bank account.',
      icon: Banknote,
      accentBg: 'bg-green-50 text-green-800 border-green-200',
    },
  ];

  const handleReadProcess = () => {
    const summary =
      language === 'hi'
        ? 'किसानसेतु की कार्यप्रणाली 4 आसान चरणों में: पहला, भाव और ग्रेड जांचें। दूसरा, सीधे ऑफर प्राप्त करें। तीसरा, एस्क्रो से सौदा पक्का करें। चौथा, 24 घंटे में बैंक खाते में सीधा भुगतान।'
        : language === 'bn'
        ? 'কিষাণসেতু ব্যবহারের ৪টি সহজ ধাপ: ১. দর ও গ্রেড যাচাই। ২. সরাসরি অফার গ্রহণ। ৩. এস্ক্রো নিরাপত্তা। ৪. ২৪ ঘণ্টার মধ্যে ব্যাংক অ্যাকাউন্টে সরাসরি পেমেন্ট।'
        : 'How KisanSetu works in 4 simple steps: Step 1, Check live rates and quality grade. Step 2, Receive verified direct buyer offers. Step 3, Lock contract with 100% escrow protection. Step 4, Receive instant payout to your bank account.';
    speakText(summary);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Simple 4-Step Process</span>
            <button
              type="button"
              onClick={handleReadProcess}
              title="Listen to how it works"
              className="ml-1 p-0.5 hover:bg-emerald-700 rounded text-emerald-200"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'hi'
              ? 'खेत से खाते तक — 4 सरल कदम'
              : language === 'bn'
              ? 'খামার থেকে ব্যাংক অ্যাকাউন্ট — ৪টি সহজ ধাপ'
              : 'From Harvest to Bank — How KisanSetu Works'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'पारदर्शी डिजिटल तकनीक से किसान को मिले फसल का सही मोल, बिना किसी परेशानी के।'
              : language === 'bn'
              ? 'স্বচ্ছ ডিজিটাল প্রযুক্তির মাধ্যমে কৃষকের জন্য ফসলের সঠিক মূল্য নিশ্চিত করা।'
              : 'Empowering farmers with zero-friction trade, transparent assaying, and guaranteed fast digital settlement.'}
          </p>
        </div>

        {/* 4-Step Horizontal Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/60 transition-all group"
              >
                {/* Step Number & Connector Line */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-mono font-black text-lg group-hover:scale-105 transition-transform">
                    {step.number}
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-slate-700/70 flex items-center justify-center text-slate-300">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Step {index + 1} of 4</span>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <span className="text-emerald-400 font-bold">Complete Deal</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
