import { useCallback, useRef, useState } from 'react';

// Música de fondo en loop + efectos de sonido. Pon tus archivos en public/audio/.
const TRACK = '/audio/track.mp3';

export type Sfx = 'tap' | 'success' | 'error';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const ensure = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(TRACK);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(() => {
    ensure().play().catch(() => {});
    setEnabled(true);
  }, [ensure]);

  const toggle = useCallback(() => {
    if (enabled) {
      audioRef.current?.pause();
      setEnabled(false);
    } else {
      play();
    }
  }, [enabled, play]);

  const playSfx = useCallback((name: Sfx) => {
    if (!enabled) return;
    const sfx = new Audio(`/audio/sfx-${name}.mp3`);
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
  }, [enabled]);

  return { enabled, play, toggle, playSfx };
}
