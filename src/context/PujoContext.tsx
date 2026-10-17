import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Pandal, CrowdReport, JourneySummary, UserBadge, VisitedPandal } from '../types';

interface PujoContextType {
  pandals: Pandal[];
  isLoading: boolean;
  selectedPandal: Pandal | null;
  reportModalPandal: Pandal | null;
  activeTab: 'home' | 'map' | 'pandals' | 'metro' | 'journey';
  userLocation: { lat: number; lng: number } | null;
  locationDenied: boolean;
  isTracking: boolean;
  trackingSessionId: string | null;
  journeySummary: JourneySummary | null;
  unlockedBadgeAlert: UserBadge | null;
  visitedPandalIds: string[];
  
  setActiveTab: (tab: 'home' | 'map' | 'pandals' | 'metro' | 'journey') => void;
  openPandalModal: (pandal: Pandal) => void;
  closePandalModal: () => void;
  openReportModal: (pandal: Pandal) => void;
  closeReportModal: () => void;
  closeBadgeAlert: () => void;
  
  fetchPandals: (params?: { area?: string; crowdLevel?: string; search?: string; sort?: string }) => Promise<void>;
  markPandalVisited: (pandalId: string, source?: 'manual' | 'gps_proximity') => Promise<void>;
  submitCrowdReport: (pandalId: string, crowdLevel: 'Low' | 'Medium' | 'High' | 'Peak', crowdScore: number, note?: string) => Promise<boolean>;
  requestLocation: (onSuccess?: () => void) => void;
  startLiveTracking: () => void;
  stopLiveTracking: () => void;
}

const PujoContext = createContext<PujoContextType | undefined>(undefined);

const API_BASE = '/api';
const CURRENT_USER_ID = 'user_demo_kolkata';

export const PujoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pandals, setPandals] = useState<Pandal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const [reportModalPandal, setReportModalPandal] = useState<Pandal | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'pandals' | 'metro' | 'journey'>('home');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingSessionId, setTrackingSessionId] = useState<string | null>(null);
  const [journeySummary, setJourneySummary] = useState<JourneySummary | null>(null);
  const [unlockedBadgeAlert, setUnlockedBadgeAlert] = useState<UserBadge | null>(null);

  // Fetch pandals list
  const fetchPandals = useCallback(async (params?: { area?: string; crowdLevel?: string; search?: string; sort?: string }) => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (params?.area && params.area !== 'All Areas') query.append('area', params.area);
      if (params?.crowdLevel && params.crowdLevel !== 'All Levels') query.append('crowdLevel', params.crowdLevel);
      if (params?.search) query.append('search', params.search);
      if (params?.sort) query.append('sort', params.sort);

      const res = await fetch(`${API_BASE}/pandals?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setPandals(json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch pandals:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch Journey summary
  const fetchJourney = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/journey/summary?userId=${CURRENT_USER_ID}`);
      if (res.ok) {
        const json = await res.json();
        setJourneySummary(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch journey summary:', err);
    }
  }, []);

  useEffect(() => {
    fetchPandals();
    fetchJourney();
  }, [fetchPandals, fetchJourney]);

  // Mark Pandal Visited
  const markPandalVisited = async (pandalId: string, source: 'manual' | 'gps_proximity' = 'manual') => {
    try {
      const res = await fetch(`${API_BASE}/journey/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: CURRENT_USER_ID, pandalId, source }),
      });
      if (res.ok) {
        const json = await res.json();
        await fetchJourney();
        if (json.data.newBadges && json.data.newBadges.length > 0) {
          const firstNew = json.data.newBadges[0];
          setUnlockedBadgeAlert({
            id: `alert_${Date.now()}`,
            user_id: CURRENT_USER_ID,
            badge_key: firstNew.key,
            badge_name: firstNew.name,
            badge_description: `Congratulations! You unlocked the '${firstNew.name}' milestone badge.`,
            earned_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error('Error recording pandal visit:', err);
    }
  };

  // Submit Crowd Report
  const submitCrowdReport = async (pandalId: string, crowdLevel: 'Low' | 'Medium' | 'High' | 'Peak', crowdScore: number, note?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/crowd/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pandalId,
          userId: CURRENT_USER_ID,
          crowdLevel,
          crowdScore,
          note,
        }),
      });
      if (res.ok) {
        await fetchPandals();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error submitting crowd report:', err);
      return false;
    }
  };

  // Request Location
  const requestLocation = (onSuccess?: () => void) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationDenied(false);
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        if (onSuccess) onSuccess();
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err.message);
        setLocationDenied(true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Live Tracking
  const startLiveTracking = () => {
    const sessionId = `ses_${Date.now()}`;
    setTrackingSessionId(sessionId);
    setIsTracking(true);
    requestLocation();
  };

  const stopLiveTracking = () => {
    setIsTracking(false);
    setTrackingSessionId(null);
  };

  // Visited IDs list for fast badge and map checks
  const visitedPandalIds = journeySummary?.visitedPandals?.map((vp: VisitedPandal) => vp.pandal_id) || [];

  return (
    <PujoContext.Provider
      value={{
        pandals,
        isLoading,
        selectedPandal,
        reportModalPandal,
        activeTab,
        userLocation,
        locationDenied,
        isTracking,
        trackingSessionId,
        journeySummary,
        unlockedBadgeAlert,
        visitedPandalIds,
        setActiveTab,
        openPandalModal: (p: Pandal) => setSelectedPandal(p),
        closePandalModal: () => setSelectedPandal(null),
        openReportModal: (p: Pandal) => setReportModalPandal(p),
        closeReportModal: () => setReportModalPandal(null),
        closeBadgeAlert: () => setUnlockedBadgeAlert(null),
        fetchPandals,
        markPandalVisited,
        submitCrowdReport,
        requestLocation,
        startLiveTracking,
        stopLiveTracking,
      }}
    >
      {children}
    </PujoContext.Provider>
  );
};

export const usePujo = () => {
  const context = useContext(PujoContext);
  if (!context) {
    throw new Error('usePujo must be used within a PujoProvider');
  }
  return context;
};
