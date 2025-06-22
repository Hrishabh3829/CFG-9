// API Base URL
export const BASE_URL = 'http://localhost:8000/api/v1';

// User API Endpoints
export const USER_LOGIN_ENDPOINT = '/user/login';
export const USER_REGISTER_ENDPOINT = '/user/register';
export const USER_LOGOUT_ENDPOINT = '/user/logout';
export const USER_PROFILE_ENDPOINT = '/user/profile';

// Admin API Endpoints
export const ADMIN_CREATE_NGO_ENDPOINT = '/admin/ngos';
export const ADMIN_CREATE_FRONTLINER_ENDPOINT = '/admin/frontliners';
export const ADMIN_GET_ALL_NGOS_ENDPOINT = '/admin/ngos';
export const ADMIN_GET_ALL_FRONTLINERS_ENDPOINT = '/admin/frontliners';
export const ADMIN_UPDATE_SETTINGS_ENDPOINT = '/admin/settings';
export const ADMIN_GET_DASHBOARD_ENDPOINT = '/admin/dashboard';
export const ADMIN_TOGGLE_USER_STATUS_ENDPOINT = '/admin/users';
export const ADMIN_ANALYTICS_ENDPOINT = '/admin/analytics';
export const ADMIN_LOGS_ENDPOINT = '/admin/logs';

// Frontliner API Endpoints
export const FRONTLINER_DASHBOARD_ENDPOINT = '/frontliner/dashboard';
export const FRONTLINER_PROJECTS_ENDPOINT = '/frontliner/projects';
export const FRONTLINER_TASKS_ENDPOINT = '/frontliner/tasks';
export const FRONTLINER_PROFILE_ENDPOINT = '/frontliner/profile';

// NGO API Endpoints
export const NGO_DASHBOARD_ENDPOINT = '/ngo/dashboard';
export const NGO_PROJECTS_ENDPOINT = '/ngo/projects';
export const NGO_PROFILE_ENDPOINT = '/ngo/profile';
export const NGO_FUNDING_ENDPOINT = '/ngo/funding';
export const NGO_REPORTS_ENDPOINT = '/ngo/reports';

// Project API Endpoints
export const PROJECT_API_END_POINT = '/projects';
export const PROJECT_STATS_ENDPOINT = '/projects/stats';

// Task API Endpoints
export const TASK_API_END_POINT = '/tasks';

// Notification API Endpoints
export const NOTIFICATION_ENDPOINT = '/notifications';

// User Roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  FRONTLINER: 'Frontliner',
  PARTNER_NGO: 'PartnerNGO'
};

// User Types (for frontend selection)
export const USER_TYPES = {
  ADMIN: 'Admin',
  FRONTLINER: 'Frontliner',
  NGO: 'PartnerNGO'
};

// User Role Labels
export const USER_ROLES_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.FRONTLINER]: 'Frontliner',
  [USER_ROLES.PARTNER_NGO]: 'NGO Partner'
};

// Application Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_TASKS: '/admin/tasks',
  ADMIN_SETTINGS: '/admin/settings',
  FRONTLINER_DASHBOARD: '/frontliner/dashboard',
  FRONTLINER_PROJECTS: '/frontliner/projects',
  FRONTLINER_TASKS: '/frontliner/tasks',
  FRONTLINER_SETTINGS: '/frontliner/settings',
  NGO_DASHBOARD: '/ngo/dashboard',
  NGO_PROJECTS: '/ngo/projects',
  NGO_FUNDING: '/ngo/funding',
  NGO_REPORTS: '/ngo/reports',
  NGO_SETTINGS: '/ngo/settings'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  NGO_CREATED: 'NGO created successfully!',
  FRONTLINER_CREATED: 'Frontliner created successfully!',
  SETTINGS_UPDATED: 'Settings updated successfully!',
  USER_STATUS_UPDATED: 'User status updated successfully!',
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  FUNDING_REQUEST_SUBMITTED: 'Funding request submitted successfully!',
  REPORT_GENERATED: 'Report generated successfully!',
  NOTIFICATION_MARKED_READ: 'Notification marked as read!'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  USER_EXISTS: 'User already exists with this email.',
  EMAIL_ALREADY_EXISTS: 'Email already exists.',
  WEAK_PASSWORD: 'Password is too weak.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.'
};

// Project Status
export const PROJECT_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DISCONTINUED: 'discontinued'
};

// Task Status
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Task Priority
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Funding Status
export const FUNDING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DISBURSED: 'disbursed'
};

// Report Status
export const REPORT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  PROJECT_ASSIGNED: 'project_assigned',
  TASK_ASSIGNED: 'task_assigned',
  FUNDING_APPROVED: 'funding_approved',
  FUNDING_REJECTED: 'funding_rejected',
  REPORT_DUE: 'report_due',
  SYSTEM_ALERT: 'system_alert'
};

// Log Levels
export const LOG_LEVELS = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  DEBUG: 'debug'
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#06B6D4',
  SECONDARY: '#6B7280'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  PHONE_MAX_LENGTH: 20,
  ADDRESS_MAX_LENGTH: 500,
  DESCRIPTION_MAX_LENGTH: 1000
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm'
};

// Currency
export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
  LOCALE: 'en-US'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  USER_ROLE: 'user_role',
  IS_AUTHENTICATED: 'is_authenticated',
  TOKEN: 'token',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
};

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Language
export const LANGUAGE = {
  ENGLISH: 'en',
  SPANISH: 'es',
  FRENCH: 'fr'
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};

export default {
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
  ADMIN_ANALYTICS_ENDPOINT,
  ADMIN_LOGS_ENDPOINT,
  FRONTLINER_DASHBOARD_ENDPOINT,
  FRONTLINER_PROJECTS_ENDPOINT,
  FRONTLINER_TASKS_ENDPOINT,
  FRONTLINER_PROFILE_ENDPOINT,
  NGO_DASHBOARD_ENDPOINT,
  NGO_PROJECTS_ENDPOINT,
  NGO_PROFILE_ENDPOINT,
  NGO_FUNDING_ENDPOINT,
  NGO_REPORTS_ENDPOINT,
  PROJECT_API_END_POINT,
  PROJECT_STATS_ENDPOINT,
  TASK_API_END_POINT,
  NOTIFICATION_ENDPOINT,
  USER_ROLES,
  USER_TYPES,
  USER_ROLES_LABELS,
  ROUTES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  PROJECT_STATUS,
  TASK_STATUS,
  TASK_PRIORITY,
  FUNDING_STATUS,
  REPORT_STATUS,
  NOTIFICATION_TYPES,
  LOG_LEVELS,
  CHART_COLORS,
  PAGINATION,
  FILE_UPLOAD,
  VALIDATION_RULES,
  DATE_FORMATS,
  CURRENCY,
  STORAGE_KEYS,
  THEME,
  LANGUAGE,
  API_STATUS,
  HTTP_STATUS
}; 