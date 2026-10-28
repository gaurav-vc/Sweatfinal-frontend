import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const mediaApi = {
  // Direct multi-part upload for photos & videos
  uploadFile: async (file, title = '', tags = '', onUploadProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (tags) formData.append('tags', tags);

    const response = await apiClient.post(ENDPOINTS.CMS.MEDIA_UPLOAD_DIRECT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },

  uploadMedia: async (file, title = '', tags = '', onUploadProgress = null) => {
    return mediaApi.uploadFile(file, title, tags, onUploadProgress);
  },

  getAllMedia: async () => {
    const response = await apiClient.get(ENDPOINTS.CMS.MEDIA);
    return response.data;
  },

  deleteMedia: async (mediaId) => {
    const response = await apiClient.delete(`${ENDPOINTS.CMS.MEDIA}${mediaId}/`);
    return response.data;
  },
};

export default mediaApi;
