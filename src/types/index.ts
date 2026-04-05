export interface AQIData {
  id?: string;
  city: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  aqi: number;
  pm25?: number;
  pm10?: number;
  no2?: number;
  so2?: number;
  co?: number;
  o3?: number;
  category: AQICategory;
}

export type AQICategory = 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface UserProfile {
  id: string;
  email?: string;
  age?: number;
  health_conditions: string[];
  saved_locations: Location[];
  alert_preferences: AlertPreferences;
  created_at: string;
  updated_at: string;
}

export interface AlertPreferences {
  enabled: boolean;
  threshold: number;
}

export interface CommunityReport {
  id?: string;
  user_id?: string;
  latitude: number;
  longitude: number;
  pollution_type: string;
  severity: number;
  description?: string;
  verified: boolean;
  votes: number;
  created_at?: string;
}

export interface HealthRecommendation {
  category: string;
  icon: string;
  message: string;
  color: string;
}

export interface Pollutant {
  name: string;
  value: number;
  unit: string;
  impact: string;
}
