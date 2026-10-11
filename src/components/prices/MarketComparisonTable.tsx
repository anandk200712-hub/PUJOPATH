import React from 'react';
import {
  Store,
  MapPin,
  TrendingUp,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Coins,
  BadgePercent,
} from 'lucide-react';
import { MandiMarket, QualityGradeType } from '../../types';

export interface EvaluatedMandi {
  mandi: MandiMarket;
  distanceKm: number;
  grossPricePerQtl: number;
  freightPerQtl: number;
  totalFreightCost: number;
  netPricePerQtl: number;
  totalNetValue: number;
  isHighestNet: boolean;
  advantageOverLowest: number;
}

interface MarketComparisonTableProps {
  evaluatedMandis: EvaluatedMandi[];
  cropName: string;
  grade: QualityGradeType;
  quantityInQuintals: number;
  onSelectMandi?: (mandiId: string) => void;
}

export const MarketComparisonTable: React.FC<MarketComparisonTableProps> = ({
  evaluatedMandis,
  cropName,
  grade,
  quantityInQuintals,
  onSelectMandi,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Nearby Mandi Price & Net Realization Table
            </h3>
            <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
              {evaluatedMandis.length} Mandis Evaluated
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Net price calculated after deducting distance-based transit freight for {quantityInQuintals} Quintals of {cropName} (Grade {grade}).
          </p>
        </div>
      </div>

      {/* Table for Desktop, Cards for Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50/80">
              <th className="py-3.5 px-4 rounded-l-2xl">Mandi & Location</th>
              <th className="py-3.5 px-3">Distance</th>
              <th className="py-3.5 px-3">Gross Rate</th>
              <th className="py-3.5 px-3">Transit Freight</th>
              <th className="py-3.5 px-3">Net Realizable Rate</th>
              <th className="py-3.5 px-4 text-right rounded-r-2xl">Total Net Proceeds</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {evaluatedMandis.map((item) => {
              const { mandi, distanceKm, grossPricePerQtl, freightPerQtl, totalFreightCost, netPricePerQtl, totalNetValue, isHighestNet } = item;

              return (
                <tr
                  key={mandi.id}
                  onClick={() => onSelectMandi && onSelectMandi(mandi.id)}
                  className={`group transition-all ${
                    isHighestNet
                      ? 'bg-emerald-50/70 hover:bg-emerald-50 font-medium'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* Mandi Name */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {mandi.name}
                        </span>
                        {isHighestNet && (
                          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            Recommended Mandi
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {mandi.district}, {mandi.state}
                        </span>
                        {mandi.eNamIntegrated && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded border border-blue-200">
                            e-NAM
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="py-4 px-3">
                    <span className="font-mono font-bold text-slate-700">
                      {distanceKm} km
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ≈ {mandi.estimatedTransitHours} hrs
                    </span>
                  </td>

                  {/* Gross Rate */}
                  <td className="py-4 px-3">
                    <span className="font-mono font-black text-slate-900 text-sm">
                      ₹{grossPricePerQtl.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      per quintal
                    </span>
                  </td>

                  {/* Transit Freight */}
                  <td className="py-4 px-3">
                    <div className="space-y-0.5">
                      <span className="font-mono font-bold text-red-600">
                        -₹{freightPerQtl.toLocaleString('en-IN')}/Qtl
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        Total: ₹{totalFreightCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </td>

                  {/* Net Realizable Rate */}
                  <td className="py-4 px-3">
                    <div className="space-y-0.5">
                      <span
                        className={`font-mono font-black text-base ${
                          isHighestNet ? 'text-emerald-700' : 'text-slate-900'
                        }`}
                      >
                        ₹{netPricePerQtl.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        net / quintal
                      </span>
                    </div>
                  </td>

                  {/* Total Net Proceeds */}
                  <td className="py-4 px-4 text-right">
                    <div className="space-y-0.5">
                      <span
                        className={`font-mono font-black text-base sm:text-lg ${
                          isHighestNet ? 'text-emerald-800' : 'text-slate-900'
                        }`}
                      >
                        ₹{Math.round(totalNetValue).toLocaleString('en-IN')}
                      </span>
                      {isHighestNet && (
                        <span className="block text-[10px] font-bold text-emerald-700">
                          Best Profit Margin
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Summary Note */}
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <BadgePercent className="w-4 h-4 text-emerald-600" />
          <span>Rates are dynamically calibrated against national Agmarknet data feeds with live Grade adjustments.</span>
        </div>
        <span className="font-bold text-emerald-800 text-[11px]">
          Transit Freight Model: Base ₹3.5–₹5.2 per Quintal-Km
        </span>
      </div>
    </div>
  );
};

export default MarketComparisonTable;
