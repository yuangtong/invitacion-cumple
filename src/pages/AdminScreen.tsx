import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Mail, Download, Users, BarChart2, Lock } from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'admin_pwd';

interface Guest {
  id: string;
  nombre: string;
  email: string;
  sexo: string;
  voto: string;
  espectro: string;
  submittedAt: string;
  emailStatus: string;
  emailSentAt: string | null;
}

interface Stats {
  total: number;
  sombrero: number;
  k: number;
  mediaEspectro: number;
}

function computeStats(guests: Guest[]): Stats {
  const sombrero = guests.filter((g) => g.voto === 'sombrero').length;
  const k = guests.filter((g) => g.voto === 'k').length;
  const espectroVals = guests.map((g) => parseFloat(g.espectro)).filter((v) => !isNaN(v));
  const mediaEspectro =
    espectroVals.length > 0
      ? Math.round((espectroVals.reduce((a, b) => a + b, 0) / espectroVals.length) * 10) / 10
      : 0;
  return { total: guests.length, sombrero, k, mediaEspectro };
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

function emailStatusBadge(status: string) {
  const map: Record<string, { label: string; color: string }> = {
    delivered: { label: 'Entregado', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    sent:      { label: 'Enviado',   color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    bounced:   { label: 'Rebotó',    color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    complained:{ label: 'Spam',      color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    unknown:   { label: 'Sin email', color: 'bg-white/10 text-white/40 border-white/10' },
  };
  const s = map[status] || map['unknown'];
  return (
    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${s.color}`}>
      {s.label}
    </span>
  );
}

export default function AdminScreen() {
  useEffect(() => {
    const root = document.getElementById('root');
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    if (root) root.style.overflow = 'auto';
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = '';
      if (root) root.style.overflow = '';
    };
  }, []);

  const [password, setPassword] = useState(() => sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '');
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const fetchGuests = useCallback(async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/.netlify/functions/get-submissions?password=${encodeURIComponent(pwd)}`
      );
      if (res.status === 401) {
        setError('Contraseña incorrecta.');
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setGuests(data.guests || []);
      setAuthed(true);
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, pwd);
    } catch {
      setError('Error al cargar datos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPassword(passwordInput);
    await fetchGuests(passwordInput);
  };

  useEffect(() => {
    if (password && !authed) fetchGuests(password);
  }, []);

  const handleResend = async (guest: Guest) => {
    setSendingId(guest.id);
    try {
      const res = await fetch('/.netlify/functions/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: guest.email, nombre: guest.nombre, password }),
      });
      if (res.ok) {
        setSentIds((prev) => new Set(prev).add(guest.id));
      }
    } finally {
      setSendingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Nombre', 'Email', 'Sexo', 'Voto', 'Espectro', 'Fecha', 'Email Status'];
    const rows = guests.map((g) => [
      g.nombre, g.email, g.sexo, g.voto, g.espectro,
      formatDate(g.submittedAt), g.emailStatus,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invitados-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = guests.filter(
    (g) =>
      g.nombre.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = computeStats(guests);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="w-full max-w-[360px]">
          <div className="text-center mb-8">
            <Lock className="w-8 h-8 text-neon-fuchsia mx-auto mb-3" />
            <h1 className="font-pixel text-neon-fuchsia text-[12px] mb-2">ADMIN</h1>
            <p className="font-pixel text-white/40 text-[7px]">Solo pa' quien sabe.</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Contraseña"
              className="pixel-input text-center"
              autoFocus
            />
            {error && <p className="font-pixel text-red-400 text-[7px] text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="pixel-btn bg-neon-fuchsia text-pixel-black"
              style={{ boxShadow: '4px 4px 0px #0A0A0A, 0 0 15px #FF00FF' }}
            >
              {loading ? 'VERIFICANDO...' : 'ENTRAR'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Header */}
      <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/95 backdrop-blur z-10">
        <div>
          <h1 className="font-pixel text-neon-fuchsia text-[11px]">ADMIN PANEL</h1>
          <p className="font-pixel text-white/40 text-[7px] mt-0.5">Lista de Alberth</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchGuests(password)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-pixel text-[7px]">REFRESCAR</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-electric-turquoise/10 border border-electric-turquoise/30 rounded-lg text-electric-turquoise hover:bg-electric-turquoise/20 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span className="font-pixel text-[7px]">CSV</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5 max-w-[900px] mx-auto">
        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Users className="w-4 h-4 text-neon-fuchsia mx-auto mb-2" />
            <p className="font-pixel text-neon-fuchsia text-[22px]">{stats.total}</p>
            <p className="font-pixel text-white/40 text-[7px] mt-1">TOTAL</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl mb-1">🎩</p>
            <p className="font-pixel text-green-400 text-[22px]">{stats.sombrero}</p>
            <p className="font-pixel text-white/40 text-[7px] mt-1">SOMBRERO</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl mb-1">🌽</p>
            <p className="font-pixel text-orange-400 text-[22px]">{stats.k}</p>
            <p className="font-pixel text-white/40 text-[7px] mt-1">K</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <BarChart2 className="w-4 h-4 text-electric-turquoise mx-auto mb-2" />
            <p className="font-pixel text-electric-turquoise text-[22px]">{stats.mediaEspectro}</p>
            <p className="font-pixel text-white/40 text-[7px] mt-1">MEDIA GAY</p>
          </div>
        </div>

        {/* Email status summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="font-pixel text-white/60 text-[8px] mb-3">ESTADO DE CORREOS</p>
          <div className="flex flex-wrap gap-3">
            {['delivered', 'sent', 'bounced', 'unknown'].map((status) => {
              const count = guests.filter((g) => g.emailStatus === status).length;
              return (
                <div key={status} className="flex items-center gap-2">
                  {emailStatusBadge(status)}
                  <span className="font-pixel text-white/60 text-[9px]">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="pixel-input"
        />

        {/* Guest table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3">NOMBRE</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3">EMAIL</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3 hidden sm:table-cell">SEXO</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3 hidden sm:table-cell">VOTO</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3 hidden md:table-cell">ESP.</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3 hidden md:table-cell">FECHA</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3">EMAIL</th>
                  <th className="font-pixel text-[7px] text-white/40 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="font-pixel text-white/30 text-[8px] text-center py-10">
                      {loading ? 'Cargando...' : 'Sin invitados todavía.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((guest) => (
                    <tr key={guest.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-pixel text-white text-[8px]">{guest.nombre || '—'}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-mono text-white/60 text-[9px] truncate max-w-[140px]">{guest.email || '—'}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="font-pixel text-white/50 text-[8px]">{guest.sexo || '—'}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`font-pixel text-[8px] ${guest.voto === 'sombrero' ? 'text-green-400' : guest.voto === 'k' ? 'text-orange-400' : 'text-white/30'}`}>
                          {guest.voto || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="font-pixel text-electric-turquoise text-[8px]">{guest.espectro || '—'}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="font-mono text-white/40 text-[8px]">{formatDate(guest.submittedAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        {emailStatusBadge(sentIds.has(guest.id) ? 'sent' : guest.emailStatus)}
                      </td>
                      <td className="px-4 py-3">
                        {guest.email && (
                          <button
                            onClick={() => handleResend(guest)}
                            disabled={sendingId === guest.id}
                            className="flex items-center gap-1 px-2 py-1.5 bg-neon-fuchsia/10 border border-neon-fuchsia/30 rounded text-neon-fuchsia hover:bg-neon-fuchsia/20 transition-colors disabled:opacity-40"
                          >
                            <Mail className={`w-3 h-3 ${sendingId === guest.id ? 'animate-pulse' : ''}`} />
                            <span className="font-pixel text-[6px]">
                              {sendingId === guest.id ? '...' : sentIds.has(guest.id) ? 'OK' : 'ENV.'}
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="font-pixel text-white/20 text-[6px] text-center pb-4">
          {filtered.length} de {guests.length} invitados · Admin Panel v1
        </p>
      </div>
    </div>
  );
}
