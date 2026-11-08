# Nueva fiesta — invitación

Misma mecánica que la invitación del trío (carpeta raíz), con diseño provisional (wireframe) para iterar.

## Flujo
Loader → Bienvenida → Pregunta 1 (voto A/B + resultados reales) → Pregunta 2 (slider 0–100 + distribución real)
→ Formulario (valida, revisa email duplicado, guarda en Netlify Forms, manda email) → Celebración (confetti)
→ Resultados acumulados → Datos de la fiesta (mapa, reglas, playlist, QR, calendario .ics, reenviar email,
compartir por WhatsApp con easter egg opcional, copiar link).

`/admin`: contraseña, stats, tabla de invitados, búsqueda, reenviar email, exportar CSV.

## Dónde se edita
- **Textos y datos del evento:** `event.config.json` (front y email lo leen de aquí).
- **Imágenes / audio:** `public/images/`, `public/audio/` (`track.mp3` + `sfx-tap|success|error.mp3`).
- **Diseño:** `src/index.css` (clases `.screen`, `.btn`, `.card`, …) y cada pantalla en `src/screens/`.

## Funciones (Netlify)
`get-stats`, `check-email`, `send-confirmation`, `resend-email`, `get-submissions` (lógica común en `netlify/lib/`).
Variables: ver `.env.example`.

## Deploy
Nuevo sitio en Netlify con **Base directory = `nueva-fiesta`**. Si cambias `netlifyFormName`, cámbialo también en `index.html`.

```bash
npm install
npm run dev        # solo front
npx netlify dev    # front + funciones
```
