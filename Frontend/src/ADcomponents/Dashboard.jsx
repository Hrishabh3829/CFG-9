import React, { useState, useEffect } from 'react';
import { FaUsers, FaClipboardCheck, FaServer, FaUserShield, FaBug, FaBuilding, FaUserTie, FaChartLine, FaDollarSign, FaBell, FaCalendar, FaCog, FaChartBar, FaFileAlt, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import { adminAPI, projectAPI, taskAPI, notificationAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { USER_ROLES } from '../constants';
import toast from 'react-hot-toast';

const AdminDashboard = ({ onNavigate }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [ngos, setNgos] = useState([]);
  const [frontliners, setFrontliners] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [systemLogs, setSystemLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const user = authUtils.getUser();
      
      if (!user) {
        setError('User not found');
        return;
      }

      console.log('AdminDashboard - Fetching data for user:', user);

      // Only fetch APIs that exist in the backend
      const [dashboard, ngoData, frontlinerData] = await Promise.all([
        adminAPI.getAdminDashboard(user._id),
        adminAPI.getAllNGOs(),
        adminAPI.getAllFrontliners()
      ]);

      console.log('AdminDashboard - Data received:', { 
        dashboard, 
        ngoData, 
        frontlinerData
      });

      setDashboardData(dashboard);
      setNgos(ngoData.ngos || []);
      setFrontliners(frontlinerData.frontliners || []);
      
      // Set default values for missing APIs
      setAnalytics({
        totalProjects: 0,
        completedProjects: 0,
        activeProjects: 0,
        totalFunding: 0
      });
      setSystemLogs([]);
      setNotifications([]);
    } catch (error) {
      console.error('AdminDashboard - Error fetching data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await adminAPI.toggleUserStatus(userId, isActive);
      toast.success(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleCreateNGO = async (ngoData) => {
    try {
      await adminAPI.createNGO(ngoData);
      toast.success('NGO created successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error creating NGO:', error);
      toast.error('Failed to create NGO');
    }
  };

  const handleCreateFrontliner = async (frontlinerData) => {
    try {
      await adminAPI.createFrontliner(frontlinerData);
      toast.success('Frontliner created successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error creating frontliner:', error);
      toast.error('Failed to create frontliner');
    }
  };

  const handleMarkNotificationRead = async (notificationId) => {
    try {
      await notificationAPI.markAsRead(notificationId);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNavigateToUserManagement = () => {
    if (onNavigate) {
      onNavigate('user-management');
    }
  };

  const summaryCards = [
    {
      title: 'Total NGOs',
      value: ngos.length,
      icon: <FaBuilding className="text-blue-600 text-4xl" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Frontliners',
      value: frontliners.length,
      icon: <FaUserTie className="text-green-600 text-4xl" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Projects',
      value: dashboardData?.activeProjects || 0,
      icon: <FaClipboardCheck className="text-purple-600 text-4xl" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Funding',
      value: `$${dashboardData?.totalFunding?.toLocaleString() || 0}`,
      icon: <FaDollarSign className="text-orange-500 text-4xl" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
  ];

  if (loading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <button 
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
        >
          <FaBell className="text-sm" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 flex justify-between items-center min-h-[150px] transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{card.title}</p>
              <p className="text-4xl font-bold mt-2">{card.value}</p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-full`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('ngos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ngos'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              NGOs ({ngos.length})
            </button>
            <button
              onClick={() => setActiveTab('frontliners')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'frontliners'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Frontliners ({frontliners.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logs'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              System Logs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaCalendar className="text-red-600" />
                    Recent Activity
                  </h3>
                  {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaBell className="text-orange-500" />
                    Notifications ({notifications.length})
                  </h3>
                  {notifications.length > 0 ? (
                    <div className="space-y-2">
                      {notifications.slice(0, 5).map((notification) => (
                        <div key={notification._id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                          </div>
                          <button
                            onClick={() => handleMarkNotificationRead(notification._id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark Read
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No notifications</p>
                  )}
                </div>
              </div>

              {/* System Health */}
              {dashboardData?.systemHealth && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaCog className="text-green-600" />
                    System Health
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dashboardData.systemHealth.uptime || 0}%</p>
                      <p className="text-sm text-gray-500">System Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.systemHealth.activeUsers || 0}</p>
                      <p className="text-sm text-gray-500">Active Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{dashboardData.systemHealth.totalProjects || 0}</p>
                      <p className="text-sm text-gray-500">Total Projects</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ngos' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Partner NGOs</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
                  <FaPlus className="text-sm" />
                  Add NGO
                </button>
              </div>
              
              {ngos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {ngos.map((ngo) => (
                        <tr key={ngo._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{ngo.name}</div>
                              <div className="text-sm text-gray-500">{ngo.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{ngo.phone}</div>
                            <div className="text-sm text-gray-500">{ngo.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 dark:text-white">{ngo.projectCount || 0} projects</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ngo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {ngo.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleToggleUserStatus(ngo._id, !ngo.isActive)}
                              className={`mr-2 px-3 py-1 rounded text-xs ${
                                ngo.isActive 
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {ngo.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaBuilding className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No NGOs registered yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'frontliners' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Frontliners</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
                  <FaPlus className="text-sm" />
                  Add Frontliner
                </button>
              </div>
              
              {frontliners.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frontliner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Projects</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {frontliners.map((frontliner) => (
                        <tr key={frontliner._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{frontliner.name}</div>
                              <div className="text-sm text-gray-500">{frontliner.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{frontliner.phone}</div>
                            <div className="text-sm text-gray-500">{frontliner.region}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 dark:text-white">{frontliner.assignedProjects || 0} projects</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              frontliner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {frontliner.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleToggleUserStatus(frontliner._id, !frontliner.isActive)}
                              className={`mr-2 px-3 py-1 rounded text-xs ${
                                frontliner.isActive 
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {frontliner.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUserTie className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No frontliners registered yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Project Analytics</h3>
                  <p className="text-2xl font-bold text-blue-600">{analytics.totalProjects || 0}</p>
                  <p className="text-sm text-blue-600">Total Projects</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">User Growth</h3>
                  <p className="text-2xl font-bold text-green-600">{analytics.userGrowth || 0}%</p>
                  <p className="text-sm text-green-600">Monthly Growth</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Funding Analytics</h3>
                  <p className="text-2xl font-bold text-purple-600">${analytics.totalFunding?.toLocaleString() || 0}</p>
                  <p className="text-sm text-purple-600">Total Funding</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FaChartBar className="text-red-600" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{analytics.projectSuccessRate || 0}%</p>
                    <p className="text-sm text-gray-500">Project Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{analytics.averageProjectDuration || 0} months</p>
                    <p className="text-sm text-gray-500">Avg Project Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{analytics.activeUsers || 0}</p>
                    <p className="text-sm text-gray-500">Active Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{analytics.fundingUtilization || 0}%</p>
                    <p className="text-sm text-gray-500">Funding Utilization</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaFileAlt className="text-red-600" />
                System Logs ({systemLogs.length})
              </h3>
              
              {systemLogs.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            log.level === 'error' ? 'bg-red-100 text-red-800' :
                            log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            log.level === 'info' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {log.level}
                          </span>
                          <span className="text-sm font-medium">{log.module}</span>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{log.message}</p>
                      {log.details && (
                        <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaFileAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No system logs available.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={handleNavigateToUserManagement}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
          >
            <FaUsers className="text-indigo-600 text-2xl mb-2" />
            <p className="font-medium">Manage Users</p>
            <p className="text-sm text-gray-500">View all NGOs and Frontliners</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <FaClipboardCheck className="text-green-600 text-2xl mb-2" />
            <p className="font-medium">Manage Projects</p>
            <p className="text-sm text-gray-500">View and edit projects</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <FaChartLine className="text-blue-600 text-2xl mb-2" />
            <p className="font-medium">View Reports</p>
            <p className="text-sm text-gray-500">Analytics and insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
