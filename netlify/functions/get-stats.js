exports.handler = async () => {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing env vars' }),
    };
  }

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions?form_name=rsvp&per_page=100`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      throw new Error(`Netlify API error: ${res.status}`);
    }

    const submissions = await res.json();

    let sombrero = 0;
    let k = 0;
    const espectroValues = [];

    for (const sub of submissions) {
      const data = sub.data || {};
      if (data.voto === 'sombrero') sombrero++;
      else if (data.voto === 'k') k++;
      const espVal = parseFloat(data.espectro);
      if (!isNaN(espVal)) espectroValues.push(espVal);
    }

    const total = submissions.length;
    const porcentajeSombrero = total > 0 ? Math.round((sombrero / total) * 1000) / 10 : 0;
    const porcentajeK = total > 0 ? Math.round((k / total) * 1000) / 10 : 0;

    const media =
      espectroValues.length > 0
        ? Math.round((espectroValues.reduce((a, b) => a + b, 0) / espectroValues.length) * 10) / 10
        : 0;

    const sorted = [...espectroValues].sort((a, b) => a - b);
    const mediana =
      sorted.length > 0
        ? sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)]
        : 0;

    const buckets = 20;
    const distribucion = Array(buckets).fill(0);
    for (const v of espectroValues) {
      const idx = Math.min(Math.floor((v / 100) * buckets), buckets - 1);
      distribucion[idx]++;
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
      },
      body: JSON.stringify({
        totalResponses: total,
        votos: { sombrero, k, porcentajeSombrero, porcentajeK },
        espectro: { media, mediana, distribucion },
        lastUpdated: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
