/**
 * API Route: AI Twin Chat
 * POST /api/twin/chat
 * Handles conversation with the AI Twin
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { generateTwinResponse } from '../../../lib/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        error: 'AI Twin service is not configured. Please add OPENAI_API_KEY to environment variables.' 
      });
    }

    const response = await generateTwinResponse(message, context);

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error in twin chat API:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response. Please try again.' 
    });
  }
}
