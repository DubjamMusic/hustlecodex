
import React from 'react';

export default function Profile() {
  // Mock user data - in production this would come from auth/database
  const user = {
    name: 'Reality Hacker',
    email: 'hacker@hustlecodex.com',
    memberSince: '2026-01-01',
    supportLevel: 3,
    unlockedSectors: ['Sector 01', 'Sector 02'],
    totalContribution: 50,
  };

  const supportLevels = [
    { level: 1, price: 10, name: 'Initiate', color: 'from-blue-600 to-cyan-500' },
    { level: 2, price: 25, name: 'Adept', color: 'from-purple-600 to-pink-500' },
    { level: 3, price: 50, name: 'Master', color: 'from-yellow-600 to-orange-500' },
    { level: 4, price: 100, name: 'Elite', color: 'from-green-600 to-emerald-500' },
    { level: 5, price: 250, name: 'Legend', color: 'from-red-600 to-rose-500' },
  ];

  const currentLevel = supportLevels[user.supportLevel - 1];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-black to-pink-900 p-8 border-b border-cyan-400">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">USER PROFILE</h1>
        <p className="text-gray-400">Access your HustleCodex dashboard</p>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Profile Card */}
        <section className="bg-gray-900 rounded-lg border border-cyan-400 p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                {user.name}
              </h2>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="text-cyan-400">✉</span>
                  <span>{user.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-cyan-400">📅</span>
                  <span>Member since: {user.memberSince}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-cyan-400">💎</span>
                  <span>Total Contribution: ${user.totalContribution}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`bg-gradient-to-r ${currentLevel.color} px-6 py-3 rounded-lg`}>
                <p className="text-sm font-semibold">Support Level</p>
                <p className="text-2xl font-bold">{currentLevel.level}</p>
                <p className="text-sm">{currentLevel.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Level Progress */}
        <section className="bg-gray-900 rounded-lg border border-yellow-500 p-6 shadow-2xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Support Level Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {supportLevels.map((level) => (
              <div
                key={level.level}
                className={`p-4 rounded-lg border-2 transition-all ${
                  level.level === user.supportLevel
                    ? 'border-yellow-500 bg-gray-800 scale-105'
                    : level.level < user.supportLevel
                    ? 'border-green-500 bg-gray-800 opacity-75'
                    : 'border-gray-700 bg-gray-900 opacity-50'
                }`}
              >
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-400">Level {level.level}</p>
                  <p className="text-xl font-bold text-white">{level.name}</p>
                  <p className="text-yellow-300 mt-2">${level.price}</p>
                  {level.level === user.supportLevel && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-500 text-black text-xs rounded">
                      CURRENT
                    </span>
                  )}
                  {level.level < user.supportLevel && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-black text-xs rounded">
                      UNLOCKED
                    </span>
                  )}
                  {level.level > user.supportLevel && (
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-600 text-white text-xs rounded">
                      LOCKED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unlocked Content */}
        <section className="bg-gray-900 rounded-lg border border-purple-500 p-6 shadow-2xl">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Unlocked Sectors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.unlockedSectors.map((sector, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-800 to-pink-800 p-4 rounded-lg border border-purple-400 hover:scale-105 transition-transform cursor-pointer"
              >
                <h4 className="text-xl font-bold text-white mb-2">{sector}</h4>
                <p className="text-purple-200 text-sm">Click to access content</p>
              </div>
            ))}
            <div className="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                <span className="block text-2xl mb-2">🔒</span>
                More sectors available at higher support levels
              </p>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="bg-gray-900 rounded-lg border border-cyan-400 p-6 shadow-2xl">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Account Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Edit Profile
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Upgrade Level
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              View Purchases
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Manage Subscription
            </button>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center pt-4">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            ← Back to HustleCodex Home
          </a>
        </div>
      </div>
    </main>
  );
}
