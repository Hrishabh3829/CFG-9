import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authUtils } from '../services/auth';
import { USER_ROLES, ROUTES } from '../constants';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  console.log('ProtectedRoute rendered:', {
    requiredRole,
    pathname: location.pathname,
    isAuthenticated,
    userRole
  });

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authUtils.isAuthenticated();
      const role = authUtils.getUserRole();
      const user = authUtils.getUser();
      
      console.log('ProtectedRoute - Auth check:', {
        authenticated,
        role,
        user,
        requiredRole,
        location: location.pathname
      });
      
      setIsAuthenticated(authenticated);
      setUserRole(role);
    };

    checkAuth();
  }, [location, requiredRole]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    console.log('ProtectedRoute - Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If role is required and user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    console.log('ProtectedRoute - Role mismatch:', { userRole, requiredRole });
    const user = authUtils.getUser();
    if (user && user.role) {
      const route = authUtils.getRouteByRole(user.role);
      console.log('ProtectedRoute - Redirecting to:', route);
      return <Navigate to={route} replace />;
    }
    console.log('ProtectedRoute - No user role found, redirecting to login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  console.log('ProtectedRoute - Rendering children');
  return children;
};

export default ProtectedRoute; 