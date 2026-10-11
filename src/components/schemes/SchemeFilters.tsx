import React from 'react';
import {
  SlidersHorizontal,
  Search,
  MapPin,
  Users,
  Sprout,
  Scale,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { SchemeCategory } from '../../types';

export interface SchemeFilterState {
  searchQuery: string;
  selectedState: string;
  farmerType: string;
  selectedCrop: string;
  landholdingRange: string;
  category: string;
}

interface SchemeFiltersProps {
  filters: SchemeFilterState;
  onChange: (filters: SchemeFilterState) => void;
  onReset: () => void;
  totalCount: number;
}

export const STATE_OPTIONS = [
  'All India (Central Schemes)',
  'Gujarat',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'West Bengal',
  'Maharashtra',
  'Madhya Pradesh',
  'Rajasthan',
  'Karnataka',
  'Andhra Pradesh',
];

export const FARMER_TYPE_OPTIONS = [
  'All Farmer Categories',
  'Small & Marginal (< 2 Hectares / 5 Acres)',
  'Medium Farmer (2 - 10 Hectares)',
  'Large Landholder (> 10 Hectares)',
  'Tenant Farmer / Sharecropper',
];

export const CROP_OPTIONS = [
  'All Crops',
  'Tomato',
  'Potato',
  'Onion',
  'Wheat',
  'Mustard',
  'Rice / Paddy',
  'Pulses & Oilseeds',
];

export const CATEGORY_OPTIONS: { id: string; label: string }[] = [
  { id: 'All', label: 'All Categories' },
  { id: 'Financial Support', label: 'Financial Support (DBT)' },
  { id: 'Crop Insurance', label: 'Crop Insurance' },
  { id: 'Credit & Loans', label: 'Credit & Loans (KCC)' },
  { id: 'Market Access & Digital', label: 'Digital Market (e-NAM)' },
  { id: 'Soil & Inputs', label: 'Soil & Input Advisory' },
];

export const SchemeFilters: React.FC<SchemeFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Filter Government Welfare & Subsidy Schemes
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {totalCount} Schemes Available
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Filter by State, Farmer Landholding Category, Crop, and Financial Welfare Category.
            </p>
          </div>
        </div>

        {/* Search input & Reset */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scheme name or benefit..."
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

      {/* Grid of 4 Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. State */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>State / Territory</span>
          </label>
          <select
            value={filters.selectedState}
            onChange={(e) => onChange({ ...filters, selectedState: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            {STATE_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Farmer Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Farmer Category</span>
          </label>
          <select
            value={filters.farmerType}
            onChange={(e) => onChange({ ...filters, farmerType: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            {FARMER_TYPE_OPTIONS.map((ft) => (
              <option key={ft} value={ft}>
                {ft}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Crop */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Crop Notified</span>
          </label>
          <select
            value={filters.selectedCrop}
            onChange={(e) => onChange({ ...filters, selectedCrop: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            {CROP_OPTIONS.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Scheme Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Welfare Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default SchemeFilters;
