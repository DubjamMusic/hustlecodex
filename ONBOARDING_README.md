# HustleCodex Onboarding Flow

## Overview

This document describes the 3-screen MVP onboarding flow for HustleCodex, a gamified recovery and skill-building platform. The implementation uses Next.js 15 with PWA support and Capacitor.js for native mobile app conversion.

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.9 with React 19
- **Styling**: Tailwind CSS 3.4 with custom prestige theme
- **Animations**: Framer Motion 11
- **State Management**: Zustand 5 with persistence
- **PWA**: @ducanh2912/next-pwa
- **Native Apps**: Capacitor.js 6

### Project Structure
```
hustlecodex/
├── components/
│   └── onboarding/
│       ├── WelcomeScreen.tsx      # Screen 1: Welcome Animation
│       ├── PathSelectionScreen.tsx # Screen 2: Choose Your Path
│       ├── ProfileCreationScreen.tsx # Screen 3: Profile Creation
│       └── index.ts
├── pages/
│   ├── onboarding.tsx             # Main onboarding page
│   └── index.tsx                  # Dashboard (post-onboarding)
├── store/
│   └── onboardingStore.ts         # Zustand state management
├── styles/
│   └── globals.css                # Global styles & utilities
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker
│   └── icons/                     # PWA icons
├── capacitor.config.ts            # Capacitor configuration
└── next.config.js                 # Next.js + PWA config
```

## Onboarding Screens

### Screen 1: Welcome Animation
**File**: `components/onboarding/WelcomeScreen.tsx`

Features:
- **Parallax Hero**: Animated particle system with canvas-based rendering
- **Tagline**: "From Struggle to Digital Empire" with gradient text effects
- **Animated Stat Counters**: 
  - 10,000+ Hustlers in Recovery
  - 50,000+ Coding Quests Completed
  - 1,000,000+ Days of Sobriety
  - 500+ Projects Launched
- **CTA Button**: "Start Your Journey" with hover animations
- **Progress Indicator**: 3 dots showing current step

### Screen 2: Choose Your Path
**File**: `components/onboarding/PathSelectionScreen.tsx`

Three path options:
1. **Recovery Focus** (Pink theme)
   - Daily check-ins & mood tracking
   - Sponsor matching system
   - Sobriety milestones & rewards

2. **Skill Building** (Purple theme)
   - Interactive coding quests
   - Real-world project challenges
   - Skill trees & certifications

3. **Hybrid Path** (Cyan theme) - Most Popular
   - Full recovery toolkit
   - Complete skill curriculum
   - Unified progress system

### Screen 3: Profile Creation
**File**: `components/onboarding/ProfileCreationScreen.tsx`

Features:
- **Avatar Selection**: 6 prestige-themed characters
  - Phoenix (🔥) - Rising from the ashes
  - Cipher (🔐) - Master of code
  - Sage (🧙) - Wisdom through experience
  - Nova (⭐) - Bright light in darkness
  - Titan (💪) - Unstoppable strength
  - Echo (🌊) - Calm waves, deep impact

- **Username Input**: 3-20 characters validation
- **Goal Setting**: Dynamic based on selected path
  - Recovery: Days sober goal
  - Skills: Skills to learn, projects to build
  - Hybrid: All of the above

- **Social Connections** (Optional):
  - GitHub
  - Discord
  - Slack

## State Management

The onboarding state is managed with Zustand and persisted to localStorage:

```typescript
interface OnboardingState {
  currentStep: number;
  hasSeenWelcome: boolean;
  selectedPath: 'recovery' | 'skills' | 'hybrid' | null;
  selectedAvatar: string | null;
  username: string;
  goals: OnboardingGoal[];
  socialConnections: SocialConnection[];
  isOnboardingComplete: boolean;
}
```

## PWA Configuration

The app is configured as a Progressive Web App with:
- Offline support via service worker
- App manifest for "Add to Home Screen"
- iOS splash screens
- Theme color: `#0a0a0f`
- Background color: `#0a0a0f`

## Capacitor.js Setup

For native iOS/Android apps:

```bash
# Initialize Capacitor (already configured)
pnpm cap:init

# Add platforms
pnpm cap:add:ios
pnpm cap:add:android

# Build and sync
pnpm build:mobile

# Open in native IDE
pnpm cap:open:ios
pnpm cap:open:android
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Design System

### Colors
- Primary Cyan: `#00D4AA`
- Purple: `#7B68EE`
- Orange: `#FF6B35`
- Pink: `#EC4899`
- Gold: `#d4af37`
- Dark Background: `#0a0a0f`

### Utilities
- `.glass` - Glassmorphism effect
- `.glass-card` - Card with glass effect
- `.text-gradient` - Cyan to purple gradient text
- `.text-gradient-gold` - Gold gradient text
- `.glow-cyan` - Cyan glow effect
- `.btn-primary` - Primary button style

## Deployment

The app is configured for static export, making it compatible with:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

For Vercel deployment:
1. Connect your GitHub repository
2. Deploy automatically on push to main

## Next Steps

1. **Backend Integration**: Connect to authentication and database
2. **Real Stat Data**: Replace placeholder stats with real metrics
3. **Social OAuth**: Implement actual GitHub/Discord/Slack OAuth
4. **Native Features**: Add haptic feedback, push notifications
5. **Analytics**: Track onboarding completion rates
