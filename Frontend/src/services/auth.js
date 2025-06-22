import { USER_ROLES, ROUTES, STORAGE_KEYS } from '../constants';

// Authentication utility functions
export const authUtils = {
  // Store user data in localStorage
  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, user.role);
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
  },

  // Get user data from localStorage
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  // Get user role from localStorage
  getUserRole: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
  },

  // Clear user data from localStorage
  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
  },

  // Check if user has specific role
  hasRole: (role) => {
    const userRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return userRole === role;
  },

  // Check if user is admin
  isAdmin: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE) === USER_ROLES.ADMIN;
  },

  // Check if user is NGO partner
  isNGO: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE) === USER_ROLES.PARTNER_NGO;
  },

  // Check if user is frontliner
  isFrontliner: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE) === USER_ROLES.FRONTLINER;
  },

  // Get route based on user role
  getRouteByRole: (role) => {
    switch (role) {
      case USER_ROLES.PARTNER_NGO:
        return ROUTES.NGO_DASHBOARD;
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN_DASHBOARD;
      case USER_ROLES.FRONTLINER:
        return ROUTES.FRONTLINER_DASHBOARD;
      default:
        return ROUTES.NGO_DASHBOARD;
    }
  },

  // Get current user's dashboard route
  getCurrentUserRoute: () => {
    const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return authUtils.getRouteByRole(role);
  }
};

export default authUtils; 