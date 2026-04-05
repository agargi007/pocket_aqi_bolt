import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Location } from '../types';

interface CitySearchProps {
  onSelectCity: (location: Location) => void;
  onClose: () => void;
}

export const CitySearch = ({ onSelectCity, onClose }: CitySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [searching, setSearching] = useState(false);

  const popularCities: Location[] = [
    { name: 'Delhi', latitude: 28.6139, longitude: 77.2090 },
    { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
    { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946 },
    { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867 },
    { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
    { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
    { name: 'Pune', latitude: 18.5204, longitude: 73.8567 },
    { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714 },
    { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873 },
    { name: 'Lucknow', latitude: 26.8467, longitude: 80.9462 },
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
      );
      const data = await response.json();

      const cities = data.map((result: any) => ({
        name: result.address?.city || result.address?.town || result.name,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon)
      })).filter((city: Location) => city.name);

      setResults(cities);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const displayResults = searchQuery.length > 1 ? results : popularCities;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-fade-in">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Search Cities</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {searching ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <Search className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          ) : displayResults.length > 0 ? (
            displayResults.map((city, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className="w-full flex items-center space-x-4 p-4 hover:bg-blue-50 rounded-2xl transition-colors text-left border-2 border-transparent hover:border-blue-200"
              >
                <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{city.name}</h3>
                  <p className="text-sm text-gray-500">
                    {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                  </p>
                </div>
              </button>
            ))
          ) : searchQuery.length > 1 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No cities found</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
