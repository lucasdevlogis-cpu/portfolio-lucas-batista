# Qualidade

## Corte visual — Executivo Brutalista Refinado (P0 concluído)

O redesign “Executivo Brutalista Refinado” foi aceito em 25/07/2026 e está
pronto para merge na `main`. O aceite cobriu comparação visual em 375, 768 e
1440 px, revisão das três âncoras, Lighthouse do preview e gates locais. O
preview isolado permanece publicado apenas como referência; nenhuma promoção
para produção foi feita.

## Corte local — Executivo Brutalista Refinado

Rodada final de 25/07/2026 na branch `agent/redesign-executivo-brutalista`:

| Evidência                                    | Resultado                              |
| -------------------------------------------- | -------------------------------------- |
| `npm run build`                              | aprovado; 10 rotas estáticas           |
| `npm run test:e2e`                           | 17/17                                  |
| `npm run demos:smoke`                        | 13/13                                  |
| `npm audit --audit-level=moderate`           | 0 vulnerabilidades                     |
| capturas Playwright em 375, 768 e 1440 px    | landing, modal e 3 âncoras aprovados   |
| comparação referência × implementação 335 px | revisada no mesmo artefato lado a lado |
| Lighthouse desktop                           | 100/100/100/100                        |
| Lighthouse mobile                            | 92/100/100/100                         |

O passe visual encontrou e corrigiu dois problemas antes do aceite: conteúdo
de `Reveal` invisível com `prefers-reduced-motion` e compressão de CTAs das
provas no breakpoint de 1024 px. Todos os gates do P0 foram validados e o
merge foi autorizado.

## Preview Vercel — redesign

Deployment `dpl_71b9Zcfu9amkjomZYHPwk5kmw8Ly`, publicado em 21/07/2026 sem
promover para produção:

| Evidência                     | Resultado                                 |
| ----------------------------- | ----------------------------------------- |
| Vercel                        | target `preview`, estado `Ready`          |
| homepage, prova e OG          | HTTP 200                                  |
| `npm run qa:visual`           | fluxo completo e 3 viewports aprovados    |
| Lighthouse desktop do preview | 100/100/100; SEO 69 informativo           |
| Lighthouse mobile do preview  | 92/100/100; SEO 69 informativo            |
| proteção                      | Shareable Link temporário, não versionado |

O SEO do preview protegido não participa do gate porque a Vercel aplica
`noindex` deliberadamente. O gate de produção continua exigindo pelo menos 90
nas quatro categorias. O preview foi aceito como referência visual do P0.

## Gate técnico

| Área                    | Comando                            | Critério               |
| ----------------------- | ---------------------------------- | ---------------------- |
| Arquitetura e contratos | `npm run validate`                 | zero erro              |
| TypeScript              | `npm run typecheck`                | zero erro              |
| React/Next              | `npm run lint`                     | zero erro              |
| Python                  | `npm run lint:python`              | zero erro              |
| Unidade Python          | `npm run demos:test`               | 6/6                    |
| Runtime Streamlit       | `npm run demos:smoke`              | 13/13                  |
| Build                   | `npm run build`                    | todas as rotas geradas |
| Navegação real          | `npm run test:e2e`                 | suíte completa verde   |
| Dependências            | `npm audit --audit-level=moderate` | 0 vulnerabilidades     |

`npm run verify` cobre contratos, lint, tipos, pytest e build. Smoke e E2E
continuam separados para deixar a intenção explícita.

## Última execução local

Rodada de 26/07/2026 após a instrumentação privacy-first das provas:

| Evidência                          | Resultado                                      |
| ---------------------------------- | ---------------------------------------------- |
| `npm run verify`                   | aprovado; pytest 58/58 e build com 17 páginas  |
| `npm run demos:validate`           | 10 snapshots React válidos                     |
| `npm run demos:smoke`              | 13/13                                          |
| `npm run test:e2e`                 | 36/36; 6/6 específicos de analytics            |
| `npm run qa:visual`                | landing, modais e provas em 375, 768 e 1440 px |
| `npm run qa:streamlit`             | 12 superfícies desktop do laboratório          |
| Lighthouse desktop                 | 100/100/100/100                                |
| Lighthouse mobile local            | 92/100/100/100                                 |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                             |

O passe local anterior da P1.7 oscilou abaixo do gate, mas a rodada final desta
entrega atingiu 92 em performance mobile sem mudança de limiar ou exceção.

## Registro histórico público — antes do fechamento da P1

Rodada de 21/07/2026 após o merge e o deploy Vercel. Este bloco preserva a
evidência do estágio híbrido anterior; não descreve a arquitetura pública atual:

| Evidência              | Resultado                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| CI `Quality` na `main` | verde; contratos, build, smoke, audit e 17 E2E                   |
| Vercel                 | produção `Ready`; homepage, SEO e 3 rotas de prova respondem 200 |
| `npm run qa:visual`    | landing, modal e âncoras aprovados em 375, 768 e 1440 px         |
| Lighthouse desktop     | 100/100/100/100                                                  |
| Lighthouse mobile      | mediana 96/100/100/100 em 3 execuções                            |
| `npm run qa:streamlit` | nova origem aprovada: 12 rotas desktop e 7 embeds mobile         |
| Modal complementar     | iframe e nova aba apontam para a origem canônica                 |

A nova aplicação Streamlit foi validada diretamente no Community Cloud. Não
houve exceção, rota divergente ou regressão de layout nas 19 capturas. A landing
foi recompilada após a troca de `NEXT_PUBLIC_DEMOS_BASE_URL`, e o modal público
confirmou o novo domínio em iframe e nova aba.

## Aceite visual

Validar no mínimo:

|   Viewport | Uso                                 |
| ---------: | ----------------------------------- |
|  375 × 812 | celular estreito, modal e navegação |
| 768 × 1024 | tablet e transição de grid          |
| 1440 × 900 | desktop executivo                   |

Telas obrigatórias: hero, perfil, provas, modal de prova, rotas públicas,
trajetória e contato.

Critérios:

- sem overflow horizontal, texto truncado indevido ou CTA inacessível;
- hierarquia clara sem excesso de cards, badges, sombras ou gradientes;
- estados de loading e erro legíveis;
- gráficos com tooltip e legenda, sem paleta arco-íris;
- linhas de referência não achatam a série;
- mapa tem atribuição, foco útil e limitação declarada;
- movimento respeita `prefers-reduced-motion`.
- referência e implementação são comparadas lado a lado no mesmo viewport;
- Hanken Grotesk, Inter e JetBrains Mono carregam sem salto visual indevido;
- laranja indica ação e verde não é usado como decoração;
- Streamlit e rotas React compartilham tokens, apesar de terem runtimes distintos.

## Acessibilidade

- um único `<main id="conteudo">` por rota e skip link funcional;
- H1 único, headings sem saltos e landmarks nomeados;
- foco visível, ordem lógica, `ESC` fecha dialogs;
- touch targets de pelo menos 44 × 44 px;
- contraste WCAG AA: 4,5:1 para texto normal e 3:1 para texto grande/UI;
- ícones decorativos com `aria-hidden`;
- conteúdo de gráfico disponível em `aria-label` textual;
- nenhuma informação depende apenas de cor.

## Performance

- ECharts, MapLibre, modal e Analytics devem permanecer lazy;
- conteúdo acima da dobra não depende de animação cliente;
- imagens abaixo da dobra usam lazy loading;
- meta Lighthouse: pelo menos 90 nas quatro categorias em desktop e mobile;
- metas de campo: LCP < 2,5 s, CLS < 0,1 e INP < 200 ms.

## Migrações P1 — provas complementares para React

### P1.1 — Promessa de Entrega por CEP

Mergeado em 25/07/2026. Rota pública `/provas/promessa_cep` consome
`contracts/demo-snapshots/promessa_cep.json`. Modal da homepage renderiza a
prova inline sem iframe Streamlit.

| Evidência                          | Resultado          |
| ---------------------------------- | ------------------ |
| `npm run verify`                   | aprovado           |
| `npm run demos:validate`           | aprovado           |
| `npm run demos:smoke`              | 13/13              |
| `npm run test:e2e`                 | 19/19              |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades |

### P1.2 — Ship from Store / Origem Ótima

Mergeado em 25/07/2026. Rota pública `/provas/ship_from_store` consome
`contracts/demo-snapshots/ship_from_store.json`, com mapa de fluxos origem→destino.
Modal da homepage renderiza a prova inline sem iframe Streamlit.

| Evidência                          | Resultado                   |
| ---------------------------------- | --------------------------- |
| `npm run verify`                   | aprovado                    |
| `npm run demos:validate`           | 5 snapshots React válidos   |
| `npm run demos:smoke`              | 13/13                       |
| `npm run test:e2e`                 | 21/21                       |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades          |
| `npm run qa:streamlit`             | 12 desktop + 7 mobile-embed |

### P1.3 — Rede inter-hubs / Corredores

Concluído em 25/07/2026 pela PR #14. A rota pública
`/provas/rede_interhubs` consome
`contracts/demo-snapshots/rede_interhubs.json`; o modal da homepage renderiza
a prova inline sem iframe Streamlit. O mapa de rede torna corredores clicáveis
e usa largura proporcional ao volume.

| Evidência                          | Resultado                                |
| ---------------------------------- | ---------------------------------------- |
| `npm run verify`                   | aprovado                                 |
| `npm run demos:validate`           | 6 snapshots React válidos                |
| `npm run demos:smoke`              | 13/13                                    |
| `npm run test:e2e`                 | 23/23                                    |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                       |
| QA visual Playwright               | rota desktop/mobile + modal aprovados    |
| Browser integrado                  | indisponível por `missing sandboxPolicy` |

### P1.4 — VRPTW / Última milha com janelas

Concluído em 25/07/2026 pela PR #15. A rota pública
`/provas/vrptw_ultima_milha` consome
`contracts/demo-snapshots/vrptw_ultima_milha.json`; o modal da homepage
renderiza a prova inline sem iframe Streamlit. O visual temporal separa janela
prometida e chegada, enquanto o mapa registra a sequência e o SLA de cada
parada.

| Evidência                          | Resultado                              |
| ---------------------------------- | -------------------------------------- |
| `npm run verify`                   | aprovado                               |
| `npm run demos:validate`           | 7 snapshots React válidos              |
| `npm run demos:smoke`              | 13/13                                  |
| `npm run test:e2e`                 | 25/25                                  |
| pytest                             | 17/17                                  |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                     |
| QA visual Playwright               | rota desktop/mobile + modal aprovados  |
| comparação operacional             | baseline 3 violações → EDF 0 violações |

### P1.5 — Auditoria de Endereço

Concluído em 25/07/2026 pela PR #16. A rota pública
`/provas/auditoria_endereco` consome
`contracts/demo-snapshots/auditoria_endereco.json`; o modal da homepage
renderiza a prova inline sem iframe Streamlit. A prova explicita 15 bloqueios,
30 revisões e 15 endereços aptos; o mapa mostra 45 coordenadas válidas e mantém
visível a exclusão dos 15 bloqueados fora dos limites territoriais.

| Evidência                          | Resultado                                |
| ---------------------------------- | ---------------------------------------- |
| `npm run verify:full`              | aprovado                                 |
| `npm run demos:validate`           | 8 snapshots React válidos                |
| `npm run demos:smoke`              | 13/13                                    |
| `npm run test:e2e`                 | 27/27                                    |
| pytest                             | 33/33                                    |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                       |
| QA visual Playwright               | rota desktop/mobile + modal aprovados    |
| cobertura territorial              | 45 exibidos · 15 bloqueados fora do mapa |

### P1.6 — TSP / Sequência de Visitas

Concluído em 25/07/2026 pela PR #17. A rota pública
`/provas/tsp_baseline_sp` consome
`contracts/demo-snapshots/tsp_baseline_sp.json`; o modal da homepage renderiza
a prova inline sem iframe Streamlit. O gráfico compara cadastro, NN e NN+2-opt;
o mapa mantém somente a sequência final numerada, com retorno ao CD.

| Evidência                          | Resultado                                 |
| ---------------------------------- | ----------------------------------------- |
| `npm run verify`                   | aprovado                                  |
| `npm run demos:validate`           | 9 snapshots React válidos                 |
| `npm run demos:smoke`              | 13/13                                     |
| `npm run test:e2e`                 | 29/29                                     |
| pytest                             | 47/47                                     |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                        |
| QA visual Playwright               | rota desktop/mobile + modal aprovados     |
| comparação operacional             | 34,5 km → 31,5 km → 28,0 km · redução 19% |

### P1.7 — Classificador de Ocorrências / Governança Humana

Concluído em 26/07/2026. A rota pública
`/provas/classificador_ocorrencias` consome
`contracts/demo-snapshots/classificador_ocorrencias.json`; o modal da homepage
renderiza a prova inline e encerra o fallback público por iframe. O domínio usa
regras determinísticas com limites de palavra, sinaliza empate e ausência de
termo e mantém zero decisões autônomas.

| Evidência                          | Resultado                                       |
| ---------------------------------- | ----------------------------------------------- |
| `npm run verify`                   | aprovado                                        |
| `npm run demos:validate`           | 10 snapshots React válidos                      |
| `npm run demos:smoke`              | 13/13                                           |
| `npm run test:e2e`                 | 30/30                                           |
| pytest                             | 58/58; 11/11 específicos da P1.7                |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                              |
| QA visual Playwright               | modal e rota em 375, 768 e 1440 px aprovados    |
| QA Streamlit                       | 12 superfícies desktop do laboratório aprovadas |
| governança                         | 10 textos · 10/10 categorias · 0 decisões       |

A inspeção visual encontrou e corrigiu o corte do rótulo “Endereço Incorreto”
no gráfico horizontal antes do aceite.

### P2.1 — Instrumentação privacy-first das provas

Concluída em 26/07/2026 no código. O contrato usa três eventos — abertura,
engajamento e CTA — com exatamente duas propriedades controladas. Engajamento
exige 30 segundos acumulados com aba visível e janela em foco; a aplicação não
envia duração, texto livre, contato, URL, query, identificador ou dados das
provas.

| Evidência                          | Resultado                                   |
| ---------------------------------- | ------------------------------------------- |
| `npm run verify:full`              | aprovado                                    |
| `npm run test:e2e`                 | 36/36; analytics 6/6                        |
| `npm run demos:smoke`              | 13/13                                       |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                          |
| `npm run qa:visual`                | 375, 768 e 1440 px aprovados                |
| Lighthouse desktop                 | 100/100/100/100                             |
| Lighthouse mobile                  | 92/100/100/100                              |
| privacidade                        | slug + superfície/ação; query e hash limpos |

Pageviews agregadas permanecem disponíveis quando Vercel Analytics está
habilitada. A coleta dos três custom events depende da capacidade do plano do
provedor; o código e os testes não exigem contratação, e o dashboard não será
declarado operacional sem evidência remota.

### P2.2 — Comparativo por decisão e método

Concluído em 26/07/2026. O antigo índice das sete provas complementares foi
substituído por um mapa de decisão com as dez provas públicas. A projeção é
montada no servidor pelo join catálogo → conteúdo → snapshot, mantém três
âncoras antes das sete complementares e envia ao componente cliente apenas os
campos necessários à comparação e à abertura do modal.

| Evidência                          | Resultado                              |
| ---------------------------------- | -------------------------------------- |
| `npm run verify:full`              | aprovado                               |
| `npm run demos:validate`           | 10 snapshots e join editorial válidos  |
| `npm run demos:smoke`              | 13/13                                  |
| `npm run test:e2e`                 | 40/40; comparação e analytics cobertos |
| pytest                             | 58/58                                  |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                     |
| `npm run qa:visual`                | landing e modais em 375, 768 e 1440 px |
| `npm run qa:streamlit`             | 12 superfícies desktop do laboratório  |
| Lighthouse desktop                 | 100/96/100/100                         |
| Lighthouse mobile                  | 92/96/100/100                          |

A inspeção visual confirmou leitura editorial no mobile, alvos de toque de no
mínimo 44 px, ausência de overflow e uso de divisores em vez de uma galeria de
cards. Os filtros e suas contagens são derivados dos domínios publicados; não
foi criada uma segunda taxonomia.

O baseline público aceito desta refatoração é 100/100/100/100 em desktop e
96/100/100/100 em mobile, usando a mediana de três execuções. Resultados locais
continuam como evidência rápida de regressão; a origem Streamlit canônica também
passou no gate visual público.

## Evidências

```powershell
npm run qa:visual
npm run qa:streamlit
npm run lighthouse:all
```

Para produção, defina `QA_BASE_URL`, `STREAMLIT_QA_BASE_URL` e
`LIGHTHOUSE_URL` conforme o runbook em `OPERACAO.md`.

Capturas e JSON ficam em `.artifacts/qa/` e `.artifacts/lighthouse/`. Não
commitar resultados binários. Os scripts de captura limpam somente o próprio
diretório de saída antes da execução para evitar evidência obsoleta.
