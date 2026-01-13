import React from 'react';
import Image from 'next/image';

// Extract static data to avoid recreating on every render
const GAMEPLAY_IMAGES = [
  { id: 'give-miracles', filename: 'give-miracles.jpg', alt: 'Give Miracles' },
  { id: 'choose-rituals', filename: 'choose-rituals.jpg', alt: 'Choose Rituals' },
  { id: 'make-decisions', filename: 'make-decisions.jpg', alt: 'Make Decisions' },
];

function GameplayCarousel() {
  return (
    <section className="p-8 bg-gradient-to-r from-black to-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Gameplay Showcase</h2>
      <div className="flex overflow-x-scroll space-x-6">
        {GAMEPLAY_IMAGES.map((image) => (
          <Image
            key={image.id}
            src={`/img/${image.filename}`}
            alt={image.alt}
            width={320}
            height={192}
            className="rounded-lg object-cover flex-shrink-0"
          />
        ))}
      </div>
    </section>
  );
}

export default React.memo(GameplayCarousel);
