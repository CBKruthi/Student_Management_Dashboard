import axios from 'axios';

// Configure Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Hardcoding for local dev since Vite proxy is sometimes flaky
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    if (adminInfo && adminInfo.token) {
      config.headers.Authorization = `Bearer ${adminInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear local storage and redirect to login
      localStorage.removeItem('adminInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
