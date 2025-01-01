import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      setIsScrolled(window.scrollY > 0);
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button 
                variant="primary"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  onClick={() => handleAuth('login')}
                >
                  Login
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => handleAuth('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 