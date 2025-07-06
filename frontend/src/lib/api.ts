// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend port
});

// Add request interceptor to include JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Sending token:', token.substring(0, 20) + '...'); // Debug log
    } else {
      console.log('⚠️ No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;