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
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedVote && resultsRef.current) {
      setShowResults(true);
      gsap.fromTo(
        resultsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      // Animate bars growing
      if (bar1Ref.current && bar2Ref.current) {
        gsap.fromTo(bar1Ref.current, { width: '0%' }, { width: `${stats.porcentajeSombrero}%`, duration: 0.8, ease: 'power2.out', delay: 0.3 });
        gsap.fromTo(bar2Ref.current, { width: '0%' }, { width: `${stats.porcentajeK}%`, duration: 0.8, ease: 'power2.out', delay: 0.5 });
      }
    }
  }, [selectedVote, stats]);

  const handleVote = (vote: 'sombrero' | 'k') => {
    if (selectedVote) return; // Already voted
    onVote(vote);
  };

  return (
    <div className="screen-container bg-gradient-rave relative px-5 py-8">
      {/* Floating particles overlay handled by parent */}
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Question label */}
        <p className="font-pixel text-retro-pink text-[9px] mb-3">
          PREGUNTA 1 DE 3
        </p>

        {/* Question */}
        <h2 className="font-pixel text-white text-[12px] leading-relaxed mb-2 text-shadow-pixel">
          ¿Por quién votaste en las últimas elecciones?
        </h2>

        {/* Subtext */}
        <p className="font-pixel text-electric-turquoise text-[8px] mb-8 opacity-80">
          (No hay opción 'voto en blanco', aquí se juega de verdad)
        </p>

        {/* Voting buttons */}
        <div className="flex gap-4 mb-6">
          {/* Sombrero button */}
          <button
            onClick={() => handleVote('sombrero')}
            className={`flex-1 flex flex-col items-center gap-3 p-4 transition-all duration-200 ${
              selectedVote === 'sombrero'
                ? 'bg-green-500/40 border-2 border-green-400 scale-105'
                : selectedVote === 'k'
                ? 'opacity-40'
                : 'bg-black/30 border-2 border-white/20 hover:bg-black/50 active:scale-95'
            }`}
            style={{
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
            disabled={!!selectedVote}
          >
            <img
              src="/images/icon-sombrero.png"
              alt="Sombrero"
              className="w-16 h-16 pixel-art object-contain"
            />
            <span className="font-pixel text-white text-[10px]">SOMBRERO</span>
          </button>

          {/* K button */}
          <button
            onClick={() => handleVote('k')}
            className={`flex-1 flex flex-col items-center gap-3 p-4 transition-all duration-200 ${
              selectedVote === 'k'
                ? 'bg-orange-500/40 border-2 border-orange-400 scale-105'
                : selectedVote === 'sombrero'
                ? 'opacity-40'
                : 'bg-black/30 border-2 border-white/20 hover:bg-black/50 active:scale-95'
            }`}
            style={{
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
            disabled={!!selectedVote}
          >
            <img
              src="/images/icon-k.png"
              alt="K"
              className="w-16 h-16 pixel-art object-contain"
            />
            <span className="font-pixel text-white text-[10px]">K</span>
          </button>
        </div>

        {/* Results panel */}
        {showResults && (
          <div
            ref={resultsRef}
            className="pixel-card p-4 mb-6 bg-white/5"
          >
            <p className="font-pixel text-electric-turquoise text-[9px] mb-4 text-center">
              RESULTADOS PARCIALES
            </p>

            {/* Sombrero bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="font-inter text-white text-[11px]">Sombrero</span>
                <span className="font-inter text-green-400 text-[11px] font-bold">{stats.porcentajeSombrero}%</span>
              </div>
              <div className="h-6 bg-white/10 rounded-full overflow-hidden">
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
                <span className="font-inter text-white text-[11px]">K</span>
                <span className="font-inter text-orange-400 text-[11px] font-bold">{stats.porcentajeK}%</span>
              </div>
              <div className="h-6 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={bar2Ref}
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            <p className="font-inter text-white/50 text-[10px] text-center mt-3">
              {stats.total} invitados han votado
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

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
