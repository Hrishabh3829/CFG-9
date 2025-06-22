import React, { useState } from 'react';
import { FaBell, FaUserShield } from 'react-icons/fa';

const AdminNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-yellow-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center">
        <span className="mr-6 hidden sm:inline text-yellow-300">admin@example.com</span>
        <span className="mr-4 hidden sm:inline bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">ADMIN</span>

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
              <ul>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">New User Signup</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Security Alert</li>
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
              <ul>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Admin Profile</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">User Management</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">System Settings</li>
                <li className="px-4 py-2 hover:bg-yellow-100/10 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
