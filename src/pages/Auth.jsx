import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '../components/common/Button';
import { GoogleIcon } from '../components/common/Icons';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const DecorativeBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Gradient Mesh */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-70" />
    
    {/* Animated Circles */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-secondary-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-primary-100/30 rounded-full mix-blend-multiply filter blur-xl animate-float" />
    </div>

    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvZz48L3N2Zz4=')] opacity-[0.03]" />

    {/* Decorative Shapes */}
    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-200 rounded-lg rotate-45 animate-pulse" />
    <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-secondary-200 rounded-full animate-pulse" />
    <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-primary-100 rounded-full animate-bounce" />
    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border-2 border-secondary-100 rotate-45 animate-bounce" />
  </div>
);

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const location = useLocation();
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'signup' || tab === 'login') {
      setActiveTab(tab);
    }
  }, [location]);

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (activeTab === 'signup' && !formData.name) {
      errors.name = 'Name is required';
    }
    return errors;
  };

  const handleAuthSuccess = async (userData) => {
    await login(userData);
    toast.success('Successfully authenticated!');
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      let response;
      if (activeTab === 'login') {
        response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      await handleAuthSuccess(response.user);
    } catch (error) {
      toast.error(error.message);
      setFormErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
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
        toast.error('Failed to authenticate with Google');
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      toast.error('Google login failed. Please try again.');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <DecorativeBackground />
      
      {/* Content Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side - Welcome Message */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block w-1/2 pr-12"
        >
          <h1 className="text-5xl font-bold mb-6">
            Welcome to{' '}
            <span className="gradient-text">DebateAI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of debaters and enhance your skills with AI-powered practice and real-time feedback.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold gradient-text mb-1">10k+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold gradient-text mb-1">50k+</div>
              <div className="text-gray-600">Debates Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
          >
            {/* Logo and Decorative Element */}
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg rotate-12" />
              <div className="relative">
                <h2 className="text-3xl font-bold gradient-text">
                  DebateAI
                </h2>
                <p className="mt-2 text-gray-600">
                  {activeTab === 'login' ? 'Welcome back!' : 'Create your account'}
                </p>
              </div>
            </div>

            {/* Tabs with Animation */}
            <div className="flex border-b border-gray-200 relative">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-center relative ${
                  activeTab === 'login'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
                {activeTab === 'login' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 text-center relative ${
                  activeTab === 'signup'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600"
                  />
                )}
              </button>
            </div>

            {/* Form with Error Handling */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {formErrors.submit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 text-red-500 p-3 rounded-lg text-sm"
                  >
                    {formErrors.submit}
                  </motion.div>
                )}
              </AnimatePresence>

              {activeTab === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFormErrors({ ...formErrors, name: null });
                    }}
                    className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setFormErrors({ ...formErrors, email: null });
                  }}
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setFormErrors({ ...formErrors, password: null });
                  }}
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-base font-medium rounded-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Loading...
                  </div>
                ) : (
                  activeTab === 'login' ? 'Login' : 'Sign Up'
                )}
              </Button>
            </form>

            {/* Enhanced Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-1 bg-white/80 text-gray-500 rounded-full border border-gray-200">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={() => googleLogin()}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Continue with Google
            </button>

            {/* Additional Links */}
            <div className="text-center text-sm">
              <a href="#" className="text-primary-600 hover:text-primary-700">
                {activeTab === 'login' ? 'Forgot your password?' : 'Already have an account?'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 