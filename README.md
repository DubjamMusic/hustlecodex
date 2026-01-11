# HustleCodeX

> **From Struggle to Digital Empire** — A gamified recovery platform that transforms addiction energy into coding skills and entrepreneurship.

![Version](https://img.shields.io/badge/version-1.0.0--mvp-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-MVP-orange)

## 🎮 Overview

**HustleCodeX** is a reality-recovery experience that merges storytelling, gamified learning, and community co-creation. Players—dubbed "Hustlers"—embark on quests that mirror real-world challenges, learning to channel the energy of addiction into creative coding and entrepreneurship.

Through engaging missions and narrative arcs grounded in recovery psychology, users witness characters transform setbacks into milestones. Our goal is to inspire and empower individuals by showing that the same determination once applied to harmful habits can be redirected toward building digital skills, businesses, and healthier communities.

## ✨ Key Features

- **🎯 Gamified Learning**: Interactive quests teaching real coding skills
- **💪 Recovery Support**: Daily check-ins, milestone tracking, sponsor matching
- **🤝 Community Voting**: Democratic development where users shape the platform
- **🧠 AI Coaching**: Personalized guidance powered by Claude API
- **🏆 Achievement System**: Badges, titles, and progression tracking
- **🎨 Cyberpunk Aesthetic**: Green/orange/purple palette with recovery themes

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, tRPC, GraphQL Federation
- **Database**: PostgreSQL (Supabase), Redis, MongoDB Atlas
- **AI/ML**: Claude API, OpenAI, Pinecone, LangChain
- **Infrastructure**: Vercel, Railway, Cloudflare, Docker
- **DevOps**: GitHub Actions, Terraform, Sentry, Grafana

### System Layers

1. **Client Layer**: Web App (Next.js), Mobile (React Native), PWA
2. **API Gateway & Auth**: Kong/Express gateway, NextAuth.js + JWT
3. **Microservices**: User, Game Engine, Recovery, Social, Content CMS
4. **AI/ML Layer**: LLM Service, Recommendation Engine, Predictive Analytics
5. **Data Layer**: PostgreSQL, Redis, MongoDB, S3/R2, Pinecone/Weaviate
6. **Infrastructure**: Vercel, Railway/Render, Cloudflare, Monitoring Stack

## 📁 Project Structure

```
hustlecodex/
├── public/
│   └── assets/
│       └── characters/        # Character art and avatars
├── src/
│   ├── components/           # React components
│   ├── pages/               # Next.js pages
│   └── styles/              # CSS and styling
├── docs/
│   ├── architecture.md      # Technical architecture
│   ├── business-plan.md     # Business strategy
│   └── grant-applications/  # UK charity grant drafts
├── config/                  # Configuration files
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm or npm
- PostgreSQL (or Supabase account)
- Redis instance

### Installation

```bash
# Clone the repository
git clone https://github.com/DubjamMusic/hustlecodex.git
cd hustlecodex

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the app.

## 🎯 Roadmap

### MVP (Current)
- ✅ Landing page with typewriter hero
- ✅ Community voting system
- ✅ Stretch goals visualization
- ✅ Admin dashboard prototype
- 🔄 User authentication
- 🔄 Basic quest system

### Phase 2
- AI-powered coaching chatbot
- Mobile app (React Native)
- Real-time leaderboards
- Sponsor matching algorithm

### Phase 3
- Blockchain achievements (NFTs)
- Real-life code bootcamp
- API marketplace
- Multi-language support

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Business Model

HustleCodeX operates on a freemium model with multiple revenue streams:

- **Free Tier**: Basic quests, community access, daily check-ins
- **Premium ($9.99/mo)**: Advanced quests, AI coaching, custom avatars
- **Enterprise**: White-label solutions for recovery centers
- **Marketplace**: User-generated content, themes, quest packs

## 🏆 Competitive Advantage

| Feature | HustleCodeX | Codecademy | Habitica | I Am Sober |
|---------|-------------|------------|----------|------------|
| Recovery Focus | ✅ | ❌ | ❌ | ✅ |
| Real Coding Skills | ✅ | ✅ | ❌ | ❌ |
| Gamification | ✅ | ⚠️ | ✅ | ⚠️ |
| AI Coaching | ✅ | ❌ | ❌ | ❌ |
| Community Voting | ✅ | ❌ | ❌ | ❌ |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Recovery community for inspiration and feedback
- Open source contributors
- UK recovery charities for partnership opportunities

## 📞 Contact

- **Website**: [hustlecodex.com](https://hustlecodex.com)
- **Email**: hello@hustlecodex.com
- **Twitter**: [@hustlecodex](https://twitter.com/hustlecodex)
- **Discord**: [Join our community](https://discord.gg/hustlecodex)

---

**Built with ❤️ by the HustleCodeX team** | Transforming lives through code, one quest at a time.
