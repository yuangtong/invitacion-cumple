// Reenvío del email desde el panel /admin (requiere contraseña).
const { json, parseBody, isAdmin, isEmail } = require('../lib/shared');
const { sendConfirmation } = require('../lib/email');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method Not Allowed' });
  const body = parseBody(event);
  if (!body) return json(400, { error: 'Invalid JSON' });
  if (!isAdmin(event, body.password)) return json(401, { error: 'Unauthorized' });
  if (!isEmail(body.email) || !body.nombre) return json(400, { error: 'Missing email or nombre' });

  const { data, error } = await sendConfirmation({ email: body.email.trim(), nombre: body.nombre });
  if (error) return json(500, { error: error.message });
  return json(200, { id: data.id });
};
