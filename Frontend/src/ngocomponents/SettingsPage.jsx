import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';

const SettingsPage = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    name: "NGO Admin",
    email: "admin@ngo.org",
    organization: "Global Impact Foundation",
    phone: "+1 234 567 8900"
  });

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-yellow-400">Manage your profile and account settings</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-yellow-400 text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-yellow-400 text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-yellow-400 text-sm font-medium mb-2">Organization</label>
              <input 
                type="text" 
                value={profile.organization}
                onChange={(e) => setProfile({...profile, organization: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-yellow-400 text-sm font-medium mb-2">Phone</label>
              <input 
                type="tel" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>
          
          <button 
            onClick={handleSaveProfile}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Actions</h2>
          <button 
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;