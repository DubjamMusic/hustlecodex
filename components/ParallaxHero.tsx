'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [userColors, setUserColors] = useState({ primary: '#8b5cf6', secondary: '#ec4899', accent: '#06b6d4' });
  const [isPlaying, setIsPlaying] = useState(false);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Generate unique colors based on user data (procedural generation)
  useEffect(() => {
    const generateUserColors = () => {
      const userMetrics = {
        activity: Math.random(),
        engagement: Math.random(),
        contribution: Math.random(),
        timestamp: Date.now(),
      };

      const hash = (str: string) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
          h = Math.imul(31, h) + str.charCodeAt(i) | 0;
        }
        return Math.abs(h);
      };

      const dataString = JSON.stringify(userMetrics);
      const hue1 = hash(dataString + 'primary') % 360;
      const hue2 = (hue1 + 120) % 360;
      const hue3 = (hue1 + 240) % 360;

      setUserColors({
        primary: `hsl(${hue1}, 70%, 60%)`,
        secondary: `hsl(${hue2}, 70%, 60%)`,
        accent: `hsl(${hue3}, 70%, 60%)`,
      });
    };

    generateUserColors();
  }, []);

  // Animated particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.5;
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
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: [userColors.primary, userColors.secondary, userColors.accent][Math.floor(Math.random() * 3)],
        life: Math.random() * 100,
        maxLife: 100,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.color = [userColors.primary, userColors.secondary, userColors.accent][Math.floor(Math.random() * 3)];
        }

        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.strokeStyle = particle.color + '20';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
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
  }, [userColors]);

  // Procedural sound generation
  const toggleSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    if (isPlaying) {
      oscillatorsRef.current.forEach(osc => osc.stop());
      oscillatorsRef.current = [];
      setIsPlaying(false);
    } else {
      const ctx = audioContextRef.current;
      const hue = parseInt(userColors.primary.match(/\d+/)?.[0] || '200');
      
      const frequencies = [
        200 + (hue * 0.5),
        300 + (hue * 0.3),
        400 + (hue * 0.2),
      ];

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = ['sine', 'triangle', 'sine'][i] as OscillatorType;
        oscillator.frequency.value = freq;
        
        gainNode.gain.value = 0.1 / (i + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillatorsRef.current.push(oscillator);
      });

      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator already stopped
        }
      });
    };
  }, []);

  return (
    <div className="relative h-[50vh] bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${userColors.primary}15, ${userColors.secondary}10, transparent)`,
        }}
      />

      <div className="relative z-10 h-full grid place-items-center">
        <div className="text-center space-y-6">
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wide animate-pulse"
            style={{
              textShadow: `0 0 20px ${userColors.primary}, 0 0 40px ${userColors.secondary}`,
              color: userColors.accent,
            }}
          >
            HUSTLECODEX OMNIVERSE
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base font-mono">
            Your unique data signature: <span style={{ color: userColors.primary }}>◆</span>{' '}
            <span style={{ color: userColors.secondary }}>◆</span>{' '}
            <span style={{ color: userColors.accent }}>◆</span>
          </p>

          <button
            onClick={toggleSound}
            className="px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${userColors.primary}, ${userColors.secondary})`,
              boxShadow: `0 0 20px ${userColors.primary}80`,
            }}
          >
            {isPlaying ? '🔊 Pause Ambient Sound' : '🔇 Play Your Unique Sound'}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 animate-ping"
            style={{
              width: `${(i + 1) * 150}px`,
              height: `${(i + 1) * 150}px`,
              borderColor: [userColors.primary, userColors.secondary, userColors.accent][i] + '40',
              animationDuration: `${(i + 1) * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
