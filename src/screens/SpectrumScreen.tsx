import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import type { SpectrumStats } from '../types';

interface SpectrumScreenProps {
  value: number;
  stats: SpectrumStats;
  onChange: (value: number) => void;
  onNext: () => void;
}

const TICK_MARKS = [0, 20, 40, 60, 80, 100];

const SPECTRUM_CHARACTERS = [
  { value: 20, name: 'Menta y Lola', img: '/images/menta-y-lola.webp' },
  { value: 40, name: 'Choco', img: '/images/choco.webp' },
  { value: 60, name: 'Adolfo', img: '/images/adolfo.webp' },
  { value: 80, name: 'Majo', img: '/images/anal.webp' },
  { value: 100, name: 'Alberch', img: '/images/alberch.webp' },
];

export function SpectrumScreen({ value, stats, onChange, onNext }: SpectrumScreenProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (hasSubmitted && resultsRef.current) {
      setShowResults(true);
      gsap.fromTo(
        resultsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      drawChart();
    }
  }, [hasSubmitted]);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const data = stats.distribucion;
    const maxVal = Math.max(...data);
    const stepX = w / (data.length - 1);

    ctx.clearRect(0, 0, w, h);

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(255, 0, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(75, 0, 130, 0.3)');
    gradient.addColorStop(1, 'rgba(135, 206, 235, 0.1)');

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((val, i) => {
      const x = i * stepX;
      const y = h - (val / maxVal) * (h - 20);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#FF00FF';
    ctx.lineWidth = 2;
    data.forEach((val, i) => {
      const x = i * stepX;
      const y = h - (val / maxVal) * (h - 20);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [stats.distribucion]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleSliderRelease = () => {
    if (!hasSubmitted) {
      setHasSubmitted(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6, x: 0.5 + (value - 50) / 200 },
        colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF69B4'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="screen-container px-5 relative"
      style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,0,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,255,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(75,0,130,0.2) 0%, transparent 70%), #0A0A0A' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Question label */}
        <p className="font-pixel text-retro-pink text-[9px] mb-3 w-full">
          PREGUNTA 2 DE 3
        </p>

        {/* Question */}
        <h2 className="font-pixel text-white text-[12px] leading-relaxed mb-2 text-shadow-pixel w-full">
          ¿Dónde te ubicarías en el espectro gay?
        </h2>

        {/* Subtext */}
        <p className="font-pixel text-electric-turquoise text-[8px] mb-8 opacity-80 leading-relaxed w-full">
          (Preguntamos porque la fiesta es el mismo día de la marcha y necesitamos datos para el catering)
        </p>

        {/* Character stickers header */}
        <div className="w-full mb-3">
          <div className="flex justify-between px-1">
            {SPECTRUM_CHARACTERS.map((char) => (
              <div
                key={char.value}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                  value === char.value ? 'scale-110' : 'opacity-50 scale-90'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    value === char.value
                      ? 'border-neon-fuchsia shadow-[0_0_8px_#FF00FF]'
                      : 'border-white/20'
                  }`}
                >
                  <img
                    src={char.img}
                    alt={char.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`font-pixel text-[5px] text-center leading-tight max-w-[40px] ${
                    value === char.value ? 'text-neon-fuchsia' : 'text-white/40'
                  }`}
                >
                  {char.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider with tick marks */}
        <div className="mb-4 px-2 w-full">
          <div className="flex justify-center mb-2">
            <span className="font-pixel text-neon-fuchsia text-[14px]">{value}</span>
          </div>

          {/* Slider container with tick marks */}
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              step={20}
              value={value}
              onChange={handleSliderChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full relative z-10"
            />
            {/* Tick marks */}
            <div className="flex justify-between px-[18px] mt-1">
              {TICK_MARKS.map((tick) => (
                <div key={tick} className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-white/50" />
                  <span className="font-pixel text-white/50 text-[6px] mt-0.5">{tick}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected value display */}
        <div className="text-center mb-4">
          <p className="font-pixel text-[9px] text-white/60">
            {value === 0 && 'Zona: Virgen Total'}
            {value === 20 && 'Zona: Menta y Lola'}
            {value === 40 && 'Zona: Choco'}
            {value === 60 && 'Zona: Adolfo'}
            {value === 80 && 'Zona: Majo'}
            {value === 100 && 'Zona: Alberch'}
          </p>
        </div>

        {/* Results panel */}
        {showResults && (
          <div ref={resultsRef} className="pixel-card p-4 mb-6 bg-white/5 w-full">
            <p className="font-pixel text-electric-turquoise text-[9px] mb-3 text-center">
              MEDIA DEL GRUPO
            </p>

            <canvas
              ref={canvasRef}
              className="w-full h-[120px] mb-3"
            />

            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-pixel text-white/50 text-[8px]">Media</p>
                <p className="font-pixel text-neon-fuchsia text-[16px]">{stats.media}</p>
              </div>
              <div className="text-center">
                <p className="font-pixel text-white/50 text-[8px]">Mediana</p>
                <p className="font-pixel text-electric-turquoise text-[16px]">{stats.mediana}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        <button
          onClick={onNext}
          className={`pixel-btn w-full transition-all duration-300 ${
            hasSubmitted
              ? 'bg-electric-turquoise text-pixel-black animate-pulse-glow'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
          disabled={!hasSubmitted}
          style={hasSubmitted ? { boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #00FFFF' } : {}}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
}
