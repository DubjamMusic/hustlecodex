import { AgentOutput } from '../../types/agents';
import { ValidationRule, FeedbackResult, ValidationReport } from '../../types/feedback';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface RulesetYaml {
  name: string;
  description: string;
  rules: Array<{
    id: string;
    name: string;
    description: string;
    type: 'programmatic' | 'llm';
    severity: 'error' | 'warning' | 'info';
    min_chars?: number;
  }>;
}

export class RulesetEngine {
  private rulesets: Map<string, ValidationRule[]> = new Map();

  async loadRuleset(name: string): Promise<void> {
    const rulesetPath = path.join(process.cwd(), 'config', 'rulesets', `${name}.yaml`);
    
    try {
      const fileContent = fs.readFileSync(rulesetPath, 'utf-8');
      const rulesetData = yaml.load(fileContent) as RulesetYaml;
      
      const rules: ValidationRule[] = rulesetData.rules.map(ruleConfig => {
        return {
          id: ruleConfig.id,
          name: ruleConfig.name,
          description: ruleConfig.description,
          type: ruleConfig.type,
          severity: ruleConfig.severity,
          check: this.createCheckFunction(ruleConfig)
        };
      });
      
      this.rulesets.set(name, rules);
    } catch (error) {
      console.error(`Failed to load ruleset ${name}:`, error);
      // Load default rules as fallback
      this.loadDefaultRules(name);
    }
  }

  private createCheckFunction(ruleConfig: any): (output: AgentOutput) => boolean | Promise<boolean> {
    const { id, type, min_chars } = ruleConfig;

    // Programmatic checks
    if (type === 'programmatic') {
      if (id === 'min_length' && min_chars) {
        return (output: AgentOutput) => output.content.length >= min_chars;
      }
      if (id === 'confidence_present') {
        return (output: AgentOutput) => output.confidence > 0 && output.confidence <= 100;
      }
      if (id === 'structured_format') {
        return (output: AgentOutput) => {
          // Check for common structure markers
          return output.content.includes('**') || output.content.includes('##') || output.content.includes('- ');
        };
      }
    }

    // LLM-based checks would be implemented here
    // For now, return a placeholder that passes
    if (type === 'llm') {
      return async (output: AgentOutput) => {
        // In production, this would call an LLM to evaluate
        // For now, we'll do basic heuristics
        if (id === 'logical_consistency') {
          return output.content.length > 100 && output.confidence > 50;
        }
        if (id === 'actionable_insights') {
          return output.content.toLowerCase().includes('recommend') || 
                 output.content.toLowerCase().includes('should') ||
                 output.content.toLowerCase().includes('strategy');
        }
        if (id === 'no_contradictions') {
          return true; // Placeholder
        }
        return true;
      };
    }

    // Default: always pass
    return () => true;
  }

  private loadDefaultRules(name: string): void {
    const defaultRules: ValidationRule[] = [
      {
        id: 'min_length',
        name: 'Minimum Content Length',
        description: 'Output must contain at least 100 characters',
        type: 'programmatic',
        severity: 'error',
        check: (output) => output.content.length >= 100
      },
      {
        id: 'confidence_present',
        name: 'Confidence Score Present',
        description: 'Output must include a confidence score',
        type: 'programmatic',
        severity: 'error',
        check: (output) => output.confidence > 0 && output.confidence <= 100
      }
    ];
    
    this.rulesets.set(name, defaultRules);
  }

  async validate(output: AgentOutput, rulesetName: string = 'default-rules'): Promise<ValidationReport> {
    // Ensure ruleset is loaded
    if (!this.rulesets.has(rulesetName)) {
      await this.loadRuleset(rulesetName);
    }

    const rules = this.rulesets.get(rulesetName) || [];
    const results: FeedbackResult[] = [];
    let passedCount = 0;

    for (const rule of rules) {
      try {
        const passed = await rule.check(output);
        
        results.push({
          passed,
          ruleName: rule.name,
          ruleId: rule.id,
          severity: rule.severity,
          message: passed ? `✓ ${rule.name}` : `✗ ${rule.name}: ${rule.description}`,
          suggestion: passed ? undefined : this.getSuggestion(rule.id)
        });

        if (passed) passedCount++;
      } catch (error) {
        results.push({
          passed: false,
          ruleName: rule.name,
          ruleId: rule.id,
          severity: rule.severity,
          message: `✗ ${rule.name}: Check failed with error`,
          suggestion: 'Unable to validate - check failed'
        });
      }
    }

    const overallScore = rules.length > 0 ? (passedCount / rules.length) * 100 : 100;
    const passed = results.filter(r => r.severity === 'error').every(r => r.passed);

    return {
      team: output.team,
      agentName: output.agentName,
      passed,
      results,
      overallScore,
      timestamp: Date.now()
    };
  }

  private getSuggestion(ruleId: string): string {
    const suggestions: Record<string, string> = {
      'min_length': 'Provide more detailed analysis with supporting evidence',
      'confidence_present': 'Include a confidence score (0-100%) in your output',
      'structured_format': 'Use markdown formatting with headers and bullet points',
      'logical_consistency': 'Ensure all statements logically support each other',
      'actionable_insights': 'Include specific, actionable recommendations',
      'no_contradictions': 'Review output to eliminate contradictory statements'
    };
    
    return suggestions[ruleId] || 'Review and improve this aspect of your output';
  }
}
