import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Cipher extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Cipher', 'alpha', 'Data Analyst and Pattern Recognizer', llm);
  }
}
