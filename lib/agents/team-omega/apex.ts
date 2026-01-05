import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Apex extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Apex', 'omega', 'Strategic Orchestrator and Optimization Specialist', llm);
  }
}
