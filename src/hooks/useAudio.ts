import { useRef, useCallback, useState } from 'react';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const init = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/track-loader.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
  }, []);

  const play = useCallback(() => {
    init();
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user needs to interact
      });
      setEnabled(true);
    }
  }, [init]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setEnabled(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      audioRef.current?.pause();
      setEnabled(false);
    } else {
      init();
      audioRef.current?.play().catch(() => {});
      setEnabled(true);
    }
  }, [enabled, init]);

  const playSfx = useCallback((sfxName: 'tap' | 'success' | 'error') => {
    if (!enabled) return;
    const sfx = new Audio(`/audio/sfx-${sfxName}.mp3`);
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
  }, [enabled]);

  return { enabled, play, stop, toggle, playSfx, init };
}
