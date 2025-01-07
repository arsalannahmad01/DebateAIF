import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';
import NavLink from '../common/NavLink';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = (type) => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate(`/auth?tab=${type}`);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300`}
    >
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg' 
            : 'bg-white/70 backdrop-blur-sm'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo />
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {['About', 'Features', 'Contact'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="relative"
              >
                <NavLink 
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300"
                >
                  {item}
                </NavLink>
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                           hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg 
                           shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 
                           transition-all duration-300"
                >
                  Dashboard
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="secondary"
                    onClick={() => handleAuth('login')}
                    className="px-6 py-2 text-gray-700 hover:text-primary-600 border border-gray-200 
                             hover:border-primary-500 bg-white/50 hover:bg-white rounded-lg 
                             transition-all duration-300"
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="primary"
                    onClick={() => handleAuth('signup')}
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                             hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg 
                             shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 
                             transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 