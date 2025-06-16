# HyperLocal Frontend - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend services running (see [backend repository](https://github.com/Vivek8968/hyperlocalbymanus))

### Local Development

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd hyperlocal-frontend
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.development
   # Edit .env.development with your backend URLs
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🌐 Production Deployment

### Environment Variables

Create `.env.production` with your production backend URLs:

```env
REACT_APP_USER_SERVICE_URL=https://your-api.com:8001
REACT_APP_SELLER_SERVICE_URL=https://your-api.com:8002
REACT_APP_CUSTOMER_SERVICE_URL=https://your-api.com:8003
REACT_APP_CATALOG_SERVICE_URL=https://your-api.com:8004
REACT_APP_ADMIN_SERVICE_URL=https://your-api.com:8005

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_production_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_production_domain
REACT_APP_FIREBASE_PROJECT_ID=your_production_project_id
# ... other Firebase config
```

### Build for Production

```bash
npm run build
```

### Deployment Options

#### 1. Netlify (Recommended)
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`
- Add environment variables in Netlify dashboard

#### 2. Vercel
- Import project from GitHub
- Vercel auto-detects React configuration
- Add environment variables in Vercel dashboard

#### 3. AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload to S3 bucket
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### 4. Docker Deployment
```dockerfile
# Dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📱 Mobile App Export

### React Native Web Setup
```bash
# Install React Native Web dependencies
npm install react-native-web react-native-vector-icons

# Configure Metro bundler
npx react-native init HyperLocalMobile
# Copy src/ folder and adapt for React Native
```

### Capacitor Setup (Recommended)
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init HyperLocal com.hyperlocal.app

# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run build
npx cap sync

# Open in native IDEs
npx cap open ios
npx cap open android
```

## 🔧 Configuration

### Backend Integration

The frontend expects these backend services to be running:

- **User Service** (Port 8001): Authentication and user management
- **Seller Service** (Port 8002): Shop and inventory management  
- **Customer Service** (Port 8003): Shop discovery and browsing
- **Catalog Service** (Port 8004): Product catalog management
- **Admin Service** (Port 8005): Administrative operations

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication with Phone and Google providers
3. Get configuration from Firebase Console
4. Update environment variables

### CORS Configuration

Ensure your backend services allow requests from your frontend domain:

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔒 Security Checklist

### Production Security
- [ ] Enable HTTPS only
- [ ] Set secure environment variables
- [ ] Configure proper CORS origins
- [ ] Enable CSP headers
- [ ] Set up error monitoring (Sentry)
- [ ] Configure rate limiting on backend
- [ ] Enable Firebase App Check
- [ ] Set up proper JWT token expiration

### Environment Variables Security
- [ ] Never commit `.env` files to version control
- [ ] Use different Firebase projects for dev/prod
- [ ] Rotate API keys regularly
- [ ] Use least privilege principle for API access

## 📊 Monitoring & Analytics

### Performance Monitoring
```bash
# Install performance monitoring
npm install @sentry/react @sentry/tracing

# Add to src/index.tsx
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Analytics Setup
```bash
# Install Google Analytics
npm install gtag

# Add to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

#### Network Errors
- Verify backend services are running
- Check CORS configuration
- Verify environment variables
- Check browser network tab for specific errors

#### Authentication Issues
- Verify Firebase configuration
- Check Firebase project settings
- Ensure proper redirect URLs are configured
- Verify JWT token format

#### PWA Issues
- Check service worker registration
- Verify manifest.json is accessible
- Ensure HTTPS is enabled in production
- Check browser PWA requirements

### Debug Mode

Enable debug logging in development:

```typescript
// In src/utils/config.ts
export const config = {
  // ... other config
  debug: process.env.NODE_ENV === 'development',
};

// Use throughout the app
if (config.debug) {
  console.log('Debug info:', data);
}
```

## 📈 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Optimization Checklist
- [ ] Enable code splitting for routes
- [ ] Implement lazy loading for images
- [ ] Use React.memo for expensive components
- [ ] Optimize bundle size with tree shaking
- [ ] Enable service worker caching
- [ ] Compress images and assets
- [ ] Use CDN for static assets

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

For deployment issues:
1. Check this deployment guide
2. Review the main README.md
3. Check backend repository documentation
4. Create an issue in the GitHub repository

---

**Note**: This frontend is designed to work with the HyperLocal Marketplace backend. Ensure all backend services are properly configured and running before deploying the frontend.