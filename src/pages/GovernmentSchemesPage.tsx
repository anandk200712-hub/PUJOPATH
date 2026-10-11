import React, { useState, useMemo } from 'react';
import {
  Award,
  Sparkles,
  ShieldCheck,
  Building2,
  PhoneCall,
  ExternalLink,
  Volume2,
  FileCheck2,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Scheme } from '../types';
import {
  SchemeFilters,
  SchemeFilterState,
} from '../components/schemes/SchemeFilters';
import { RecommendedSchemes } from '../components/schemes/RecommendedSchemes';
import { SchemeCard } from '../components/schemes/SchemeCard';
import { ApplySchemeModal } from '../components/schemes/ApplySchemeModal';

interface GovernmentSchemesPageProps {
  onNavigate?: (route: string) => void;
}

export const GovernmentSchemesPage: React.FC<GovernmentSchemesPageProps> = ({ onNavigate }) => {
  const { schemes, language, speakText } = useApp();

  // Filters State
  const [filters, setFilters] = useState<SchemeFilterState>({
    searchQuery: '',
    selectedState: 'All India (Central Schemes)',
    farmerType: 'All Farmer Categories',
    selectedCrop: 'All Crops',
    landholdingRange: 'All',
    category: 'All',
  });

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedState: 'All India (Central Schemes)',
      farmerType: 'All Farmer Categories',
      selectedCrop: 'All Crops',
      landholdingRange: 'All',
      category: 'All',
    });
  };

  // Modal State
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState<Scheme | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  const handleOpenApplyModal = (scheme: Scheme) => {
    setSelectedSchemeForApply(scheme);
    setIsApplyModalOpen(true);
  };

  // Filtered Schemes Logic
  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      // Search
      const matchesSearch =
        filters.searchQuery === '' ||
        s.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        s.shortSummary.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        s.financialBenefit.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        filters.category === 'All' || s.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [schemes, filters]);

  const handleSpeakOverview = () => {
    const text =
      language === 'hi'
        ? `सरकारी योजनाएं: किसानसेतु पर 5 प्रमुख केंद्रीय एवं राज्य कृषि योजनाओं का विवरण उपलब्ध है। इसमें पीएम-किसान, पीएम फसल बीमा योजना, 4% केसीसी रियायती ऋण, ई-नाम और मृदा स्वास्थ्य कार्ड शामिल हैं।`
        : `Government Welfare Schemes: Explore 5 premier Central & State agricultural initiatives including PM-KISAN direct income transfer, PMFBY crop insurance, 4% KCC loans, e-NAM market access, and Soil Health Cards.`;
    speakText(text);
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Benefit Transfer & Subsidies Gateway</span>
              <button
                type="button"
                onClick={handleSpeakOverview}
                title="Read overview"
                className="ml-1 p-0.5 hover:bg-emerald-700 rounded text-amber-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Indian Agricultural Schemes & Welfare
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Explore Central & State government programs tailored for Indian farmers. Check instant eligibility, review required documents, and apply directly on official ministry portals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center sm:text-left space-y-3 shrink-0 relative z-10">
            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ministry Verified Portals</span>
            </div>
            <p className="text-xs text-white font-medium">
              Need grievance or application help?
            </p>
            <a
              href="tel:18001801551"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Kisan Helpline: 1800-180-1551</span>
            </a>
          </div>
        </div>

        {/* 1. Recommended Schemes (Auto-Matched to Active Farmer Profile) */}
        <RecommendedSchemes onApply={handleOpenApplyModal} />

        {/* 2. Scheme Filters */}
        <SchemeFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalCount={filteredSchemes.length}
        />

        {/* 3. Scheme Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              All Verified Agricultural Schemes
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredSchemes.length} of {schemes.length} Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onApply={handleOpenApplyModal}
              />
            ))}
          </div>
        </div>

        {/* 4. SIH Official Data Source Disclaimer Notice Banner */}
        <div className="p-6 rounded-3xl bg-slate-900 text-slate-300 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Smart India Hackathon (SIH) Official Data Integrity Notice</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All scheme guidelines, eligibility rules, and DBT transfer parameters presented on KisanSetu are synthesized from official publications of the <strong>Ministry of Agriculture & Farmers Welfare</strong>, <strong>PM-KISAN portal (pmkisan.gov.in)</strong>, <strong>PMFBY portal (pmfby.gov.in)</strong>, <strong>National Agriculture Market (enam.gov.in)</strong>, and the <strong>Department of Financial Services (RBI/NABARD KCC guidelines)</strong>. KisanSetu does not charge any processing fees for government schemes.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-emerald-400 border-t border-slate-800">
            <span>• 100% Free Government Advisory</span>
            <span>• Direct Ministry Portals</span>
            <span>• No Intermediary Commission</span>
          </div>
        </div>

        {/* 5. Apply Scheme Modal */}
        <ApplySchemeModal
          scheme={selectedSchemeForApply}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />

      </div>
    </div>
  );
};

export default GovernmentSchemesPage;
