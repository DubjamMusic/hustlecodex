
import React, { useState, useRef } from 'react';
import PrestigeSidebar from '../components/PrestigeSidebar';
import GoldenGlobe, { GoldenGlobeRef } from '../components/GoldenGlobe';
import CommandDock from '../components/CommandDock';
import SupportLevels from '../components/SupportLevels';
import GameplayCarousel from '../components/GameplayCarousel';

export default function Home() {
  const [statsMessage, setStatsMessage] = useState(
    'The Routing Hub currently handles 1,000 requests/sec across 200+ edge nodes.'
  );
  const [pulseCount, setPulseCount] = useState(0);
  const globeRef = useRef<GoldenGlobeRef>(null);

  const handleSectorSelect = (sectorId: number) => {
    setStatsMessage(
      `SECTOR 01 ACTIVE • Full access granted • Monitoring ${
        1000 + Math.floor(Math.random() * 500)
      } concurrent connections`
    );
  };

  const handleLockedSectorClick = (sectorId: number) => {
    const messages: Record<number, string> = {
      2: 'SECTOR 02 LOCKED • Cipher Vault requires 5,000 credits or premium access',
      3: 'SECTOR 03 LOCKED • Specter Lab requires 10,000 credits or enterprise tier',
      4: 'SECTOR 04 LOCKED • Nexus Core available via private sale only • Contact: access@goldenglobetech.io',
    };
    setStatsMessage(messages[sectorId] || '');
  };

  const handlePulseClick = () => {
    const newPulseCount = pulseCount + 1;
    setPulseCount(newPulseCount);
    
    setStatsMessage(
      `PULSE ${newPulseCount} INITIATED • Simulating distributed load across ${
        200 + newPulseCount * 10
      } edge nodes...`
    );

    // Trigger the globe animation
    if (globeRef.current) {
      globeRef.current.createPulseStreaks();
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Dashboard Layout - Sidebar + Globe */}
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] grid-rows-[auto_1fr] md:grid-rows-1 h-screen overflow-hidden">
        <div className="md:border-r-0 border-b md:border-b-0 border-gold md:max-h-none max-h-[40vh]">
          <PrestigeSidebar
            onSectorSelect={handleSectorSelect}
            onLockedSectorClick={handleLockedSectorClick}
          />
        </div>
        
        <div className="relative">
          <GoldenGlobe ref={globeRef} />
          <CommandDock statsMessage={statsMessage} onPulseClick={handlePulseClick} />
        </div>
      </div>

      {/* Below the fold sections */}
      <div className="overflow-x-hidden">
        <SupportLevels />
        <GameplayCarousel />
      </div>
    </main>
  );
}
