import { AgentOutput, TeamType } from './agents';

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  type: 'programmatic' | 'llm';
  check: (output: AgentOutput) => boolean | Promise<boolean>;
  severity: 'error' | 'warning' | 'info';
}

export interface RulesetConfig {
  name: string;
  description: string;
  rules: ValidationRule[];
}

export interface FeedbackResult {
  passed: boolean;
  ruleName: string;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export interface ValidationReport {
  team: TeamType;
  agentName: string;
  passed: boolean;
  results: FeedbackResult[];
  overallScore: number;
  timestamp: number;
}

export interface ComparisonResult {
  betterTeam: TeamType | 'tie';
  alphaScore: number;
  omegaScore: number;
  reasoning: string;
  details: {
    quality: { alpha: number; omega: number };
    speed: { alpha: number; omega: number };
    collaboration: { alpha: number; omega: number };
    innovation: { alpha: number; omega: number };
  };
}
