# Story 002 - Fase 1: Varredura da Vaga, DNA da Empresa e Decisao

## Status

Review

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools:
- lint
- typecheck
- test
- build

## Story

Como usuaria do projeto Candidata Ideal, quero colar o link de uma vaga e receber uma varredura estruturada da empresa com decisao APLICAR ou NAO APLICAR, para decidir com clareza se devo investir tempo naquela candidatura e, quando fizer sentido, desbloquear automaticamente a fase 2.

## Contexto

A Story 001 concluiu a fundacao tecnica: projeto Next.js com TypeScript e App Router, cliente Supabase inicial, schema base, pagina principal, pagina de historico, rota de saude e placeholder do agente da fase 1.

Esta story transforma o placeholder da fase 1 em um fluxo real de MVP:

1. Usuario informa o link da vaga na pagina principal.
2. Backend valida o link e cria uma aplicacao no Supabase.
3. Agente da fase 1 pesquisa a vaga e a empresa usando Vercel AI SDK e ferramentas disponiveis.
4. Agente retorna DNA da empresa, decisao `APLICAR` ou `NAO APLICAR` e justificativa.
5. Resultado e salvo no Supabase.
6. Interface exibe o resultado e desbloqueia a fase 2 quando a decisao for `APLICAR`.

Referencia de produto: `docs/brief-candidata-ideal.md#fase-1---varredura-e-decisao`.
Referencia de handoff: `.aiox/handoffs/001-setup-para-sm.md#proximo-passo-sugerido`.
Referencia de story anterior: `docs/stories/001-setup-projeto.md#notas`.

## Escopo

- Criar endpoint de API para executar a fase 1 a partir de um link de vaga.
- Substituir o placeholder em `server/agents/phase-one.ts` por uma implementacao real usando Vercel AI SDK.
- Definir tipos TypeScript para entrada, saida, decisao e DNA da empresa.
- Definir schema estruturado da saida do agente.
- Persistir aplicacao e fase 1 no Supabase.
- Atualizar a pagina principal para chamar o endpoint e exibir loading, erro e resultado.
- Desbloquear visualmente a fase 2 quando a decisao for `APLICAR`.
- Permitir que o usuario veja a justificativa quando a decisao for `NAO APLICAR`.
- Criar testes unitarios para o agente e testes de contrato para a API.

## Fora do Escopo

- Implementar agente da fase 2.
- Implementar autenticacao multiusuario.
- Conectar projeto real do Supabase ou deploy real na Vercel.
- Automatizar candidatura em sites externos.
- Fazer scraping autenticado de LinkedIn, Glassdoor ou outros sites com restricao de acesso.
- Implementar historico e metricas completas.
- Gerar curriculos Word.

## Criterios de Aceitacao

- [x] Existe uma rota `POST /api/phases/one` que recebe `{ "jobUrl": string }`.
- [x] A rota valida URL obrigatoria e retorna erro claro para entrada ausente ou invalida.
- [x] A rota chama `runPhaseOneScan` e retorna resposta JSON tipada.
- [x] `runPhaseOneScan` usa Vercel AI SDK e OpenAI para gerar uma saida estruturada.
- [x] A saida contem, no minimo: empresa, cargo, link da vaga, resumo da vaga, requisitos, sinais de cultura, riscos, oportunidades, DNA da empresa, decisao e justificativa.
- [x] A decisao e normalizada em `apply` ou `do_not_apply` no codigo, e exibida ao usuario como `APLICAR` ou `NAO APLICAR`.
- [x] O resultado da aplicacao e salvo em `aplicacoes`.
- [x] A fase 1 e salva em `fases` com status `concluida` e `resultado_ia` preenchido.
- [x] Quando a decisao for `apply`, a fase 2 fica com status `ativa` no banco e aparece desbloqueada na interface.
- [x] Quando a decisao for `do_not_apply`, a interface mostra a justificativa e nao desbloqueia automaticamente a fase 2.
- [x] A pagina principal permite inserir o link, iniciar analise, acompanhar loading e visualizar resultado ou erro.
- [x] Testes cobrem validacao de entrada, normalizacao da decisao, retorno estruturado do agente e persistencia esperada.
- [x] `npm run lint`, `npm run typecheck`, `npm test` e `npm run build` passam ou tem falha de ambiente registrada.

## CodeRabbit Integration

> **CodeRabbit Integration**: Disabled
>
> CodeRabbit CLI is not enabled in `.aiox-core/core-config.yaml`.
> Quality validation will use manual review process only.
> To enable, set `coderabbit_integration.enabled: true` in `.aiox-core/core-config.yaml`.

### Story Type Analysis

Primary Type: API
Secondary Types: Database, Frontend, Integration, Security
Complexity: High, porque a story conecta UI, API route, agente de IA, persistencia Supabase e tratamento de falhas externas.

### Specialized Agent Assignment

Primary Agents:

- `@dev`: implementacao da rota, agente, UI e testes.
- `@architect`: revisao de contrato da API, limites da integracao com IA e desenho de dados.

Supporting Agents:

- `@data-engineer`: revisar schema, persistencia e status das fases.
- `@ux-design-expert`: revisar clareza da experiencia na pagina principal.
- `@github-devops`: apenas depois da implementacao, para push e PR.

### Quality Gate Tasks

- [x] Pre-Commit (`@dev`): executar lint, typecheck, testes e build antes de marcar a story como concluida.
- [ ] Pre-PR (`@github-devops`): revisar diff completo antes de criar PR.
- [ ] Manual Security Review (`@architect`): confirmar que chaves server-side nao vazam para o client e que erros nao expõem segredos.

### Focus Areas

- Validacao de entrada e respostas de erro previsiveis.
- Contrato de saida do agente estavel e testavel.
- Persistencia idempotente o suficiente para evitar dados parciais incoerentes.
- Uso server-side de `OPENAI_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.
- UI simples, sem bloquear as fases indevidamente.
- Tratamento de indisponibilidade de IA, busca web ou Supabase.

## Tasks / Subtasks

- [x] Task 1: Definir contratos TypeScript da fase 1. (AC: 4, 5, 6)
  - [ ] Criar ou atualizar tipos em `server/agents/phase-one.ts`.
  - [ ] Incluir `PhaseOneInput`, `PhaseOneDecision`, `CompanyDna`, `PhaseOneOutput` e tipos auxiliares.
  - [ ] Manter `decision` no codigo como `apply | do_not_apply`.

- [x] Task 2: Implementar agente real da fase 1 com Vercel AI SDK. (AC: 4, 5, 6)
  - [ ] Usar dependencia existente `ai` e `@ai-sdk/openai`.
  - [ ] Criar prompt de varredura que cubra vaga, empresa, cultura, lideranca, noticias, riscos, oportunidades e niveis estrategico/tatico/operacional.
  - [ ] Forcar saida estruturada e validavel.
  - [ ] Registrar limitações quando fontes externas nao estiverem acessiveis.

- [x] Task 3: Criar API route da fase 1. (AC: 1, 2, 3)
  - [ ] Criar `app/api/phases/one/route.ts`.
  - [ ] Validar body JSON e URL.
  - [ ] Retornar `400` para entrada invalida.
  - [ ] Retornar `500` com mensagem segura para falhas inesperadas.

- [x] Task 4: Persistir aplicacao e fases no Supabase. (AC: 7, 8, 9, 10)
  - [ ] Usar `createServerSupabaseClient` de `lib/supabase/server.ts`.
  - [ ] Inserir registro em `aplicacoes` com `empresa`, `cargo`, `link_vaga`, `fase_atual` e `fase_mais_avancada`.
  - [ ] Inserir fase 1 como `concluida` com `resultado_ia`.
  - [ ] Se `decision === "apply"`, inserir ou atualizar fase 2 como `ativa`.
  - [ ] Se `decision === "do_not_apply"`, manter fases seguintes bloqueadas.

- [x] Task 5: Atualizar pagina principal. (AC: 9, 10, 11)
  - [ ] Transformar formulario em componente interativo quando necessario.
  - [ ] Chamar `POST /api/phases/one`.
  - [ ] Mostrar estado de carregamento durante a analise.
  - [ ] Mostrar DNA da empresa, decisao e justificativa.
  - [ ] Atualizar cards das fases para refletir fase 1 concluida e fase 2 ativa quando aplicavel.

- [x] Task 6: Criar cobertura de testes. (AC: 2, 3, 6, 7, 8, 12)
  - [ ] Atualizar `server/agents/phase-one.test.ts`.
  - [ ] Criar testes para validacao e normalizacao da decisao.
  - [ ] Criar teste de contrato da rota com mocks para agente e Supabase, se o setup permitir.
  - [ ] Garantir que os testes nao chamem OpenAI ou Supabase reais.

- [x] Task 7: Validar localmente. (AC: 13)
  - [ ] Executar `npm run lint`.
  - [ ] Executar `npm run typecheck`.
  - [ ] Executar `npm test`.
  - [ ] Executar `npm run build`.
  - [ ] Registrar qualquer falha de sandbox ou dependencia externa na story e no handoff.

## Dev Notes

### Previous Story Insights

- Story 001 criou `server/agents/phase-one.ts` apenas como placeholder, retornando sempre `decision: "apply"`. [Source: `docs/stories/001-setup-projeto.md#plano-tecnico-executado`]
- Story 001 criou `lib/supabase/client.ts` e `lib/supabase/server.ts` para separar cliente browser e cliente server-side. [Source: `docs/stories/001-setup-projeto.md#file-list`]
- Story 001 registrou que o projeto ainda precisa ser conectado a um projeto real no Supabase e a Vercel. [Source: `.aiox/handoffs/001-setup-para-sm.md#pendencias`]

### Product Requirements

- A fase 1 recebe um link de vaga e pesquisa vaga e empresa, incluindo descricao, requisitos, modelo de negocio, produtos, financas, cultura real, lideranca, noticias, riscos, oportunidades, posts recentes e camadas estrategica, tatica e operacional. [Source: `docs/brief-candidata-ideal.md#fase-1---varredura-e-decisao`]
- A saida da fase 1 deve conter DNA da empresa e decisao APLICAR ou NAO APLICAR com justificativa. [Source: `docs/brief-candidata-ideal.md#fase-1---varredura-e-decisao`]
- O produto deve manter interface simples, cada fase com objetivo e saida claros, e recomendacoes explicando como executar. [Source: `docs/brief-candidata-ideal.md#principios-de-produto`]

### Data Models

- `aplicacoes` possui `id`, `empresa`, `cargo`, `link_vaga`, `data_inicio`, `fase_atual`, `fase_mais_avancada`, `resultado` e `criado_em`. [Source: `docs/brief-candidata-ideal.md#aplicacoes`]
- `fases` possui `id`, `aplicacao_id`, `numero_fase`, `nome_fase`, `status`, `resultado_ia`, `passou`, `iniciado_em` e `concluido_em`. [Source: `docs/brief-candidata-ideal.md#fases`]
- O schema atual limita `status` de fases a `bloqueada`, `ativa` ou `concluida`, e `resultado` de aplicacoes a `em andamento`, `aprovado` ou `reprovado`. [Source: `supabase/schema.sql`]

### API Specifications

- No API spec formal existe em `docs/architecture`; usar o padrao atual de API Routes do App Router. [Source: `app/api/health/route.ts`]
- A nova rota deve ser criada em `app/api/phases/one/route.ts`, usando `NextResponse.json` como a rota de saude. [Source: `app/api/health/route.ts`]

### Component Specifications

- A pagina principal atual fica em `app/page.tsx`, contem formulario de link da vaga e cinco cards de fase. [Source: `app/page.tsx`]
- A UI deve continuar simples e funcional; o foco do produto e a inteligencia dos agentes. [Source: `docs/brief-candidata-ideal.md#visao-geral`]

### Environment Variables

- `OPENAI_API_KEY` e necessaria para o agente com OpenAI.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` ja estao previstas em `.env.example`.
- A chave `SUPABASE_SERVICE_ROLE_KEY` deve ser usada somente em codigo server-side.

### Technical Constraints

- Codigo, identificadores, comandos e APIs devem permanecer em ingles; documentacao e conversa devem permanecer em portugues. [Source: `AGENTS.md#communication-rules`]
- Nao depender de acesso autenticado a LinkedIn, Glassdoor ou outros sites restritos nesta story. Registrar ausencia de fonte quando a informacao nao puder ser coletada.
- Testes nao devem chamar OpenAI, Supabase real ou web real; usar mocks/fakes.

### Project Structure Notes

- AIOX espera stories em `docs/stories`, confirmado por `.aiox-core/core-config.yaml`.
- Nao existem documentos sharded em `docs/architecture` ou `docs/prd` neste momento; usar `docs/brief-candidata-ideal.md`, Story 001, handoff e codigo atual como fontes primarias.
- O template declarado no agente em `.aiox-core/development/templates/story-tmpl.yaml` nao existe; o template encontrado fica em `.aiox-core/product/templates/story-tmpl.yaml`.

## Testing

- Unit tests para `runPhaseOneScan` devem mockar o modelo de IA e validar shape da resposta.
- Unit tests para helpers de validacao devem cobrir URL vazia, URL invalida e URL valida.
- API route tests devem mockar Supabase e agente para validar:
  - `400` quando `jobUrl` estiver ausente.
  - `400` quando `jobUrl` for invalida.
  - `200` com contrato esperado quando a analise passa.
  - persistencia de fase 2 ativa quando decisao for `apply`.
  - fase 2 bloqueada quando decisao for `do_not_apply`.
- UI deve ser testada no minimo manualmente no navegador local depois da implementacao.

## Change Log

| Data | Versao | Descricao | Autor |
| --- | --- | --- | --- |
| 2026-05-04 | 0.1 | Story 002 criada a partir do handoff da Story 001. | River (`@sm`) |
| 2026-05-04 | 1.0 | Fase 1 implementada com API, agente estruturado, persistencia, UI e testes. | Codex (`@dev`) |

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `npm.cmd run lint`: passou.
- `npm.cmd run typecheck`: passou.
- `npm.cmd test`: falhou no sandbox com `spawn EPERM`; passou fora do sandbox com 2 arquivos e 8 testes.
- `npm.cmd run build`: falhou no sandbox com `spawn EPERM` apos compilar; passou fora do sandbox.

### Completion Notes

- Implementada rota `POST /api/phases/one` com validacao de URL, chamada ao agente e resposta JSON segura.
- `runPhaseOneScan` agora usa Vercel AI SDK com OpenAI e schema Zod estruturado.
- Persistencia criada em `aplicacoes` e `fases`, com fase 2 ativa apenas para decisao `apply`.
- Pagina principal transformada em UI interativa com loading, erro, resultado, decisao e cards de fase.
- Testes usam mocks/fakes e nao chamam OpenAI, Supabase real ou web real.
- Observacao: nao foi adicionada ferramenta de busca web autenticada; o prompt instrui o modelo a registrar limitacoes quando fontes externas nao estiverem acessiveis.

### File List

- `server/agents/phase-one.ts`
- `server/agents/phase-one.test.ts`
- `app/api/phases/one/route.ts`
- `app/api/phases/one/route.test.ts`
- `app/page.tsx`
- `app/globals.css`
- `docs/stories/002-fase-1-varredura-decisao.md`
- `.aiox/handoffs/002-dev-para-qa.md`

## QA Results

_A preencher pelo agente de QA ou PO._

## Story Draft Checklist

| Category | Status | Issues |
| --- | --- | --- |
| 1. Goal & Context Clarity | PASS | Objetivo, valor e encaixe no fluxo estao descritos. |
| 2. Technical Implementation Guidance | PASS | Arquivos, rotas, contratos, env vars e integracoes principais estao identificados. |
| 3. Reference Effectiveness | PASS | Referencias apontam para brief, handoff, story anterior e codigo atual. |
| 4. Self-Containment Assessment | PASS | Requisitos centrais e limitacoes estao incluidos na propria story. |
| 5. Testing Guidance | PASS | Estrategia de testes e cenarios principais estao listados. |
| 6. CodeRabbit Integration | N/A | CodeRabbit nao esta habilitado no core-config atual. |

Final Assessment: READY para validacao pelo PO ou implementacao pelo Dev, com risco conhecido em integracoes externas de IA, busca web e Supabase real.
