import { useState, useEffect } from 'react';
import type { VoteStats, SpectrumStats } from '../types';

const MOCK_VOTE_STATS: VoteStats = {
  total: 0,
  sombrero: 0,
  k: 0,
  porcentajeSombrero: 50,
  porcentajeK: 50,
};

const MOCK_SPECTRUM_STATS: SpectrumStats = {
  media: 50,
  mediana: 50,
  distribucion: Array(20).fill(0),
};

interface NetlifyStatsResult {
  voteStats: VoteStats;
  spectrumStats: SpectrumStats;
  loading: boolean;
}

export function useNetlifyStats(): NetlifyStatsResult {
  const [voteStats, setVoteStats] = useState<VoteStats>(MOCK_VOTE_STATS);
  const [spectrumStats, setSpectrumStats] = useState<SpectrumStats>(MOCK_SPECTRUM_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/.netlify/functions/get-stats')
      .then((res) => {
        if (!res.ok) throw new Error('stats fetch failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setVoteStats({
          total: data.totalResponses,
          sombrero: data.votos.sombrero,
          k: data.votos.k,
          porcentajeSombrero: data.votos.porcentajeSombrero,
          porcentajeK: data.votos.porcentajeK,
        });
        setSpectrumStats({
          media: data.espectro.media,
          mediana: data.espectro.mediana,
          distribucion: data.espectro.distribucion,
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { voteStats, spectrumStats, loading };
}
