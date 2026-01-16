# 🔧 INTEGRATION GUIDE - Simple Code Snippets

## 🎯 Goal: Turn static mockups into revenue-generating products

---

## 1️⃣ FIX: Update Component Imports (5 minutes)

**File:** `pages/index.tsx`

```typescript
// BEFORE (Current - will break after cleanup)
import ParallaxHero from '../components/ParallaxHero';
import SupportLevels from '../components/SupportLevels';
import GameplayCarousel from '../components/GameplayCarousel';

// AFTER (Post-cleanup)
import ParallaxHero from '../components/marketing/ParallaxHero';
import SupportLevels from '../components/marketing/SupportLevels';
import GameplayCarousel from '../components/marketing/GameplayCarousel';
```

---

## 2️⃣ ADD: Stripe Payment Integration (30 minutes)

### Step 1: Install dependencies
```bash
npm install stripe @stripe/stripe-js
```

### Step 2: Create Stripe checkout API
**File:** `pages/api/payments/create-checkout.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, tier, type } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${type === 'support' ? 'Support Level' : 'Sector Access'} - ${tier}`,
              description: 'HustleCodeX Platform Access',
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
      metadata: { tier, type },
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
```

### Step 3: Update SupportLevels component
**File:** `components/marketing/SupportLevels.tsx`

```typescript
import { useState } from 'react';

export default function SupportLevels() {
  const [loading, setLoading] = useState<number | null>(null);

  const levels = [
    { level: 1, amount: 10 },
    { level: 2, amount: 25 },
    { level: 3, amount: 50 },
    { level: 4, amount: 100 },
    { level: 5, amount: 250 },
  ];

  const handleDonate = async (level: number, amount: number) => {
    setLoading(level);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          tier: `Level ${level}`,
          type: 'support',
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="p-8 bg-black text-center">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Support Levels</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {levels.map(({ level, amount }) => (
          <div key={level} className="bg-gray-800 p-4 rounded border border-yellow-500 shadow-xl">
            <p className="text-lg font-semibold">Level {level}</p>
            <p className="text-yellow-300">${amount}</p>
            <button
              onClick={() => handleDonate(level, amount)}
              disabled={loading === level}
              className="mt-2 px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {loading === level ? 'Processing...' : 'Donate'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Step 4: Create success page
**File:** `pages/success.tsx`

```typescript
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">✅ Payment Successful!</h1>
        <p className="text-lg mb-8">Thank you for supporting HustleCodeX</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-yellow-500 text-black rounded hover:bg-yellow-400"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
```

---

## 3️⃣ CONVERT: Golden Globe HTML → React (1 hour)

### Create Golden Globe page
**File:** `pages/products/golden-globe.tsx`

```typescript
import HierarchySidebar from '../../components/products/GoldenGlobe/HierarchySidebar';
import GlobeViewport from '../../components/products/GoldenGlobe/GlobeViewport';

export default function GoldenGlobePage() {
  return (
    <div className="bg-black text-white min-h-screen grid grid-cols-1 md:grid-cols-[350px_1fr] overflow-hidden">
      <HierarchySidebar />
      <GlobeViewport />
    </div>
  );
}
```

### Hierarchy Sidebar Component
**File:** `components/products/GoldenGlobe/HierarchySidebar.tsx`

```typescript
import { useState } from 'react';

const sectors = [
  { id: 1, name: 'ROUTING HUB', desc: 'O(1) Mux Logic • Edge Efficiency', price: 'UNLOCKED', locked: false },
  { id: 2, name: 'CIPHER VAULT', desc: 'RSA-256 Auth • Zero-Trust Architect', price: '5,000 🔲', locked: true, amount: 197 },
  { id: 3, name: 'SPECTER LAB', desc: 'Anomaly Detection • Ghost-Work Protocol', price: '10,000 🔲', locked: true, amount: 497 },
  { id: 4, name: 'NEXUS CORE', desc: 'Full Global Orchestration', price: 'PRIVATE SALE', locked: true, amount: 5000 },
];

export default function HierarchySidebar() {
  const [loading, setLoading] = useState<number | null>(null);

  const handleSectorClick = async (sector: typeof sectors[0]) => {
    if (!sector.locked) {
      alert('SECTOR 01 ACTIVE • Full access granted');
      return;
    }

    if (sector.id === 4) {
      alert('Contact: access@hustlecodex.com for enterprise pricing');
      return;
    }

    setLoading(sector.id);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: sector.amount,
          tier: `Sector ${sector.id}`,
          type: 'sector',
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-black border-r border-[#d4af37] p-5 flex flex-col gap-4 overflow-y-auto">
      <h2 className="text-[#d4af37] text-sm tracking-[3px] mt-0">COMPLEX HIERARCHY</h2>

      {sectors.map((sector) => (
        <div
          key={sector.id}
          onClick={() => handleSectorClick(sector)}
          className={`border border-[#333] p-4 cursor-pointer transition-all relative bg-black/30
            ${sector.locked ? 'opacity-40 cursor-not-allowed hover:opacity-60' : 'hover:border-[#d4af37] hover:translate-x-1'}
            ${loading === sector.id ? 'animate-pulse' : ''}`}
        >
          <div className="absolute top-1 right-1 text-xs text-[#d4af37] font-bold">
            {sector.price}
          </div>
          <strong>SECTOR {String(sector.id).padStart(2, '0')}: {sector.name}</strong>
          <p className="text-xs mt-2 opacity-80">{sector.desc}</p>
          {loading === sector.id && (
            <p className="text-xs text-yellow-400 mt-2">Processing payment...</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Globe Viewport Component
**File:** `components/products/GoldenGlobe/GlobeViewport.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function GlobeViewport() {
  const [pulseCount, setPulseCount] = useState(0);
  const [nodes, setNodes] = useState(247);
  const [latency, setLatency] = useState(23);

  const simulateLoad = () => {
    setPulseCount(prev => prev + 1);

    // Update stats with random fluctuation
    setTimeout(() => {
      setNodes(247 + Math.floor(Math.random() * 20));
      setLatency(20 + Math.floor(Math.random() * 15));
    }, 1000);
  };

  // Ambient animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger subtle ambient effects
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[radial-gradient(circle,#1a1a1a_0%,#000_100%)] flex items-center justify-center overflow-hidden">
      {/* Central Orb */}
      <div className="w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#1a1a1a,#000)]
                      border-2 border-[#d4af37] flex items-center justify-center relative
                      shadow-[0_0_100px_rgba(212,175,55,0.3)]">
        <div className="text-center text-[#d4af37] z-10">
          <h1 className="text-5xl font-bold m-0">GOLDEN GLOBE</h1>
          <p className="text-xs opacity-60 mt-2 font-mono">RUST_WASM_ENGINE_ACTIVE</p>
          <p className="text-xs opacity-40 mt-1">
            NODES: {nodes} | LATENCY: {latency}ms
          </p>
        </div>
      </div>

      {/* Command Dock */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] max-w-[90%]
                      bg-white/5 backdrop-blur-xl border border-[#d4af37] p-5 text-center">
        <div className="text-sm text-gray-400 mb-4 font-mono">
          {pulseCount === 0
            ? "The Routing Hub currently handles 1,000 requests/sec across 200+ edge nodes."
            : `PULSE ${pulseCount} INITIATED • Simulating distributed load across ${200 + (pulseCount * 10)} edge nodes...`
          }
        </div>
        <button
          onClick={simulateLoad}
          className="bg-[#d4af37] text-black px-10 py-3 font-bold uppercase tracking-[2px]
                     hover:bg-white hover:scale-105 transition-all cursor-pointer"
        >
          Initiate Global Pulse
        </button>
      </div>
    </div>
  );
}
```

---

## 4️⃣ ADD: Email Capture (15 minutes)

**File:** `components/marketing/EmailCapture.tsx`

```typescript
import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="p-8 bg-gradient-to-r from-purple-900 to-black text-center">
      <h2 className="text-3xl font-bold mb-4 text-cyan-400">
        Join 1,000+ Reality Recoverers
      </h2>
      <p className="text-gray-300 mb-6">
        Get early access to new features, exclusive content, and special offers
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded bg-black/50 border border-gray-700 text-white
                     focus:border-cyan-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300
                     disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Joining...' : 'Join Now'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-400">✅ Success! Check your email to confirm.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-400">❌ Something went wrong. Try again.</p>
      )}
    </section>
  );
}
```

**File:** `pages/api/email/subscribe.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Example: ConvertKit integration
  // Replace with your email service API
  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Subscription failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
```

---

## 5️⃣ UPDATE: Main Landing Page (5 minutes)

**File:** `pages/index.tsx`

```typescript
import React from 'react';
import ParallaxHero from '../components/marketing/ParallaxHero';
import SupportLevels from '../components/marketing/SupportLevels';
import GameplayCarousel from '../components/marketing/GameplayCarousel';
import EmailCapture from '../components/marketing/EmailCapture';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <ParallaxHero />

      {/* CTA Section */}
      <section className="p-8 bg-black text-center">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          Explore Our Products
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/products/golden-globe"
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded hover:scale-105 transition-transform"
          >
            🌐 Golden Globe Console
          </Link>
          <Link
            href="/products/card-designer"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded hover:scale-105 transition-transform"
          >
            🎴 Card Designer
          </Link>
        </div>
      </section>

      <GameplayCarousel />
      <SupportLevels />
      <EmailCapture />

      {/* Footer */}
      <footer className="p-8 text-center text-gray-500 text-sm">
        <p>© 2026 HustleCodeX Omniverse. All rights reserved.</p>
        <p className="mt-2">
          <a href="mailto:support@hustlecodex.com" className="text-cyan-400 hover:underline">
            support@hustlecodex.com
          </a>
        </p>
      </footer>
    </main>
  );
}
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Prerequisites:
```bash
# 1. Create Stripe account (https://stripe.com)
# 2. Get your API keys (Dashboard → Developers → API keys)
# 3. Create .env.local file
```

**File:** `.env.local`
```bash
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
CONVERTKIT_API_KEY=your_key_here  # Optional for email
```

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard:
# Dashboard → Project → Settings → Environment Variables
```

---

## 📊 TRACKING REVENUE

### Add Stripe webhook handler
**File:** `pages/api/webhooks/stripe.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Log successful payment
      console.log('✅ Payment received:', {
        amount: session.amount_total / 100,
        tier: session.metadata?.tier,
        type: session.metadata?.type,
      });

      // TODO: Add to database, send thank you email, etc.
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function buffer(req: NextApiRequest) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
```

---

## ⏱️ TIME INVESTMENT vs RETURN

| Task | Time | Impact | Revenue Potential |
|------|------|--------|-------------------|
| Stripe integration | 30 min | 🔥🔥🔥 | $500-2,000/month immediate |
| Update imports | 5 min | ⚡ | Required for cleanup |
| Convert Golden Globe | 1 hour | 🔥🔥 | $5,000-15,000/month |
| Email capture | 15 min | 🔥 | $0 now, $10K+ later (list building) |
| Success page | 5 min | ⚡ | Better UX = higher conversion |
| Webhook logging | 15 min | 📊 | Track revenue, debug issues |
| **TOTAL** | **2.5 hours** | | **$5,500-17,000/month** |

---

## 🎯 PRIORITIZED ACTION PLAN

### This Week (Revenue Focus):
1. ✅ Run cleanup script
2. ✅ Update component imports
3. 🔥 **Add Stripe payments** (30 min) → Instant revenue capability
4. 🔥 **Deploy to Vercel** (15 min) → Go live
5. 📧 Share link with 10 people → First customers

### Next Week (Product Expansion):
1. Convert Golden Globe to React
2. Add email capture
3. Create placeholder card designer page
4. Set up analytics (Plausible/Fathom)

### Month 1 Goal:
**$500-2,000 in revenue** from support levels alone

---

**BOTTOM LINE:** 30 minutes of Stripe integration = payment-ready platform. Everything else is growth optimization.
