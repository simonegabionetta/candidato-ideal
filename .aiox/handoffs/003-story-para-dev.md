# Handoff - Story 003 para Desenvolvimento

## De

Codex, atuando como organizador/quality gate apos revisao da Story 002.

## Para

Proximo agente recomendado: `@dev`.

Motivo: a Story 003 ja esta planejada e envolve implementacao tecnica de API, agente de IA, persistencia, UI e testes.

## Contexto

O projeto Candidata Ideal esta com:

- Repositorio GitHub configurado em `https://github.com/simonegabionetta/candidato-ideal.git`.
- Branch `master` sincronizada com `origin/master`.
- Story 001 concluida: setup do projeto.
- Story 002 concluida: Fase 1, varredura da vaga, DNA da empresa e decisao.
- Story 003 criada em `docs/stories/003-fase-2-atencao-posicionamento.md`.

A decisao de produto atual e nao configurar deploy agora. Deploy na Vercel fica para quando a primeira versao funcional estiver pronta.

## Arquivos relevantes

- `docs/stories/003-fase-2-atencao-posicionamento.md`
- `docs/stories/002-fase-1-varredura-decisao.md`
- `docs/brief-candidata-ideal.md`
- `server/agents/phase-one.ts`
- `app/api/phases/one/route.ts`
- `app/page.tsx`
- `app/globals.css`
- `supabase/schema.sql`
- `lib/supabase/server.ts`
- `lib/supabase/client.ts`

## Decisoes tomadas

- A Fase 2 deve usar como entrada o resultado salvo da Fase 1.
- A Fase 2 deve gerar materiais de posicionamento antes da candidatura formal:
  - mensagem para recrutador;
  - estrategia de conexao no LinkedIn;
  - comentario em post;
  - post de posicionamento;
  - ajustes no LinkedIn;
  - narrativa da candidata ideal.
- A Fase 3 so deve ser desbloqueada por gate manual: "Recebi sinal de interesse".
- O deploy fica fora do escopo ate a primeira versao funcional estar pronta.
- Conversa e documentacao devem permanecer em portugues.
- Codigo, identificadores, APIs e comandos permanecem em ingles quando fizer sentido tecnico.

## Validacoes recentes

- `npm.cmd run lint`: passou.
- `npm.cmd run typecheck`: passou.
- `npm.cmd test`: passou com 2 arquivos e 8 testes fora do sandbox; no sandbox houve `spawn EPERM`.
- `npm.cmd run build`: passou fora do sandbox; no sandbox houve `spawn EPERM`.

## Pendencias

- Implementar a Story 003.
- Criar testes da Fase 2 sem chamadas reais para OpenAI ou Supabase.
- Atualizar a story com checklist, validacoes, File List e Dev Agent Record ao concluir.
- Criar handoff de `@dev` para `@architect` ou `@qa` apos implementar.
- Fazer commit e push ao concluir a story.

## Proximo comando sugerido

Depois de limpar a janela de contexto, iniciar nova sessao e chamar:

`@dev implemente a Story 003 em docs/stories/003-fase-2-atencao-posicionamento.md. Use o handoff .aiox/handoffs/003-story-para-dev.md como contexto.`

