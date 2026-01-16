import React from 'react';

// Extract static data to avoid recreating on every render
const SUPPORT_LEVELS = [
  { id: 'level-1', amount: '$10', level: 1 },
  { id: 'level-2', amount: '$25', level: 2 },
  { id: 'level-3', amount: '$50', level: 3 },
  { id: 'level-4', amount: '$100', level: 4 },
  { id: 'level-5', amount: '$250', level: 5 },
];

function SupportLevels() {
  return (
    <section className="p-8 bg-black text-center">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Support Levels</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {SUPPORT_LEVELS.map((levelData) => (
          <div key={levelData.id} className="bg-gray-800 p-4 rounded border border-yellow-500 shadow-xl">
            <p className="text-lg font-semibold">Level {levelData.level}</p>
            <p className="text-yellow-300">{levelData.amount}</p>
            <button className="mt-2 px-3 py-1 bg-yellow-500 text-black rounded">Donate</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(SupportLevels);
