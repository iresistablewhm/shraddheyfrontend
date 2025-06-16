import { useState, useEffect, useCallback } from 'react';
import { Location } from '../types';
import { 
  getCurrentLocation, 
  watchLocation, 
  clearLocationWatch,
  isGeolocationSupported,
  requestLocationPermission 
} from '../utils/geolocation';
import { appStorage } from '../utils/storage';

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  saveToStorage?: boolean;
}

interface UseGeolocationReturn {
  location: Location | null;
  error: string | null;
  isLoading: boolean;
  isSupported: boolean;
  requestLocation: () => Promise<void>;
  clearError: () => void;
}

export const useGeolocation = (options: UseGeolocationOptions = {}): UseGeolocationReturn => {
  const {
    watch = false,
    saveToStorage = true,
  } = options;

  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchId, setWatchId] = useState<number>(-1);

  const isSupported = isGeolocationSupported();

  // Load saved location from storage on mount
  useEffect(() => {
    if (saveToStorage) {
      const savedLocation = appStorage.getLocation();
      if (savedLocation) {
        setLocation(savedLocation);
      }
    }
  }, [saveToStorage]);

  // Handle location update
  const handleLocationUpdate = useCallback((newLocation: Location) => {
    setLocation(newLocation);
    setError(null);
    setIsLoading(false);
    
    if (saveToStorage) {
      appStorage.setLocation(newLocation);
    }
  }, [saveToStorage]);

  // Handle location error
  const handleLocationError = useCallback((locationError: Error) => {
    setError(locationError.message);
    setIsLoading(false);
  }, []);

  // Request current location
  const requestLocation = useCallback(async () => {
    if (!isSupported) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check permission first
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const currentLocation = await getCurrentLocation();
      handleLocationUpdate(currentLocation);
    } catch (locationError) {
      handleLocationError(locationError as Error);
    }
  }, [isSupported, handleLocationUpdate, handleLocationError]);

  // Start watching location
  const startWatching = useCallback(() => {
    if (!isSupported || watchId !== -1) return;

    const id = watchLocation(handleLocationUpdate, handleLocationError);
    setWatchId(id);
  }, [isSupported, watchId, handleLocationUpdate, handleLocationError]);

  // Stop watching location
  const stopWatching = useCallback(() => {
    if (watchId !== -1) {
      clearLocationWatch(watchId);
      setWatchId(-1);
    }
  }, [watchId]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Effect for watching location
  useEffect(() => {
    if (watch && isSupported) {
      startWatching();
    }

    return () => {
      if (watchId !== -1) {
        stopWatching();
      }
    };
  }, [watch, isSupported, startWatching, stopWatching, watchId]);

  // Auto-request location on mount if no saved location
  useEffect(() => {
    if (!location && !error && !isLoading && isSupported) {
      requestLocation();
    }
  }, [location, error, isLoading, isSupported, requestLocation]);

  return {
    location,
    error,
    isLoading,
    isSupported,
    requestLocation,
    clearError,
  };
};