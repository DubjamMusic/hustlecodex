'use client';

import { useState, useEffect, useRef } from 'react';
import CommandDock from './CommandDock';

interface DataStreak {
  id: number;
  left: string;
  duration: string;
  delay: string;
}

export default function GlobeViewport() {
  const [pulseCount, setPulseCount] = useState(0);
  const [statsMessage, setStatsMessage] = useState(
    "The Routing Hub currently handles 1,000 requests/sec across 200+ edge nodes."
  );
  const [nodeCount, setNodeCount] = useState({ nodes: 247, latency: 23 });
  const [dataStreaks, setDataStreaks] = useState<DataStreak[]>([]);
  const streakIdRef = useRef(0);

  // Ambient animation - continuous data streaks
  useEffect(() => {
    const interval = setInterval(() => {
      const id = streakIdRef.current++;
      const newStreak: DataStreak = {
        id,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 2 + 1}s`,
        delay: '0s'
      };

      setDataStreaks(prev => [...prev, newStreak]);

      // Remove streak after animation completes
      setTimeout(() => {
        setDataStreaks(prev => prev.filter(s => s.id !== id));
      }, 3000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const simulateLoad = () => {
    const newPulseCount = pulseCount + 1;
    setPulseCount(newPulseCount);

    setStatsMessage(
      `PULSE ${newPulseCount} INITIATED • Simulating distributed load across ${200 + (newPulseCount * 10)} edge nodes...`
    );

    // Create multiple data streaks
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const id = streakIdRef.current++;
        const newStreak: DataStreak = {
          id,
          left: `${Math.random() * 100}%`,
          duration: `${Math.random() * 1 + 0.5}s`,
          delay: `${Math.random() * 0.5}s`
        };

        setDataStreaks(prev => [...prev, newStreak]);

        setTimeout(() => {
          setDataStreaks(prev => prev.filter(s => s.id !== id));
        }, 2500);
      }, i * 80);
    }

    // Update node count with realistic fluctuation
    setTimeout(() => {
      const nodes = 247 + Math.floor(Math.random() * 20);
      const latency = 20 + Math.floor(Math.random() * 15);
      setNodeCount({ nodes, latency });
    }, 1000);
  };

  const handleSectorSelect = (sectorId: number) => {
    setStatsMessage(
      `SECTOR 01 ACTIVE • Full access granted • Monitoring ${1000 + Math.floor(Math.random() * 500)} concurrent connections`
    );
  };

  const handlePaywallShow = (sectorId: number, message: string) => {
    setStatsMessage(message);
  };

  return (
    <div className="relative bg-[radial-gradient(circle,#1a1a1a_0%,#000_100%)] flex justify-center items-center overflow-hidden">
      {/* Data Streaks */}
      {dataStreaks.map(streak => (
        <div
          key={streak.id}
          className="absolute w-0.5 h-24 bg-gradient-to-b from-transparent to-[#d4af37] blur-[1px] pointer-events-none animate-fall"
          style={{
            left: streak.left,
            animationDuration: streak.duration,
            animationDelay: streak.delay,
            opacity: 0.3
          }}
        />
      ))}

      {/* Central Orb */}
      <div className="w-96 h-96 md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#1a1a1a,#000)] shadow-[0_0_100px_rgba(212,175,55,0.3),inset_0_0_50px_rgba(212,175,55,0.2),inset_-20px_-20px_40px_rgba(0,0,0,0.8)] border-2 border-[#d4af37] flex justify-center items-center overflow-hidden relative">
        <div className="text-[#d4af37] text-center z-[2] relative">
          <h1 className="m-0 text-4xl font-['Cinzel',serif]">GOLDEN GLOBE</h1>
          <p className="text-[0.6rem] opacity-60 mt-2 mb-0 font-['Courier_New',monospace]">
            RUST_WASM_ENGINE_ACTIVE
          </p>
          <p className="text-[0.5rem] opacity-40 mt-1 mb-0 font-['Courier_New',monospace]">
            NODES: {nodeCount.nodes} | LATENCY: {nodeCount.latency}ms
          </p>
        </div>
      </div>

      {/* Command Dock */}
      <CommandDock
        statsMessage={statsMessage}
        onPulseClick={simulateLoad}
      />

      {/* Keyframe animation for data streaks */}
      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(-500px) rotate(45deg);
            opacity: 1;
          }
          to {
            transform: translateY(500px) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
