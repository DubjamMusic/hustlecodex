
import React from 'react';
import Link from 'next/link';
import ParallaxHero from '../components/ParallaxHero';
import SupportLevels from '../components/SupportLevels';
import GameplayCarousel from '../components/GameplayCarousel';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <nav className="absolute top-0 right-0 p-6 z-50">
        <Link 
          href="/profile" 
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Profile
        </Link>
      </nav>
      <ParallaxHero />
      <SupportLevels />
      <GameplayCarousel />
    </main>
  );
}
