import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                }
              />
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
