import React, { useState, useEffect } from 'react';
import { FaClipboardCheck, FaUserTie, FaChartLine, FaTasks, FaProjectDiagram, FaBell, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { frontlinerAPI } from '../services/api';
import { authUtils } from '../services/auth';
import { USER_ROLES } from '../constants';
import toast from 'react-hot-toast';

const FrontlinerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
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

      console.log('FrontlinerDashboard - Fetching data for user:', user);

      // Fetch all data in parallel
      const [dashboard, projects, tasksData] = await Promise.all([
        frontlinerAPI.getDashboard(user._id),
        frontlinerAPI.getAssignedProjects(),
        frontlinerAPI.getTasks()
      ]);

      console.log('FrontlinerDashboard - Data received:', { dashboard, projects, tasksData });

      setDashboardData(dashboard);
      setAssignedProjects(projects.projects || []);
      setTasks(tasksData.tasks || []);
    } catch (error) {
      console.error('FrontlinerDashboard - Error fetching data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await frontlinerAPI.updateTaskStatus(taskId, newStatus);
      toast.success('Task status updated successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
    }
  };

  const handleUpdateProjectProgress = async (projectId, progressData) => {
    try {
      await frontlinerAPI.updateProjectProgress(projectId, progressData);
      toast.success('Project progress updated successfully!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating project progress:', error);
      toast.error('Failed to update project progress');
    }
  };

  const summaryCards = [
    {
      title: 'Assigned Projects',
      value: assignedProjects.length,
      icon: <FaProjectDiagram className="text-blue-600 text-4xl" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Tasks',
      value: tasks.filter(task => task.status === 'active').length,
      icon: <FaTasks className="text-green-600 text-4xl" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Completed Tasks',
      value: tasks.filter(task => task.status === 'completed').length,
      icon: <FaClipboardCheck className="text-purple-600 text-4xl" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Reports',
      value: dashboardData?.pendingReports || 0,
      icon: <FaChartLine className="text-orange-500 text-4xl" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
  ];

  if (loading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <h1 className="text-3xl font-semibold">Frontliner Dashboard</h1>
        <button 
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
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
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assigned Projects ({assignedProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks ({tasks.length})
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
                    <FaCalendar className="text-blue-600" />
                    Recent Activity
                  </h3>
                  {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
                    <FaMapMarkerAlt className="text-green-600" />
                    Assigned Regions
                  </h3>
                  {dashboardData?.assignedRegions && dashboardData.assignedRegions.length > 0 ? (
                    <div className="space-y-2">
                      {dashboardData.assignedRegions.map((region, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                          <span className="font-medium">{region.name}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {region.projectCount} projects
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No regions assigned</p>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              {dashboardData?.performanceMetrics && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.performanceMetrics.completionRate || 0}%</p>
                      <p className="text-sm text-gray-500">Completion Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dashboardData.performanceMetrics.averageRating || 0}/5</p>
                      <p className="text-sm text-gray-500">Average Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{dashboardData.performanceMetrics.totalHours || 0}</p>
                      <p className="text-sm text-gray-500">Total Hours</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              {assignedProjects.length > 0 ? (
                assignedProjects.map((project) => (
                  <div key={project._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-gray-500 text-sm">{project.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{project.progress || 0}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateProjectProgress(project._id, { progress: project.progress + 10 })}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Update Progress
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        Submit Report
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaProjectDiagram className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No projects assigned yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded border ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Priority</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Project</p>
                        <p className="font-medium">{task.projectName || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaTasks className="text-gray-400 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500">No tasks assigned yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontlinerDashboard;
