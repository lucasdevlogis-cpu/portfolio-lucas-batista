# MAPEAMENTO — Portfólio Lucas Batista

> Estado completo do repositório após consolidação de conteúdo e refatoração da seção Contato (julho/2026).
> Última atualização: 13/07/2026.

---

## 1. Repositório e branches

| Item | Valor |
|------|-------|
| Repositório | `lucasdevlogis-cpu/portfolio-lucas-batista` |
| Branch principal | `main` |
| Branch de feature (a ser deletada após merge) | `redesign/premium-desktop` |
| Branch remota obsoleta | `origin/copilot/analisar-projeto-ui-ux` |
| Deploy target | Vercel — `portfolio-lucas-batista-murex.vercel.app` |
| Deploy atual | `9FUG7tSarRquoDL66wRbnrBXMPHP` — 13/07/2026 |

### Histórico recente

```
1836291 organiza documentação e corrige testes após refatoração do Contato
ffd5d0c refatora seção Contato: hierarquia, dimensão e ação prioritária
5ec35d6 consolida conteúdo: remove redundâncias em Trajetória, Hero, Profile e Contato
... (histórico completo em docs/CANON.md e docs/AVALIACAO.md)
```

---

## 2. Stack e dependências

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16.2.9 (App Router) |
| React | 19.2.4 |
| TypeScript | 5.x |
| Bundler | Turbopack |
| Estilo | Tailwind CSS v4 (`app/globals.css`) |
| UI base | shadcn/ui (`components/ui/`) |
| Animação | Framer Motion 12.x (`LazyMotion` + `domAnimation`) |
| Ícones | Lucide React |
| Fontes | Inter (corpo) + Source Serif 4 (títulos) |

### Scripts principais

```bash
npm run validate          # valida cases e slugs
npm run lint              # ESLint 9
npm run typecheck         # tsc --noEmit
npm run build             # prebuild (validate + typecheck) + next build
npm run test:e2e          # Playwright — 8 testes
npm run cv:generate       # exporta content.ts → PDF
npm run seo:generate      # gera sitemap.xml e robots.txt
```

---

## 3. Estrutura de componentes

### Ativos (montados em `components/HomePage.tsx`)

```
Header
└── ExecutiveHero
EvidenceStrip
ProfileBrief
SignatureCases
└── CaseDemoLauncher → DemoModal (lazy)
└── CaseLibrary
TrajectoryBoard
ContactPanel
Footer
BackToTop
```

| Componente | Path | Função |
|------------|------|--------|
| `Header` | `components/Header.tsx` | Nav fixa, CTA contato |
| `ExecutiveHero` | `components/sections/ExecutiveHero.tsx` | Hero escuro, nome, posicionamento, CTAs, painel com stack e empresas |
| `EvidenceStrip` | `components/sections/EvidenceStrip.tsx` | 3 métricas principais com ícones |
| `ProfileBrief` | `components/sections/ProfileBrief.tsx` | Perfil em 60s, senioridade, 3 diferenciais, domínios como tags |
| `SignatureCases` | `components/sections/SignatureCases.tsx` | 3 cases âncora em grid |
| `CaseLibrary` | `components/sections/CaseLibrary.tsx` | Biblioteca filtrável de cases (desktop + mobile) |
| `CaseThumbnail` | `components/CaseThumbnail.tsx` | Thumbnail SVG dos cases |
| `CaseDemoLauncher` | `components/CaseDemoLauncher.tsx` | Botão + lazy load do modal de demo |
| `DemoModal` | `components/DemoModal.tsx` | Modal com iframe Streamlit |
| `TrajectoryBoard` | `components/sections/TrajectoryBoard.tsx` | Timeline de experiências, formação, certificações, idiomas |
| `ContactPanel` | `components/sections/ContactPanel.tsx` | CTAs de contato em cards, manifesto e metadados compactos |
| `Footer` | `components/Footer.tsx` | Rodapé |

### Primitivos de UI

```
components/ui/
├── button.tsx, card.tsx, dialog.tsx, badge.tsx  # shadcn/ui
├── PremiumCard.tsx      # card com gradient border
├── MetricPill.tsx       # mini métrica visual
└── EditorialBadge.tsx   # badge de categoria/seção
```

### Providers

```
components/providers/
└── MotionProvider.tsx   # LazyMotion + MotionConfig + useReducedMotion
```

### Layout

```
components/layout/
└── SectionShell.tsx     # wrapper de seção (tone, padding, id)
```

### Arquivados (não montados)

```
components/archive/
├── consultoria/             # landing comercial antiga
├── legacy/                  # componentes pré-redesign (excluídos do typecheck)
│   ├── Hero.tsx
│   ├── Cases.tsx
│   ├── ProfileSection.tsx
│   ├── TrajectorySection.tsx
│   ├── Contato.tsx
│   ├── AnimatedSection.tsx
│   ├── CaseCard.tsx
│   ├── CaseLibraryInteractive.tsx
│   ├── SectionHeader.tsx
│   ├── EditorialDarkPanel.tsx
│   └── LogisticsIntelligenceCockpit.tsx
└── ui/
    ├── FadeIn.tsx
    ├── GlassCard.tsx
    └── Stagger.tsx
```

---

## 4. Fonte da verdade (SSOT)

| Domínio | Fonte |
|---------|-------|
| Copy ativo | `data/content.ts` |
| Cases / slugs / links demo | `data/content.ts` (`CASE_DEMO_SLUGS`, `featuredProofCases`) |
| Tokens visuais | `app/globals.css` + `design/tokens.md` |
| Spec visual | `design/design.md` |
| CV PDF | gerado de `content.ts` via `npm run cv:generate` |

---

## 5. Demos Streamlit

- Pasta: `demos-logistica/`
- 10 cases demonstráveis + 1 roadmap
- Smoke test: `python scripts/smoke_test.py` (meta 13/13)
- URL: `https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app`

---

## 6. Deploy

### Vercel

- Projeto: `portfolio-lucas-batista`
- Team: `lucasdevlogis-5294s-projects`
- Framework: Next.js
- Build command: padrão (`npm run build`)
- Output directory: padrão (`.next/`)
- Env vars obrigatórias: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL`

### Streamlit Cloud

- Repo separado: `lucasdevlogis-cpu/demos-logistica`
- Sync manual via `robocopy` (ver `docs/DEPLOY.md`)

---

## 7. Checklist de QA / E2E

- [x] `npm run validate` OK
- [x] `npm run lint` OK
- [x] `npm run typecheck` OK
- [x] `npm run build` OK
- [x] `npm run cv:generate` OK
- [x] `npx playwright test` OK — 8/8 passando
- [x] Homepage carrega na URL de produção
- [x] Seções visíveis: Hero, Evidence, Perfil, Cases, Trajetória, Contato
- [x] Nav scrolla para âncoras corretas
- [x] 3 cases âncora + biblioteca filtrável + roadmap
- [x] Modal de demo abre com iframe Streamlit
- [x] "Abrir em nova aba" no modal funciona
- [x] LinkedIn, email, GitHub e CV PDF na seção Contato
- [x] `/robots.txt` e `/sitemap.xml` acessíveis
- [x] `/lucas-batista-cv.pdf` acessível
- [x] `/og-image.jpg` acessível
- [ ] Lighthouse mobile ≥ 90 (a revalidar)

---

## 8. Artefatos de auditoria

Localizados em `docs/audit/`:

- `Redesign Premium Desktop.docx` — brief do redesign
- `screenshots/site-atual-full.png` — baseline
- `screenshots/site-redesign-final.png` — resultado final
- `screenshots/site-redesign-full.png`
- `screenshots/site-redesign-v2-full.png`
- `screenshots/view-*-desktop.png` — recortes por seção

---

## 9. Documentação ativa

| Doc | Função |
|-----|--------|
| `docs/CANON.md` | Entrada única — SSOT docs |
| `docs/MAPEAMENTO.md` | Este arquivo — estado completo |
| `docs/AVALIACAO.md` | Snapshot de saúde, fases, histórico |
| `docs/P0_P1_P2_CHECKLIST.md` | Plano de refatoração progressiva |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `docs/VERCEL.md` | Operação e auditoria Vercel |
| `docs/A11Y.md` | Guia de acessibilidade |
| `docs/MOBILE_SPEC.md` | Spec mobile-first |
| `design/design.md` | Spec visual ativa |
| `design/tokens.md` | Tokens CSS |
| `AGENTS.md` | Guia para agentes |

---

*Documento vivo. Atualize após cada deploy ou reestruturação significativa.*
