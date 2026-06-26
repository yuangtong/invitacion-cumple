exports.handler = async (event) => {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Simple auth via query param
  const params = new URLSearchParams(event.rawQuery || '');
  const password = params.get('password') || (event.headers && event.headers['x-admin-password']);

  if (adminPassword && password !== adminPassword) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  if (!token || !siteId) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing env vars' }) };
  }

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions?form_name=rsvp&per_page=100`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const submissions = await res.json();

    // Also fetch Resend emails to check send status
    let emailsSent = [];
    try {
      const resendRes = await fetch('https://api.resend.com/emails?limit=100', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });
      if (resendRes.ok) {
        const resendData = await resendRes.json();
        emailsSent = (resendData.data || []).map((e) => ({
          to: e.to?.[0] || '',
          status: e.last_event,
          sentAt: e.created_at,
        }));
      }
    } catch {
      // Resend check is optional
    }

    const guests = submissions.map((sub) => {
      const d = sub.data || {};
      const emailRecord = emailsSent.find(
        (e) => e.to.toLowerCase() === (d.email || '').toLowerCase()
      );
      return {
        id: sub.id,
        nombre: d.nombre || '',
        email: d.email || '',
        sexo: d.sexo || '',
        voto: d.voto || '',
        espectro: d.espectro || '',
        regalo: d.regalo || '',
        submittedAt: sub.created_at,
        emailStatus: emailRecord ? emailRecord.status : 'unknown',
        emailSentAt: emailRecord ? emailRecord.sentAt : null,
      };
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guests, total: guests.length }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
