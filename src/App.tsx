import React from 'react';
import { PujoProvider, usePujo } from './context/PujoContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { QuickAccessCards } from './components/home/QuickAccessCards';
import { FeaturedPandals } from './components/home/FeaturedPandals';
import { CrowdOverview } from './components/home/CrowdOverview';
import { FestivalCountdown } from './components/home/FestivalCountdown';
import { VisitorGuide } from './components/home/VisitorGuide';
import { SafetyAccessibility } from './components/home/SafetyAccessibility';
import { SocialFeed } from './components/home/SocialFeed';
import { PandalMap } from './components/map/PandalMap';
import { PandalList } from './components/pandals/PandalList';
import { PandalDetailModal } from './components/pandals/PandalDetailModal';
import { CrowdReportModal } from './components/pandals/CrowdReportModal';
import { MetroGuide } from './components/transport/MetroGuide';
import { JourneyTracker } from './components/journey/JourneyTracker';
import { BadgesModal } from './components/journey/BadgesModal';
import { MapPin, Compass, Train, Award, Flame } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab } = usePujo();

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1c1917] selection:bg-red-100 selection:text-red-900 font-sans">
      
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection />
            <QuickAccessCards />
            <FeaturedPandals />
            <CrowdOverview />
            <FestivalCountdown />
            <VisitorGuide />
            <SafetyAccessibility />
            <SocialFeed />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 font-mono mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kolkata Citywide Cartography</span>
                </div>
                <h1 className="text-3xl font-extrabold font-serif text-stone-900">
                  Interactive Pandal Map
                </h1>
                <p className="text-xs text-stone-600 mt-0.5">
                  Click markers to view crowd levels, nearest metro exits, and live navigation directions.
                </p>
              </div>

              {/* Quick Area Jump */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('pandals')}
                  className="px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors shadow-sm"
                >
                  List View
                </button>
              </div>
            </div>

            {/* The Leaflet Map */}
            <PandalMap />

            {/* Synced Discovery List */}
            <div className="pt-6">
              <h2 className="text-2xl font-bold font-serif text-stone-900 mb-6">
                All Monitored Pandals
              </h2>
              <PandalList />
            </div>
          </div>
        )}

        {activeTab === 'pandals' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 font-mono mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Pandal Directory</span>
              </div>
              <h1 className="text-3xl font-extrabold font-serif text-stone-900">
                Explore Kolkata Pandals
              </h1>
              <p className="text-xs text-stone-600 mt-0.5">
                Filter by festival zone, real-time crowd level, or sort by footfall popularity.
              </p>
            </div>

            <PandalList />
          </div>
        )}

        {activeTab === 'metro' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 font-mono mb-1">
                <Train className="w-3.5 h-3.5" />
                <span>Transit Connectivity</span>
              </div>
              <h1 className="text-3xl font-extrabold font-serif text-stone-900">
                Kolkata Metro & Transport Guide
              </h1>
              <p className="text-xs text-stone-600 mt-0.5">
                Blue & Green Line station distances, overnight festival schedules, and walking routes.
              </p>
            </div>

            <MetroGuide />
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 font-mono mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Parikrama Gamification</span>
              </div>
              <h1 className="text-3xl font-extrabold font-serif text-stone-900">
                Personal Journey Tracker & Badges
              </h1>
              <p className="text-xs text-stone-600 mt-0.5">
                Log walking distances, mark visited pandals, and collect Sharodiya achievements.
              </p>
            </div>

            <JourneyTracker />
          </div>
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Modals */}
      <PandalDetailModal />
      <CrowdReportModal />
      <BadgesModal />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PujoProvider>
      <MainAppContent />
    </PujoProvider>
  );
};

export default App;
