import React, { useState } from 'react';
import { FaBell, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import { authUtils } from '../services/auth';
import { userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const AdminNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  
  const currentUser = authUtils.getUser();

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      authUtils.clearUser();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API fails
      authUtils.clearUser();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-yellow-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-yellow-400">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center">
          <span className="mr-6 hidden sm:inline text-yellow-300">
            {currentUser?.email || 'admin@example.com'}
          </span>
          <span className="mr-4 hidden sm:inline bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            {currentUser?.role || 'ADMIN'}
          </span>

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
                2
              </span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-black text-white border border-yellow-400 rounded shadow-md">
                <div className="p-3 border-b border-yellow-400">
                  <h3 className="font-semibold text-yellow-400">Notifications</h3>
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer border-b border-gray-700">
                    <div className="text-sm">New User Signup</div>
                    <div className="text-xs text-gray-400">A new NGO has registered</div>
                  </li>
                  <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">
                    <div className="text-sm">Security Alert</div>
                    <div className="text-xs text-gray-400">System scan completed</div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Admin Profile Menu */}
          <div className="relative ml-4">
            <button
              className="p-2 hover:bg-yellow-100/10 rounded-full"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <FaUserShield className="text-yellow-400 text-xl" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black text-white border border-yellow-400 rounded shadow-md">
                <div className="p-3 border-b border-yellow-400">
                  <h3 className="font-semibold text-yellow-400">{currentUser?.name || 'Admin'}</h3>
                  <p className="text-xs text-gray-400">{currentUser?.email || 'admin@example.com'}</p>
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Admin Profile</li>
                  <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">User Management</li>
                  <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">System Settings</li>
                  <li 
                    className="px-4 py-2 hover:bg-red-600/20 cursor-pointer text-red-400 flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
