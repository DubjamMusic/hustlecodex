#!/bin/bash

# HustleCodeX Repository Cleanup Script
# Removes redundant files and sets up proper directory structure

echo "🧹 Starting HustleCodeX cleanup..."

# Step 1: Remove redundant files
echo "📦 Removing redundant files..."
rm -f files.zip
rm -f globals.css
echo "✅ Removed: files.zip, globals.css"

# Step 2: Create proper directory structure
echo "📁 Creating directory structure..."
mkdir -p public/img
mkdir -p public/products
mkdir -p lib/payments
mkdir -p lib/auth
mkdir -p components/ui
mkdir -p components/marketing
mkdir -p components/products/GoldenGlobe
mkdir -p components/products/CardDesigner
mkdir -p components/products/Marketplace
mkdir -p pages/products
mkdir -p pages/api/payments
mkdir -p pages/api/auth
mkdir -p prisma
echo "✅ Directory structure created"

# Step 3: Move existing components to marketing folder
echo "🔄 Organizing components..."
mv components/ParallaxHero.tsx components/marketing/ 2>/dev/null || echo "ParallaxHero.tsx already in place"
mv components/SupportLevels.tsx components/marketing/ 2>/dev/null || echo "SupportLevels.tsx already in place"
mv components/GameplayCarousel.tsx components/marketing/ 2>/dev/null || echo "GameplayCarousel.tsx already in place"
echo "✅ Components organized"

# Step 4: Download placeholder images (if curl available)
if command -v curl &> /dev/null; then
    echo "🖼️ Downloading placeholder images..."
    curl -s "https://placehold.co/600x400/purple/white/png?text=Give+Miracles" > public/img/give-miracles.jpg
    curl -s "https://placehold.co/600x400/pink/white/png?text=Choose+Rituals" > public/img/choose-rituals.jpg
    curl -s "https://placehold.co/600x400/cyan/black/png?text=Make+Decisions" > public/img/make-decisions.jpg
    echo "✅ Placeholder images created"
else
    echo "⚠️ curl not available - skipping image downloads"
fi

# Step 5: Move index.html to public/products
echo "📄 Moving Golden Globe HTML to public..."
mv index.html public/products/golden-globe.html 2>/dev/null || echo "index.html already moved"
echo "✅ Golden Globe HTML relocated"

# Step 6: Create .env.example for future setup
echo "🔧 Creating .env.example..."
cat > .env.example << 'EOF'
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hustlecodex"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"

# Blockchain (Optional)
THIRDWEB_CLIENT_ID="your-client-id"
WALLET_PRIVATE_KEY="your-private-key"
EOF
echo "✅ .env.example created"

# Step 7: Update .gitignore
echo "🔒 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Environment variables
.env
.env.local
.env.production

# Database
prisma/dev.db
prisma/migrations

# Build artifacts
.next/
out/
build/

# Dependencies
node_modules/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF
echo "✅ .gitignore updated"

echo ""
echo "✨ Cleanup complete! Summary:"
echo "   - Removed 2 redundant files"
echo "   - Created 10+ new directories"
echo "   - Organized existing components"
echo "   - Generated placeholder images"
echo "   - Created .env.example template"
echo ""
echo "📋 Next steps:"
echo "   1. Review ECOSYSTEM_ANALYSIS.md for full strategy"
echo "   2. Update import paths in pages/index.tsx"
echo "   3. Install payment dependencies: npm install stripe @stripe/stripe-js"
echo "   4. Set up Stripe account and add keys to .env"
echo "   5. Deploy to Vercel: vercel --prod"
echo ""
echo "💰 Revenue-ready in ~2 hours of work!"
