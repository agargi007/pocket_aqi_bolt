import { Bell, MapPin, Moon, Globe, Info, Heart, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(100);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [savedLocations, setSavedLocations] = useState([
    { name: 'Home', city: 'New York' },
    { name: 'Office', city: 'New York' },
    { name: 'Gym', city: 'Brooklyn' }
  ]);
  const [showSavedLocations, setShowSavedLocations] = useState(false);

  const handleExportData = () => {
    const data = {
      notifications,
      alertThreshold,
      language: selectedLanguage,
      timestamp: new Date().toISOString()
    };
    const jsonString = JSON.stringify(data, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString));
    element.setAttribute('download', 'pocket-aqi-settings.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRemoveLocation = (index: number) => {
    setSavedLocations(savedLocations.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-24 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 text-lg">
            Customize your Pocket AQI experience
          </p>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Get alerted when AQI exceeds threshold</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                    notifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications ? 'transform translate-x-8' : ''
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-4">
                  Alert Threshold: {alertThreshold} AQI
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>50</span>
                  <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Location</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowSavedLocations(!showSavedLocations)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors active:scale-95"
              >
                <span className="font-medium text-gray-700">Manage Saved Locations</span>
                <span className="text-blue-600 font-semibold">{savedLocations.length} saved</span>
              </button>

              {showSavedLocations && (
                <div className="space-y-3 bg-blue-50 p-4 rounded-2xl animate-slide-up">
                  {savedLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{location.name}</p>
                        <p className="text-sm text-gray-600">{location.city}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveLocation(index)}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors active:scale-95">
                <span className="font-medium text-gray-700">Auto-detect Location</span>
                <div className="w-6 h-6 bg-green-500 rounded-full" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Moon className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Appearance</h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  darkMode ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    darkMode ? 'transform translate-x-8' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Language</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['English', 'हिंदी', 'বাংলা', 'தமிழ்'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    selectedLanguage === lang
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`font-medium ${selectedLanguage === lang ? 'text-blue-600' : 'text-gray-700'}`}>
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Download className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data & Export</h2>
            </div>

            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl hover:shadow-lg transition-all active:scale-95 border-2 border-green-200"
            >
              <Download className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-600">Export Settings</span>
            </button>

            <p className="text-sm text-gray-600 mt-3">
              Download your settings and preferences as a JSON file for backup or transfer to another device.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 animate-pulse" />
              <h2 className="text-2xl font-bold">About Pocket AQI</h2>
            </div>
            <p className="text-white text-opacity-90 leading-relaxed mb-4">
              Pocket AQI provides real-time air quality information to help you make informed decisions about your health and outdoor activities.
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                <Info className="w-5 h-5" />
                <span>Version 1.0.0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
