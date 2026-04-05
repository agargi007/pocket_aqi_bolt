import { Activity, AlertCircle, Check, X } from 'lucide-react';

interface ActivityRecommendationsProps {
  aqi: number;
}

export const ActivityRecommendations = ({ aqi }: ActivityRecommendationsProps) => {
  const activities = [
    {
      name: 'Running/Jogging',
      icon: Activity,
      safeAt: 50,
      recommendation: aqi <= 50 ? 'Safe' : aqi <= 100 ? 'Use caution' : 'Avoid'
    },
    {
      name: 'Cycling',
      icon: Activity,
      safeAt: 50,
      recommendation: aqi <= 50 ? 'Safe' : aqi <= 100 ? 'Use caution' : 'Avoid'
    },
    {
      name: 'Team Sports',
      icon: Activity,
      safeAt: 100,
      recommendation: aqi <= 100 ? 'Safe' : aqi <= 150 ? 'Use caution' : 'Avoid'
    },
    {
      name: 'Walking',
      icon: Activity,
      safeAt: 150,
      recommendation: aqi <= 150 ? 'Safe' : aqi <= 200 ? 'Use caution' : 'Avoid'
    },
    {
      name: 'Outdoor Work',
      icon: Activity,
      safeAt: 100,
      recommendation: aqi <= 100 ? 'Safe' : aqi <= 150 ? 'Use caution' : 'Avoid'
    },
    {
      name: 'Meditation (Indoor)',
      icon: Activity,
      safeAt: 300,
      recommendation: 'Safe (Indoor)'
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 animate-slide-up delay-150">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Activity Recommendations</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isSafe = activity.recommendation === 'Safe' || activity.recommendation === 'Safe (Indoor)';
          const isCaution = activity.recommendation === 'Use caution';

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSafe
                  ? 'bg-green-50 border-green-200 hover:shadow-lg'
                  : isCaution
                  ? 'bg-yellow-50 border-yellow-200 hover:shadow-lg'
                  : 'bg-red-50 border-red-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-3 rounded-full flex-shrink-0 ${
                  isSafe
                    ? 'bg-green-100'
                    : isCaution
                    ? 'bg-yellow-100'
                    : 'bg-red-100'
                }`}>
                  {isSafe ? (
                    <Check className={`w-5 h-5 ${isSafe ? 'text-green-600' : isCaution ? 'text-yellow-600' : 'text-red-600'}`} />
                  ) : isCaution ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                  <p className={`text-sm ${
                    isSafe
                      ? 'text-green-700'
                      : isCaution
                      ? 'text-yellow-700'
                      : 'text-red-700'
                  }`}>
                    {activity.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> These recommendations are based on current AQI levels. Sensitive groups (children, elderly, asthmatic) should take extra precautions even at lower AQI levels.
        </p>
      </div>
    </div>
  );
};
