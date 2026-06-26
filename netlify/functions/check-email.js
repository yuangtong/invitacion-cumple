exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email } = body;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };
  }

  if (!token || !siteId) {
    return {
      statusCode: 200,
      body: JSON.stringify({ duplicate: false }),
    };
  }

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions?form_name=rsvp&per_page=100`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const submissions = await res.json();
    const emailLower = email.trim().toLowerCase();
    const duplicate = submissions.some(
      (sub) => (sub.data?.email || '').trim().toLowerCase() === emailLower
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duplicate }),
    };
  } catch {
    return {
      statusCode: 200,
      body: JSON.stringify({ duplicate: false }),
    };
  }
};
