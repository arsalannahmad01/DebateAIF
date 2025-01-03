import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('tab') === 'signup';

  const handleAuthSuccess = async (userData) => {
    await login(userData);
    navigate('/dashboard');
    toast.success(`Successfully ${isSignUp ? 'signed up' : 'signed in'}!`);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        const userData = await userInfo.json();

        const result = await authService.googleAuth({
          accessToken: response.access_token,
          userData: {
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            sub: userData.sub
          }
        });

        await handleAuthSuccess(result.user);
      } catch (error) {
        toast.error(`Failed to ${isSignUp ? 'sign up' : 'sign in'} with Google`);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      toast.error('Google authentication failed. Please try again.');
    }
  });

  return (
    <div className="pt-16 min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Hero/Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-600 p-8 flex items-center justify-center">
        <div className="max-w-md text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Welcome to DebateAI
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Enhance your debating skills with AI-powered practice sessions
            </p>
            
            {/* Feature List */}
            <ul className="space-y-4">
              {[
                'Practice with intelligent AI opponents',
                'Get instant feedback on your arguments',
                'Access diverse debate topics',
                'Track your improvement over time'
              ].map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="flex items-center space-x-2 text-white/90"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Sign In/Sign Up */}
      <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isSignUp 
                ? 'Join our community of debaters today'
                : 'Continue your journey to mastering debate'
              }
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={() => googleLogin()}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-primary-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">
                {loading ? 'Please wait...' : `Continue with Google`}
              </span>
            </Button>

            {/* Terms and Privacy Notice */}
            <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
              By {isSignUp ? 'signing up' : 'signing in'}, you agree to our{' '}
              <Link 
                to="/terms" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Terms
              </Link>
              {' '}and{' '}
              <Link 
                to="/privacy-policy" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Help Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Need help?{' '}
                <Link 
                  to="/contact" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Contact us
                </Link>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth; 