-- Tabla de confirmaciones. Pégalo en Supabase → SQL Editor y ejecútalo una vez.
create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  email       text not null,
  extra       text,
  regalo      boolean not null default false,
  voto        text,
  espectro    numeric check (espectro between 0 and 100)
);

-- Un email solo puede confirmar una vez (sin importar mayúsculas).
create unique index if not exists rsvps_email_unique on public.rsvps (lower(email));

-- Sin políticas: solo las funciones de Vercel (con la service role key) pueden leer/escribir.
alter table public.rsvps enable row level security;
