// User types
export enum UserRole {
  CUSTOMER = 'customer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  firebase_uid: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  user_id: number;
  role: UserRole;
}

// Shop types
export interface Shop {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  whatsapp_number?: string;
  address?: string;
  latitude: number;
  longitude: number;
  image_url?: string;
  banner_url?: string;
  created_at: string;
  updated_at: string;
  distance?: number; // Added by customer service for nearby shops
}

// Product/Catalog types
export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CatalogItem {
  id: number;
  name: string;
  description?: string;
  category_id: number;
  brand?: string;
  model?: string;
  image_url?: string;
  specifications?: Record<string, any>;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface InventoryItem {
  id: number;
  shop_id: number;
  catalog_item_id: number;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  catalog_item?: CatalogItem;
}

// Location types
export interface Location {
  latitude: number;
  longitude: number;
}

export interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  query?: string;
}

// Form types
export interface LoginForm {
  firebase_token: string;
}

export interface RegisterForm {
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  firebase_token: string;
}

export interface ShopForm {
  name: string;
  description?: string;
  whatsapp_number?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

export interface InventoryForm {
  catalog_item_id: number;
  price: number;
  stock: number;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}