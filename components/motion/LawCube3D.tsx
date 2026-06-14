'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Scale, Gavel, BookOpen, Building2, Shield, GraduationCap, LucideIcon } from 'lucide-react';

interface Face { icon: LucideIcon; label: string; }

const faces: Face[] = [
  { icon: Scale,        label: 'Litigation' },
  { icon: BookOpen,     label: 'Legal Research' },
  { icon: Gavel,        label: 'Drafting' },
  { icon: GraduationCap,label: 'Legal Education' },
  { icon: Building2,    label: 'Legal Intelligence' },
  { icon: Shield,       label: 'Mentorship' },
];

const transforms = [
  'rotateY(0deg) translateZ(110px)',
  'rotateY(90deg) translateZ(110px)',
  'rotateY(180deg) translateZ(110px)',
  'rotateY(-90deg) translateZ(110px)',
  'rotateX(90deg) translateZ(110px)',
  'rotateX(-90deg) translateZ(110px)',
];

export default function LawCube3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 50, damping: 16 };
  const tiltY = useSpring(useTransform(mx, [0, 1], [-25, 25]), spring);
  const tiltX = useSpring(useTransform(my, [0, 1], [25, -25]), spring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); setPaused(false); };

  const FacesEl = (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {faces.map(({ icon: Icon, label }, i) => (
        <div
          key={label}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-[rgba(201,168,76,0.3)] bg-gradient-to-br from-[rgba(201,168,76,0.1)] to-[#0C1018]"
          style={{ transform: transforms[i], backfaceVisibility: 'hidden' }}
        >
          <Icon size={32} className="text-[var(--gold)]"/>
          <span className="text-[11px] font-semibold text-[var(--ivory)] text-center px-2">{label}</span>
        </div>
      ))}
    </div>
  );

  if (reduceMotion) {
    return (
      <div className="relative mx-auto" style={{ width: 220, height: 220, perspective: 900 }}>
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-15deg) rotateY(25deg)' }}>
          {FacesEl}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleLeave}
      className="relative mx-auto"
      style={{ width: 220, height: 220, perspective: 900 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={paused ? {} : { rotateY: 360 }}
        transition={paused ? {} : { duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', rotateX: tiltX, rotateY: tiltY }}>
          {FacesEl}
        </motion.div>
      </motion.div>
    </div>
  );
}
