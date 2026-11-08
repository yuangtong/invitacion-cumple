import { useEffect, useState } from 'react';
import { config } from '../config';
import type { SpectrumStats, VoteStats } from '../types';

const ids = config.pregunta1.opciones.map((o) => o.id);

const EMPTY_VOTES: VoteStats = {
  total: 0,
  votos: Object.fromEntries(ids.map((id) => [id, 0])),
  porcentajes: Object.fromEntries(ids.map((id) => [id, 100 / ids.length])),
};

const EMPTY_SPECTRUM: SpectrumStats = { media: 50, mediana: 50, distribucion: Array(20).fill(0) };

// Trae las estadísticas reales una vez al cargar la app.
export function useStats() {
  const [voteStats, setVoteStats] = useState(EMPTY_VOTES);
  const [spectrumStats, setSpectrumStats] = useState(EMPTY_SPECTRUM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled) return;
        setVoteStats({ total: d.total, votos: d.votos, porcentajes: d.porcentajes });
        setSpectrumStats(d.espectro);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  return { voteStats, spectrumStats, loading };
}
