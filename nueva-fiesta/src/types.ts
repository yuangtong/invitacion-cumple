export type Screen = 'loader' | 'welcome' | 'q1-vote' | 'q2-spectrum' | 'form' | 'info';

export interface Answers {
  nombre: string;
  apellido: string;
  email: string;
  extra: string;
  regalo: boolean;
  voto: string | null;
  espectro: number;
}

export interface VoteStats {
  total: number;
  votos: Record<string, number>;
  porcentajes: Record<string, number>;
}

export interface SpectrumStats {
  media: number;
  mediana: number;
  distribucion: number[];
}
