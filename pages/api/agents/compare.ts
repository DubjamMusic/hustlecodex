import type { NextApiRequest, NextApiResponse } from 'next';
import { CompareTeamsResponse } from '../../../types/api-contracts';
import { getRedisInstance } from '../../../lib/state/redis-manager';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompareTeamsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      comparison: {
        winningTeam: 'tie',
        scores: { alpha: 0, omega: 0 },
        reasoning: ''
      }
    });
  }

  try {
    const { executionId } = req.query;

    if (!executionId || typeof executionId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Execution ID is required',
        comparison: {
          winningTeam: 'tie',
          scores: { alpha: 0, omega: 0 },
          reasoning: ''
        }
      });
    }

    // Retrieve execution history
    const redis = getRedisInstance();
    const key = `history:directives:${executionId}`;
    const data = await redis.get(key);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Execution not found',
        comparison: {
          winningTeam: 'tie',
          scores: { alpha: 0, omega: 0 },
          reasoning: ''
        }
      });
    }

    const execution = JSON.parse(data);
    const judgment = execution.moderatorJudgment;

    const response: CompareTeamsResponse = {
      success: true,
      comparison: {
        winningTeam: judgment.winningTeam,
        scores: {
          alpha: judgment.teamAlphaPerformance.totalScore,
          omega: judgment.teamOmegaPerformance.totalScore
        },
        reasoning: judgment.reasoning
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error comparing teams:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      comparison: {
        winningTeam: 'tie',
        scores: { alpha: 0, omega: 0 },
        reasoning: ''
      }
    });
  }
}
