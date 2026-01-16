/**
 * OpenAI Client Configuration
 * Provides OpenAI client for AI Twin chat functionality
 */

import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate AI Twin response based on user message and context
 * @param message - User's message to the AI Twin
 * @param context - Conversation context and user information
 * @returns AI Twin's response
 */
export async function generateTwinResponse(
  message: string,
  context?: {
    recoveryStatus?: string;
    userHistory?: string[];
    personality?: string;
  }
): Promise<string> {
  try {
    const systemPrompt = `You are an AI Twin, a personal guide for someone in recovery or reentry. 
Your role is to help them make better decisions by simulating outcomes before they act.

${context?.personality || 'Be empathetic, supportive, and honest. Focus on helping the user think through decisions without being preachy.'}

Recovery Status: ${context?.recoveryStatus || 'recovery'}

Provide thoughtful advice that:
1. Helps them consider consequences
2. Supports their recovery journey
3. Encourages healthy choices
4. Shows empathy and understanding
5. Never judges or criticizes

Keep responses concise and actionable.`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history if available
    if (context?.userHistory) {
      context.userHistory.forEach((msg, idx) => {
        messages.push({
          role: idx % 2 === 0 ? 'user' : 'assistant',
          content: msg,
        });
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';
  } catch (error) {
    console.error('Error generating AI Twin response:', error);
    throw new Error('Failed to generate AI Twin response');
  }
}

/**
 * Decision simulation - helps user explore potential outcomes
 * @param decision - The decision the user is considering
 * @param context - User context
 * @returns Simulated good and bad path outcomes
 */
export async function simulateDecision(
  decision: string,
  context?: {
    recoveryStatus?: string;
    currentStreak?: number;
  }
): Promise<{ goodPath: string; badPath: string }> {
  try {
    const systemPrompt = `You are an AI Twin helping someone in recovery simulate decision outcomes.
For the given decision, provide TWO brief scenarios:
1. GOOD PATH: What happens if they make the healthy choice
2. BAD PATH: What happens if they make the risky choice

Be realistic, empathetic, and focus on recovery-relevant consequences.
Keep each path to 2-3 sentences.

Recovery Status: ${context?.recoveryStatus || 'recovery'}
Current Streak: ${context?.currentStreak || 0} days`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Help me think through this decision: ${decision}`,
        },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse the response to extract good and bad paths
    const goodPathMatch = response.match(/GOOD PATH:?\s*(.+?)(?=BAD PATH:|$)/s);
    const badPathMatch = response.match(/BAD PATH:?\s*(.+?)$/s);

    return {
      goodPath: goodPathMatch?.[1]?.trim() || 'Making the healthy choice supports your recovery journey.',
      badPath: badPathMatch?.[1]?.trim() || 'Making the risky choice could jeopardize your progress.',
    };
  } catch (error) {
    console.error('Error simulating decision:', error);
    throw new Error('Failed to simulate decision');
  }
}
