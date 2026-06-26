import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface WelcomeScreenProps {
  onStart: () => void;
}

const PARTY_RULES = [
  'No se admiten envidiosos.',
  'Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.',
  'Dress code: Lo que te haga sentir menos feo.',
  'Traer tu propio vaso (ecología, amigues).',
  'Regalo obligatorio (ya lo marcaste, no hay vuelta atrás).',
  'Se permite fumar pero UNICAMENTE en el patio (regla de oro).',
  'Usar el baño respectivo para chicas y chicos.',
  'No vomitar ni derramar nada en el suelo.',
  'Si se hace, avisar y trapear por su cuenta.',
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showRules, setShowRules] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const children = contentRef.current.children;
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleAcceptRules = () => {
    if (agreed) {
      setShowRules(false);
      onStart();
    }
  };

  return (
    <div className="screen-container relative">
      {/* Background collage */}
      <div
        className="absolute inset-0 bg-cover bg-center pixel-art"
        style={{ backgroundImage: 'url(/images/bg-welcome.jpg)' }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-pixel-black/60" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 text-center overflow-y-auto scrollbar-hide"
      >
        {/* Title */}
        <h1 className="font-pixel text-neon-fuchsia text-[13px] leading-relaxed mb-4 text-shadow-neon">
          ESTÁS INVITADO A LA FIESTA MÁS HOT DEL AÑO
        </h1>

        {/* Subtitle */}
        <p className="font-pixel text-electric-turquoise text-[10px] leading-relaxed mb-3">
          Celebrando al{' '}
          <span className="text-rave-yellow">TRÍO DE LA DIVERSIDAD SEXUAL</span>:
          <br />
          Mathi, Aimin y Yuen
        </p>

        {/* Lore note */}
        <p className="font-pixel text-rave-yellow text-[9px] italic mb-4">
          &quot;Sí, somos mellizos (no preguntes).&quot;
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-neon-fuchsia via-electric-turquoise to-retro-pink mb-4" />

        {/* Instructions */}
        <p className="font-pixel text-white text-[10px] leading-relaxed mb-4 max-w-[320px]">
          A continuación te haremos un par de preguntas para el conteo de invitación.
        </p>

        <p className="font-pixel text-white text-[10px] font-bold mb-2 max-w-[320px]">
          Tienes que responder SÍ O SÍ todas las preguntas para entrar.
        </p>

        <p className="font-pixel text-neon-fuchsia text-[10px] font-bold mb-6">
          Sino no entras.
        </p>

        {/* Security note */}
        <p className="font-pixel text-retro-pink text-[8px] mb-8 opacity-80">
          (Alberth será el seguridad. Tiene ganas de pegar.)
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowRules(true)}
          className="pixel-btn bg-neon-fuchsia text-pixel-black w-full max-w-[320px] animate-pulse-glow"
          style={{ boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FF00FF' }}
        >
          COMENZAR INTERROGATORIO
        </button>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-pixel-black border-2 border-neon-fuchsia w-full max-w-[360px] max-h-[85vh] overflow-y-auto scrollbar-hide p-5"
            style={{
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
            }}
          >
            <h2 className="font-pixel text-neon-fuchsia text-[11px] mb-4 text-center text-shadow-neon">
              REGLAS DE LA CASA
            </h2>
            <p className="font-pixel text-electric-turquoise text-[7px] mb-4 text-center">
              Léelas todas. Sí o sí.
            </p>

            <ol className="space-y-3 mb-5">
              {PARTY_RULES.map((rule, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-pixel text-neon-fuchsia text-[8px] mt-0.5 shrink-0">{i + 1}.</span>
                  <span className="font-pixel text-white text-[8px] leading-relaxed">{rule}</span>
                </li>
              ))}
            </ol>

            {/* Agreement checkbox */}
            <label className="flex items-start gap-3 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-neon-fuchsia shrink-0"
              />
              <span className="font-pixel text-rave-yellow text-[7px] leading-relaxed">
                He leído todas las reglas y estoy de acuerdo. No me quejaré si Alberth me pega.
              </span>
            </label>

            {/* Accept button */}
            <button
              onClick={handleAcceptRules}
              className={`pixel-btn w-full text-[9px] transition-all duration-300 ${
                agreed
                  ? 'bg-neon-fuchsia text-pixel-black animate-pulse-glow'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
              disabled={!agreed}
              style={agreed ? { boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FF00FF' } : {}}
            >
              ACEPTO Y QUIERO ENTRAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
