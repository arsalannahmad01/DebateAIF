import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Topics from './pages/Topics';
import Analytics from './pages/Analytics';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DebateSetup from './components/practice/DebateSetup';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { useEffect } from 'react';
import { initializeGA, pageView } from './utils/analytics';

// Create a wrapper component that uses Router hooks
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    pageView(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/setup"
          element={
            <ProtectedRoute>
              <DebateSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topics/*"
          element={
            <ProtectedRoute>
              <Topics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error('Missing REACT_APP_GOOGLE_CLIENT_ID environment variable');
    return <div>Configuration Error</div>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
