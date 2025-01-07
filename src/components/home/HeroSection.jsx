import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/practice/setup');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-primary-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-secondary-500/20 to-primary-500/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold leading-tight text-white"
            >
              Master the Art of 
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                Debate with AI
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Elevate your persuasion skills through interactive AI-powered debates. 
              Practice anytime, get instant feedback, and track your progress.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button 
                variant="primary"
                onClick={handleGetStarted}
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
              >
                Start Debating Free
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/about')}
                className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-0"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl font-bold text-white">40+</div>
                <div className="text-gray-400">Topics</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400">Availability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-gray-400">Free</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 3D Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative lg:h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://img.freepik.com/free-photo/man-hanging-out-with-robot_23-2151112226.jpg"
                alt="AI Debate"
                className="rounded-2xl shadow-2xl shadow-primary-500/20 object-cover w-full h-full"
              />
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-xl backdrop-blur-xl transform rotate-12 animate-float" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-secondary-500/30 to-primary-500/30 rounded-xl backdrop-blur-xl transform -rotate-12 animate-float-delayed" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 