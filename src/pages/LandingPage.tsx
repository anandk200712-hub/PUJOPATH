import React from 'react';
import {
  TrendingUp,
  Users,
  Award,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsCounter } from '../components/landing/StatsCounter';
import { FeaturePillars } from '../components/landing/FeaturePillars';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';

export interface LandingPageProps {
  onNavigate?: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { language, speakText, t } = useApp();

  const handleCtaClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  const handleSpeakCta = () => {
    const text =
      language === 'hi'
        ? 'आज ही किसानसेतु से जुड़ें। अपनी फसल का सही मूल्य पाएं और सीधे सत्यापित खरीदारों से व्यापार करें। किसान कॉल सेंटर नंबर 1800-180-1551 पर कभी भी संपर्क करें।'
        : language === 'bn'
        ? 'আজই কিষাণসেতুতে যোগ দিন। ফসলের সঠিক মূল্য পান এবং সরাসরি যাচাইকৃত ক্রেতাদের সাথে বাণিজ্য করুন।'
        : 'Join KisanSetu today. Discover transparent mandi rates, trade directly with verified buyers, and access government support. Call 1800-180-1551 toll-free.';
    speakText(text);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Live Impact Stats Counter Overlay */}
      <StatsCounter />

      {/* 3. Three Core Value Pillars */}
      <FeaturePillars onNavigate={onNavigate} />

      {/* 4. 4-Step How It Works Process */}
      <HowItWorks />

      {/* 5. Real Farmer Testimonials */}
      <Testimonials />

      {/* 6. High-Impact Bottom Call To Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-emerald-500/30 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ready to transform your agricultural sales?</span>
              <button
                type="button"
                onClick={handleSpeakCta}
                title="Read CTA"
                className="ml-1 p-0.5 hover:bg-emerald-700 rounded text-amber-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {language === 'hi' ? (
                <>
                  अपनी फसल का <span className="text-emerald-400">उचित मूल्य</span> आज ही पाएं
                </>
              ) : language === 'bn' ? (
                <>
                  আপনার ফসলের <span className="text-emerald-400">ন্যায্য মূল্য</span> আজই নিশ্চিত করুন
                </>
              ) : (
                <>
                  Experience Fair Agriculture with <span className="text-emerald-400">KisanSetu</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
              {language === 'hi'
                ? 'लाइव मंडी भाव जांचें, सीधे सत्यापित खरीदारों के ऑफर देखें, या 1800-180-1551 पर हमारे किसान सलाहकारों से बात करें।'
                : language === 'bn'
                ? 'লাইভ মান্ডি দর যাচাই করুন, সরাসরি ক্রেতাদের অফার দেখুন অথবা ১৮০০-১৮০-১৫৫১ নম্বরে পরামর্শ নিন।'
                : 'Compare 20 APMC Mandis, lock verified direct buyer contracts with 100% Escrow security, and check government scheme eligibility in minutes.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => handleCtaClick('/prices')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-900/60 hover:scale-105 active:scale-95 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span>
                  {language === 'hi'
                    ? 'लाइव भाव खोजें'
                    : language === 'bn'
                    ? 'লাইভ বাজার দর'
                    : 'Check Today’s Mandi Rates'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleCtaClick('/buyers')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-emerald-500/40 font-bold text-base px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <Users className="w-5 h-5 text-emerald-400" />
                <span>
                  {language === 'hi'
                    ? 'सीधे खरीदार देखें'
                    : language === 'bn'
                    ? 'সরাসরি ক্রেতা দেখুন'
                    : 'View Verified Buyer Demands'}
                </span>
              </button>

              <a
                href="tel:18001801551"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-6 py-4 rounded-2xl shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>1800-180-1551 (Helpline)</span>
              </a>
            </div>

            {/* Bottom trust assurances */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-300/80 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Registration for All Farmers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Safe Escrow Settlement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Available in Hindi, Bengali & English</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
