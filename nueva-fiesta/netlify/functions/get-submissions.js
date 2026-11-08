// Lista de invitados para el panel /admin (requiere contraseña en header x-admin-password).
const { json, fetchSubmissions, isAdmin } = require('../lib/shared');

async function fetchEmailStatuses() {
  if (!process.env.RESEND_API_KEY) return [];
  try {
    const res = await fetch('https://api.resend.com/emails?limit=100', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((e) => ({
      to: (e.to?.[0] || '').toLowerCase(),
      status: e.last_event,
      sentAt: e.created_at,
    }));
  } catch {
    return [];
  }
}

exports.handler = async (event) => {
  if (!isAdmin(event)) return json(401, { error: 'Unauthorized' });

  try {
    const [submissions, emails] = await Promise.all([fetchSubmissions(), fetchEmailStatuses()]);
    const guests = submissions.map((sub) => {
      const d = sub.data || {};
      const record = emails.find((e) => e.to === (d.email || '').toLowerCase());
      return {
        id: sub.id,
        nombre: d.nombre || '',
        email: d.email || '',
        extra: d.extra || '',
        voto: d.voto || '',
        espectro: d.espectro || '',
        regalo: d.regalo || '',
        submittedAt: sub.created_at,
        emailStatus: record ? record.status : 'unknown',
        emailSentAt: record ? record.sentAt : null,
      };
    });
    return json(200, { guests, total: guests.length });
  } catch (err) {
    return json(500, { error: err.message });
  }
};
