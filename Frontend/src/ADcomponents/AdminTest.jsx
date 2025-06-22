import React, { useState } from 'react';
import { FaUsers, FaBuilding, FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';
import { adminAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { USER_ROLES } from '../constants';
import toast from 'react-hot-toast';

const AdminTest = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const testGetAdminDashboard = async () => {
    try {
      setLoading(true);
      const user = authUtils.getUser();
      
      if (!user) {
        toast.error('No user found. Please login first.');
        return;
      }

      if (user.role !== USER_ROLES.ADMIN) {
        toast.error('Only admins can access this dashboard.');
        return;
      }

      const data = await adminAPI.getAdminDashboard(user._id);
      setDashboardData(data);
      setShowData(true);
      toast.success('Dashboard data loaded successfully!');
      
      console.log('Dashboard Data:', data);
    } catch (error) {
      console.error('Error testing admin dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const testGetAllUsers = async () => {
    try {
      setLoading(true);
      
      const [ngosData, frontlinersData] = await Promise.all([
        adminAPI.getAllNGOs(),
        adminAPI.getAllFrontliners()
      ]);

      console.log('All NGOs:', ngosData);
      console.log('All Frontliners:', frontlinersData);
      
      toast.success(`Found ${ngosData.ngos?.length || 0} NGOs and ${frontlinersData.frontliners?.length || 0} Frontliners`);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const currentUser = authUtils.getUser();

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard Test</h1>
        
        {/* Current User Info */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Current User</h2>
          {currentUser ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <p className="font-medium">{currentUser.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium">{currentUser.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Role:</span>
                <p className={`font-medium px-2 py-1 rounded text-xs ${
                  currentUser.role === USER_ROLES.ADMIN 
                    ? 'bg-purple-100 text-purple-800' 
                    : currentUser.role === USER_ROLES.PARTNER_NGO
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentUser.role}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">No user logged in</p>
          )}
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={testGetAdminDashboard}
            disabled={loading || !currentUser || currentUser.role !== USER_ROLES.ADMIN}
            className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaUsers />
            Test Get Admin Dashboard
          </button>
          
          <button
            onClick={testGetAllUsers}
            disabled={loading || !currentUser || currentUser.role !== USER_ROLES.ADMIN}
            className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaUserTie />
            Test Get All Users
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {/* Dashboard Data Display */}
        {dashboardData && showData && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Dashboard Data</h2>
              <button
                onClick={() => setShowData(!showData)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {showData ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {showData && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">Total Users</h3>
                    <p className="text-2xl font-bold text-blue-600">{dashboardData.stats?.totalUsers || 0}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800">NGO Partners</h3>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.stats?.ngoCount || 0}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-800">Frontliners</h3>
                    <p className="text-2xl font-bold text-purple-600">{dashboardData.stats?.frontlinerCount || 0}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-medium text-orange-800">Active Projects</h3>
                    <p className="text-2xl font-bold text-orange-600">{dashboardData.stats?.activeProjects || 0}</p>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent NGOs */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FaBuilding className="text-green-600" />
                      Recent NGOs ({dashboardData.recentNGOs?.length || 0})
                    </h3>
                    {dashboardData.recentNGOs && dashboardData.recentNGOs.length > 0 ? (
                      <div className="space-y-2">
                        {dashboardData.recentNGOs.map((ngo) => (
                          <div key={ngo._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{ngo.name}</p>
                              <p className="text-xs text-gray-500">{ngo.email}</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {USER_ROLES.PARTNER_NGO}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No recent NGOs</p>
                    )}
                  </div>

                  {/* Recent Frontliners */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FaUserTie className="text-blue-600" />
                      Recent Frontliners ({dashboardData.recentFrontliners?.length || 0})
                    </h3>
                    {dashboardData.recentFrontliners && dashboardData.recentFrontliners.length > 0 ? (
                      <div className="space-y-2">
                        {dashboardData.recentFrontliners.map((frontliner) => (
                          <div key={frontliner._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{frontliner.name}</p>
                              <p className="text-xs text-gray-500">{frontliner.email}</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {USER_ROLES.FRONTLINER}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No recent frontliners</p>
                    )}
                  </div>
                </div>

                {/* Admin Settings */}
                {dashboardData.adminSettings && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Admin Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Project Notifications</span>
                        <span className="font-medium">{dashboardData.adminSettings.projectNotificationCount || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Notifications Enabled</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          dashboardData.adminSettings.notificationsEnabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {dashboardData.adminSettings.notificationsEnabled ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Raw Data */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Raw API Response</h3>
                  <pre className="text-xs overflow-auto bg-white p-2 rounded border">
                    {JSON.stringify(dashboardData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTest; 