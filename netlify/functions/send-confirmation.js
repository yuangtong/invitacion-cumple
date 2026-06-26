const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Cumpleaños Yuen, Aiming & Mathi — El Trío de la Diversidad Sexual <no-reply@fommo.studio>';

function buildEmailHTML(nombre) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>¡Tu invitación está confirmada!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0A0A0A; font-family: 'Inter', sans-serif; color: #ffffff; }
    .wrapper { max-width: 480px; margin: 0 auto; padding: 32px 20px; }
    .header { text-align: center; margin-bottom: 32px; padding: 24px; background: linear-gradient(135deg, rgba(255,0,255,0.15), rgba(0,255,255,0.1)), #111; border-radius: 16px; border: 1px solid rgba(255,0,255,0.3); }
    .badge { display: inline-block; font-size: 10px; letter-spacing: 2px; color: #FF00FF; text-transform: uppercase; margin-bottom: 12px; }
    .title { font-size: 22px; font-weight: 700; line-height: 1.3; color: #ffffff; margin-bottom: 8px; }
    .subtitle { font-size: 13px; color: rgba(255,255,255,0.6); }
    .card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .card-title { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #00FFFF; margin-bottom: 12px; font-weight: 600; }
    .card-body { font-size: 13px; color: rgba(255,255,255,0.8); line-height: 1.7; }
    .card-body li { margin-bottom: 6px; }
    .card-body li span { color: #FF00FF; margin-right: 8px; font-weight: 600; }
    .highlight { color: #FF00FF; font-weight: 600; }
    .tag { display: inline-block; background: rgba(255,0,255,0.15); border: 1px solid rgba(255,0,255,0.3); color: #FF00FF; font-size: 11px; padding: 4px 10px; border-radius: 20px; margin: 3px; }
    .btn { display: block; text-align: center; padding: 14px 24px; border-radius: 10px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; margin-top: 8px; }
    .btn-green { background: #1DB954; color: #ffffff; }
    .btn-blue { background: #3B82F6; color: #ffffff; }
    .divider { height: 1px; background: rgba(255,255,255,0.08); margin: 8px 0; }
    .address-box { background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.2); border-radius: 8px; padding: 14px; margin-bottom: 12px; }
    .address-text { font-size: 14px; font-weight: 600; color: #00FFFF; }
    .address-sub { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 2px; }
    .date-box { text-align: center; padding: 16px; background: rgba(255,0,255,0.1); border-radius: 10px; margin-bottom: 16px; border: 1px solid rgba(255,0,255,0.25); }
    .date-day { font-size: 28px; font-weight: 700; color: #FF00FF; line-height: 1; }
    .date-meta { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; }
    .footer { text-align: center; padding: 24px 0 8px; font-size: 11px; color: rgba(255,255,255,0.3); line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="badge">✦ Invitación confirmada ✦</div>
      <div class="title">¡Hola, ${nombre}! 🎉</div>
      <div class="subtitle">Ya eres oficialmente parte de la lista de Alberth.</div>
    </div>

    <!-- Fecha -->
    <div class="date-box">
      <div class="date-day">27 JUN</div>
      <div class="date-meta">Sábado · 21:00 – 06:00 hrs</div>
    </div>

    <!-- Ubicación -->
    <div class="card">
      <div class="card-title">📍 Dónde es el despelote</div>
      <div class="address-box">
        <div class="address-text">Huamanga 419</div>
        <div class="address-sub">Magdalena del Mar, Lima · Límite con Pueblo Libre</div>
      </div>
      <a href="https://www.google.com/maps/search/?api=1&query=Huamanga+419+Magdalena+del+Mar+Lima+Peru" class="btn btn-blue">
        📌 Ver en Google Maps
      </a>
    </div>

    <!-- Reglas -->
    <div class="card">
      <div class="card-title">⚡ Reglas de la Casa</div>
      <div class="card-body">
        <ol style="padding-left: 0; list-style: none;">
          <li><span>1.</span>No se admiten envidiosos.</li>
          <li><span>2.</span>Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.</li>
          <li><span>3.</span>Dress code: Lo que te haga sentir menos feo.</li>
          <li><span>4.</span>Traer tu <span class="highlight">propio vaso</span> (ecología, amigues).</li>
          <li><span>5.</span>Regalo obligatorio — ya lo marcaste, no hay vuelta atrás.</li>
          <li><span>6.</span>Fumar <span class="highlight">ÚNICAMENTE en el patio</span>.</li>
          <li><span>7.</span>Usar el baño respectivo para chicas y chicos.</li>
          <li><span>8.</span>No vomitar ni derramar nada en el suelo.</li>
          <li><span>9.</span>Si se hace, avisar y trapear por su cuenta.</li>
        </ol>
      </div>
    </div>

    <!-- Vibe -->
    <div class="card">
      <div class="card-title">✨ El Vibe</div>
      <div class="card-body">
        <p style="margin-bottom: 12px;">2010s Tumblr meets Rave Electro. Brillos, neones, pixel art, y todo lo que tu adolescente interior siempre quiso.</p>
        <div>
          <span class="tag">#Tumblr2010s</span>
          <span class="tag">#NeonRave</span>
          <span class="tag">#PixelArt</span>
          <span class="tag">#BlackberryDeAdorno</span>
        </div>
        <p style="margin-top: 12px; font-size: 12px; color: rgba(255,255,255,0.5); font-style: italic;">Bonus points si traes un Blackberry de adorno. 📱</p>
      </div>
    </div>

    <!-- Playlist -->
    <div class="card">
      <div class="card-title">🎵 Playlist Oficial</div>
      <div class="card-body">
        <p style="margin-bottom: 12px; font-style: italic; color: rgba(255,255,255,0.5);">"cum aimi, yuen y mathi"</p>
        <a href="https://open.spotify.com/playlist/2Fkh1Kl1xey64GywP3T5ky?si=xYVcbYsBSaeojN6lq8DvTw" class="btn btn-green">
          🎵 Abrir en Spotify
        </a>
      </div>
    </div>

    <!-- Colaboraciones -->
    <div class="card">
      <div class="card-title">💸 Colaboraciones</div>
      <div class="card-body">
        <p>¿Te sobra plata? Nosotros también queremos sobrar.</p>
        <p style="margin-top: 8px; font-size: 12px; color: rgba(255,255,255,0.5);">Yape disponible en la fiesta — QR en la invitación.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Este email fue enviado porque confirmaste asistencia.</p>
      <p style="margin-top: 4px;">El Trío de la Diversidad Sexual · Lima, Perú · 2026</p>
      <p style="margin-top: 8px; color: rgba(255,255,255,0.15);">no-reply@fommo.studio</p>
    </div>

  </div>
</body>
</html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, nombre } = body;

  if (!email || !nombre) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing email or nombre' }) };
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: '¡Confirmado! Datos de la fiesta 🎉 — El Trío de la Diversidad Sexual',
    html: buildEmailHTML(nombre),
  });

  if (error) {
    console.error('Resend error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: data.id }),
  };
};
