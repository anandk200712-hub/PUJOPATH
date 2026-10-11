import React, { useState } from 'react';
import { usePujo } from '../../context/PujoContext';
import { Pandal } from '@kisansetu/shared';
import { 
  Search, 
  Filter, 
  MapPin, 
  Train, 
  Clock, 
  Eye, 
  MessageSquarePlus, 
  CheckCircle2, 
  Star,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const PandalList: React.FC = () => {
  const { 
    pandals, 
    visitedPandalIds, 
    openPandalModal, 
    openReportModal, 
    markPandalVisited,
    setActiveTab
  } = usePujo();

  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedCrowd, setSelectedCrowd] = useState('All Levels');
  const [sortBy, setSortBy] = useState('popularity');

  const areas = ['All Areas', 'North Kolkata', 'South Kolkata', 'Central Kolkata'];
  const crowdLevels = ['All Levels', 'Low', 'Medium', 'High', 'Peak'];

  // Filter & Sort logic
  const filtered = pandals.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.theme.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesArea = selectedArea === 'All Areas' || p.area === selectedArea;
    const matchesCrowd = selectedCrowd === 'All Levels' || p.current_crowd_level === selectedCrowd;

    return matchesSearch && matchesArea && matchesCrowd;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'crowd_asc') return (a.current_crowd_score || 3) - (b.current_crowd_score || 3);
    if (sortBy === 'crowd_desc') return (b.current_crowd_score || 3) - (a.current_crowd_score || 3);
    return b.popularity_score - a.popularity_score; // popularity
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by pandal name, theme, or locality (e.g., 'Sovabazar', 'Clay', 'College Square')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm transition-all"
          />
        </div>

        {/* Filters & Sorting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Area Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Festival Zone
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Crowd Level Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Crowd Status
            </label>
            <select
              value={selectedCrowd}
              onChange={(e) => setSelectedCrowd(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              {crowdLevels.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="popularity">Popularity Score (Highest)</option>
              <option value="name">Pandal Name (A – Z)</option>
              <option value="crowd_asc">Least Crowded First</option>
              <option value="crowd_desc">Most Crowded First</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-2">
        <span>Showing {filtered.length} of {pandals.length} demonstration pandals</span>
        {search || selectedArea !== 'All Areas' || selectedCrowd !== 'All Levels' ? (
          <button
            onClick={() => {
              setSearch('');
              setSelectedArea('All Areas');
              setSelectedCrowd('All Levels');
              setSortBy('popularity');
            }}
            className="text-red-700 hover:underline"
          >
            Reset Filters
          </button>
        ) : null}
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filtered.map((pandal) => {
          const isVisited = visitedPandalIds.includes(pandal.id);

          return (
            <div
              key={pandal.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-lg transition-all p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Photo & Main Details */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={pandal.image_url || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=80'}
                  alt={pandal.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border border-stone-100 shadow-sm"
                />

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {pandal.area}
                    </span>

                    {/* Crowd Tag */}
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      pandal.current_crowd_level === 'Low' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                      pandal.current_crowd_level === 'Peak' || pandal.current_crowd_level === 'High' ? 'text-rose-700 bg-rose-50 border border-rose-200' :
                      'text-amber-700 bg-amber-50 border border-amber-200'
                    }`}>
                      ● {pandal.current_crowd_level || 'Medium'} Crowd
                    </span>

                    {isVisited && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Visited
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => openPandalModal(pandal)}
                    className="font-serif font-bold text-lg text-stone-900 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    {pandal.name}
                  </h3>

                  <p className="text-xs font-medium text-amber-900 truncate">
                    {pandal.theme}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Train className="w-3.5 h-3.5 text-sky-600" /> {pandal.nearest_metro_station} ({pandal.metro_distance_km} km)
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {pandal.best_visiting_hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                <button
                  onClick={() => openPandalModal(pandal)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => openReportModal(pandal)}
                  className="px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors shadow-sm"
                  title="Report crowd status"
                >
                  <MessageSquarePlus className="w-4 h-4 text-amber-700" />
                </button>

                <button
                  onClick={() => markPandalVisited(pandal.id)}
                  disabled={isVisited}
                  className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                    isVisited
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isVisited ? 'Visited ✓' : 'Mark Visited'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
