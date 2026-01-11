
import React from 'react';
import ParallaxHero from '../components/ParallaxHero';
import SupportLevels from '../components/SupportLevels';
import GameplayCarousel from '../components/GameplayCarousel';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <ParallaxHero />
      <SupportLevels />
      <GameplayCarousel />
    </main>
  );
}
