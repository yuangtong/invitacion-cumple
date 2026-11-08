import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { config } from '../config';

// Barra de carga de duración mínima; al terminar, el tap inicia música y avanza.
export function LoaderScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const ready = progress >= 100;
  const [loadingText, readyText] = config.loader.textos;

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 100,
      duration: config.loader.duracionMs / 1000,
      ease: 'none',
      onUpdate: () => setProgress(Math.round(obj.v)),
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <div className="screen items-center justify-center" onClick={() => ready && onComplete()}>
      <div className="w-full max-w-[260px]">
        <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
          <div className="h-full bg-zinc-900" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-center text-sm">{progress}%</p>
        <p className={`mt-6 text-center text-sm font-semibold ${ready ? 'animate-pulse' : 'text-zinc-500'}`}>
          {ready ? readyText : loadingText}
        </p>
      </div>
    </div>
  );
}
