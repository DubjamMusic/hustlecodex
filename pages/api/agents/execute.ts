import type { NextApiRequest, NextApiResponse } from 'next';
import { ExecuteDirectiveRequest, ExecuteDirectiveResponse } from '../../../types/api-contracts';
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
  res: NextApiResponse<ExecuteDirectiveResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      moderatorJudgment: {} as any,
      validationReports: { alpha: [], omega: [] },
      executionId: '',
      timestamp: Date.now()
    });
  }

  try {
    const { directive, rulesetName, competitionMode, includeDetails } = req.body as ExecuteDirectiveRequest;

    // Validate input
    if (!directive || typeof directive !== 'string' || directive.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Directive is required and must be a non-empty string',
        moderatorJudgment: {} as any,
        validationReports: { alpha: [], omega: [] },
        executionId: '',
        timestamp: Date.now()
      });
    }

    // Sanitize input
    const sanitizedDirective = directive.trim().substring(0, 5000); // Limit length

    // Execute directive
    const orch = getOrchestrator();
    const result = await orch.executeDirective(
      sanitizedDirective,
      rulesetName || 'default-rules',
      competitionMode !== false // Default to true
    );

    const response: ExecuteDirectiveResponse = {
      success: true,
      moderatorJudgment: result.moderatorJudgment,
      validationReports: {
        alpha: result.alphaValidation,
        omega: result.omegaValidation
      },
      executionId: result.executionId,
      timestamp: result.timestamp
    };

    // Include full details if requested
    if (includeDetails) {
      (response as any).alphaOutputs = result.alphaOutputs;
      (response as any).omegaOutputs = result.omegaOutputs;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error executing directive:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      moderatorJudgment: {} as any,
      validationReports: { alpha: [], omega: [] },
      executionId: '',
      timestamp: Date.now()
    });
  }
}
