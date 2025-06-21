/* Updated AuthPage with CRY theme (Black & Yellow), about CRY, user role selection, back button, input validation styles, NGO name toggle, and strong password/email format validation */

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('frontliner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateStrongPassword = (password) => {
    // Minimum 8 characters, at least one letter, one number and one special character
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};

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
      newErrors.name = userType === 'ngo' ? 'NGO name is required' : 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login request
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
          email: formData.email,
          password: formData.password,
        }, {
          withCredentials: true
        });
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        alert(`Welcome back, ${res.data.user.name || formData.email}`);
        navigate('/dashboard');
      } else {
        // Signup request
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: userType,
        }, {
          withCredentials: true
        });
        
        alert(`Account created for ${res.data.user.name || formData.name} (${userType})`);
        // After successful registration, switch to login mode
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
        
        // Show verification message
        alert('Please check your email and click the verification link to activate your account before logging in.');
      }
    } catch (error) {
      // Handle backend errors
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
    setErrors({});
  };
  


  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4 py-10 relative">
      <button className="absolute left-0 top-4 p-2 text-yellow-400 hover:text-yellow-600 transition-colors" 
        onClick={() => navigate('/')}
      >
        ← Back
      </button>

      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CRY - Child Rights and You</h1>
          <p className="mt-2 text-yellow-300">
            Ensuring happier childhoods by mobilizing potential and inspiring action.
          </p>
          <h2 className="text-2xl mt-6">{isLogin ? 'Login' : 'Sign Up'} as {userType}</h2>
        </div>

        {!isLogin && (
          <div className="flex justify-around">
            <button
              onClick={() => setUserType('frontliner')}
              className={`px-4 py-2 rounded ${userType === 'frontliner' ? 'bg-yellow-500 text-black' : 'bg-yellow-700 text-white'}`}
            >
              Frontliner Signup
            </button>
            <button
              onClick={() => setUserType('ngo')}
              className={`px-4 py-2 rounded ${userType === 'ngo' ? 'bg-yellow-500 text-black' : 'bg-yellow-700 text-white'}`}
            >
              NGO Signup
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-yellow-100 text-black p-6 rounded-xl space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1">{userType === 'ngo' ? 'NGO Name' : 'Full Name'}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                placeholder={userType === 'ngo' ? 'Name of NGO' : 'Your Full Name'}
                required
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
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm mt-1 text-yellow-700">
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
                required
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-sm mt-1 text-yellow-700">
                {showConfirmPassword ? 'Hide' : 'Show'} Confirm Password
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 bg-black text-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={toggleAuthMode} className="underline text-yellow-400 hover:text-yellow-600">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
