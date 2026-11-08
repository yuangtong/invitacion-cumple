import { config } from '../config';

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const b = config.bienvenida;
  return (
    <div className="screen justify-center gap-6">
      <p className="label">{config.evento.anfitriones}</p>
      <h1 className="text-3xl font-bold">{b.titulo}</h1>
      <p className="text-lg font-semibold">{config.evento.nombre}</p>
      <p className="whitespace-pre-line text-zinc-600">{b.cuerpo}</p>
      <button className="btn" onClick={onStart}>{b.cta}</button>
    </div>
  );
}
