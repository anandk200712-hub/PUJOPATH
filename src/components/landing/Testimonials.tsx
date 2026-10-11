import React from 'react';
import {
  Star,
  Quote,
  MapPin,
  TrendingUp,
  Volume2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Testimonials: React.FC = () => {
  const { language, speakText } = useApp();

  const testimonials = [
    {
      id: 't-1',
      name: language === 'hi' ? 'राजेश्वर शर्मा' : language === 'bn' ? 'রাজেশ্বর শর্মা' : 'Rajeshwar Sharma',
      village: 'Bakhtiarpur',
      district: 'Patna, Bihar',
      landHolding: '4.5 Acres',
      cropTag: 'Tomato (Grade A)',
      gainTag: '+24% Higher Profit',
      quote:
        language === 'hi'
          ? 'किसानसेतु की मदद से मैंने अपनी टमाटर की फसल सीधे किसानविकास एफपीओ को ₹2,550/क्विंटल में बेची। स्थानीय मंडी में केवल ₹2,100 मिल रहा था। पूरा भुगतान 24 घंटे में सीधे बैंक खाते में आ गया।'
          : language === 'bn'
          ? 'কিষাণসেতুর মাধ্যমে আমি আমার গ্রেড এ টমেটো সরাসরি এফপিওকে ₹২,৫৫০/কুইন্টাল দরে বিক্রি করেছি। স্থানীয় মান্ডিতে মাত্র ₹২,১০০ পাচ্ছিলাম। ২৪ ঘণ্টার মধ্যে সম্পূর্ণ টাকা ব্যাংকে চলে এসেছে।'
          : 'Through KisanSetu, I sold my Grade A tomato harvest directly to KisanVikas FPO at ₹2,550/Qtl against local mandi bids of ₹2,100. Escrow payment was credited straight to my bank account in 24 hours.',
      rating: 5,
      avatarChar: 'R',
      avatarBg: 'from-emerald-600 to-green-700',
    },
    {
      id: 't-2',
      name: language === 'hi' ? 'हरप्रीत सिंह' : language === 'bn' ? 'হরপ্রীত সিং' : 'Harpreet Singh Gill',
      village: 'Samrala Kalan',
      district: 'Ludhiana, Punjab',
      landHolding: '8.0 Acres',
      cropTag: 'Wheat (Sharbati)',
      gainTag: 'Saved ₹16,500 Freight',
      quote:
        language === 'hi'
          ? 'मंडी भाड़ा कैलकुलेटर से मुझे पता चला कि खन्ना मंडी के मुकाबले दिल्ली के निर्यातक का सीधा ऑफर ₹280/क्विंटल अधिक था। खेत से ही पिकअप हो गया, कोई लोडिंग-अनलोडिंग का झंझट नहीं रहा।'
          : language === 'bn'
          ? 'মান্ডির পরিবহন খরচ হিসাব করে দেখলাম কলকাতার রপ্তানিকারকের অফার বেশি লাভজনক। সরাসরি ফার্ম থেকে পিকআপের সুবিধা থাকায় অনেক খরচ বেঁচে গেছে।'
          : 'The transit calculator showed that Bengal Exporters’ direct offer was yielding ₹280/Qtl more net profit than our local market. Farm-gate pickup saved me ₹16,500 on transport logistics alone.',
      rating: 5,
      avatarChar: 'H',
      avatarBg: 'from-amber-600 to-orange-700',
    },
    {
      id: 't-3',
      name: language === 'hi' ? 'सुब्रत मंडल' : language === 'bn' ? 'সুব্রত মণ্ডল' : 'Subrata Mondal',
      village: 'Singur Block',
      district: 'Hooghly, West Bengal',
      landHolding: '3.2 Acres',
      cropTag: 'Potato (Jyoti)',
      gainTag: 'PMFBY Claim + Fair Sale',
      quote:
        language === 'hi'
          ? 'योजना पोर्टल की सीधी जानकारी से मुझे पीएम फसल बीमा योजना और रिलायंस फ्रेश के खरीद ऑफर दोनों का लाभ मिला। किसानसेतु छोटे किसानों के लिए सचमुच एक वरदान है।'
          : language === 'bn'
          ? 'সরকারি প্রকল্পের সঠিক তথ্যের মাধ্যমে আমি পিএম ফসল বীমার সুযোগ পেয়েছি এবং রিলায়েন্সের সাথে আলুর সরাসরি চুক্তি করেছি। ক্ষুদ্র কৃষকদের জন্য এটি দারুণ সহায়ক।'
          : 'KisanSetu gave me clarity on PMFBY insurance guidelines and linked me directly with Reliance Fresh Sourcing. Grade-based pricing helped me secure a premium ₹1,750/Qtl for Jyoti table potatoes.',
      rating: 5,
      avatarChar: 'S',
      avatarBg: 'from-blue-600 to-indigo-700',
    },
  ];

  const handleReadTestimonial = (tItem: typeof testimonials[0]) => {
    speakText(`${tItem.name} from ${tItem.district}, growing ${tItem.cropTag}. He says: ${tItem.quote}`);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Voices from the Soil</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'hi'
              ? 'किसानों का विश्वास, उनकी अपनी ज़ुबानी'
              : language === 'bn'
              ? 'কৃষকদের বাস্তব অভিজ্ঞতা ও সাফল্য'
              : 'Trusted by Farmers Across India'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'जानें कि कैसे देश के किसान किसानसेतु की मदद से अपनी उपज का बेहतर मूल्य प्राप्त कर रहे हैं।'
              : language === 'bn'
              ? 'দেখুন কীভাবে দেশের বিভিন্ন প্রান্তের কৃষকরা কিষাণসেতুর মাধ্যমে ফসলের ন্যায্য মূল্য পাচ্ছেন।'
              : 'Hear how progressive farmers are maximizing farm profitability with transparent quality assaying and direct B2B buyer connections.'}
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Top Badges & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {tItem.gainTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative">
                  <Quote className="w-6 h-6 text-emerald-200/80 absolute -top-2 -left-2 -z-10" />
                  "{tItem.quote}"
                </p>
              </div>

              {/* Farmer Profile Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${tItem.avatarBg} text-white font-black text-base flex items-center justify-center shadow-md`}
                  >
                    {tItem.avatarChar}
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {tItem.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {tItem.district} • {tItem.cropTag}
                    </p>
                  </div>
                </div>

                {/* Read Aloud Button */}
                <button
                  type="button"
                  onClick={() => handleReadTestimonial(tItem)}
                  title="Read aloud testimonial"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors"
                  aria-label="Listen to Testimonial"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
