import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Logo from '../components/common/Logo';
import { useGoogleLogin } from '@react-oauth/google';
import SEO from '../components/common/SEO';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = async (userData) => {
    login(userData);
    toast.success('Welcome to DebateAI!');
    navigate('/dashboard');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
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
        toast.error('Failed to sign in with Google');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      toast.error('Google authentication failed. Please try again.');
    }
  });

  return (
    <>
      <SEO 
        title="Sign In"
        description="Sign in or create an account to start practicing debates with AI."
        keywords={[
          'sign in',
          'login',
          'create account',
          'register',
          'authentication'
        ]}
      />
      <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
        {/* Header with Logo */}
        <header className="w-full py-6 px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Logo />
          </div>
        </header>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full 
                       bg-gradient-to-b from-primary-500/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full 
                       bg-gradient-to-t from-secondary-500/30 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                       bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur-3xl" />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Auth Card */}
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 
                         overflow-hidden relative">
              {/* Card gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-transparent" />

              {/* Card Content */}
              <div className="relative p-8 sm:p-10">
                {/* Floating Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />

                {/* Header */}
                <div className="text-center relative">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <SparklesIcon className="w-16 h-16 mx-auto text-primary-400" />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-3"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r 
                                 from-primary-400 via-primary-200 to-secondary-400">
                      Welcome to DebateAI
                    </span>
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-lg"
                  >
                    Start your debate journey today
                  </motion.p>
                </div>

                {/* Google Sign In Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => googleLogin()}
                    disabled={isLoading}
                    className="relative w-full py-4 px-6 rounded-xl text-white font-medium text-lg
                             bg-gradient-to-r from-primary-500 to-secondary-500 
                             hover:from-primary-600 hover:to-secondary-600 
                             focus:outline-none focus:ring-2 focus:ring-primary-500/50 
                             shadow-lg shadow-primary-500/25 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             overflow-hidden group transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-3">
                      {!isLoading && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      {isLoading ? 'Please wait...' : 'Continue with Google'}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center text-sm text-gray-400"
                >
                  By continuing, you agree to our{' '}
                  <a href="/terms" className="text-primary-400 hover:text-primary-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary-400 hover:text-primary-300">
                    Privacy Policy
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Auth; 