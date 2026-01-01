import { API_ENDPOINTS, getAuthHeader } from '../config';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  return data;
};

export const api = {
  get: async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  post: async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  put: async (url, data) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  delete: async (url) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

// Auth related API calls
export const authApi = {
  login: async (credentials) => {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  signup: async (userData) => {
    return api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
  },

  getProfile: async () => {
    return api.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  verifyToken: async () => {
    return api.get(API_ENDPOINTS.AUTH.VERIFY);
  },

  logout: async () => {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
};

// Mood tracking API
export const moodApi = {
  trackMood: async (moodData) => {
    return api.post(API_ENDPOINTS.MOOD.TRACK, moodData);
  },

  getMoodHistory: async () => {
    return api.get(API_ENDPOINTS.MOOD.HISTORY);
  }
};

// Videos API
export const videoApi = {
  getVideos: async () => {
    return api.get(API_ENDPOINTS.VIDEOS.LIST);
  },

  updateProgress: async (videoId, progress) => {
    return api.put(`${API_ENDPOINTS.VIDEOS.PROGRESS}/${videoId}`, { progress });
  }
};
