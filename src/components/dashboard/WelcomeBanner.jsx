import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const WelcomeBanner = () => {
  const { user } = useAuth();

  // Get the time of day for personalized greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get first name from full name
  const firstName = user?.name?.split(' ')[0] || 'Debater';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-xl overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <svg 
            className="h-full w-full text-white/5" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <polygon points="0,0 100,0 100,100" />
          </svg>
        </div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-8 right-8 w-24 h-24 bg-secondary-400/20 rounded-full blur-xl" />
      </div>

      {/* Content */}
      <div className="relative px-8 py-12">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              {getTimeBasedGreeting()}, {firstName}!
            </h1>
          </div>
          
          <div className="ml-16">
            <p className="text-primary-100 text-lg max-w-2xl">
              Welcome to your debate dashboard. Track your progress, explore trending topics, 
              and improve your debating skills through practice sessions.
            </p>
            
            <div className="mt-6 flex items-center space-x-6 text-primary-100">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
                <span>Quick actions below</span>
              </div>
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>Your progress tracked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner; 