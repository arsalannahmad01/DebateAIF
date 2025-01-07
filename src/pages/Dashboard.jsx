import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { debateService } from '../services/debateService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentDebates, setRecentDebates] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoadingDebates, setIsLoadingDebates] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [debatesError, setDebatesError] = useState(null);
  const [statsError, setStatsError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch recent debates
      setIsLoadingDebates(true);
      const debatesData = await debateService.getRecentDebates();
      setRecentDebates(debatesData.data || []);
      setDebatesError(null);
    } catch (err) {
      console.error('Failed to fetch debates:', err);
      setDebatesError(err.message);
      toast.error('Failed to load recent debates');
    } finally {
      setIsLoadingDebates(false);
    }

    try {
      // Fetch stats
      setIsLoadingStats(true);
      const statsData = await debateService.getStats();
      setStats(statsData.data);
      setStatsError(null);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setStatsError(err.message);
      toast.error('Failed to load stats');
    } finally {
      setIsLoadingStats(false);
    }
  }, []); // Empty dependency array since it doesn't use any props or state

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    fetchData();
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-50 text-green-600';
    if (score >= 60) return 'bg-yellow-50 text-yellow-600';
    return 'bg-red-50 text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{user?.name}</span>
          </h1>
          <p className="mt-2 text-gray-400">Ready for your next debate practice?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Practice Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 h-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-700/50">
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Start Practicing</h2>
                  <span className="px-4 py-2 bg-primary-500/20 text-white rounded-full text-sm font-medium 
                                 border border-primary-500/30 backdrop-blur-sm">
                    AI Powered
                  </span>
                </div>
                <p className="text-gray-400 mb-8 flex-1">
                  Enhance your debating skills with our AI-powered practice sessions. 
                  Choose your topic and start debating instantly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/practice/setup')}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 
                           hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl 
                           shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 
                           transition-all duration-300 text-lg font-medium"
                >
                  Start New Debate
                </motion.button>
              </div>
              <div className="px-8 py-4 bg-gray-800/50 border-t border-gray-700/50">
                <div className="flex items-center text-sm text-gray-400">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  Average session: 15-20 minutes
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-8 h-full flex flex-col border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Your Stats</h2>
                {isLoadingStats ? (
                  <div className="text-sm text-gray-400">Loading...</div>
                ) : (
                  <div className="p-2 rounded-lg bg-primary-500/20 border border-primary-500/30 backdrop-blur-sm">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              {statsError ? (
                <div className="text-center py-4 flex-1 flex items-center justify-center">
                  <div>
                    <p className="text-red-400 text-sm">{statsError}</p>
                    <button 
                      onClick={handleRetry}
                      className="mt-2 text-primary-400 hover:text-primary-300 text-sm"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 flex-1 flex flex-col justify-center">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Total Debates</div>
                    <div className="text-3xl font-bold text-white">
                      {isLoadingStats ? (
                        <div className="animate-pulse bg-gray-700 h-8 w-16 rounded" />
                      ) : (
                        stats?.totalDebates || 0
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Practice Hours</div>
                    <div className="text-3xl font-bold text-white">
                      {isLoadingStats ? (
                        <div className="animate-pulse bg-gray-700 h-8 w-16 rounded" />
                      ) : (
                        stats?.practiceHours || 0
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Average Score</div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                      {isLoadingStats ? (
                        <div className="animate-pulse bg-gray-700 h-8 w-16 rounded" />
                      ) : (
                        stats?.averageScore || 0
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Debates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-gray-700/50">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Recent Debates</h2>
                  {isLoadingDebates && (
                    <div className="text-sm text-gray-400">Loading...</div>
                  )}
                </div>

                {debatesError ? (
                  <div className="text-center py-8">
                    <p className="text-red-400">{debatesError}</p>
                    <button 
                      onClick={handleRetry}
                      className="mt-4 text-primary-400 hover:text-primary-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700/50">
                    {recentDebates.length === 0 && !isLoadingDebates ? (
                      <div className="text-center py-8 text-gray-400">
                        No debates yet. Start your first debate now!
                      </div>
                    ) : (
                      recentDebates.map((debate) => (
                        <motion.div
                          key={debate._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-4 first:pt-0 last:pb-0"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <h3 className="text-lg font-medium text-white hover:text-primary-400 cursor-pointer"
                                  onClick={() => navigate(`/debates/${debate._id}`)}>
                                {debate.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm text-gray-400">
                                  {formatDate(debate.createdAt)}
                                </p>
                                <span className="text-sm text-gray-300 px-2 py-1 bg-gray-700/50 rounded-full">
                                  {debate.topic}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                getScoreColor(debate.score)
                              }`}>
                                Score: {debate.score}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                debate.status === 'completed' 
                                  ? 'bg-blue-500/10 text-blue-400' 
                                  : 'bg-orange-500/10 text-orange-400'
                              }`}>
                                {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 