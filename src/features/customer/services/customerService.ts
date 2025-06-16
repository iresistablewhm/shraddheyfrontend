import { api, apiHelpers } from '../../../utils/api';
import { Shop, InventoryItem, PaginatedResponse } from '../../../types';

export const customerService = {
  /**
   * Get nearby shops based on location
   */
  getNearbyShops: async (
    latitude: number,
    longitude: number,
    radius: number = 10,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<Shop>> => {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radius: radius.toString(),
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    return apiHelpers.get<PaginatedResponse<Shop>>(
      api.customer,
      `/shops/nearby?${params.toString()}`
    );
  },

  /**
   * Search shops by name or products
   */
  searchShops: async (
    query: string,
    latitude?: number,
    longitude?: number,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<Shop>> => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    if (latitude && longitude) {
      params.append('latitude', latitude.toString());
      params.append('longitude', longitude.toString());
    }

    return apiHelpers.get<PaginatedResponse<Shop>>(
      api.customer,
      `/shops/search?${params.toString()}`
    );
  },

  /**
   * Get shop details by ID
   */
  getShopDetails: async (shopId: number): Promise<Shop> => {
    return apiHelpers.get<Shop>(api.customer, `/shops/${shopId}`);
  },

  /**
   * Get products from a specific shop
   */
  getShopProducts: async (
    shopId: number,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<InventoryItem>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    return apiHelpers.get<PaginatedResponse<InventoryItem>>(
      api.customer,
      `/shops/${shopId}/products?${params.toString()}`
    );
  },

  /**
   * Get customer preferences
   */
  getPreferences: async (): Promise<{
    default_latitude?: number;
    default_longitude?: number;
    search_radius?: number;
  }> => {
    return apiHelpers.get(api.customer, '/preferences');
  },

  /**
   * Update customer preferences
   */
  updatePreferences: async (preferences: {
    default_latitude?: number;
    default_longitude?: number;
    search_radius?: number;
  }): Promise<void> => {
    return apiHelpers.put(api.customer, '/preferences', preferences);
  },
};