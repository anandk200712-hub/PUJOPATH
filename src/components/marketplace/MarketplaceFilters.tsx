import React from 'react';
import {
  Filter,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  MapPin,
  IndianRupee,
  Building2,
} from 'lucide-react';
import { BuyerType } from '../../types';

export interface MarketplaceFilterState {
  searchQuery: string;
  selectedCrop: string; // 'All' | 'Tomato' | 'Potato' | 'Onion' | 'Wheat' | 'Mustard'
  radiusKm: number; // 25 to 500 km
  minPrice: number; // 0 to 6000
  verifiedOnly: boolean;
  buyerType: string; // 'All' | 'FPO' | 'Retail Chain' | 'Agri-Processing Unit' | 'Exporter' | 'Wholesaler'
  sortBy: 'price_desc' | 'rating_desc' | 'distance_asc' | 'volume_desc';
}

interface MarketplaceFiltersProps {
  filters: MarketplaceFilterState;
  onChange: (filters: MarketplaceFilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResultsCount,
}) => {
  const cropList = ['All', 'Tomato', 'Potato', 'Onion', 'Wheat', 'Mustard'];
  const buyerTypes = [
    'All',
    'FPO',
    'Retail Chain',
    'Agri-Processing Unit',
    'Exporter',
    'Wholesaler',
    'Local Commission Agent',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Filter Buyer Demands
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                {totalResultsCount} Demands Found
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Filter institutional buyers, FPOs, and retail procurement hubs by crop, distance radius, and verified escrow terms.
            </p>
          </div>
        </div>

        {/* Search input & Reset */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by buyer or location..."
              value={filters.searchQuery}
              onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-2xl pl-9 pr-3.5 py-2 text-xs font-semibold outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={onReset}
            title="Reset filters"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Crop Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Crop Demanded</span>
            <span className="text-emerald-700 font-extrabold">{filters.selectedCrop}</span>
          </label>
          <select
            value={filters.selectedCrop}
            onChange={(e) => onChange({ ...filters, selectedCrop: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 transition-all cursor-pointer outline-none"
          >
            {cropList.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Crops (All Demands)' : `${c}`}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Radius Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Distance Radius</span>
            </label>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
              Within {filters.radiusKm} km
            </span>
          </div>
          <input
            type="range"
            min="25"
            max="600"
            step="25"
            value={filters.radiusKm}
            onChange={(e) => onChange({ ...filters, radiusKm: Number(e.target.value) })}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>25 km</span>
            <span>300 km</span>
            <span>600 km</span>
          </div>
        </div>

        {/* 3. Minimum Price Threshold */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>Min Offered Price</span>
            </label>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
              ₹{filters.minPrice} / Qtl
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="6000"
            step="100"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>₹0 (Any)</span>
            <span>₹3,000</span>
            <span>₹6,000+</span>
          </div>
        </div>

        {/* 4. Verified Toggle & Sort */}
        <div className="space-y-3">
          {/* Verified Toggle Switch */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">Verified Only</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                filters.verifiedOnly ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  filters.verifiedOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-1">
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="price_desc">Highest Price (₹/Qtl)</option>
              <option value="rating_desc">Highest Trust Rating (★)</option>
              <option value="distance_asc">Closest Distance (km)</option>
              <option value="volume_desc">Largest Quantity (Qtl)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MarketplaceFilters;
