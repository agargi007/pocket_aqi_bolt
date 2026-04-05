/*
  # Pocket AQI Database Schema

  ## Overview
  Creates the complete database schema for the Pocket AQI application, including user management,
  AQI data storage, and community reporting features.

  ## New Tables
  
  ### 1. users
  Stores user profiles with health information and preferences:
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text) - User email address
  - `age` (integer) - User age for health calculations
  - `health_conditions` (text[]) - Array of health conditions
  - `saved_locations` (jsonb) - Saved locations with coordinates
  - `alert_preferences` (jsonb) - Notification preferences
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. aqi_data
  Stores historical and current AQI readings:
  - `id` (uuid, primary key) - Unique record identifier
  - `city` (text) - City name
  - `latitude` (decimal) - Location latitude
  - `longitude` (decimal) - Location longitude
  - `timestamp` (timestamptz) - Reading timestamp
  - `aqi` (integer) - Air Quality Index value
  - `pm25` (decimal) - PM2.5 concentration
  - `pm10` (decimal) - PM10 concentration
  - `no2` (decimal) - NO2 concentration
  - `so2` (decimal) - SO2 concentration
  - `co` (decimal) - CO concentration
  - `o3` (decimal) - O3 concentration
  - `category` (text) - AQI category (Good, Moderate, etc.)

  ### 3. community_reports
  Stores user-submitted pollution reports:
  - `id` (uuid, primary key) - Unique report identifier
  - `user_id` (uuid) - Reporter's user ID
  - `latitude` (decimal) - Report location latitude
  - `longitude` (decimal) - Report location longitude
  - `pollution_type` (text) - Type of pollution observed
  - `severity` (integer) - Severity rating (1-10)
  - `description` (text) - Detailed description
  - `verified` (boolean) - Whether report is verified
  - `votes` (integer) - Community votes count
  - `created_at` (timestamptz) - Report creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can read their own data
  - Authenticated users can read all AQI data
  - Users can create and view community reports
  - Users can update their own profiles and reports
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  age integer,
  health_conditions text[] DEFAULT '{}',
  saved_locations jsonb DEFAULT '[]',
  alert_preferences jsonb DEFAULT '{"enabled": true, "threshold": 100}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create aqi_data table
CREATE TABLE IF NOT EXISTS aqi_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  timestamp timestamptz DEFAULT now(),
  aqi integer NOT NULL,
  pm25 decimal(8, 2),
  pm10 decimal(8, 2),
  no2 decimal(8, 2),
  so2 decimal(8, 2),
  co decimal(8, 4),
  o3 decimal(8, 2),
  category text,
  created_at timestamptz DEFAULT now()
);

-- Create community_reports table
CREATE TABLE IF NOT EXISTS community_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  pollution_type text NOT NULL,
  severity integer NOT NULL CHECK (severity >= 1 AND severity <= 10),
  description text,
  verified boolean DEFAULT false,
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_aqi_data_city ON aqi_data(city);
CREATE INDEX IF NOT EXISTS idx_aqi_data_timestamp ON aqi_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_aqi_data_location ON aqi_data(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_community_reports_location ON community_reports(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_community_reports_created_at ON community_reports(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE aqi_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for aqi_data table (public read access for AQI data)
CREATE POLICY "Anyone can view AQI data"
  ON aqi_data FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert AQI data"
  ON aqi_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for community_reports table
CREATE POLICY "Anyone can view community reports"
  ON community_reports FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reports"
  ON community_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON community_reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON community_reports FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);