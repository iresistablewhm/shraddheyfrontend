import { api, apiHelpers } from '../../../utils/api';
import { Shop, InventoryItem, ShopForm, InventoryForm, PaginatedResponse } from '../../../types';

export const sellerService = {
  /**
   * Get seller's shop details
   */
  getMyShop: async (): Promise<Shop> => {
    return apiHelpers.get<Shop>(api.seller, '/shops/me');
  },

  /**
   * Create a new shop
   */
  createShop: async (shopData: ShopForm): Promise<Shop> => {
    return apiHelpers.post<Shop>(api.seller, '/shops', shopData);
  },

  /**
   * Update shop details
   */
  updateShop: async (shopData: Partial<ShopForm>): Promise<Shop> => {
    return apiHelpers.put<Shop>(api.seller, '/shops/me', shopData);
  },

  /**
   * Get shop inventory
   */
  getInventory: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<InventoryItem>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    return apiHelpers.get<PaginatedResponse<InventoryItem>>(
      api.seller,
      `/shops/me/products?${params.toString()}`
    );
  },

  /**
   * Add product to inventory
   */
  addProduct: async (productData: InventoryForm): Promise<InventoryItem> => {
    return apiHelpers.post<InventoryItem>(api.seller, '/shops/me/products', productData);
  },

  /**
   * Update product in inventory
   */
  updateProduct: async (productId: number, productData: Partial<InventoryForm>): Promise<InventoryItem> => {
    return apiHelpers.put<InventoryItem>(api.seller, `/shops/me/products/${productId}`, productData);
  },

  /**
   * Remove product from inventory
   */
  removeProduct: async (productId: number): Promise<void> => {
    return apiHelpers.delete(api.seller, `/shops/me/products/${productId}`);
  },

  /**
   * Upload shop image
   */
  uploadImage: async (file: File, fieldName: 'image' | 'banner'): Promise<{
    presigned_url: string;
    image_url: string;
    field_name: string;
  }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field_name', fieldName);

    return apiHelpers.post(api.seller, '/shops/me/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get shop statistics
   */
  getShopStats: async (): Promise<{
    total_products: number;
    total_views: number;
    total_inquiries: number;
    recent_activity: any[];
  }> => {
    return apiHelpers.get(api.seller, '/shops/me/stats');
  },
};