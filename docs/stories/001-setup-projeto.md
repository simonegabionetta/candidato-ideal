# Story 001 - Setup do Projeto

## Status

Concluida

## Objetivo

Como usuaria do projeto Candidata Ideal, quero uma base tecnica inicial em Next.js com TypeScript, App Router e Supabase preparada, para que as proximas fases dos agentes possam ser implementadas com estrutura organizada.

## Contexto

O projeto sera uma aplicacao web pessoal em que o usuario cola o link de uma vaga e avanca por cinco fases guiadas por agentes de IA. Esta story cobre apenas a fundacao tecnica: estrutura do projeto, dependencias base, configuracao inicial e preparacao do Supabase.

Referencia principal: `docs/brief-candidata-ideal.md`.

## Escopo

- Criar ou preparar projeto Next.js com TypeScript e App Router.
- Configurar estrutura inicial de pastas.
- Preparar arquivos de ambiente.
- Adicionar dependencias base para Supabase, Vercel AI SDK e geracao de Word.
- Criar estrutura inicial para schema do Supabase.
- Garantir que o projeto consiga rodar localmente.

## Fora do escopo

- Implementar agentes.
- Implementar varredura real da web.
- Criar autenticacao.
- Criar geracao real de curriculo Word.
- Criar dashboards finais de metricas.

## Criterios de aceitacao

- [x] Existe um projeto Next.js com TypeScript e App Router.
- [x] Existe uma estrutura clara para frontend, backend interno, agentes e Supabase.
- [x] Existe arquivo de exemplo de variaveis de ambiente.
- [x] Existe schema inicial do Supabase para `aplicacoes` e `fases`.
- [x] O projeto instala dependencias sem erro.
- [x] O projeto roda localmente sem erro.
- [x] `npm run lint` executa sem erro.
- [x] `npm run typecheck` executa sem erro.
- [x] `npm test` executa sem erro.

## Plano tecnico executado

1. Projeto Next.js criado manualmente na raiz do workspace AIOX para preservar os arquivos existentes.
2. App Router configurado em `app`.
3. Backend interno iniciado com rota `app/api/health/route.ts`.
4. Camada `server` criada para logica futura dos agentes.
5. Camada `lib` criada para integracoes compartilhadas.
6. Schema inicial do Supabase criado em `supabase/schema.sql`.
7. Teste inicial criado para o placeholder do agente da fase 1.

## Variaveis de ambiente previstas

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

## Validacao

- `npm.cmd install`: passou.
- `npm.cmd run lint`: passou.
- `npm.cmd run typecheck`: passou.
- `npm.cmd test`: passou fora do sandbox; dentro do sandbox houve bloqueio `spawn EPERM`.
- `npm.cmd run build`: passou fora do sandbox; dentro do sandbox houve bloqueio `spawn EPERM`.

## File List

- `docs/brief-candidata-ideal.md`
- `docs/stories/001-setup-projeto.md`
- `.env.example`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next-env.d.ts`
- `next.config.ts`
- `eslint.config.mjs`
- `vitest.config.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/historico/page.tsx`
- `app/api/health/route.ts`
- `app/globals.css`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `server/agents/phase-one.ts`
- `server/agents/phase-one.test.ts`
- `supabase/schema.sql`

## Notas

- Conversas e documentacao devem permanecer em portugues.
- Codigo, identificadores, comandos e APIs devem permanecer em ingles.
- A proxima story deve ser conduzida pelo agente `@po` ou `@sm`, porque envolve quebrar a Fase 2 em trabalho implementavel. A implementacao tecnica deve voltar para `@dev`.
