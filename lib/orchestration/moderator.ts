import { AgentOutput, TeamType } from '../../types/agents';
import { ModeratorJudgment, TeamPerformance } from '../../types/performance';
import { ValidationReport } from '../../types/feedback';
import { Comparator } from '../feedback/comparator';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface PraiseTemplates {
  victory: {
    decisive: string[];
    close: string[];
    comeback?: string[];
  };
  tie: string[];
  streak_milestones: Record<number, string>;
}

export class Moderator {
  private comparator: Comparator;
  private praiseTemplates: PraiseTemplates;

  constructor() {
    this.comparator = new Comparator();
    this.praiseTemplates = this.loadPraiseTemplates();
  }

  private loadPraiseTemplates(): PraiseTemplates {
    try {
      const templatesPath = path.join(process.cwd(), 'config', 'competition', 'praise-templates.yaml');
      const fileContent = fs.readFileSync(templatesPath, 'utf-8');
      return yaml.load(fileContent) as PraiseTemplates;
    } catch (error) {
      // Default templates
      return {
        victory: {
          decisive: ['🏆 **{team} DOMINATES!** A commanding victory!'],
          close: ['🥇 **{team} Edges Out Victory!** Well fought!']
        },
        tie: ['🤝 **Dead Heat!** Both teams delivered excellence!'],
        streak_milestones: {
          3: '🔥 **3-Win Streak!** {team} is on fire!',
          5: '⚡ **5-Win Streak!** {team} is dominating!'
        }
      };
    }
  }

  async judge(
    alphaOutputs: AgentOutput[],
    omegaOutputs: AgentOutput[],
    alphaValidation: ValidationReport[],
    omegaValidation: ValidationReport[],
    currentStreak?: { team: TeamType; count: number }
  ): Promise<ModeratorJudgment> {
    // Calculate performance for both teams
    const alphaPerformance = this.calculateTeamPerformance('alpha', alphaOutputs, alphaValidation);
    const omegaPerformance = this.calculateTeamPerformance('omega', omegaOutputs, omegaValidation);

    // Compare teams
    const comparison = this.comparator.compareTeams(
      alphaOutputs,
      omegaOutputs,
      alphaPerformance,
      omegaPerformance
    );

    // Generate synthesis
    const synthesis = this.generateSynthesis(alphaOutputs, omegaOutputs, comparison.betterTeam);

    // Generate praise message
    const praiseMessage = this.generatePraise(
      comparison.betterTeam,
      alphaPerformance.totalScore,
      omegaPerformance.totalScore,
      currentStreak
    );

    // Determine if we should continue (no critical failures)
    const shouldContinue = this.shouldContinue(alphaValidation, omegaValidation);

    // Calculate confidence in judgment
    const confidence = this.calculateConfidence(alphaPerformance, omegaPerformance, alphaValidation, omegaValidation);

    return {
      winningTeam: comparison.betterTeam,
      synthesis,
      teamAlphaPerformance: alphaPerformance,
      teamOmegaPerformance: omegaPerformance,
      reasoning: comparison.reasoning,
      praiseMessage,
      shouldContinue,
      confidence,
      timestamp: Date.now()
    };
  }

  private calculateTeamPerformance(
    team: TeamType,
    outputs: AgentOutput[],
    validations: ValidationReport[]
  ): TeamPerformance {
    // Calculate quality score (based on validation and confidence)
    const avgValidationScore = validations.reduce((sum, v) => sum + v.overallScore, 0) / validations.length;
    const avgConfidence = outputs.reduce((sum, o) => sum + o.confidence, 0) / outputs.length;
    const qualityScore = (avgValidationScore * 0.6 + avgConfidence * 0.4);

    // Calculate speed score (based on processing time)
    const totalProcessingTime = outputs.reduce((sum, o) => sum + o.processingTime, 0);
    const avgProcessingTime = totalProcessingTime / outputs.length;
    const speedScore = Math.max(0, 100 - (avgProcessingTime / 100)); // Penalize slower times

    // Calculate collaboration score (how well outputs build on each other)
    const collaborationScore = this.assessCollaboration(outputs);

    // Calculate innovation score (uniqueness and creativity)
    const innovationScore = this.assessInnovation(outputs);

    // Calculate total score using weights from comparator
    const totalScore = this.comparator.calculateTeamScore({
      team,
      qualityScore,
      speedScore,
      collaborationScore,
      innovationScore,
      totalScore: 0,
      strengths: [],
      improvements: []
    });

    // Identify strengths and improvements
    const scores = { qualityScore, speedScore, collaborationScore, innovationScore };
    const strengths = this.identifyStrengths(scores);
    const improvements = this.identifyImprovements(scores);

    return {
      team,
      qualityScore,
      speedScore,
      collaborationScore,
      innovationScore,
      totalScore,
      strengths,
      improvements
    };
  }

  private assessCollaboration(outputs: AgentOutput[]): number {
    // Simple heuristic: check if later outputs reference earlier ones
    let score = 70; // Base score
    
    for (let i = 1; i < outputs.length; i++) {
      const currentContent = outputs[i].content.toLowerCase();
      const previousAgent = outputs[i - 1].agentName.toLowerCase();
      
      // Check if current output references previous agent's work
      if (currentContent.includes(previousAgent) || 
          currentContent.includes('analysis') ||
          currentContent.includes('based on')) {
        score += 10;
      }
    }
    
    return Math.min(100, score);
  }

  private assessInnovation(outputs: AgentOutput[]): number {
    // Simple heuristic: check for innovative language and unique insights
    let score = 60; // Base score
    
    const innovativeKeywords = [
      'novel', 'innovative', 'unique', 'breakthrough', 'unprecedented',
      'cutting-edge', 'revolutionary', 'groundbreaking', 'unconventional'
    ];
    
    outputs.forEach(output => {
      const content = output.content.toLowerCase();
      innovativeKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
          score += 5;
        }
      });
    });
    
    // Check for detailed, comprehensive analysis
    const avgLength = outputs.reduce((sum, o) => sum + o.content.length, 0) / outputs.length;
    if (avgLength > 800) score += 10;
    if (avgLength > 1200) score += 10;
    
    return Math.min(100, score);
  }

  private identifyStrengths(scores: Record<string, number>): string[] {
    const strengths: string[] = [];
    const entries = Object.entries(scores);
    
    entries.forEach(([key, value]) => {
      if (value >= 85) {
        const name = key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim();
        strengths.push(`Excellent ${name.toLowerCase()}`);
      }
    });
    
    if (strengths.length === 0) {
      // Find highest score
      const highest = entries.reduce((a, b) => b[1] > a[1] ? b : a);
      const name = highest[0].replace('Score', '').replace(/([A-Z])/g, ' $1').trim();
      strengths.push(`Strong ${name.toLowerCase()}`);
    }
    
    return strengths;
  }

  private identifyImprovements(scores: Record<string, number>): string[] {
    const improvements: string[] = [];
    
    Object.entries(scores).forEach(([key, value]) => {
      if (value < 70) {
        const name = key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim();
        improvements.push(`Enhance ${name.toLowerCase()}`);
      }
    });
    
    return improvements;
  }

  private generateSynthesis(
    alphaOutputs: AgentOutput[],
    omegaOutputs: AgentOutput[],
    winner: TeamType | 'tie'
  ): string {
    const alphaNexus = alphaOutputs.find(o => o.agentName === 'Nexus');
    const omegaApex = omegaOutputs.find(o => o.agentName === 'Apex');

    let synthesis = '## Moderator Synthesis\n\n';
    
    if (winner === 'tie') {
      synthesis += 'Both teams delivered outstanding strategic analyses with remarkable parity. ';
      synthesis += 'The synthesis combines the best insights from both approaches:\n\n';
    } else {
      synthesis += `Team ${winner === 'alpha' ? 'Alpha' : 'Omega'} delivered the superior strategic framework. `;
      synthesis += 'However, valuable insights from both teams merit consideration:\n\n';
    }

    synthesis += '### Key Strategic Recommendations:\n';
    synthesis += '1. Leverage data-driven insights to identify high-value opportunities\n';
    synthesis += '2. Implement comprehensive risk management with contingency planning\n';
    synthesis += '3. Balance aggressive execution with defensive positioning\n';
    synthesis += '4. Establish clear metrics and monitoring systems\n';
    synthesis += '5. Maintain flexibility for adaptive response\n\n';

    synthesis += '### Integrated Approach:\n';
    synthesis += 'Combining Team Alpha\'s methodical risk management with Team Omega\'s aggressive optimization ';
    synthesis += 'yields a robust strategy that maximizes opportunity while minimizing exposure to catastrophic failure.\n';

    return synthesis;
  }

  private generatePraise(
    winner: TeamType | 'tie',
    alphaScore: number,
    omegaScore: number,
    currentStreak?: { team: TeamType; count: number }
  ): string {
    if (winner === 'tie') {
      const template = this.praiseTemplates.tie[0];
      return template.replace('{score}', alphaScore.toFixed(1));
    }

    const margin = Math.abs(alphaScore - omegaScore);
    const winningScore = winner === 'alpha' ? alphaScore : omegaScore;
    const losingScore = winner === 'alpha' ? omegaScore : alphaScore;

    let template: string;
    if (margin > 15) {
      template = this.praiseTemplates.victory.decisive[0];
    } else {
      template = this.praiseTemplates.victory.close[0];
    }

    let praise = template
      .replace(/{team}/g, `Team ${winner === 'alpha' ? 'Alpha' : 'Omega'}`)
      .replace('{margin}', margin.toFixed(1))
      .replace('{winning_score}', winningScore.toFixed(1))
      .replace('{losing_score}', losingScore.toFixed(1))
      .replace('{strength}', winner === 'alpha' ? 'balanced strategy' : 'aggressive optimization');

    // Add streak milestone if applicable
    if (currentStreak && currentStreak.team === winner && this.praiseTemplates.streak_milestones[currentStreak.count]) {
      const streakMsg = this.praiseTemplates.streak_milestones[currentStreak.count]
        .replace('{team}', `Team ${winner === 'alpha' ? 'Alpha' : 'Omega'}`);
      praise += '\n' + streakMsg;
    }

    return praise;
  }

  private shouldContinue(
    alphaValidation: ValidationReport[],
    omegaValidation: ValidationReport[]
  ): boolean {
    // Check for critical failures
    const hasCriticalFailure = [...alphaValidation, ...omegaValidation].some(report => {
      return report.results.some(result => 
        result.severity === 'error' && !result.passed
      );
    });

    return !hasCriticalFailure;
  }

  private calculateConfidence(
    alphaPerf: TeamPerformance,
    omegaPerf: TeamPerformance,
    alphaValidation: ValidationReport[],
    omegaValidation: ValidationReport[]
  ): number {
    // Base confidence on validation scores and score difference
    const avgAlphaValidation = alphaValidation.reduce((sum, v) => sum + v.overallScore, 0) / alphaValidation.length;
    const avgOmegaValidation = omegaValidation.reduce((sum, v) => sum + v.overallScore, 0) / omegaValidation.length;
    
    const validationScore = (avgAlphaValidation + avgOmegaValidation) / 2;
    const scoreDiff = Math.abs(alphaPerf.totalScore - omegaPerf.totalScore);
    
    // Higher score difference = higher confidence in winner
    const diffConfidence = Math.min(scoreDiff * 2, 30);
    
    return Math.min(100, validationScore * 0.7 + diffConfidence);
  }
}
