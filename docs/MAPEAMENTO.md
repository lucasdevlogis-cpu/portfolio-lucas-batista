# Mapeamento do repositório

> Inventário operacional. Entrada: [`CANON.md`](CANON.md) · arquitetura: [`ARQUITETURA.md`](ARQUITETURA.md) · atualizado em 20/07/2026.

## Stack

| Camada | Tecnologia |
|---|---|
| App pública | Next.js 16.2.10, React 19.2.4, TypeScript 5, Node 24 |
| Estilo | Tailwind CSS v4, tokens CSS-only, Source Serif 4 + Inter |
| UI | Base UI, shadcn/ui, Lucide, Framer Motion |
| Visualização âncora | ECharts 6 + MapLibre GL JS 5 |
| Demos complementares | Streamlit, Pandas, Plotly, Folium |
| QA | Playwright 14 testes, Lighthouse 13, smoke Streamlit 13 checagens |
| Deploy | Vercel + Streamlit Cloud |

## Áreas ativas

```text
app/
  page.tsx                     homepage
  provas/[slug]/page.tsx       3 rotas SSG de prova
components/
  sections/                    seções da landing
  demos/                       shell, KPI, gráfico, mapa, método e navegação
  ui/                          primitives e wrappers
data/
  content.ts                   SSOT de copy e cases
  demo-snapshots/              contrato gerado das 3 âncoras
design/
  tokens.json                  fonte editável dos tokens
  design.md                    direção visual
demos-logistica/
  pages/                       10 demos + página de métodos
  lib/                         UI, mapas, visualização e domínio
  scripts/                     datasets, snapshots, smoke e slugs
docs/
  audit/                       capturas, scripts e evidências
  archive/                     histórico não canônico
e2e/                           fluxos críticos Playwright
scripts/                       validação, geração e Lighthouse
```

## Componentes públicos

```text
HomePage
├── Header → MobileNav
├── ExecutiveHero
├── EvidenceStrip
├── ProfileBrief
├── SignatureCases
│   ├── CaseThumbnail
│   ├── CaseDemoLauncher → DemoModal (lazy)
│   ├── CaseLibrary
│   └── Roadmap
├── TrajectoryBoard
├── ContactPanel
├── Footer
└── BackToTop

DemoShell
├── DemoHero
├── KpiRow
├── ChartCard → import dinâmico de ECharts
├── MapCard → import dinâmico de MapLibre
├── MethodDisclosure
└── DemoNavigation
```

## Contagens canônicas

| Conjunto | Quantidade | Fonte |
|---|---:|---|
| Cases em `CONTENT.cases` | 11 | `data/content.ts` |
| Demos publicadas | 10 | `CASE_DEMO_SLUGS` |
| Âncoras React | 3 | `featuredProofCases` + snapshots |
| Complementares Streamlit | 7 | `CASES_BIBLIOTECA` |
| Roadmap sem demo | 1 | `06-kpis-cd` |

## Artefatos gerados

| Artefato | Comando | Commitar? |
|---|---|---|
| `app/design-tokens.css` | `npm run tokens:sync` | Sim |
| `demos-logistica/lib/brand.py` | `npm run tokens:sync` | Sim |
| `data/demo-snapshots/*.json` | `npm run demos:export` | Sim |
| `public/lucas-batista-cv.pdf` | `npm run cv:generate` | Sim |
| Lighthouse JSON local | `npm run lighthouse:all` | Não |
| Playwright report / test-results | `npm run test:e2e` | Não |

## Shelved

`components/archive/`, `data/archive/`, `design/archive/` e `docs/archive/` preservam histórico e não entram na montagem ativa.

## QA rápido

- 3 rotas `/provas/{slug}` respondem sem Streamlit.
- Âncora abre inline no modal; complementar abre em iframe `?embed=true`.
- Filtros anunciam resultados e não exibem categorias vazias.
- ESC, foco, links de contato, CV, robots, sitemap e OG permanecem funcionais.
- Capturas obrigatórias: 375, 768 e 1440 px.

---

*Atualize quando mudar stack, árvore ativa, artefatos gerados ou contagens.*
