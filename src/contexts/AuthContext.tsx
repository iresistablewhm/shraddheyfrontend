import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserRole, AuthTokens } from '../types';
import { appStorage } from '../utils/storage';
import { authService } from '../features/auth/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: AuthTokens) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = appStorage.getAuthToken();
        const userData = appStorage.getUserData();

        if (token && userData) {
          // Verify token is still valid
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // Token is invalid, clear storage
            appStorage.removeAuthToken();
            appStorage.removeUserData();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (tokens: AuthTokens) => {
    try {
      // Store token
      appStorage.setAuthToken(tokens.access_token);
      
      // Get user data
      const userData = await authService.getCurrentUser();
      setUser(userData);
      appStorage.setUserData(userData);
    } catch (error) {
      // Clean up on error
      appStorage.removeAuthToken();
      appStorage.removeUserData();
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    appStorage.removeAuthToken();
    appStorage.removeUserData();
    appStorage.removeLocation();
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      appStorage.setUserData(updatedUser);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};