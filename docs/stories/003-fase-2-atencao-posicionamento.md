# Story 003 - Fase 2: Atencao e Posicionamento

## Status

Draft

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools:
- lint
- typecheck
- test
- build

## Story

Como usuaria do projeto Candidata Ideal, quero transformar o DNA da empresa gerado na fase 1 em mensagens e posicionamento estrategico, para aumentar minhas chances de chamar atencao de recrutadores antes de enviar a candidatura formal.

## Contexto

A Story 002 implementou a Fase 1: o usuario cola o link da vaga, a API executa a varredura com IA, salva `aplicacoes` e `fases`, exibe o DNA da empresa e desbloqueia a Fase 2 quando a decisao e `apply`.

A Fase 2 usa o resultado da Fase 1 como entrada e gera materiais de posicionamento antes da candidatura:

- mensagem para recrutador;
- estrategia de conexao no LinkedIn;
- comentario em post;
- post de posicionamento;
- ajustes sugeridos no LinkedIn;
- narrativa da candidata ideal.

Referencia de produto: `docs/brief-candidata-ideal.md#fase-2---atencao-e-posicionamento`.
Referencia da fase anterior: `docs/stories/002-fase-1-varredura-decisao.md`.

## Escopo

- Criar contrato TypeScript para entrada e saida da Fase 2.
- Criar agente `runPhaseTwoPositioning` usando Vercel AI SDK e OpenAI.
- Criar rota `POST /api/phases/two`.
- Receber `applicationId` e validar se a Fase 2 esta ativa.
- Buscar o resultado da Fase 1 salvo em `fases.resultado_ia`.
- Gerar saida estruturada da Fase 2.
- Salvar a Fase 2 como `concluida` em `fases`.
- Criar ou ativar Fase 3 apenas quando o gate manual "Recebi sinal de interesse" for acionado.
- Atualizar UI para exibir os materiais da Fase 2.
- Adicionar botao de gate manual "Recebi sinal de interesse".
- Criar testes sem chamadas reais para OpenAI ou Supabase.

## Fora do Escopo

- Gerar curriculos Word.
- Implementar Fase 3.
- Enviar mensagens automaticamente para LinkedIn ou recrutadores.
- Fazer scraping autenticado de LinkedIn.
- Criar autenticacao multiusuario.
- Fazer deploy.

## Criterios de Aceitacao

- [ ] Existe uma rota `POST /api/phases/two` que recebe `{ "applicationId": string }`.
- [ ] A rota valida entrada obrigatoria e retorna `400` para entrada invalida.
- [ ] A rota verifica que a Fase 2 esta ativa antes de executar o agente.
- [ ] A rota busca o resultado da Fase 1 em `fases.resultado_ia`.
- [ ] O agente gera saida estruturada com mensagem para recrutador, estrategia de conexao, comentario em post, post de posicionamento, ajustes no LinkedIn e narrativa da candidata ideal.
- [ ] O resultado da Fase 2 e salvo em `fases.resultado_ia`.
- [ ] A interface mostra loading, erro e resultado da Fase 2.
- [ ] A interface exibe o botao "Recebi sinal de interesse" apos concluir a Fase 2.
- [ ] A Fase 3 so e desbloqueada quando o gate manual for acionado.
- [ ] Testes cobrem validacao de entrada, contrato do agente, persistencia e gate manual.
- [ ] `npm run lint`, `npm run typecheck`, `npm test` e `npm run build` passam ou tem falha de ambiente registrada.

## Dev Notes

- Reutilizar o padrao de `server/agents/phase-one.ts` para schema Zod, tipos e chamada com `generateObject`.
- Reutilizar o padrao de `app/api/phases/one/route.ts` para mensagens seguras de erro.
- Nao expor `SUPABASE_SERVICE_ROLE_KEY` ou `OPENAI_API_KEY` ao client.
- `resultado_ia` atualmente e `text`; parsear JSON com tratamento de erro claro.
- A UI principal ainda guarda o resultado da Fase 1 em estado local. Para primeira versao, pode manter o fluxo em pagina unica e usar `applicationId` retornado pela Fase 1.
- O gate manual pode ser uma rota separada, por exemplo `POST /api/phases/two/gate`, ou uma acao da propria rota da Fase 2. Preferir rota separada se isso mantiver o contrato mais claro.

## Testing

- Testes do agente devem mockar a geracao de IA.
- Testes da API devem mockar Supabase e agente.
- Cobrir cenario em que a Fase 2 nao esta ativa.
- Cobrir cenario em que `resultado_ia` da Fase 1 esta ausente ou invalido.
- Cobrir desbloqueio da Fase 3 somente pelo gate manual.

## Change Log

| Data | Versao | Descricao | Autor |
| --- | --- | --- | --- |
| 2026-05-04 | 0.1 | Story 003 criada a partir da conclusao da Story 002. | Codex |

## QA Results

_A preencher apos implementacao._
