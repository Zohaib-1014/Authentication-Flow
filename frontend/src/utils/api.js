// frontend/src/utils/api.js

import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { getUserTokens } from './storage';

// Make API request
export function makeApiRequest(endpoint, method = 'GET', data = null) {
  const url = API_BASE_URL + endpoint;
  
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detail || 'Request failed');
        });
      }
      return response.json();
    });
}

// Auth API calls
export function registerUser(email, username, password) {
  return makeApiRequest(API_ENDPOINTS.REGISTER, 'POST', {
    email: email,
    username: username,
    password: password
  });
}

export function confirmEmail(email, code) {
  return makeApiRequest(API_ENDPOINTS.CONFIRM, 'POST', {
    email: email,
    code: code
  });
}

export function loginUser(email, password) {
  return makeApiRequest(API_ENDPOINTS.LOGIN, 'POST', {
    email: email,
    password: password
  });
}

export function refreshTokens(refreshToken) {
  return makeApiRequest(API_ENDPOINTS.REFRESH, 'POST', {
    token: refreshToken
  });
}

export function forgetPassword(email) {
  return makeApiRequest(API_ENDPOINTS.FORGET_PASSWORD, 'POST', {
    email: email
  });
}

export function resetPassword(email, code, newPassword) {
  return makeApiRequest(API_ENDPOINTS.RESET_PASSWORD, 'POST', {
    email: email,
    code: code,
    new_password: newPassword
  });
}

export function changePassword(email, oldPassword, newPassword) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.CHANGE_PASSWORD, 'POST', {
    email: email,
    old_password: oldPassword,
    new_password: newPassword,
    access_token: tokens.accessToken
  });
}

// User API calls
export function getUserProfile(email) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.PROFILE, 'POST', {
    email: email,
    access_token: tokens.accessToken
  });
}

// Admin API calls
export function getAdminUsers() {
  const tokens = getUserTokens();
  return makeApiRequest(
    API_ENDPOINTS.ADMIN_USERS + '?access_token=' + tokens.accessToken, 
    'GET'
  );
}

export function blockUser(email) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.ADMIN_BLOCK, 'POST', {
    email: email,
    access_token: tokens.accessToken
  });
}

export function unblockUser(email) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.ADMIN_UNBLOCK, 'POST', {
    email: email,
    access_token: tokens.accessToken
  });
}

export function makeUserAdmin(email) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.ADMIN_MAKE_ADMIN, 'POST', {
    email: email,
    access_token: tokens.accessToken
  });
}

export function removeUserAdmin(email) {
  const tokens = getUserTokens();
  return makeApiRequest(API_ENDPOINTS.ADMIN_REMOVE_ADMIN, 'POST', {
    email: email,
    access_token: tokens.accessToken
  });
}