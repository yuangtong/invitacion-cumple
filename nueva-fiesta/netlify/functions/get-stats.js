// Estadísticas públicas: % de votos (pregunta 1) y distribución del espectro (pregunta 2).
const { config, json, fetchSubmissions } = require('../lib/shared');

const BUCKETS = 20;

exports.handler = async () => {
  try {
    const submissions = await fetchSubmissions();
    const optionIds = config.pregunta1.opciones.map((o) => o.id);
    const votos = Object.fromEntries(optionIds.map((id) => [id, 0]));
    const espectro = [];

    for (const sub of submissions) {
      const d = sub.data || {};
      if (d.voto in votos) votos[d.voto]++;
      const v = parseFloat(d.espectro);
      if (!isNaN(v)) espectro.push(v);
    }

    const total = submissions.length;
    const porcentajes = Object.fromEntries(
      optionIds.map((id) => [id, total ? Math.round((votos[id] / total) * 1000) / 10 : 0])
    );

    const media = espectro.length
      ? Math.round((espectro.reduce((a, b) => a + b, 0) / espectro.length) * 10) / 10
      : 0;
    const sorted = [...espectro].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const mediana = sorted.length
      ? sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
      : 0;
    const distribucion = Array(BUCKETS).fill(0);
    for (const v of espectro) {
      distribucion[Math.min(Math.floor((v / 100) * BUCKETS), BUCKETS - 1)]++;
    }

    return json(
      200,
      { total, votos, porcentajes, espectro: { media, mediana, distribucion }, lastUpdated: new Date().toISOString() },
      { 'Cache-Control': 'public, max-age=30' }
    );
  } catch (err) {
    return json(500, { error: err.message });
  }
};
