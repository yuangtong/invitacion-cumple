// Revisa si un email ya confirmó. Si algo falla, deja pasar (duplicate: false).
const { json, parseBody, fetchSubmissions, isEmail } = require('../lib/shared');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method Not Allowed' });
  const body = parseBody(event);
  if (!body || !isEmail(body.email)) return json(400, { error: 'Invalid email' });

  try {
    const target = body.email.trim().toLowerCase();
    const submissions = await fetchSubmissions();
    const duplicate = submissions.some(
      (s) => (s.data?.email || '').trim().toLowerCase() === target
    );
    return json(200, { duplicate });
  } catch {
    return json(200, { duplicate: false });
  }
};
