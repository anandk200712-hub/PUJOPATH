import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import {
  Language,
  FarmerProfile,
  BuyerOffer,
  AppNotification,
  Crop,
  MandiMarket,
  Scheme,
  OfferStatus,
} from '../types';
import {
  DEFAULT_FARMER_PROFILE,
  MOCK_CROPS,
  MOCK_MANDIS,
  MOCK_BUYERS,
  MOCK_SCHEMES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

// Multi-language translation dictionary for English, Hindi, and Bengali
const TRANSLATION_DICTIONARY: Record<string, Record<Language, string>> = {
  // Brand & Navigation
  appName: {
    en: 'KisanSetu',
    hi: 'किसानसेतु',
    bn: 'কিষাণসেতু',
  },
  appTagline: {
    en: 'Empowering Indian Farmers with Smart Market Intelligence & Fair Trade',
    hi: 'स्मार्ट मंडी भाव, सीधा खरीदार और निष्पक्ष कृषि व्यापार',
    bn: 'স্মার্ট বাজার দর, সরাসরি ক্রেতা এবং ন্যায্য কৃষি বাণিজ্যের সেতু',
  },
  sihBadge: {
    en: 'SIH Prototype',
    hi: 'एसआईएच प्रोटोटाइप',
    bn: 'এসআইএইচ প্রোটোটাইপ',
  },
  navMandiPrices: {
    en: 'Mandi Prices',
    hi: 'मंडी भाव',
    bn: 'মান্ডি দর',
  },
  navDirectBuyers: {
    en: 'Direct Buyers',
    hi: 'सीधे खरीदार',
    bn: 'সরাসরি ক্রেতা',
  },
  navSchemes: {
    en: 'Govt Schemes',
    hi: 'सरकारी योजनाएं',
    bn: 'সরকারি প্রকল্প',
  },
  navAdvisory: {
    en: 'Crop Advisory',
    hi: 'फसल सलाह',
    bn: 'ফসল পরামর্শ',
  },
  navProfile: {
    en: 'Farmer Profile',
    hi: 'किसान प्रोफ़ाइल',
    bn: 'কৃষক প্রোফাইল',
  },

  // Actions & Buttons
  readAloud: {
    en: 'Read Aloud',
    hi: 'सुनें (आवाज़)',
    bn: 'শুনুন (ভয়েস)',
  },
  stopSpeech: {
    en: 'Stop Audio',
    hi: 'आवाज़ रोकें',
    bn: 'ভয়েস বন্ধ করুন',
  },
  acceptOffer: {
    en: 'Accept Offer',
    hi: 'प्रस्ताव स्वीकारें',
    bn: 'অফার গ্রহণ করুন',
  },
  rejectOffer: {
    en: 'Decline Offer',
    hi: 'प्रस्ताव अस्वीकारें',
    bn: 'অফার প্রত্যাখ্যান করুন',
  },
  counterOffer: {
    en: 'Counter Offer',
    hi: 'काउंटर रेट दें',
    bn: 'পাল্টা অফার দিন',
  },
  addNewOffer: {
    en: 'Create Buyer Offer',
    hi: 'नया खरीद प्रस्ताव बनाएं',
    bn: 'নতুন ক্রয়ের প্রস্তাব তৈরি করুন',
  },
  markAllRead: {
    en: 'Mark all as read',
    hi: 'सभी को पढ़ा हुआ चिह्नित करें',
    bn: 'সব পড়া হিসেবে চিহ্নিত করুন',
  },
  callHelpline: {
    en: 'Call Kisan Helpline',
    hi: 'किसान हेल्पलाइन पर कॉल करें',
    bn: 'কিষাণ হেল্পলাইনে কল করুন',
  },
  viewDetails: {
    en: 'View Details',
    hi: 'विवरण देखें',
    bn: 'বিস্তারিত দেখুন',
  },
  applyNow: {
    en: 'Apply on Portal',
    hi: 'पोर्टल पर आवेदन करें',
    bn: 'পোর্টালে আবেদন করুন',
  },

  // Status & Labels
  notifications: {
    en: 'Notifications',
    hi: 'सूचनाएं',
    bn: 'বিজ্ঞপ্তি',
  },
  noNotifications: {
    en: 'No new notifications',
    hi: 'कोई नई सूचना नहीं है',
    bn: 'কোন নতুন বিজ্ঞপ্তি নেই',
  },
  verifiedBuyer: {
    en: 'Verified Buyer',
    hi: 'सत्यापित खरीदार',
    bn: 'যাচাইকৃত ক্রেতা',
  },
  unverifiedBuyer: {
    en: 'Unverified Buyer',
    hi: 'असत्यापित खरीदार',
    bn: 'অযাচাইকৃত ক্রেতা',
  },
  statusPending: {
    en: 'Pending Review',
    hi: 'समीक्षाधीन',
    bn: 'বিচারাধীন',
  },
  statusAccepted: {
    en: 'Offer Accepted',
    hi: 'स्वीकृत',
    bn: 'গৃহীত',
  },
  statusRejected: {
    en: 'Offer Declined',
    hi: 'अस्वीकृत',
    bn: 'প্রত্যাখ্যাত',
  },
  statusCountered: {
    en: 'Countered',
    hi: 'काउंटर भेजा गया',
    bn: 'পাল্টা পাঠানো হয়েছে',
  },
  pricePerQuintal: {
    en: 'Price / Quintal',
    hi: 'भाव प्रति क्विंटल',
    bn: 'দর প্রতি কুইন্টাল',
  },
  quantity: {
    en: 'Quantity',
    hi: 'मात्रा',
    bn: 'পরিমাণ',
  },
  totalValue: {
    en: 'Total Value',
    hi: 'कुल राशि',
    bn: 'মোট মূল্য',
  },
  distance: {
    en: 'Distance',
    hi: 'दूरी',
    bn: 'দূরত্ব',
  },
  transitCost: {
    en: 'Transit Freight',
    hi: 'परिवहन भाड़ा',
    bn: 'পরিবহন খরচ',
  },
  landHolding: {
    en: 'Land Holding',
    hi: 'कुल कृषि भूमि',
    bn: 'জমির পরিমাণ',
  },
  acres: {
    en: 'Acres',
    hi: 'एकड़',
    bn: 'একর',
  },
  grade: {
    en: 'Quality Grade',
    hi: 'गुणवत्ता ग्रेड',
    bn: 'গুণমান গ্রেড',
  },
  helplineBannerTitle: {
    en: 'Kisan Call Center (Toll-Free)',
    hi: 'किसान कॉल सेंटर (टोल-फ्री)',
    bn: 'কিষাণ কল সেন্টার (টোল-ফ্রি)',
  },
  helplineHours: {
    en: '6:00 AM to 10:00 PM (All 7 Days) | Available in 22 Regional Languages',
    hi: 'प्रातः 6:00 बजे से रात्रि 10:00 बजे तक (सातों दिन) | 22 भारतीय भाषाओं में उपलब्ध',
    bn: 'সকাল ৬:০০ টা থেকে রাত ১০:০০ টা (সপ্তাহের ৭ দিন) | ২২টি ভারতীয় ভাষায় উপলব্ধ',
  },
  sihDisclaimer: {
    en: 'Developed for Smart India Hackathon (SIH) prototype demonstration. Real-time pricing synthesized from Agmarknet & e-NAM data feeds.',
    hi: 'स्मार्ट इंडिया हैकाथॉन (एसआईएच) प्रोटोटाइप के लिए विकसित। एगमार्कनेट और ई-नाम डेटा स्रोतों पर आधारित।',
    bn: 'স্মার্ট ইন্ডিয়া হ্যাকাথন (এসআইএইচ) প্রোটোটাইপের জন্য তৈরি। এগমার্কনেট এবং ই-নাম তথ্যের উপর ভিত্তি করে।',
  },
};

export interface AppContextType {
  // Language & Translation
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Active Farmer Profile
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;

  // Crops & Mandis
  crops: Crop[];
  mandis: MandiMarket[];
  schemes: Scheme[];

  // Buyer Offers (Dynamic State)
  buyerOffers: BuyerOffer[];
  addBuyerOffer: (offer: Omit<BuyerOffer, 'id' | 'createdAt' | 'status'>) => void;
  acceptOffer: (offerId: string) => void;
  rejectOffer: (offerId: string) => void;
  counterOffer: (offerId: string, counterPrice: number) => void;

  // Notification Feed
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Web Speech API Voice Helper
  speakText: (text: string, lang?: Language) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 1. Language State
  const [language, setLanguage] = useState<Language>('en');

  // 2. Farmer Profile State
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(DEFAULT_FARMER_PROFILE);

  // 3. Static/Mock datasets
  const [crops] = useState<Crop[]>(MOCK_CROPS);
  const [mandis] = useState<MandiMarket[]>(MOCK_MANDIS);
  const [schemes] = useState<Scheme[]>(MOCK_SCHEMES);

  // 4. Dynamic Buyer Offers State
  const [buyerOffers, setBuyerOffers] = useState<BuyerOffer[]>(MOCK_BUYERS);

  // 5. Global Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // 6. Speech Synthesis State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Translation helper function
  const t = useCallback(
    (key: string): string => {
      const entry = TRANSLATION_DICTIONARY[key];
      if (!entry) return key;
      return entry[language] || entry['en'] || key;
    },
    [language]
  );

  // Profile Updater
  const updateFarmerProfile = useCallback((updates: Partial<FarmerProfile>) => {
    setFarmerProfile((prev) => ({
      ...prev,
      ...updates,
      bankDetails: {
        ...prev.bankDetails,
        ...(updates.bankDetails || {}),
      },
    }));
  }, []);

  // Dynamic Offer Actions
  const addBuyerOffer = useCallback((newOfferData: Omit<BuyerOffer, 'id' | 'createdAt' | 'status'>) => {
    const id = `offer-user-${Date.now()}`;
    const newOffer: BuyerOffer = {
      ...newOfferData,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setBuyerOffers((prev) => [newOffer, ...prev]);

    // Create corresponding notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'buyer_offer',
      title: `New Offer: ${newOffer.cropName} by ${newOffer.buyerName}`,
      hindiTitle: `नया प्रस्ताव: ${newOffer.buyerName} द्वारा ${newOffer.cropName}`,
      bengaliTitle: `নতুন অফার: ${newOffer.buyerName} দ্বারা ${newOffer.cropName}`,
      message: `Offered ₹${newOffer.offeredPricePerQuintal}/Qtl for ${newOffer.requestedQuantityQuintals} Quintals.`,
      hindiMessage: `${newOffer.requestedQuantityQuintals} क्विंटल के लिए ₹${newOffer.offeredPricePerQuintal}/क्विंटल का भाव प्रस्तावित किया गया।`,
      bengaliMessage: `${newOffer.requestedQuantityQuintals} কুইন্টালের জন্য ₹${newOffer.offeredPricePerQuintal}/কুইন্টাল দর প্রস্তাব করা হয়েছে।`,
      timestamp: 'Just now',
      read: false,
      urgent: true,
      actionUrl: '/direct-buyers',
    };
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const acceptOffer = useCallback((offerId: string) => {
    setBuyerOffers((prev) =>
      prev.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, status: 'Accepted' as OfferStatus };
        }
        return offer;
      })
    );

    const targetOffer = buyerOffers.find((o) => o.id === offerId);
    if (targetOffer) {
      const confirmationNotif: AppNotification = {
        id: `notif-acc-${Date.now()}`,
        type: 'buyer_offer',
        title: `Offer Accepted for ${targetOffer.cropName}`,
        hindiTitle: `${targetOffer.cropName} का सौदा स्वीकार किया गया`,
        bengaliTitle: `${targetOffer.cropName} এর অফার গ্রহণ করা হয়েছে`,
        message: `Deal locked with ${targetOffer.buyerName} for ₹${targetOffer.totalOfferValue.toLocaleString('en-IN')}. Dispatch pickup initiated.`,
        hindiMessage: `${targetOffer.buyerName} के साथ ₹${targetOffer.totalOfferValue.toLocaleString('en-IN')} का सौदा पक्का हुआ। पिकअप की प्रक्रिया शुरू।`,
        bengaliMessage: `${targetOffer.buyerName} এর সাথে ₹${targetOffer.totalOfferValue.toLocaleString('en-IN')} মূল্যের চুক্তি সম্পন্ন হয়েছে।`,
        timestamp: 'Just now',
        read: false,
        urgent: true,
      };
      setNotifications((prev) => [confirmationNotif, ...prev]);
    }
  }, [buyerOffers]);

  const rejectOffer = useCallback((offerId: string) => {
    setBuyerOffers((prev) =>
      prev.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, status: 'Rejected' as OfferStatus };
        }
        return offer;
      })
    );
  }, []);

  const counterOffer = useCallback((offerId: string, counterPrice: number) => {
    setBuyerOffers((prev) =>
      prev.map((offer) => {
        if (offer.id === offerId) {
          return {
            ...offer,
            status: 'Countered' as OfferStatus,
            farmerCounterPrice: counterPrice,
          };
        }
        return offer;
      })
    );
  }, []);

  // Notification Actions
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const addNotification = useCallback(
    (notifData: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
      const newNotif: AppNotification = {
        ...notifData,
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Web Speech API Voice Helper
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback(
    (text: string, langToUse?: Language) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Web Speech API is not supported in this browser environment.');
        return;
      }

      // Stop any ongoing audio before starting new speech
      window.speechSynthesis.cancel();

      if (!text || text.trim() === '') {
        setIsSpeaking(false);
        return;
      }

      const activeLang = langToUse || language;
      const utterance = new SpeechSynthesisUtterance(text);

      // Select locale tag
      const langCodeMap: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        bn: 'bn-IN',
      };
      utterance.lang = langCodeMap[activeLang] || 'en-IN';
      utterance.rate = 0.92; // Slightly slower, clear tone for agricultural advisories
      utterance.pitch = 1.0;

      // Match system voices if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find((v) =>
          v.lang.toLowerCase().includes(utterance.lang.toLowerCase()) ||
          (activeLang === 'hi' && (v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'))) ||
          (activeLang === 'bn' && (v.lang.startsWith('bn') || v.name.toLowerCase().includes('bengali') || v.name.toLowerCase().includes('bangla'))) ||
          (activeLang === 'en' && (v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US')))
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        // If canceled explicitly, ignore error
        if (event.error !== 'canceled') {
          console.error('Speech synthesis error occurred:', event);
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  // Clean up speech on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        farmerProfile,
        updateFarmerProfile,
        crops,
        mandis,
        schemes,
        buyerOffers,
        addBuyerOffer,
        acceptOffer,
        rejectOffer,
        counterOffer,
        notifications,
        unreadNotificationsCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        speakText,
        isSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom React hook to consume AppContext safely
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an <AppProvider> tree.');
  }
  return context;
};

export default AppContext;
