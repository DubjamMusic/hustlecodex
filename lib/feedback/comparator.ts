import { AgentOutput, TeamType } from '../../types/agents';
import { TeamPerformance } from '../../types/performance';
import { ComparisonResult } from '../../types/feedback';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface ScoringWeights {
  quality_weight: number;
  speed_weight: number;
  collaboration_weight: number;
  innovation_weight: number;
}

export class Comparator {
  private weights: ScoringWeights;

  constructor() {
    this.weights = this.loadScoringWeights();
  }

  private loadScoringWeights(): ScoringWeights {
    try {
      const weightsPath = path.join(process.cwd(), 'config', 'competition', 'scoring-weights.yaml');
      const fileContent = fs.readFileSync(weightsPath, 'utf-8');
      const data = yaml.load(fileContent) as any;
      
      return {
        quality_weight: data.quality_weight || 0.4,
        speed_weight: data.speed_weight || 0.2,
        collaboration_weight: data.collaboration_weight || 0.2,
        innovation_weight: data.innovation_weight || 0.2
      };
    } catch (error) {
      // Default weights
      return {
        quality_weight: 0.4,
        speed_weight: 0.2,
        collaboration_weight: 0.2,
        innovation_weight: 0.2
      };
    }
  }

  compareTeams(
    alphaOutputs: AgentOutput[],
    omegaOutputs: AgentOutput[],
    alphaPerformance: TeamPerformance,
    omegaPerformance: TeamPerformance
  ): ComparisonResult {
    const alphaScore = alphaPerformance.totalScore;
    const omegaScore = omegaPerformance.totalScore;

    let betterTeam: TeamType | 'tie';
    const scoreDiff = Math.abs(alphaScore - omegaScore);
    
    if (scoreDiff < 2) {
      // Very close scores - consider it a tie
      betterTeam = 'tie';
    } else {
      betterTeam = alphaScore > omegaScore ? 'alpha' : 'omega';
    }

    const reasoning = this.generateReasoning(alphaPerformance, omegaPerformance, betterTeam);

    return {
      betterTeam,
      alphaScore,
      omegaScore,
      reasoning,
      details: {
        quality: {
          alpha: alphaPerformance.qualityScore,
          omega: omegaPerformance.qualityScore
        },
        speed: {
          alpha: alphaPerformance.speedScore,
          omega: omegaPerformance.speedScore
        },
        collaboration: {
          alpha: alphaPerformance.collaborationScore,
          omega: omegaPerformance.collaborationScore
        },
        innovation: {
          alpha: alphaPerformance.innovationScore,
          omega: omegaPerformance.innovationScore
        }
      }
    };
  }

  private generateReasoning(
    alphaPerf: TeamPerformance,
    omegaPerf: TeamPerformance,
    winner: TeamType | 'tie'
  ): string {
    if (winner === 'tie') {
      return `Both teams delivered exceptional and nearly identical performance. 
Team Alpha scored ${alphaPerf.totalScore.toFixed(1)} while Team Omega scored ${omegaPerf.totalScore.toFixed(1)}.
The competition was incredibly close across all dimensions.`;
    }

    const winnerPerf = winner === 'alpha' ? alphaPerf : omegaPerf;
    const loserPerf = winner === 'alpha' ? omegaPerf : alphaPerf;
    const margin = winnerPerf.totalScore - loserPerf.totalScore;

    let reasoning = `Team ${winner === 'alpha' ? 'Alpha' : 'Omega'} wins with a score of ${winnerPerf.totalScore.toFixed(1)} vs ${loserPerf.totalScore.toFixed(1)} (margin: ${margin.toFixed(1)} points).\n\n`;

    // Identify key differentiators
    const qualityDiff = Math.abs(alphaPerf.qualityScore - omegaPerf.qualityScore);
    const speedDiff = Math.abs(alphaPerf.speedScore - omegaPerf.speedScore);
    const collabDiff = Math.abs(alphaPerf.collaborationScore - omegaPerf.collaborationScore);
    const innovationDiff = Math.abs(alphaPerf.innovationScore - omegaPerf.innovationScore);

    const diffs = [
      { name: 'Quality', diff: qualityDiff, winner: alphaPerf.qualityScore > omegaPerf.qualityScore ? 'Alpha' : 'Omega' },
      { name: 'Speed', diff: speedDiff, winner: alphaPerf.speedScore > omegaPerf.speedScore ? 'Alpha' : 'Omega' },
      { name: 'Collaboration', diff: collabDiff, winner: alphaPerf.collaborationScore > omegaPerf.collaborationScore ? 'Alpha' : 'Omega' },
      { name: 'Innovation', diff: innovationDiff, winner: alphaPerf.innovationScore > omegaPerf.innovationScore ? 'Alpha' : 'Omega' }
    ];

    const significantDiffs = diffs.filter(d => d.diff > 5).sort((a, b) => b.diff - a.diff);

    if (significantDiffs.length > 0) {
      reasoning += 'Key differentiators:\n';
      significantDiffs.forEach(d => {
        reasoning += `- **${d.name}**: Team ${d.winner} led by ${d.diff.toFixed(1)} points\n`;
      });
    }

    reasoning += '\n';
    reasoning += `**Winning Team Strengths**: ${winnerPerf.strengths.join(', ')}\n`;
    if (loserPerf.improvements.length > 0) {
      reasoning += `**Areas for Improvement (${winner === 'alpha' ? 'Omega' : 'Alpha'}**): ${loserPerf.improvements.join(', ')}`;
    }

    return reasoning;
  }

  calculateTeamScore(performance: TeamPerformance): number {
    return (
      performance.qualityScore * this.weights.quality_weight +
      performance.speedScore * this.weights.speed_weight +
      performance.collaborationScore * this.weights.collaboration_weight +
      performance.innovationScore * this.weights.innovation_weight
    );
  }
}
