# Handoff - Story 002 de Desenvolvimento para QA

## De

Codex, agente `@dev`.

## Para

Proximo agente recomendado: `@architect` ou `@qa`.

Motivo: a Story 002 foi implementada e precisa de revisao de contrato, seguranca server-side e qualidade do fluxo.

## Contexto

A Story 002 implementa a fase 1 real do produto Candidata Ideal:

- Usuario envia o link da vaga pela pagina principal.
- API `POST /api/phases/one` valida a URL.
- Agente `runPhaseOneScan` usa Vercel AI SDK com OpenAI e schema estruturado.
- Resultado e persistido em `aplicacoes` e `fases`.
- Fase 2 fica ativa quando a decisao normalizada e `apply`.
- Interface mostra loading, erro, DNA da empresa, decisao e justificativa.

## Arquivos alterados

- `server/agents/phase-one.ts`
- `server/agents/phase-one.test.ts`
- `app/api/phases/one/route.ts`
- `app/api/phases/one/route.test.ts`
- `app/page.tsx`
- `app/globals.css`
- `docs/stories/002-fase-1-varredura-decisao.md`
- `.aiox/handoffs/002-dev-para-qa.md`

## Decisoes tomadas

- O contrato da fase 1 usa `decision: "apply" | "do_not_apply"` no codigo.
- A exibicao converte para `APLICAR` ou `NAO APLICAR`.
- `resultado_ia` e salvo como `JSON.stringify(result)` porque o schema atual usa `text`.
- O endpoint retorna mensagem segura em falhas inesperadas e registra o erro no servidor.
- A rota usa `SUPABASE_SERVICE_ROLE_KEY` apenas via `createServerSupabaseClient`, em codigo server-side.
- Os testes mockam AI SDK, agente e Supabase; nao ha chamadas reais para OpenAI, Supabase ou web.

## Validacoes executadas

- `npm.cmd run lint`: passou.
- `npm.cmd run typecheck`: passou.
- `npm.cmd test`: falhou no sandbox com `spawn EPERM`; passou fora do sandbox.
- `npm.cmd run build`: falhou no sandbox com `spawn EPERM` apos compilar; passou fora do sandbox.

Resultado de testes fora do sandbox:

- 2 arquivos de teste passaram.
- 8 testes passaram.

## Pendencias e riscos

- Supabase real ainda precisa ser conectado e as tabelas precisam existir no projeto remoto.
- `OPENAI_API_KEY` precisa estar configurada para uso real.
- A implementacao nao adiciona ferramenta de busca web autenticada. O prompt instrui o modelo a registrar limitacoes quando fontes externas nao estiverem acessiveis.
- A UI nao foi verificada manualmente em navegador local nesta passada; build e testes automatizados passaram.

## Proximo comando sugerido

Ativar `@architect` ou `@qa` e pedir:

`Revise a Story 002 implementada. Use docs/stories/002-fase-1-varredura-decisao.md e .aiox/handoffs/002-dev-para-qa.md como contexto.`

Depois da revisao, limpar a janela de contexto antes de iniciar a proxima fase.
