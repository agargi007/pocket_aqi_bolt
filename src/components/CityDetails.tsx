import { ArrowLeft, Wind, Droplets, Cloud, AlertCircle, TrendingUp, Calendar, Info } from 'lucide-react';
import { useState } from 'react';
import { AQIData } from '../types';
import { getAQIColor, getAQICategory } from '../utils/aqi';
import { PollutantModal } from './PollutantModal';

interface CityDetailsProps {
  data: AQIData | null;
  onBack: () => void;
}

export const CityDetails = ({ data, onBack }: CityDetailsProps) => {
  const [selectedPollutant, setSelectedPollutant] = useState<any>(null);
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const pollutants = [
    { name: 'PM2.5', value: data.pm25, unit: 'µg/m³', icon: Droplets, impact: 'Fine particles that can penetrate deep into lungs' },
    { name: 'PM10', value: data.pm10, unit: 'µg/m³', icon: Droplets, impact: 'Larger particles that affect respiratory system' },
    { name: 'NO₂', value: data.no2, unit: 'µg/m³', icon: Wind, impact: 'Nitrogen dioxide from vehicle emissions' },
    { name: 'SO₂', value: data.so2, unit: 'µg/m³', icon: Cloud, impact: 'Sulfur dioxide from industrial sources' },
    { name: 'CO', value: data.co, unit: 'mg/m³', icon: AlertCircle, impact: 'Carbon monoxide from incomplete combustion' },
    { name: 'O₃', value: data.o3, unit: 'µg/m³', icon: TrendingUp, impact: 'Ground-level ozone from sunlight reactions' }
  ];

  const historicalData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
    aqi: Math.floor(Math.random() * 150) + 50
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{data.city}</h1>
            <p className="text-gray-600">Detailed Air Quality Analysis</p>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Current AQI</p>
              <div className="flex items-baseline space-x-3">
                <span className="text-6xl font-bold" style={{ color: getAQIColor(data.aqi) }}>
                  {data.aqi}
                </span>
                <span className="text-2xl font-semibold text-gray-600">
                  {getAQICategory(data.aqi)}
                </span>
              </div>
            </div>
            <Wind className="w-16 h-16 text-gray-300 animate-spin-slow" />
          </div>
          <p className="text-gray-600">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Droplets className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Pollutant Breakdown</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pollutants.map((pollutant, index) => {
              const Icon = pollutant.icon;
              const percentage = pollutant.value ? Math.min((pollutant.value / pollutant.limit) * 100, 100) : 0;
              const isExceeded = percentage > 100;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedPollutant(pollutant)}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-300 text-left active:scale-95"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${isExceeded ? 'bg-red-100' : 'bg-blue-100'}`}>
                        <Icon className={`w-6 h-6 ${isExceeded ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{pollutant.name}</h3>
                        <p className="text-xs text-gray-500">WHO: {pollutant.limit} {pollutant.unit}</p>
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${isExceeded ? 'text-red-600' : 'text-blue-600'}`}>
                      {pollutant.value?.toFixed(2) || 'N/A'}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Level</span>
                      <span>{percentage.toFixed(0)}% of limit</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${isExceeded ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-blue-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <p className="leading-relaxed">{pollutant.impact}</p>
                    <Info className="w-4 h-4 flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">7-Day Trend</h2>
          </div>
          <div className="flex items-end justify-between space-x-2 h-64">
            {historicalData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div
                  className="w-full rounded-t-xl transition-all duration-500 hover:scale-105"
                  style={{
                    height: `${(day.aqi / 200) * 100}%`,
                    backgroundColor: getAQIColor(day.aqi),
                    minHeight: '20%'
                  }}
                />
                <span className="text-sm font-medium text-gray-600">{day.day}</span>
                <span className="text-xs text-gray-500">{day.aqi}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedPollutant && (
          <PollutantModal
            pollutant={selectedPollutant}
            onClose={() => setSelectedPollutant(null)}
          />
        )}
      </div>
    </div>
  );
};
