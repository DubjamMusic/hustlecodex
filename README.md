 hustlecodeX
 HustleCodex Stack

Vercel-ready Next.js starter kit for community-driven recovery RPG.

 HustleCodex V3
Reality Recovery Playing Game — built with Next.js and TailwindCSS
main
# HustleCodeX V3 - Reality Recovery Platform

Reality Recovery Playing Game — built with Next.js, TypeScript, and TailwindCSS

> **From Struggle to Digital Empire** — A gamified recovery platform that transforms addiction energy into coding skills and entrepreneurship.

## ✨ Features

### 🎮 Interactive Prestige Console
- **Complex Hierarchy**: 4-tier sector system with locked/unlocked states
- **Golden Globe**: Animated central orb with real-time node statistics
- **Data Pulse System**: Visual data streak animations on command
- **Command Dock**: Glassmorphic control interface with live stats
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### 🤖 Nexus Recovery (NEW)
- **AI Twin Chat**: Personal AI guide for decision-making and recovery support
- **Decision Simulator**: Visualize good path vs bad path before making choices
- **Quest System**: Gamified daily tasks with XP rewards and level progression
- **User Profiles**: Track recovery status, streaks, and achievements
- **Community Features**: Resource mapping and peer support (coming soon)

[📖 Full Nexus Recovery Setup Guide](./docs/NEXUS_RECOVERY_SETUP.md)

### 🚀 Technical Stack
- **Framework**: Next.js 15.5 (Hybrid Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-3.5-turbo
- **State**: Zustand + React Query
- **Fonts**: Cinzel (prestige), Inter (general)
- **Animations**: Framer Motion + CSS keyframes

### 🔒 Production Ready
- ✅ Security headers configured
- ✅ SEO optimized with meta tags
- ✅ Performance optimized (SWC, code splitting)
- ✅ Type-safe with TypeScript strict mode
- ✅ Zero security vulnerabilities (Next.js 15.5.9)
- ✅ Custom 404 error page
- ✅ Responsive mobile design
- ✅ PWA support with Capacitor

## 🚀 Quick Start

### Standard Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Nexus Recovery Features

To enable AI-powered recovery features:

1. **Set up Supabase** (free tier):
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Run database migrations from `supabase/migrations/`

2. **Set up OpenAI** (requires API key):
   - Create account at [platform.openai.com](https://platform.openai.com)
   - Generate API key

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Add your Supabase and OpenAI keys
   # Set NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY=true
   ```

4. **Access Nexus Dashboard**:
   ```
   http://localhost:3000/nexus
   ```

**Full setup guide**: [docs/NEXUS_RECOVERY_SETUP.md](./docs/NEXUS_RECOVERY_SETUP.md)

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Deploy to Vercel (recommended)
vercel --prod
```

## 🎨 Project Structure

```
hustlecodex/
├── components/
│   ├── CommandDock.tsx           # Control interface
│   ├── GoldenGlobe.tsx           # Central orb with animations
│   ├── PrestigeSidebar.tsx       # Sector hierarchy
│   ├── SupportLevels.tsx         # Donation tiers
│   ├── GameplayCarousel.tsx      # Game showcase
│   ├── TwinChat.tsx              # AI Twin chat interface (NEW)
│   ├── DecisionSimulator.tsx     # Decision visualization (NEW)
│   └── QuestList.tsx             # Quest system (NEW)
├── pages/
│   ├── _app.tsx                  # App wrapper
│   ├── _document.tsx             # HTML document
│   ├── index.tsx                 # Home page
│   ├── nexus.tsx                 # Nexus Recovery dashboard (NEW)
│   ├── 404.tsx                   # Error page
│   └── api/
│       ├── robots.ts             # SEO robots.txt
│       └── twin/                 # AI Twin API routes (NEW)
│           ├── chat.ts           # Chat endpoint
│           └── simulate.ts       # Decision simulation
├── lib/
│   ├── supabase.ts               # Supabase client & types (NEW)
│   └── openai.ts                 # OpenAI utilities (NEW)
├── supabase/
│   └── migrations/               # Database schema (NEW)
├── docs/
│   └── NEXUS_RECOVERY_SETUP.md   # Setup guide (NEW)
├── styles/
│   └── globals.css               # Global styles + animations
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── vercel.json                   # Deployment config
```

## 🎯 Key Components

### Golden Globe Prestige Console

#### PrestigeSidebar
- Interactive sector cards with hover effects
- Locked/unlocked state management
- Price tag displays
- Click handlers for sector selection

#### GoldenGlobe
- Animated central orb (400px desktop, 250px mobile)
- Real-time node count and latency display
- Ambient data streak animations
- Pulse effect system (15 synchronized streaks)
- React refs for imperative control

#### CommandDock
- Glassmorphic design with backdrop blur
- Dynamic stats message display
- Pulse button with hover effects
- Gold color scheme integration

### Nexus Recovery Features

#### TwinChat
- AI-powered conversational interface
- Message history with timestamps
- Context-aware responses based on recovery status
- Real-time streaming from OpenAI GPT-3.5-turbo
- Glassmorphic design matching platform aesthetic

#### DecisionSimulator
- Input field for decision description
- Good path vs bad path visualization
- Color-coded outcomes (green/red)
- Recovery-focused insights
- Integrated with AI Twin intelligence

#### QuestList
- Daily and regular quest display
- XP reward tracking
- Completion state management
- Badge system integration
- Progress visualization

## 🔧 Configuration

### Environment Variables

#### Core Application
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="HustleCodeX - Reality Recovery Platform"
```

#### Optional Analytics
```bash
NEXT_PUBLIC_GA_ID=           # Google Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN= # Plausible Analytics
```

#### Nexus Recovery Features (NEW)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-only

# OpenAI
OPENAI_API_KEY=sk-xxxxx  # Server-only

# Feature Flags
NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY=true
NEXT_PUBLIC_ENABLE_PAYMENTS=false
```

**⚠️ Security**: Never commit `.env.local` to git. Server-only keys should never be exposed to the browser.

### Tailwind Theme
Custom colors defined in `tailwind.config.js`:
- **gold**: #d4af37 (prestige elements)
- **deep-black**: #020202 (backgrounds)
- **prestige-blue**: #003366 (accents)

Custom font family:
- **cinzel**: Cinzel serif (Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (stacked layout, 250px globe)
- **Desktop**: ≥ 768px (sidebar + main, 400px globe)

## 🎨 Animations

### Data Streak Fall
```css
@keyframes fall {
  from { transform: translateY(-500px) rotate(45deg); opacity: 1; }
  to { transform: translateY(500px) rotate(45deg); opacity: 0; }
}
```

- Ambient: 1 streak every 3 seconds
- Pulse: 15 streaks in rapid succession
- Duration: 0.5-2 seconds per streak
- Effect: Golden gradient with blur

## 🔐 Security

All security headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy configured

## 📈 Performance

- **Build Size**: ~100KB first load JS
- **Lighthouse Score**: 95-100 (Performance)
- **Core Web Vitals**: All metrics in green zone
- **Images**: Optimized with Next.js Image component
- **Fonts**: Preconnected to Google Fonts CDN

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Docker
```bash
docker build -t golden-globe .
docker run -p 3000:3000 golden-globe
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Deployment Guide](./DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of HustleCodex V3 - Reality Recovery Playing Game.

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] Golden Globe Prestige Console
- [x] AI Twin Chat with OpenAI GPT-3.5
- [x] Decision Simulator (good path vs bad path)
- [x] Quest System with XP rewards
- [x] Supabase database schema
- [x] TypeScript strict mode
- [x] Security headers and best practices

### Phase 2: Core Features (Q1 2026)
- [ ] User authentication with Supabase Auth
- [ ] Profile creation and recovery status tracking
- [ ] Quest completion persistence
- [ ] XP and rank progression system
- [ ] Daily streak tracking
- [ ] Community contribution mapping (Leaflet/OpenStreetMap)
- [ ] Resource location pins

### Phase 3: Enhanced Features (Q2 2026)
- [ ] AI Twin memory and context persistence
- [ ] Advanced decision simulation with multi-path outcomes
- [ ] Badge and achievement system
- [ ] Leaderboards
- [ ] User-generated quests
- [ ] Marketplace for recovery resources
- [ ] Mobile PWA optimization

### Phase 4: Growth (Q3-Q4 2026)
- [ ] Payment gateway integration (Stripe/Gumroad)
- [ ] B2B dashboard for recovery organizations
- [ ] Advanced analytics and outcome tracking
- [ ] Native mobile apps (Capacitor iOS/Android)
- [ ] Sponsor/mentor matching system
- [ ] Video content integration
- [ ] Multi-language support

### Phase 5: Scale (2027)
- [ ] Web3/NFT achievements (optional)
- [ ] API marketplace
- [ ] White-label solutions for recovery centers
- [ ] Research partnerships for outcome studies
- [ ] Integration with telehealth platforms
- [ ] Voice-first AI Twin interface

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Nexus Recovery Setup Guide](./docs/NEXUS_RECOVERY_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 💰 Business Model

### Revenue Streams
1. **Freemium SaaS**
   - Free: Basic AI Twin, limited quests, community features
   - Guardian ($9/mo): Unlimited AI conversations, advanced decision simulations
   - Architect ($29/mo): Priority support, custom AI personality, analytics

2. **B2B Licenses**
   - Recovery centers: $500-5K/month for white-labeled instances
   - Reentry programs: Custom pricing based on user count
   - Co-branded solutions with outcome tracking

3. **Marketplace** (10-15% commission)
   - User-generated prompts and quests
   - Recovery resources and tools
   - Professional content from creators

4. **Grants & Partnerships**
   - Recovery research grants ($50-500K/year)
   - Government reentry program funding
   - Foundation support for social impact

### Target Market
- **Primary**: 20M+ individuals in recovery in the US
- **Secondary**: 5M+ individuals in reentry programs
- **Tertiary**: Recovery organizations and treatment centers

## 🏆 Competitive Advantage

| Feature | HustleCodeX | Codecademy | I Am Sober | BetterHelp |
|---------|-------------|------------|------------|------------|
| AI Decision Support | ✅ | ❌ | ❌ | ⚠️ |
| Real Coding Skills | ✅ | ✅ | ❌ | ❌ |
| Recovery Focus | ✅ | ❌ | ✅ | ✅ |
| Gamification | ✅ | ⚠️ | ⚠️ | ❌ |
| Community Mapping | ✅ | ❌ | ⚠️ | ❌ |
| B2B Solutions | ✅ | ✅ | ❌ | ✅ |

## 🤝 Contributing

We welcome contributions from developers, designers, recovery professionals, and community members!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our coding standards (see `.github/copilot-instructions.md`)
4. Write tests for new features
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution
- 🐛 Bug fixes and issue resolution
- ✨ New feature development
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage expansion
- 🌍 Internationalization
- ♿ Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Recovery community for inspiration and feedback
- Open source contributors
- Supabase and OpenAI for enabling AI-powered recovery support
- UK recovery charities for partnership opportunities

## 📞 Contact

- **Website**: [hustlecodex.com](https://hustlecodex.com)
- **Email**: hello@hustlecodex.com
- **GitHub**: [github.com/DubjamMusic/hustlecodex](https://github.com/DubjamMusic/hustlecodex)
- **Discord**: Join our community (coming soon)

---

**Built with ❤️ for the recovery community** | Transforming lives through code, one quest at a time.
