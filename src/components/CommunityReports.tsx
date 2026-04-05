import { useState, useEffect } from 'react';
import { MapPin, Send, ThumbsUp, AlertTriangle, Flame, Factory, Car, Trash } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CommunityReport } from '../types';
import { useLocation } from '../hooks/useLocation';

export const CommunityReports = () => {
  const { location } = useLocation();
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pollution_type: '',
    severity: 5,
    description: ''
  });

  const pollutionTypes = [
    { id: 'smoke', label: 'Smoke', icon: Flame, color: 'text-orange-600' },
    { id: 'industrial', label: 'Industrial', icon: Factory, color: 'text-gray-600' },
    { id: 'vehicle', label: 'Vehicle Emissions', icon: Car, color: 'text-blue-600' },
    { id: 'waste', label: 'Waste Burning', icon: Trash, color: 'text-red-600' }
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('community_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setReports(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      alert('Please enable location services');
      return;
    }

    const { error } = await supabase
      .from('community_reports')
      .insert([{
        ...formData,
        latitude: location.latitude,
        longitude: location.longitude,
        verified: false,
        votes: 0
      }]);

    if (!error) {
      setShowForm(false);
      setFormData({ pollution_type: '', severity: 5, description: '' });
      fetchReports();
    }
  };

  const handleVote = async (reportId: string, currentVotes: number) => {
    await supabase
      .from('community_reports')
      .update({ votes: currentVotes + 1 })
      .eq('id', reportId);

    fetchReports();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 pb-24 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-10 h-10 text-green-600 animate-pulse" />
                <h1 className="text-4xl font-bold text-gray-900">Community Reports</h1>
              </div>
              <p className="text-gray-600 text-lg">
                Share and view pollution reports in your area
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </header>

        {showForm && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Report</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-4">
                  Type of Pollution
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {pollutionTypes.map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFormData({ ...formData, pollution_type: id })}
                      className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                        formData.pollution_type === id
                          ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${formData.pollution_type === id ? 'text-green-600' : color}`} />
                      <span className={`font-medium ${formData.pollution_type === id ? 'text-green-600' : 'text-gray-700'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-4">
                  Severity: {formData.severity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: Number(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="Describe what you're observing..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Submit Report
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {reports.map((report) => {
            const pollutionType = pollutionTypes.find(t => t.id === report.pollution_type);
            const Icon = pollutionType?.icon || AlertTriangle;

            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gray-100 rounded-full ${pollutionType?.color || 'text-gray-600'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 capitalize">
                        {report.pollution_type.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Severity: {report.severity}/10
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVote(report.id!, report.votes)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">{report.votes}</span>
                  </button>
                </div>
                {report.description && (
                  <p className="text-gray-700 leading-relaxed mb-3">{report.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                    </span>
                  </div>
                  <span>{report.created_at && new Date(report.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reports yet. Be the first to contribute!</p>
          </div>
        )}
      </div>
    </div>
  );
};
