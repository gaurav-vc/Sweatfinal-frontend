// Production & Local Environment URLs
export const PRODUCTION_URL = 'https://sweatfit.vibesandbox.live/';
export const LIVE_URL = 'https://sweatfit.vibesandbox.live/';
export const LIVE_API_URL = 'https://sweatfit.vibesandbox.live/api/v1';
export const LOCAL_API_URL = 'http://localhost:8000/api/v1';

// Switch automatically based on environment mode or VITE_API_URL
export const BASE_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? LIVE_API_URL : LOCAL_API_URL);

import axios from 'axios';

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if available (for CMS Studio requests)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sweat_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error logging and session handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 Unauthorized
      localStorage.removeItem('sweat_admin_token');
      localStorage.removeItem('sweat_admin_user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
