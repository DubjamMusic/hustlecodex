import { TeamType } from '../../types/agents';
import { TeamPerformance, TeamStats, Leaderboard } from '../../types/performance';
import { RedisManager } from '../state/redis-manager';

interface PerformanceRecord {
  team: TeamType;
  qualityScore: number;
  speedScore: number;
  collaborationScore: number;
  innovationScore: number;
  totalScore: number;
  timestamp: number;
}

export class PerformanceTracker {
  private redis: RedisManager;
  
  constructor(redis: RedisManager) {
    this.redis = redis;
  }

  async recordPerformance(
    team: TeamType,
    performance: TeamPerformance,
    period: 'daily' | 'monthly' | 'yearly' = 'daily'
  ): Promise<void> {
    const record: PerformanceRecord = {
      team,
      qualityScore: performance.qualityScore,
      speedScore: performance.speedScore,
      collaborationScore: performance.collaborationScore,
      innovationScore: performance.innovationScore,
      totalScore: performance.totalScore,
      timestamp: Date.now()
    };

    // Store performance record
    const key = this.getPerformanceKey(period);
    await this.redis.addToList(key, JSON.stringify(record));

    // Update team stats
    await this.updateTeamStats(team, performance, period);
  }

  async updateTeamStats(
    team: TeamType,
    performance: TeamPerformance,
    period: 'daily' | 'monthly' | 'yearly'
  ): Promise<void> {
    const statsKey = this.getStatsKey(team, period);
    const stats = await this.getTeamStats(team, period);

    // Update stats
    stats.totalExecutions += 1;
    stats.averageScore = (stats.averageScore * (stats.totalExecutions - 1) + performance.totalScore) / stats.totalExecutions;
    stats.bestScore = Math.max(stats.bestScore, performance.totalScore);
    stats.lastUpdated = Date.now();

    await this.redis.set(statsKey, JSON.stringify(stats));
  }

  async recordWin(winner: TeamType | 'tie', alphaScore: number, omegaScore: number): Promise<void> {
    for (const period of ['daily', 'monthly', 'yearly'] as const) {
      await this.updateWinStats('alpha', winner === 'alpha', winner === 'tie', period);
      await this.updateWinStats('omega', winner === 'omega', winner === 'tie', period);
    }
  }

  private async updateWinStats(
    team: TeamType,
    isWin: boolean,
    isTie: boolean,
    period: 'daily' | 'monthly' | 'yearly'
  ): Promise<void> {
    const stats = await this.getTeamStats(team, period);

    if (isWin) {
      stats.wins += 1;
      stats.winStreak += 1;
    } else if (isTie) {
      stats.ties += 1;
      stats.winStreak = 0;
    } else {
      stats.losses += 1;
      stats.winStreak = 0;
    }

    stats.lastUpdated = Date.now();
    const statsKey = this.getStatsKey(team, period);
    await this.redis.set(statsKey, JSON.stringify(stats));
  }

  async getTeamStats(team: TeamType, period: 'daily' | 'monthly' | 'yearly'): Promise<TeamStats> {
    const statsKey = this.getStatsKey(team, period);
    const data = await this.redis.get(statsKey);

    if (data) {
      return JSON.parse(data);
    }

    // Return default stats
    return {
      team,
      wins: 0,
      losses: 0,
      ties: 0,
      averageScore: 0,
      totalExecutions: 0,
      winStreak: 0,
      bestScore: 0,
      lastUpdated: Date.now()
    };
  }

  async getLeaderboard(): Promise<Leaderboard> {
    const [dailyAlpha, dailyOmega, monthlyAlpha, monthlyOmega, yearlyAlpha, yearlyOmega] = await Promise.all([
      this.getTeamStats('alpha', 'daily'),
      this.getTeamStats('omega', 'daily'),
      this.getTeamStats('alpha', 'monthly'),
      this.getTeamStats('omega', 'monthly'),
      this.getTeamStats('alpha', 'yearly'),
      this.getTeamStats('omega', 'yearly')
    ]);

    const mvpAgents = await this.getMVPAgents();

    return {
      daily: { alpha: dailyAlpha, omega: dailyOmega },
      monthly: { alpha: monthlyAlpha, omega: monthlyOmega },
      yearly: { alpha: yearlyAlpha, omega: yearlyOmega },
      mvpAgents,
      lastUpdated: Date.now()
    };
  }

  private async getMVPAgents(): Promise<Array<{ agentName: string; team: TeamType; score: number; wins: number }>> {
    // For now, return empty array - can be extended to track individual agent performance
    return [];
  }

  async resetStats(period: 'daily' | 'monthly' | 'yearly' | 'all'): Promise<void> {
    const periods = period === 'all' ? ['daily', 'monthly', 'yearly'] : [period];
    
    for (const p of periods) {
      for (const team of ['alpha', 'omega'] as TeamType[]) {
        const statsKey = this.getStatsKey(team, p as any);
        await this.redis.delete(statsKey);
      }
      const perfKey = this.getPerformanceKey(p as any);
      await this.redis.delete(perfKey);
    }
  }

  private getStatsKey(team: TeamType, period: string): string {
    const date = new Date();
    let suffix = '';
    
    if (period === 'daily') {
      suffix = date.toISOString().split('T')[0];
    } else if (period === 'monthly') {
      suffix = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } else if (period === 'yearly') {
      suffix = `${date.getFullYear()}`;
    }
    
    return `performance:${period}:${team}:${suffix}`;
  }

  private getPerformanceKey(period: string): string {
    const date = new Date();
    let suffix = '';
    
    if (period === 'daily') {
      suffix = date.toISOString().split('T')[0];
    } else if (period === 'monthly') {
      suffix = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } else if (period === 'yearly') {
      suffix = `${date.getFullYear()}`;
    }
    
    return `performance:records:${period}:${suffix}`;
  }
}
