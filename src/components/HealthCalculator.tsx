import { useState } from 'react';
import { Heart, Activity, AlertCircle, TrendingUp, Users } from 'lucide-react';
import { calculateHealthRisk, getHealthRecommendations } from '../utils/aqi';

export const HealthCalculator = () => {
  const [age, setAge] = useState<number>(30);
  const [conditions, setConditions] = useState<string[]>([]);
  const [aqiInput, setAqiInput] = useState<number>(100);
  const [showResults, setShowResults] = useState(false);

  const healthConditions = [
    { id: 'asthma', label: 'Asthma', icon: Activity },
    { id: 'heart_disease', label: 'Heart Disease', icon: Heart },
    { id: 'copd', label: 'COPD', icon: AlertCircle },
    { id: 'diabetes', label: 'Diabetes', icon: TrendingUp }
  ];

  const toggleCondition = (condition: string) => {
    setConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const riskScore = calculateHealthRisk(aqiInput, age, conditions);
  const recommendations = getHealthRecommendations(aqiInput, age, conditions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-900">Health Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get personalized air quality health recommendations
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Your Age
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-600 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>1</span>
                <span className="text-2xl font-bold text-blue-600">{age} years</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Current AQI Level
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="500"
                value={aqiInput}
                onChange={(e) => setAqiInput(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 via-red-400 to-purple-600 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>0</span>
                <span className="text-2xl font-bold text-gray-900">{aqiInput}</span>
                <span>500</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Health Conditions
            </label>
            <div className="grid grid-cols-2 gap-4">
              {healthConditions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => toggleCondition(id)}
                  className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    conditions.includes(id)
                      ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${conditions.includes(id) ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`font-medium ${conditions.includes(id) ? 'text-blue-600' : 'text-gray-700'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Calculate Health Risk
          </button>
        </div>

        {showResults && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Health Risk Score</h2>
                <AlertCircle className="w-8 h-8 animate-pulse" />
              </div>
              <div className="text-6xl font-bold mb-2">{riskScore}/100</div>
              <p className="text-lg opacity-90">
                {riskScore < 30 ? 'Low Risk' : riskScore < 60 ? 'Moderate Risk' : 'High Risk'}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className={`font-bold text-lg mb-2 ${rec.color}`}>{rec.category}</h3>
                    <p className="text-gray-700 leading-relaxed">{rec.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
