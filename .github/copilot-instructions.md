# HustleCodeX - Copilot Instructions

## Project Overview

**HustleCodeX** is a reality-recovery experience that merges storytelling, gamified learning, and community co-creation. This is a Next.js-based web application featuring an interactive "Golden Globe Prestige Console" - a recovery RPG platform that transforms addiction energy into coding skills and entrepreneurship.

### Main Features
- **Interactive Prestige Console**: 4-tier sector system with locked/unlocked states
- **Golden Globe**: Animated central orb with real-time node statistics and data pulse animations
- **Command Dock**: Glassmorphic control interface with live stats
- **Gamified Learning**: Interactive quests teaching real coding skills
- **Recovery Support**: Daily check-ins, milestone tracking, community features
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Target Audience
Individuals in recovery who want to channel their energy into learning coding and building digital skills through an engaging, gamified platform.

## Tech Stack

### Core Framework
- **Next.js 15+** (App Router and Pages Router hybrid)
- **React 19+** (with TypeScript)
- **TypeScript 5.9+** (strict mode enabled)
- **Node.js 18+**

### Styling & UI
- **Tailwind CSS 3.4+** for all styling (no inline styles)
- **Custom color palette**:
  - Gold: `#d4af37` (use `text-gold`, `bg-gold`)
  - Deep Black: `#020202` (use `bg-deep-black`)
  - Prestige Blue: `#003366` (use `text-prestige-blue`)
  - HustleCodeX Cyan: `#00D4AA` (use `hustlex-cyan`)
  - HustleCodeX Orange: `#FF6B35` (use `hustlex-orange`)
  - HustleCodeX Purple: `#7B68EE` (use `hustlex-purple`)
- **Fonts**:
  - Cinzel (serif) for prestige/title elements
  - Inter (sans-serif) for body text
  - JetBrains Mono for code/mono elements

### Additional Libraries
- **Framer Motion** for advanced animations
- **Lucide React** for icons
- **React Hook Form** with Zod for form validation

### Development Tools
- **ESLint** with Next.js config
- **PostCSS** with Autoprefixer
- **pnpm** preferred package manager

## Coding Standards

### TypeScript Guidelines
- **Always use TypeScript** - never use plain JavaScript for new files
- **Enable strict mode** - all compiler strict options are enabled
- **Define interfaces** for all component props, state, and API responses
- **Use descriptive interface names** - prefix with purpose (e.g., `DataStreak`, `GoldenGlobeRef`)
- **Avoid `any` type** - use proper typing or `unknown` with type guards
- **Export types** that are used across multiple files
- **Use `forwardRef` with proper typing** when exposing imperative handles

### React Component Standards
- **Use functional components only** - no class components
- **Use hooks** for state management (`useState`, `useEffect`, `useRef`, etc.)
- **Name components with PascalCase** (e.g., `GoldenGlobe`, `CommandDock`)
- **Export default for page components**, named exports for utilities
- **Use `forwardRef`** when components need to expose imperative methods
- **Define ref interfaces** (e.g., `GoldenGlobeRef`) for components using `useImperativeHandle`

### File Organization
- **Components**: Place in `/components` directory with `.tsx` extension
- **Pages**: Use Next.js `/pages` directory structure
- **Utilities**: Create in `/src` or `/utils` directory
- **Types**: Co-locate with components or in separate `.types.ts` files

### Naming Conventions
- **Components**: PascalCase (e.g., `GoldenGlobe.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables**: camelCase (e.g., `dataStreaks`, `nodeStats`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **CSS classes**: Use Tailwind utility classes, kebab-case for custom classes

## Styling Guidelines

### Tailwind CSS Requirements
- **Use Tailwind utility classes exclusively** - no inline styles
- **No custom CSS** unless absolutely necessary for animations
- **Use custom Tailwind colors** from theme configuration
- **Responsive design**: Mobile-first approach
  - Mobile: `<768px` (default/no prefix)
  - Desktop: `≥768px` (use `md:` prefix)
- **Glassmorphism pattern**: Use `backdrop-blur` with semi-transparent backgrounds
- **Animations**: Define in `globals.css` or Tailwind config, not inline

### Color Usage
- **Gold theme** for prestige/premium features
- **Deep black** for backgrounds
- **Prestige blue** for accents and highlights
- **HustleCodeX palette** (cyan/orange/purple) for recovery-themed elements

## Component Patterns

### State Management
- **Local state**: Use `useState` for component-specific state
- **Refs**: Use `useRef` for DOM references and mutable values
- **Effects**: Use `useEffect` for side effects, cleanup properly
- **Intervals**: Always clear intervals in cleanup function

### Event Handlers
- **Naming**: Prefix with `handle` (e.g., `handlePulseClick`, `handleSectorSelect`)
- **Type safety**: Define proper event types or use inferred types
- **Callbacks**: Pass callbacks as props for parent-child communication

### Animations
- **CSS keyframes**: Define in `globals.css` for reusable animations
- **Tailwind animations**: Use built-in or custom animations from config
- **Cleanup**: Remove animated elements after completion to prevent memory leaks
- **Timing**: Use meaningful durations (e.g., 3s for ambient, 0.5-2s for effects)

## Project Structure

```
hustlecodex/
├── .github/
│   ├── copilot-instructions.md  # This file
│   └── agents/                  # Custom agent configs
├── components/                  # React components
│   ├── CommandDock.tsx
│   ├── GoldenGlobe.tsx
│   ├── PrestigeSidebar.tsx
│   ├── SupportLevels.tsx
│   └── GameplayCarousel.tsx
├── pages/                       # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── 404.tsx
│   └── api/                     # API routes
├── public/                      # Static assets
├── docs/                        # Documentation
├── globals.css                  # Global styles + animations
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Build & Development Commands

### Development
```bash
npm run dev           # Start development server (http://localhost:3000)
pnpm dev             # Preferred with pnpm
```

### Production
```bash
npm run build        # Build for production
npm start            # Start production server
npm run type-check   # TypeScript type checking
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## Restrictions & Requirements

### Security
- **No secrets in code** - use environment variables (`.env.local`)
- **Security headers configured** in `vercel.json`
- **Disable powered by header** - already configured in `next.config.js`
- **No inline event handlers** - use React event handlers

### Performance
- **Image optimization** - use Next.js `Image` component
- **Code splitting** - leverage Next.js automatic code splitting
- **Minimize bundle size** - avoid large dependencies
- **Lazy load** heavy components when appropriate

### Best Practices
- **React strict mode enabled** - handle double rendering in development
- **No direct DOM manipulation** - use React refs and state
- **Clean up side effects** - always return cleanup functions in `useEffect`
- **Type all props and state** - no implicit any
- **Meaningful commit messages** - describe what and why

### File Management
- **No build artifacts in git** - respect `.gitignore`
- **Environment files** - copy `.env.example` to `.env.local`, never commit `.env.local`
- **Node modules** - always excluded from git

## Recovery & Gamification Context

This platform is focused on **recovery and personal transformation**:
- Use encouraging, empowering language
- Gamification should feel rewarding, not addictive
- Focus on progress, milestones, and community support
- Recovery themes: resilience, transformation, growth, community
- Avoid triggering language related to substance use

## Testing Approach

Currently, there's no formal test suite. When adding tests:
- Use testing frameworks consistent with Next.js ecosystem (Jest, Testing Library)
- Focus on component behavior and user interactions
- Test critical paths: authentication, data submission, payment flows (when implemented)

## Future Considerations

Upcoming features to be aware of:
- Payment gateway integration (Gumroad/Stripe)
- User authentication system (NextAuth.js)
- Analytics integration (Plausible/GA)
- AI coaching chatbot integration
- Mobile app (React Native)
- Web3/NFT integration for premium sectors

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

---

**Remember**: This is a recovery-focused platform. Code with empathy, create with purpose, and build features that genuinely help people transform their lives.
