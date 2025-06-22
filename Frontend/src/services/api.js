import axios from 'axios';
import toast from 'react-hot-toast';
import {
  BASE_URL,
  USER_LOGIN_ENDPOINT,
  USER_REGISTER_ENDPOINT,
  USER_LOGOUT_ENDPOINT,
  USER_PROFILE_ENDPOINT,
  ADMIN_CREATE_NGO_ENDPOINT,
  ADMIN_CREATE_FRONTLINER_ENDPOINT,
  ADMIN_GET_ALL_NGOS_ENDPOINT,
  ADMIN_GET_ALL_FRONTLINERS_ENDPOINT,
  ADMIN_UPDATE_SETTINGS_ENDPOINT,
  ADMIN_GET_DASHBOARD_ENDPOINT,
  ADMIN_TOGGLE_USER_STATUS_ENDPOINT,
  PROJECT_API_END_POINT,
  TASK_API_END_POINT,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES
} from '../constants';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
    toast.error(message);
    return Promise.reject(error);
  }
);

// User API methods
export const userAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', {
        email,
        password
      });
      
      toast.success(response.data.message || SUCCESS_MESSAGES.LOGIN_SUCCESS);
      return response.data;
    } catch (error) {
      // Error is already handled by interceptor
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      
      toast.success(response.data.message || SUCCESS_MESSAGES.REGISTER_SUCCESS);
      return response.data;
    } catch (error) {
      // Error is already handled by interceptor
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.get('/user/logout');
      
      toast.success(response.data.message || SUCCESS_MESSAGES.LOGOUT_SUCCESS);
      return response.data;
    } catch (error) {
      // Error is already handled by interceptor
      throw error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      toast.success(response.data.message || SUCCESS_MESSAGES.PROFILE_UPDATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/user/change-password', {
        currentPassword,
        newPassword
      });
      toast.success(response.data.message || 'Password changed successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Admin API methods
export const adminAPI = {
  // Create new NGO (Admin only)
  createNGO: async (ngoData) => {
    try {
      const response = await api.post('/admin/ngos', ngoData);
      toast.success(response.data.message || SUCCESS_MESSAGES.NGO_CREATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new Frontliner (Admin only)
  createFrontliner: async (frontlinerData) => {
    try {
      const response = await api.post('/admin/frontliners', frontlinerData);
      toast.success(response.data.message || SUCCESS_MESSAGES.FRONTLINER_CREATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all Partner NGOs
  getAllNGOs: async () => {
    try {
      const response = await api.get('/admin/ngos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all Frontliners
  getAllFrontliners: async () => {
    try {
      const response = await api.get('/admin/frontliners');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update admin settings
  updateAdminSettings: async (userId, settings) => {
    try {
      const response = await api.put(`/admin/settings/${userId}`, settings);
      toast.success(response.data.message || SUCCESS_MESSAGES.SETTINGS_UPDATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get admin dashboard
  getAdminDashboard: async (userId) => {
    try {
      const response = await api.get(`/admin/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Toggle user status (activate/deactivate)
  toggleUserStatus: async (userId, isActive) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, { isActive });
      toast.success(response.data.message || SUCCESS_MESSAGES.USER_STATUS_UPDATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics (placeholder - not implemented in backend)
  getAnalytics: async () => {
    // Return mock data since this endpoint doesn't exist in backend
    return {
      totalProjects: 0,
      completedProjects: 0,
      activeProjects: 0,
      totalFunding: 0
    };
  },

  // Get system logs (placeholder - not implemented in backend)
  getSystemLogs: async () => {
    // Return mock data since this endpoint doesn't exist in backend
    return {
      logs: []
    };
  }
};

// Frontliner API methods
export const frontlinerAPI = {
  // Get frontliner dashboard
  getDashboard: async (userId) => {
    try {
      const response = await api.get(`/frontliner/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get assigned projects
  getAssignedProjects: async () => {
    try {
      const response = await api.get('/frontliner/projects');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get project details
  getProjectDetails: async (projectId) => {
    try {
      const response = await api.get(`/frontliner/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update project progress
  updateProjectProgress: async (projectId, progressData) => {
    try {
      const response = await api.put(`/frontliner/projects/${projectId}/progress`, progressData);
      toast.success(response.data.message || 'Project progress updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit project report
  submitProjectReport: async (projectId, reportData) => {
    try {
      const response = await api.post(`/frontliner/projects/${projectId}/reports`, reportData);
      toast.success(response.data.message || 'Project report submitted successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get frontliner profile
  getProfile: async () => {
    try {
      const response = await api.get('/frontliner/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update frontliner profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/frontliner/profile', profileData);
      toast.success(response.data.message || 'Profile updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get frontliner tasks
  getTasks: async () => {
    try {
      const response = await api.get('/frontliner/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.put(`/frontliner/tasks/${taskId}/status`, { status });
      toast.success(response.data.message || 'Task status updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// NGO Partner API methods
export const ngoAPI = {
  // Get NGO dashboard
  getDashboard: async (userId) => {
    try {
      const response = await api.get(`/ngo/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get NGO projects
  getProjects: async () => {
    try {
      const response = await api.get('/ngo/projects');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const response = await api.post('/ngo/projects', projectData);
      toast.success(response.data.message || 'Project created successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/ngo/projects/${projectId}`, projectData);
      toast.success(response.data.message || 'Project updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/ngo/projects/${projectId}`);
      toast.success(response.data.message || 'Project deleted successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get project details
  getProjectDetails: async (projectId) => {
    try {
      const response = await api.get(`/ngo/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get NGO profile
  getProfile: async () => {
    try {
      const response = await api.get('/ngo/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update NGO profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/ngo/profile', profileData);
      toast.success(response.data.message || 'Profile updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get funding status
  getFundingStatus: async () => {
    try {
      const response = await api.get('/ngo/funding');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit funding request
  submitFundingRequest: async (fundingData) => {
    try {
      const response = await api.post('/ngo/funding/request', fundingData);
      toast.success(response.data.message || 'Funding request submitted successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get NGO reports
  getReports: async () => {
    try {
      const response = await api.get('/ngo/reports');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate report
  generateReport: async (reportData) => {
    try {
      const response = await api.post('/ngo/reports/generate', reportData);
      toast.success(response.data.message || 'Report generated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Project API methods
export const projectAPI = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      toast.success(response.data.message || SUCCESS_MESSAGES.PROJECT_CREATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      toast.success(response.data.message || SUCCESS_MESSAGES.PROJECT_UPDATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/projects/${projectId}`);
      toast.success(response.data.message || SUCCESS_MESSAGES.PROJECT_DELETED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assign project to frontliner
  assignProject: async (projectId, frontlinerId) => {
    try {
      const response = await api.put(`/projects/${projectId}/assign`, { frontlinerId });
      toast.success(response.data.message || 'Project assigned successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get project statistics
  getProjectStats: async () => {
    try {
      const response = await api.get('/projects/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Task API methods
export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      toast.success(response.data.message || SUCCESS_MESSAGES.TASK_CREATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      toast.success(response.data.message || SUCCESS_MESSAGES.TASK_UPDATED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      toast.success(response.data.message || SUCCESS_MESSAGES.TASK_DELETED);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assign task to frontliner
  assignTask: async (taskId, frontlinerId) => {
    try {
      const response = await api.put(`/tasks/${taskId}/assign`, { frontlinerId });
      toast.success(response.data.message || 'Task assigned successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.put(`/tasks/${taskId}/status`, { status });
      toast.success(response.data.message || 'Task status updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Notification API methods
export const notificationAPI = {
  // Get notifications (placeholder - not implemented in backend)
  getNotifications: async () => {
    // Return mock data since this endpoint doesn't exist in backend
    return {
      notifications: []
    };
  },

  // Mark notification as read (placeholder - not implemented in backend)
  markAsRead: async (notificationId) => {
    // Mock implementation since this endpoint doesn't exist in backend
    return {
      message: 'Notification marked as read'
    };
  },

  // Mark all notifications as read (placeholder - not implemented in backend)
  markAllAsRead: async () => {
    // Mock implementation since this endpoint doesn't exist in backend
    return {
      message: 'All notifications marked as read'
    };
  },

  // Delete notification (placeholder - not implemented in backend)
  deleteNotification: async (notificationId) => {
    // Mock implementation since this endpoint doesn't exist in backend
    return {
      message: 'Notification deleted'
    };
  }
};

export default api; 