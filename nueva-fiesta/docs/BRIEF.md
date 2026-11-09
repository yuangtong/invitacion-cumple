# Brief — Huamanga Club, Edición 0 (borrador)

> Notas de la conversación. Todavía no es definitivo: faltan referencias de Pinterest y decisiones.

## Lo que dijo el usuario
- **Estilo:** moderno, joven, Y2K. Referencias de Pinterest por llegar. Referentes de diseño en `docs/referencias/diseno/`.
- **Base:** replicar la mecánica de la invitación original (hero → preguntas → resultado → info), pero **menos de chiste**: más como un evento real con ese estilo.
- **Hero:** música al aparecer, reveal ("estás invitado a la fiesta más hot del año"), posible **carta que se abre**.
- **Preguntas:** datos del invitado (por definir).
- **Selector de temática** (componente `selector-aleatorio`): parece aleatorio pero **siempre cae en "Vestirse para la ocasión incorrecta"** (o sea, no vestirse para un cumpleaños). Las otras cartas son temáticas señuelo: High School Musical, Halloween, etc.
- **Huamanga Club, Edición 0:** Huamanga = la dirección de la casa de Majo (la cumpleañera). Es el nombre del grupo de amigos, que compró una consola de DJ: es su primera fiesta organizada por ellos mismos.
- **Final:** se genera la invitación en formato **ticket** (componente `ticket-invitacion`).

## Propuesta de flujo (v0, para discutir)
0. **Entrada:** logo de Huamanga Club + "toca para entrar". Ese toque desbloquea la música (los navegadores no dejan sonar audio sin un toque).
1. **Sobre / carta:** se abre → "Estás invitado a la fiesta más hot del año".
2. **Presentación:** "Huamanga Club presenta: Edición 0 — el cumple de Majo". Mención a la consola y a quién pone música.
3. **Datos (una pregunta por pantalla):** nombre, email, canción que le pedirías al DJ.
4. **Selector:** las cartas giran y "deciden" → cae en "La ocasión incorrecta". Después, a cada invitado se le asigna (o elige) **su** ocasión incorrecta.
5. **Ticket:** nombre + ocasión asignada + número de entrada (#001…). Descargar / compartir en historias. Llega también por email.
6. **Info:** fecha, dirección, reglas, playlist, calendario, Yape.
- Se mantiene `/admin`.

## Decisiones abiertas
- ¿Ocasión por invitado: aleatoria o elegida por el invitado?
- ¿Las preguntas tienen chiste o son solo datos?
- Ortografía de la marca: ¿Huamanga Club o Wamanga Club?
- Datos del evento: fecha, hora, lista de DJs/lineup, regalo, reglas.
