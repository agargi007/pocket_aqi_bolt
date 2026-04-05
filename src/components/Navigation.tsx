import { Home, Activity, MapPin, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'health', icon: Activity, label: 'Health' },
    { id: 'community', icon: MapPin, label: 'Community' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:space-x-8">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 py-3 px-4 transition-all duration-300 ${
                activeTab === id
                  ? 'text-blue-600 transform scale-110'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${activeTab === id ? 'animate-bounce' : ''}`} />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
