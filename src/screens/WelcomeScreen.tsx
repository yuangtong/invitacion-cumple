import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const children = contentRef.current.children;
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="screen-container relative">
      {/* Background collage */}
      <div
        className="absolute inset-0 bg-cover bg-center pixel-art"
        style={{ backgroundImage: 'url(/images/bg-welcome.jpg)' }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-pixel-black/60" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 text-center overflow-y-auto scrollbar-hide"
      >
        {/* Title */}
        <h1 className="font-pixel text-neon-fuchsia text-[13px] leading-relaxed mb-4 text-shadow-neon">
          ESTÁS INVITADO A LA FIESTA MÁS HOT DEL AÑO
        </h1>

        {/* Subtitle */}
        <p className="font-pixel text-electric-turquoise text-[10px] leading-relaxed mb-3">
          Celebrando al{' '}
          <span className="text-rave-yellow">TRÍO DE LA DIVERSIDAD SEXUAL</span>:
          <br />
          Mathi, Aimin y Yuen
        </p>

        {/* Lore note */}
        <p className="font-pixel text-rave-yellow text-[9px] italic mb-4">
          "Sí, somos mellizos (no preguntes)."
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-neon-fuchsia via-electric-turquoise to-retro-pink mb-4" />

        {/* Instructions */}
        <p className="font-inter text-white text-[13px] leading-relaxed mb-4 max-w-[320px]">
          A continuación te haremos un par de preguntas para el conteo de invitación.
        </p>

        <p className="font-inter text-white text-[13px] font-bold mb-2 max-w-[320px]">
          Tienes que responder SÍ O SÍ todas las preguntas para entrar.
        </p>

        <p className="font-inter text-neon-fuchsia text-[13px] font-bold mb-6">
          Sino no entras.
        </p>

        {/* Security note */}
        <p className="font-pixel text-retro-pink text-[8px] mb-8 opacity-80">
          (Alberth será el seguridad. Tiene ganas de pegar.)
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="pixel-btn bg-neon-fuchsia text-pixel-black w-full max-w-[320px] animate-pulse-glow"
          style={{ boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FF00FF' }}
        >
          COMENZAR INTERROGATORIO
        </button>
      </div>
    </div>
  );
}
