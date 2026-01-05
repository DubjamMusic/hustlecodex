import { TeamType } from './agents';

export interface TeamPerformance {
  team: TeamType;
  qualityScore: number;
  speedScore: number;
  collaborationScore: number;
  innovationScore: number;
  totalScore: number;
  strengths: string[];
  improvements: string[];
}

export interface ModeratorJudgment {
  winningTeam: TeamType | 'tie';
  synthesis: string;
  teamAlphaPerformance: TeamPerformance;
  teamOmegaPerformance: TeamPerformance;
  reasoning: string;
  praiseMessage: string;
  shouldContinue: boolean;
  confidence: number;
  timestamp: number;
}

export interface TeamStats {
  team: TeamType;
  wins: number;
  losses: number;
  ties: number;
  averageScore: number;
  totalExecutions: number;
  winStreak: number;
  bestScore: number;
  lastUpdated: number;
}

export interface Leaderboard {
  daily: {
    alpha: TeamStats;
    omega: TeamStats;
  };
  monthly: {
    alpha: TeamStats;
    omega: TeamStats;
  };
  yearly: {
    alpha: TeamStats;
    omega: TeamStats;
  };
  mvpAgents: Array<{
    agentName: string;
    team: TeamType;
    score: number;
    wins: number;
  }>;
  lastUpdated: number;
}

export interface PerformanceMetrics {
  executionTime: number;
  llmApiCalls: number;
  llmCost: number;
  feedbackScore: number;
  userSatisfaction?: number;
}
