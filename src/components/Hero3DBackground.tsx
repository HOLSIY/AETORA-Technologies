import React from 'react';
import { motion } from 'motion/react';

interface Hero3DBackgroundProps {
  enabled?: boolean;
  speed?: number;
  particleCount?: number;
  glowStrength?: number;
  theme?: 'light' | 'dark';
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({
  enabled = true,
  speed = 1,
  particleCount = 18,
  glowStrength = 0.8,
  theme = 'light',
}) => {
  if (!enabled) return null;

  // Render floating 3D abstract geometry objects (cubes, rings, spheres, glass panes)
  const isLight = theme === 'light';
  const durationMultiplier = 1 / Math.max(0.2, speed);

  const floatingItems = Array.from({ length: Math.min(particleCount, 25) }).map((_, i) => {
    const size = 30 + (i % 5) * 22;
    const initialX = (i * 19 + 7) % 90;
    const initialY = (i * 23 + 11) % 80;
    const duration = (6 + (i % 6) * 3) * durationMultiplier;
    const delay = (i % 4) * 0.8;
    const objectType = i % 4; // 0 = glass sphere, 1 = 3D cube pane, 2 = glowing ring, 3 = digital pill

    return (
      <motion.div
        key={i}
        className="absolute pointer-events-none rounded-3xl"
        style={{
          left: `${initialX}%`,
          top: `${initialY}%`,
          width: `${size}px`,
          height: `${size}px`,
          perspective: '1000px',
        }}
        animate={{
          y: [0, -25, 15, 0],
          x: [0, 15, -15, 0],
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
          rotateZ: [0, 90, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {objectType === 0 && (
          /* Floating Glass Sphere */
          <div
            className={`w-full h-full rounded-full backdrop-blur-md shadow-xl border ${
              isLight
                ? 'bg-gradient-to-tr from-[#D49E6A]/20 via-white/40 to-white/70 border-[#B87D4B]/30 shadow-[#B87D4B]/10'
                : 'bg-gradient-to-tr from-[#D49E6A]/15 via-white/5 to-white/20 border-white/20 shadow-black/40'
            }`}
            style={{ opacity: 0.7 * glowStrength }}
          />
        )}

        {objectType === 1 && (
          /* Floating 3D Cube / Prism Pane */
          <div
            className={`w-full h-full rounded-2xl backdrop-blur-lg transform rotate-45 border ${
              isLight
                ? 'bg-gradient-to-br from-[#B87D4B]/20 via-[#E5C198]/30 to-white/60 border-[#B87D4B]/35 shadow-lg'
                : 'bg-gradient-to-br from-[#D49E6A]/20 via-white/10 to-transparent border-white/25 shadow-2xl'
            }`}
            style={{ opacity: 0.65 * glowStrength }}
          />
        )}

        {objectType === 2 && (
          /* Glowing Tech Ring */
          <div
            className={`w-full h-full rounded-full border-2 ${
              isLight
                ? 'border-[#B87D4B]/40 bg-[#D49E6A]/10 shadow-[0_0_20px_rgba(184,125,75,0.2)]'
                : 'border-[#D49E6A]/50 bg-[#D49E6A]/5 shadow-[0_0_25px_rgba(212,158,106,0.25)]'
            }`}
            style={{ opacity: 0.6 * glowStrength }}
          />
        )}

        {objectType === 3 && (
          /* Digital Capsule Shape */
          <div
            className={`w-full h-2/3 rounded-full backdrop-blur-sm border ${
              isLight
                ? 'bg-gradient-to-r from-white/80 to-[#E5C198]/40 border-[#B87D4B]/25'
                : 'bg-gradient-to-r from-[#1C1A17]/80 to-[#D49E6A]/20 border-white/15'
            }`}
            style={{ opacity: 0.75 * glowStrength }}
          />
        )}
      </motion.div>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 3D Depth Soft Light Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3 * glowStrength, 0.5 * glowStrength, 0.3 * glowStrength],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${
          isLight ? 'bg-[#D49E6A]/30' : 'bg-[#D49E6A]/20'
        }`}
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25 * glowStrength, 0.45 * glowStrength, 0.25 * glowStrength],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className={`absolute top-1/2 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl ${
          isLight ? 'bg-[#B87D4B]/25' : 'bg-[#D49E6A]/15'
        }`}
      />

      {/* Grid Pattern with Perspective */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${isLight ? '#111827' : '#FFFFFF'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating 3D Elements */}
      {floatingItems}
    </div>
  );
};
