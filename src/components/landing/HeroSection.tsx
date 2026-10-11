import React from 'react';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle2,
  Building2,
  Coins,
  MapPin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeroSectionProps {
  onNavigate?: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t, language, speakText, crops } = useApp();

  const handleReadHero = () => {
    const speechText =
      language === 'hi'
        ? 'होशियारी से बेचें। उचित दाम पाएं। किसानसेतु किसानों को सटीक मंडी भाव, सीधे खरीदारों और सरकारी योजनाओं से एक ही मंच पर जोड़ता है।'
        : language === 'bn'
        ? 'বুদ্ধিমানের মতো বিক্রি করুন। ন্যায্য মূল্য পান। কিষাণসেতু কৃষকদের সঠিক বাজার দর, সরাসরি ক্রেতা এবং সরকারি সুবিধার সাথে এক জায়গায় সংযুক্ত করে।'
        : 'Sell Smarter. Earn Fairer. KisanSetu connects farmers with fair market prices, direct buyers, and government support — all in one place.';
    speakText(speechText);
  };

  const handleCtaClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* National Agri-Market Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Smart India Hackathon • National Agri-Market Platform</span>
              <button
                type="button"
                onClick={handleReadHero}
                title="Read aloud hero section"
                className="ml-1 p-1 hover:bg-emerald-700 rounded-full text-amber-300 transition-colors"
                aria-label="Listen to Hero Description"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {language === 'hi' ? (
                <>
                  होशियारी से बेचें। <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-amber-300 bg-clip-text text-transparent">
                    उचित दाम पाएं।
                  </span>
                </>
              ) : language === 'bn' ? (
                <>
                  বুদ্ধিমানের মতো বিক্রি করুন। <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-amber-300 bg-clip-text text-transparent">
                    ন্যায্য মূল্য পান।
                  </span>
                </>
              ) : (
                <>
                  Sell Smarter. <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-amber-300 bg-clip-text text-transparent">
                    Earn Fairer.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {language === 'hi'
                ? 'किसानसेतु किसानों को सटीक मंडी भाव, सीधे खरीदारों और सरकारी सहायता से एक ही डिजिटल मंच पर जोड़ता है — बिना किसी बिचौलिए के।'
                : language === 'bn'
                ? 'কিষাণসেতু কৃষকদের সঠিক বাজার দর, সরাসরি ক্রেতা এবং সরকারি সহায়তার সাথে এক প্ল্যাটফর্মে যুক্ত করে — কোনো মধ্যস্বত্বভোগী ছাড়াই।'
                : 'KisanSetu connects farmers with fair market prices, direct buyers, and government support — all in one place.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleCtaClick('/prices')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-base px-7 py-4 rounded-2xl shadow-xl shadow-emerald-900/50 hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span>
                  {language === 'hi'
                    ? 'लाइव मंडी भाव देखें'
                    : language === 'bn'
                    ? 'লাইভ মান্ডি দর দেখুন'
                    : 'Explore Live Mandi Prices'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleCtaClick('/buyers')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-white border border-emerald-500/30 font-bold text-base px-7 py-4 rounded-2xl backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Users className="w-5 h-5 text-emerald-400" />
                <span>
                  {language === 'hi'
                    ? 'सीधे खरीदार खोजें'
                    : language === 'bn'
                    ? 'সরাসরি ক্রেতা খুঁজুন'
                    : 'Connect with Direct Buyers'}
                </span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-emerald-800/50 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200/90 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Agmarknet & e-NAM Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Escrow Payment Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Zero Middlemen Brokerage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Price & Buyer Demand Overlay Card */}
          <div className="lg:col-span-5 relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Live Market Ticker
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  20 APMC Mandis Synced
                </span>
              </div>

              {/* Sample Live Crop Cards */}
              <div className="space-y-3">
                {crops.slice(0, 3).map((crop) => (
                  <div
                    key={crop.id}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/50 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-emerald-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white">
                            {crop.name}
                          </h4>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                            Grade A
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {language === 'hi' ? crop.hindiName : crop.category} • Avg modal rate
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-emerald-400">
                        ₹{crop.qualityGrades[0]?.maxPrice || crop.basePricePerQuintal}
                      </div>
                      <span className="text-[10px] text-slate-400">/ Quintal</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Buyer Live Request Snippet */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-slate-800/80 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> High-Value Buyer Request
                  </span>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Escrow Ready
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  <strong>KisanVikas FPO</strong> wants <strong>150 Qtl Tomato (Grade A)</strong> at <strong>₹2,550/Qtl</strong> with doorstep pickup.
                </p>
              </div>

              {/* Quick Audio Walkthrough Trigger */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Active across 5 Indian zones
                </span>
                <button
                  type="button"
                  onClick={() => speakText("Tomato modal prices are up 5.2% today in Azadpur and Vashi Mandis. KisanVikas FPO has placed a verified demand for 150 quintals.")}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px] underline"
                >
                  <Volume2 className="w-3 h-3" /> Listen Audio Summary
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
