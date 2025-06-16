import { config } from './config';

/**
 * Utility functions for localStorage operations
 */
export const storage = {
  // Get item from localStorage
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage:`, error);
      return null;
    }
  },

  // Set item in localStorage
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage:`, error);
    }
  },

  // Remove item from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage:`, error);
    }
  },

  // Clear all localStorage
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  },

  // Check if localStorage is available
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Typed storage functions for specific app data
 */
export const appStorage = {
  // Auth token
  getAuthToken: () => storage.get<string>(config.STORAGE_KEYS.AUTH_TOKEN),
  setAuthToken: (token: string) => storage.set(config.STORAGE_KEYS.AUTH_TOKEN, token),
  removeAuthToken: () => storage.remove(config.STORAGE_KEYS.AUTH_TOKEN),

  // User data
  getUserData: () => storage.get<any>(config.STORAGE_KEYS.USER_DATA),
  setUserData: (userData: any) => storage.set(config.STORAGE_KEYS.USER_DATA, userData),
  removeUserData: () => storage.remove(config.STORAGE_KEYS.USER_DATA),

  // Location
  getLocation: () => storage.get<{ latitude: number; longitude: number }>(config.STORAGE_KEYS.LOCATION),
  setLocation: (location: { latitude: number; longitude: number }) => 
    storage.set(config.STORAGE_KEYS.LOCATION, location),
  removeLocation: () => storage.remove(config.STORAGE_KEYS.LOCATION),

  // Theme
  getTheme: () => storage.get<'light' | 'dark'>(config.STORAGE_KEYS.THEME) || 'light',
  setTheme: (theme: 'light' | 'dark') => storage.set(config.STORAGE_KEYS.THEME, theme),

  // Clear all app data
  clearAll: () => {
    Object.values(config.STORAGE_KEYS).forEach(key => storage.remove(key));
  },
};