# GOLDEN GLOBE | NEXT.JS DEPLOYMENT GUIDE

## 🚀 QUICK DEPLOY (60 SECONDS)

### Method 1: Vercel (Recommended - Zero Config)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Or deploy to production directly
vercel --prod
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

## 🏗️ BUILD & TEST

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

### 3. Payment Integration

**Gumroad Quick Setup:**
```html
<script src="https://gumroad.com/js/gumroad.js"></script>
<a class="gumroad-button" href="https://yourname.gumroad.com/l/sector-unlock">
  Unlock Premium Sectors
</a>
```

**Stripe Integration:**
- Add `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` to environment
- Install `@stripe/stripe-js` package
- Create checkout API route

### 4. Monitoring

**Vercel Analytics (Built-in):**
- Automatically tracks Core Web Vitals
- Real user monitoring
- No configuration needed

**External Options:**
- Sentry for error tracking
- LogRocket for session replay
- Datadog for APM

## 🔄 CONTINUOUS DEPLOYMENT

**Automatic Deployment Triggers:**
- ✅ Push to `main` branch → Production
- ✅ Push to `develop` branch → Preview
- ✅ Pull requests → Preview URLs
- ✅ Environment variables → Auto-sync

**Branch Configuration:**
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": true
    }
  }
}
```

## 📊 PERFORMANCE METRICS

**Expected Lighthouse Scores:**
- Performance: 95-100
- Accessibility: 90-95
- Best Practices: 100
- SEO: 100

**Core Web Vitals Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🐳 DOCKER DEPLOYMENT (Advanced)

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS builder
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t golden-globe .
docker run -p 3000:3000 golden-globe
```

## 🔐 SECURITY BEST PRACTICES

1. **Environment Variables:**
   - Never commit `.env.local`
   - Use Vercel Environment Variables UI
   - Rotate secrets regularly

2. **Dependencies:**
   - Run `npm audit` regularly
   - Update packages monthly
   - Use `npm audit fix` for patches

3. **Headers:**
   - All security headers configured
   - CORS policies defined
   - Content Security Policy ready (uncomment in vercel.json)

## 📱 MOBILE OPTIMIZATION

**Already Implemented:**
- Responsive grid layout (stacks on mobile)
- Touch-optimized interactions
- Smaller globe on mobile (250px vs 400px)
- Optimized font sizes
- Reduced animation complexity on mobile

## 🚨 TROUBLESHOOTING

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Type Errors:**
```bash
npm run type-check
```

**Styling Issues:**
```bash
# Regenerate Tailwind
npx tailwindcss -i ./globals.css -o ./output.css
```

**Deployment Issues:**
```bash
# Check Vercel logs
vercel logs <deployment-url>
```

## 📚 ADDITIONAL RESOURCES

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Best Practices](https://nextjs.org/docs/basic-features/best-practices)
- [Web Performance Guide](https://web.dev/performance/)

---

**DEPLOYMENT STATUS:** ✅ Production Ready  
**ESTIMATED DEPLOYMENT TIME:** 60 seconds (Vercel)  
**TECH STACK:** Next.js 15 + React 18 + TypeScript + Tailwind CSS  
**HOSTING RECOMMENDATION:** Vercel (optimal for Next.js)

## 🎉 QUICK START COMMAND

```bash
# One-line deployment
npm install && npm run build && vercel --prod
```

**Live in 60 seconds. No configuration required.**

