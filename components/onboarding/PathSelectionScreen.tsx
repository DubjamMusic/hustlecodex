'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Trophy,
  Rocket,
  Brain,
  Target,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { PathType } from '../../store/onboardingStore';

interface PathSelectionScreenProps {
  selectedPath: PathType;
  onSelectPath: (path: PathType) => void;
  onBack: () => void;
  onContinue: () => void;
}

interface PathOption {
  id: PathType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  features: {
    icon: React.ElementType;
    text: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

const pathOptions: PathOption[] = [
  {
    id: 'recovery',
    title: 'Recovery Focus',
    subtitle: 'Heal & Grow',
    description: 'Prioritize your recovery journey with daily check-ins, sponsor matching, and a supportive community that understands your path.',
    icon: Heart,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    features: [
      { icon: Calendar, text: 'Daily check-ins & mood tracking' },
      { icon: Users, text: 'Sponsor matching system' },
      { icon: Trophy, text: 'Sobriety milestones & rewards' },
    ],
    stats: [
      { label: 'Avg. Streak', value: '47 days' },
      { label: 'Community', value: '5,000+' },
    ],
  },
  {
    id: 'skills',
    title: 'Skill Building',
    subtitle: 'Learn & Create',
    description: 'Focus on building marketable skills through coding quests, project challenges, and hands-on learning experiences.',
    icon: Code,
    color: '#7B68EE',
    gradient: 'from-purple-500 to-indigo-600',
    features: [
      { icon: Brain, text: 'Interactive coding quests' },
      { icon: Rocket, text: 'Real-world project challenges' },
      { icon: Target, text: 'Skill trees & certifications' },
    ],
    stats: [
      { label: 'Quests', value: '200+' },
      { label: 'Projects', value: '50+' },
    ],
  },
  {
    id: 'hybrid',
    title: 'Hybrid Path',
    subtitle: 'Best of Both',
    description: 'Combine recovery support with skill building for a holistic approach to transformation. The most popular choice.',
    icon: Sparkles,
    color: '#00D4AA',
    gradient: 'from-cyan-500 to-emerald-500',
    features: [
      { icon: Heart, text: 'Full recovery toolkit' },
      { icon: Code, text: 'Complete skill curriculum' },
      { icon: Trophy, text: 'Unified progress system' },
    ],
    stats: [
      { label: 'Users', value: '70%' },
      { label: 'Success', value: '94%' },
    ],
  },
];

function PathCard({ 
  path, 
  isSelected, 
  onSelect 
}: { 
  path: PathOption; 
  isSelected: boolean; 
  onSelect: () => void;
}) {
  const Icon = path.icon;

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`path-card relative rounded-3xl p-6 md:p-8 cursor-pointer overflow-hidden ${
        isSelected ? 'selected' : ''
      }`}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${path.color}15, ${path.color}05)`
          : 'linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(15, 15, 26, 0.9))',
        borderColor: isSelected ? path.color : 'rgba(255, 255, 255, 0.1)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isSelected ? `0 0 0 2px ${path.color}` : 'none',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Popular badge for hybrid */}
      {path.id === 'hybrid' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ 
            background: `linear-gradient(135deg, ${path.color}, ${path.color}80)`,
            color: 'white'
          }}
        >
          Most Popular
        </motion.div>
      )}

      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-4 left-4"
          >
            <CheckCircle2 size={24} style={{ color: path.color }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <div 
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${path.gradient}`}
        style={{
          boxShadow: isSelected ? `0 0 30px ${path.color}40` : 'none',
        }}
      >
        <Icon size={32} className="text-white" />
      </div>

      {/* Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
          {path.title}
        </h3>
        <p className="text-sm font-medium" style={{ color: path.color }}>
          {path.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
        {path.description}
      </p>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {path.features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${path.color}20` }}
              >
                <FeatureIcon size={16} style={{ color: path.color }} />
              </div>
              <span className="text-gray-300 text-sm">{feature.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex gap-4 pt-4 border-t border-white/10">
        {path.stats.map((stat, index) => (
          <div key={index} className="flex-1">
            <div className="text-lg font-bold" style={{ color: path.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Glow effect when selected */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${path.color}10, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}

export default function PathSelectionScreen({
  selectedPath,
  onSelectPath,
  onBack,
  onContinue,
}: PathSelectionScreenProps) {
  const [hoveredPath, setHoveredPath] = useState<PathType>(null);

  const canContinue = selectedPath !== null;

  return (
    <div className="onboarding-container bg-hustlex-darker">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-hustlex-purple/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hustlex-purple/20 text-hustlex-purple text-sm font-medium mb-4"
          >
            <Target size={16} />
            Step 2 of 3
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-gradient">Path</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Select the journey that best fits your goals. You can always adjust your focus later.
          </p>
        </motion.div>

        {/* Path Cards */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl">
            {pathOptions.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <PathCard
                  path={path}
                  isSelected={selectedPath === path.id}
                  onSelect={() => onSelectPath(path.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 max-w-6xl mx-auto w-full"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <button
            onClick={onContinue}
            disabled={!canContinue}
            className={`btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
              !canContinue ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Continue</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 pt-6"
        >
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-dot h-2 rounded-full transition-all ${
                step === 2 
                  ? 'bg-hustlex-cyan w-8 active' 
                  : step < 2 
                    ? 'bg-hustlex-cyan/50 w-2' 
                    : 'bg-gray-600 w-2'
              }`}
            />
          ))}
        </motion.div>

        {/* Helper text */}
        <AnimatePresence>
          {!canContinue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 text-sm mt-4"
            >
              Select a path to continue
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
