import { Volume2, VolumeX } from 'lucide-react';

export function AudioToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? 'Silenciar' : 'Activar sonido'}
      className="absolute right-3 top-3 z-50 rounded-full border border-zinc-300 bg-white p-2"
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
