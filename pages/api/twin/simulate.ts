/**
 * API Route: Decision Simulation
 * POST /api/twin/simulate
 * Simulates decision outcomes (good path vs bad path)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { simulateDecision } from '../../../lib/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { decision, context } = req.body;

    if (!decision || typeof decision !== 'string') {
      return res.status(400).json({ error: 'Decision is required' });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        error: 'AI Twin service is not configured. Please add OPENAI_API_KEY to environment variables.' 
      });
    }

    const simulation = await simulateDecision(decision, context);

    return res.status(200).json(simulation);
  } catch (error) {
    console.error('Error in decision simulation API:', error);
    return res.status(500).json({ 
      error: 'Failed to simulate decision. Please try again.' 
    });
  }
}
