import { useState, useEffect } from 'react';
import { MapPin, RefreshCw, TrendingUp, Wind, AlertTriangle, Info, Clock, Search } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import { useAQI } from '../hooks/useAQI';
import { AQIDisplay } from './AQIDisplay';
import { CitySearch } from './CitySearch';
import { ActivityRecommendations } from './ActivityRecommendations';
import { getHealthRecommendations, getAQIColor } from '../utils/aqi';
import { Location } from '../types';

interface HomeScreenProps {
  onViewDetails: () => void;
}

export const HomeScreen = ({ onViewDetails }: HomeScreenProps) => {
  const { location, loading: locationLoading, error: locationError, refreshLocation } = useLocation();
  const { aqiData, loading: aqiLoading, refreshAQI } = useAQI(
    location?.latitude,
    location?.longitude,
    location?.name
  );
  const [recommendations, setRecommendations] = useState<ReturnType<typeof getHealthRecommendations>>([]);
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (aqiData) {
      setRecommendations(getHealthRecommendations(aqiData.aqi));
    }
  }, [aqiData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshLocation();
    refreshAQI();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleSelectCity = (selectedLocation: Location) => {
    const event = new CustomEvent('locationChange', { detail: selectedLocation });
    window.dispatchEvent(event);
    window.location.reload();
  };

  if (locationLoading || aqiLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Wind className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Detecting your location...</p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 text-lg mb-4">{locationError}</p>
          <button
            onClick={refreshLocation}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-24 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
              Pocket AQI
            </h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{location?.name}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-180"
          >
            <RefreshCw className="w-6 h-6 text-blue-600" />
          </button>
        </header>

        {aqiData && (
          <>
            <div className="mb-8 animate-slide-up">
              <AQIDisplay data={aqiData} onClick={onViewDetails} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-3xl shadow-xl p-6 animate-slide-up delay-75">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Last Updated</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  {new Date(aqiData.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(aqiData.timestamp).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 animate-slide-up delay-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Info className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Air Quality Tips</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  {aqiData.aqi <= 50
                    ? '✅ Great day for outdoor activities!'
                    : aqiData.aqi <= 100
                    ? '⚠️ Moderate air quality'
                    : '🛑 Consider staying indoors'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 animate-slide-up delay-100">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Health Recommendations</h2>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300 border-l-4"
                    style={{ borderLeftColor: getAQIColor(aqiData.aqi) }}
                  >
                    <div className={`p-3 rounded-full bg-white shadow-md flex-shrink-0 ${rec.color}`}>
                      <div className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold mb-1 ${rec.color}`}>{rec.category}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{rec.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ActivityRecommendations aqi={aqiData.aqi} />

            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8">
              <button
                onClick={onViewDetails}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Wind className="w-8 h-8 mb-2 mx-auto" />
                <span className="font-semibold text-sm md:text-base">Details</span>
              </button>
              <button
                onClick={() => setShowCitySearch(true)}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Search className="w-8 h-8 mb-2 mx-auto" />
                <span className="font-semibold text-sm md:text-base">Search</span>
              </button>
            </div>

            {showCitySearch && (
              <CitySearch
                onSelectCity={handleSelectCity}
                onClose={() => setShowCitySearch(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
