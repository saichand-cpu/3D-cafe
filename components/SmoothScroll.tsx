'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return children;
}
