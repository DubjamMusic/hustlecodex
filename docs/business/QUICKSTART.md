# Quick Start Implementation Guide

**Get Your First Domain Live in 7 Days**

**Version:** 1.0  
**Date:** December 29, 2025  
**Target:** Week 1 Launch

---

## Overview

This guide provides a streamlined path to launching your first domain from the HustleCodeX ecosystem. We recommend starting with the **Documentary Landing (recoveryrpg.info)** as it requires minimal infrastructure while providing immediate value for audience capture.

---

## Day 1: Setup & Planning

### Morning: Infrastructure Setup

**Domain Configuration:**
1. Log into your domain registrar
2. Point `recoveryrpg.info` to Vercel nameservers
3. Verify DNS propagation (use `dig recoveryrpg.info`)

**Vercel Account Setup:**
1. Create Vercel account at vercel.com
2. Connect GitHub account
3. Install Vercel CLI: `npm i -g vercel`

**Development Environment:**
```bash
# Create project directory
mkdir recoveryrpg-landing
cd recoveryrpg-landing

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --app

# Install additional dependencies
npm install react-hook-form @sendgrid/mail zod
```

### Afternoon: Content Planning

**Required Content:**
- Documentary trailer video (YouTube/Vimeo embed)
- Hero headline and subheadline
- 3-5 key documentary highlights
- 2-3 testimonials or quotes
- Email capture lead magnet description
- Social proof (press mentions, view counts)
- Footer links to other ecosystem properties

**Design Assets:**
- Logo (SVG format)
- Hero background image or video
- Documentary poster/thumbnail
- Social media icons
- Favicon

---

## Day 2: Build Landing Page

### Core Page Structure

**Create app/page.tsx:**
```typescript
import Hero from '@/components/Hero'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Testimonials />
      <EmailCapture />
      <Footer />
    </main>
  )
}
```

### Hero Component

**Create components/Hero.tsx:**
```typescript
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          Recovery RPG
        </h1>
        <p className="text-2xl md:text-3xl mb-8">
          From Tagged to Transformed
        </p>
        <a
          href="#watch"
          className="bg-gold hover:bg-gold/80 text-black px-8 py-4 rounded-lg text-xl font-bold transition"
        >
          Watch the Trailer
        </a>
      </div>
    </section>
  )
}
```

### Email Capture Component

**Create components/EmailCapture.tsx:**
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (res.ok) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-r from-blue to-magenta">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
          <p className="text-xl">Check your email for exclusive content.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue to-magenta">
      <div className="container mx-auto max-w-2xl px-4">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Join the Movement
        </h2>
        <p className="text-xl mb-8 text-center">
          Get exclusive updates and early access to the full documentary.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className="w-full px-6 py-4 rounded-lg text-black text-lg"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold/80 text-black px-6 py-4 rounded-lg text-lg font-bold transition"
          >
            Get Early Access
          </button>
        </form>
      </div>
    </section>
  )
}
```

---

## Day 3: Backend API Setup

### Email Capture API

**Create app/api/leads/capture/route.ts:**
```typescript
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }
    
    // Save to database (add your DB logic here)
    // await saveLeadToDatabase(email)
    
    // Send welcome email
    await sgMail.send({
      to: email,
      from: 'hello@recoveryrpg.info',
      subject: 'Welcome to Recovery RPG',
      html: `
        <h1>Welcome to the Movement!</h1>
        <p>Thank you for joining us. You'll be the first to know when the full documentary launches.</p>
        <p>In the meantime, check out our community at <a href="https://recoveryrpg.co.uk">recoveryrpg.co.uk</a></p>
      `
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
```

### Environment Variables

**Create .env.local:**
```bash
SENDGRID_API_KEY=SG.your-api-key-here
DATABASE_URL=postgresql://user:pass@host:5432/documentary
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Day 4: Styling & Polish

### Tailwind Configuration

**Update tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#00d4ff',
        'magenta': '#ff00ff',
        'gold': '#ffd700',
        'dark': '#0a0a0f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
```

### Add Animations

**Create animations.css:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

---

## Day 5: Analytics & SEO

### Google Analytics Setup

**Create app/layout.tsx:**
```typescript
import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Recovery RPG - From Tagged to Transformed',
  description: 'The documentary following real recovery journeys, as featured on BBC Tagged.',
  openGraph: {
    title: 'Recovery RPG',
    description: 'From Tagged to Transformed',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### SEO Optimization

**Create public/robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://recoveryrpg.info/sitemap.xml
```

**Create app/sitemap.ts:**
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://recoveryrpg.info',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

---

## Day 6: Testing & Optimization

### Testing Checklist

**Functionality:**
- [ ] Email capture form submits successfully
- [ ] Welcome email is received
- [ ] Video plays on all devices
- [ ] All links work correctly
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility (Chrome, Safari, Firefox)

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Images optimized (WebP format)
- [ ] Video compressed
- [ ] Fonts preloaded
- [ ] Code minified

**SEO:**
- [ ] Meta tags present
- [ ] Open Graph tags configured
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Schema markup added

### Performance Optimization

**Optimize Images:**
```bash
# Install sharp for image optimization
npm install sharp

# Use Next.js Image component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Recovery RPG"
  width={1920}
  height={1080}
  priority
/>
```

---

## Day 7: Deploy to Production

### Vercel Deployment

**Connect Repository:**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Documentary landing page"

# Push to GitHub
gh repo create recoveryrpg-landing --public --source=. --push
```

**Deploy via Vercel:**
1. Go to vercel.com/new
2. Import your GitHub repository
3. Configure environment variables
4. Click "Deploy"

**Custom Domain:**
1. Go to Project Settings > Domains
2. Add `recoveryrpg.info`
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning (automatic)

### Post-Deployment Verification

**Check List:**
- [ ] Site accessible at recoveryrpg.info
- [ ] HTTPS working (green padlock)
- [ ] Email capture working
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Mobile view correct
- [ ] Load time < 3 seconds

---

## Next Steps

### Week 2: Marketing Launch

**Social Media:**
- Create announcement posts for all platforms
- Share documentary trailer
- Engage with BBC Tagged audience
- Use hashtags: #RecoveryRPG #Tagged #RecoveryJourney

**Email Marketing:**
- Send welcome sequence to captured leads
- Share behind-the-scenes content
- Tease upcoming ecosystem properties

**PR & Outreach:**
- Reach out to recovery-focused publications
- Contact BBC for cross-promotion
- Engage with influencers in recovery space

### Week 3-4: Community Launch

Begin building the Recovery Community (recoveryrpg.co.uk) to provide ongoing value to captured leads and create a sustainable engagement platform.

---

## Troubleshooting

### Common Issues

**Email not sending:**
- Verify SendGrid API key is correct
- Check SendGrid sender authentication
- Review SendGrid activity logs

**Video not playing:**
- Ensure video format is MP4 (H.264 codec)
- Check video file size (< 50MB recommended)
- Consider using YouTube embed as fallback

**Slow load times:**
- Compress images (use TinyPNG or similar)
- Enable Vercel Edge caching
- Lazy load below-the-fold content

**DNS not propagating:**
- Wait 24-48 hours for full propagation
- Clear local DNS cache: `sudo dscacheutil -flushcache`
- Use different DNS checker tools

---

## Resources

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SendGrid API Docs](https://docs.sendgrid.com)

**Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing
- [GTmetrix](https://gtmetrix.com) - Speed analysis
- [PageSpeed Insights](https://pagespeed.web.dev) - Google's performance tool
- [TinyPNG](https://tinypng.com) - Image compression

**Support:**
- HustleCodeX Discord (link TBD)
- GitHub Issues on project repository
- Vercel Support (for deployment issues)

---

## Success Metrics (Week 1)

**Target Goals:**
- 500+ unique visitors
- 100+ email captures (20% conversion rate)
- < 3 second page load time
- 90+ Lighthouse score
- 0 critical bugs

**Tracking:**
- Google Analytics for traffic
- Database for email captures
- Vercel Analytics for performance
- Sentry for error tracking

---

**Congratulations!** You've launched your first domain. This is just the beginning of the HustleCodeX ecosystem journey.

---

**Document Status:** Ready for Use  
**Last Updated:** December 29, 2025  
**Next Update:** After Week 1 launch retrospective
