import { useEffect, useRef } from 'react';
import type { SpectrumStats } from '../types';

// Curva de distribución del espectro (canvas) + media/mediana + marcador del usuario.
export function SpectrumChart({ stats, userValue }: { stats: SpectrumStats; userValue?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { width: w, height: h } = canvas.getBoundingClientRect();
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const data = stats.distribucion;
    const max = Math.max(1, ...data);
    const step = w / (data.length - 1);
    const y = (v: number) => h - (v / max) * (h - 16);

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((v, i) => ctx.lineTo(i * step, y(v)));
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(24,24,27,0.12)';
    ctx.fill();

    ctx.beginPath();
    data.forEach((v, i) => (i ? ctx.lineTo(i * step, y(v)) : ctx.moveTo(0, y(v))));
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (userValue !== undefined) {
      const x = (userValue / 100) * w;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.strokeStyle = '#dc2626';
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [stats, userValue]);

  return (
    <div>
      <canvas ref={canvasRef} className="mb-2 h-[100px] w-full" />
      <div className="flex justify-around text-center text-sm">
        <div><p className="label">Media</p><p className="text-lg font-bold">{stats.media}</p></div>
        <div><p className="label">Mediana</p><p className="text-lg font-bold">{stats.mediana}</p></div>
        {userValue !== undefined && <div><p className="label">Tú</p><p className="text-lg font-bold text-red-600">{userValue}</p></div>}
      </div>
    </div>
  );
}
