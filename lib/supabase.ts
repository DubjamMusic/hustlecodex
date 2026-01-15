/**
 * Supabase Client Configuration
 * Provides Supabase client instances for browser and server-side operations
 */

import { createClient } from '@supabase/supabase-js';

// Browser-side client (uses public anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Server-side client (uses service role key for admin operations)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Type definitions for database tables
export interface Profile {
  id: string;
  username: string | null;
  recovery_status: 'recovery' | 'reentry' | 'both' | 'supporter';
  xp: number;
  rank: string;
  created_at: string;
}

export interface Twin {
  id: string;
  user_id: string;
  personality_prompt: string | null;
  memory_json: Record<string, unknown>;
  created_at: string;
}

export interface Contribution {
  id: string;
  user_id: string;
  type: 'report' | 'meeting' | 'resource' | 'quest';
  title: string;
  description: string | null;
  location_lat: number | null;
  location_lng: number | null;
  upvotes: number;
  status: string;
  created_at: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  creator_id: string | null;
  is_daily: boolean;
  created_at: string;
}

export interface QuestCompletion {
  id: string;
  user_id: string;
  quest_id: string;
  completed_at: string;
}
