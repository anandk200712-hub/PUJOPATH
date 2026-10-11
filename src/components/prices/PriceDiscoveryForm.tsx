import React from 'react';
import {
  Sprout,
  Scale,
  MapPin,
  Award,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { QualityGradeType } from '../../types';

export interface PriceDiscoveryParams {
  cropId: string;
  quantityValue: number;
  quantityUnit: 'kg' | 'quintal';
  location: string;
  grade: QualityGradeType;
}

interface PriceDiscoveryFormProps {
  params: PriceDiscoveryParams;
  onChange: (params: PriceDiscoveryParams) => void;
  onReset?: () => void;
}

export const CROP_OPTIONS = [
  { id: 'crop-tomato', name: 'Tomato (टमाटर)', category: 'Vegetables', defaultPrice: 2450 },
  { id: 'crop-potato', name: 'Potato (आलू)', category: 'Vegetables', defaultPrice: 1650 },
  { id: 'crop-onion', name: 'Onion (लाल प्याज)', category: 'Vegetables', defaultPrice: 2750 },
  { id: 'crop-wheat', name: 'Wheat (गेहूं - Sharbati)', category: 'Grains', defaultPrice: 2600 },
  { id: 'crop-mustard', name: 'Mustard (सरसों / Rai)', category: 'Oilseeds', defaultPrice: 5950 },
];

export const LOCATION_OPTIONS = [
  { id: 'patna', name: 'Bakhtiarpur / Patna (Bihar)', state: 'Bihar', region: 'East' },
  { id: 'kolkata', name: 'Kolkata / Hooghly (West Bengal)', state: 'West Bengal', region: 'East' },
  { id: 'anand', name: 'Anand / Kheda (Gujarat)', state: 'Gujarat', region: 'West' },
  { id: 'nashik', name: 'Nashik / Niphad (Maharashtra)', state: 'Maharashtra', region: 'West' },
  { id: 'ludhiana', name: 'Ludhiana / Khanna (Punjab)', state: 'Punjab', region: 'North' },
  { id: 'karnal', name: 'Karnal / Kurukshetra (Haryana)', state: 'Haryana', region: 'North' },
  { id: 'delhi', name: 'Delhi NCR / Azadpur (Delhi)', state: 'Delhi', region: 'North' },
  { id: 'indore', name: 'Indore / Malwa (Madhya Pradesh)', state: 'Madhya Pradesh', region: 'Central' },
  { id: 'kolar', name: 'Kolar / Bangalore Rural (Karnataka)', state: 'Karnataka', region: 'South' },
];

export const PriceDiscoveryForm: React.FC<PriceDiscoveryFormProps> = ({
  params,
  onChange,
  onReset,
}) => {
  const handleCropChange = (cropId: string) => {
    onChange({ ...params, cropId });
  };

  const handleQuantityValueChange = (val: number) => {
    onChange({ ...params, quantityValue: Math.max(1, val) });
  };

  const handleUnitChange = (quantityUnit: 'kg' | 'quintal') => {
    onChange({ ...params, quantityUnit });
  };

  const handleLocationChange = (location: string) => {
    onChange({ ...params, location });
  };

  const handleGradeChange = (grade: QualityGradeType) => {
    onChange({ ...params, grade });
  };

  // Compute quantity in quintals for quick helper preview
  const quantityInQuintals =
    params.quantityUnit === 'kg' ? params.quantityValue / 100 : params.quantityValue;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Crop & Location Parameters
            </h3>
            <p className="text-xs text-slate-500">
              Configure your harvest details to discover the highest net yield across all Indian mandis.
            </p>
          </div>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="self-start sm:self-auto text-xs font-bold text-slate-500 hover:text-emerald-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        )}
      </div>

      {/* Grid of 4 Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Crop Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Select Crop / फसल चुनें</span>
          </label>
          <div className="relative">
            <select
              value={params.cropId}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-900 transition-all cursor-pointer outline-none"
            >
              {CROP_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Quantity & Unit Switcher */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Quantity / मात्रा</span>
            </label>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              = {quantityInQuintals.toFixed(1)} Qtl
            </span>
          </div>
          
          <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 overflow-hidden transition-all">
            <input
              type="number"
              min="1"
              step="1"
              value={params.quantityValue}
              onChange={(e) => handleQuantityValueChange(Number(e.target.value))}
              className="w-full bg-transparent px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-900 outline-none"
              placeholder="e.g. 500"
            />
            <div className="flex border-l border-slate-200 bg-slate-100/80 p-1">
              <button
                type="button"
                onClick={() => handleUnitChange('kg')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  params.quantityUnit === 'kg'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => handleUnitChange('quintal')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  params.quantityUnit === 'quintal'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Qtl
              </button>
            </div>
          </div>
        </div>

        {/* 3. Farm Location / District */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Farm Location / ज़िला</span>
          </label>
          <div className="relative">
            <select
              value={params.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-900 transition-all cursor-pointer outline-none"
            >
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Quality Grade */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Quality Grade / गुणवत्ता</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(['A', 'B', 'C'] as QualityGradeType[]).map((gradeKey) => {
              const isActive = params.grade === gradeKey;
              return (
                <button
                  key={gradeKey}
                  type="button"
                  onClick={() => handleGradeChange(gradeKey)}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>Grade {gradeKey}</span>
                  <span
                    className={`text-[9px] font-semibold ${
                      isActive ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {gradeKey === 'A' ? '+20% Prem' : gradeKey === 'B' ? 'Standard' : '-20% Disc'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PriceDiscoveryForm;
