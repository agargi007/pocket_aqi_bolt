import { useState, useEffect } from 'react';
import { AQIData } from '../types';
import { getMockAQIData } from '../utils/aqi';
import { supabase } from '../lib/supabase';

export const useAQI = (latitude?: number, longitude?: number, cityName?: string) => {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAQI = async () => {
    if (!latitude || !longitude || !cityName) return;

    setLoading(true);
    setError(null);

    try {
      const mockData = getMockAQIData(latitude, longitude, cityName);
      setAqiData(mockData);

      const { error: dbError } = await supabase
        .from('aqi_data')
        .insert([mockData]);

      if (dbError) {
        console.error('Error saving to database:', dbError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch AQI data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude && cityName) {
      fetchAQI();
    }
  }, [latitude, longitude, cityName]);

  return { aqiData, loading, error, refreshAQI: fetchAQI };
};
