import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { HealthCalculator } from './components/HealthCalculator';
import { CityDetails } from './components/CityDetails';
import { CommunityReports } from './components/CommunityReports';
import { SettingsScreen } from './components/SettingsScreen';
import { useAQI } from './hooks/useAQI';
import { useLocation } from './hooks/useLocation';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCityDetails, setShowCityDetails] = useState(false);
  const { location } = useLocation();
  const { aqiData } = useAQI(location?.latitude, location?.longitude, location?.name);

  const renderContent = () => {
    if (showCityDetails && aqiData) {
      return <CityDetails data={aqiData} onBack={() => setShowCityDetails(false)} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen onViewDetails={() => setShowCityDetails(true)} />;
      case 'health':
        return <HealthCalculator />;
      case 'community':
        return <CommunityReports />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onViewDetails={() => setShowCityDetails(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;
