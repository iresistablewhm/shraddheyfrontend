#!/bin/bash

# GitHub Repository Setup Script for shraddheyfrontend
# Run this script after creating the repository on GitHub

echo "🚀 Setting up GitHub repository for HyperLocal Frontend..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the hyperlocal-frontend directory"
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

# Repository name
REPO_NAME="shraddheyfrontend"

echo "📝 Repository details:"
echo "   Username: $GITHUB_USERNAME"
echo "   Repository: $REPO_NAME"
echo "   URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git branch -M main
fi

# Check if there are any commits
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "📦 Creating initial commit..."
    git add .
    git commit -m "feat: Complete production-ready HyperLocal Marketplace frontend

✨ Features:
- Role-based authentication (Customer, Seller, Admin)
- Progressive Web App (PWA) with offline capabilities
- Geolocation integration for shop discovery
- Responsive mobile-first design with Tailwind CSS
- React Query for efficient data fetching and caching
- TypeScript for type safety
- Feature-based architecture for scalability

🛍️ Customer Features:
- Discover nearby shops based on location
- Search shops and products
- Distance-based filtering
- Mobile-optimized browsing

🏪 Seller Features:
- Comprehensive dashboard with analytics
- Shop management and setup flow
- Product inventory foundation

👑 Admin Features:
- System-wide dashboard
- User management interface

🔧 Technical:
- Microservices API integration (5 backend services)
- JWT authentication with token refresh
- Error boundaries and loading states
- Code splitting and lazy loading
- PWA manifest and service worker
- Mobile app export ready (React Native Web/Capacitor)

📱 PWA Ready:
- Installable on mobile devices
- Offline functionality
- App-like experience
- Push notification infrastructure

🚀 Production Ready:
- Environment-based configuration
- Security best practices
- Performance optimizations
- Comprehensive documentation"
fi

# Add remote repository
echo "🔗 Adding remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Check if repository exists
echo "🔍 Checking if repository exists..."
if curl -s -f -o /dev/null "https://api.github.com/repos/$GITHUB_USERNAME/$REPO_NAME"; then
    echo "✅ Repository exists!"
    
    # Ask if user wants to push
    read -p "Do you want to push the code now? (y/n): " PUSH_NOW
    
    if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
        echo "📤 Pushing code to GitHub..."
        
        # Check if user has GitHub token
        read -p "Do you have a GitHub personal access token? (y/n): " HAS_TOKEN
        
        if [ "$HAS_TOKEN" = "y" ] || [ "$HAS_TOKEN" = "Y" ]; then
            read -s -p "Enter your GitHub token: " GITHUB_TOKEN
            echo
            
            # Update remote URL with token
            git remote set-url origin https://$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git
        fi
        
        # Push to main branch
        if git push -u origin main; then
            echo "🎉 Successfully pushed to GitHub!"
            echo "🌐 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
            echo "📱 Live Demo: Deploy to Netlify/Vercel for live preview"
        else
            echo "❌ Failed to push. Please check your credentials and try again."
            echo "💡 Manual push command:"
            echo "   git push -u origin main"
        fi
    else
        echo "💡 To push manually, run:"
        echo "   git push -u origin main"
    fi
else
    echo "❌ Repository not found. Please create it first:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: $REPO_NAME"
    echo "   3. Description: Production-ready React TypeScript frontend for HyperLocal Marketplace"
    echo "   4. Make it Public"
    echo "   5. Do NOT initialize with README, .gitignore, or license"
    echo "   6. Click 'Create repository'"
    echo "   7. Run this script again"
fi

echo
echo "📚 Next steps:"
echo "   1. Set up branch protection rules"
echo "   2. Configure GitHub Pages (optional)"
echo "   3. Add repository topics for discoverability"
echo "   4. Deploy to Netlify/Vercel for live demo"
echo "   5. Start the backend services for full functionality"
echo
echo "📖 Documentation:"
echo "   - README.md: Complete setup guide"
echo "   - FEATURES.md: Feature overview"
echo "   - DEPLOYMENT.md: Production deployment"
echo "   - PROJECT_SUMMARY.md: Project summary"
echo
echo "🎯 The frontend is production-ready and waiting for your backend integration!"