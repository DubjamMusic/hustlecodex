/**
 * Quest List Component
 * Displays available quests and allows users to complete them
 */

import { useState } from 'react';
import { Trophy, Target, Star, CheckCircle } from 'lucide-react';
import type { Quest } from '../lib/supabase';

interface QuestListProps {
  quests?: Quest[];
  completedQuestIds?: string[];
  onQuestComplete?: (questId: string) => void;
}

export default function QuestList({
  quests = [],
  completedQuestIds = [],
  onQuestComplete,
}: QuestListProps) {
  const [completingQuestId, setCompletingQuestId] = useState<string | null>(null);

  const handleCompleteQuest = async (questId: string) => {
    setCompletingQuestId(questId);
    if (onQuestComplete) {
      await onQuestComplete(questId);
    }
    setCompletingQuestId(null);
  };

  const isCompleted = (questId: string) => completedQuestIds.includes(questId);

  return (
    <div className="bg-deep-black border border-gold/20 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-gold" />
        <div>
          <h3 className="text-lg font-cinzel text-gold">Quests</h3>
          <p className="text-xs text-gray-400">
            Complete quests to earn XP and level up
          </p>
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        {quests.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No quests available yet</p>
            <p className="text-sm text-gray-500">Check back soon for new challenges!</p>
          </div>
        ) : (
          quests.map((quest) => {
            const completed = isCompleted(quest.id);
            const isCompleting = completingQuestId === quest.id;

            return (
              <div
                key={quest.id}
                className={`border rounded-lg p-4 transition-all ${
                  completed
                    ? 'border-green-500/30 bg-green-900/10'
                    : 'border-gold/20 bg-deep-black/50 hover:border-gold/40'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {quest.is_daily && (
                        <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                          Daily
                        </span>
                      )}
                      <h4 className="font-semibold text-white">{quest.title}</h4>
                    </div>
                    {quest.description && (
                      <p className="text-sm text-gray-300 mb-3">
                        {quest.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-gold" />
                      <span className="text-gold font-semibold">
                        +{quest.xp_reward} XP
                      </span>
                    </div>
                  </div>

                  {/* Complete Button */}
                  <div>
                    {completed ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Completed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCompleteQuest(quest.id)}
                        disabled={isCompleting}
                        className="px-4 py-2 bg-gold hover:bg-gold/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-deep-black font-semibold rounded-lg transition-colors text-sm"
                      >
                        {isCompleting ? 'Completing...' : 'Complete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
