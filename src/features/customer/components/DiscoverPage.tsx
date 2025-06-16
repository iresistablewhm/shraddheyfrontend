import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { customerService } from '../services/customerService';
import { Shop } from '../../../types';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { formatDistance } from '../../../utils/geolocation';

export const DiscoverPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRadius, setSearchRadius] = useState(10);

  const { location, error: locationError, isLoading: locationLoading, requestLocation } = useGeolocation();

  // Load nearby shops when location is available
  useEffect(() => {
    if (location) {
      loadNearbyShops();
    }
  }, [location, searchRadius]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadNearbyShops = async () => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await customerService.getNearbyShops(
        location.latitude,
        location.longitude,
        searchRadius
      );
      setShops(response.items);
    } catch (err: any) {
      setError(err.message || 'Failed to load nearby shops');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadNearbyShops();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await customerService.searchShops(
        searchQuery,
        location?.latitude,
        location?.longitude
      );
      setShops(response.items);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationRequest = () => {
    requestLocation();
  };

  if (locationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Local Shops</h1>
        <p className="mt-2 text-gray-600">
          Find shops and products near you
        </p>
      </div>

      {/* Location Status */}
      {locationError && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                {locationError}
              </p>
              <button
                onClick={handleLocationRequest}
                className="mt-2 text-sm text-yellow-800 underline hover:text-yellow-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for shops or products..."
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Search'}
          </button>
        </form>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Search Radius:
          </label>
          <select
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="input-field w-auto"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={50}>50 km</option>
          </select>
          {location && (
            <span className="text-sm text-gray-500">
              📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Shops Grid */}
      {!isLoading && shops.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Link
              key={shop.id}
              to={`/customer/shops/${shop.id}`}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              {shop.image_url && (
                <img
                  src={shop.image_url}
                  alt={shop.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {shop.name}
              </h3>
              {shop.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {shop.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>📍 {shop.address}</span>
                {shop.distance && (
                  <span className="font-medium text-primary-600">
                    {formatDistance(shop.distance)}
                  </span>
                )}
              </div>
              {shop.whatsapp_number && (
                <div className="mt-2 text-sm text-green-600">
                  📱 WhatsApp available
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && shops.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No shops found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No shops found for "${searchQuery}"`
              : 'No shops found in your area'
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                loadNearbyShops();
              }}
              className="btn-secondary"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};