# CHANGELOG — Invitación Cumpleaños Yuen, Aiming & Mathi

**Versión base:** PRD v1.0 (25 de junio de 2026)  
**Autor:** yuangtong  

---

## v0.1 — 25–26 de junio de 2026

### 1. Fondo arcade unificado en pantallas de preguntas
**Archivos:** `VoteScreen.tsx`, `SpectrumScreen.tsx`, `FormScreen.tsx`  
**Cambio:** Se reemplazaron los fondos individuales de cada pantalla de preguntas (`bg-gradient-rave` en Q1, gradiente lineal púrpura-fucsia-turquesa en Q2, negro plano en Q3) por un fondo unificado: negro obsidiana (`#0A0A0A`) con luces neon radiales que imitan los spotlights de una máquina arcade (fucsia, cian, púrpura).  
**Contraste con PRD:** El PRD describía "colores saturados" y "fondo caótico" sin especificar exactamente el mismo fondo en todas las pantallas de preguntas. Este cambio estandariza la experiencia visual del interrogatorio como una sala de arcade única y coherente.

---

### 2. Datos reales desde Netlify Functions
**Archivos:** `netlify/functions/get-stats.js` (nuevo), `src/hooks/useNetlifyStats.ts` (nuevo), `netlify.toml` (nuevo), `src/App.tsx`  
**Cambio:** Se implementó la Netlify Function `get-stats` que consulta la API de Netlify Forms, calcula estadísticas reales (total de respuestas, porcentajes de votación, media/mediana/distribución del espectro) y las expone al frontend. Se creó el hook `useNetlifyStats` que reemplaza los valores fijos (`MOCK_VOTE_STATS`, `MOCK_SPECTRUM_STATS`) con datos en tiempo real. En desarrollo, si la función falla, se usa un fallback con valores neutros (50/50). El caché es de 30 segundos.  
**Contraste con PRD:** El PRD especificaba explícitamente Netlify Functions con el endpoint `GET /.netlify/functions/get-stats` y datos reales para las preguntas 1 y 2. Esta implementación cumple exactamente con esa especificación.  
**Variables requeridas en Netlify:** `NETLIFY_API_TOKEN`, `NETLIFY_SITE_ID`.

---

### 3. Slider del espectro con snap y stickers de personajes
**Archivo:** `SpectrumScreen.tsx`  
**Cambio:** El slider pasó de continuo (0–100) a snap en múltiplos de 20 (`step={20}`). Se añadió una fila de 5 personajes encima del slider como guía visual: Menta y Lola (20), Choco (40), Adolfo (60), Majo (80), Alberch (100). El personaje correspondiente al valor actual se resalta con borde fucsia y glow neon; los demás aparecen atenuados. Las zonas de texto también se actualizaron a etiquetas específicas por personaje.  
**Contraste con PRD:** El PRD describía el slider como continuo con un "thumb pixelado". Este cambio lo hace discreto (6 posiciones) para darle más personalidad y humor con los personajes reales del grupo.

---

### 4. Campo email en el formulario
**Archivos:** `FormScreen.tsx`, `src/types/index.ts`, `index.html`  
**Cambio:** Se añadió el campo `email` (tipo email, obligatorio, con validación de formato) al formulario de invitado. El placeholder es "Te mandaremos las fotos de la fiesta por acá". Se incluyó en la validación, en el submit a Netlify Forms y en el formulario hidden de `index.html`.  
**Contraste con PRD:** El PRD no incluía explícitamente el campo email en el formulario (solo nombre, sexo, regalo). Se añade a solicitud del cliente para comunicación post-evento (envío de fotos).

---

### 5. Disclaimer satírico en resultados de votación
**Archivos:** `VoteScreen.tsx`, `FormScreen.tsx`  
**Cambio:** Se añadió un aviso en itálica debajo del título "RESULTADOS PARCIALES" (Q1) y "VOTACIÓN ELECCIONES" (resultados finales): *"Estas preguntas son netamente satíricas pa' divertirnos. ¡No peleas! Quien se pelea entrega el chiquito a Alberth — y él no perdona."*  
**Contraste con PRD:** El PRD ya indicaba que el contenido político era "puramente burlesco y satírico" (Sección 3.2), pero no especificaba un disclaimer visible en la UI. Se añade para evitar malentendidos entre invitados.

---

### 6. Botón "Unirse al grupo de WhatsApp" con popup Trollface
**Archivo:** `InfoScreen.tsx`  
**Cambio:** Se añadió un botón verde (#25D366) con el texto "UNIRSE AL GRUPO DE WHATSAPP" debajo del botón de calendario. Al tocarlo, aparece un modal con la imagen `troll-face.jpg` y se reproduce `troll-face.mp3`. El modal se cierra al tocar fuera o en el botón X.  
**Contraste con PRD:** El PRD mencionaba WhatsApp como "pendiente de confirmar" (Sección 8). En lugar de ser un link real a un grupo, se implementó como un gag de trollface coherente con el tono burlesco del proyecto.

---

### 7. Galería temática actualizada
**Archivo:** `InfoScreen.tsx`  
**Cambio:** Se reemplazaron las 4 imágenes placeholder de la galería (iconos pixel art) por las 8 imágenes temáticas reales (`tematica-1.jpeg` a `tematica-8.jpg`) disponibles en `public/images/`.  
**Contraste con PRD:** El PRD describía una "galería temática" con imágenes 2010s. Las imágenes reales ya estaban en el repositorio y no se estaban usando.

---

### 8. Fix QR Yape (.png → .jpg)
**Archivo:** `InfoScreen.tsx`  
**Cambio:** Se corrigieron las referencias a `/images/qr-yape.png` (archivo inexistente) por `/images/qr-yape.jpg` (archivo real disponible). Afecta tanto al thumbnail visible como al modal ampliado.  
**Contraste con PRD:** Bug de implementación — el PRD especificaba el QR de Yape como imagen estática, pero la referencia al archivo era incorrecta.

---

### 9. Infraestructura Netlify
**Archivos:** `netlify.toml` (nuevo), `.nvmrc` (nuevo)  
**Cambio:** Se creó `netlify.toml` con configuración de build (`npm run build`), carpeta de publicación (`dist`), directorio de functions (`netlify/functions`) y redirect SPA. Se creó `.nvmrc` con `20` para anclar la versión de Node.js y evitar el bug de npm en Node 22.  
**Contraste con PRD:** El PRD especificaba Netlify como plataforma de hosting. Esta infraestructura es necesaria para que el deploy funcione correctamente.

---

*Próximos cambios planificados: panel `/admin`, integración real de WhatsApp, optimización de audio.*
