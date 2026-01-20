'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Target, 
  Link2, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Plus,
  Minus,
  Github,
  MessageSquare,
  Hash,
  Sparkles,
  Calendar,
  Code,
  Rocket,
  Trophy
} from 'lucide-react';
import { AVATARS, Avatar, OnboardingGoal, SocialConnection, PathType } from '../../store/onboardingStore';

interface ProfileCreationScreenProps {
  selectedPath: PathType;
  selectedAvatar: string | null;
  username: string;
  goals: OnboardingGoal[];
  socialConnections: SocialConnection[];
  onSelectAvatar: (avatarId: string) => void;
  onSetUsername: (username: string) => void;
  onAddGoal: (goal: OnboardingGoal) => void;
  onUpdateGoal: (index: number, goal: OnboardingGoal) => void;
  onRemoveGoal: (index: number) => void;
  onConnectSocial: (platform: SocialConnection['platform'], username: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

// Avatar selection component
function AvatarSelector({ 
  avatars, 
  selectedId, 
  onSelect 
}: { 
  avatars: Avatar[]; 
  selectedId: string | null; 
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {avatars.map((avatar, index) => (
        <motion.button
          key={avatar.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(avatar.id)}
          className={`avatar-option relative p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
            selectedId === avatar.id ? 'selected' : ''
          }`}
          style={{
            background: selectedId === avatar.id 
              ? `linear-gradient(135deg, ${avatar.color}20, ${avatar.color}10)`
              : 'rgba(26, 26, 46, 0.6)',
            border: `2px solid ${selectedId === avatar.id ? avatar.color : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: selectedId === avatar.id ? `0 0 20px ${avatar.color}30` : 'none',
          }}
        >
          {/* Selection indicator */}
          <AnimatePresence>
            {selectedId === avatar.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: avatar.color }}
              >
                <Check size={14} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar emoji */}
          <div 
            className="text-4xl md:text-5xl"
            style={{
              filter: selectedId === avatar.id ? `drop-shadow(0 0 10px ${avatar.color})` : 'none',
            }}
          >
            {avatar.emoji}
          </div>

          {/* Name */}
          <span 
            className="text-sm font-medium"
            style={{ color: selectedId === avatar.id ? avatar.color : '#9CA3AF' }}
          >
            {avatar.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Goal setting component
function GoalSetter({
  pathType,
  goals,
  onAddGoal,
  onUpdateGoal,
  onRemoveGoal,
}: {
  pathType: PathType;
  goals: OnboardingGoal[];
  onAddGoal: (goal: OnboardingGoal) => void;
  onUpdateGoal: (index: number, goal: OnboardingGoal) => void;
  onRemoveGoal: (index: number) => void;
}) {
  const goalTemplates = {
    recovery: [
      { type: 'sobriety' as const, label: 'Days Sober Goal', icon: Calendar, unit: 'days', min: 1, max: 365, default: 30 },
    ],
    skills: [
      { type: 'skills' as const, label: 'Skills to Learn', icon: Code, unit: 'skills', min: 1, max: 20, default: 3 },
      { type: 'projects' as const, label: 'Projects to Build', icon: Rocket, unit: 'projects', min: 1, max: 10, default: 2 },
    ],
    hybrid: [
      { type: 'sobriety' as const, label: 'Days Sober Goal', icon: Calendar, unit: 'days', min: 1, max: 365, default: 30 },
      { type: 'skills' as const, label: 'Skills to Learn', icon: Code, unit: 'skills', min: 1, max: 20, default: 3 },
      { type: 'projects' as const, label: 'Projects to Build', icon: Rocket, unit: 'projects', min: 1, max: 10, default: 2 },
    ],
  };

  const templates = pathType ? goalTemplates[pathType] : [];

  // Initialize goals if empty
  useEffect(() => {
    if (goals.length === 0 && templates.length > 0) {
      templates.forEach(template => {
        onAddGoal({
          type: template.type,
          value: template.default,
          unit: template.unit,
        });
      });
    }
  }, [pathType]);

  return (
    <div className="space-y-4">
      {templates.map((template, index) => {
        const Icon = template.icon;
        const goal = goals.find(g => g.type === template.type);
        const goalIndex = goals.findIndex(g => g.type === template.type);
        const value = goal?.value ?? template.default;

        return (
          <motion.div
            key={template.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 md:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hustlex-cyan/20 flex items-center justify-center">
                  <Icon size={20} className="text-hustlex-cyan" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{template.label}</h4>
                  <p className="text-gray-500 text-sm">Set your initial target</p>
                </div>
              </div>

              {/* Value adjuster */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (goalIndex >= 0 && value > template.min) {
                      onUpdateGoal(goalIndex, { ...goal!, value: value - 1 });
                    }
                  }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  disabled={value <= template.min}
                >
                  <Minus size={18} />
                </button>

                <div className="w-20 text-center">
                  <span className="text-2xl font-bold text-hustlex-cyan">{value}</span>
                  <span className="text-gray-500 text-sm ml-1">{template.unit}</span>
                </div>

                <button
                  onClick={() => {
                    if (goalIndex >= 0 && value < template.max) {
                      onUpdateGoal(goalIndex, { ...goal!, value: value + 1 });
                    }
                  }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  disabled={value >= template.max}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Progress preview */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress Preview</span>
                <span>{Math.round((value / template.max) * 100)}% of max</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / template.max) * 100}%` }}
                  className="h-full bg-gradient-to-r from-hustlex-cyan to-hustlex-purple rounded-full"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Social connection component
function SocialConnector({
  connections,
  onConnect,
}: {
  connections: SocialConnection[];
  onConnect: (platform: SocialConnection['platform'], username: string) => void;
}) {
  const [activeInput, setActiveInput] = useState<SocialConnection['platform'] | null>(null);
  const [inputValue, setInputValue] = useState('');

  const platforms = [
    { id: 'github' as const, name: 'GitHub', icon: Github, color: '#6e5494', placeholder: 'username' },
    { id: 'discord' as const, name: 'Discord', icon: Hash, color: '#5865F2', placeholder: 'username#0000' },
    { id: 'slack' as const, name: 'Slack', icon: MessageSquare, color: '#4A154B', placeholder: '@username' },
  ];

  const handleConnect = (platform: SocialConnection['platform']) => {
    if (inputValue.trim()) {
      onConnect(platform, inputValue.trim());
      setActiveInput(null);
      setInputValue('');
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-400 text-sm mb-4">
        Connect your accounts to sync progress and find your community (optional)
      </p>

      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const connection = connections.find(c => c.platform === platform.id);
        const isConnected = connection?.connected;
        const isActive = activeInput === platform.id;

        return (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-4 transition-all ${
              isConnected 
                ? 'bg-hustlex-green/10 border border-hustlex-green/30' 
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <Icon size={20} style={{ color: platform.color }} />
                </div>
                <div>
                  <h4 className="text-white font-medium">{platform.name}</h4>
                  {isConnected && (
                    <p className="text-hustlex-green text-sm">
                      Connected as {connection.username}
                    </p>
                  )}
                </div>
              </div>

              {!isConnected && !isActive && (
                <button
                  onClick={() => setActiveInput(platform.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                  style={{ color: platform.color }}
                >
                  Connect
                </button>
              )}

              {isConnected && (
                <Check size={20} className="text-hustlex-green" />
              )}
            </div>

            {/* Input field */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={platform.placeholder}
                      className="input-field flex-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleConnect(platform.id);
                        if (e.key === 'Escape') {
                          setActiveInput(null);
                          setInputValue('');
                        }
                      }}
                    />
                    <button
                      onClick={() => handleConnect(platform.id)}
                      className="px-4 py-2 rounded-xl bg-hustlex-cyan text-white font-medium hover:bg-hustlex-cyan/80 transition-all"
                    >
                      Link
                    </button>
                    <button
                      onClick={() => {
                        setActiveInput(null);
                        setInputValue('');
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProfileCreationScreen({
  selectedPath,
  selectedAvatar,
  username,
  goals,
  socialConnections,
  onSelectAvatar,
  onSetUsername,
  onAddGoal,
  onUpdateGoal,
  onRemoveGoal,
  onConnectSocial,
  onBack,
  onComplete,
}: ProfileCreationScreenProps) {
  const [activeSection, setActiveSection] = useState<'avatar' | 'goals' | 'social'>('avatar');
  
  const canComplete = selectedAvatar !== null && username.trim().length >= 3;

  const selectedAvatarData = AVATARS.find(a => a.id === selectedAvatar);

  return (
    <div className="onboarding-container bg-hustlex-darker">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-hustlex-cyan/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 md:px-6 py-8 md:py-12 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hustlex-cyan/20 text-hustlex-cyan text-sm font-medium mb-4"
          >
            <User size={16} />
            Step 3 of 3
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Create Your <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Personalize your journey with an avatar, set your initial goals, and connect with the community.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 max-w-4xl mx-auto w-full">
          {/* Section tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-8 p-1 bg-white/5 rounded-2xl"
          >
            {[
              { id: 'avatar' as const, label: 'Avatar', icon: Sparkles },
              { id: 'goals' as const, label: 'Goals', icon: Target },
              { id: 'social' as const, label: 'Connect', icon: Link2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === tab.id
                      ? 'bg-hustlex-cyan text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Section content */}
          <AnimatePresence mode="wait">
            {activeSection === 'avatar' && (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Username input */}
                <div className="glass-card rounded-2xl p-6">
                  <label className="block text-white font-medium mb-2">
                    Choose your username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => onSetUsername(e.target.value)}
                    placeholder="Enter a unique username"
                    className="input-field text-lg"
                    maxLength={20}
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    {username.length}/20 characters • Min 3 characters
                  </p>
                </div>

                {/* Avatar selection */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-white font-medium mb-4">Select your avatar</h3>
                  <AvatarSelector
                    avatars={AVATARS}
                    selectedId={selectedAvatar}
                    onSelect={onSelectAvatar}
                  />

                  {/* Selected avatar preview */}
                  <AnimatePresence>
                    {selectedAvatarData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 pt-6 border-t border-white/10 text-center"
                      >
                        <p className="text-gray-400 text-sm mb-2">
                          You selected <span style={{ color: selectedAvatarData.color }} className="font-semibold">{selectedAvatarData.name}</span>
                        </p>
                        <p className="text-gray-500 text-sm italic">
                          "{selectedAvatarData.description}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeSection === 'goals' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <GoalSetter
                  pathType={selectedPath}
                  goals={goals}
                  onAddGoal={onAddGoal}
                  onUpdateGoal={onUpdateGoal}
                  onRemoveGoal={onRemoveGoal}
                />
              </motion.div>
            )}

            {activeSection === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <SocialConnector
                  connections={socialConnections}
                  onConnect={onConnectSocial}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 max-w-4xl mx-auto w-full"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <button
            onClick={onComplete}
            disabled={!canComplete}
            className={`btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
              !canComplete ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Trophy size={20} />
            <span>Complete Setup</span>
          </button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-2 pt-6"
        >
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-dot h-2 rounded-full transition-all ${
                step === 3 
                  ? 'bg-hustlex-cyan w-8 active' 
                  : 'bg-hustlex-cyan/50 w-2'
              }`}
            />
          ))}
        </motion.div>

        {/* Validation message */}
        <AnimatePresence>
          {!canComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 text-sm mt-4"
            >
              {!selectedAvatar && !username.trim() 
                ? 'Select an avatar and enter a username to continue'
                : !selectedAvatar 
                  ? 'Select an avatar to continue'
                  : 'Username must be at least 3 characters'
              }
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
