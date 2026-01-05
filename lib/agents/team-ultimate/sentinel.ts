import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Sentinel extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Sentinel', 'ultimate', 'Holistic Risk & Resilience Architect', llm);
  }
}
