import { Agent, AgentContext, AgentOutput, TeamType } from '../../types/agents';
import { LLMIntegration, LLMMessage, loadPrompt } from '../llm/integration-layer';

export abstract class BaseAgent implements Agent {
  name: string;
  team: TeamType;
  role: string;
  protected llm: LLMIntegration;
  protected systemPrompt: string = '';

  constructor(name: string, team: TeamType, role: string, llm: LLMIntegration) {
    this.name = name;
    this.team = team;
    this.role = role;
    this.llm = llm;
  }

  async initialize(): Promise<void> {
    // Load the system prompt for this agent
    this.systemPrompt = await loadPrompt(this.team, this.name.toLowerCase());
  }

  async execute(directive: string, context: AgentContext): Promise<AgentOutput> {
    const startTime = Date.now();

    // Ensure prompt is loaded
    if (!this.systemPrompt) {
      await this.initialize();
    }

    // Build context for the agent
    const contextStr = this.buildContext(context);

    // Prepare messages for LLM
    const messages: LLMMessage[] = [
      {
        role: 'system',
        content: this.systemPrompt
      },
      {
        role: 'user',
        content: `${contextStr}\n\nDirective: ${directive}`
      }
    ];

    // Get LLM response
    const response = await this.llm.generateCompletion(messages);

    const processingTime = Date.now() - startTime;

    // Extract confidence from response (look for "Confidence: XX%" pattern)
    const confidence = this.extractConfidence(response.content);

    return {
      agentName: this.name,
      team: this.team,
      content: response.content,
      confidence,
      processingTime,
      metadata: {
        model: response.model,
        tokens: response.usage.totalTokens,
        iterationNumber: context.iterationNumber
      },
      timestamp: Date.now()
    };
  }

  protected buildContext(context: AgentContext): string {
    if (context.previousOutputs.length === 0) {
      return 'This is the first analysis in the cycle.';
    }

    const previousOutputsStr = context.previousOutputs
      .map(output => `\n\n--- ${output.agentName} (${output.team}) ---\n${output.content}`)
      .join('\n');

    return `Previous team member analyses:${previousOutputsStr}`;
  }

  protected extractConfidence(content: string): number {
    // Look for patterns like "Confidence: 85%" or "Confidence Level: 85%"
    const confidenceMatch = content.match(/Confidence(?:\s+Level)?:\s*(\d+)%/i);
    if (confidenceMatch) {
      return parseInt(confidenceMatch[1], 10);
    }
    
    // Default confidence if not found
    return 75;
  }
}
