# Environment Setup Guide

## 🔧 Frontend-Backend Connection Configuration

This guide explains how to connect the React frontend with the FastAPI backend services.

## 📁 Environment Files

### `.env` - Development Configuration
- **Purpose**: Local development with backend running on localhost
- **Backend Services**: Connects to services on ports 8001-8005
- **Usage**: Automatically loaded during `npm start`

### `.env.production` - Production Configuration  
- **Purpose**: Production deployment with live backend
- **Backend Services**: Connects to production API endpoints
- **Usage**: Used during `npm run build` for production

### `.env.example` - Template
- **Purpose**: Template for new developers
- **Usage**: Copy to `.env.development` and customize

## 🚀 Quick Setup

### 1. Backend Setup (Required First)

```bash
# Navigate to backend directory
cd /workspace/hyperlocalbymanus

# Install Python dependencies
pip install -r requirements.txt

# Set up database
# Make sure MySQL is running on port 3306

# Start all backend services
python run_service.py user_service &
python run_service.py seller_service &
python run_service.py customer_service &
python run_service.py catalog_service &
python run_service.py admin_service &
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd /workspace/hyperlocal-frontend

# Install dependencies (if not already done)
npm install

# The .env file is already configured for local development
# Start the frontend
npm start
```

## 🔌 Service Connections

### Backend Services (FastAPI)
| Service | Port | Purpose | Frontend Connection |
|---------|------|---------|-------------------|
| User Service | 8001 | Authentication, User Management | `REACT_APP_USER_SERVICE_URL` |
| Seller Service | 8002 | Shop Management, Products | `REACT_APP_SELLER_SERVICE_URL` |
| Customer Service | 8003 | Shop Discovery, Browsing | `REACT_APP_CUSTOMER_SERVICE_URL` |
| Catalog Service | 8004 | Product Catalog | `REACT_APP_CATALOG_SERVICE_URL` |
| Admin Service | 8005 | Admin Operations | `REACT_APP_ADMIN_SERVICE_URL` |

### Frontend Service
| Service | Port | Purpose |
|---------|------|---------|
| React App | 12000 | User Interface |

## 🌐 Environment Variables Explained

### Core API Configuration
```env
# Base URL for all API calls
REACT_APP_API_BASE_URL=http://localhost

# Individual service URLs
REACT_APP_USER_SERVICE_URL=http://localhost:8001
REACT_APP_SELLER_SERVICE_URL=http://localhost:8002
REACT_APP_CUSTOMER_SERVICE_URL=http://localhost:8003
REACT_APP_CATALOG_SERVICE_URL=http://localhost:8004
REACT_APP_ADMIN_SERVICE_URL=http://localhost:8005
```

### Authentication Configuration
```env
# Firebase settings (for production auth)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Demo mode (works without Firebase)
REACT_APP_DEMO_MODE=false
```

### Feature Flags
```env
# Enable/disable features
REACT_APP_ENABLE_GEOLOCATION=true
REACT_APP_ENABLE_PUSH_NOTIFICATIONS=true
REACT_APP_ENABLE_OFFLINE_MODE=true
REACT_APP_DEBUG=true
```

## 🔄 Development Workflow

### 1. Start Backend Services
```bash
# Option 1: Using Docker (Recommended)
cd /workspace/hyperlocalbymanus
docker-compose up -d

# Option 2: Manual startup
python run_service.py user_service &
python run_service.py seller_service &
python run_service.py customer_service &
python run_service.py catalog_service &
python run_service.py admin_service &
```

### 2. Start Frontend
```bash
cd /workspace/hyperlocal-frontend
npm start
```

### 3. Verify Connection
- Frontend: http://localhost:12000
- Backend Health Check: http://localhost:8001/health (User Service)

## 🐳 Docker Setup (Alternative)

### Using Docker Compose
```bash
# Start backend services
cd /workspace/hyperlocalbymanus
docker-compose up -d

# Frontend will connect to localhost:8001-8005
cd /workspace/hyperlocal-frontend
npm start
```

## 🌍 Production Deployment

### 1. Update Production Environment
```bash
# Copy production template
cp .env.production .env.production.local

# Edit with your production values
nano .env.production.local
```

### 2. Build for Production
```bash
# Build with production environment
npm run build

# Deploy build/ folder to your hosting platform
```

### 3. Production Environment Variables
```env
REACT_APP_API_BASE_URL=https://your-production-api.com
REACT_APP_USER_SERVICE_URL=https://your-production-api.com:8001
# ... other production URLs
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "Network Error" on Login
**Problem**: Frontend can't connect to backend
**Solution**: 
- Verify backend services are running
- Check ports 8001-8005 are accessible
- Verify `.env` file has correct URLs

#### 2. CORS Errors
**Problem**: Browser blocks API requests
**Solution**: 
- Backend should allow frontend origin
- Check FastAPI CORS middleware configuration

#### 3. Authentication Fails
**Problem**: Login doesn't work
**Solution**:
- For development: Set `REACT_APP_DEMO_MODE=true`
- For production: Configure Firebase properly

### Debug Commands
```bash
# Check if backend services are running
curl http://localhost:8001/health
curl http://localhost:8002/health
curl http://localhost:8003/health
curl http://localhost:8004/health
curl http://localhost:8005/health

# Check frontend environment
npm start
# Look for "Environment variables loaded" in console
```

## 📊 Service Health Monitoring

### Health Check Endpoints
```bash
# User Service
curl http://localhost:8001/health

# Seller Service  
curl http://localhost:8002/health

# Customer Service
curl http://localhost:8003/health

# Catalog Service
curl http://localhost:8004/health

# Admin Service
curl http://localhost:8005/health
```

### Expected Response
```json
{
  "status": "healthy",
  "service": "user_service",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🔐 Security Notes

### Development
- `.env` file contains localhost URLs (safe)
- Demo mode bypasses authentication (development only)
- Debug logging enabled

### Production
- Use HTTPS URLs only
- Configure proper Firebase authentication
- Disable debug mode
- Set up proper CORS origins
- Use environment variables in hosting platform

## 📞 Support

### If Backend Services Won't Start
1. Check Python dependencies: `pip install -r requirements.txt`
2. Verify MySQL is running on port 3306
3. Check backend `.env` file configuration
4. Look at service logs for specific errors

### If Frontend Can't Connect
1. Verify backend services are running
2. Check `.env` file URLs
3. Test API endpoints manually with curl
4. Check browser network tab for specific errors

---

**The frontend is now configured to connect with the backend services. Start the backend services first, then the frontend for full functionality.**