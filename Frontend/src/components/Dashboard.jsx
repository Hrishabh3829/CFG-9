import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
        withCredentials: true
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true
      });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'frontliner':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-100 text-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Frontliner Dashboard</h3>
              <p>Welcome, {user.name}! As a frontliner, you can:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Report child rights violations</li>
                <li>Track your reports</li>
                <li>Connect with NGOs</li>
                <li>Access resources and training</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">Quick Actions</h4>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Report Incident
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  View My Reports
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded hover:bg-yellow-500 hover:text-black transition">
                  Training Resources
                </button>
              </div>
              
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">Recent Activity</h4>
                <p className="text-sm text-gray-600">No recent activity</p>
              </div>
            </div>
          </div>
        );

      case 'ngo':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-100 text-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">NGO Dashboard</h3>
              <p>Welcome, {user.name}! As an NGO, you can:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Review and respond to reports</li>
                <li>Manage your organization profile</li>
                <li>Coordinate with frontliners</li>
                <li>Access funding opportunities</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">Organization Management</h4>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Update Profile
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  View Reports
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded hover:bg-yellow-500 hover:text-black transition">
                  Funding Opportunities
                </button>
              </div>
              
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">Recent Reports</h4>
                <p className="text-sm text-gray-600">No pending reports</p>
              </div>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-100 text-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Admin Dashboard</h3>
              <p>Welcome, {user.name}! As an admin, you can:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Manage all users and organizations</li>
                <li>Review and approve reports</li>
                <li>Monitor system analytics</li>
                <li>Configure system settings</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">User Management</h4>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  View All Users
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Approve Registrations
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded hover:bg-yellow-500 hover:text-black transition">
                  Manage Roles
                </button>
              </div>
              
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">Reports</h4>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  View All Reports
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Analytics
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded hover:bg-yellow-500 hover:text-black transition">
                  Export Data
                </button>
              </div>
              
              <div className="bg-yellow-100 text-black p-6 rounded-xl">
                <h4 className="font-bold mb-2">System</h4>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Settings
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded mb-2 hover:bg-yellow-500 hover:text-black transition">
                  Logs
                </button>
                <button className="w-full bg-black text-yellow-400 p-2 rounded hover:bg-yellow-500 hover:text-black transition">
                  Backup
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-yellow-100 text-black p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Dashboard</h3>
            <p>Welcome, {user.name}!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">CRY Dashboard</h1>
            <p className="text-yellow-300">Child Rights and You</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-yellow-300">Welcome, {user.name}</span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm capitalize">
              {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard; 