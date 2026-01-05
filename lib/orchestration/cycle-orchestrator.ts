import { Agent, AgentOutput, TeamType } from '../../types/agents';
import { ModeratorJudgment } from '../../types/performance';
import { ValidationReport } from '../../types/feedback';
import { LLMIntegration } from '../llm/integration-layer';
import { Cipher } from '../agents/team-alpha/cipher';
import { Specter } from '../agents/team-alpha/specter';
import { Nexus } from '../agents/team-alpha/nexus';
import { Quantum } from '../agents/team-omega/quantum';
import { Shadow } from '../agents/team-omega/shadow';
import { Apex } from '../agents/team-omega/apex';
import { Synergy } from '../agents/team-ultimate/synergy';
import { Sentinel } from '../agents/team-ultimate/sentinel';
import { Catalyst } from '../agents/team-ultimate/catalyst';
import { Moderator } from './moderator';
import { PerformanceTracker } from './performance-tracker';
import { RulesetEngine } from '../feedback/ruleset-engine';
import { getRedisInstance } from '../state/redis-manager';

export interface OrchestrationResult {
  executionId: string;
  alphaOutputs: AgentOutput[];
  omegaOutputs: AgentOutput[];
  ultimateOutputs?: AgentOutput[];
  alphaValidation: ValidationReport[];
  omegaValidation: ValidationReport[];
  ultimateValidation?: ValidationReport[];
  moderatorJudgment: ModeratorJudgment;
  timestamp: number;
}

export class CycleOrchestrator {
  private teamAlpha: Agent[];
  private teamOmega: Agent[];
  private teamUltimate: Agent[];
  private moderator: Moderator;
  private performanceTracker: PerformanceTracker;
  private rulesetEngine: RulesetEngine;
  private llm: LLMIntegration;

  constructor() {
    // Initialize LLM integration
    this.llm = new LLMIntegration({ provider: 'mock' });

    // Initialize Team Alpha
    this.teamAlpha = [
      new Cipher(this.llm),
      new Specter(this.llm),
      new Nexus(this.llm)
    ];

    // Initialize Team Omega
    this.teamOmega = [
      new Quantum(this.llm),
      new Shadow(this.llm),
      new Apex(this.llm)
    ];

    // Initialize Team Ultimate (Cross-functional)
    this.teamUltimate = [
      new Synergy(this.llm),
      new Sentinel(this.llm),
      new Catalyst(this.llm)
    ];

    // Initialize supporting systems
    this.moderator = new Moderator();
    const redis = getRedisInstance();
    this.performanceTracker = new PerformanceTracker(redis);
    this.rulesetEngine = new RulesetEngine();
  }

  async executeDirective(
    directive: string,
    rulesetName: string = 'default-rules',
    competitionMode: boolean = true,
    includeUltimate: boolean = false
  ): Promise<OrchestrationResult> {
    const executionId = this.generateExecutionId();
    console.log(`[Orchestrator] Starting execution ${executionId}`);
    console.log(`[Orchestrator] Directive: ${directive}`);
    console.log(`[Orchestrator] Competition Mode: ${competitionMode}`);
    console.log(`[Orchestrator] Include Ultimate Team: ${includeUltimate}`);

    // Initialize agents
    await this.initializeAgents();

    // Execute teams
    let alphaOutputs: AgentOutput[];
    let omegaOutputs: AgentOutput[];
    let ultimateOutputs: AgentOutput[] | undefined;

    if (includeUltimate) {
      // Execute all three teams in parallel
      console.log('[Orchestrator] Executing all three teams in parallel...');
      [alphaOutputs, omegaOutputs, ultimateOutputs] = await Promise.all([
        this.executeTeam('alpha', this.teamAlpha, directive),
        this.executeTeam('omega', this.teamOmega, directive),
        this.executeTeam('ultimate', this.teamUltimate, directive)
      ]);
    } else {
      // Execute Alpha and Omega only
      console.log('[Orchestrator] Executing Alpha and Omega teams in parallel...');
      [alphaOutputs, omegaOutputs] = await Promise.all([
        this.executeTeam('alpha', this.teamAlpha, directive),
        this.executeTeam('omega', this.teamOmega, directive)
      ]);
    }

    console.log('[Orchestrator] Team executions complete');

    // Validate outputs
    console.log('[Orchestrator] Validating outputs...');
    const validationPromises = [
      this.validateTeamOutputs(alphaOutputs, rulesetName),
      this.validateTeamOutputs(omegaOutputs, rulesetName)
    ];
    
    if (includeUltimate && ultimateOutputs) {
      validationPromises.push(this.validateTeamOutputs(ultimateOutputs, rulesetName));
    }

    const validationResults = await Promise.all(validationPromises);
    const alphaValidation = validationResults[0];
    const omegaValidation = validationResults[1];
    const ultimateValidation = includeUltimate ? validationResults[2] : undefined;

    console.log('[Orchestrator] Validation complete');

    // Get current streak for praise
    const currentStreak = await this.getCurrentStreak();

    // Moderator judgment
    console.log('[Orchestrator] Moderator judging...');
    const moderatorJudgment = await this.moderator.judge(
      alphaOutputs,
      omegaOutputs,
      alphaValidation,
      omegaValidation,
      currentStreak
    );

    console.log(`[Orchestrator] Winner: ${moderatorJudgment.winningTeam}`);

    // Record performance
    if (competitionMode) {
      console.log('[Orchestrator] Recording performance metrics...');
      await this.recordPerformance(moderatorJudgment);
    }

    // Store execution history
    await this.storeExecutionHistory(executionId, {
      executionId,
      alphaOutputs,
      omegaOutputs,
      ultimateOutputs,
      alphaValidation,
      omegaValidation,
      ultimateValidation,
      moderatorJudgment,
      timestamp: Date.now()
    });

    console.log('[Orchestrator] Execution complete');

    return {
      executionId,
      alphaOutputs,
      omegaOutputs,
      ultimateOutputs,
      alphaValidation,
      omegaValidation,
      ultimateValidation,
      moderatorJudgment,
      timestamp: Date.now()
    };
  }

  private async initializeAgents(): Promise<void> {
    await Promise.all([
      ...this.teamAlpha.map(agent => agent.execute('', { directive: '', previousOutputs: [], iterationNumber: 0 }).catch(() => {})),
      ...this.teamOmega.map(agent => agent.execute('', { directive: '', previousOutputs: [], iterationNumber: 0 }).catch(() => {})),
      ...this.teamUltimate.map(agent => agent.execute('', { directive: '', previousOutputs: [], iterationNumber: 0 }).catch(() => {}))
    ]);
  }

  private async executeTeam(
    teamName: string,
    team: Agent[],
    directive: string
  ): Promise<AgentOutput[]> {
    console.log(`[Orchestrator] Executing Team ${teamName}...`);
    const outputs: AgentOutput[] = [];

    // Execute agents sequentially within the team
    for (const agent of team) {
      console.log(`[Orchestrator] - Executing ${agent.name}...`);
      const context = {
        directive,
        previousOutputs: outputs,
        iterationNumber: 1
      };

      const output = await agent.execute(directive, context);
      outputs.push(output);
      console.log(`[Orchestrator] - ${agent.name} complete (${output.processingTime}ms)`);
    }

    console.log(`[Orchestrator] Team ${teamName} execution complete`);
    return outputs;
  }

  private async validateTeamOutputs(
    outputs: AgentOutput[],
    rulesetName: string
  ): Promise<ValidationReport[]> {
    const validations = await Promise.all(
      outputs.map(output => this.rulesetEngine.validate(output, rulesetName))
    );
    return validations;
  }

  private async recordPerformance(judgment: ModeratorJudgment): Promise<void> {
    // Record performance for both teams
    await Promise.all([
      this.performanceTracker.recordPerformance('alpha', judgment.teamAlphaPerformance),
      this.performanceTracker.recordPerformance('omega', judgment.teamOmegaPerformance)
    ]);

    // Record win
    const alphaScore = judgment.teamAlphaPerformance.totalScore;
    const omegaScore = judgment.teamOmegaPerformance.totalScore;
    await this.performanceTracker.recordWin(judgment.winningTeam, alphaScore, omegaScore);
  }

  private async getCurrentStreak(): Promise<{ team: TeamType; count: number } | undefined> {
    try {
      const dailyStats = await Promise.all([
        this.performanceTracker.getTeamStats('alpha', 'daily'),
        this.performanceTracker.getTeamStats('omega', 'daily')
      ]);

      const alphaStreak = dailyStats[0].winStreak;
      const omegaStreak = dailyStats[1].winStreak;

      if (alphaStreak > 0) {
        return { team: 'alpha', count: alphaStreak };
      } else if (omegaStreak > 0) {
        return { team: 'omega', count: omegaStreak };
      }
    } catch (error) {
      console.error('Error getting current streak:', error);
    }

    return undefined;
  }

  private async storeExecutionHistory(
    executionId: string,
    result: OrchestrationResult
  ): Promise<void> {
    const redis = getRedisInstance();
    const key = `history:directives:${executionId}`;
    await redis.set(key, JSON.stringify(result), 86400); // 24 hour expiry
  }

  private generateExecutionId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  async getLeaderboard() {
    return this.performanceTracker.getLeaderboard();
  }

  async resetScores(period: 'daily' | 'monthly' | 'yearly' | 'all'): Promise<void> {
    await this.performanceTracker.resetStats(period);
  }
}
