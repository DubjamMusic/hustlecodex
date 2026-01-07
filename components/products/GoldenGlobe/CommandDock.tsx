'use client';

interface CommandDockProps {
  statsMessage: string;
  onPulseClick: () => void;
}

export default function CommandDock({ statsMessage, onPulseClick }: CommandDockProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] max-w-[90%] bg-white/5 backdrop-blur-[20px] border border-[#d4af37] p-5 text-center">
      <div className="text-xs text-gray-400 mb-4 font-['Courier_New',monospace]">
        {statsMessage}
      </div>
      <button
        onClick={onPulseClick}
        className="bg-[#d4af37] text-black border-none px-10 py-3 font-bold uppercase tracking-[2px] cursor-pointer transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
      >
        Initiate Global Pulse
      </button>
    </div>
  );
}
