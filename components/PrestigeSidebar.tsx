import React, { useState } from 'react';

interface Sector {
  id: number;
  title: string;
  description: string;
  price: string;
  locked: boolean;
}

const sectors: Sector[] = [
  {
    id: 1,
    title: 'SECTOR 01: ROUTING HUB',
    description: 'O(1) Mux Logic • Edge Efficiency',
    price: 'UNLOCKED',
    locked: false,
  },
  {
    id: 2,
    title: 'SECTOR 02: THE CIPHER VAULT',
    description: 'RSA-256 Auth • Zero-Trust Architect',
    price: '5,000 🔲',
    locked: true,
  },
  {
    id: 3,
    title: 'SECTOR 03: THE SPECTER LAB',
    description: 'Anomaly Detection • Ghost-Work Protocol',
    price: '10,000 🔲',
    locked: true,
  },
  {
    id: 4,
    title: 'SECTOR 04: NEXUS CORE',
    description: 'Full Global Orchestration',
    price: 'PRIVATE SALE ONLY',
    locked: true,
  },
];

interface PrestigeSidebarProps {
  onSectorSelect: (sectorId: number) => void;
  onLockedSectorClick: (sectorId: number) => void;
}

export default function PrestigeSidebar({ onSectorSelect, onLockedSectorClick }: PrestigeSidebarProps) {
  const handleSectorClick = (sector: Sector) => {
    if (sector.locked) {
      onLockedSectorClick(sector.id);
    } else {
      onSectorSelect(sector.id);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-black border-r md:border-r border-b md:border-b-0 border-gold p-5 flex flex-col gap-4 overflow-y-auto h-full">
      <h2 className="text-gold text-sm font-cinzel tracking-[3px] mt-0 font-bold">
        COMPLEX HIERARCHY
      </h2>

      {sectors.map((sector) => (
        <div
          key={sector.id}
          onClick={() => handleSectorClick(sector)}
          className={`
            relative border border-gray-700 p-4 transition-all duration-300 bg-black/30
            ${sector.locked
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer hover:border-gold hover:bg-gold/5 hover:translate-x-1'
            }
          `}
        >
          <div className="absolute top-1 right-1 text-xs text-gold font-bold">
            {sector.price}
          </div>
          <strong className="font-cinzel text-white">{sector.title}</strong>
          <p className="text-xs mt-2 opacity-80 text-white font-cinzel">
            {sector.description}
          </p>
        </div>
      ))}
    </div>
  );
}
