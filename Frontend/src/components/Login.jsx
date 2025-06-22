import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { USER_ROLES, USER_TYPES, ROUTES, ERROR_MESSAGES } from '../constants';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('frontliner');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateStrongPassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Map frontend user types to backend roles
  const mapUserTypeToRole = (userType) => {
    switch (userType) {
      case USER_TYPES.NGO:
        return USER_ROLES.PARTNER_NGO;
      case USER_TYPES.ADMIN:
        return USER_ROLES.ADMIN;
      case USER_TYPES.FRONTLINER:
        return USER_ROLES.FRONTLINER;
      default:
        return USER_ROLES.FRONTLINER;
    }
  };

  // Map backend roles to frontend routes
  const mapRoleToRoute = (role) => {
    switch (role) {
      case USER_ROLES.PARTNER_NGO:
        return ROUTES.DASHBOARD;
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN_DASHBOARD;
      case USER_ROLES.FRONTLINER:
        return ROUTES.FRONTLINER_DASHBOARD;
      default:
        return ROUTES.DASHBOARD;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const newErrors = {};

    // Validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validateStrongPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include a letter, number and special character';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        console.log('Attempting login with:', { email: formData.email, password: formData.password });
        const data = await userAPI.login(formData.email, formData.password);
        
        console.log('Login response:', data);
        
        // Store user data using auth utils
        if (data.user) {
          console.log('Storing user data:', data.user);
          authUtils.setUser(data.user);
        }
        
        // Navigate based on user role
        if (data.user && data.user.role) {
          const route = authUtils.getRouteByRole(data.user.role);
          console.log('Navigating to route:', route, 'for role:', data.user.role);
          navigate(route);
        } else {
          // Fallback based on selected user type
          const route = authUtils.getRouteByRole(mapUserTypeToRole(userType));
          console.log('Fallback navigation to route:', route);
          navigate(route);
        }
      } else {
        // Register
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: mapUserTypeToRole(userType),
          ...(userType === USER_TYPES.NGO && {
            ngoInfo: {
              name: formData.name,
              address: '',
              registrationNumber: '',
              contactPerson: formData.name,
              phoneNumber: ''
            }
          })
        };

        const data = await userAPI.register(userData);
        
        // Store user data using auth utils
        if (data.user) {
          authUtils.setUser(data.user);
        }
        
        // Navigate based on user role
        if (data.user && data.user.role) {
          const route = authUtils.getRouteByRole(data.user.role);
          navigate(route);
        } else {
          // Fallback based on selected user type
          const route = authUtils.getRouteByRole(mapUserTypeToRole(userType));
          navigate(route);
        }
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('already exists')) {
          setErrors({ email: ERROR_MESSAGES.USER_EXISTS });
        } else if (errorMessage.includes('Invalid credentials')) {
          setErrors({ email: ERROR_MESSAGES.INVALID_CREDENTIALS });
        } else {
          toast.error(errorMessage);
        }
      } else if (error.response?.status === 401) {
        setErrors({ email: ERROR_MESSAGES.INVALID_CREDENTIALS });
      } else if (error.response?.status === 500) {
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
      } else {
        toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
    setErrors({});
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4 py-10 relative">
      <button
        className="absolute left-0 top-4 p-2 text-yellow-400 hover:text-yellow-600 transition-colors"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>

      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl mt-6">{isLogin ? 'Login' : 'Sign Up'} as {userType}</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-yellow-100 text-black p-6 rounded-xl space-y-4">

          {/* Dropdown role selector */}
          <div>
            <label className="block mb-1">Select Role</label>
            <select
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full p-2 border rounded"
              disabled={isLoading}
            >
              <option value={USER_TYPES.FRONTLINER}>Frontliner</option>
              <option value={USER_TYPES.NGO}>NGO Partner</option>
              <option value={USER_TYPES.ADMIN}>Admin</option>
            </select>
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1">{userType === USER_TYPES.NGO ? 'NGO Name' : 'Full Name'}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                placeholder={userType === USER_TYPES.NGO ? 'Name of NGO' : 'Your Full Name'}
                required
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
              placeholder="email@example.com"
              required
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded pr-10 ${errors.password ? 'border-red-500' : ''}`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-black text-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                Processing...
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={toggleAuthMode} 
              className="underline text-yellow-400 hover:text-yellow-600"
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
