/**
 * Nexus Recovery Dashboard Page
 * Main hub for AI Twin, quests, and recovery tools
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Award, TrendingUp, Calendar, Users } from 'lucide-react';
import TwinChat from '../components/TwinChat';
import DecisionSimulator from '../components/DecisionSimulator';
import QuestList from '../components/QuestList';
import type { Quest } from '../lib/supabase';

// Mock data for demonstration
const MOCK_QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Check in with your Twin',
    description: 'Have a conversation with your AI Twin about how you\'re feeling today',
    xp_reward: 10,
    creator_id: null,
    is_daily: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Simulate a decision',
    description: 'Use the decision simulator to think through a choice you\'re facing',
    xp_reward: 15,
    creator_id: null,
    is_daily: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Share your recovery milestone',
    description: 'Write about a recent victory, no matter how small',
    xp_reward: 20,
    creator_id: null,
    is_daily: false,
    created_at: new Date().toISOString(),
  },
];

export default function NexusDashboard() {
  const [activeTab, setActiveTab] = useState<'chat' | 'simulate' | 'quests'>('chat');
  const [userStats, setUserStats] = useState({
    xp: 0,
    rank: 'Seeker',
    streak: 0,
    recoveryStatus: 'recovery',
  });
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  // Check if Nexus Recovery features are enabled
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if feature flag is enabled
    const enabled = process.env.NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY === 'true';
    setIsEnabled(enabled);
  }, []);

  const handleQuestComplete = async (questId: string) => {
    // In production, this would call an API to save the completion
    setCompletedQuests([...completedQuests, questId]);
    
    // Award XP
    const quest = MOCK_QUESTS.find((q) => q.id === questId);
    if (quest) {
      setUserStats({
        ...userStats,
        xp: userStats.xp + quest.xp_reward,
      });
    }
  };

  if (!isEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-black via-prestige-blue/10 to-deep-black flex items-center justify-center">
        <Head>
          <title>Nexus Recovery - HustleCodeX</title>
        </Head>
        <div className="text-center p-8">
          <h1 className="text-3xl font-cinzel text-gold mb-4">Nexus Recovery</h1>
          <p className="text-gray-400 mb-6">
            This feature is currently disabled. Set NEXT_PUBLIC_ENABLE_NEXUS_RECOVERY=true to enable.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-deep-black font-semibold rounded-lg transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-prestige-blue/10 to-deep-black">
      <Head>
        <title>Nexus Recovery Dashboard - HustleCodeX</title>
        <meta name="description" content="Your personal recovery support dashboard powered by AI" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-cinzel text-gold mb-2">Nexus Recovery</h1>
          <p className="text-gray-400">Your AI-powered recovery companion</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-deep-black border border-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-sm text-gray-400">Rank</span>
            </div>
            <p className="text-2xl font-cinzel text-gold">{userStats.rank}</p>
          </div>
          
          <div className="bg-deep-black border border-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span className="text-sm text-gray-400">XP</span>
            </div>
            <p className="text-2xl font-cinzel text-gold">{userStats.xp}</p>
          </div>
          
          <div className="bg-deep-black border border-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-sm text-gray-400">Streak</span>
            </div>
            <p className="text-2xl font-cinzel text-gold">{userStats.streak} days</p>
          </div>
          
          <div className="bg-deep-black border border-gold/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gold" />
              <span className="text-sm text-gray-400">Status</span>
            </div>
            <p className="text-lg font-semibold text-gold capitalize">{userStats.recoveryStatus}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gold/20">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'chat'
                ? 'text-gold border-b-2 border-gold'
                : 'text-gray-400 hover:text-gold'
            }`}
          >
            AI Twin Chat
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'simulate'
                ? 'text-gold border-b-2 border-gold'
                : 'text-gray-400 hover:text-gold'
            }`}
          >
            Decision Simulator
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'quests'
                ? 'text-gold border-b-2 border-gold'
                : 'text-gray-400 hover:text-gold'
            }`}
          >
            Quests
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
          {activeTab === 'chat' && (
            <div className="h-[600px]">
              <TwinChat
                recoveryStatus={userStats.recoveryStatus}
                personality="Be supportive and empathetic, focusing on recovery and personal growth"
              />
            </div>
          )}

          {activeTab === 'simulate' && (
            <DecisionSimulator
              recoveryStatus={userStats.recoveryStatus}
              currentStreak={userStats.streak}
            />
          )}

          {activeTab === 'quests' && (
            <QuestList
              quests={MOCK_QUESTS}
              completedQuestIds={completedQuests}
              onQuestComplete={handleQuestComplete}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Nexus Recovery is part of HustleCodeX - Transforming lives through technology
          </p>
          <p className="mt-2">
            <a href="/" className="text-gold hover:underline">
              Return to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
