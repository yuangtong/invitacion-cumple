import { config } from '../config';
import { VoteBars } from '../components/VoteBars';
import type { VoteStats } from '../types';

// Pregunta 1: elegir entre opciones; al votar aparecen los resultados reales y se habilita "Siguiente".
export function VoteScreen({ selected, stats, onVote, onNext }: {
  selected: string | null;
  stats: VoteStats;
  onVote: (id: string) => void;
  onNext: () => void;
}) {
  const q = config.pregunta1;
  return (
    <div className="screen justify-center gap-5">
      <p className="label">{q.etiqueta}</p>
      <h2 className="text-xl font-bold">{q.titulo}</h2>
      <p className="text-sm text-zinc-500">{q.subtitulo}</p>

      <div className="flex gap-4">
        {q.opciones.map((o) => (
          <button
            key={o.id}
            onClick={() => onVote(o.id)}
            className={`flex aspect-square flex-1 flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white p-3 transition ${
              selected === o.id ? 'scale-105 border-zinc-900' : selected ? 'border-zinc-200 opacity-50' : 'border-zinc-300'
            }`}
          >
            {o.imagen && <img src={o.imagen} alt="" className="h-16 w-16 object-contain" />}
            <span className="font-semibold">{o.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="card">
          <p className="label mb-3">Resultados parciales</p>
          <VoteBars stats={stats} highlight={selected} />
        </div>
      )}

      <button className="btn" disabled={!selected} onClick={onNext}>Siguiente</button>
    </div>
  );
}
