// GET /api/stats — % de votos (pregunta 1) y distribución del espectro (pregunta 2).
import { allowMethod, config } from './_lib/shared.js';
import { listRsvps } from './_lib/db.js';

const BUCKETS = 20;

export default async function handler(req, res) {
  if (!allowMethod(req, res, 'GET')) return;
  try {
    const rows = await listRsvps('voto,espectro');
    const ids = config.pregunta1.opciones.map((o) => o.id);
    const votos = Object.fromEntries(ids.map((id) => [id, 0]));
    const espectro = [];

    for (const r of rows) {
      if (r.voto in votos) votos[r.voto]++;
      const v = parseFloat(r.espectro);
      if (!isNaN(v)) espectro.push(v);
    }

    const total = rows.length;
    const porcentajes = Object.fromEntries(
      ids.map((id) => [id, total ? Math.round((votos[id] / total) * 1000) / 10 : 0])
    );
    const media = espectro.length
      ? Math.round((espectro.reduce((a, b) => a + b, 0) / espectro.length) * 10) / 10
      : 0;
    const sorted = [...espectro].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const mediana = sorted.length ? (sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2) : 0;
    const distribucion = Array(BUCKETS).fill(0);
    for (const v of espectro) distribucion[Math.min(Math.floor((v / 100) * BUCKETS), BUCKETS - 1)]++;

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.status(200).json({ total, votos, porcentajes, espectro: { media, mediana, distribucion } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
