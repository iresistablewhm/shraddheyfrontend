import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { LoadingPage } from './components/common/LoadingSpinner';
import { UserRole } from './types';

// Auth pages
import { LoginPage } from './features/auth/components/LoginPage';
import { RegisterPage } from './features/auth/components/RegisterPage';

// Customer pages
import { DiscoverPage } from './features/customer/components/DiscoverPage';

// Seller pages
import { SellerDashboard } from './features/seller/components/SellerDashboard';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Home redirect component
const HomeRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case UserRole.CUSTOMER:
      return <Navigate to="/customer/discover" replace />;
    case UserRole.SELLER:
      return <Navigate to="/seller/dashboard" replace />;
    case UserRole.ADMIN:
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Unauthorized page
const UnauthorizedPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
      <button
        onClick={() => window.history.back()}
        className="btn-primary"
      >
        Go Back
      </button>
    </div>
  </div>
);

// Placeholder components for routes not yet implemented
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Home redirect */}
                  <Route index element={<HomeRedirect />} />

                  {/* Customer routes */}
                  <Route
                    path="customer/discover"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
                        <DiscoverPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customer/shops"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
                        <PlaceholderPage title="Nearby Shops" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customer/shops/:shopId"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
                        <PlaceholderPage title="Shop Details" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customer/profile"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
                        <PlaceholderPage title="Customer Profile" />
                      </ProtectedRoute>
                    }
                  />

                  {/* Seller routes */}
                  <Route
                    path="seller/dashboard"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <SellerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/shop"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Shop Management" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/shop/setup"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Shop Setup" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/products"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Product Management" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/products/add"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Add Product" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/analytics"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Analytics" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="seller/profile"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.SELLER]}>
                        <PlaceholderPage title="Seller Profile" />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin routes */}
                  <Route
                    path="admin/dashboard"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                        <PlaceholderPage title="Admin Dashboard" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/users"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                        <PlaceholderPage title="User Management" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/shops"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                        <PlaceholderPage title="Shop Management" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/products"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                        <PlaceholderPage title="Product Management" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/analytics"
                    element={
                      <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                        <PlaceholderPage title="System Analytics" />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
