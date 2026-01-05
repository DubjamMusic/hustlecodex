import type { NextApiRequest, NextApiResponse } from 'next';
import { LeaderboardResponse } from '../../../types/api-contracts';
import { CycleOrchestrator } from '../../../lib/orchestration/cycle-orchestrator';

let orchestrator: CycleOrchestrator | null = null;

function getOrchestrator(): CycleOrchestrator {
  if (!orchestrator) {
    orchestrator = new CycleOrchestrator();
  }
  return orchestrator;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderboardResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      leaderboard: {
        alpha: { wins: 0, losses: 0, ties: 0, averageScore: 0 },
        omega: { wins: 0, losses: 0, ties: 0, averageScore: 0 }
      },
      mvpAgents: []
    });
  }

  try {
    const orch = getOrchestrator();
    const leaderboard = await orch.getLeaderboard();

    // Get the requested period from query params
    const period = (req.query.period as string) || 'daily';
    
    let stats;
    if (period === 'monthly') {
      stats = leaderboard.monthly;
    } else if (period === 'yearly') {
      stats = leaderboard.yearly;
    } else {
      stats = leaderboard.daily;
    }

    const response: LeaderboardResponse = {
      success: true,
      leaderboard: {
        alpha: {
          wins: stats.alpha.wins,
          losses: stats.alpha.losses,
          ties: stats.alpha.ties,
          averageScore: stats.alpha.averageScore
        },
        omega: {
          wins: stats.omega.wins,
          losses: stats.omega.losses,
          ties: stats.omega.ties,
          averageScore: stats.omega.averageScore
        }
      },
      mvpAgents: leaderboard.mvpAgents.map(agent => ({
        name: agent.agentName,
        team: agent.team,
        score: agent.score
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      leaderboard: {
        alpha: { wins: 0, losses: 0, ties: 0, averageScore: 0 },
        omega: { wins: 0, losses: 0, ties: 0, averageScore: 0 }
      },
      mvpAgents: []
    });
  }
}
