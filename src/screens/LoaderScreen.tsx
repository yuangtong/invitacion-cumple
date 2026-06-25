import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderScreenProps {
  onComplete: () => void;
}

export function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');
  const [subtitleText, setSubtitleText] = useState('INSERT COIN');
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress bar over 2.5 seconds
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'none',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        setPhase('ready');
        setSubtitleText('READY!');
      },
    });

    return () => {
      gsap.killTweensOf(progressObj);
    };
  }, []);

  useEffect(() => {
    // Blink the subtitle
    const interval = setInterval(() => {
      setSubtitleText(prev => prev === 'INSERT COIN' ? 'INSERT COIN_' : 'INSERT COIN');
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    if (phase === 'ready') {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="screen-container bg-pixel-black items-center justify-center px-6"
      onClick={handleTap}
    >
      {/* Pixel art spinner */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-1 w-16 h-16">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
            <div
              key={i}
              className="bg-neon-fuchsia"
              style={{
                animation: `blink 0.8s ease-in-out ${i * 0.05}s infinite`,
                opacity: 0.3 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <h1 className="font-pixel text-white text-[11px] mb-2 tracking-wider animate-blink">
        CARGANDO FIESTA...
      </h1>

      {/* Subtitle */}
      <p className="font-pixel text-electric-turquoise text-[9px] mb-8 tracking-widest">
        {subtitleText}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[280px] mb-4">
        <div className="h-4 bg-white/10 border border-white/20 relative overflow-hidden"
          style={{
            clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)',
          }}
        >
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-neon-fuchsia to-retro-pink transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-pixel text-[8px] text-white/50 mt-2 text-center">
          {progress}%
        </p>
      </div>

      {/* Server joke */}
      <p className="font-pixel text-retro-pink text-[8px] mt-4 text-center opacity-70">
        Conectando con el servidor de Alberth...
      </p>

      {/* Tap to start overlay */}
      {phase === 'ready' && (
        <div className="absolute inset-0 bg-pixel-black/80 flex items-center justify-center z-10 animate-bounce-in"
          onClick={handleTap}
        >
          <div className="text-center">
            <p className="font-pixel text-neon-fuchsia text-[14px] mb-4 text-shadow-neon">
              TOCA PARA COMENZAR
            </p>
            <div className="w-12 h-12 mx-auto border-2 border-electric-turquoise rounded-full flex items-center justify-center animate-pulse">
              <div className="w-0 h-0 border-l-[10px] border-l-electric-turquoise border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
