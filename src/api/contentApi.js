import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const contentApi = {
  // Fetch real-time content for any individual page
  getPageContent: async (pageSlug = 'home') => {
    try {
      const response = await apiClient.get(ENDPOINTS.PUBLIC.PAGE_CONTENT(pageSlug));
      return response.data;
    } catch (error) {
      console.error(`[contentApi] Error fetching dynamic data for page: ${pageSlug}`, error);
      throw error;
    }
  },

  // Fetch individual resources dynamically
  getPrograms: async () => {
    const response = await apiClient.get(ENDPOINTS.PUBLIC.PROGRAMS);
    return response.data;
  },

  getCelebrities: async () => {
    const response = await apiClient.get(ENDPOINTS.PUBLIC.HOME);
    return response.data?.celebrities || [];
  },

  getTransformations: async () => {
    const response = await apiClient.get(ENDPOINTS.PUBLIC.HOME);
    return response.data?.transformations || [];
  },

  getCoaches: async () => {
    const response = await apiClient.get(ENDPOINTS.PUBLIC.TEAM);
    return response.data?.coaches || [];
  },

  getMemberships: async () => {
    const response = await apiClient.get(ENDPOINTS.PUBLIC.MEMBERSHIP);
    return response.data?.memberships || [];
  },
};

export default contentApi;
