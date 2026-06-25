import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-pixel-black/80 border-2 border-neon-fuchsia/60 rounded-lg backdrop-blur-sm transition-all duration-200 active:scale-95"
      aria-label={enabled ? 'Silenciar audio' : 'Activar audio'}
      style={{
        boxShadow: enabled ? '0 0 10px #FF00FF' : 'none',
      }}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-neon-fuchsia" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50" />
      )}
    </button>
  );
}
