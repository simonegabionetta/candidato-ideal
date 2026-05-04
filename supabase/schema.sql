create table if not exists public.aplicacoes (
  id uuid primary key default gen_random_uuid(),
  empresa text,
  cargo text,
  link_vaga text not null,
  data_inicio timestamptz not null default now(),
  fase_atual integer not null default 1,
  fase_mais_avancada integer not null default 1,
  resultado text not null default 'em andamento' check (resultado in ('em andamento', 'aprovado', 'reprovado')),
  criado_em timestamptz not null default now()
);

create table if not exists public.fases (
  id uuid primary key default gen_random_uuid(),
  aplicacao_id uuid not null references public.aplicacoes(id) on delete cascade,
  numero_fase integer not null check (numero_fase between 1 and 5),
  nome_fase text not null,
  status text not null default 'bloqueada' check (status in ('bloqueada', 'ativa', 'concluida')),
  resultado_ia text,
  passou boolean,
  iniciado_em timestamptz,
  concluido_em timestamptz,
  unique (aplicacao_id, numero_fase)
);

create index if not exists fases_aplicacao_id_idx on public.fases(aplicacao_id);
create index if not exists aplicacoes_criado_em_idx on public.aplicacoes(criado_em desc);
