import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Calendar, MapPin, Music, Share2, Gift, ExternalLink, X } from 'lucide-react';

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

export function InfoScreen() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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
      // Fallback
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
          <h1 className="font-pixel text-tumblr-purple text-[12px] mb-1">
            DATOS DE LA FIESTA
          </h1>
          <p className="font-inter text-gray-600 text-[11px]">
            Sábado 27 de junio, 2026 · 21:00 - 06:00
          </p>
        </div>

        {/* Reglas de la Casa */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-tumblr-purple text-[10px] mb-3 flex items-center gap-2">
            <span className="text-neon-fuchsia">★</span> REGLAS DE LA CASA
          </h2>
          <ol className="font-inter text-gray-700 text-[12px] space-y-2">
            <li className="flex gap-2">
              <span className="font-pixel text-neon-fuchsia text-[9px] mt-0.5">1.</span>
              No se admiten envidiosos.
            </li>
            <li className="flex gap-2">
              <span className="font-pixel text-neon-fuchsia text-[9px] mt-0.5">2.</span>
              Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.
            </li>
            <li className="flex gap-2">
              <span className="font-pixel text-neon-fuchsia text-[9px] mt-0.5">3.</span>
              Dress code: Lo que te haga sentir menos feo.
            </li>
            <li className="flex gap-2">
              <span className="font-pixel text-neon-fuchsia text-[9px] mt-0.5">4.</span>
              Traer tu propio vaso (ecología, amigues).
            </li>
            <li className="flex gap-2">
              <span className="font-pixel text-neon-fuchsia text-[9px] mt-0.5">5.</span>
              Regalo obligatorio (ya lo marcaste, no hay vuelta atrás).
            </li>
          </ol>
        </section>

        {/* Temática */}
        <section className="bg-gradient-to-r from-neon-fuchsia/10 to-electric-turquoise/10 backdrop-blur-sm rounded-xl p-4 border border-neon-fuchsia/20">
          <h2 className="font-pixel text-neon-fuchsia text-[10px] mb-2">
            VIBE
          </h2>
          <p className="font-inter text-gray-700 text-[12px] leading-relaxed">
            2010s Tumblr meets Rave Electro. Brillos, neones, pixel art, y todo lo que tu adolescente interior siempre quiso.
          </p>
          <p className="font-inter text-tumblr-purple text-[11px] mt-2 italic">
            Bonus points si traes un Blackberry de adorno.
          </p>
        </section>

        {/* Música / Spotify */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-green-600 text-[10px] mb-3 flex items-center gap-2">
            <Music className="w-3 h-3" /> PLAYLIST OFICIAL
          </h2>
          <div className="bg-black/5 rounded-lg p-3 mb-3">
            <p className="font-inter text-gray-600 text-[11px]">
              "cum aimi, yuen y mathi"
            </p>
          </div>
          <button
            onClick={handleOpenPlaylist}
            className="w-full flex items-center justify-center gap-2 bg-[#1DB954] text-white font-inter text-[12px] font-semibold py-3 rounded-lg hover:bg-[#1ed760] transition-colors active:scale-[0.98]"
          >
            <ExternalLink className="w-4 h-4" />
            ABRIR PLAYLIST
          </button>
        </section>

        {/* Ubicación */}
        <section className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="font-pixel text-red-500 text-[10px] mb-3 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> UBICACIÓN
          </h2>
          <div className="rounded-lg overflow-hidden mb-3 border border-gray-200">
            <img
              src="/images/map-static.jpg"
              alt="Mapa de ubicación"
              className="w-full h-[150px] object-cover"
            />
          </div>
          <p className="font-inter text-gray-700 text-[12px] mb-1">
            Huamanga 419, Magdalena del Mar
          </p>
          <p className="font-inter text-gray-500 text-[11px] mb-3">
            Límite con Pueblo Libre, Lima
          </p>
          <button
            onClick={handleOpenMaps}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-inter text-[12px] font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors active:scale-[0.98]"
          >
            <MapPin className="w-4 h-4" />
            CÓMO LLEGAR
          </button>
        </section>

        {/* Yape QR */}
        <section className="bg-gradient-to-r from-purple-600/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-300/30">
          <h2 className="font-pixel text-purple-600 text-[10px] mb-2 flex items-center gap-2">
            <Gift className="w-3 h-3" /> COLABORACIONES
          </h2>
          <p className="font-inter text-gray-600 text-[11px] mb-3 italic">
            ¿Te sobra plata? Nosotros también queremos sobrar.
          </p>
          <button
            onClick={() => setShowQRModal(true)}
            className="mx-auto block"
          >
            <img
              src="/images/qr-yape.png"
              alt="QR Yape"
              className="w-32 h-32 object-contain bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
            />
          </button>
          <p className="font-inter text-gray-500 text-[10px] text-center mt-2">
            Toca para ampliar
          </p>
        </section>

        {/* Guardar en calendario */}
        <button
          onClick={generateICSFile}
          className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-tumblr-purple/30 text-tumblr-purple font-inter text-[12px] font-semibold py-3 rounded-xl shadow-md hover:bg-white transition-colors active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4" />
          GUARDAR EN MI CALENDARIO
        </button>

        {/* Compartir */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 bg-neon-fuchsia text-white font-pixel text-[9px] py-4 rounded-xl shadow-lg hover:bg-neon-fuchsia/90 transition-colors active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4" />
          {copied ? 'LINK COPIADO!' : 'INVITAR A OTRO ALMA'}
        </button>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-6"
          onClick={() => setShowQRModal(false)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-[300px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-inter text-gray-700 text-[13px] font-semibold">Escanea con Yape</p>
              <button onClick={() => setShowQRModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src="/images/qr-yape.png"
              alt="QR Yape ampliado"
              className="w-full aspect-square object-contain"
            />
            <p className="font-inter text-gray-500 text-[11px] text-center mt-3">
              Escanea y colabora con la causa
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
