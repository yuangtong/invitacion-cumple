export type Screen = 'loader' | 'welcome' | 'q1-vote' | 'q2-spectrum' | 'form' | 'info';

export interface FormData {
  nombre: string;
  sexo: string;
  regalo: boolean;
  voto: 'sombrero' | 'k' | null;
  espectro: number;
}

export interface VoteStats {
  total: number;
  sombrero: number;
  k: number;
  porcentajeSombrero: number;
  porcentajeK: number;
}

export interface SpectrumStats {
  media: number;
  mediana: number;
  distribucion: number[];
}

export interface AppState {
  screen: Screen;
  formData: FormData;
  voteStats: VoteStats;
  spectrumStats: SpectrumStats;
  audioEnabled: boolean;
}
