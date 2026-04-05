import { X, AlertCircle, Heart, Activity } from 'lucide-react';

interface PollutantModalProps {
  pollutant: {
    name: string;
    value: number;
    unit: string;
    limit: number;
  };
  onClose: () => void;
}

export const PollutantModal = ({ pollutant, onClose }: PollutantModalProps) => {
  const pollutantInfo: Record<string, { description: string; sources: string[]; effects: string[] }> = {
    'PM2.5': {
      description: 'Fine particulate matter smaller than 2.5 micrometers. These particles can penetrate deep into the lungs and bloodstream.',
      sources: ['Vehicle emissions', 'Industrial pollution', 'Dust', 'Pollen', 'Smoke from fires'],
      effects: ['Respiratory problems', 'Reduced lung function', 'Asthma attacks', 'Cardiovascular issues', 'Premature death in severe cases']
    },
    'PM10': {
      description: 'Coarse particulate matter smaller than 10 micrometers. Larger particles that primarily affect respiratory system.',
      sources: ['Construction', 'Dust storms', 'Industrial emissions', 'Combustion'],
      effects: ['Coughing', 'Difficulty breathing', 'Respiratory diseases', 'Bronchitis']
    },
    'NO₂': {
      description: 'Nitrogen dioxide, a reddish-brown gas produced primarily by vehicle engines and power plants.',
      sources: ['Vehicle emissions', 'Power plants', 'Industrial facilities', 'Combustion engines'],
      effects: ['Respiratory inflammation', 'Reduced immunity', 'Asthma exacerbation', 'Increased infection risk']
    },
    'SO₂': {
      description: 'Sulfur dioxide, a colorless gas produced by burning fossil fuels and industrial processes.',
      sources: ['Coal power plants', 'Oil refineries', 'Metal smelting', 'Chemical factories'],
      effects: ['Bronchitis', 'Reduced lung function', 'Asthma attacks', 'Respiratory inflammation']
    },
    'CO': {
      description: 'Carbon monoxide, a colorless, odorless gas from incomplete combustion.',
      sources: ['Vehicle emissions', 'Industrial combustion', 'Incomplete burning', 'Power generation'],
      effects: ['Reduced oxygen delivery', 'Heart problems', 'Central nervous system damage', 'Impaired cognitive function']
    },
    'O₃': {
      description: 'Ground-level ozone, formed when sunlight reacts with pollution. Different from protective atmospheric ozone.',
      sources: ['Sunlight + pollution reactions', 'Vehicle emissions', 'Industrial emissions', 'Chemical reactions'],
      effects: ['Respiratory tract irritation', 'Reduced lung function', 'Asthma exacerbation', 'Increased susceptibility to infections']
    }
  };

  const info = pollutantInfo[pollutant.name] || { description: '', sources: [], effects: [] };
  const percentage = (pollutant.value / pollutant.limit) * 100;
  const status = percentage > 100 ? 'Exceeded' : percentage > 80 ? 'High' : percentage > 50 ? 'Moderate' : 'Good';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">{pollutant.name}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{pollutant.name}</h2>
              <p className="opacity-90">Detailed Information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Current Level</p>
                <p className="text-3xl font-bold text-blue-600">{pollutant.value.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{pollutant.unit}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">WHO Limit</p>
                <p className="text-3xl font-bold text-green-600">{pollutant.limit}</p>
                <p className="text-xs text-gray-500">{pollutant.unit}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className={`text-3xl font-bold ${
                  status === 'Exceeded' ? 'text-red-600' :
                  status === 'High' ? 'text-orange-600' :
                  status === 'Moderate' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{status}</p>
                <p className="text-xs text-gray-500">{percentage.toFixed(0)}% of limit</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  percentage > 100 ? 'bg-red-500' :
                  percentage > 80 ? 'bg-orange-500' :
                  percentage > 50 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              <span>What is {pollutant.name}?</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{info.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-orange-600" />
              <span>Common Sources</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {info.sources.map((source, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{source}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-600" />
              <span>Health Effects</span>
            </h3>
            <div className="space-y-2">
              {info.effects.map((effect, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{effect}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Protection Tips</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Wear N95 masks when pollution levels are high</li>
              <li>✓ Use air purifiers indoors</li>
              <li>✓ Avoid outdoor exercise during peak pollution hours</li>
              <li>✓ Keep windows closed during high pollution days</li>
              <li>✓ Monitor air quality regularly</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
