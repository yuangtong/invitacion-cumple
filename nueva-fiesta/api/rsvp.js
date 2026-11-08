// POST /api/rsvp — guarda la confirmación y manda el email. 409 si el email ya confirmó.
import { allowMethod, config, isEmail } from './_lib/shared.js';
import { insertRsvp } from './_lib/db.js';
import { sendConfirmation } from './_lib/email.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, 'POST')) return;
  const b = req.body || {};

  const nombre = String(b.nombre || '').trim().slice(0, 100);
  const email = String(b.email || '').trim().toLowerCase();
  const validVoto = config.pregunta1.opciones.some((o) => o.id === b.voto);
  const espectro = Number(b.espectro);

  if (nombre.length < 2 || !isEmail(email) || !validVoto || !(espectro >= 0 && espectro <= 100)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const { duplicate } = await insertRsvp({
      nombre,
      email,
      extra: String(b.extra || '').slice(0, 100),
      regalo: !!b.regalo,
      voto: b.voto,
      espectro,
    });
    if (duplicate) return res.status(409).json({ error: 'duplicate' });

    const { error } = await sendConfirmation({ email, nombre });
    if (error) console.error('Resend error:', error);

    res.status(200).json({ ok: true, emailSent: !error });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo guardar' });
  }
}
