// Llamadas a las funciones de Netlify y a Netlify Forms.
import { config } from '../config';
import type { Answers } from '../types';

const fn = (name: string) => `/.netlify/functions/${name}`;

const postJSON = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });

export const fullName = (a: Pick<Answers, 'nombre' | 'apellido'>) =>
  `${a.nombre.trim()} ${a.apellido.trim()}`.trim();

export async function isDuplicateEmail(email: string): Promise<boolean> {
  try {
    const res = await postJSON(fn('check-email'), { email: email.trim() });
    const data = await res.json();
    return !!data.duplicate;
  } catch {
    return false; // si falla el check, dejamos pasar
  }
}

// Envía la respuesta a Netlify Forms (formulario oculto en index.html).
export function submitRSVP(a: Answers) {
  const body = new URLSearchParams({
    'form-name': config.netlifyFormName,
    nombre: fullName(a),
    email: a.email.trim(),
    extra: a.extra,
    regalo: a.regalo ? 'on' : '',
    voto: a.voto ?? '',
    espectro: String(a.espectro),
  });
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
}

export const sendConfirmation = (email: string, nombre: string) =>
  postJSON(fn('send-confirmation'), { email, nombre });

// --- Admin ---
export const getSubmissions = (password: string) =>
  fetch(fn('get-submissions'), { headers: { 'x-admin-password': password } });

export const adminResendEmail = (password: string, email: string, nombre: string) =>
  postJSON(fn('resend-email'), { email, nombre, password });
