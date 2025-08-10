// frontend/src/utils/storage.js

import { STORAGE_KEYS } from './constants';

// Get item from localStorage
export function getStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error getting storage item:', error);
    return null;
  }
}

// Set item in localStorage
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error setting storage item:', error);
    return false;
  }
}

// Remove item from localStorage
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing storage item:', error);
    return false;
  }
}

// Clear all storage
export function clearStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

// Get user tokens
export function getUserTokens() {
  return {
    accessToken: getStorageItem(STORAGE_KEYS.ACCESS_TOKEN),
    refreshToken: getStorageItem(STORAGE_KEYS.REFRESH_TOKEN)
  };
}

// Save user tokens
export function saveUserTokens(accessToken, refreshToken) {
  setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

// Get user info
export function getUserInfo() {
  return {
    email: getStorageItem(STORAGE_KEYS.USER_EMAIL),
    role: getStorageItem(STORAGE_KEYS.USER_ROLE)
  };
}

// Save user info
export function saveUserInfo(email, role) {
  setStorageItem(STORAGE_KEYS.USER_EMAIL, email);
  setStorageItem(STORAGE_KEYS.USER_ROLE, role);
}

// Check if user is logged in
export function isUserLoggedIn() {
  const tokens = getUserTokens();
  return tokens.accessToken !== null;
}

// Check if user is admin
export function isUserAdmin() {
  const userInfo = getUserInfo();
  return userInfo.role === 'admin';
}

// Logout user (clear all data)
export function logoutUser() {
  removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeStorageItem(STORAGE_KEYS.USER_EMAIL);
  removeStorageItem(STORAGE_KEYS.USER_ROLE);
}