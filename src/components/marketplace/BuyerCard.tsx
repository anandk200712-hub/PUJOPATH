import React from 'react';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  Star,
  MapPin,
  Truck,
  ShieldCheck,
  ArrowRight,
  Volume2,
  Send,
  Coins,
  BadgePercent,
} from 'lucide-react';
import { BuyerOffer } from '../../types';
import { useApp } from '../../context/AppContext';

interface BuyerCardProps {
  offer: BuyerOffer;
  onSendOffer: (offer: BuyerOffer) => void;
  onAcceptOffer?: (offerId: string) => void;
  onRejectOffer?: (offerId: string) => void;
}

export const BuyerCard: React.FC<BuyerCardProps> = ({
  offer,
  onSendOffer,
  onAcceptOffer,
  onRejectOffer,
}) => {
  const { language, speakText } = useApp();

  const handleSpeakCard = () => {
    const text =
      language === 'hi'
        ? `${offer.buyerName}, ${offer.location}। ${offer.cropName} ग्रेड ${offer.requiredGrade} के ${offer.requestedQuantityQuintals} क्विंटल की मांग। प्रस्तावित भाव ₹${offer.offeredPricePerQuintal} प्रति क्विंटल। कुल सौदा मूल्य ₹${offer.totalOfferValue.toLocaleString('en-IN')}। भुगतान: ${offer.paymentTerms}।`
        : language === 'bn'
        ? `${offer.buyerName}, ${offer.location}। ${offer.cropName} গ্রেড ${offer.requiredGrade} এর ${offer.requestedQuantityQuintals} কুইন্টালের চাহিদা। প্রস্তাবিত দর প্রতি কুইন্টাল ₹${offer.offeredPricePerQuintal}। মোট মূল্য ₹${offer.totalOfferValue.toLocaleString('en-IN')}।`
        : `${offer.buyerName} in ${offer.location}. Demanding ${offer.requestedQuantityQuintals} Quintals of ${offer.cropName} Grade ${offer.requiredGrade} at ₹${offer.offeredPricePerQuintal} per quintal. Total contract value ₹${offer.totalOfferValue.toLocaleString('en-IN')}. Payment terms: ${offer.paymentTerms}.`;
    speakText(text);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between space-y-5 group">
      <div className="space-y-4">
        {/* Top Badges Row: Verified status, Type, and Audio */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {offer.isVerified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified Buyer</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Unverified Buyer</span>
              </span>
            )}

            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700">
              {offer.buyerType}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSpeakCard}
            title="Read aloud buyer offer"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-700 transition-colors"
            aria-label="Listen to Buyer Card"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Buyer Name & Trust Rating */}
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
            {offer.buyerName}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{offer.location}</span>
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <strong className="text-slate-900">{offer.trustScore}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-500 font-medium">
              {offer.totalTradesCompleted} Trades Completed
            </span>
          </div>
        </div>

        {/* Demand & Pricing Highlight Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Crop Demanded:</span>
            <strong className="text-slate-900 text-sm">
              {offer.cropName} (Grade {offer.requiredGrade})
            </strong>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Volume Required:</span>
            <strong className="text-slate-900 font-mono font-bold">
              {offer.requestedQuantityQuintals} Quintals
            </strong>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Offered Price:</span>
            <div className="text-right">
              <strong className="text-emerald-800 font-black font-mono text-base">
                ₹{offer.offeredPricePerQuintal.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-slate-500 block">/ Quintal</span>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-200/70 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Total Contract Value:</span>
            <strong className="text-emerald-950 font-black font-mono text-base sm:text-lg">
              ₹{offer.totalOfferValue.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* Payment & Logistics Terms */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Payment:</strong> {offer.paymentTerms}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              <strong>Logistics:</strong> {offer.logisticsArrangement}
            </span>
          </div>
          {offer.notes && (
            <p className="text-[11px] text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
              "{offer.notes}"
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onSendOffer(offer)}
          className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Send Offer / Counter</span>
        </button>

        {onAcceptOffer && offer.status === 'Pending' && (
          <button
            type="button"
            onClick={() => onAcceptOffer(offer.id)}
            className="py-3 px-3.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs border border-slate-200 transition-colors"
            title="Accept offered price immediately"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyerCard;
