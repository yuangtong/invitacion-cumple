import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { config } from '../config';
import type { VoteStats } from '../types';

// Barras de % por opción de la pregunta 1, animadas al montar.
export function VoteBars({ stats, highlight }: { stats: VoteStats; highlight?: string | null }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    config.pregunta1.opciones.forEach((o, i) => {
      const el = barsRef.current[i];
      if (el) gsap.fromTo(el, { width: '0%' }, { width: `${stats.porcentajes[o.id] ?? 0}%`, duration: 0.8, ease: 'power2.out', delay: 0.2 + i * 0.2 });
    });
  }, [stats]);

  return (
    <div className="flex flex-col gap-3">
      {config.pregunta1.opciones.map((o, i) => (
        <div key={o.id}>
          <div className="mb-1 flex justify-between text-sm">
            <span className={highlight === o.id ? 'font-bold' : ''}>{o.label}{highlight === o.id && ' (tú)'}</span>
            <span>{stats.porcentajes[o.id] ?? 0}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
            <div ref={(el) => { barsRef.current[i] = el; }} className="h-full rounded-full bg-zinc-800" style={{ width: 0 }} />
          </div>
        </div>
      ))}
      <p className="text-xs text-zinc-500">{stats.total} respuestas</p>
    </div>
  );
}
