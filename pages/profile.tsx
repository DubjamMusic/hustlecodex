import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define validation schema
const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Please enter a valid email address'),
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must not exceed 50 characters'),
  bio: z.string()
    .max(300, 'Bio must not exceed 300 characters')
    .optional()
    .transform(val => val === '' ? undefined : val),
  website: z.string()
    .url('Please enter a valid URL')
    .optional()
    .transform(val => val === '' ? undefined : val),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isMountedRef = React.useRef(true);
  
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
      displayName: '',
      bio: '',
      website: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      
      if (isMountedRef.current) {
        setSubmitSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          if (isMountedRef.current) {
            setSubmitSuccess(false);
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);

import React, { useState } from 'react';
import Head from 'next/head';

export default function Profile() {
  const [selectedSector, setSelectedSector] = useState(1);
  const [statusMessage, setStatusMessage] = useState(
    'SECTOR 01 ACTIVE • Full access granted • Monitoring concurrent connections'
  );

  // Mock user data - in production this would come from auth/database
  const user = {
    name: 'Reality Hacker',
    email: 'hacker@hustlecodex.com',
    memberSince: '2026-01-01',
    supportLevel: 3,
    unlockedSectors: [1, 2],
    totalContribution: 50,
    nodes: 247,
    latency: 23,
  };

  const sectors = [
    {
      id: 1,
      name: 'SECTOR 01: ROUTING HUB',
      description: 'O(1) Mux Logic • Edge Efficiency',
      price: 'UNLOCKED',
      locked: false,
      priceValue: 0,
    },
    {
      id: 2,
      name: 'SECTOR 02: THE CIPHER VAULT',
      description: 'RSA-256 Auth • Zero-Trust Architect',
      price: '$197',
      locked: false,
      priceValue: 197,
    },
    {
      id: 3,
      name: 'SECTOR 03: THE SPECTER LAB',
      description: 'Anomaly Detection • Ghost-Work Protocol',
      price: '$497',
      locked: true,
      priceValue: 497,
    },
    {
      id: 4,
      name: 'SECTOR 04: NEXUS CORE',
      description: 'Full Global Orchestration',
      price: 'PRIVATE SALE',
      locked: true,
      priceValue: 0,
    },
  ];

  const supportLevels = [
    { level: 1, price: 10, name: 'Initiate', color: 'from-blue-600 to-cyan-500' },
    { level: 2, price: 25, name: 'Adept', color: 'from-purple-600 to-pink-500' },
    { level: 3, price: 50, name: 'Master', color: 'from-yellow-600 to-orange-500' },
    { level: 4, price: 100, name: 'Elite', color: 'from-green-600 to-emerald-500' },
    { level: 5, price: 250, name: 'Legend', color: 'from-red-600 to-rose-500' },
  ];

  const currentLevel = supportLevels[user.supportLevel - 1];

  const handleSectorClick = (sector: typeof sectors[0]) => {
    if (sector.locked) {
      setStatusMessage(
        `${sector.name} LOCKED • Requires ${sector.price === 'PRIVATE SALE' ? 'private access' : sector.price} to unlock`
      );
    } else {
      setSelectedSector(sector.id);
      setStatusMessage(
        `${sector.name} ACTIVE • Full access granted • Monitoring ${1000 + Math.floor(Math.random() * 500)} concurrent connections`
      );
    }
  };

  return (
    <main className="bg-black text-white min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">User Profile</h1>
        <p className="text-gray-400 mb-8">Update your profile information with proper validation</p>

        {submitSuccess && (
          <div className="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded mb-6">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username *
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Display Name Field */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
              Display Name *
            </label>
            <input
              id="displayName"
              type="text"
              {...register('displayName')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.displayName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="John Doe"
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-red-400">{errors.displayName.message}</p>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              rows={4}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.bio
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="Tell us about yourself... (max 300 characters)"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-400">{errors.bio.message}</p>
            )}
          </div>

          {/* Website Field */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
              Website (Optional)
            </label>
            <input
              id="website"
              type="url"
              {...register('website')}
              className={`w-full px-4 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.website
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:ring-cyan-500'
              }`}
              placeholder="https://yourwebsite.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Validation Rules:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Username: 3-20 characters, alphanumeric and underscores only</li>
            <li>• Email: Valid email format required</li>
            <li>• Display Name: 2-50 characters</li>
            <li>• Bio: Maximum 300 characters (optional)</li>
            <li>• Website: Valid URL format (optional)</li>
          </ul>
        </div>
      </div>
    </main>
    <>
      <Head>
        <title>PRESTIGE CONSOLE | User Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <main className="bg-[#020202] text-white min-h-screen" style={{ fontFamily: "'Cinzel', serif" }}>
        {/* Golden Globe Header with User Info */}
        <div className="relative bg-gradient-to-b from-[#0a0a0a] to-black border-b border-[#d4af37] p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-[#d4af37] mb-2 tracking-wider">
                  PRESTIGE CONSOLE
                </h1>
                <p className="text-sm text-gray-400 font-mono">
                  {user.name} • LEVEL {currentLevel.level} - {currentLevel.name.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`bg-gradient-to-r ${currentLevel.color} px-6 py-3 rounded-lg shadow-xl border border-[#d4af37]`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider">Support Level</p>
                  <p className="text-3xl font-bold">{currentLevel.level}</p>
                  <p className="text-xs uppercase">{currentLevel.name}</p>
                </div>
              </div>
            </div>
            
            {/* System Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-black/40 backdrop-blur-sm border border-[#d4af37]/30 p-3 rounded">
                <p className="text-gray-500 uppercase">Nodes Active</p>
                <p className="text-[#d4af37] text-lg font-bold">{user.nodes}</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-[#d4af37]/30 p-3 rounded">
                <p className="text-gray-500 uppercase">Latency</p>
                <p className="text-[#d4af37] text-lg font-bold">{user.latency}ms</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-[#d4af37]/30 p-3 rounded">
                <p className="text-gray-500 uppercase">Member Since</p>
                <p className="text-[#d4af37] text-lg font-bold">
                  {new Date(user.memberSince).getFullYear()}
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-[#d4af37]/30 p-3 rounded">
                <p className="text-gray-500 uppercase">Contribution</p>
                <p className="text-[#d4af37] text-lg font-bold">${user.totalContribution}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[350px_1fr] min-h-[calc(100vh-300px)]">
          {/* Hierarchy Sidebar - Prestige Console Style */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border-r border-[#d4af37] p-6 overflow-y-auto">
            <h2 className="text-[#d4af37] text-xs font-bold tracking-widest mb-6 uppercase">
              Complex Hierarchy
            </h2>
            
            <div className="space-y-4">
              {sectors.map((sector) => (
                <div
                  key={sector.id}
                  onClick={() => handleSectorClick(sector)}
                  className={`
                    relative bg-black/30 border p-4 cursor-pointer transition-all duration-300
                    ${sector.locked ? 'opacity-40 border-gray-700' : 'border-gray-600 hover:border-[#d4af37] hover:translate-x-2 hover:bg-[#d4af37]/5'}
                    ${selectedSector === sector.id && !sector.locked ? 'border-[#d4af37] bg-[#d4af37]/10' : ''}
                  `}
                >
                  <div className="absolute top-2 right-2 text-[0.65rem] text-[#d4af37] font-bold">
                    {sector.price}
                  </div>
                  <h3 className="text-sm font-bold mb-2">{sector.name}</h3>
                  <p className="text-[0.65rem] text-gray-400 font-mono">{sector.description}</p>
                  {sector.locked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-20">🔒</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Support Level Progress in Sidebar */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-[#d4af37] text-xs font-bold tracking-widest mb-4 uppercase">
                Support Tiers
              </h3>
              <div className="space-y-2">
                {supportLevels.map((level) => (
                  <div
                    key={level.level}
                    className={`
                      p-3 rounded border text-xs transition-all
                      ${level.level === user.supportLevel ? 'border-[#d4af37] bg-[#d4af37]/10' : 
                        level.level < user.supportLevel ? 'border-green-600/50 bg-green-900/20' : 
                        'border-gray-700 bg-black/20 opacity-50'}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{level.name}</span>
                      <span className="text-[#d4af37]">${level.price}</span>
                    </div>
                    <div className="text-[0.6rem] text-gray-500 mt-1">
                      {level.level === user.supportLevel && 'CURRENT TIER'}
                      {level.level < user.supportLevel && 'UNLOCKED ✓'}
                      {level.level > user.supportLevel && 'LOCKED'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area - Golden Globe Viewport */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a] overflow-hidden">
            {/* Central Golden Orb */}
            <div className="flex items-center justify-center min-h-[500px] py-12">
              <div
                className="relative w-[400px] h-[400px] rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000)',
                  boxShadow: '0 0 100px rgba(212, 175, 55, 0.3), inset 0 0 50px rgba(212, 175, 55, 0.2), inset -20px -20px 40px rgba(0,0,0,0.8)',
                  border: '2px solid #d4af37',
                }}
              >
                <div className="text-center z-10 relative">
                  <h2 className="text-[#d4af37] text-4xl font-bold mb-2">GOLDEN GLOBE</h2>
                  <p className="text-[0.65rem] opacity-60 font-mono text-gray-400 mb-2">
                    RUST_WASM_ENGINE_ACTIVE
                  </p>
                  <p className="text-[0.6rem] opacity-40 font-mono text-gray-500">
                    NODES: {user.nodes} | LATENCY: {user.latency}ms
                  </p>
                  
                  {/* User Email Display in Orb */}
                  <div className="mt-6 pt-6 border-t border-[#d4af37]/20">
                    <p className="text-xs text-gray-400">Authorized User</p>
                    <p className="text-sm text-[#d4af37] font-mono">{user.email}</p>
                  </div>
                </div>

                {/* Animated Data Streaks would go here - simplified for static version */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[2px] h-20 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
                      style={{
                        left: `${(i * 12.5)}%`,
                        top: '-80px',
                        animation: `fall ${2 + i * 0.3}s infinite linear`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Command Dock */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
              <div
                className="backdrop-blur-xl bg-white/5 border border-[#d4af37] p-6 rounded-lg"
              >
                <div className="text-xs font-mono text-gray-400 mb-4 text-center">
                  {statusMessage}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="bg-[#d4af37] hover:bg-white text-black font-bold py-3 px-4 text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    Access Portal
                  </button>
                  <button className="bg-[#d4af37] hover:bg-white text-black font-bold py-3 px-4 text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    Upgrade Tier
                  </button>
                  <button className="bg-[#d4af37] hover:bg-white text-black font-bold py-3 px-4 text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    View Stats
                  </button>
                  <button className="bg-[#d4af37] hover:bg-white text-black font-bold py-3 px-4 text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="absolute top-4 right-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-[#d4af37] hover:text-white text-sm font-bold uppercase tracking-wider transition-all"
              >
                <span>←</span> Home
              </a>
            </div>
          </div>
        </div>

        {/* CSS Animation for data streaks */}
        <style jsx>{`
          @keyframes fall {
            from {
              transform: translateY(-100px) rotate(45deg);
              opacity: 1;
            }
            to {
              transform: translateY(500px) rotate(45deg);
              opacity: 0;
            }
          }
        `}</style>
      </main>
    </>
  );
}
