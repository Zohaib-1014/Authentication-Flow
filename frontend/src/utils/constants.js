// frontend/src/utils/constants.js

// API Base URL
export const API_BASE_URL = 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: '/auth/register',
  CONFIRM: '/auth/confirm',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  FORGET_PASSWORD: '/auth/forget-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // User endpoints
  PROFILE: '/user/profile',
  
  // Admin endpoints
  ADMIN_USERS: '/admin/users',
  ADMIN_BLOCK: '/admin/block-user',
  ADMIN_UNBLOCK: '/admin/unblock-user',
  ADMIN_MAKE_ADMIN: '/admin/make-admin',
  ADMIN_REMOVE_ADMIN: '/admin/remove-admin',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_EMAIL: 'user_email',
  USER_ROLE: 'user_role'
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// App Pages
export const PAGES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  DASHBOARD: 'dashboard',
  ADMIN: 'admin',
  RESET_PASSWORD: 'reset_password'
};