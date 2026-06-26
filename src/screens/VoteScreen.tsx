import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { VoteStats } from '../types';

interface VoteScreenProps {
  selectedVote: 'sombrero' | 'k' | null;
  stats: VoteStats;
  onVote: (vote: 'sombrero' | 'k') => void;
  onNext: () => void;
}

export function VoteScreen({ selectedVote, stats, onVote, onNext }: VoteScreenProps) {
  const [hasVoted, setHasVoted] = useState(!!selectedVote);
  const resultsRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedVote && resultsRef.current) {
      setHasVoted(true);
      gsap.fromTo(
        resultsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      if (bar1Ref.current && bar2Ref.current) {
        gsap.fromTo(bar1Ref.current, { width: '0%' }, { width: `${stats.porcentajeSombrero}%`, duration: 0.8, ease: 'power2.out', delay: 0.3 });
        gsap.fromTo(bar2Ref.current, { width: '0%' }, { width: `${stats.porcentajeK}%`, duration: 0.8, ease: 'power2.out', delay: 0.5 });
      }
    }
  }, [selectedVote, stats]);

  const handleVote = (vote: 'sombrero' | 'k') => {
    onVote(vote);
    setHasVoted(true);
  };

  return (
    <div className="screen-container relative px-5" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,0,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,255,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(75,0,130,0.2) 0%, transparent 70%), #0A0A0A' }}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Question label */}
        <p className="font-pixel text-retro-pink text-[9px] mb-3 w-full">
          PREGUNTA 1 DE 3
        </p>

        {/* Question */}
        <h2 className="font-pixel text-white text-[12px] leading-relaxed mb-2 text-shadow-pixel w-full">
          ¿Por quién votaste en las últimas elecciones?
        </h2>

        {/* Subtext */}
        <p className="font-pixel text-electric-turquoise text-[8px] mb-8 opacity-80 leading-relaxed w-full">
          (No hay opción &apos;voto en blanco&apos;, aquí se juega de verdad)
        </p>

        {/* Voting buttons - icons only */}
        <div className="flex gap-6 mb-6 w-full justify-center">
          {/* Sombrero button */}
          <button
            onClick={() => handleVote('sombrero')}
            className={`flex flex-col items-center justify-center w-[140px] h-[140px] transition-all duration-200 ${
              selectedVote === 'sombrero'
                ? 'bg-green-500/40 border-2 border-green-400 scale-105'
                : 'bg-black/30 border-2 border-white/20 hover:bg-black/50 active:scale-95'
            }`}
            style={{
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
          >
            <img
              src="/images/icon-sombrero.png"
              alt="Sombrero"
              className="w-20 h-20 pixel-art object-contain"
            />
          </button>

          {/* K button */}
          <button
            onClick={() => handleVote('k')}
            className={`flex flex-col items-center justify-center w-[140px] h-[140px] transition-all duration-200 ${
              selectedVote === 'k'
                ? 'bg-orange-500/40 border-2 border-orange-400 scale-105'
                : 'bg-black/30 border-2 border-white/20 hover:bg-black/50 active:scale-95'
            }`}
            style={{
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
          >
            <img
              src="/images/icon-k.png"
              alt="K"
              className="w-20 h-20 pixel-art object-contain"
            />
          </button>
        </div>

        {/* Results panel */}
        {hasVoted && (
          <div
            ref={resultsRef}
            className="pixel-card p-4 mb-6 bg-white/5 w-full"
          >
            <p className="font-pixel text-electric-turquoise text-[9px] mb-2 text-center">
              RESULTADOS PARCIALES
            </p>
            <p className="font-pixel text-white/40 text-[6px] text-center mb-3 leading-relaxed italic">
              * Estas preguntas son netamente satíricas pa&apos; divertirnos. ¡No peleas! Quien se pelea entrega el chiquito a Alberth — y él no perdona.
            </p>

            {/* Sombrero bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="font-pixel text-white text-[8px]">Sombrero</span>
                <span className="font-pixel text-green-400 text-[8px]">{stats.porcentajeSombrero}%</span>
              </div>
              <div className="h-5 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={bar1Ref}
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            {/* K bar */}
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="font-pixel text-white text-[8px]">K</span>
                <span className="font-pixel text-orange-400 text-[8px]">{stats.porcentajeK}%</span>
              </div>
              <div className="h-5 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={bar2Ref}
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            <p className="font-pixel text-white/50 text-[7px] text-center mt-3">
              {stats.total} invitados han votado
            </p>
          </div>
        )}

        {/* Next button */}
        <button
          onClick={onNext}
          className={`pixel-btn w-full transition-all duration-300 ${
            selectedVote
              ? 'bg-electric-turquoise text-pixel-black animate-pulse-glow'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
          disabled={!selectedVote}
          style={selectedVote ? { boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #00FFFF' } : {}}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
}
