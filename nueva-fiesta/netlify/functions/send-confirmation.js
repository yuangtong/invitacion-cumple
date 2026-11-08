// Envía el email de confirmación después de enviar el formulario.
const { json, parseBody, isEmail } = require('../lib/shared');
const { sendConfirmation } = require('../lib/email');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method Not Allowed' });
  const body = parseBody(event);
  if (!body || !isEmail(body.email) || !body.nombre) {
    return json(400, { error: 'Missing email or nombre' });
  }

  const { data, error } = await sendConfirmation({
    email: body.email.trim(),
    nombre: String(body.nombre).slice(0, 100),
  });
  if (error) {
    console.error('Resend error:', error);
    return json(500, { error: error.message });
  }
  return json(200, { id: data.id });
};
