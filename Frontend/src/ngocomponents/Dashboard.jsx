import React, { useState, useEffect } from 'react';
import { FaBuilding, FaClipboardCheck, FaChartLine, FaDollarSign, FaFileAlt, FaPlus, FaBell, FaCalendar, FaUsers } from 'react-icons/fa';
import { ngoAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { USER_ROLES } from '../constants';
import toast from 'react-hot-toast';

const NGODashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [fundingStatus, setFundingStatus] = useState(null);
  const [reports, setReports] = useState([]);
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

      console.log('NGODashboard - Fetching data for user:', user);

      // Fetch all data in parallel
      const [dashboard, projectsData, funding, reportsData] = await Promise.all([
        ngoAPI.getDashboard(user._id),
        ngoAPI.getProjects(),
        ngoAPI.getFundingStatus(),
        ngoAPI.getReports()
      ]);

      console.log('NGODashboard - Data received:', { dashboard, projectsData, funding, reportsData });

      setDashboardData(dashboard);
      setProjects(projectsData.projects || []);
      setFundingStatus(funding);
      setReports(reportsData.reports || []);
    } catch (error) {
      console.error('NGODashboard - Error fetching data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      await ngoAPI.createProject(projectData);
      toast.success('Project created successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      await ngoAPI.updateProject(projectId, projectData);
      toast.success('Project updated successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ngoAPI.deleteProject(projectId);
        toast.success('Project deleted successfully!');
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const handleSubmitFundingRequest = async (fundingData) => {
    try {
      await ngoAPI.submitFundingRequest(fundingData);
      toast.success('Funding request submitted successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error submitting funding request:', error);
      toast.error('Failed to submit funding request');
    }
  };

  const summaryCards = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: <FaClipboardCheck className="text-blue-600 text-4xl" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Projects',
      value: projects.filter(project => project.status === 'active').length,
      icon: <FaBuilding className="text-green-600 text-4xl" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Funding',
      value: `$${fundingStatus?.totalFunding || 0}`,
      icon: <FaDollarSign className="text-purple-600 text-4xl" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Reports',
      value: reports.filter(report => report.status === 'pending').length,
      icon: <FaFileAlt className="text-orange-500 text-4xl" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
  ];

  if (loading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
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
        <h1 className="text-3xl font-semibold">NGO Partner Dashboard</h1>
        <button 
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2"
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
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('funding')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'funding'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Funding
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports ({reports.length})
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
                    <FaCalendar className="text-yellow-600" />
                    Recent Activity
                  </h3>
                  {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                          <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
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
                    <FaUsers className="text-green-600" />
                    Team Members
                  </h3>
                  {dashboardData?.teamMembers && dashboardData.teamMembers.length > 0 ? (
                    <div className="space-y-2">
                      {dashboardData.teamMembers.map((member, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No team members</p>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              {dashboardData?.performanceMetrics && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.performanceMetrics.projectSuccessRate || 0}%</p>
                      <p className="text-sm text-gray-500">Project Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dashboardData.performanceMetrics.fundingUtilization || 0}%</p>
                      <p className="text-sm text-gray-500">Funding Utilization</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{dashboardData.performanceMetrics.beneficiariesReached || 0}</p>
                      <p className="text-sm text-gray-500">Beneficiaries Reached</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Projects</h3>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2">
                  <FaPlus className="text-sm" />
                  Create Project
                </button>
              </div>
              
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-gray-500 text-sm">{project.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">${project.budget || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-600 h-2 rounded-full" 
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{project.progress || 0}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateProject(project._id, { ...project, status: 'active' })}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Edit Project
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaClipboardCheck className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No projects created yet.</p>
                  <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    Create Your First Project
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="space-y-6">
              {fundingStatus && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">Total Funding</h3>
                    <p className="text-2xl font-bold text-green-600">${fundingStatus.totalFunding || 0}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Utilized Funding</h3>
                    <p className="text-2xl font-bold text-blue-600">${fundingStatus.utilizedFunding || 0}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800">Available Funding</h3>
                    <p className="text-2xl font-bold text-purple-600">${fundingStatus.availableFunding || 0}</p>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Funding Requests</h3>
                {fundingStatus?.requests && fundingStatus.requests.length > 0 ? (
                  <div className="space-y-3">
                    {fundingStatus.requests.map((request, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded">
                        <div>
                          <p className="font-medium">{request.projectName}</p>
                          <p className="text-sm text-gray-500">${request.amount} - {request.purpose}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No funding requests</p>
                )}
              </div>

              <button 
                onClick={() => handleSubmitFundingRequest({ amount: 10000, purpose: 'New Project Funding' })}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2"
              >
                <FaDollarSign />
                Submit Funding Request
              </button>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Reports</h3>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2">
                  <FaFileAlt />
                  Generate Report
                </button>
              </div>
              
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <p className="text-gray-500 text-sm">{report.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        report.status === 'submitted' ? 'bg-green-100 text-green-800' :
                        report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Generated Date</p>
                        <p className="font-medium">{new Date(report.generatedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Report Type</p>
                        <p className="font-medium">{report.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">File Size</p>
                        <p className="font-medium">{report.fileSize || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Download
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaFileAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No reports generated yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;