import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const authApi = {
  login: async (username, password) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, { username, password });
    if (response.data?.access) {
      localStorage.setItem('sweat_admin_token', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('sweat_admin_refresh', response.data.refresh);
      }
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get(ENDPOINTS.AUTH.CURRENT_USER);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('sweat_admin_token');
    localStorage.removeItem('sweat_admin_refresh');
    localStorage.removeItem('sweat_admin_user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('sweat_admin_token');
  },
};

export default authApi;
