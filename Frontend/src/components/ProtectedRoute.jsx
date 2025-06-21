import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
        withCredentials: true
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 