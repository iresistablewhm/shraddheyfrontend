import { api, apiHelpers } from '../../../utils/api';
import { User, AuthTokens, RegisterForm, LoginForm } from '../../../types';

export const authService = {
  /**
   * Login with Firebase token
   */
  login: async (firebaseToken: string): Promise<AuthTokens> => {
    const loginData: LoginForm = { firebase_token: firebaseToken };
    return apiHelpers.post<AuthTokens>(api.user, '/auth/login', loginData);
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterForm): Promise<AuthTokens> => {
    return apiHelpers.post<AuthTokens>(api.user, '/auth/register', userData);
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return apiHelpers.get<User>(api.user, '/users/me');
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiHelpers.put<User>(api.user, '/users/me', userData);
  },

  /**
   * Verify JWT token
   */
  verifyToken: async (): Promise<{ valid: boolean; user?: User }> => {
    try {
      const user = await apiHelpers.get<User>(api.user, '/auth/verify-token');
      return { valid: true, user };
    } catch (error) {
      return { valid: false };
    }
  },

  /**
   * Refresh JWT token
   */
  refreshToken: async (): Promise<AuthTokens> => {
    return apiHelpers.post<AuthTokens>(api.user, '/auth/refresh-token');
  },

  /**
   * Logout (client-side only, no API call needed)
   */
  logout: () => {
    // Clear any client-side data
    // The actual token removal is handled by AuthContext
  },
};