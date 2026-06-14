'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export default function Scales3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 60, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [0, 1], [-18, 18]), spring);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), spring);
  const tiltSpring = { stiffness: 40, damping: 12 };
  const beamTilt = useSpring(useTransform(mx, [0, 1], [6, -6]), tiltSpring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); };

  const Svg = (
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full drop-shadow-[0_20px_60px_rgba(201,168,76,0.25)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8B6B2A"/>
        </linearGradient>
        <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E6B8"/>
          <stop offset="100%" stopColor="#C9A84C"/>
        </linearGradient>
      </defs>

      <rect x="160" y="350" width="80" height="14" rx="3" fill="url(#goldGrad)"/>
      <rect x="185" y="300" width="30" height="56" fill="url(#goldGrad)"/>
      <rect x="195" y="90" width="10" height="215" fill="url(#goldGrad)"/>
      <circle cx="200" cy="80" r="14" fill="url(#goldGradLight)"/>

      <motion.g style={reduceMotion ? {} : { rotate: beamTilt, transformOrigin: '200px 95px' }}>
        <rect x="60" y="90" width="280" height="8" rx="4" fill="url(#goldGrad)"/>
        <line x1="80" y1="94" x2="80" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <line x1="105" y1="94" x2="80" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <line x1="55" y1="94" x2="80" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <path d="M 35 160 Q 80 200 125 160 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round"/>
        <ellipse cx="80" cy="160" rx="45" ry="8" fill="rgba(201,168,76,0.15)"/>
        <line x1="320" y1="94" x2="320" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <line x1="295" y1="94" x2="320" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <line x1="345" y1="94" x2="320" y2="160" stroke="url(#goldGrad)" strokeWidth="2.5"/>
        <path d="M 275 160 Q 320 200 365 160 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round"/>
        <ellipse cx="320" cy="160" rx="45" ry="8" fill="rgba(201,168,76,0.15)"/>
      </motion.g>

      <circle cx="200" cy="94" r="8" fill="url(#goldGradLight)"/>
    </motion.svg>
  );

  if (reduceMotion) {
    return (
      <div className="relative w-full max-w-[420px] aspect-square mx-auto">
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.16), transparent 65%)' }}/>
        <div className="relative w-full h-full flex items-center justify-center">{Svg}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-[420px] aspect-square mx-auto"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.16), transparent 65%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }} className="relative w-full h-full flex items-center justify-center">
        {Svg}
      </motion.div>
    </div>
  );
}
