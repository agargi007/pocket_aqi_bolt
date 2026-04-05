import { Wind, Droplets, AlertCircle } from 'lucide-react';
import { AQIData } from '../types';
import { getAQIGradient } from '../utils/aqi';

interface AQIDisplayProps {
  data: AQIData;
  onClick?: () => void;
}

export const AQIDisplay = ({ data, onClick }: AQIDisplayProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-8 text-white cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${getAQIGradient(
        data.aqi
      )}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 animate-pulse delay-75" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium opacity-90">{data.city}</h3>
            <p className="text-sm opacity-75">{new Date(data.timestamp).toLocaleTimeString()}</p>
          </div>
          <Wind className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="mb-6">
          <div className="text-7xl font-bold mb-2 animate-fade-in">{data.aqi}</div>
          <div className="text-2xl font-semibold">{data.category}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-xs opacity-75">PM2.5</span>
            </div>
            <div className="text-lg font-bold">{data.pm25?.toFixed(1)}</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-xs opacity-75">PM10</span>
            </div>
            <div className="text-lg font-bold">{data.pm10?.toFixed(1)}</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs opacity-75">O₃</span>
            </div>
            <div className="text-lg font-bold">{data.o3?.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
