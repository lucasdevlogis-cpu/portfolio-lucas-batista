# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) — leia primeiro.
>
> **Checklist de prioridade:** [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md)
>
> **Última atualização:** 13/07/2026 — consolidação de conteúdo e refatoração da seção Contato

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | `9FUG7tSarRquoDL66wRbnrBXMPHP` — 13/07/2026 18:25 UTC-3 |
| **Lighthouse prod (desktop)** | **a revalidar** |
| **Lighthouse prod (mobile)** | **a revalidar** |

### Homepage (ordem DOM = nav)

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

### Componentes ativos

`Header`, `ExecutiveHero`, `EvidenceStrip`, `ProfileBrief`, `SignatureCases`, `CaseLibrary`, `CaseDemoLauncher`, `DemoModal`, `TrajectoryBoard`, `ContactPanel`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `EditorialBadge`, `PremiumCard`, `MetricPill`, `SectionShell`, `CaseThumbnail`, `BackToTop`, `MotionProvider`

### Arquivado (não montar)

| Pasta | Conteúdo |
|-------|----------|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `components/archive/legacy/` | Componentes de iterações anteriores (excluídos do typecheck) |
| `data/archive/content-consultoria.ts` | Copy shelved da landing comercial |
| `design/archive/` | Planos e specs históricos |

---

## Matriz de status (honesta)

| Área | Lançado | QA manual |
|------|:-------:|:---------:|
| Layout Executive Proof (redesign premium) | ✅ | ✅ prod |
| Consolidação de conteúdo (Hero, Perfil, Trajetória, Contato) | ✅ | ✅ prod |
| Demos Streamlit | ✅ | ✅ 13/13 smoke tests |
| Deploy Vercel | ✅ | ✅ prod `9FUG7tSarRquoDL66wRbnrBXMPHP` |
| OG + CV PDF | ✅ | ✅ prod |
| Lighthouse | ✅ local | 🟡 a revalidar após deploy 13/07 |
| Documentação de agentes | ✅ | 🟡 parcial — skills em revisão |
| Testes E2E | ✅ | ✅ 8/8 passando |

---

## Divergências documentadas (pós-auditoria)

| # | Divergência | Impacto | Plano |
|---|-------------|---------|-------|
| 1 | Cockpit SVG estático no hero gera expectativa de interatividade | UX | Decidir: tornar interativo, reduzir ou substituir por screenshot (P0) |
| 2 | ~~Seção Perfil ainda contém FAQ~~ | Densidade de texto | ✅ Resolvido: FAQ removido; copy enxuta nos diferenciais (13/07) |
| 3 | Cards de provas mostram "Decisão apoiada" e "Limitação" | Escaneabilidade | ✅ Resolvido: campos exibidos de forma compacta (08/07) |
| 4 | ~~`CaseLibraryDesktop` tem nome desktop-only~~ | Mobile | ✅ Resolvido: renomeado para `CaseLibrary` com filtros mobile (08/07) |
| 5 | ~~`MotionProvider` não usa `useReducedMotion()`~~ | A11Y | ✅ Resolvido: `useReducedMotion()` integrado ao `MotionProvider` (08/07) |
| 6 | Filtros da biblioteca não anunciam resultado via `aria-live` | A11Y | ✅ Resolvido: `aria-live` presente no `CaseLibrary` (08/07) |
| 7 | Header não tem indicador de seção ativa | Navegação | ✅ Resolvido: `useActiveSection` + underline no link ativo (08/07) |
| 8 | Cards de provas não têm thumbnails/screenshots | Percepção de qualidade | `CaseThumbnail` implementado; placeholder SVG até capturas reais (P1) |
| 9 | Stack técnico em texto plano; poderia ser tags | Escaneabilidade | ✅ Resolvido: tags de stack no painel do hero e footer (08/07) |
| 10 | Analytics/Vercel Analytics não implementado | Medição | ✅ Parcial: eventos de clique em `lib/analytics.ts` (08/07) |
| 11 | Redundâncias de copy em Hero, EvidenceStrip, Trajetória e Contato | Clareza | ✅ Resolvido: cada informação aparece em um único lugar (13/07) |
| 12 | Seção Contato com blocos de texto grandes antes da ação | UX | ✅ Resolvido: CTAs em cards prioritários, texto reduzido (13/07) |

Detalhes e priorização completa: [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md).

---

## Performance (Lighthouse)

Scores a serem revalidados após deploy de 13/07/2026:

| | Desktop | Mobile |
|---|--------:|-------:|
| **Local** (`next start`) | — | — |
| **Prod** (Vercel URL) | **a revalidar** | **a revalidar** |

Colunas: Performance / Acessibilidade / Best Practices / SEO. Meta lançamento: desktop Performance ≥ 90 ✅.

---

## Mudanças da última rodada (13/07/2026)

### Landing page

- **Consolidação de conteúdo**: cada informação (anos, impacto, stack, domínios, impactos por empresa) agora aparece em apenas um lugar.
- **Hero**: painel lateral simplificado para stack tags e empresas; métricas e domínios removidos do cockpit para evitar duplicação com `EvidenceStrip` e `ProfileBrief`.
- **EvidenceStrip**: reduzido para 3 métricas distintas (`+10 anos`, `+R$ 20M impacto`, `10 demos`).
- **Perfil**: 3 diferenciais compactos, domínios como tags, sem FAQ.
- **Trajetória**: layout limpo em 1 coluna, sem narrativa genérica ou stack duplicado; impactos por empresa como badges dentro dos cards de experiência.
- **Contato**: refatorado com hierarquia de ação — CTAs em cards clicáveis com touch target amplo, manifesto reduzido e metadados compactos.
- **CV PDF**: script de export/geração atualizado para nova estrutura de experiências.
- **TypeScript**: `components/archive/**` excluído do typecheck para evitar que componentes legacy/shelved quebrem builds.
- **Testes E2E**: 8/8 passando com Playwright contra build de produção.
- **Build**: `validate`, `lint`, `typecheck`, `build` passando.

### Demos Streamlit

- Sem alterações nesta rodada.
- Smoke test: **13/13 OK** (última verificação anterior).

### Documentação e agentes

- `docs/AVALIACAO.md` atualizado com status pós-consolidação.
- Pendências de documentação: revisão alinhada das skills em `.agents/skills/` com o estado atual da landing.

---

## Pendências desejáveis

- Substituir foto placeholder em `public/profile.jpg` (P0)
- Capturas reais 16:9 para thumbnails dos cases (P1)
- Revalidar Lighthouse após ajustes de conteúdo (P1)
- Revisar e consolidar skills em `.agents/skills/` (P1)
- Domínio custom / Vercel Analytics (P2)
- Backlog demos: [`docs/OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md)

---

## Fases

| Fase | Progresso | Pendências |
|------|-----------|------------|
| 0 Setup | ✅ | — |
| 1 Landing Executive Proof | ✅ | — |
| 2 Demos | ✅ | — |
| 3 GitHub | ✅ | READMEs em `demos-logistica/docs/cases/` |
| 4 Deploy | ✅ | QA manual |
| 5 Lançamento | ✅ | CV gerado de content.ts |
| 6 Refatoração P0/P1/P2 | 🟡 | Ver `docs/P0_P1_P2_CHECKLIST.md` |

---

## URLs

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

## Verificação

```bash
npm run validate && npm run lint && npm run typecheck && npm run build
npm run cv:generate
npx playwright test

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

---

## Documentação

| Doc | Propósito |
|-----|-----------|
| [`docs/CANON.md`](CANON.md) | **Entrada única** — SSOT docs |
| [`docs/MAPEAMENTO.md`](MAPEAMENTO.md) | Estado completo do repositório |
| `docs/AVALIACAO.md` | Este arquivo |
| [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md) | Plano de refatoração progressiva |
| `design/design.md` | Spec visual ativa |
| `design/tokens.md` | Tokens CSS resumidos |
| `docs/VERCEL.md` | Vercel, env, checklist QA |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `docs/OPORTUNIDADES_DEMOS.md` | Backlog demos |
| `AGENTS.md` | Guia para agentes Cursor |
| `.cursorrules` | Regras Cursor (auto-load) |
| `.codex/AGENTS.md` | Guia Codex |
| `.cursor/MCP_SETUP.md` | Configuração dos MCPs |

---

## Histórico

### Consolidação de conteúdo e refatoração do Contato — 13/07/2026

Remoção de redundâncias entre Hero, EvidenceStrip, Perfil, Trajetória e Contato; seção Contato reorganizada com CTAs prioritários e copy enxuta; testes E2E atualizados e 8/8 passando.

### Densificação visual e sincronização de skills — 08/07/2026

Redução de whitespace, aumento de fontes, preenchimento de blocos ociosos, rebuild limpo do Next.js para resolver cache CSS desatualizado, e atualização completa de skills e documentação. Testes E2E 8/8 passando.

### Auditoria de documentação e agentes — 07/07/2026

Atualização de `.cursorrules`, skills em `.agents/skills/`, `.codex/AGENTS.md`, configuração de MCPs e criação do checklist P0/P1/P2. Identificadas 10 divergências entre documentação e código a serem resolvidas nas próximas sprints.

### Redesign Premium + Deploy — 07/07/2026

Hero escuro, animações Framer Motion, paleta premium, grid denso no Perfil, timeline na Trajetória, cores por categoria nos Cases, demos Streamlit refinadas, deploy na Vercel com Lighthouse 100/96/100/100.

### Canonicalização — 06/07/2026 (tarde)

`docs/CANON.md` criado; ordem seções Perfil → Cases → Trajetória; copy comercial extraída para `data/archive/`; status honesto; agent docs alinhados.

### Executive Proof System — 06/07/2026

Pivot headhunter-first; landing comercial arquivada; Figma removido do fluxo.

---

*Documento vivo. Atualize após cada marco ou deploy.*
