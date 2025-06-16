# HyperLocal Marketplace Frontend

A modern, production-ready React TypeScript frontend for the HyperLocal Marketplace platform. This application enables customers to discover nearby shops, sellers to manage their businesses, and administrators to oversee the platform.

## 🚀 Features

### Core Features
- **Role-based Authentication**: Customer, Seller, and Admin roles with Firebase integration
- **Geolocation Integration**: Find shops and products based on user location
- **Progressive Web App (PWA)**: Installable, offline-capable, mobile-optimized
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: React Query for efficient data fetching and caching

### Customer Features
- Discover nearby shops based on location
- Search shops and products
- View shop details and product inventory
- Distance-based shop filtering
- Mobile-optimized browsing experience

### Seller Features
- Comprehensive dashboard with analytics
- Shop management and setup
- Product inventory management
- Image upload for shop and products
- Sales analytics and insights

### Admin Features
- System-wide dashboard and analytics
- User management (customers and sellers)
- Shop and product moderation
- System monitoring and logs

## 🛠 Tech Stack

### Core Technologies
- **React 18** with TypeScript
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **React Query** for state management and API calls
- **Axios** for HTTP requests

### Development Tools
- **ESLint** and **Prettier** for code quality
- **TypeScript** with strict mode
- **PWA** capabilities with service workers

### Architecture
- **Feature-based folder structure** for scalability
- **Centralized API layer** with error handling
- **Context-based authentication** management
- **Custom hooks** for reusable logic
- **Component composition** patterns

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (LoadingSpinner, ErrorBoundary, etc.)
│   └── ui/              # UI library components
├── contexts/            # React contexts (Auth, Theme, etc.)
├── features/            # Feature-based modules
│   ├── auth/           # Authentication features
│   ├── customer/       # Customer-specific features
│   ├── seller/         # Seller-specific features
│   └── admin/          # Admin-specific features
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── App.tsx             # Main application component
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- **Backend services running** (see [backend repository](https://github.com/Vivek8968/hyperlocalbymanus))
- Firebase project (for authentication - optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vivek8968/shraddheyfrontend.git
   cd shraddheyfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Backend Setup (Required First)**
   ```bash
   # Clone and set up the backend services
   git clone https://github.com/Vivek8968/hyperlocalbymanus.git
   cd hyperlocalbymanus
   
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Start all backend services (ports 8001-8005)
   python run_service.py user_service &
   python run_service.py seller_service &
   python run_service.py customer_service &
   python run_service.py catalog_service &
   python run_service.py admin_service &
   ```

4. **Environment Configuration**
   ```bash
   # The .env file is already configured for local development
   # Backend services should be running on localhost:8001-8005
   # See ENVIRONMENT_SETUP.md for detailed configuration
   ```

5. **Start development server**
   ```bash
   cd shraddheyfrontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:12000
   - Backend Health Check: http://localhost:8001/health

### 🔧 Environment Setup
For detailed environment configuration, backend connection setup, and troubleshooting, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md).

### Environment Variables

Create a `.env.development` file with the following variables:

```env
# API Configuration
REACT_APP_USER_SERVICE_URL=http://localhost:8001
REACT_APP_SELLER_SERVICE_URL=http://localhost:8002
REACT_APP_CUSTOMER_SERVICE_URL=http://localhost:8003
REACT_APP_CATALOG_SERVICE_URL=http://localhost:8004
REACT_APP_ADMIN_SERVICE_URL=http://localhost:8005

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## 🔐 Authentication

The application uses Firebase Authentication with the following flow:

1. **Login/Register**: Users authenticate via Firebase (OTP, Google, Apple)
2. **Token Exchange**: Firebase token is exchanged for JWT from backend
3. **Role-based Access**: Routes and features are protected based on user roles
4. **Persistent Sessions**: Tokens are stored securely in localStorage

### Demo Mode
For development/demo purposes, the app includes mock authentication that doesn't require actual Firebase setup.

## 🗺 Geolocation Features

### Location Services
- **Automatic Detection**: Requests user location on app load
- **Permission Handling**: Graceful handling of location permissions
- **Fallback Options**: Manual location entry if geolocation fails
- **Distance Calculation**: Haversine formula for accurate distance calculations

### Privacy & Security
- Location data is stored locally only
- Users can opt-out of location services
- No location tracking or persistent storage on servers

## 📱 PWA Features

### Installation
- **Add to Home Screen**: Users can install the app on mobile devices
- **Standalone Mode**: Runs like a native app when installed
- **Custom Icons**: Branded app icons for different screen sizes

### Offline Capabilities
- **Service Worker**: Caches essential resources for offline use
- **Offline Fallbacks**: Graceful degradation when network is unavailable
- **Background Sync**: Syncs data when connection is restored

## 🎨 UI/UX Design

### Design System
- **Tailwind CSS**: Utility-first CSS framework
- **Consistent Spacing**: 8px grid system
- **Color Palette**: Primary (blue) and secondary (green) colors
- **Typography**: Inter font family for readability

### Responsive Design
- **Mobile-first**: Designed for mobile devices first
- **Touch-friendly**: Appropriate touch targets and gestures

## 🔧 Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests

# Code Quality
npm run lint           # Run ESLint (when configured)
npm run format         # Format code with Prettier (when configured)
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Options

#### Static Hosting
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployments
- **AWS S3 + CloudFront**: Scalable static hosting

## 🔄 Mobile App Export

### React Native Web
The codebase is structured to support React Native Web for mobile app development.

### Capacitor Integration
For native mobile app features:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init

# Add platforms
npx cap add ios
npx cap add android
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow coding standards and conventions
4. **Test thoroughly**: Ensure all tests pass
5. **Commit changes**: Use conventional commit messages
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe changes and testing done

## 📚 API Integration

The application integrates with the HyperLocal Marketplace backend services:

- **User Service** (Port 8001): Authentication and user management
- **Seller Service** (Port 8002): Shop and inventory management
- **Customer Service** (Port 8003): Shop discovery and browsing
- **Catalog Service** (Port 8004): Product catalog management
- **Admin Service** (Port 8005): Administrative operations

For backend setup and API documentation, see the [backend repository](https://github.com/Vivek8968/hyperlocalbymanus).

## 🔒 Security

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token refresh before expiration
- **Route Protection**: Role-based route protection

### Data Security
- **Input Validation**: Client-side validation with server-side verification
- **HTTPS Only**: Enforce HTTPS in production

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **React Query**: For excellent data fetching and caching
- **TypeScript**: For type safety and developer experience

---

For more information, please refer to the [backend repository](https://github.com/Vivek8968/hyperlocalbymanus) for API documentation and setup instructions.