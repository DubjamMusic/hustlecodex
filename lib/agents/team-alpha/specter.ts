import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Specter extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Specter', 'alpha', 'Risk Assessor and Contrarian Thinker', llm);
  }
}
