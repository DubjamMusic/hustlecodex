# Virtual Boardroom - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. GitHub account with this repository
2. Vercel account (free tier works perfectly)
3. IONOS domain configured (optional, for custom domain)

---

## Method 1: Deploy via Vercel Dashboard (Easiest - 2 minutes)

### Step 1: Connect Repository to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select this repository: `DubjamMusic/hustlecodex`
4. Click "Import"

### Step 2: Configure Project

Vercel will auto-detect Next.js. Use these settings:

**Framework Preset:** Next.js
**Root Directory:** `./` (leave as default)
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

### Step 3: Environment Variables

Click "Environment Variables" and add:

```
ADMIN_CODE=your-secure-admin-password
NODE_ENV=production
```

**Important:** Replace `your-secure-admin-password` with a strong password for admin operations.

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a live URL like: `https://hustlecodex-xyz.vercel.app`

---

## Method 2: Deploy via Vercel CLI (For Developers)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd /path/to/hustlecodex
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time) or **Y** (subsequent deploys)
- What's your project's name? **hustlecodex**
- In which directory is your code located? **.**
- Want to override settings? **N**

### Step 4: Set Environment Variables

```bash
vercel env add ADMIN_CODE production
# Enter your admin password when prompted

vercel env add NODE_ENV production
# Enter: production
```

---

## Method 3: Automatic Deploys (Recommended for 24/7 Live)

### Enable Automatic Deployments

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Git → Connect Git Branch
3. Enable **"Automatic Deployments"**
4. Now every push to `main` or your PR branch auto-deploys

**Result:** Your app is live 24/7 and auto-updates with every commit! ✅

---

## 🌐 Custom Domain Setup with IONOS

### Step 1: Configure in Vercel

1. Go to your project in Vercel Dashboard
2. Settings → Domains
3. Click "Add Domain"
4. Enter your domain: `hustlecodex.com` (or your IONOS domain)

### Step 2: Configure DNS in IONOS

Vercel will provide DNS records. Add these in IONOS DNS settings:

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

**Option B: Using CNAME (Alternative)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Wait for DNS Propagation

- DNS propagation takes 5-48 hours (usually < 1 hour)
- Check status: `https://dnschecker.org`
- Vercel will auto-issue SSL certificate

### Step 4: Verify

Once propagated, access your app at:
- `https://hustlecodex.com`
- `https://www.hustlecodex.com`

---

## 🔧 Configuration Files

The following files are already configured for Vercel:

✅ `vercel.json` - Vercel deployment configuration
✅ `.vercelignore` - Files to exclude from deployment
✅ `next.config.js` - Next.js configuration (uses defaults)
✅ `package.json` - Build scripts defined

---

## 📊 Deployment Checklist

Before deploying, ensure:

- [x] All code changes committed and pushed
- [x] `npm run build` succeeds locally
- [x] Environment variables configured (ADMIN_CODE)
- [x] Git repository connected to Vercel
- [x] Domain DNS configured (if using custom domain)

---

## 🚨 Troubleshooting

### Build Fails on Vercel

**Check build logs in Vercel Dashboard**

Common issues:
1. **Missing dependencies:** Run `npm install` locally first
2. **Environment variables:** Ensure ADMIN_CODE is set
3. **TypeScript errors:** Run `npm run build` locally to catch errors

### Domain Not Working

1. **Check DNS propagation:** Use [https://dnschecker.org](https://dnschecker.org)
2. **Verify DNS records:** Ensure A/CNAME records point to Vercel
3. **Check SSL:** Vercel auto-issues SSL, may take 24 hours
4. **Clear cache:** Try incognito mode or different device

### API Routes Not Working

1. **Check function logs:** Vercel Dashboard → Functions → Logs
2. **Verify environment variables:** Settings → Environment Variables
3. **Check API route syntax:** Ensure proper Next.js API route structure

---

## 🎯 Testing Your Deployment

### Test API Endpoints

Once deployed, test the Virtual Boardroom API:

```bash
# Replace with your actual Vercel URL
VERCEL_URL="https://hustlecodex.vercel.app"

# Test leaderboard
curl "${VERCEL_URL}/api/agents/leaderboard"

# Test execution (Team Alpha vs Omega)
curl -X POST "${VERCEL_URL}/api/agents/execute" \
  -H "Content-Type: application/json" \
  -d '{"directive": "Test deployment"}'

# Test execution with Team Ultimate
curl -X POST "${VERCEL_URL}/api/agents/execute" \
  -H "Content-Type: application/json" \
  -d '{"directive": "Test deployment", "includeUltimate": true}'
```

### Expected Response

You should see JSON responses with:
- `success: true`
- Team outputs and performances
- Moderator judgment
- Validation reports

---

## 🔐 Security Notes

**Important Security Steps:**

1. **Change ADMIN_CODE:** Never use default values
2. **Environment Variables:** Store sensitive data in Vercel environment variables, NOT in code
3. **Rate Limiting:** Consider adding rate limiting in production
4. **HTTPS:** Vercel provides free SSL - always use HTTPS URLs
5. **API Authentication:** Currently uses admin code for privileged operations

---

## 💰 Vercel Pricing

**Free Tier (Hobby):**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Serverless Functions (100 GB-Hours/month)
- ✅ Perfect for this project!

**Pro Tier ($20/month):**
- Higher limits
- Team collaboration features
- Custom deployment regions

For hustlecodex, **Free Tier is sufficient** for 24/7 access.

---

## 📱 Accessing Your Live App

After deployment, access the Virtual Boardroom at:

**Vercel URL:** `https://hustlecodex-xyz.vercel.app` (Vercel assigns this)
**Custom Domain:** `https://hustlecodex.com` (after DNS setup)

**Available 24/7 worldwide! 🌍**

---

## 🔄 Continuous Deployment

With automatic deployments enabled:

1. Make code changes locally
2. Commit and push to GitHub
3. Vercel automatically detects the push
4. Builds and deploys new version
5. Live site updates in 2-3 minutes

**Zero downtime updates! ✅**

---

## 📞 Support

**Vercel Support:**
- Documentation: [https://vercel.com/docs](https://vercel.com/docs)
- Support: [https://vercel.com/support](https://vercel.com/support)

**IONOS Support:**
- DNS Settings: Log into IONOS Control Panel → Domains → DNS
- Support: [https://www.ionos.com/help](https://www.ionos.com/help)

---

## ✅ Summary

To deploy hustlecodex live on Vercel with 24/7 access:

1. ✅ **Connect GitHub repo to Vercel** (2 minutes)
2. ✅ **Configure environment variables** (ADMIN_CODE)
3. ✅ **Click Deploy** → Get live URL instantly
4. ✅ **Optional:** Connect IONOS domain for custom URL
5. ✅ **Enable automatic deployments** → Always up-to-date

**Result:** Your Virtual Boardroom is live at `hustlecodex.vercel.app` or your custom domain, accessible 24/7! 🚀

---

## Next Steps

After deployment:
1. Share your live URL with stakeholders
2. Test all API endpoints in production
3. Monitor usage in Vercel Dashboard
4. Set up custom domain (if desired)
5. Enjoy your live Virtual Boardroom! 🎉
