// Llamadas a las funciones de Vercel (carpeta api/).
import type { Answers } from '../types';

const postJSON = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });

export const fullName = (a: Pick<Answers, 'nombre' | 'apellido'>) =>
  `${a.nombre.trim()} ${a.apellido.trim()}`.trim();

export type RsvpResult = 'ok' | 'duplicate' | 'error';

// Guarda la confirmación y el servidor manda el email.
export async function submitRSVP(a: Answers): Promise<RsvpResult> {
  try {
    const res = await postJSON('/api/rsvp', {
      nombre: fullName(a),
      email: a.email.trim(),
      extra: a.extra,
      regalo: a.regalo,
      voto: a.voto,
      espectro: a.espectro,
    });
    if (res.status === 409) return 'duplicate';
    return res.ok ? 'ok' : 'error';
  } catch {
    return 'error';
  }
}

export const resendConfirmation = (email: string) => postJSON('/api/send-confirmation', { email });

// --- Admin ---
export const getSubmissions = (password: string) =>
  fetch('/api/admin/guests', { headers: { 'x-admin-password': password } });

export const adminResendEmail = (password: string, email: string, nombre: string) =>
  postJSON('/api/admin/resend-email', { email, nombre }, { 'x-admin-password': password });
