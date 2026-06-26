const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const adminPassword = process.env.ADMIN_PASSWORD;

const FROM = 'Cumpleaños Yuen, Aiming & Mathi — El Trío de la Diversidad Sexual <hola@fommo.studio>';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, nombre, password } = body;

  if (adminPassword && password !== adminPassword) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  if (!email || !nombre) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing email or nombre' }) };
  }

  // Reuse same HTML builder from send-confirmation
  const html = buildEmailHTML(nombre);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: '¡Confirmado! Datos de la fiesta 🎉 — El Trío de la Diversidad Sexual',
    html,
  });

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: data.id }),
  };
};

function buildEmailHTML(nombre) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>¡Tu invitación está confirmada!</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #111118 !important; font-family: Arial, Helvetica, sans-serif; }
    .outer { background-color: #111118; padding: 24px 0; }
    .wrapper { max-width: 480px; margin: 0 auto; padding: 0 16px; background-color: #111118; }
    .header { text-align: center; margin-bottom: 20px; padding: 28px 24px; background-color: #1a0a2e; border-radius: 16px; border: 2px solid #FF00FF; }
    .badge { display: inline-block; font-size: 10px; letter-spacing: 2px; color: #FF00FF; text-transform: uppercase; margin-bottom: 10px; font-weight: bold; }
    .title { font-size: 22px; font-weight: 700; line-height: 1.3; color: #ffffff; margin-bottom: 6px; }
    .subtitle { font-size: 13px; color: #b0a0c0; }
    .date-box { text-align: center; padding: 18px; background-color: #2a0a3a; border-radius: 12px; margin-bottom: 16px; border: 2px solid #FF00FF; }
    .date-day { font-size: 32px; font-weight: 700; color: #FF00FF; line-height: 1; }
    .date-meta { font-size: 13px; color: #c0a8d8; margin-top: 4px; }
    .card { background-color: #1a1a2e; border: 1px solid #2a2a4a; border-radius: 12px; padding: 20px; margin-bottom: 14px; }
    .card-title { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #00DDCC; margin-bottom: 14px; font-weight: 700; }
    .card-body { font-size: 14px; color: #d0c8e0; line-height: 1.8; }
    .rule-item { display: block; margin-bottom: 8px; color: #d0c8e0; font-size: 13px; }
    .rule-num { color: #FF00FF; font-weight: 700; margin-right: 8px; }
    .highlight { color: #FF66CC; font-weight: 700; }
    .address-box { background-color: #0a1a2e; border: 1px solid #004466; border-radius: 8px; padding: 14px; margin-bottom: 14px; }
    .address-text { font-size: 15px; font-weight: 700; color: #00DDCC; }
    .address-sub { font-size: 12px; color: #8899aa; margin-top: 3px; }
    .btn { display: block; text-align: center; padding: 14px 24px; border-radius: 10px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; margin-top: 10px; }
    .btn-green { background-color: #1DB954; color: #ffffff !important; }
    .btn-blue { background-color: #2563EB; color: #ffffff !important; }
    .tag { display: inline-block; background-color: #3a0a4a; border: 1px solid #FF00FF; color: #FF88DD; font-size: 11px; padding: 4px 10px; border-radius: 20px; margin: 3px; }
    .footer { text-align: center; padding: 24px 0 8px; font-size: 11px; color: #555566; line-height: 1.8; }
  </style>
</head>
<body>
  <div class="outer">
  <div class="wrapper">
    <div class="header">
      <div class="badge">✦ Invitación confirmada ✦</div>
      <div class="title">¡Hola, ${nombre}! 🎉</div>
      <div class="subtitle">Ya eres oficialmente parte de la lista de Alberth.</div>
    </div>
    <div class="date-box">
      <div class="date-day">27 JUN</div>
      <div class="date-meta">Sábado · 21:00 – 06:00 hrs</div>
    </div>
    <div class="card">
      <div class="card-title">📍 Dónde es el despelote</div>
      <div class="address-box">
        <div class="address-text">Huamanga 419</div>
        <div class="address-sub">Magdalena del Mar, Lima · Límite con Pueblo Libre</div>
      </div>
      <a href="https://www.google.com/maps/search/?api=1&query=Huamanga+419+Magdalena+del+Mar+Lima+Peru" class="btn btn-blue">📌 Ver en Google Maps</a>
    </div>
    <div class="card">
      <div class="card-title">⚡ Reglas de la Casa</div>
      <div class="card-body">
        <span class="rule-item"><span class="rule-num">1.</span>No se admiten envidiosos.</span>
          <span class="rule-item"><span class="rule-num">2.</span>Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.</span>
          <span class="rule-item"><span class="rule-num">3.</span>Dress code: <span class="highlight">2010s Tumblr meets Rave Electro</span> — brillos, neones, todo lo que tu adolescente interior siempre quiso.</span>
          <span class="rule-item"><span class="rule-num">4.</span>Traer tu <span class="highlight">papel higiénico</span> (en serio, no es broma).</span>
          <span class="rule-item"><span class="rule-num">5.</span>Regalo obligatorio — ya lo marcaste, no hay vuelta atrás.</span>
          <span class="rule-item"><span class="rule-num">6.</span>Fumar <span class="highlight">ÚNICAMENTE en el patio</span>.</span>
          <span class="rule-item"><span class="rule-num">7.</span>Usar el baño respectivo para chicas y chicos.</span>
          <span class="rule-item"><span class="rule-num">8.</span>No vomitar ni derramar nada en el suelo.</span>
          <span class="rule-item"><span class="rule-num">9.</span>Si se hace, avisar y trapear por su cuenta.</span>
      </div>
    </div>
    <div class="card">
      <div class="card-title">✨ El Vibe</div>
      <div class="card-body">
        <p style="margin-bottom: 12px;">2010s Tumblr meets Rave Electro. Brillos, neones, pixel art.</p>
        <div><span class="tag">#Tumblr2010s</span><span class="tag">#NeonRave</span><span class="tag">#PixelArt</span></div>
        <p style="margin-top: 12px; font-size: 12px; color: #8877aa; font-style: italic;">Bonus points si traes un Blackberry de adorno. 📱</p>
      </div>
    </div>
    <div class="card">
      <div class="card-title">🎵 Playlist Oficial</div>
      <div class="card-body">
        <p style="margin-bottom: 12px; font-style: italic; color: #8877aa;">"cum aimi, yuen y mathi"</p>
        <a href="https://open.spotify.com/playlist/2Fkh1Kl1xey64GywP3T5ky?si=xYVcbYsBSaeojN6lq8DvTw" class="btn btn-green">🎵 Abrir en Spotify</a>
      </div>
    </div>
    <div class="card">
      <div class="card-title">💸 Colaboraciones</div>
      <div class="card-body">
        <p style="margin-bottom: 14px;">¿Te sobra plata? Nosotros también queremos sobrar.</p>
        <div style="text-align: center;">
          <img src="https://invitacion-secreta.netlify.app/images/qr-yape.jpg" alt="QR Yape" width="160" height="160" style="border-radius: 12px; background: #ffffff; padding: 8px; display: inline-block;" />
          <p style="margin-top: 8px; font-size: 11px; color: #776688;">Escanea con Yape</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Este email fue enviado porque confirmaste asistencia.</p>
      <p style="margin-top: 4px;">El Trío de la Diversidad Sexual · Lima, Perú · 2026</p>
      <p style="margin-top: 8px; color: #444455;">hola@fommo.studio</p>
    </div>
  </div>
  </div>
</body>
</html>`;
}
