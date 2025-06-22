import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { ROUTES } from '../constants';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authUtils.getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      authUtils.clearUser();
      toast.success('Logged out successfully!');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user data even if API call fails
      authUtils.clearUser();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-yellow-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center">
        <span className="mr-6 hidden sm:inline">{user?.email || 'user@example.com'}</span>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 hover:bg-yellow-100/10 rounded-full"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
          >
            <FaBell className="text-yellow-400 text-lg" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-black text-white border border-yellow-400 rounded shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">New Task Assigned</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Project Update</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Deadline Reminder</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-4">
          <button
            className="p-2 hover:bg-yellow-100/10 rounded-full"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
          >
            <FaUserCircle className="text-yellow-400 text-xl" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-black text-white border border-yellow-400 rounded shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">My Account</li>
                <li 
                  className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
