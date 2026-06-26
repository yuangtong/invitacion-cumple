import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import type { FormData, VoteStats, SpectrumStats } from '../types';

interface FormScreenProps {
  formData: FormData;
  voteStats: VoteStats;
  spectrumStats: SpectrumStats;
  onSubmit: (data: Partial<FormData>) => void;
}

const SEXO_OPTIONS = [
  { value: 'si_por_favor', label: 'Sí, por favor' },
  { value: 'no_gracias', label: 'No, gracias' },
  { value: 'depende', label: 'Depende del día' },
  { value: 'prefiero_no_decir', label: 'Prefiero no decir (pero aquí estoy)' },
];

export function FormScreen({ formData, voteStats, spectrumStats, onSubmit }: FormScreenProps) {
  const [nombre, setNombre] = useState(formData.nombre);
  const [apellido, setApellido] = useState(formData.apellido);
  const [email, setEmail] = useState(formData.email);
  const [sexo, setSexo] = useState(formData.sexo);
  const [errors, setErrors] = useState<{ nombre?: string; apellido?: string; email?: string; sexo?: string }>({});
  const [phase, setPhase] = useState<'form' | 'celebration' | 'results'>('form');
  const celebrationRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const voteBar1Ref = useRef<HTMLDivElement>(null);
  const voteBar2Ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const validate = () => {
    const newErrors: { nombre?: string; apellido?: string; email?: string; sexo?: string } = {};
    if (!nombre.trim() || nombre.trim().length < 2) {
      newErrors.nombre = 'Mínimo 2 caracteres, no seas vago';
    }
    if (!apellido.trim() || apellido.trim().length < 2) {
      newErrors.apellido = 'Tu apellido también, queremos saber quién eres';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Pon un email válido, ¿o no quieres las fotos?';
    }
    if (!sexo) {
      newErrors.sexo = 'Elige una opción, no hay escape';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const drawSpectrumChart = useCallback(() => {
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
    const data = spectrumStats.distribucion;
    const maxVal = Math.max(...data);
    const stepX = w / (data.length - 1);

    ctx.clearRect(0, 0, w, h);

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(75, 0, 130, 0.6)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.3)');
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
  }, [spectrumStats.distribucion]);

  useEffect(() => {
    if (phase === 'celebration') {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF69B4', '#4B0082'],
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF69B4', '#4B0082'],
          disableForReducedMotion: true,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      gsap.fromTo(
        celebrationRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          onComplete: () => {
            setTimeout(() => setPhase('results'), 800);
          },
        }
      );
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'results' && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out' }
      );
      if (voteBar1Ref.current && voteBar2Ref.current) {
        gsap.fromTo(voteBar1Ref.current, { width: '0%' }, { width: `${voteStats.porcentajeSombrero}%`, duration: 1, ease: 'power2.out', delay: 0.5 });
        gsap.fromTo(voteBar2Ref.current, { width: '0%' }, { width: `${voteStats.porcentajeK}%`, duration: 1, ease: 'power2.out', delay: 0.7 });
      }
      drawSpectrumChart();
    }
  }, [phase, voteStats, drawSpectrumChart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formEl = document.querySelector('form[name="rsvp"]') as HTMLFormElement;
    if (formEl) {
      const formDataNetlify = new FormData(formEl);
      formDataNetlify.set('nombre', `${nombre} ${apellido}`);
      formDataNetlify.set('email', email);
      formDataNetlify.set('sexo', sexo);
      formDataNetlify.set('voto', formData.voto || '');
      formDataNetlify.set('espectro', String(formData.espectro));
      formDataNetlify.set('regalo', 'on');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataNetlify as any).toString(),
      }).catch(() => {});
    }

    setPhase('celebration');
  };

  if (phase === 'celebration') {
    return (
      <div className="screen-container bg-pixel-black items-center justify-center">
        <div
          ref={celebrationRef}
          className="text-center"
          style={{ opacity: 0 }}
        >
          <h1
            className="font-pixel text-rave-yellow text-[24px]"
            style={{
              textShadow: '0 0 20px #FFFF00, 0 0 40px #FFFF00, 0 0 80px #FF00FF',
            }}
          >
            APROBADO!
          </h1>
          <p className="font-pixel text-white/60 text-[9px] mt-4">
            Alberth te dejó pasar... por ahora
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="screen-container bg-pixel-black px-5 py-8 overflow-y-auto scrollbar-hide">
        <div ref={resultsRef} className="flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="font-pixel text-neon-fuchsia text-[11px] mb-1 text-shadow-neon">
              RESULTADOS ACUMULADOS
            </h2>
            <p className="font-pixel text-white/60 text-[9px]">
              {voteStats.total} invitados han confirmado
            </p>
          </div>

          <div className="pixel-card p-4 bg-white/5">
            <p className="font-pixel text-electric-turquoise text-[9px] mb-1">
              VOTACIÓN ELECCIONES
            </p>
            <p className="font-pixel text-white/40 text-[6px] mb-3 leading-relaxed italic">
              * Netamente satírico pa&apos; divertirnos. ¡No peleas! Quien se pelea entrega el chiquito a Alberth — y él no perdona.
            </p>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="font-pixel text-white text-[8px]">Sombrero</span>
                <span className="font-pixel text-green-400 text-[8px]">{voteStats.porcentajeSombrero}%</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={voteBar1Ref}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-pixel text-white text-[8px]">K</span>
                <span className="font-pixel text-orange-400 text-[8px]">{voteStats.porcentajeK}%</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={voteBar2Ref}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="pixel-card p-4 bg-white/5">
            <p className="font-pixel text-electric-turquoise text-[9px] mb-2">
              DISTRIBUCIÓN DEL ESPECTRO
            </p>
            <canvas ref={canvasRef} className="w-full h-[100px] mb-2" />
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-pixel text-white/50 text-[7px]">Media</p>
                <p className="font-pixel text-neon-fuchsia text-[14px]">{spectrumStats.media}</p>
              </div>
              <div className="text-center">
                <p className="font-pixel text-white/50 text-[7px]">Mediana</p>
                <p className="font-pixel text-electric-turquoise text-[14px]">{spectrumStats.mediana}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSubmit({ nombre, apellido, email, sexo })}
            className="pixel-btn bg-neon-fuchsia text-white w-full mt-2"
            style={{ boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FF00FF' }}
          >
            VER DATOS DE LA FIESTA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container px-5 overflow-y-auto scrollbar-hide" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,0,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,255,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(75,0,130,0.2) 0%, transparent 70%), #0A0A0A' }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-full justify-center py-8">
        {/* Header */}
        <div>
          <p className="font-pixel text-rave-yellow text-[9px] mb-2">
            PREGUNTA 3 DE 3 (LA POSTA)
          </p>
          <p className="font-pixel text-white text-[9px] opacity-80">
            Datos reales para la lista de Alberth.
          </p>
        </div>

        {/* Nombre input */}
        <div>
          <label className="font-pixel text-electric-turquoise text-[8px] mb-1 block">
            NOMBRE
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => { setNombre(e.target.value); setErrors(prev => ({ ...prev, nombre: undefined })); }}
            placeholder="Tu nombre fake o real, no importa"
            className="pixel-input"
          />
          {errors.nombre && (
            <p className="font-pixel text-red-400 text-[6px] mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* Apellido input */}
        <div>
          <label className="font-pixel text-electric-turquoise text-[8px] mb-1 block">
            APELLIDO
          </label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => { setApellido(e.target.value); setErrors(prev => ({ ...prev, apellido: undefined })); }}
            placeholder="Tu apellido también, queremos saber quién eres"
            className="pixel-input"
          />
          {errors.apellido && (
            <p className="font-pixel text-red-400 text-[6px] mt-1">{errors.apellido}</p>
          )}
        </div>

        {/* Email input */}
        <div>
          <label className="font-pixel text-electric-turquoise text-[8px] mb-1 block">
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
            placeholder="Te mandaremos las fotos de la fiesta por acá"
            className="pixel-input"
          />
          {errors.email && (
            <p className="font-pixel text-red-400 text-[6px] mt-1">{errors.email}</p>
          )}
        </div>

        {/* Sexo radio group */}
        <div>
          <label className="font-pixel text-electric-turquoise text-[8px] mb-1 block">
            SEXO
          </label>
          <div className="flex flex-col gap-2">
            {SEXO_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => { setSexo(option.value); setErrors(prev => ({ ...prev, sexo: undefined })); }}
                className={`text-left px-4 py-3 font-pixel text-[8px] transition-all duration-200 ${
                  sexo === option.value
                    ? 'bg-neon-fuchsia/30 border-2 border-neon-fuchsia text-white'
                    : 'bg-white/5 border-2 border-white/10 text-white/70 hover:bg-white/10'
                }`}
                style={{
                  clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
                }}
              >
                <span className="mr-2">{sexo === option.value ? '◆' : '◇'}</span>
                {option.label}
              </button>
            ))}
          </div>
          {errors.sexo && (
            <p className="font-pixel text-red-400 text-[6px] mt-1">{errors.sexo}</p>
          )}
        </div>

        {/* Regalo section header + checkbox */}
        <div>
          <label className="font-pixel text-electric-turquoise text-[8px] mb-1 block">
            REGALO
          </label>
          <div className="pixel-card p-4 bg-rave-yellow/10 border-rave-yellow/30">
            <label className="flex items-center gap-3 cursor-default">
              <input
                type="checkbox"
                checked
                disabled
                className="w-4 h-4 accent-rave-yellow cursor-not-allowed"
              />
              <span className="font-pixel text-rave-yellow text-[7px] leading-relaxed">
                Sí, llevaré regalo (obligatorio, no se puede desmarcar)
              </span>
            </label>
          </div>
        </div>

        {/* Hidden fields for Netlify */}
        <input type="hidden" name="voto" value={formData.voto || ''} />
        <input type="hidden" name="espectro" value={formData.espectro} />

        {/* Submit button */}
        <button
          type="submit"
          className="pixel-btn bg-rave-yellow text-pixel-black w-full animate-pulse-glow"
          style={{ boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FFFF00' }}
        >
          ENVIAR Y SUPLICAR ENTRADA
        </button>

        {/* Error message */}
        {(errors.nombre || errors.apellido || errors.sexo) && (
          <p className="font-pixel text-red-400 text-[7px] text-center">
            Alberth dice que algo salió mal. Intenta de nuevo o te quedas afuera.
          </p>
        )}
      </form>
    </div>
  );
}
