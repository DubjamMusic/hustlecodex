/**
 * Decision Simulator Component
 * Helps users visualize potential outcomes of their decisions
 */

import { useState } from 'react';
import { GitBranch, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

interface DecisionSimulatorProps {
  recoveryStatus?: string;
  currentStreak?: number;
}

export default function DecisionSimulator({
  recoveryStatus,
  currentStreak,
}: DecisionSimulatorProps) {
  const [decision, setDecision] = useState('');
  const [simulation, setSimulation] = useState<{
    goodPath: string;
    badPath: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateDecision = async () => {
    if (!decision.trim() || isLoading) return;

    setIsLoading(true);
    setSimulation(null);

    try {
      const response = await fetch('/api/twin/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          context: { recoveryStatus, currentStreak },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to simulate decision');
      }

      const data = await response.json();
      setSimulation(data);
    } catch (error) {
      console.error('Error simulating decision:', error);
      setSimulation({
        goodPath: 'Unable to simulate at this time. Please try again.',
        badPath: 'Unable to simulate at this time. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      simulateDecision();
    }
  };

  return (
    <div className="bg-deep-black border border-gold/20 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="w-6 h-6 text-gold" />
        <div>
          <h3 className="text-lg font-cinzel text-gold">Decision Simulator</h3>
          <p className="text-xs text-gray-400">
            See the potential paths before you choose
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label htmlFor="decision" className="block text-sm text-gray-300 mb-2">
          What decision are you facing?
        </label>
        <textarea
          id="decision"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Should I go to that party tonight?"
          className="w-full bg-deep-black/50 border border-gold/20 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 resize-none"
          rows={3}
          disabled={isLoading}
        />
      </div>

      {/* Simulate Button */}
      <button
        onClick={simulateDecision}
        disabled={!decision.trim() || isLoading}
        className="w-full bg-gold hover:bg-gold/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-deep-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
      >
        {isLoading ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Simulating...
          </>
        ) : (
          <>
            <GitBranch className="w-4 h-4" />
            Simulate Decision
          </>
        )}
      </button>

      {/* Results */}
      {simulation && (
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
          {/* Good Path */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-green-400">Good Path</h4>
            </div>
            <p className="text-sm text-gray-200">{simulation.goodPath}</p>
          </div>

          {/* Bad Path */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsDown className="w-5 h-5 text-red-400" />
              <h4 className="font-semibold text-red-400">Bad Path</h4>
            </div>
            <p className="text-sm text-gray-200">{simulation.badPath}</p>
          </div>
        </div>
      )}

      {/* Info */}
      {!simulation && !isLoading && (
        <div className="text-center text-sm text-gray-400">
          <p>Describe your situation and we'll help you explore the outcomes</p>
        </div>
      )}
    </div>
  );
}
