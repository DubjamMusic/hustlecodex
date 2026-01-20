import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PathType = 'recovery' | 'skills' | 'hybrid' | null;

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface OnboardingGoal {
  type: 'sobriety' | 'skills' | 'projects';
  value: number;
  unit: string;
}

export interface SocialConnection {
  platform: 'slack' | 'discord' | 'github';
  connected: boolean;
  username?: string;
}

export interface OnboardingState {
  // Current step (1-3)
  currentStep: number;
  
  // Screen 1: Welcome
  hasSeenWelcome: boolean;
  
  // Screen 2: Path Selection
  selectedPath: PathType;
  
  // Screen 3: Profile
  selectedAvatar: string | null;
  username: string;
  goals: OnboardingGoal[];
  socialConnections: SocialConnection[];
  
  // Completion status
  isOnboardingComplete: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  markWelcomeSeen: () => void;
  selectPath: (path: PathType) => void;
  selectAvatar: (avatarId: string) => void;
  setUsername: (username: string) => void;
  addGoal: (goal: OnboardingGoal) => void;
  updateGoal: (index: number, goal: OnboardingGoal) => void;
  removeGoal: (index: number) => void;
  connectSocial: (platform: SocialConnection['platform'], username: string) => void;
  disconnectSocial: (platform: SocialConnection['platform']) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const AVATARS: Avatar[] = [
  {
    id: 'phoenix',
    name: 'Phoenix',
    emoji: '🔥',
    description: 'Rising from the ashes, reborn stronger',
    color: '#FF6B35',
  },
  {
    id: 'cipher',
    name: 'Cipher',
    emoji: '🔐',
    description: 'Master of code and secrets',
    color: '#7B68EE',
  },
  {
    id: 'sage',
    name: 'Sage',
    emoji: '🧙',
    description: 'Wisdom through experience',
    color: '#10B981',
  },
  {
    id: 'nova',
    name: 'Nova',
    emoji: '⭐',
    description: 'Bright light in the darkness',
    color: '#00D4AA',
  },
  {
    id: 'titan',
    name: 'Titan',
    emoji: '💪',
    description: 'Unstoppable strength and resilience',
    color: '#d4af37',
  },
  {
    id: 'echo',
    name: 'Echo',
    emoji: '🌊',
    description: 'Calm waves, deep impact',
    color: '#EC4899',
  },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      hasSeenWelcome: false,
      selectedPath: null,
      selectedAvatar: null,
      username: '',
      goals: [],
      socialConnections: [
        { platform: 'slack', connected: false },
        { platform: 'discord', connected: false },
        { platform: 'github', connected: false },
      ],
      isOnboardingComplete: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      markWelcomeSeen: () => set({ hasSeenWelcome: true }),

      selectPath: (path) => set({ selectedPath: path }),

      selectAvatar: (avatarId) => set({ selectedAvatar: avatarId }),

      setUsername: (username) => set({ username }),

      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),

      updateGoal: (index, goal) =>
        set((state) => ({
          goals: state.goals.map((g, i) => (i === index ? goal : g)),
        })),

      removeGoal: (index) =>
        set((state) => ({
          goals: state.goals.filter((_, i) => i !== index),
        })),

      connectSocial: (platform, username) =>
        set((state) => ({
          socialConnections: state.socialConnections.map((conn) =>
            conn.platform === platform
              ? { ...conn, connected: true, username }
              : conn
          ),
        })),

      disconnectSocial: (platform) =>
        set((state) => ({
          socialConnections: state.socialConnections.map((conn) =>
            conn.platform === platform
              ? { ...conn, connected: false, username: undefined }
              : conn
          ),
        })),

      completeOnboarding: () => set({ isOnboardingComplete: true }),

      resetOnboarding: () =>
        set({
          currentStep: 1,
          hasSeenWelcome: false,
          selectedPath: null,
          selectedAvatar: null,
          username: '',
          goals: [],
          socialConnections: [
            { platform: 'slack', connected: false },
            { platform: 'discord', connected: false },
            { platform: 'github', connected: false },
          ],
          isOnboardingComplete: false,
        }),
    }),
    {
      name: 'hustlecodex-onboarding',
    }
  )
);
