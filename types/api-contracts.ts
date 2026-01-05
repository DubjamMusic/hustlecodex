import { TeamType } from './agents';
import { ModeratorJudgment } from './performance';
import { ValidationReport } from './feedback';

export interface ExecuteDirectiveRequest {
  directive: string;
  rulesetName?: string;
  competitionMode?: boolean;
  includeDetails?: boolean;
}

export interface ExecuteDirectiveResponse {
  success: boolean;
  moderatorJudgment: ModeratorJudgment;
  validationReports: {
    alpha: ValidationReport[];
    omega: ValidationReport[];
  };
  executionId: string;
  timestamp: number;
  error?: string;
}

export interface CompareTeamsRequest {
  executionId: string;
}

export interface CompareTeamsResponse {
  success: boolean;
  comparison: {
    winningTeam: TeamType | 'tie';
    scores: {
      alpha: number;
      omega: number;
    };
    reasoning: string;
  };
  error?: string;
}

export interface LeaderboardRequest {
  period?: 'daily' | 'monthly' | 'yearly';
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: {
    alpha: {
      wins: number;
      losses: number;
      ties: number;
      averageScore: number;
    };
    omega: {
      wins: number;
      losses: number;
      ties: number;
      averageScore: number;
    };
  };
  mvpAgents: Array<{
    name: string;
    team: TeamType;
    score: number;
  }>;
  error?: string;
}

export interface ResetScoresRequest {
  period?: 'daily' | 'monthly' | 'yearly' | 'all';
  confirmCode: string;
}

export interface ResetScoresResponse {
  success: boolean;
  message: string;
  error?: string;
}
