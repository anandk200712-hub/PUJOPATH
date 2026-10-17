/**
 * PujoPath - Core TypeScript Domain Models
 * Types for Durga Puja Pandals, Crowd Reports, Event Schedules, Journeys & Badges
 */

export type CrowdLevel = 'Low' | 'Medium' | 'High' | 'Peak';

export type VerificationStatus = 'verified' | 'unverified' | 'community_reported';

export type PandalArea = 'North Kolkata' | 'South Kolkata' | 'Central Kolkata' | 'East Kolkata';

export interface Pandal {
  id: string;
  name: string;
  slug: string;
  description: string;
  theme: string;
  cultural_notes?: string;
  area: PandalArea;
  latitude: number;
  longitude: number;
  nearest_metro_station: string;
  metro_distance_km: number;
  nearest_railway_station: string;
  railway_distance_km: number;
  accessibility_information?: string;
  safety_information?: string;
  best_visiting_hours: string;
  popularity_score: number;
  verification_status: VerificationStatus;
  image_url?: string;
  created_at: string;
  updated_at: string;
  // Computed runtime fields
  current_crowd_level?: CrowdLevel;
  current_crowd_score?: number;
  last_crowd_update?: string;
}

export interface CrowdReport {
  id: string;
  pandal_id: string;
  user_id?: string;
  crowd_level: CrowdLevel;
  crowd_score: number;
  source: string;
  verification_status: VerificationStatus;
  observed_at: string;
  created_at: string;
}

export interface EventSchedule {
  id: string;
  pandal_id: string;
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  source: string;
  verification_status: VerificationStatus;
}

export interface User {
  id: string;
  display_name: string;
  created_at: string;
}

export interface JourneyLog {
  id: string;
  user_id: string;
  session_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  distance_traveled_km: number;
  steps_estimated: number;
}

export interface VisitedPandal {
  id: string;
  user_id: string;
  pandal_id: string;
  visited_at: string;
  source: 'manual' | 'gps_proximity';
  pandal?: Pandal;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_key: 'first_steps' | 'first_pandal' | 'pujo_explorer' | 'pujo_marathon' | 'ten_km_trailblazer';
  badge_name: string;
  badge_description: string;
  icon?: string;
  earned_at: string;
}

export interface JourneySummary {
  userId: string;
  totalDistanceKm: number;
  totalStepsEstimated: number;
  visitedCount: number;
  visitedPandals: VisitedPandal[];
  badges: UserBadge[];
}
