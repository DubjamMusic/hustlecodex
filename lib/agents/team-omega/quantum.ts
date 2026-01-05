import { BaseAgent } from '../base-agent';
import { LLMIntegration } from '../../llm/integration-layer';

export class Quantum extends BaseAgent {
  constructor(llm: LLMIntegration) {
    super('Quantum', 'omega', 'Advanced Data Scientist and Predictive Modeler', llm);
  }
}
