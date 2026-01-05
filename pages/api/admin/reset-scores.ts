import type { NextApiRequest, NextApiResponse } from 'next';
import { ResetScoresRequest, ResetScoresResponse } from '../../../types/api-contracts';
import { CycleOrchestrator } from '../../../lib/orchestration/cycle-orchestrator';

let orchestrator: CycleOrchestrator | null = null;

function getOrchestrator(): CycleOrchestrator {
  if (!orchestrator) {
    orchestrator = new CycleOrchestrator();
  }
  return orchestrator;
}

// Simple authentication check
const ADMIN_CODE = process.env.ADMIN_CODE || 'admin123';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResetScoresResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: '',
      error: 'Method not allowed'
    });
  }

  try {
    const { period, confirmCode } = req.body as ResetScoresRequest;

    // Validate authentication
    if (confirmCode !== ADMIN_CODE) {
      return res.status(403).json({
        success: false,
        message: '',
        error: 'Invalid admin code'
      });
    }

    // Validate period
    const validPeriods = ['daily', 'monthly', 'yearly', 'all'];
    if (!period || !validPeriods.includes(period)) {
      return res.status(400).json({
        success: false,
        message: '',
        error: 'Invalid period. Must be one of: daily, monthly, yearly, all'
      });
    }

    // Reset scores
    const orch = getOrchestrator();
    await orch.resetScores(period as 'daily' | 'monthly' | 'yearly' | 'all');

    res.status(200).json({
      success: true,
      message: `Successfully reset ${period} scores`
    });
  } catch (error) {
    console.error('Error resetting scores:', error);
    res.status(500).json({
      success: false,
      message: '',
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}
