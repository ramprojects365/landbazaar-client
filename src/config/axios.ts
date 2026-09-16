import axios from 'axios';
import { API_BASE_URL } from './constants';
import { clearAuthSession } from '@/utils/auth';

// Export axios for error checking utilities
export { axios };

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for debugging, auth token, and content-type handling
if (process.env.NODE_ENV !== "production") {
  apiClient.interceptors.request.use(
    (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        params: config.params,
        data: config.data,
      });
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Add authorization token to all requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
      if (!token) {
        const cookieMatch = document.cookie
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("token="));
        token = cookieMatch ? cookieMatch.split("=")[1] : null;
      }
    }

    // Add token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const isExpiredToken =
      status === 403 && (message === 'Token expired' || message === 'Invalid token');

    if (typeof window !== 'undefined' && isExpiredToken) {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      clearAuthSession();

      if (!window.location.pathname.startsWith('/sign-in')) {
        window.location.href = `/sign-in?redirect=${encodeURIComponent(currentPath)}`;
      }
    }

    return Promise.reject(error);
  }
);

// Response interceptor for debugging in development
if (process.env.NODE_ENV !== "production") {
  apiClient.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const details = {
        status,
        data: error.response?.data,
        message: error.message,
      };
      if (!error.response) {
        console.warn('API unavailable:', details);
      } else if (status === 401 || status === 403) {
        console.warn('API authorization required:', details);
      } else {
        console.error('API Response Error:', details);
      }
      return Promise.reject(error);
    }
  );
}

export default apiClient;
