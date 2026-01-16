-- Nexus Recovery Initial Database Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  recovery_status TEXT CHECK (recovery_status IN ('recovery', 'reentry', 'both', 'supporter')),
  xp INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Seeker',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Twin configurations
CREATE TABLE twins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  personality_prompt TEXT,
  memory_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contributions (map pins, reports, etc)
CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('report', 'meeting', 'resource', 'quest')),
  title TEXT NOT NULL,
  description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  upvotes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quests
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INTEGER DEFAULT 10,
  creator_id UUID REFERENCES profiles(id),
  is_daily BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User quest completions
CREATE TABLE quest_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quest_id, completed_at::date)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE twins ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_completions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only read/write their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own twin" ON twins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own twin" ON twins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can view contributions" ON contributions FOR SELECT USING (true);
CREATE POLICY "Users can insert contributions" ON contributions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can view quests" ON quests FOR SELECT USING (true);
CREATE POLICY "Users can insert quest completions" ON quest_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own quest completions" ON quest_completions FOR SELECT USING (auth.uid() = user_id);
