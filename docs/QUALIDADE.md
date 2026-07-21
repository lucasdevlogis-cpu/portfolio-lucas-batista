# Qualidade

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

Rodada de 21/07/2026, após a consolidação arquitetural e os ajustes de CI:

| Evidência                          | Resultado                                     |
| ---------------------------------- | --------------------------------------------- |
| `npm run verify`                   | aprovado; pytest 6/6 e build com 10 rotas     |
| `npm run demos:smoke`              | 13/13                                         |
| `npm run test:e2e`                 | 17/17 no Chromium                             |
| `npm run qa:visual`                | landing, modal e 3 âncoras em 3 viewports     |
| `npm run qa:streamlit`             | 12 rotas desktop e 7 complementares em mobile |
| `npm run lighthouse:all`           | baseline local desktop 100/100/100/100        |
| Lighthouse mobile                  | baseline local 93/100/100/100                 |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades                            |

## Última execução pública

Rodada de 21/07/2026 após o merge e o deploy Vercel:

| Evidência              | Resultado                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| CI `Quality` na `main` | verde; contratos, build, smoke, audit e 17 E2E                   |
| Vercel                 | produção `Ready`; homepage, SEO e 3 rotas de prova respondem 200 |
| `npm run qa:visual`    | landing, modal e âncoras aprovados em 375, 768 e 1440 px         |
| Lighthouse desktop     | 100/100/100/100                                                  |
| Lighthouse mobile      | 99/100/100/100                                                   |
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

Telas obrigatórias: hero, perfil, provas, modal âncora, modal Streamlit, rota de
cada âncora, trajetória e contato.

Critérios:

- sem overflow horizontal, texto truncado indevido ou CTA inacessível;
- hierarquia clara sem excesso de cards, badges, sombras ou gradientes;
- estados loading, timeout, erro e mobile gate do iframe legíveis;
- gráficos com tooltip e legenda, sem paleta arco-íris;
- linhas de referência não achatam a série;
- mapa tem atribuição, foco útil e limitação declarada;
- movimento respeita `prefers-reduced-motion`.

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

O baseline público aceito desta refatoração é 100/100/100/100 em desktop e
99/100/100/100 em mobile. Resultados locais continuam como evidência rápida de
regressão; a origem Streamlit canônica também passou no gate visual público.

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
