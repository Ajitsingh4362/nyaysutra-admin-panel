'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

export default function GoldParticles({ count = 18 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 60,
  })), [count]);

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%`,
            background: 'radial-gradient(circle, rgba(232,201,106,0.9), rgba(201,168,76,0))',
          }}
          animate={{ y: [0, -40, 0], x: [0, p.drift, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
