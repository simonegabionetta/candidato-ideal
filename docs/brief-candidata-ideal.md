# Brief do Projeto - Candidata Ideal

## Visão geral

Candidata Ideal é uma aplicação web pessoal para transformar uma vaga de emprego em um processo guiado de candidatura. O usuário cola o link da vaga e o sistema usa agentes de IA para pesquisar a empresa, decidir se vale aplicar, preparar posicionamento, gerar currículos, treinar entrevista comportamental e treinar entrevista técnica.

O foco principal do produto é a inteligência dos agentes. A interface deve ser simples, objetiva e voltada para conduzir o usuário pelas fases sem distração.

## Problema

Buscar emprego exige pesquisar empresa, entender cultura, adaptar currículo, abordar recrutadores, preparar respostas comportamentais e estudar tópicos técnicos. Esse trabalho costuma ser manual, repetitivo e desorganizado, o que reduz a qualidade das candidaturas e dificulta aprender com tentativas anteriores.

## Objetivo

Criar um sistema que ajude uma pessoa a conduzir candidaturas com mais estratégia, usando IA para:

- analisar a vaga e a empresa antes da candidatura;
- decidir se vale aplicar;
- posicionar o usuário como candidato ideal;
- gerar materiais de candidatura;
- preparar entrevistas comportamentais e técnicas;
- registrar histórico e melhorar recomendações com base nos resultados.

## Público inicial

Uso pessoal e individual: uma pessoa processando uma vaga por vez.

## Escopo inicial

O MVP deve conter:

1. Projeto Next.js com TypeScript e App Router.
2. API Routes no próprio projeto.
3. Supabase configurado com as tabelas `aplicacoes` e `fases`.
4. Página principal para inserir link da vaga e acompanhar fases.
5. Página de histórico e métricas.
6. Agente da fase 1 para varredura e decisão.
7. Agente da fase 2 para atenção e posicionamento.
8. Agente da fase 3 para candidatura e geração de currículos Word.
9. Agente da fase 4 para preparação comportamental.
10. Agente da fase 5 para preparação técnica.

## Fora do escopo inicial

- Produto multiusuário.
- Marketplace de currículos.
- CRM completo de recrutamento.
- Automação de envio de candidatura em sites externos.
- Interface complexa ou marketing site.

## Stack definida

- Next.js com TypeScript e App Router.
- API Routes para backend interno.
- Vercel AI SDK para agentes.
- Supabase para banco de dados.
- Geração de documento Word para currículos.
- Deploy na Vercel.

## Estrutura lógica desejada

- `frontend`: páginas e componentes.
- `backend`: API routes e lógica dos agentes.
- `supabase`: schema, migrations e configuração das tabelas.

No Next.js, essa separação pode ser representada por pastas internas como `app`, `components`, `features`, `lib`, `server` e `supabase`, mantendo a lógica organizada sem lutar contra o App Router.

## Fases do produto

### Fase 1 - Varredura e decisão

Entrada: link da vaga.

O agente pesquisa a vaga e a empresa, incluindo descrição, requisitos, modelo de negócio, produtos, finanças, cultura real, liderança, notícias, riscos, oportunidades, posts recentes e camadas estratégica, tática e operacional.

Saída: DNA da empresa e decisão APLICAR ou NÃO APLICAR com justificativa.

### Fase 2 - Atenção e posicionamento

Entrada: DNA da empresa.

O agente gera mensagem para recrutador, estratégia de conexão no LinkedIn, comentário em post, post de posicionamento, ajustes no LinkedIn e narrativa da candidata ideal.

Gate manual: "Recebi sinal de interesse".

### Fase 3 - Candidatura e currículo

Entrada: DNA da empresa, perfil do usuário e narrativa da fase 2.

O agente gera currículo ATS, currículo humanizado, mensagem de candidatura, mini cover letter, pontos para reforçar e pontos para suavizar.

Gate manual: "Fui chamada para entrevista".

### Fase 4 - Entrevista comportamental

Entrada: tudo que foi gerado até a fase 3.

O agente prepara tom de comunicação, postura, persona comportamental, perguntas prováveis, respostas STAR, simulação com feedback, roteiro das 24 horas antes da entrevista e follow-up.

Gate manual: "Passei na comportamental".

### Fase 5 - Entrevista técnica

Entrada: requisitos técnicos da vaga.

O agente aplica Pareto para identificar os tópicos técnicos mais importantes, gerar plano de estudo, perguntas com respostas, exercícios práticos, simulação técnica e checklist final.

## Modelo de dados inicial

### `aplicacoes`

- `id`
- `empresa`
- `cargo`
- `link_vaga`
- `data_inicio`
- `fase_atual`
- `fase_mais_avancada`
- `resultado`
- `criado_em`

### `fases`

- `id`
- `aplicacao_id`
- `numero_fase`
- `nome_fase`
- `status`
- `resultado_ia`
- `passou`
- `iniciado_em`
- `concluido_em`

## Princípios de produto

- Interface simples e funcional.
- Cada fase deve ter objetivo e saída claros.
- O sistema deve explicar como executar cada recomendação.
- A ordem comportamental antes de técnica deve ser mantida.
- O histórico deve alimentar novas recomendações.

## Riscos e pontos de atenção

- Varredura real da empresa depende de ferramentas de busca e acesso confiável a fontes externas.
- Dados de LinkedIn e Glassdoor podem ter restrições de acesso.
- A geração de currículo precisa evitar inventar experiências do usuário.
- A decisão APLICAR ou NÃO APLICAR precisa ser explicável e baseada em critérios claros.
- O produto deve preservar dados pessoais do usuário com cuidado.

## Próximo passo

Criar a story da Fase 1 de implementação: setup do projeto, estrutura de pastas, dependências base e preparação do Supabase.
