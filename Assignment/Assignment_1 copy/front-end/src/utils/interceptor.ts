import axios from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config: any) => {
    const request = config;
    const authToken = localStorage.getItem('token');
    if (authToken) {
      if (config.headers === undefined) {
        request.headers = {};
      }
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
