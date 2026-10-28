import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const bookingsApi = {
  // Public real-time booking submission
  submitBooking: async (bookingPayload) => {
    const response = await apiClient.post(ENDPOINTS.PUBLIC.SUBMIT_BOOKING, bookingPayload);
    return response.data;
  },

  submitLead: async (bookingPayload) => {
    const response = await apiClient.post(ENDPOINTS.PUBLIC.SUBMIT_BOOKING, bookingPayload);
    return response.data;
  },

  // CMS Studio Leads Management
  getLeads: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CMS.LEADS, { params });
    return response.data;
  },

  updateLeadStatus: async (leadId, status, admin_notes) => {
    const payload = { status };
    if (admin_notes !== undefined) payload.admin_notes = admin_notes;
    const response = await apiClient.patch(`${ENDPOINTS.CMS.LEADS}${leadId}/`, payload);
    return response.data;
  },

  deleteLead: async (leadId) => {
    const response = await apiClient.delete(`${ENDPOINTS.CMS.LEADS}${leadId}/`);
    return response.data;
  },
};

export default bookingsApi;
