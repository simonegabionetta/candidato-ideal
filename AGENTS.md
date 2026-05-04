# AGENTS.md - Synkra AIOX (Codex CLI)

Este arquivo define as instrucoes do projeto para o Codex CLI.

## Communication Rules

- Converse sempre em portugues com o usuario.
- Escreva arquivos de documentacao, planejamento, requisitos, analise e conteudo textual em portugues.
- Use ingles somente em codigo, identificadores, comandos, APIs, nomes tecnicos exigidos por ferramentas e conteudo que precise permanecer no idioma original.

## Context and Handoff Rules

- Trabalhe passo a passo com o agente certo para cada etapa.
- Antes de trocar de agente, avise o usuario de forma simples qual agente deve assumir e por que.
- Antes de encerrar uma fase ou trocar de agente, gere um handoff em portugues para o proximo agente com contexto, arquivos alterados, decisoes tomadas, pendencias e proximo comando sugerido.
- A cada troca de agente ou nova fase, recomende limpar a janela de contexto e iniciar uma nova sessao depois que o handoff estiver salvo.
- Mantenha a janela de contexto baixa: nao carregue arquivos grandes sem necessidade e prefira resumos objetivos.
- Ao concluir cada fase ou user story, fazer commit no repositorio do usuario antes do handoff, seguindo Conventional Commits em ingles no prefixo e mensagem objetiva em portugues quando fizer sentido. Exemplos: `feat: adiciona setup inicial do projeto`, `docs: cria brief do produto`, `chore: atualiza regras de handoff`.
- Ao concluir cada fase ou user story, sempre executar testes e validacoes adequadas ao que foi alterado antes de marcar como concluido. Registrar no arquivo da story e no handoff quais comandos foram executados, quais passaram, quais falharam e qualquer excecao de ambiente.
- Ao concluir cada fase ou user story, atualizar o `passo-passo.md` do projeto com historico resumido: agente responsavel, o que foi feito, validacoes, commits, pendencias e proximo passo recomendado.

<!-- AIOX-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aiox-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AIOX-MANAGED-END: core -->

<!-- AIOX-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- AIOX-MANAGED-END: quality -->

<!-- AIOX-MANAGED-START: codebase -->
## Project Map

- Core framework: `.aiox-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- Docs: `docs/`
<!-- AIOX-MANAGED-END: codebase -->

<!-- AIOX-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:skills:codex`
- `npm run sync:skills:codex:global` (opcional; neste repo o padrao e local-first)
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AIOX-MANAGED-END: commands -->

<!-- AIOX-MANAGED-START: shortcuts -->
## Agent Shortcuts

Preferencia de ativacao no Codex CLI:
1. Use `/skills` e selecione `aiox-<agent-id>` vindo de `.codex/skills` (ex.: `aiox-architect`)
2. Se preferir, use os atalhos abaixo (`@architect`, `/architect`, etc.)

Interprete os atalhos abaixo carregando o arquivo correspondente em `.aiox-core/development/agents/` (fallback: `.codex/agents/`), renderize o greeting via `generate-greeting.js` e assuma a persona ate `*exit`:

- `@architect`, `/architect`, `/architect.md` -> `.aiox-core/development/agents/architect.md`
- `@dev`, `/dev`, `/dev.md` -> `.aiox-core/development/agents/dev.md`
- `@qa`, `/qa`, `/qa.md` -> `.aiox-core/development/agents/qa.md`
- `@pm`, `/pm`, `/pm.md` -> `.aiox-core/development/agents/pm.md`
- `@po`, `/po`, `/po.md` -> `.aiox-core/development/agents/po.md`
- `@sm`, `/sm`, `/sm.md` -> `.aiox-core/development/agents/sm.md`
- `@analyst`, `/analyst`, `/analyst.md` -> `.aiox-core/development/agents/analyst.md`
- `@devops`, `/devops`, `/devops.md` -> `.aiox-core/development/agents/devops.md`
- `@data-engineer`, `/data-engineer`, `/data-engineer.md` -> `.aiox-core/development/agents/data-engineer.md`
- `@ux-design-expert`, `/ux-design-expert`, `/ux-design-expert.md` -> `.aiox-core/development/agents/ux-design-expert.md`
- `@squad-creator`, `/squad-creator`, `/squad-creator.md` -> `.aiox-core/development/agents/squad-creator.md`
- `@aiox-master`, `/aiox-master`, `/aiox-master.md` -> `.aiox-core/development/agents/aiox-master.md`
<!-- AIOX-MANAGED-END: shortcuts -->
