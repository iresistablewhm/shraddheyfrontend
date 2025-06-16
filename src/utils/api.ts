import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from './config';
import { appStorage } from './storage';
import { ApiError } from '../types';

/**
 * Create axios instance with default configuration
 */
const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: config.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = appStorage.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status || 500,
        details: error.response?.data,
      };

      // Handle 401 errors (unauthorized)
      if (error.response?.status === 401) {
        // Clear auth data and redirect to login
        appStorage.removeAuthToken();
        appStorage.removeUserData();
        window.location.href = '/login';
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
};

/**
 * API instances for different services
 */
export const api = {
  user: createApiInstance(config.USER_SERVICE_URL),
  seller: createApiInstance(config.SELLER_SERVICE_URL),
  customer: createApiInstance(config.CUSTOMER_SERVICE_URL),
  catalog: createApiInstance(config.CATALOG_SERVICE_URL),
  admin: createApiInstance(config.ADMIN_SERVICE_URL),
};

/**
 * Generic API request function
 */
export const apiRequest = async <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await instance.request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Helper functions for common HTTP methods
 */
export const apiHelpers = {
  get: <T>(instance: AxiosInstance, url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>(instance, { method: 'GET', url, ...config }),

  post: <T>(instance: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>(instance, { method: 'POST', url, data, ...config }),

  put: <T>(instance: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>(instance, { method: 'PUT', url, data, ...config }),

  patch: <T>(instance: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>(instance, { method: 'PATCH', url, data, ...config }),

  delete: <T>(instance: AxiosInstance, url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>(instance, { method: 'DELETE', url, ...config }),
};

export default api;