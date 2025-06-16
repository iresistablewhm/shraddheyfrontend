// Environment configuration
export const config = {
  // API Base URLs - these should be set via environment variables
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost',
  USER_SERVICE_URL: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:8001',
  SELLER_SERVICE_URL: process.env.REACT_APP_SELLER_SERVICE_URL || 'http://localhost:8002',
  CUSTOMER_SERVICE_URL: process.env.REACT_APP_CUSTOMER_SERVICE_URL || 'http://localhost:8003',
  CATALOG_SERVICE_URL: process.env.REACT_APP_CATALOG_SERVICE_URL || 'http://localhost:8004',
  ADMIN_SERVICE_URL: process.env.REACT_APP_ADMIN_SERVICE_URL || 'http://localhost:8005',
  
  // Firebase configuration
  FIREBASE_CONFIG: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  },
  
  // App configuration
  APP_NAME: 'HyperLocal Marketplace',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Geolocation settings
  DEFAULT_SEARCH_RADIUS: 10, // km
  GEOLOCATION_TIMEOUT: 10000, // ms
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'hyperlocal_auth_token',
    USER_DATA: 'hyperlocal_user_data',
    LOCATION: 'hyperlocal_location',
    THEME: 'hyperlocal_theme',
  },
  
  // API timeouts
  API_TIMEOUT: 30000, // ms
  
  // Image upload settings
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

export default config;