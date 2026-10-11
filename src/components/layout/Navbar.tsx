import React, { useState } from 'react';
import { usePujo } from '../../context/PujoContext';
import { 
  Flame, 
  MapPin, 
  Compass, 
  Train, 
  Award, 
  Menu, 
  X, 
  Activity, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, isTracking, journeySummary } = usePujo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Flame },
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'pandals', label: 'Explore Pandals', icon: Compass },
    { id: 'metro', label: 'Metro & Transit', icon: Train },
    { id: 'journey', label: 'My Journey', icon: Award },
  ] as const;

  const visitedCount = journeySummary?.visitedCount || 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-7 h-7 text-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-red-700 group-hover:text-red-800 transition-colors">
                  PujoPath
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  2026
                </span>
              </div>
              <p className="text-xs text-amber-900/70 font-medium hidden sm:block">
                Find your Pujo. Follow the feeling.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-700 shadow-sm border border-red-200/80'
                      : 'text-stone-700 hover:text-red-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-stone-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets: Active Tracker & Visited Badge */}
          <div className="flex items-center gap-2.5">
            {/* Live Tracking Status Pill */}
            {isTracking ? (
              <div 
                onClick={() => setActiveTab('journey')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold cursor-pointer animate-pulse"
                title="GPS Journey Tracking Active"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Tracking Live</span>
              </div>
            ) : null}

            {/* Visited Counter Pill */}
            <button
              onClick={() => setActiveTab('journey')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-300/80 text-amber-950 text-xs font-bold hover:bg-amber-100/50 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              <span>{visitedCount} Visited</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-amber-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-stone-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
