// Lógica compartida por las funciones de Netlify.
const config = require('../../event.config.json');

const json = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...extraHeaders },
  body: JSON.stringify(body),
});

function parseBody(event) {
  try {
    return JSON.parse(event.body || '{}');
  } catch {
    return null;
  }
}

// Devuelve todas las respuestas del formulario (pagina de 100 en 100).
async function fetchSubmissions() {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  if (!token || !siteId) throw new Error('Missing env vars');

  const formName = config.netlifyFormName || 'rsvp';
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions?form_name=${formName}&per_page=100&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error(`Netlify API error: ${res.status}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

// Falla cerrado: si no hay ADMIN_PASSWORD configurado, nadie entra.
function isAdmin(event, bodyPassword) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const headers = event.headers || {};
  const given = bodyPassword || headers['x-admin-password'];
  return given === expected;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

module.exports = { config, json, parseBody, fetchSubmissions, isAdmin, escapeHtml, isEmail };
