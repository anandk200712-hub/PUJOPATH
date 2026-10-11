import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  IndianRupee,
  Scale,
  Sparkles,
  Truck,
  FileCheck,
} from 'lucide-react';
import { BuyerOffer, QualityGradeType } from '../../types';
import { useApp } from '../../context/AppContext';

interface SendOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetBuyerOffer: BuyerOffer | null;
  onSuccess: (dealSummary: { crop: string; qty: number; rate: number; total: number; buyer: string }) => void;
}

export const SendOfferModal: React.FC<SendOfferModalProps> = ({
  isOpen,
  onClose,
  targetBuyerOffer,
  onSuccess,
}) => {
  const { addBuyerOffer, farmerProfile } = useApp();

  const [formData, setFormData] = useState({
    buyerName: '',
    cropName: 'Tomato',
    cropId: 'crop-tomato',
    grade: 'A' as QualityGradeType,
    quantityQuintals: 100,
    pricePerQuintal: 2500,
    paymentTerms: 'Escrow via KisanSetu' as BuyerOffer['paymentTerms'],
    logistics: 'Buyer Arranged Pickup' as BuyerOffer['logisticsArrangement'],
    deliveryDeadline: 'Within 48 hours',
    notes: '',
  });

  // Pre-fill if target buyer offer exists
  useEffect(() => {
    if (targetBuyerOffer) {
      setFormData({
        buyerName: targetBuyerOffer.buyerName,
        cropName: targetBuyerOffer.cropName,
        cropId: targetBuyerOffer.cropId,
        grade: (targetBuyerOffer.requiredGrade === 'Any' ? 'A' : targetBuyerOffer.requiredGrade) as QualityGradeType,
        quantityQuintals: targetBuyerOffer.requestedQuantityQuintals,
        pricePerQuintal: targetBuyerOffer.offeredPricePerQuintal,
        paymentTerms: targetBuyerOffer.paymentTerms,
        logistics: targetBuyerOffer.logisticsArrangement,
        deliveryDeadline: targetBuyerOffer.deliveryDeadline,
        notes: `Farmer proposal matching ${targetBuyerOffer.buyerName}'s demand.`,
      });
    } else {
      setFormData({
        buyerName: 'Direct Institutional Buyer',
        cropName: 'Tomato',
        cropId: 'crop-tomato',
        grade: 'A',
        quantityQuintals: 100,
        pricePerQuintal: 2500,
        paymentTerms: 'Escrow via KisanSetu',
        logistics: 'Buyer Arranged Pickup',
        deliveryDeadline: 'Within 3 days',
        notes: '',
      });
    }
  }, [targetBuyerOffer, isOpen]);

  if (!isOpen) return null;

  const totalValue = Number(formData.quantityQuintals) * Number(formData.pricePerQuintal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBuyerOffer({
      buyerId: targetBuyerOffer?.buyerId || `buyer-custom-${Date.now()}`,
      buyerName: formData.buyerName,
      buyerType: targetBuyerOffer?.buyerType || 'Wholesaler',
      isVerified: targetBuyerOffer?.isVerified ?? true,
      trustScore: targetBuyerOffer?.trustScore ?? 4.8,
      totalTradesCompleted: (targetBuyerOffer?.totalTradesCompleted ?? 50) + 1,
      location: targetBuyerOffer?.location || `${farmerProfile.district}, ${farmerProfile.state}`,
      state: targetBuyerOffer?.state || farmerProfile.state,
      contactNumber: targetBuyerOffer?.contactNumber || farmerProfile.phone,
      cropId: formData.cropId,
      cropName: formData.cropName,
      requiredGrade: formData.grade,
      requestedQuantityQuintals: Number(formData.quantityQuintals),
      offeredPricePerQuintal: Number(formData.pricePerQuintal),
      totalOfferValue: totalValue,
      paymentTerms: formData.paymentTerms,
      logisticsArrangement: formData.logistics,
      deliveryDeadline: formData.deliveryDeadline,
      notes: formData.notes,
    });

    onSuccess({
      crop: formData.cropName,
      qty: Number(formData.quantityQuintals),
      rate: Number(formData.pricePerQuintal),
      total: totalValue,
      buyer: formData.buyerName,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Send className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Send Direct Offer / Deal Bid
              </h3>
              <p className="text-xs text-slate-500">
                Submit your harvest quote to {formData.buyerName} with KisanSetu Escrow protection.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Buyer Target */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Target Buyer / Procurement Organization</span>
            </label>
            <input
              type="text"
              required
              value={formData.buyerName}
              onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 outline-none transition-all"
            />
          </div>

          {/* Crop & Grade Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Crop Offered</label>
              <select
                value={formData.cropName}
                onChange={(e) => {
                  const name = e.target.value;
                  const cropIdMap: Record<string, string> = {
                    Tomato: 'crop-tomato',
                    Potato: 'crop-potato',
                    'Onion (Red)': 'crop-onion',
                    'Wheat (Sharbati)': 'crop-wheat',
                    'Mustard (Sarson)': 'crop-mustard',
                  };
                  setFormData({
                    ...formData,
                    cropName: name,
                    cropId: cropIdMap[name] || 'crop-tomato',
                  });
                }}
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
              >
                <option value="Tomato">Tomato (टमाटर)</option>
                <option value="Potato">Potato (आलू)</option>
                <option value="Onion (Red)">Onion (लाल प्याज)</option>
                <option value="Wheat (Sharbati)">Wheat (गेहूं - Sharbati)</option>
                <option value="Mustard (Sarson)">Mustard (सरसों / Rai)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Quality Grade</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl border">
                {(['A', 'B', 'C'] as QualityGradeType[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, grade: g })}
                    className={`py-1.5 rounded-xl font-bold transition-all ${
                      formData.grade === g
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Grade {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Proposed Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quantity (Quintals)</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.quantityQuintals}
                onChange={(e) =>
                  setFormData({ ...formData, quantityQuintals: Number(e.target.value) })
                }
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>Proposed Price (₹ / Qtl)</span>
              </label>
              <input
                type="number"
                min="100"
                step="50"
                required
                value={formData.pricePerQuintal}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerQuintal: Number(e.target.value) })
                }
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
          </div>

          {/* Live Total Deal Value Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-slate-600 block text-[11px]">Total Contract Proposal</span>
              <strong className="text-emerald-950 font-black font-mono text-base sm:text-lg">
                ₹{totalValue.toLocaleString('en-IN')}
              </strong>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-[10px]">
              100% Escrow Protection
            </span>
          </div>

          {/* Payment Terms & Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment Terms</span>
              </label>
              <select
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentTerms: e.target.value as BuyerOffer['paymentTerms'],
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value="Escrow via KisanSetu">Escrow via KisanSetu</option>
                <option value="Immediate UPI/NEFT">Immediate UPI/NEFT</option>
                <option value="50% Advance + 50% on Delivery">50% Advance + 50% on Delivery</option>
                <option value="3-Day Credit">3-Day Credit</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Logistics Preference</span>
              </label>
              <select
                value={formData.logistics}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    logistics: e.target.value as BuyerOffer['logisticsArrangement'],
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value="Buyer Arranged Pickup">Buyer Arranged Pickup (Doorstep)</option>
                <option value="Farmer Delivered to Hub">Farmer Delivered to Hub</option>
                <option value="KisanSetu Logistics">KisanSetu Partner Logistics</option>
              </select>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Offer Proposal</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SendOfferModal;
