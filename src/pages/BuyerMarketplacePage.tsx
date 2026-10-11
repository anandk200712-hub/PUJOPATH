import React, { useState, useMemo } from 'react';
import {
  Users,
  Building2,
  ShieldCheck,
  Plus,
  FileCheck2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BuyerOffer } from '../types';
import {
  MarketplaceFilters,
  MarketplaceFilterState,
} from '../components/marketplace/MarketplaceFilters';
import { BuyerCard } from '../components/marketplace/BuyerCard';
import { SendOfferModal } from '../components/marketplace/SendOfferModal';
import { MyOffersDrawer } from '../components/marketplace/MyOffersDrawer';

interface BuyerMarketplacePageProps {
  onNavigate?: (route: string) => void;
}

export const BuyerMarketplacePage: React.FC<BuyerMarketplacePageProps> = ({ onNavigate }) => {
  const { buyerOffers, acceptOffer, rejectOffer, language, speakText } = useApp();

  // Filter State
  const [filters, setFilters] = useState<MarketplaceFilterState>({
    searchQuery: '',
    selectedCrop: 'All',
    radiusKm: 300,
    minPrice: 0,
    verifiedOnly: false,
    buyerType: 'All',
    sortBy: 'price_desc',
  });

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCrop: 'All',
      radiusKm: 300,
      minPrice: 0,
      verifiedOnly: false,
      buyerType: 'All',
      sortBy: 'price_desc',
    });
  };

  // Modals & Drawers
  const [isSendOfferModalOpen, setIsSendOfferModalOpen] = useState(false);
  const [selectedTargetOffer, setSelectedTargetOffer] = useState<BuyerOffer | null>(null);
  const [isMyOffersDrawerOpen, setIsMyOffersDrawerOpen] = useState(false);

  // Success Toast Banner State
  const [successToast, setSuccessToast] = useState<{
    show: boolean;
    crop: string;
    qty: number;
    rate: number;
    total: number;
    buyer: string;
  } | null>(null);

  // Filter & Sort Logic
  const filteredOffers = useMemo(() => {
    return buyerOffers.filter((offer) => {
      // Search query
      const matchesSearch =
        filters.searchQuery === '' ||
        offer.buyerName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        offer.cropName.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Crop
      const matchesCrop =
        filters.selectedCrop === 'All' ||
        offer.cropName.toLowerCase().includes(filters.selectedCrop.toLowerCase());

      // Price
      const matchesPrice = offer.offeredPricePerQuintal >= filters.minPrice;

      // Verified
      const matchesVerified = !filters.verifiedOnly || offer.isVerified;

      // Buyer Type
      const matchesType =
        filters.buyerType === 'All' || offer.buyerType === filters.buyerType;

      return matchesSearch && matchesCrop && matchesPrice && matchesVerified && matchesType;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_desc') {
        return b.offeredPricePerQuintal - a.offeredPricePerQuintal;
      }
      if (filters.sortBy === 'rating_desc') {
        return b.trustScore - a.trustScore;
      }
      if (filters.sortBy === 'volume_desc') {
        return b.requestedQuantityQuintals - a.requestedQuantityQuintals;
      }
      return 0;
    });
  }, [buyerOffers, filters]);

  const handleOpenSendOffer = (offer: BuyerOffer | null) => {
    setSelectedTargetOffer(offer);
    setIsSendOfferModalOpen(true);
  };

  const handleOfferSuccess = (deal: { crop: string; qty: number; rate: number; total: number; buyer: string }) => {
    setSuccessToast({
      show: true,
      ...deal,
    });
    speakText(`Deal Proposal Submitted! Your offer for ${deal.qty} quintals of ${deal.crop} has been sent to ${deal.buyer} with escrow protection.`);

    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  return (
    <div className="flex-1 bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct B2B Procurement Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Direct Buyer Marketplace
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Connect directly with verified institutional buyers, FPOs, food processing units, and retail chains. Enjoy guaranteed 100% KisanSetu Escrow protection with zero middleman commissions.
            </p>
          </div>

          {/* Quick Drawer & Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setIsMyOffersDrawerOpen(true)}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold backdrop-blur-md transition-all"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-300" />
              <span>My Active Deals ({buyerOffers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenSendOffer(null)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Offer</span>
            </button>
          </div>
        </div>

        {/* Success Toast Banner */}
        {successToast && (
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-700 to-green-600 text-white shadow-2xl border border-emerald-400 flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-bold shadow-md">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-black">
                  Offer Successfully Submitted to {successToast.buyer}!
                </h4>
                <p className="text-xs text-emerald-100">
                  {successToast.qty} Qtl of {successToast.crop} @ ₹{successToast.rate}/Qtl (Total ₹{successToast.total.toLocaleString('en-IN')}) with KisanSetu Escrow protection.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMyOffersDrawerOpen(true)}
              className="px-4 py-2 bg-white text-emerald-900 rounded-xl text-xs font-black hover:bg-emerald-50 transition-colors shrink-0"
            >
              View in My Deals →
            </button>
          </div>
        )}

        {/* 1. Marketplace Filters */}
        <MarketplaceFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalResultsCount={filteredOffers.length}
        />

        {/* 2. Buyer Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Active Institutional & Wholesale Purchase Demands
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredOffers.length} of {buyerOffers.length} Offers
            </span>
          </div>

          {filteredOffers.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-slate-900">No buyer demands matched your filters</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your distance radius or adjusting the crop filter to view demands from other zones.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <BuyerCard
                  key={offer.id}
                  offer={offer}
                  onSendOffer={handleOpenSendOffer}
                  onAcceptOffer={acceptOffer}
                  onRejectOffer={rejectOffer}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. Send Offer Modal */}
        <SendOfferModal
          isOpen={isSendOfferModalOpen}
          onClose={() => setIsSendOfferModalOpen(false)}
          targetBuyerOffer={selectedTargetOffer}
          onSuccess={handleOfferSuccess}
        />

        {/* 4. My Active Deals Drawer */}
        <MyOffersDrawer
          isOpen={isMyOffersDrawerOpen}
          onClose={() => setIsMyOffersDrawerOpen(false)}
        />

      </div>
    </div>
  );
};

export default BuyerMarketplacePage;
