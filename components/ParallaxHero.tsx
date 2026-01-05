import React from 'react';

function ParallaxHero() {
  return (
    <div className="relative h-[50vh] bg-gradient-to-r from-purple-900 via-black to-pink-900 grid place-items-center">
      <h1 className="text-5xl font-bold text-cyan-400 tracking-wide">
        HUSTLECODEX OMNIVERSE
      </h1>
    </div>
  );
}

export default React.memo(ParallaxHero);
