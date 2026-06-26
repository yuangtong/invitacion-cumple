import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Calendar, MapPin, Music, Share2, Gift, ExternalLink, X, Image } from 'lucide-react';

function generateICSFile() {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//El Trio de la Diversidad Sexual//Cumpleanos//ES
BEGIN:VEVENT
SUMMARY:Cumpleaños Yuen, Aiming & Mathi — El Trío de la Diversidad Sexual
DTSTART:20260628T020000Z
DTEND:20260628T110000Z
LOCATION:Huamanga 419, Magdalena del Mar, Lima, Peru
DESCRIPTION:El Trío de la Diversidad Sexual te invita a la fiesta más hot del año. Trae regalo, tu propio vaso, y tu mejor vibe Tumblr 2010s. Playlist: https://open.spotify.com/playlist/2Fkh1Kl1xey64GywP3T5ky
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cumple-trio-diversidad-sexual.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Theme gallery images using existing assets
const GALLERY_IMAGES = [
  { src: '/images/tematica-1.jpeg', alt: 'Temática 1' },
  { src: '/images/tematica-2.jpg', alt: 'Temática 2' },
  { src: '/images/tematica-3.jpg', alt: 'Temática 3' },
  { src: '/images/tematica-4.jpg', alt: 'Temática 4' },
  { src: '/images/tematica-5.jpg', alt: 'Temática 5' },
  { src: '/images/tematica-6.jpg', alt: 'Temática 6' },
  { src: '/images/tematica-7.jpg', alt: 'Temática 7' },
  { src: '/images/tematica-8.jpg', alt: 'Temática 8' },
];

export function InfoScreen() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTrollface, setShowTrollface] = useState(false);
  const trollAudioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWhatsApp = () => {
    setShowTrollface(true);
    if (!trollAudioRef.current) {
      trollAudioRef.current = new Audio('/audio/troll-face.mp3');
      trollAudioRef.current.volume = 0.7;
    }
    trollAudioRef.current.currentTime = 0;
    trollAudioRef.current.play().catch(() => {});
  };

  const closeTrollface = () => {
    setShowTrollface(false);
    trollAudioRef.current?.pause();
    if (trollAudioRef.current) trollAudioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const children = contentRef.current.children;
    gsap.fromTo(
      children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenPlaylist = () => {
    window.open('https://open.spotify.com/playlist/2Fkh1Kl1xey64GywP3T5ky?si=xYVcbYsBSaeojN6lq8DvTw', '_blank');
  };

  const handleOpenMaps = () => {
    const address = encodeURIComponent('Huamanga 419, Magdalena del Mar, Lima, Peru');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-luma-lavender to-luma-soft-blue overflow-y-auto scrollbar-hide">
      <div ref={contentRef} className="px-5 py-8 pb-24 flex flex-col gap-5">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="font-pixel text-tumblr-purple text-[11px] mb-2">
            DATOS DE LA FIESTA
          </h1>
          <p className="font-pixel text-gray-600 text-[8px]">
            Sábado 27 de junio, 2026 · 21:00 - 06:00
          </p>
        </div>

        {/* Reglas de la Casa */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-tumblr-purple text-[9px] mb-3 flex items-center gap-2">
            <span className="text-neon-fuchsia">★</span> REGLAS DE LA CASA
          </h2>
          <ol className="font-pixel text-gray-700 text-[7px] space-y-2 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">1.</span>
              No se admiten envidiosos.
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">2.</span>
              Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">3.</span>
              Dress code: Lo que te haga sentir menos feo.
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">4.</span>
              Traer tu propio vaso (ecología, amigues).
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">5.</span>
              Regalo obligatorio (ya lo marcaste, no hay vuelta atrás).
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">6.</span>
              Se permite fumar UNICAMENTE en el patio (regla de oro).
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">7.</span>
              Usar el baño respectivo para chicas y chicos.
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">8.</span>
              No vomitar ni derramar nada en el suelo.
            </li>
            <li className="flex gap-2">
              <span className="text-neon-fuchsia shrink-0">9.</span>
              Si se hace, avisar y trapear por su cuenta.
            </li>
          </ol>
        </section>

        {/* Temática */}
        <section className="bg-gradient-to-r from-neon-fuchsia/10 to-electric-turquoise/10 backdrop-blur-sm rounded-xl p-4 border border-neon-fuchsia/20">
          <h2 className="font-pixel text-neon-fuchsia text-[9px] mb-2">
            VIBE
          </h2>
          <p className="font-pixel text-gray-700 text-[7px] leading-relaxed">
            2010s Tumblr meets Rave Electro. Brillos, neones, pixel art, y todo lo que tu adolescente interior siempre quiso.
          </p>
          <p className="font-pixel text-tumblr-purple text-[7px] mt-2 italic">
            Bonus points si traes un Blackberry de adorno.
          </p>
        </section>

        {/* Theme Gallery */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-tumblr-purple text-[9px] mb-3 flex items-center gap-2">
            <Image className="w-3 h-3" /> GALERÍA TEMÁTICA
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setShowGallery(true)}
                className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-neon-fuchsia transition-colors"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <p className="font-pixel text-gray-500 text-[6px] text-center mt-2">
            Toca para ver la galería completa
          </p>
        </section>

        {/* Música / Spotify */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-green-600 text-[9px] mb-3 flex items-center gap-2">
            <Music className="w-3 h-3" /> PLAYLIST OFICIAL
          </h2>
          <div className="bg-black/5 rounded-lg p-3 mb-3">
            <p className="font-pixel text-gray-600 text-[7px]">
              &quot;cum aimi, yuen y mathi&quot;
            </p>
          </div>
          <button
            onClick={handleOpenPlaylist}
            className="w-full flex items-center justify-center gap-2 bg-[#1DB954] text-white font-pixel text-[8px] py-3 rounded-lg hover:bg-[#1ed760] transition-colors active:scale-[0.98]"
          >
            <ExternalLink className="w-3 h-3" />
            ABRIR PLAYLIST
          </button>
        </section>

        {/* Ubicación con Google Maps embed */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-red-500 text-[9px] mb-3 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> UBICACIÓN
          </h2>
          <div className="rounded-lg overflow-hidden mb-3 border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.5!2d-77.05!3d-12.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8+Huamanga+419!2sHuamanga+419%2C+Magdalena+del+Mar!5e0!3m2!1ses!2spe!4v1"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la fiesta"
            />
          </div>
          <p className="font-pixel text-gray-700 text-[7px] mb-1">
            Huamanga 419, Magdalena del Mar
          </p>
          <p className="font-pixel text-gray-500 text-[7px] mb-3">
            Límite con Pueblo Libre, Lima
          </p>
          <button
            onClick={handleOpenMaps}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-pixel text-[8px] py-3 rounded-lg hover:bg-blue-600 transition-colors active:scale-[0.98]"
          >
            <MapPin className="w-3 h-3" />
            CÓMO LLEGAR
          </button>
        </section>

        {/* Yape QR */}
        <section className="bg-gradient-to-r from-purple-600/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-300/30">
          <h2 className="font-pixel text-purple-600 text-[9px] mb-2 flex items-center gap-2">
            <Gift className="w-3 h-3" /> COLABORACIONES
          </h2>
          <p className="font-pixel text-gray-600 text-[7px] mb-3 italic">
            ¿Te sobra plata? Nosotros también queremos sobrar.
          </p>
          <button
            onClick={() => setShowQRModal(true)}
            className="mx-auto block"
          >
            <img
              src="/images/qr-yape.jpg"
              alt="QR Yape"
              className="w-32 h-32 object-contain bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
            />
          </button>
          <p className="font-pixel text-gray-500 text-[6px] text-center mt-2">
            Toca para ampliar
          </p>
        </section>

        {/* Guardar en calendario */}
        <button
          onClick={generateICSFile}
          className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-tumblr-purple/30 text-tumblr-purple font-pixel text-[8px] py-3 rounded-xl shadow-md hover:bg-white transition-colors active:scale-[0.98]"
        >
          <Calendar className="w-3 h-3" />
          GUARDAR EN MI CALENDARIO
        </button>

        {/* WhatsApp trollface button */}
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-pixel text-[8px] py-3 rounded-xl shadow-md hover:bg-[#1ebe57] transition-colors active:scale-[0.98]"
        >
          <span className="text-[12px]">💬</span>
          UNIRSE AL GRUPO DE WHATSAPP
        </button>

        {/* Compartir */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 bg-neon-fuchsia text-white font-pixel text-[8px] py-4 rounded-xl shadow-lg hover:bg-neon-fuchsia/90 transition-colors active:scale-[0.98]"
        >
          <Share2 className="w-3 h-3" />
          {copied ? 'LINK COPIADO!' : 'INVITAR A OTRO ALMA'}
        </button>
      </div>

      {/* Trollface Modal */}
      {showTrollface && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6"
          onClick={closeTrollface}
        >
          <div className="relative max-w-[300px] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeTrollface}
              className="absolute -top-3 -right-3 z-10 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src="/images/troll-face.jpg"
              alt="Trollface"
              className="w-full rounded-xl border-4 border-neon-fuchsia shadow-[0_0_20px_#FF00FF]"
            />
            <p className="font-pixel text-neon-fuchsia text-[8px] text-center mt-3">
              U MAD BRO?
            </p>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-6"
          onClick={() => setShowQRModal(false)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-[300px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-pixel text-gray-700 text-[10px]">Escanea con Yape</p>
              <button onClick={() => setShowQRModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src="/images/qr-yape.jpg"
              alt="QR Yape ampliado"
              className="w-full aspect-square object-contain"
            />
            <p className="font-pixel text-gray-500 text-[7px] text-center mt-3">
              Escanea y colabora con la causa
            </p>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <div className="w-full max-w-[360px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-pixel text-white text-[10px]">GALERÍA TEMÁTICA</p>
              <button onClick={() => setShowGallery(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/20 bg-black/40">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover pixel-art"
                  />
                </div>
              ))}
            </div>
            <p className="font-pixel text-neon-fuchsia text-[8px] text-center mt-4">
              2010s TUMBLR MEETS RAVE ELECTRO
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
