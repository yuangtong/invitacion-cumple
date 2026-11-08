import raw from '../event.config.json';

// Config tipada de la invitación (ver event.config.json).
export const config = raw;
export type OptionId = (typeof raw.pregunta1.opciones)[number]['id'];
