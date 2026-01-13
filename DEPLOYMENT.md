# GOLDEN GLOBE | NEXT.JS DEPLOYMENT GUIDE

## 🚀 QUICK DEPLOY (60 SECONDS)

### Method 1: Vercel (Recommended - Zero Config)

## ⚡ QUICK START: Deploy to Vercel in 5 Minutes

**Before You Start:**
1. Have your Stripe account ready (https://stripe.com)
2. Get your Stripe Secret Key and Price ID
3. Have your GitHub repository accessible

**Deployment Steps:**
1. Go to https://vercel.com/new
2. Import the `DubjamMusic/hustlecodex` repository
3. Keep Framework as **Next.js** and Root Directory as `./`
4. Add environment variables (see details below)
5. Click **Deploy** and wait ~2 minutes
6. Your app is live at `*.vercel.app`!

---

## 🚀 LIVE DEPLOYMENT OPTIONS

### OPTION A: Vercel (Recommended for Next.js Projects)

#### Step 1: Import Repository
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `DubjamMusic/hustlecodex`
4. Click "Import"

#### Step 2: Configure Project Settings

**Framework Preset:**
- **Framework:** Next.js (auto-detected - leave as default)
- **Root Directory:** `./` (keep as default since the project is at repository root)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

> ⚠️ **Important:** Do NOT change the framework preset or root directory settings. The project structure is already correctly configured for Next.js deployment at the repository root.

#### Step 3: Configure Environment Variables

If there are any placeholder variables (like `EXAMPLE_NAME`), delete them. Then add the following required environment variables:

**Required for Stripe Integration (Golden Globe Console):**
- `STRIPE_SECRET_KEY`: Your Stripe secret key (format: `sk_live_...` for production or `sk_test_...` for testing)
  - Get from: https://dashboard.stripe.com/apikeys
  - Used for: Creating checkout sessions and processing payments
  
- `STRIPE_PRICE_ID_GOLDEN_GLOBE`: The Stripe Price ID for the Golden Globe product
  - Get from: https://dashboard.stripe.com/products
  - Format: `price_...`
  - Used for: Linking payments to specific product tiers

**Optional for Email Marketing (ConvertKit Integration):**
- `CONVERTKIT_API_KEY`: Your ConvertKit API key
  - Get from: https://app.convertkit.com/account_settings/advanced_settings
  - Only required if enabling mailing list sign-ups
  
- `CONVERTKIT_API_SECRET`: Your ConvertKit API secret
  - Get from: https://app.convertkit.com/account_settings/advanced_settings
  - Only required if enabling mailing list sign-ups

**Optional Client-Side Variables:**
- `NEXT_PUBLIC_APP_URL`: Your production domain URL (e.g., `https://hustlecodex.com`)
  - Used for: Client-side API calls, redirects, and absolute URLs
  - Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

**How to Add Variables:**
1. Click "Add Another" for each environment variable
2. Enter the **Key** (variable name) and **Value** (your secret key)
3. Select environment: **Production**, **Preview**, and **Development** (recommended for all)
4. Click "Add" to save each variable

> 💡 **Tip:** You can also click "Import .env" if you have a `.env.local` file, but ensure you don't commit real secrets to Git. Vercel will securely import the values.

> ⚠️ **Security Warning:** Never use placeholder values like `"your-key-here"` or `"placeholder"` in production. These will cause runtime errors when the payment system attempts to connect to Stripe.

#### Step 4: Deploy
1. Review your configuration
2. Click **Deploy** at the bottom of the page
3. Vercel will:
   - Install dependencies (`npm install`)
   - Build your Next.js app (`npm run build`)
   - Deploy to a `*.vercel.app` URL
4. Deployment typically completes in 1-2 minutes

#### Step 5: Post-Deployment (Optional)
- **Custom Domain:** Go to Project Settings → Domains to add your custom domain
- **Analytics:** Enable Vercel Analytics in Project Settings → Analytics
- **Monitoring:** Enable Vercel Speed Insights for performance tracking

#### Alternative: CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Or deploy to production directly
vercel --prod
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Note: You'll still need to add environment variables in the Vercel dashboard:
# Dashboard → Project → Settings → Environment Variables
```

**What happens automatically:**
- ✅ Detects Next.js configuration
- ✅ Installs dependencies
- ✅ Runs production build
- ✅ Deploys to global CDN
- ✅ Generates live URL instantly
- ✅ SSL certificate auto-provisioned

### Method 2: GitHub Integration (Continuous Deployment)

1. Push code to GitHub repository
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Click "Deploy" (zero configuration needed)
5. Every push to main branch auto-deploys

### Method 3: Netlify Alternative

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

## 📋 PRE-DEPLOYMENT CHECKLIST

✅ **Dependencies Updated**: All packages patched for security vulnerabilities  
✅ **Environment Variables**: `.env.example` provided for configuration  
✅ **Production Config**: `next.config.js` optimized for performance  
✅ **Security Headers**: `vercel.json` includes security best practices  
✅ **SEO Ready**: Meta tags, Open Graph, and robots.txt configured  
✅ **Error Handling**: Custom 404 page with prestige theme  
✅ **TypeScript**: Full type safety enabled  
✅ **Responsive Design**: Mobile-first with breakpoints

## 🔧 ENVIRONMENT SETUP

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Key Variables:**
- `NEXT_PUBLIC_SITE_URL`: Your production domain
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking (optional)
- `NEXT_PUBLIC_GUMROAD_ID`: Payment integration (optional)

## 🛠️ LOCAL DEVELOPMENT

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Development Features:**
- ⚡ Fast Refresh enabled
- 🔥 Hot Module Replacement
- 📊 Built-in analytics ready
- 🎨 Tailwind JIT compilation
## 🌐 MULTI-CHANNEL DISTRIBUTION PLAN

### HustleCodeX Ecosystem

```
HustleCodeX Ecosystem
├── 🎮 Gamified Recovery (Progress tracking)
├── 🤝 Community Platform (Connection)
├── 🛠️ Resource Hub (Tools & guides)
├── 💼 Skills Marketplace (Opportunities)
├── 🤖 Nexus AI (Personalized support)
├── 💳 Card Designer (Revenue stream)
└── 🎫 Membership NFTs (Access & ownership)
```

### Distribution Channels

**Core Platform Components:**
- **Gamified Recovery** - Interactive progress tracking system with achievements and milestones
- **Community Platform** - Connect with peers, share experiences, and build support networks
- **Resource Hub** - Comprehensive collection of tools, guides, and educational materials
- **Skills Marketplace** - Discover opportunities and monetize your skills
- **Nexus AI** - AI-powered personalized support and guidance
- **Card Designer** - Custom card creation tool for revenue generation
- **Membership NFTs** - Blockchain-based access control and ownership

**Multi-Channel Strategy:**
1. Web Platform (Primary deployment)
2. Mobile Progressive Web App (PWA)
3. API distribution for third-party integrations
4. White-label solutions for partner organizations
5. Embedded widgets for external websites

## 📊 VALIDATION CHECKLIST

### Pre-Deployment Checklist
✅ Next.js project structure verified  
✅ `package.json` with required dependencies  
✅ Stripe account created and API keys obtained  
✅ Environment variables documented  
✅ `.gitignore` includes `.env.local` and `.env`  
✅ Payment integration code implemented (see INTEGRATION_GUIDE.md)

### Deployment Configuration Checklist
✅ Framework preset: **Next.js** (auto-detected)  
✅ Root directory: `./` (repository root)  
✅ Build command: `npm run build` (default)  
✅ Environment variables added:
   - `STRIPE_SECRET_KEY` (required)
   - `STRIPE_PRICE_ID_GOLDEN_GLOBE` (required)
   - `CONVERTKIT_API_KEY` (optional)
   - `CONVERTKIT_API_SECRET` (optional)
   - `NEXT_PUBLIC_APP_URL` (recommended)

### Post-Deployment Validation
✅ Site loads successfully at Vercel URL  
✅ All pages render correctly  
✅ Payment flow works with Stripe test cards  
✅ Environment variables are accessible in API routes  
✅ No console errors in browser  
✅ Mobile responsive layout verified  
✅ SSL certificate active (HTTPS)

### Testing Stripe Integration
Use these test cards from Stripe:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code  

## 🏗️ BUILD & TEST

### Development Server Setup

```bash
# 1. Clone the repository
git clone https://github.com/DubjamMusic/hustlecodex.git
cd hustlecodex

# 2. Install dependencies
npm install

# 3. Create .env.local file with your environment variables
# (See "Environment Variables Reference" section below)
cat > .env.local << 'EOF'
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PRICE_ID_GOLDEN_GLOBE=price_YOUR_PRICE_ID_HERE
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# 4. Run development server
npm run dev
# Open: http://localhost:3000

# 5. Test production build locally (optional)
npm run build
npm start
# Open: http://localhost:3000
```

### Testing Checklist

**Homepage Tests:**
- [ ] Hero section loads with parallax effects
- [ ] Support levels display correctly
- [ ] Gameplay carousel works
- [ ] Email capture form is functional

**Golden Globe Console Tests:**
- [ ] Navigate to `/products/golden-globe`
- [ ] Sector hierarchy displays
- [ ] Sector 01 shows as unlocked
- [ ] Sectors 02-04 show lock icons and prices
- [ ] Click locked sector → redirects to Stripe checkout
- [ ] Use test card: `4242 4242 4242 4242` to complete payment
- [ ] After payment → redirect to success page

**API Route Tests:**
- [ ] `/api/payments/create-checkout` responds correctly
- [ ] `/api/email/subscribe` (if ConvertKit configured)
- [ ] No CORS errors in browser console

## 🔐 ENVIRONMENT VARIABLES REFERENCE

### Complete List of Environment Variables

Create a `.env.local` file for local development (never commit to Git):

```bash
# Type checking
npm run type-check

# Production build
npm run build

# Test production locally
npm start

# Static export (optional)
npm run export
```

**Build Output:**
- Optimized JavaScript bundles
- CSS minification with Tailwind
- Image optimization ready
- Standalone mode for Docker deployment

## 📈 PRODUCTION OPTIMIZATIONS

### Included Out-of-the-Box:

1. **Performance:**
   - SWC compiler (faster than Babel)
   - Automatic code splitting
   - Image optimization pipeline
   - Font optimization (Google Fonts)
   - Compression enabled

2. **Security:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - Powered-by header removed

3. **SEO:**
   - Semantic HTML structure
   - Meta descriptions per page
   - Open Graph tags for social sharing
   - Twitter Card integration
   - Dynamic robots.txt

4. **Caching:**
   - Static assets: 1 year cache
   - Fonts: Immutable cache
   - API routes: Custom cache control

## 🎯 POST-DEPLOYMENT TASKS

### 1. Domain Configuration

```bash
# Add custom domain in Vercel dashboard
vercel domains add prestige.hustlecodex.com

# Or via CLI
vercel alias set <deployment-url> prestige.hustlecodex.com
```

### 2. Analytics Integration (Optional)

**Google Analytics:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Plausible (Privacy-friendly):**
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=prestige.hustlecodex.com
```

Add to `pages/_app.tsx`:
```tsx
import Script from 'next/script';

// In component
<Script src="https://plausible.io/js/script.js" data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} />
```
# Stripe Configuration (Required for payments)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PRICE_ID_GOLDEN_GLOBE=price_YOUR_PRICE_ID_HERE

# ConvertKit Configuration (Optional - for email marketing)
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_API_SECRET=your_api_secret_here

# Public Variables (Exposed to browser)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your production URL when deploying

# Stripe Webhook (Optional - for production webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Additional Stripe Products (Optional - if you have multiple products)
STRIPE_PRICE_ID_SUPPORT_LEVEL_1=price_...
STRIPE_PRICE_ID_SUPPORT_LEVEL_2=price_...
```

### Where to Get Your Keys

**Stripe Keys:**
1. Sign up at https://stripe.com
2. Go to Dashboard → Developers → API keys
3. Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for production)
4. For Price IDs: Dashboard → Products → Select product → Copy Price ID

**ConvertKit Keys:**
1. Sign up at https://convertkit.com
2. Go to Settings → Advanced → API Keys
3. Copy your API Key and API Secret

**Stripe Webhook Secret (for production webhooks):**
1. Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy the webhook signing secret

### Security Best Practices

✅ **DO:**
- Use test keys (`sk_test_...`) during development
- Use live keys (`sk_live_...`) only in production
- Add all environment variables in Vercel dashboard
- Keep `.env.local` in `.gitignore`

❌ **DON'T:**
- Never commit `.env.local` or `.env` files to Git
- Never use placeholder values in production
- Never expose secret keys in client-side code
- Never share your secret keys publicly

## 🎯 POST-DEPLOYMENT ACTIONS

1. **Verify Deployment**
   - Test the live URL provided by Vercel
   - Check that environment variables are working (payment flows)
   - Verify all pages load correctly

2. **Analytics Integration**
   - Enable Vercel Analytics (Project Settings → Analytics)
   - Or add Plausible/Fathom script tag in `pages/_app.tsx`
   - Track sector unlock attempts
   - Monitor "Global Pulse" clicks and conversion rates

3. **Payment Gateway Verification**
   - Test checkout flow with Stripe test cards
   - Verify webhook endpoint is receiving events
   - Monitor Stripe Dashboard for successful payments
   - Test both Golden Globe sector purchases and support level donations

4. **Domain Configuration**
   - Go to Vercel Project Settings → Domains
   - Add your custom domain (e.g., `prestige.hustlecodex.com`)
   - Update DNS records as instructed by Vercel
   - SSL certificate auto-provisioned by Vercel
   - Update `NEXT_PUBLIC_APP_URL` environment variable to match production domain

5. **Monitoring Setup**
   - Enable Vercel Speed Insights for performance tracking
   - Set up error tracking (Sentry, LogRocket, or Vercel logs)
   - Configure Stripe webhook monitoring
   - Set up uptime monitoring (UptimeRobot, Pingdom)

### 3. Payment Integration

### Stripe Integration (Already Implemented)

The payment integration is already coded in the project (see `INTEGRATION_GUIDE.md`). You just need to:

1. **Add Environment Variables** in Vercel dashboard
2. **Get your Stripe keys** from https://dashboard.stripe.com/apikeys
3. **Create Products in Stripe:**
   - Golden Globe Sector 02: $197 (recommended)
   - Golden Globe Sector 03: $497 (recommended)
   - Support Level 1-5: $10, $25, $50, $100, $250

### Create Stripe Products

```bash
# Using Stripe CLI (optional)
stripe products create --name "Golden Globe - Sector 02" --description "Cipher Vault Access"
stripe prices create --product <PRODUCT_ID> --unit-amount 19700 --currency usd

# Or use the Stripe Dashboard:
# 1. Go to https://dashboard.stripe.com/products
# 2. Click "Add product"
# 3. Enter name, description, and price
# 4. Copy the Price ID (starts with price_)
# 5. Add to STRIPE_PRICE_ID_GOLDEN_GLOBE in Vercel
```

### Payment Flow Overview

```
User clicks "Unlock Sector" 
  → API route: /api/payments/create-checkout
  → Stripe creates checkout session
  → User redirected to Stripe-hosted checkout page
  → User enters card details on Stripe (secure, PCI compliant)
  → Success → Redirect to /success page
  → Stripe webhook → /api/webhooks/stripe (optional, for fulfillment)
```

### Revenue Tracking

Monitor payments in real-time:
- **Stripe Dashboard:** https://dashboard.stripe.com/payments
- **Webhook Logs:** Vercel → Project → Functions → Logs
- **Analytics:** Enable Vercel Analytics to track conversion funnel

## ❗ TROUBLESHOOTING

### Common Issues

**1. "Stripe API key is invalid" error**
- ✅ Verify `STRIPE_SECRET_KEY` is set correctly in Vercel dashboard
- ✅ Check for extra spaces or quotes in the key
- ✅ Ensure you're using the correct key (test vs. live)
- ✅ Redeploy after adding environment variables

**2. Payment button does nothing / No redirect**
- ✅ Check browser console for errors
- ✅ Verify API route `/api/payments/create-checkout` exists
- ✅ Check Vercel function logs for errors
- ✅ Ensure `STRIPE_PRICE_ID_GOLDEN_GLOBE` is set

**3. "Failed to fetch" error**
- ✅ Check CORS settings (should work by default in Next.js)
- ✅ Verify API route is deployed (check Vercel Functions tab)
- ✅ Check network tab for 404 or 500 errors

**4. Environment variables not working**
- ✅ Environment variables must be set in Vercel dashboard
- ✅ Redeploy after adding new variables (Vercel → Deployments → Redeploy)
- ✅ Don't use quotes around values in Vercel UI
- ✅ Variables prefixed with `NEXT_PUBLIC_` are exposed to browser

**5. Build fails on Vercel**
- ✅ Run `npm run build` locally to reproduce
- ✅ Check Vercel build logs for specific errors
- ✅ Verify all TypeScript files have no errors
- ✅ Ensure all imported components exist

**6. Stripe webhook not receiving events**
- ✅ Add webhook endpoint in Stripe Dashboard
- ✅ URL format: `https://your-domain.vercel.app/api/webhooks/stripe`
- ✅ Select event: `checkout.session.completed`
- ✅ Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
- ✅ Check Vercel function logs for webhook requests

### Getting Help

- **Vercel Support:** https://vercel.com/support
- **Stripe Support:** https://support.stripe.com
- **Project Issues:** https://github.com/DubjamMusic/hustlecodex/issues
- **Email:** support@hustlecodex.com

## 🔧 TECHNICAL SPECIFICATIONS

### Project Details
- **Framework:** Next.js 15.5.8
- **Runtime:** Node.js 18+ (Vercel default)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.3.0
- **Package Manager:** npm
- **Build Output:** Static + SSR hybrid (automatic optimization)

### Performance Metrics
- **Build Time:** ~30-60 seconds on Vercel
- **Cold Start:** <100ms (serverless functions)
- **Page Load Time:** <2s (with Vercel CDN)
- **Browser Support:** All modern browsers (ES6+)
- **Mobile Performance:** 60fps animations on mid-tier devices
- **Bundle Size:** ~150KB (minified + gzipped)

### API Routes
- `/api/payments/create-checkout` - Stripe checkout session creation
- `/api/email/subscribe` - Email list subscription (optional)
- `/api/webhooks/stripe` - Stripe webhook handler (optional)

### Required Ports (Local Development)
- **3000:** Next.js development server
- **9229:** Node.js debugger (optional)

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 11+)

### Accessibility
- ⚠️ ARIA labels needed (Phase 2 enhancement)
- Keyboard navigation support planned
- Screen reader optimization pending

---

## 📝 DEPLOYMENT SUMMARY

**CURRENT STATUS:** Production-ready Next.js application with Stripe integration  
**IMMEDIATE PATH:** Import to Vercel → Configure environment variables → Deploy (5 minutes)  
**REVENUE ACTIVATION:** Add Stripe keys → Create products → Start accepting payments  
**VALIDATION REQUIRED:** Test payment flow with Stripe test cards before going live

### Quick Reference Card

| Action | Time | Tool | Link |
|--------|------|------|------|
| Deploy to Vercel | 5 min | Vercel Dashboard | https://vercel.com/new |
| Get Stripe Keys | 2 min | Stripe Dashboard | https://dashboard.stripe.com/apikeys |
| Create Products | 10 min | Stripe Products | https://dashboard.stripe.com/products |
| Test Payments | 5 min | Test Cards | 4242 4242 4242 4242 |
| Add Custom Domain | 5 min | Vercel Settings | Project → Settings → Domains |

### Next Steps After Deployment

1. ✅ Test the live site thoroughly
2. ✅ Share with beta testers
3. ✅ Monitor Stripe Dashboard for transactions
4. ✅ Set up analytics and tracking
5. ✅ Configure custom domain
6. ✅ Enable HTTPS (automatic with Vercel)
7. ✅ Launch marketing campaign
8. ✅ Monitor performance and conversions

---

**🚀 Ready to deploy? Start at:** https://vercel.com/new

**💬 Questions?** Open an issue at: https://github.com/DubjamMusic/hustlecodex/issues
