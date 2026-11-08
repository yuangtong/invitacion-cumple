import { useState } from 'react';
import { config } from '../config';
import { SpectrumChart } from '../components/SpectrumChart';
import type { SpectrumStats } from '../types';

// Pregunta 2: slider 0–100 con "zonas" con nombre. Confirmar muestra la distribución real.
export function SpectrumScreen({ value, stats, onChange, onNext }: {
  value: number;
  stats: SpectrumStats;
  onChange: (v: number) => void;
  onNext: () => void;
}) {
  const q = config.pregunta2;
  const [confirmed, setConfirmed] = useState(false);
  const zona = [...q.zonas].sort((a, b) => a.valor - b.valor).find((z) => value <= z.valor) ?? q.zonas[q.zonas.length - 1];

  return (
    <div className="screen justify-center gap-5">
      <p className="label">{q.etiqueta}</p>
      <h2 className="text-xl font-bold">{q.titulo}</h2>
      <p className="text-sm text-zinc-500">{q.subtitulo}</p>

      <div className="card flex flex-col items-center gap-2">
        {zona.imagen && <img src={zona.imagen} alt="" className="h-20 w-20 object-contain" />}
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-sm text-zinc-600">{zona.nombre}</p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          disabled={confirmed}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-zinc-900"
        />
        <div className="flex justify-between text-xs text-zinc-500">
          <span>{q.extremos[0]}</span><span>{q.extremos[1]}</span>
        </div>
      </div>

      {confirmed ? (
        <>
          <div className="card">
            <p className="label mb-2">Así respondieron los demás</p>
            <SpectrumChart stats={stats} userValue={value} />
          </div>
          <button className="btn" onClick={onNext}>Siguiente</button>
        </>
      ) : (
        <button className="btn" onClick={() => setConfirmed(true)}>Confirmar</button>
      )}
    </div>
  );
}
