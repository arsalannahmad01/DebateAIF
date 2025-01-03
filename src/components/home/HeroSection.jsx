import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

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
    <section className="min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="gradient-text">Elevate Your Debating</span>
              <br />
              Skills with AI
            </h1>
            <p className="text-xl text-gray-600">
              Master persuasion, logic, and delivery with real-time feedback. 
              Engage in meaningful debates and enhance your critical thinking abilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary"
                onClick={handleGetStarted}
              >
                Get Started Free
              </Button>
              {/* <Button variant="secondary">
                Learn More
              </Button> */}
            </div>
            {/* <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10k+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50k+</div>
                <div className="text-gray-600">Debates Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div> */}
          </div>

          {/* Right Column - Illustration */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 rounded-3xl">
              {/* We'll add illustration/image here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400">Illustration Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 