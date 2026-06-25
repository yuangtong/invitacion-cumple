# PRD: Landing Invitación — Cumpleaños Yuen, Aiming & Mathi
## "El Trío de la Diversidad Sexual" | Fiesta 27 de Junio

---

## 1. Resumen Ejecutivo

**Tipo de proyecto:** Landing page interactiva, caricaturesca, burlesca y satírica.  
**Propósito:** Invitación digital a fiesta de cumpleaños con experiencia gamificada.  
**Plataforma:** Web mobile-first (optimizada para dispositivos móviles).  
**Tone & Manner:** Sarcástico, carismático, irreverente, con heavy nostalgia 2010s (Tumblr, Retrica, pixel art, art pop, rave-electro).  
**Fecha del evento:** Sábado 27 de junio de 2026, 21:00 – 06:00 (domingo 28).  
**Lugar:** Huamanga 419, Magdalena del Mar (límite con Pueblo Libre), Lima, Perú.

**Celebrantes:**
- **Yuen** — 25 años ("mellizo" por lore)
- **Aiming** — 22 años ("melliza" por lore)
- **Mathi** — 21 años (novio de la dueña de la casa, amigo cercano)

---

## 2. Objetivo del Producto

Crear una experiencia de invitación que **no sea informativa**, sino **experiencial y performática**. Cada invitado debe atravesar un flujo de "entrevista de admisión" burlesco antes de acceder a los datos reales de la fiesta. La landing debe generar risa, nostalgia y hype, funcionando como un meme interactivo que los invitados quieran compartir.

**No hay métricas de negocio** — el éxito se mide en reacciones de los invitados y tasa de confirmación informal.

---

## 3. Audiencia y Tono de Voz

### 3.1 Target
- **Audiencia:** Amigos cercanos (edades aprox. 20–30).
- **Dispositivo principal:** Celular (mobile-first obligatorio).
- **Contexto de uso:** Recibirán un link por WhatsApp/Instagram y lo abrirán en el celular, probablemente en tránsito o en su casa.

### 3.2 Tono de Voz
- **Tuteo obligatorio:** "tú", "vos", "ustedes".
- **Registro:** Informal, irreverente, con inside jokes del grupo.
- **Estilo copy:** Sarcástico, exagerado, con referencias a la cultura digital peruana y global de los 2010s (memes de Facebook, King Kyle, Trollface, era Tumblr).
- **Disclaimer satírico:** Todo el contenido político/social (votaciones, orientación sexual, marcha LGBT) es **puramente burlesco y satírico**, no posicionamiento real.

---

## 4. Arquitectura de Flujos (6 Pantallas Viewport)

La navegación es **secuencial por pantalla completa (viewport)**. No hay scroll tradicional. Cada pantalla ocupa el 100vh/100vw. El usuario avanza con un botón "Siguiente" y puede retroceder.

### 4.1 Flujo General
```
[Loader] → [Bienvenida] → [Pregunta 1: Votación] → [Pregunta 2: Slider] → [Formulario] → [Resultados + Info Final]
```

---

### 4.2 Pantalla 1: Loader Inicial
**ID:** `SCREEN_LOADER`  
**Propósito:** Crear expectativa y cargar assets críticos.

**Contenido:**
- Animación de carga estilo pixel art / retro gaming.
- Texto tipo: *"Cargando fiesta..."*, *"INSERT COIN"*, *"Conectando con el servidor de Alberth..."*.
- Barra de progreso pixelada o spinner 8-bit.
- Música de fondo inicia aquí (ver sección Audio).

**Comportamiento:**
- El loader espera a que se carguen assets críticos (fuentes, imágenes base, audio).
- Mínimo 2.5 segundos de duración para efecto dramático, aunque los carguen antes.
- Transición: fade-out + glitch effect hacia Pantalla 2.

**Audio:** Música de ambiente rave/electro 2010s inicia con interacción del usuario (tap en pantalla para superar políticas de autoplay de browsers).

---

### 4.3 Pantalla 2: Bienvenida / Header
**ID:** `SCREEN_WELCOME`  
**Propósito:** Presentar el evento con tono burlesco y establecer el lore.

**Copy principal (propuesta):**
> "ESTÁS INVITADO A LA FIESTA MÁS HOT DEL AÑO.  
> Celebrando al **TRÍO DE LA DIVERSIDAD SEXUAL**: Mathi, Aimin y Yuen.  
> Sí, somos mellizos (no preguntes).  
>  
> A continuación te haremos un par de preguntas para el conteo de invitación.  
> **Tienes que responder SÍ O SÍ todas las preguntas para entrar.**  
> Sino no entras.  
>  
> *(Alberth será el seguridad. Tiene ganas de pegar.)*"

**Elementos visuales:**
- Background: Collage dinámico de imágenes e íconos 2010s:
  - Trollface, Rage Comics, Early Facebook memes.
  - King Kyle references.
  - Brillos, estrellas, GIFs de Tumblr (sparkles, kawaii overlays).
  - Filtros estilo Retrica (vignette, light leaks).
  - Pixel art decorations.
- Overlay semi-transparente para legibilidad del texto.
- Botón CTA: **"COMENZAR INTERROGATORIO"** (estilo pixel art, con hover/tap animation).

**Navegación:**
- Tap en CTA → avanza a Pantalla 3.
- No se puede avanzar sin tap (obligatorio).

---

### 4.4 Pantalla 3: Pregunta de Apertura (Votación)
**ID:** `SCREEN_Q1_VOTE`  
**Propósito:** Enganche gamificado + recolección de dato satírico.

**Copy:**
> "PREGUNTA 1 DE 3  
> ¿Por quién votaste en las últimas elecciones?  
> *(No hay opción 'voto en blanco', aquí se juega de verdad)*"

**Opciones de respuesta:**
- **Izquierda:** Ícono pixel art de un **sombrero** (representa partido verde).
- **Derecha:** Ícono pixel art de una **K** (representa partido naranja).

**UI/UX:**
- Dos botones grandes, táctiles, ocupando ~40% del ancho cada uno.
- Estilo pixel art con bordes dentados (8-bit).
- Al seleccionar una opción:
  1. Se marca la elección con animación (bounce + flash).
  2. Aparece un panel con **resultados parciales reales** (ver Sección 8 — Backend).
  3. Se muestra la **media de votación** acumulada (ej: "Sombrero: 62% | K: 38%").
  4. Se habilita el botón **"SIGUIENTE"**.
- Si el usuario vuelve atrás y cambia su voto, se actualiza el registro.

**Estados:**
- `idle`: Opciones visibles, ninguna seleccionada.
- `selected`: Opción marcada, resultados visibles.
- `locked`: Voto registrado, botón siguiente activo.

**Audio:** Cambio de track o intensificación de la música.

---

### 4.5 Pantalla 4: Slider Orientación Sexual (Espectro)
**ID:** `SCREEN_Q2_SPECTRUM`  
**Propósito:** Continuar el gag satírico + recolección de dato gamificado.

**Copy header:**
> "PREGUNTA 2 DE 3  
> ¿Dónde te ubicarías en el espectro?  
> *(Preguntamos porque la fiesta es el mismo día de la marcha y necesitamos datos para el catering)*"

**Componente:**
- **Slider horizontal** estilo espectro continuo (no discreto).
- Labels en los extremos pixelados (ej: "0%" / "100%" o íconos representativos en 8-bit).
- El thumb del slider es un ícono pixel art (ej: una carita o un arcoíris pixelado).
- Al soltar el slider:
  1. Se muestra el valor seleccionado con animación.
  2. Aparece panel con **resultados parciales reales** (media de todos los invitados hasta el momento).
  3. Se habilita **"SIGUIENTE"**.

**Visual:**
- Fondo con gradientes neon (fucsia, turquesa, amarillo) estilo rave.
- Partículas flotantes tipo confeti pixelado.

**Estados:**
- `idle`: Slider en posición default (centro o random inicial).
- `dragging`: Usuario moviendo el thumb.
- `submitted`: Valor fijado, resultados visibles, botón siguiente activo.

---

### 4.6 Pantalla 5: Formulario de Invitado + Resultados Finales
**ID:** `SCREEN_FORM`  
**Propósito:** Capturar datos reales del invitado y mostrar stats acumuladas.

**Copy header:**
> "PREGUNTA 3 DE 3 (LA POSTA)  
> Datos reales para la lista de Alberth."

**Campos del formulario:**
1. **Nombre completo** — Text input, placeholder: *"Tu nombre fake o real, no importa"*.
2. **Sexo** — Radio group con opciones burlescas:
   - "Sí, por favor"
   - "No, gracias"
   - "Depende del día"
   - "Prefiero no decir (pero aquí estoy)"
3. **Llevaré regalo** — Checkbox único:
   - Label: *"Sí, llevaré regalo (obligatorio, no se puede desmarcar)"*
   - Estado: **checked y disabled** (no se puede desmarcar, gag visual).

**Botón de acción:**
- **"ENVIAR Y SUPLICAR ENTRADA"** — Estilo pixel art, con animación de pulso.

**Validaciones:**
- Nombre: obligatorio, mínimo 2 caracteres.
- Sexo: obligatorio (seleccionar una opción).
- Regalo: siempre true (campo hidden o checkbox locked).

**Post-submit (éxito):**
1. Pantalla muestra **"¡APROBADO!"** con animación de confeti (GSAP).
2. Se despliegan **gráficos de resultados acumulados** de todas las preguntas:
   - Gráfico de barras pixelado: Votación pregunta 1 (Sombrero vs K).
   - Gráfico de línea/area: Distribución del espectro pregunta 2.
   - Contador: "X invitados han confirmado".
3. Estilo visual de los gráficos: **Inspirado en luma.com** — limpio, moderno, con gradientes suaves (morados, rosas, azules), pero manteniendo elementos pixelados en los íconos y labels para coherencia.
4. Botón **"VER DATOS DE LA FIESTA"** → avanza a Pantalla 6.

**Post-submit (error):**
- Mensaje burlesco: *"Alberth dice que algo salió mal. Intenta de nuevo o te quedas afuera."*

**Backend:** Netlify Forms (ver Sección 8).

---

### 4.7 Pantalla 6: Info Final / Cierre
**ID:** `SCREEN_INFO`  
**Propósito:** Entregar información práctica + CTAs finales.

**Secciones:**

#### A. Notas Importantes (Reglas de la Casa)
Copy tipo lista sarcástica:
> "REGLAS DE LA CASA:
> 1. No se admiten envidiosos.
> 2. Si vomitas, limpias. Si no limpias, Alberth te limpia a ti.
> 3. Dress code: Lo que te haga sentir menos feo.
> 4. Traer tu propio vaso (ecología, amigues).
> 5. Regalo obligatorio (ya lo marcaste, no hay vuelta atrás)."

#### B. Reglas de la Temática
> "VIBE: 2010s Tumblr meets Rave Electro.  
> Brillos, neones, pixel art, y todo lo que tu adolescente interior siempre quiso.  
> Bonus points si traes un Blackberry de adorno."

#### C. Música
- Embed o link a la playlist de Spotify:
  - **Playlist:** *"cum aimi, yuen y mathi"*
  - **URL:** https://open.spotify.com/playlist/2Fkh1Kl1xey64GywP3T5ky?si=xYVcbYsBSaeojN6lq8DvTw&pi=h2KSU15AThKyN&pt=ba7e9c874beaa86003b32103c107aa88
- Botón: **"ABRIR PLAYLIST"** (abre Spotify app o web).

#### D. Ubicación
- Mapa embed de Google Maps:
  - **Dirección:** Huamanga 419, Magdalena del Mar, Lima, Perú.
  - **Referencia:** Límite con Pueblo Libre.
- Botón: **"CÓMO LLEGAR"** (link a Google Maps con dirección pre-llenada).

#### E. Colaboraciones (Yape)
- QR de Yape visible en pantalla.
- Copy: *"¿Te sobra plata? Nosotros también queremos sobrar. Escanea y colabora con la causa."*
- El QR debe ser táctil: tap para ampliar en modal.

#### F. Guardar en Calendario
- Botón: **"GUARDAR EN MI CALENDARIO"**
- Genera y descarga archivo `.ics` con:
  - Título: "Cumpleaños Yuen, Aiming & Mathi — El Trío de la Diversidad Sexual"
  - Fecha inicio: 2026-06-27 21:00 (GMT-5)
  - Fecha fin: 2026-06-28 06:00 (GMT-5)
  - Ubicación: Huamanga 419, Magdalena del Mar, Lima, Perú
  - Descripción: Link a la playlist y nota burlesca.

#### G. Compartir
- Botón: **"INVITAR A OTRO ALMA"** — Copy link al portapapeles.

---

## 5. Sistema de Diseño (UI/UX)

### 5.1 Filosofía Visual
**"Nostalgia Digital Caótica + Resultados Premium"**
- Las primeras 5 pantallas son un **deliberado caos visual** 2010s: pixel art, memes, brillos, colores saturados, estética Tumblr/Retrica.
- La pantalla de resultados (post-submit) y el panel admin usan la **elegancia visual de luma.com**: gradientes suaves, tipografía clean, espacios generosos, elementos 3D/flotantes — creando un contraste cómico entre el proceso caótico y el resultado "profesional".

### 5.2 Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `neon-fuchsia` | `#FF00FF` | Acentos, botones primarios, glows |
| `electric-turquoise` | `#00FFFF` | Fondos gradiente, highlights |
| `rave-yellow` | `#FFFF00` | CTAs secundarios, badges |
| `pixel-black` | `#0A0A0A` | Fondos oscuros, texto |
| `tumblr-purple` | `#4B0082` | Gradientes profundos, sombras |
| `retro-pink` | `#FF69B4` | Acentos femeninos, highlights |
| `luma-lavender` | `#E6E6FA` | Fondos de resultados (inspirado luma.com) |
| `luma-soft-blue` | `#87CEEB` | Gradientes de resultados |

### 5.3 Tipografía
- **Títulos/Display:** Fuente pixel art (ej: `Press Start 2P`, `VT323`, o `Pixelify Sans` de Google Fonts).
- **Body/Copy:** Fuente clean sans-serif para legibilidad mobile (ej: `Inter` o `Space Grotesk` para mantener vibe moderna).
- **Labels UI:** Monospace pixelada para inputs y botones.

### 5.4 Componentes Base

#### Botones
- Forma rectangular con bordes dentados (pixel border).
- Background sólido con `box-shadow` pixelado (sin blur, desplazamiento duro).
- Estados: `default`, `hover` (brillo neon), `active` (presionado, se mueve 2px abajo), `disabled` (grayscale).

#### Inputs
- Bordes pixelados, 2px sólido.
- Placeholder en itálica con opacidad 0.6.
- Focus: glow neon del color correspondiente.

#### Cards / Modales
- Bordes con patrón pixelado.
- Background: glassmorphism ligero (blur + transparencia) sobre fondo caótico.

#### Gráficos (Resultados)
- Estilo `luma.com`: bordes redondeados, gradientes suaves, sombras difusas.
- Pero los íconos dentro de los gráficos mantienen estilo pixel art (contraste cómico).

### 5.5 Animaciones (GSAP)

| Interacción | Animación | Duración |
|-------------|-----------|----------|
| Transición entre pantallas | Glitch + slide horizontal + fade | 0.8s |
| Botón tap | Scale 0.95 + glow intensificado | 0.15s |
| Loader | Barra progresiva + texto parpadeante | Loop 2.5s mínimo |
| Selección voto | Bounce + flash de color + shake | 0.5s |
| Slider release | Snap elástico + confeti pixelado | 0.6s |
| Submit form | Confeti masivo + scale-up "APROBADO" | 1.2s |
| Resultados | Barras creciendo desde 0 + contador animado | 1.5s stagger |
| Background | Partículas flotantes continuas (CSS/GSAP) | Loop infinito |

### 5.6 Responsive
- **Mobile-first:** Diseño base 375px–428px width.
- **Tablet:** Escalado proporcional, más espacio entre elementos.
- **Desktop:** Centrado en viewport, max-width 480px para mantener la experiencia "app móvil" incluso en PC.

---

## 6. Stack Técnico

### 6.1 Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18+ | UI library |
| Vite | 5+ | Build tool y dev server |
| React Router | 6+ | Navegación entre pantallas (6 rutas) |
| GSAP | 3+ | Animaciones complejas, timelines, transiciones |
| CSS Modules / Tailwind | — | Estilos (recomendado Tailwind para velocidad + custom pixel plugin) |
| Google Fonts | — | Press Start 2P, Inter, Space Grotesk |

### 6.2 Backend & Servicios (Netlify)
| Servicio | Propósito |
|----------|-----------|
| **Netlify Hosting** | Deploy estático del build de Vite |
| **Netlify Forms** | Recepción nativa de submissions del formulario (Pantalla 5) |
| **Netlify Functions** | Serverless endpoints para leer stats y exponerlos al frontend |
| **Netlify Identity** (opcional) | Auth básica para el panel admin |

### 6.3 Audio
- **HTML5 Audio API** con React.
- Playlist: tracks locales (optimizados, formato `.mp3` o `.ogg`, < 2MB por track para performance móvil).
- **Política de autoplay:** El audio inicia tras el primer tap del usuario en el Loader (obligatorio por restricciones de iOS/Android/Chrome).
- Controles: botón flotante de "🔊 / 🔇" siempre visible en esquina inferior derecha.
- Transiciones entre pantallas: crossfade de tracks (si aplica).

### 6.4 Mapa
- **Google Maps Embed API** (iframe) o **Static Map Image** con link a Google Maps app.
- Recomendado: imagen estática para performance + botón "Abrir en Maps".

### 6.5 Calendario
- Generación dinámica de archivo `.ics` en el frontend (librería `ics` o template string con formato iCalendar).
- Trigger: descarga automática al tap del botón.

---

## 7. Backend y Panel de Administración

### 7.1 Arquitectura de Datos

**Netlify Forms** recibe automáticamente cada submission con:
- `nombre`
- `sexo`
- `voto` (sombrero | k)
- `espectro` (valor numérico 0–100)
- `regalo` (siempre true)
- `timestamp`

**Netlify Functions** (Node.js) exponen endpoints:

#### Endpoint 1: `GET /.netlify/functions/get-stats`
Retorna stats agregadas para mostrar en las preguntas 3 y 4, y en el post-submit:
```json
{
  "totalResponses": 47,
  "votos": {
    "sombrero": 29,
    "k": 18,
    "porcentajeSombrero": 61.7,
    "porcentajeK": 38.3
  },
  "espectro": {
    "media": 42.5,
    "mediana": 38.0,
    "distribucion": [/* array para gráfico */]
  },
  "lastUpdated": "2026-06-25T12:00:00Z"
}
```

#### Endpoint 2: `GET /.netlify/functions/get-submissions`
Retorna todas las submissions para el panel admin (protegido con password).

### 7.2 Panel de Administración
- **Ruta:** `/admin`
- **Protección:** Password simple (hardcoded o Netlify Identity básico).
- **Funcionalidades:**
  1. **Dashboard de Stats:** Gráficos (inspirados luma.com) con datos reales de votación y espectro.
  2. **Lista de Invitados:** Tabla con nombre, sexo, voto, espectro, timestamp.
  3. **Exportar:** Botón para descargar CSV de submissions.
  4. **Conteo regalos:** Contador de "regalos prometidos" (todos, porque el checkbox está locked 😂).

### 7.3 Flujo de Datos
```
Usuario completa form → Netlify Forms (auto-guarda)
                           ↓
                    Netlify Function (lee submissions)
                           ↓
              Frontend pide stats → Muestra resultados reales
```

**Nota:** Netlify Forms tiene un delay de ~1 segundo en indexar submissions. Para el panel admin esto es aceptable. Para los resultados parciales en las preguntas 3 y 4, también es aceptable (no es real-time estricto).

---

## 8. Integraciones

| Integración | Detalle | Estado |
|-------------|---------|--------|
| **Spotify Playlist** | Link directo + intento de deep-link a app | Confirmado |
| **Google Maps** | Embed o static image + link a app | Confirmado |
| **Yape QR** | Imagen QR estática mostrada en pantalla | Confirmado |
| **Calendario .ics** | Generación y descarga de archivo iCal | Confirmado |
| **WhatsApp** | Link para compartir invitación (opcional) | Pendiente confirmar |
| **Netlify Forms** | Recepción de datos del formulario | Confirmado |
| **Netlify Functions** | Stats agregadas + panel admin | Confirmado |

---

## 9. Assets y Contenido Necesario

### 9.1 Imágenes
- [ ] Fondo collage Pantalla 2 (memes 2010s, Trollface, King Kyle, sparkles).
- [ ] Ícono pixel art: sombrero (verde).
- [ ] Ícono pixel art: K (naranja).
- [ ] Ícono pixel art: slider thumb (cara/arcoíris).
- [ ] Sprites de confeti pixelado (para animaciones GSAP).
- [ ] QR Yape (imagen estática, generada desde la app Yape del anfitrión).
- [ ] Foto de referencia para mapa (screenshot de Google Maps).

### 9.2 Audio
- [ ] Track 1: Loader/Bienvenida (electro/rave intro, 2010s vibe).
- [ ] Track 2: Preguntas 1-2 (más energético, hype).
- [ ] Track 3: Formulario (build-up).
- [ ] Track 4: Resultados/Info (celebration, drop).
- [ ] SFX: Tap botón, error, éxito, confeti, glitch.

### 9.3 Fuentes
- [ ] Press Start 2P (Google Fonts).
- [ ] Inter o Space Grotesk (Google Fonts).

### 9.4 Copy Final (Pendiente de aprobación del usuario)
- [ ] Revisar y aprobar todos los textos propuestos en este PRD.
- [ ] Definir inside jokes adicionales si aplica.

---

## 10. Plan de Implementación

### Fase 1: Setup y Estructura (Día 1)
- [ ] Crear repo React + Vite.
- [ ] Configurar React Router con 6 rutas.
- [ ] Instalar GSAP, configurar Tailwind.
- [ ] Setup Netlify project + configurar forms.
- [ ] Crear Netlify Functions boilerplate.

### Fase 2: UI Base y Navegación (Día 2)
- [ ] Implementar sistema de pantallas viewport (100vh/100vw).
- [ ] Transiciones entre pantallas (GSAP glitch + slide).
- [ ] Botón flotante de audio + sistema de tracks.
- [ ] Pantalla Loader + Pantalla Bienvenida.

### Fase 3: Interacciones y Gamificación (Día 3)
- [ ] Pantalla Q1 (votación pixel art + estados).
- [ ] Pantalla Q2 (slider espectro + estados).
- [ ] Integrar Netlify Functions para stats reales.
- [ ] Animaciones GSAP de selección y resultados parciales.

### Fase 4: Formulario y Resultados (Día 4)
- [ ] Pantalla Formulario (inputs, validaciones, Netlify Forms).
- [ ] Pantalla de resultados post-submit (gráficos estilo luma.com).
- [ ] Confeti animation + contador animado.

### Fase 5: Pantalla Final e Integraciones (Día 5)
- [ ] Pantalla Info: reglas, playlist, mapa, QR Yape, calendario.
- [ ] Generador de .ics.
- [ ] Deep links (Spotify, Maps, WhatsApp).

### Fase 6: Panel Admin y Polish (Día 6)
- [ ] Ruta `/admin` con auth básica.
- [ ] Dashboard de stats con gráficos.
- [ ] Tabla de invitados + export CSV.
- [ ] Testing en dispositivos móviles (iOS Safari, Android Chrome).
- [ ] Optimización de audio (compresión, lazy loading).
- [ ] Performance audit (Lighthouse > 90 mobile).

### Fase 7: Deploy y QA (Día 7)
- [ ] Deploy a Netlify.
- [ ] Test end-to-end de todo el flujo.
- [ ] Verificar Netlify Forms recibiendo datos.
- [ ] Verificar Netlify Functions respondiendo stats.
- [ ] Test panel admin.
- [ ] Enviar link a 2-3 amigos para beta testing.

---

## 11. Consideraciones Técnicas Importantes

### 11.1 Audio y Autoplay
- **Restricción:** Ningún navegador móvil permite autoplay de audio sin interacción previa del usuario.
- **Solución:** El loader requiere un tap inicial ("Toca para comenzar") que active el contexto de audio. A partir de ahí, la música fluye entre pantallas.
- **Fallback:** Si el usuario rechaza audio, el botón 🔇 queda visible y el sitio funciona 100% sin sonido.

### 11.2 Netlify Forms — Estructura HTML Requerida
Para que Netlify Forms funcione, el formulario final debe estar presente en el HTML estático (no generado 100% dinámicamente post-hydration). Solución:
- Incluir un `<form name="rsvp" netlify hidden>` en `index.html` con los campos.
- O usar `netlify` attribute en el formulario React y asegurar que el bot de Netlify lo detecte en el build.

### 11.3 Netlify Functions — Cold Start
- Las functions tienen cold start. Para el panel admin no es problema. Para los resultados parciales en Q1/Q2, considerar cache de 30 segundos en el frontend (React Query o simple `fetch` con revalidación).

### 11.4 Performance Mobile
- **Imágenes:** Usar WebP/AVIF, lazy loading, dimensiones fijas para evitar CLS.
- **Audio:** Preload solo el primer track, los demás en lazy.
- **GSAP:** Usar `will-change` con precaución, preferir `transform` y `opacity`.
- **Bundle:** Code-splitting por pantalla (React.lazy + Suspense).

### 11.5 Accesibilidad (A11y)
- Aunque el tono es irreverente, la funcionalidad debe ser accesible:
  - Contraste mínimo 4.5:1 en textos funcionales (labels, botones).
  - Focus states visibles en inputs.
  - `aria-label` en botones iconográficos.
  - Reducir motion si `prefers-reduced-motion: reduce`.

---

## 12. Estructura de Archivos Propuesta

```
/invitacion-cumple
├── public/
│   ├── index.html          (form netlify hidden aquí)
│   ├── assets/
│   │   ├── audio/          (tracks optimizados)
│   │   ├── images/         (fondos, íconos pixel, QR)
│   │   └── fonts/          (fuentes locales si aplica)
├── src/
│   ├── main.jsx
│   ├── App.jsx             (router principal)
│   ├── screens/
│   │   ├── Loader.jsx
│   │   ├── Welcome.jsx
│   │   ├── QuestionVote.jsx
│   │   ├── QuestionSpectrum.jsx
│   │   ├── FormRSVP.jsx
│   │   └── InfoFinal.jsx
│   ├── components/
│   │   ├── PixelButton.jsx
│   │   ├── PixelInput.jsx
│   │   ├── PixelSlider.jsx
│   │   ├── ResultsChart.jsx      (estilo luma.com)
│   │   ├── ConfettiEffect.jsx
│   │   ├── AudioPlayer.jsx
│   │   ├── GlitchTransition.jsx
│   │   └── FloatingParticles.jsx
│   ├── hooks/
│   │   ├── useAudio.js
│   │   ├── useNetlifyStats.js
│   │   └── useFormSubmit.js
│   ├── utils/
│   │   ├── generateICS.js
│   │   └── formatters.js
│   ├── styles/
│   │   ├── global.css
│   │   └── pixel-theme.css
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── StatsCharts.jsx
│       ├── GuestTable.jsx
│       └── LoginGate.jsx
├── netlify/
│   └── functions/
│       ├── get-stats.js
│       └── get-submissions.js
├── netlify.toml
├── package.json
└── vite.config.js
```

---

## 13. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Autoplay audio bloqueado | Alto | Tap inicial obligatorio en loader |
| Netlify Forms no detecta form dinámico | Alto | Incluir form hidden en index.html |
| Cold start de Functions lento | Medio | Cache en frontend, loading states |
| Assets pesados en mobile | Medio | Compresión WebP/AVIF, lazy loading |
| QR Yape no generado a tiempo | Bajo | Generar con anticipación, tener backup PNG |
| Cambios de copy último momento | Bajo | Centralizar copy en objeto JSON/config |

---

## 14. Glosario de Términos

- **Viewport:** Área visible del navegador. Cada pantalla ocupa 100% del viewport.
- **Pixel Art:** Estética gráfica de 8/16 bits, bordes dentados, paletas limitadas.
- **Netlify Forms:** Servicio serverless de formularios de Netlify. No requiere backend propio.
- **Netlify Functions:** AWS Lambda serverless ejecutado en infraestructura Netlify.
- **GSAP:** GreenSock Animation Platform, librería de animaciones JavaScript.
- **.ics:** Formato de archivo iCalendar para eventos (Google Calendar, Apple Calendar).
- **Yape:** App de pagos móviles del Perú (BCP).

---

## 15. Anexos

### Anexo A: Ejemplo de Formulario Netlify (HTML)
```html
<form name="rsvp" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="nombre" />
  <input type="radio" name="sexo" value="si_por_favor" />
  <input type="radio" name="sexo" value="no_gracias" />
  <input type="radio" name="sexo" value="depende" />
  <input type="radio" name="sexo" value="prefiero_no_decir" />
  <input type="checkbox" name="regalo" checked />
  <input type="hidden" name="voto" />
  <input type="hidden" name="espectro" />
</form>
```

### Anexo B: Ejemplo de Netlify Function (get-stats.js)
```javascript
exports.handler = async (event, context) => {
  // Leer submissions de Netlify Forms API (requiere token)
  // Agregar lógica de agregación
  return {
    statusCode: 200,
    body: JSON.stringify({ totalResponses: 0, votos: {}, espectro: {} })
  };
};
```

### Anexo C: Estructura de .ics
```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Cumpleaños Yuen, Aiming & Mathi
DTSTART:20260628T020000Z
DTEND:20260628T110000Z
LOCATION:Huamanga 419, Magdalena del Mar, Lima, Peru
DESCRIPTION:El Trío de la Diversidad Sexual te invita. Playlist: [link]
END:VEVENT
END:VCALENDAR
```
*(Nota: horas en UTC. GMT-5 = 21:00 → 02:00 UTC del 28)*

---

**Documento versión:** 1.0  
**Fecha:** 25 de junio de 2026  
**Autor:** Kimi (asistente de desarrollo)  
**Status:** Aprobado para desarrollo — pendiente confirmación de copy final y assets por parte de Yuen.

---

*"Si llegaste hasta aquí, ya estás más comprometido que Mathi con la dueña de la casa. A codear."* 🎉
