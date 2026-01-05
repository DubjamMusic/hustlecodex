export type TeamType = 'alpha' | 'omega';

export interface AgentContext {
  directive: string;
  previousOutputs: AgentOutput[];
  iterationNumber: number;
  metadata?: Record<string, any>;
}

export interface AgentOutput {
  agentName: string;
  team: TeamType;
  content: string;
  confidence: number;
  processingTime: number;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface Agent {
  name: string;
  team: TeamType;
  role: string;
  execute(directive: string, context: AgentContext): Promise<AgentOutput>;
}

export interface AgentRanking {
  agentName: string;
  team: TeamType;
  score: number;
  wins: number;
  totalExecutions: number;
}
