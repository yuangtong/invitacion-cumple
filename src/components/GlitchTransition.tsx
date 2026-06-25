import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GlitchTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

export function GlitchTransition({ active, onComplete }: GlitchTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    setIsVisible(true);
    const el = containerRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      }
    });

    // Glitch effect sequence
    tl.set(el, { opacity: 1 })
      .to(el, {
        x: () => gsap.utils.random(-8, 8),
        duration: 0.04,
        repeat: 3,
        ease: 'none',
      })
      .to(el, {
        opacity: 0.8,
        scaleX: 1.02,
        duration: 0.05,
        ease: 'power2.in',
      })
      .to(el, {
        opacity: 0,
        scaleX: 1,
        x: 0,
        duration: 0.1,
        ease: 'power2.out',
      });

    return () => {
      tl.kill();
    };
  }, [active, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none opacity-0"
    >
      {/* Red channel */}
      <div 
        className="absolute inset-0 bg-red-500/30 mix-blend-screen"
        style={{ transform: 'translateX(-3px)' }}
      />
      {/* Blue channel */}
      <div 
        className="absolute inset-0 bg-blue-500/30 mix-blend-screen"
        style={{ transform: 'translateX(3px)' }}
      />
      {/* Scan lines */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      {/* White flash */}
      <div className="absolute inset-0 bg-white/20" />
    </div>
  );
}
