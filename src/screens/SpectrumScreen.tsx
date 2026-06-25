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

export function SpectrumScreen({ value, stats, onChange, onNext }: SpectrumScreenProps) {
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (submitted && resultsRef.current) {
      setShowResults(true);
      gsap.fromTo(
        resultsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      // Draw area chart
      drawChart();
    }
  }, [submitted]);

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

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Draw gradient area
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(255, 0, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(75, 0, 130, 0.3)');
    gradient.addColorStop(1, 'rgba(135, 206, 235, 0.1)');

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((val, i) => {
      const x = i * stepX;
      const y = h - (val / maxVal) * (h - 20);
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
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
    if (!submitted) {
      setSubmitted(true);
      // Confetti burst
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
    <div className="screen-container px-5 py-8 relative"
      style={{ background: 'linear-gradient(135deg, #4B0082 0%, #FF00FF 40%, #00FFFF 100%)' }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Question label */}
        <p className="font-pixel text-retro-pink text-[9px] mb-3">
          PREGUNTA 2 DE 3
        </p>

        {/* Question */}
        <h2 className="font-pixel text-white text-[12px] leading-relaxed mb-2 text-shadow-pixel">
          ¿Dónde te ubicarías en el espectro?
        </h2>

        {/* Subtext */}
        <p className="font-pixel text-electric-turquoise text-[8px] mb-10 opacity-80 leading-relaxed">
          (Preguntamos porque la fiesta es el mismo día de la marcha y necesitamos datos para el catering)
        </p>

        {/* Slider */}
        <div className="mb-4 px-2">
          <div className="flex justify-between mb-2">
            <span className="font-pixel text-white text-[10px]">0</span>
            <span className="font-pixel text-neon-fuchsia text-[12px]">{value}</span>
            <span className="font-pixel text-white text-[10px]">100</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="w-full"
            disabled={submitted}
          />
        </div>

        {/* Selected value display */}
        <div className="text-center mb-6">
          <p className="font-pixel text-[9px] text-white/60">
            {value < 25 && 'Zona: Clásico'}
            {value >= 25 && value < 50 && 'Zona: Curioso'}
            {value >= 50 && value < 75 && 'Zona: Abierto'}
            {value >= 75 && 'Zona: Arcoíris Total'}
          </p>
        </div>

        {/* Results panel */}
        {showResults && (
          <div ref={resultsRef} className="pixel-card p-4 mb-6 bg-white/5">
            <p className="font-pixel text-electric-turquoise text-[9px] mb-3 text-center">
              MEDIA DEL GRUPO
            </p>

            {/* Area chart */}
            <canvas
              ref={canvasRef}
              className="w-full h-[120px] mb-3"
            />

            {/* Stats */}
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-inter text-white/50 text-[10px]">Media</p>
                <p className="font-inter text-neon-fuchsia text-[18px] font-bold">{stats.media}</p>
              </div>
              <div className="text-center">
                <p className="font-inter text-white/50 text-[10px]">Mediana</p>
                <p className="font-inter text-electric-turquoise text-[18px] font-bold">{stats.mediana}</p>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Next button */}
        <button
          onClick={onNext}
          className={`pixel-btn w-full transition-all duration-300 ${
            submitted
              ? 'bg-electric-turquoise text-pixel-black animate-pulse-glow'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
          disabled={!submitted}
          style={submitted ? { boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #00FFFF' } : {}}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
}
