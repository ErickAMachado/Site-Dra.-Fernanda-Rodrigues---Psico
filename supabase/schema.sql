-- Schema for psychologist landing page
-- Run this in the Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  source text default 'Google',
  review_date date,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table public.testimonials enable row level security;

drop policy if exists "Allow public read active testimonials" on public.testimonials;
create policy "Allow public read active testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (is_active = true);

-- Sample testimonials for development
insert into public.testimonials (author_name, rating, comment, source, review_date, is_active)
values
  ('Mariana S.', 5, 'Encontramos acolhimento desde a primeira consulta. Nosso filho se sente seguro e nós, pais, nos sentimos orientados.', 'Google', '2025-11-12', true),
  ('Ricardo M.', 5, 'Profissional atenciosa, comunicativa e muito respeitosa com nossa filha autista. Recomendamos de coração.', 'Google', '2025-10-03', true),
  ('Camila F.', 5, 'Ambiente leve, escuta verdadeira e orientações claras para a família. Foi essencial no processo do nosso adolescente.', 'Google', '2025-09-18', true);
