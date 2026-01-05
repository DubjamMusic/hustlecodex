import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Shadow extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Shadow', 'omega', 'Deep Risk Analyzer and Devil\'s Advocate', llm);
  }
}
