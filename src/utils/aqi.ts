import { AQICategory, HealthRecommendation } from '../types';

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#00e400';
  if (aqi <= 100) return '#ffff00';
  if (aqi <= 150) return '#ff7e00';
  if (aqi <= 200) return '#ff0000';
  if (aqi <= 300) return '#8f3f97';
  return '#7e0023';
};

export const getAQIGradient = (aqi: number): string => {
  if (aqi <= 50) return 'from-green-400 to-green-600';
  if (aqi <= 100) return 'from-yellow-400 to-yellow-600';
  if (aqi <= 150) return 'from-orange-400 to-orange-600';
  if (aqi <= 200) return 'from-red-400 to-red-600';
  if (aqi <= 300) return 'from-purple-400 to-purple-600';
  return 'from-red-900 to-purple-900';
};

export const getHealthRecommendations = (aqi: number, age?: number, conditions?: string[]): HealthRecommendation[] => {
  const category = getAQICategory(aqi);
  const recommendations: HealthRecommendation[] = [];

  const isSensitive = (age && (age < 12 || age > 65)) || (conditions && conditions.length > 0);

  if (category === 'Good') {
    recommendations.push({
      category: 'Outdoor Activity',
      icon: 'Activity',
      message: 'Perfect day for outdoor activities! Air quality is excellent.',
      color: 'text-green-600'
    });
  } else if (category === 'Moderate') {
    recommendations.push({
      category: 'General Activity',
      icon: 'AlertCircle',
      message: 'Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion.',
      color: 'text-yellow-600'
    });
  } else if (category === 'Unhealthy for Sensitive Groups') {
    if (isSensitive) {
      recommendations.push({
        category: 'Sensitive Groups',
        icon: 'AlertTriangle',
        message: 'Reduce prolonged or heavy outdoor exertion. Watch for symptoms like coughing or shortness of breath.',
        color: 'text-orange-600'
      });
    }
    recommendations.push({
      category: 'Outdoor Activity',
      icon: 'Wind',
      message: 'General public can continue normal activities. Consider wearing a mask during extended outdoor time.',
      color: 'text-orange-600'
    });
  } else if (category === 'Unhealthy') {
    recommendations.push({
      category: 'Everyone',
      icon: 'AlertTriangle',
      message: 'Everyone should reduce prolonged or heavy outdoor exertion. Keep windows closed.',
      color: 'text-red-600'
    });
    recommendations.push({
      category: 'Mask Recommended',
      icon: 'ShieldAlert',
      message: 'Wear N95 or KN95 masks when going outside. Use air purifiers indoors.',
      color: 'text-red-600'
    });
  } else if (category === 'Very Unhealthy') {
    recommendations.push({
      category: 'Avoid Outdoor Activity',
      icon: 'XCircle',
      message: 'Everyone should avoid all outdoor exertion. Stay indoors with windows closed.',
      color: 'text-purple-600'
    });
    recommendations.push({
      category: 'Air Purifiers',
      icon: 'Wind',
      message: 'Use air purifiers with HEPA filters. Wear masks even for brief outdoor exposure.',
      color: 'text-purple-600'
    });
  } else {
    recommendations.push({
      category: 'Health Warning',
      icon: 'AlertOctagon',
      message: 'HAZARDOUS! Avoid all outdoor activity. Remain indoors and keep activity levels low.',
      color: 'text-red-900'
    });
    recommendations.push({
      category: 'Emergency Measures',
      icon: 'ShieldAlert',
      message: 'Seek medical attention if experiencing symptoms. Use air purifiers and seal windows.',
      color: 'text-red-900'
    });
  }

  return recommendations;
};

export const calculateHealthRisk = (aqi: number, age: number, conditions: string[]): number => {
  let risk = aqi / 5;

  if (age < 12 || age > 65) risk *= 1.5;

  if (conditions.includes('asthma')) risk *= 1.8;
  if (conditions.includes('heart_disease')) risk *= 1.6;
  if (conditions.includes('copd')) risk *= 2.0;
  if (conditions.includes('diabetes')) risk *= 1.3;

  return Math.min(Math.round(risk), 100);
};

export const getMockAQIData = (latitude: number, longitude: number, cityName: string) => {
  const baseAqi = Math.floor(Math.random() * 200) + 20;

  return {
    city: cityName,
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
    aqi: baseAqi,
    pm25: baseAqi * 0.8,
    pm10: baseAqi * 1.2,
    no2: Math.random() * 50,
    so2: Math.random() * 30,
    co: Math.random() * 2,
    o3: Math.random() * 80,
    category: getAQICategory(baseAqi)
  };
};
