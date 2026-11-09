# Brief — Huamanga Club, Edición 0 (borrador v2)

> Notas de la conversación. Falta: datos del evento y decisión de cómo se hacen los assets 3D.

## Decidido
- **Nombre:** Huamanga Club (como la calle; la fiesta es en la casa de Majo, Huamanga 419).
- **Concepto:** primera fiesta organizada por el grupo de amigos (compraron una consola de DJ) → "Edición 0". Cumpleaños de Majo.
- **Estilo:** se descarta Y2K. Va **globo inflado** (texturas balloon / inflatable 3D), ver `referencias/moodboard/`.
  Mezclado con lenguaje de **cartel de club** (moodboard 04 y 05) para el lado "Club".
- **Temática:** la ruleta parece aleatoria, pero **siempre cae en "La ocasión incorrecta"**: ir vestido para cualquier evento menos un cumpleaños.
  La temática es la misma para todos. Las otras cartas son señuelos (High School Musical, Halloween, etc.).
- **Preguntas:** solo datos (nombre, email) + **canción que le pedirías al DJ**.
- **Final:** ticket (componente `ticket-invitacion`).

## Flujo (v2)
0. **Inicio:** carta/sobre inflado + "Toca para abrir". El toque desbloquea el audio.
1. **Apertura:** al tocar, salen globos con sonidos "puff puff", explotan (pop) → aparece **"Estás invitado a la fiesta más hot del año"** en letras infladas.
2. **Presentación:** "Huamanga Club presenta: Edición 0 — el cumple de Majo" (estilo cartel de club).
3. **"Toca para saber la temática"** → ruleta de cartas (componente `selector-aleatorio` adaptado) → cae en **La ocasión incorrecta**.
4. **Explicación de la temática:** qué significa, ejemplos de ocasiones (boda, graduación, funeral, gym…).
5. **Datos:** nombre, apellido, email, canción para el DJ.
6. **Ticket:** "Huamanga Club presenta · Edición 0 · [Nombre] · Dress code: la ocasión incorrecta · #NNN". Descargar / compartir. También por email.
7. **Info:** fecha, dirección, reglas, playlist, calendario, Yape.
- Se mantiene `/admin`.

## Pendiente
- Cómo se hacen los assets 3D inflados (letras y formas): ver opciones en la conversación.
- Datos del evento: fecha, hora, lineup, reglas, regalo.
- Lista de ocasiones señuelo de la ruleta y sus imágenes.
- Sonidos: puff (inflar), pop (explotar), squeak (juguete).
