import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import QuickActions from '../components/dashboard/QuickActions';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <WelcomeCard user={user} />
          <QuickActions />
          <AnalyticsSection userId={user.id} />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard; 