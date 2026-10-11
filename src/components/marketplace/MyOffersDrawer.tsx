import React from 'react';
import {
  X,
  FileCheck2,
  Clock,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Building2,
  IndianRupee,
  Volume2,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { BuyerOffer } from '../../types';
import { useApp } from '../../context/AppContext';

interface MyOffersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer?: (offer: BuyerOffer) => void;
}

export const MyOffersDrawer: React.FC<MyOffersDrawerProps> = ({
  isOpen,
  onClose,
  onSelectOffer,
}) => {
  const { buyerOffers, language, speakText } = useApp();

  if (!isOpen) return null;

  const handleSpeakOffer = (offer: BuyerOffer) => {
    const text =
      language === 'hi'
        ? `प्रस्ताव स्थिति: ${offer.cropName} के ${offer.requestedQuantityQuintals} क्विंटल का सौदा ${offer.buyerName} के साथ। स्थिति: ${offer.status}। कुल राशि: ₹${offer.totalOfferValue.toLocaleString('en-IN')}।`
        : `Offer Status: Deal for ${offer.requestedQuantityQuintals} Quintals of ${offer.cropName} with ${offer.buyerName}. Current status: ${offer.status}. Value: ₹${offer.totalOfferValue.toLocaleString('en-IN')}.`;
    speakText(text);
  };

  const getStatusBadge = (status: BuyerOffer['status']) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Accepted • Escrow Funded</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Pending Review</span>
          </span>
        );
      case 'Countered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-900 border border-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Counter Sent</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-900 border border-red-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-700" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  My Active Deals & Offers
                </h3>
                <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                  {buyerOffers.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Track submitted quotes, buyer confirmations, and digital escrow deposits.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {buyerOffers.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileCheck2 className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">No active offers yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore the marketplace and send bids to verified buyers to start trading.
              </p>
            </div>
          ) : (
            buyerOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-3 relative group"
              >
                {/* Top Status & Audio */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(offer.status)}

                  <button
                    type="button"
                    onClick={() => handleSpeakOffer(offer)}
                    title="Read offer aloud"
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-700 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Buyer & Commodity */}
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {offer.buyerName}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{offer.location}</span>
                  </p>
                </div>

                {/* Deal Metric Grid */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Crop & Grade</span>
                    <strong className="text-slate-900 font-bold">
                      {offer.cropName} (G-{offer.requiredGrade})
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Agreed Rate</span>
                    <strong className="text-emerald-800 font-mono font-bold">
                      ₹{offer.offeredPricePerQuintal}/Qtl
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Contract</span>
                    <strong className="text-slate-900 font-mono font-black">
                      ₹{offer.totalOfferValue.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Payment & Logistics metadata */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{offer.paymentTerms}</span>
                  </div>
                  <span>{new Date(offer.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Bar */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <span>Escrow Protected by </span>
            <strong className="text-emerald-800 font-bold">KisanSetu Gateway</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyOffersDrawer;
