'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  const numMatch = value.match(/[\d.]+/);
  const numericPart = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffixPart = value.replace(/[\d.]+/, '');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, numericPart, {
      duration: 1.6,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (v) => {
        const isInt = Number.isInteger(numericPart);
        setDisplay(isInt ? Math.round(v).toString() : v.toFixed(1));
      },
    });
    return () => controls.stop();
  }, [inView, numericPart]);

  return <span ref={ref}>{display}{suffixPart}{suffix}</span>;
}
