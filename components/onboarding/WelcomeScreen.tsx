'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Users, Code, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-expo)
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutExpo);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  useEffect(() => {
    if (startOnMount) {
      const timer = setTimeout(animate, 500);
      return () => clearTimeout(timer);
    }
  }, [animate, startOnMount]);

  return { count, isAnimating, animate };
}

// Particle system component
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const colors = ['#00D4AA', '#7B68EE', '#FF6B35', '#EC4899', '#d4af37'];
    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

// Parallax layer component
function ParallaxLayer({ 
  children, 
  speed = 0.5,
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 500 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`parallax-layer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Stat card component
function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  suffix = '',
  color,
  delay = 0 
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  color: string;
  delay?: number;
}) {
  const { count } = useAnimatedCounter(value, 2500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-2xl p-6 text-center"
    >
      <div 
        className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div className="stat-counter text-3xl font-bold mb-1" style={{ color }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { icon: Users, value: 10000, label: 'Hustlers in Recovery', suffix: '+', color: '#00D4AA' },
    { icon: Code, value: 50000, label: 'Coding Quests Completed', suffix: '+', color: '#7B68EE' },
    { icon: Heart, value: 1000000, label: 'Days of Sobriety', suffix: '+', color: '#EC4899' },
    { icon: Zap, value: 500, label: 'Projects Launched', suffix: '+', color: '#FF6B35' },
  ];

  return (
    <div 
      ref={containerRef}
      className="onboarding-container bg-hustlex-darker"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-hustlex-cyan/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hustlex-darker/50 to-hustlex-darker" />

      {/* Floating Orbs - Parallax Layer 1 */}
      <ParallaxLayer speed={0.3} className="pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-hustlex-cyan/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-40 right-20 w-48 h-48 rounded-full bg-hustlex-purple/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-hustlex-orange/10 blur-3xl"
        />
      </ParallaxLayer>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
            className="mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-hustlex-cyan to-hustlex-purple flex items-center justify-center glow-cyan">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-3xl border-2 border-hustlex-cyan"
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">From </span>
              <span className="text-gradient">Struggle</span>
              <br />
              <span className="text-white">to </span>
              <span className="text-gradient-gold">Digital Empire</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
          >
            Transform your recovery journey into a path of digital mastery. 
            Build skills, earn rewards, and connect with a community that understands.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl mb-12"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                color={stat.color}
                delay={1 + index * 0.15}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center pb-8"
        >
          <button
            onClick={onContinue}
            className="btn-primary text-lg md:text-xl px-12 py-4 rounded-2xl inline-flex items-center gap-3 group"
          >
            <span>Start Your Journey</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-gray-500 text-sm mt-4"
          >
            Join 10,000+ hustlers already building their digital future
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center gap-2 pb-4"
        >
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-dot w-2 h-2 rounded-full transition-all ${
                step === 1 
                  ? 'bg-hustlex-cyan w-8 active' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-gray-500 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
