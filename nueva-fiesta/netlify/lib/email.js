// Envío del email de confirmación (Resend). Usado por send-confirmation y resend-email.
const { Resend } = require('resend');
const { config, escapeHtml } = require('./shared');

function buildEmailHTML(nombre) {
  const e = config.evento;
  const info = config.info;
  const n = escapeHtml(nombre);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapsQuery)}`;
  const reglas = info.reglas
    .map((r, i) => `<p style="margin:0 0 8px;color:#333;font-size:14px;"><b>${i + 1}.</b> ${escapeHtml(r)}</p>`)
    .join('');
  const qr = info.yape.qrImagen
    ? `<div style="text-align:center;margin-top:12px;"><img src="${e.urlPublica}${info.yape.qrImagen}" width="160" height="160" alt="QR" /></div>`
    : '';
  const playlist = info.playlist.url
    ? `<a href="${info.playlist.url}" style="display:block;text-align:center;padding:12px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">Abrir playlist</a>`
    : '';

  const card = (title, body) =>
    `<div style="border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:12px;background:#fff;">
      <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:bold;">${title}</p>${body}</div>`;

  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:480px;margin:0 auto;padding:24px 16px;">
  ${card('Invitación confirmada', `<p style="margin:0;font-size:22px;font-weight:bold;color:#111;">¡Hola, ${n}!</p><p style="margin:6px 0 0;color:#555;">${escapeHtml(config.email.saludo)}</p>`)}
  ${card('Cuándo', `<p style="margin:0;font-size:28px;font-weight:bold;color:#111;">${escapeHtml(e.fechaCorta)}</p><p style="margin:4px 0 0;color:#555;">${escapeHtml(e.fechaLarga)}</p>`)}
  ${card('Dónde', `<p style="margin:0;font-weight:bold;color:#111;">${escapeHtml(e.direccion)}</p><p style="margin:4px 0 12px;color:#777;font-size:12px;">${escapeHtml(e.referencia)}</p><a href="${mapsUrl}" style="display:block;text-align:center;padding:12px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">Ver en Google Maps</a>`)}
  ${card('Reglas', reglas + `<p style="margin:8px 0 0;color:#333;font-size:14px;"><b>Dress code:</b> ${escapeHtml(info.dressCode)}</p>`)}
  ${playlist ? card(escapeHtml(info.playlist.nombre), playlist) : ''}
  ${qr ? card('Colaboraciones', `<p style="margin:0;color:#333;">${escapeHtml(info.yape.texto)}</p>${qr}`) : ''}
  <p style="text-align:center;color:#999;font-size:11px;">Recibiste este email porque confirmaste asistencia.</p>
</div></body></html>`;
}

async function sendConfirmation({ email, nombre }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const payload = {
    from: config.email.from,
    to: [email],
    subject: config.email.asunto,
    html: buildEmailHTML(nombre),
  };
  if (config.email.replyTo) payload.reply_to = config.email.replyTo;
  return resend.emails.send(payload);
}

module.exports = { sendConfirmation, buildEmailHTML };
