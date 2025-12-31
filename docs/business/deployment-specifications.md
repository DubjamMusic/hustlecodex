# Multi-Domain Deployment Specifications

**Technical Implementation Guide for Seven-Domain Ecosystem**

**Version:** 1.0  
**Date:** December 29, 2025  
**Status:** Implementation Ready

---

## Overview

This document provides detailed technical specifications for deploying and managing the seven-domain HustleCodeX ecosystem. Each domain has unique requirements, infrastructure needs, and integration points that must be carefully coordinated to ensure seamless operation.

---

## Domain 1: Hustle Kingdom Game (recoveryrpg.com)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- Game Engine: Phaser 3 or custom Canvas/WebGL
- State Management: Zustand for game state
- Animation: Framer Motion for UI transitions
- Styling: Tailwind CSS with custom game theme

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for user data and progression
- Cache: Redis for real-time game state
- WebSocket: Socket.io for multiplayer features
- Queue: Bull for background job processing

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase or Railway PostgreSQL
- Cache: Upstash Redis
- CDN: Vercel Edge Network
- Monitoring: Vercel Analytics + Sentry

### Deployment Configuration

**Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/hustlekingdom
REDIS_URL=redis://user:pass@host:6379

# Authentication
AUTH_SECRET=<generated-secret>
AUTH_URL=https://recoveryrpg.com

# Game Configuration
GAME_VERSION=1.0.0
MAX_PLAYERS_PER_INSTANCE=100
TICK_RATE=60

# Nexus AI Integration
NEXUS_API_URL=https://api.hustlecodex.com/nexus
NEXUS_API_KEY=<secret-key>

# Analytics
VERCEL_ANALYTICS_ID=<analytics-id>
SENTRY_DSN=<sentry-dsn>
```

**Vercel Configuration (vercel.json):**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1", "sfo1", "lhr1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "REDIS_URL": "@redis-url"
  },
  "headers": [
    {
      "source": "/game/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### Database Schema

**Key Tables:**
- `users` - User accounts and authentication
- `characters` - Player characters and attributes
- `progression` - Level, XP, achievements
- `inventory` - Items, equipment, consumables
- `kingdoms` - Game world and kingdom data
- `sessions` - Active game sessions
- `events` - Game events and logs

### API Endpoints

```
POST   /api/auth/register        - Create new account
POST   /api/auth/login           - Authenticate user
GET    /api/game/state           - Get current game state
POST   /api/game/action          - Submit player action
GET    /api/progression          - Get player progression
POST   /api/progression/level-up - Level up character
GET    /api/inventory            - Get player inventory
POST   /api/inventory/use        - Use inventory item
```

### Performance Targets

- **Page Load:** < 2 seconds (FCP)
- **Game Loop:** 60 FPS consistent
- **API Response:** < 100ms (p95)
- **WebSocket Latency:** < 50ms
- **Uptime:** 99.9%

---

## Domain 2: NFT Founder Passes (hustlecodex.shop)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- Web3: Wagmi + Viem for Ethereum interaction
- Wallet: RainbowKit for wallet connection
- Styling: Tailwind CSS with Web3 components
- Charts: Recharts for price/volume visualization

**Smart Contracts:**
- Language: Solidity 0.8.20+
- Standard: ERC-721A (gas-optimized NFTs)
- Network: Polygon Mainnet
- Tools: Hardhat for development and deployment
- Testing: Chai + Waffle for contract tests

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for off-chain data
- Indexer: The Graph for blockchain data
- IPFS: Pinata or NFT.Storage for metadata
- Queue: Bull for minting queue

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- Blockchain RPC: Alchemy or Infura
- IPFS: Pinata
- Monitoring: Tenderly for smart contracts

### Smart Contract Architecture

**FounderPass.sol:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HustleCodeXFounderPass is ERC721, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant PRICE = 0.1 ether;
    uint256 public totalMinted;
    
    enum PassTier { Bronze, Silver, Gold, Platinum }
    
    mapping(uint256 => PassTier) public passTier;
    mapping(address => bool) public hasMinted;
    
    constructor() ERC721("HustleCodeX Founder Pass", "HCXFP") {}
    
    function mint(PassTier tier) external payable nonReentrant {
        require(totalMinted < MAX_SUPPLY, "Sold out");
        require(msg.value >= PRICE, "Insufficient payment");
        require(!hasMinted[msg.sender], "Already minted");
        
        uint256 tokenId = totalMinted;
        totalMinted++;
        
        passTier[tokenId] = tier;
        hasMinted[msg.sender] = true;
        
        _safeMint(msg.sender, tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked("ipfs://", baseURI, "/", tokenId, ".json"));
    }
}
```

### Deployment Configuration

**Environment Variables:**
```bash
# Blockchain
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/<key>
PRIVATE_KEY=<deployer-private-key>
CONTRACT_ADDRESS=<deployed-contract-address>

# IPFS
PINATA_API_KEY=<api-key>
PINATA_SECRET_KEY=<secret-key>
IPFS_GATEWAY=https://gateway.pinata.cloud

# Database
DATABASE_URL=postgresql://user:pass@host:5432/nftshop

# Web3
NEXT_PUBLIC_ALCHEMY_ID=<alchemy-id>
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_CONTRACT_ADDRESS=<contract-address>
```

### API Endpoints

```
GET    /api/nft/supply           - Get current supply and availability
GET    /api/nft/metadata/:id     - Get NFT metadata
POST   /api/nft/mint             - Initiate minting process
GET    /api/nft/holder/:address  - Get holder information
GET    /api/nft/analytics        - Get collection analytics
```

### Security Considerations

- **Smart Contract Audit:** Complete professional audit before mainnet deployment
- **Multi-sig Wallet:** Use Gnosis Safe for contract ownership
- **Rate Limiting:** Prevent bot attacks during minting
- **Whitelist:** Optional whitelist for early access
- **Emergency Pause:** Implement pausable pattern for emergencies

---

## Domain 3: Digital Asset Store (hustlecodex.store)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- E-commerce: Custom with Stripe integration
- CMS: Sanity for product management
- Search: Algolia for product search
- Styling: Tailwind CSS with e-commerce components

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for orders and customers
- Storage: AWS S3 for digital products
- Payment: Stripe for payment processing
- Email: SendGrid for transactional emails

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- Storage: AWS S3 + CloudFront CDN
- Payment: Stripe
- Monitoring: Vercel Analytics + Stripe Dashboard

### Deployment Configuration

**Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/store

# Stripe
STRIPE_SECRET_KEY=sk_live_<key>
STRIPE_PUBLISHABLE_KEY=pk_live_<key>
STRIPE_WEBHOOK_SECRET=whsec_<secret>

# AWS S3
AWS_ACCESS_KEY_ID=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>
AWS_S3_BUCKET=hustlecodex-digital-assets
AWS_REGION=us-east-1

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<api-token>

# Email
SENDGRID_API_KEY=<api-key>
FROM_EMAIL=store@hustlecodex.com
```

### Product Schema (Sanity)

```javascript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'files',
      title: 'Digital Files',
      type: 'array',
      of: [{ type: 'file' }]
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

### API Endpoints

```
GET    /api/products             - List all products
GET    /api/products/:slug       - Get product details
POST   /api/checkout             - Create checkout session
POST   /api/webhook/stripe       - Handle Stripe webhooks
GET    /api/orders/:id           - Get order details
GET    /api/download/:token      - Download purchased file
```

### Digital Rights Management

**Secure Download System:**
- Generate time-limited, signed download URLs
- Track download attempts per purchase
- Implement download limits (e.g., 5 downloads per purchase)
- Watermark PDFs with purchaser email
- Encrypt sensitive files

---

## Domain 4: Subscription Platform (hustlecodex.online)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- Authentication: NextAuth.js with JWT
- UI Components: Radix UI + Tailwind
- Video: Mux for video streaming
- Styling: Tailwind CSS with members area theme

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for user and content data
- Cache: Redis for session management
- Payment: Stripe Subscriptions
- Email: SendGrid for member communications

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- Cache: Upstash Redis
- Video: Mux for video hosting
- Monitoring: Vercel Analytics + Stripe Dashboard

### Deployment Configuration

**Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/members
REDIS_URL=redis://user:pass@host:6379

# Authentication
NEXTAUTH_URL=https://hustlecodex.online
NEXTAUTH_SECRET=<generated-secret>

# Stripe Subscriptions
STRIPE_SECRET_KEY=sk_live_<key>
STRIPE_PUBLISHABLE_KEY=pk_live_<key>
STRIPE_WEBHOOK_SECRET=whsec_<secret>

# Subscription Plans
BASIC_PRICE_ID=price_<basic-id>
PRO_PRICE_ID=price_<pro-id>
ELITE_PRICE_ID=price_<elite-id>

# Video Streaming
MUX_TOKEN_ID=<token-id>
MUX_TOKEN_SECRET=<token-secret>
```

### Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Basic** | $9.99/mo | Access to basic content library, community forums, monthly live Q&A |
| **Pro** | $29.99/mo | All Basic features + exclusive courses, weekly coaching calls, downloadable resources |
| **Elite** | $99.99/mo | All Pro features + 1-on-1 coaching, priority support, early access to new content |

### API Endpoints

```
POST   /api/auth/signup          - Create new member account
POST   /api/auth/signin          - Sign in existing member
GET    /api/subscription/status  - Get current subscription status
POST   /api/subscription/create  - Create new subscription
POST   /api/subscription/cancel  - Cancel subscription
POST   /api/subscription/update  - Update subscription tier
GET    /api/content              - Get accessible content
POST   /api/webhook/stripe       - Handle subscription webhooks
```

### Churn Prevention Strategy

**Nexus AI Integration:**
- Monitor engagement metrics per user
- Predict churn risk based on activity patterns
- Trigger automated retention campaigns
- Personalize content recommendations
- Offer targeted discounts to at-risk members

---

## Domain 5: Recovery Community (recoveryrpg.co.uk)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- Forum: Custom or Discourse integration
- Real-time: Socket.io for live chat
- Moderation: AI-assisted with human oversight
- Styling: Tailwind CSS with community theme

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for posts and users
- Search: Elasticsearch for content search
- Moderation: OpenAI Moderation API
- Email: SendGrid for notifications

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- Search: Elastic Cloud
- CDN: CloudFlare
- Monitoring: Vercel Analytics

### Deployment Configuration

**Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/community

# Authentication (SSO with main ecosystem)
AUTH_URL=https://auth.hustlecodex.com
AUTH_CLIENT_ID=<client-id>
AUTH_CLIENT_SECRET=<client-secret>

# Moderation
OPENAI_API_KEY=<api-key>
MODERATION_THRESHOLD=0.7

# Search
ELASTICSEARCH_URL=https://elastic.hustlecodex.com
ELASTICSEARCH_API_KEY=<api-key>

# Notifications
SENDGRID_API_KEY=<api-key>
```

### Community Features

**Core Functionality:**
- Discussion forums with categories
- Private messaging between members
- Live chat rooms for real-time support
- Resource library with searchable content
- Events calendar for virtual meetups
- Member profiles and badges

**Moderation Tools:**
- AI-powered content filtering
- User reporting system
- Moderator dashboard
- Ban and timeout capabilities
- Automated spam detection

### API Endpoints

```
GET    /api/posts                - List forum posts
POST   /api/posts                - Create new post
GET    /api/posts/:id            - Get post details
POST   /api/posts/:id/reply      - Reply to post
POST   /api/posts/:id/report     - Report inappropriate content
GET    /api/chat/rooms           - List chat rooms
POST   /api/chat/message         - Send chat message
GET    /api/resources            - Get resource library
```

---

## Domain 6: Affiliate Ecosystem (hustlecodex.info)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- CMS: Contentful or Sanity for blog content
- SEO: Next-SEO for optimization
- Analytics: Google Analytics 4 + custom tracking
- Styling: Tailwind CSS with content theme

**Backend:**
- Runtime: Node.js 20+ with Express
- Database: PostgreSQL for tracking data
- Affiliate: Custom affiliate tracking system
- Email: ConvertKit for email marketing
- Analytics: Custom dashboard for performance

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- CDN: CloudFlare
- Email: ConvertKit
- Monitoring: Google Analytics + custom dashboard

### Deployment Configuration

**Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/affiliate

# CMS
CONTENTFUL_SPACE_ID=<space-id>
CONTENTFUL_ACCESS_TOKEN=<access-token>

# Affiliate Tracking
AFFILIATE_COOKIE_DURATION=30
COMMISSION_RATE=0.15

# Email Marketing
CONVERTKIT_API_KEY=<api-key>
CONVERTKIT_FORM_ID=<form-id>

# Analytics
NEXT_PUBLIC_GA_ID=G-<tracking-id>
```

### Content Strategy

**Content Types:**
- Product reviews and comparisons
- How-to guides and tutorials
- Recovery success stories
- Industry news and trends
- Resource roundups

**SEO Optimization:**
- Keyword research and targeting
- On-page SEO optimization
- Internal linking strategy
- Schema markup for rich snippets
- Regular content updates

### API Endpoints

```
GET    /api/posts                - List blog posts
GET    /api/posts/:slug          - Get post content
POST   /api/affiliate/click      - Track affiliate click
POST   /api/affiliate/conversion - Track conversion
GET    /api/affiliate/stats      - Get affiliate statistics
POST   /api/newsletter/subscribe - Subscribe to newsletter
```

---

## Domain 7: Documentary Landing (recoveryrpg.info)

### Technical Stack

**Frontend:**
- Framework: Next.js 14+ with App Router
- Video: Embedded YouTube/Vimeo player
- Forms: React Hook Form for lead capture
- Analytics: Google Analytics 4 + conversion tracking
- Styling: Tailwind CSS with landing page theme

**Backend:**
- Runtime: Minimal backend (mostly static)
- Database: PostgreSQL for lead storage
- Email: SendGrid for lead nurturing
- CRM: Integration with HubSpot or similar

**Infrastructure:**
- Hosting: Vercel Edge Functions
- Database: Supabase PostgreSQL
- CDN: Vercel Edge Network
- Email: SendGrid
- Monitoring: Google Analytics + Vercel Analytics

### Deployment Configuration

**Environment Variables:**
```bash
# Database (for lead capture)
DATABASE_URL=postgresql://user:pass@host:5432/documentary

# Email
SENDGRID_API_KEY=<api-key>
WELCOME_EMAIL_TEMPLATE_ID=<template-id>

# CRM Integration
HUBSPOT_API_KEY=<api-key>

# Analytics
NEXT_PUBLIC_GA_ID=G-<tracking-id>
NEXT_PUBLIC_FB_PIXEL_ID=<pixel-id>
```

### Landing Page Structure

**Sections:**
1. Hero with video trailer
2. Documentary overview
3. Featured testimonials
4. Call-to-action (email capture)
5. Links to ecosystem properties
6. Press and media mentions
7. Footer with social links

### Conversion Optimization

**A/B Testing:**
- Headline variations
- CTA button text and color
- Form field requirements
- Video placement
- Social proof elements

### API Endpoints

```
POST   /api/leads/capture        - Capture email lead
POST   /api/leads/notify         - Send notification email
GET    /api/analytics/conversion - Get conversion metrics
```

---

## Cross-Domain Infrastructure

### Unified Authentication (SSO)

**Implementation:**
- Central auth service at `auth.hustlecodex.com`
- OAuth 2.0 / OpenID Connect protocol
- JWT tokens for session management
- Refresh token rotation for security

**Auth Service Stack:**
- Auth0 or custom Node.js service
- PostgreSQL for user data
- Redis for session storage
- Email verification via SendGrid

### Central API Gateway

**Purpose:**
- Unified API entry point for all domains
- Rate limiting and DDoS protection
- Request routing and load balancing
- Analytics and logging

**Gateway Stack:**
- Kong or custom Express gateway
- Redis for rate limiting
- CloudFlare for DDoS protection
- DataDog for monitoring

### Shared Database Architecture

**Strategy:**
- Separate databases per domain for isolation
- Shared `users` table replicated across domains
- Event-driven synchronization via message queue
- Read replicas for analytics queries

**Synchronization:**
- RabbitMQ or AWS SQS for message queue
- Event types: user_created, user_updated, subscription_changed
- Each domain subscribes to relevant events

### Monitoring & Observability

**Centralized Monitoring:**
- **Uptime:** Pingdom for all domains
- **Performance:** New Relic APM
- **Errors:** Sentry for error tracking
- **Logs:** CloudWatch or Elasticsearch
- **Metrics:** Custom dashboard with Grafana

**Alert Configuration:**
- Downtime alerts to PagerDuty
- Error rate spikes to Slack
- Performance degradation notifications
- Security incident alerts

---

## Deployment Checklist

### Pre-Launch (Per Domain)

- [ ] Domain registered and DNS configured
- [ ] SSL certificates installed (auto via Vercel/CloudFlare)
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Seed data loaded (if applicable)
- [ ] API endpoints tested
- [ ] Authentication flow tested
- [ ] Payment processing tested (if applicable)
- [ ] Email delivery tested
- [ ] Analytics tracking verified
- [ ] Error monitoring configured
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Legal pages added (Terms, Privacy, etc.)

### Post-Launch (Per Domain)

- [ ] Monitor error rates and uptime
- [ ] Track key performance metrics
- [ ] Gather user feedback
- [ ] Iterate on conversion optimization
- [ ] Scale infrastructure as needed
- [ ] Regular security updates
- [ ] Content updates and maintenance
- [ ] Community management (if applicable)

---

## Estimated Timeline

### Phase 1: Foundation (Months 1-2)
- Set up infrastructure and tooling
- Deploy documentary landing (recoveryrpg.info)
- Deploy community (recoveryrpg.co.uk)
- Deploy affiliate site (hustlecodex.info)

### Phase 2: Monetization (Months 3-4)
- Deploy digital store (hustlecodex.store)
- Deploy subscription platform (hustlecodex.online)
- Integrate payment processing
- Launch initial marketing campaigns

### Phase 3: Advanced Features (Months 5-6)
- Deploy game (recoveryrpg.com)
- Deploy NFT shop (hustlecodex.shop)
- Implement cross-domain features
- Scale infrastructure

---

## Cost Estimates

### Monthly Infrastructure Costs (At Scale)

| Service | Cost |
|---------|------|
| Vercel Pro (all domains) | $200 |
| Supabase Pro (databases) | $100 |
| AWS S3 + CloudFront | $50 |
| Stripe fees (3% of revenue) | Variable |
| Alchemy/Infura (blockchain) | $50 |
| SendGrid (email) | $50 |
| Monitoring tools | $100 |
| **Total Fixed Costs** | **~$550/month** |

**Note:** Costs will scale with usage. Budget additional $500-1000/month for growth.

---

## Conclusion

This deployment specification provides a comprehensive technical blueprint for launching and managing the seven-domain HustleCodeX ecosystem. Each domain has been designed with scalability, security, and user experience in mind, while maintaining integration points that create a unified ecosystem.

The phased rollout approach allows for iterative learning and optimization, reducing risk while building toward the complete vision.

---

**Document Status:** Implementation Ready  
**Last Updated:** December 29, 2025  
**Next Review:** End of Phase 1 deployment
