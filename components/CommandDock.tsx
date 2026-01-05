import React from 'react';

interface CommandDockProps {
  statsMessage: string;
  onPulseClick: () => void;
}

export default function CommandDock({ statsMessage, onPulseClick }: CommandDockProps) {
  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[600px] max-w-[90%] text-center"
      style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--gold)',
        padding: '20px',
      }}
    >
      <div className="text-xs text-gray-400 mb-4 font-mono">
        {statsMessage}
      </div>
      <button
        onClick={onPulseClick}
        className="bg-gold text-black border-none px-10 py-3 font-bold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] font-cinzel"
      >
        Initiate Global Pulse
      </button>
    </div>
  );
}
