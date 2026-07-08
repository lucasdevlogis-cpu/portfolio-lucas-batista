# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) — leia primeiro.
>
> **Checklist de prioridade:** [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md)
>
> **Última atualização:** 08/07/2026 — densificação visual, tipografia e sincronização de skills

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | `dpl_FVD4YzJtZ65waAx7rYmzcaYkSJXJ` — 08/07/2026 09:02 UTC-3 |
| **Lighthouse prod (desktop)** | **100 / 96 / 100 / 100** |
| **Lighthouse prod (mobile)** | **96 / 96 / 100 / 100** |

### Homepage (ordem DOM = nav)

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

### Componentes ativos

`Header`, `ExecutiveHero`, `EvidenceStrip`, `ProfileBrief`, `SignatureCases`, `CaseLibrary`, `CaseDemoLauncher`, `DemoModal`, `TrajectoryBoard`, `ContactPanel`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `EditorialBadge`, `PremiumCard`, `MetricPill`, `SectionShell`, `CaseThumbnail`, `BackToTop`, `MotionProvider`

### Arquivado (não montar)

| Pasta | Conteúdo |
|-------|----------|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `data/archive/content-consultoria.ts` | Copy shelved da landing comercial |
| `design/archive/` | Planos e specs históricos |

---

## Matriz de status (honesta)

| Área | Lançado | QA manual |
|------|:-------:|:---------:|
| Layout Executive Proof (redesign premium) | ✅ | ✅ prod |
| Demos Streamlit | ✅ | ✅ 13/13 smoke tests |
| Deploy Vercel | ✅ | ✅ prod `dpl_FVD4YzJtZ65waAx7rYmzcaYkSJXJ` |
| OG + CV PDF | ✅ | ✅ prod |
| Lighthouse | ✅ local | 🟡 a revalidar após deploy 08/07 |
| Documentação de agentes | ✅ | ✅ alinhada nesta rodada |
| MCPs do Cursor | 🟡 | 🟡 configurados com placeholders |

---

## Divergências documentadas (pós-auditoria)

| # | Divergência | Impacto | Plano |
|---|-------------|---------|-------|
| 1 | Cockpit SVG estático no hero gera expectativa de interatividade | UX | Decidir: tornar interativo, reduzir ou substituir por screenshot (P0) |
| 2 | ~~Seção Perfil ainda contém FAQ~~ | Densidade de texto | ✅ Resolvido: FAQ de triagem integrado ao Perfil (08/07) |
| 3 | Cards de provas mostram "Decisão apoiada" e "Limitação" | Escaneabilidade | ✅ Resolvido: campos exibidos de forma compacta (08/07) |
| 4 | `CaseLibraryDesktop` tem nome desktop-only | Mobile | ✅ Resolvido: renomeado para `CaseLibrary` com filtros mobile (08/07) |
| 5 | `MotionProvider` não usa `useReducedMotion()` | A11Y | ✅ Resolvido: `useReducedMotion()` integrado ao `MotionProvider` (08/07) |
| 6 | Filtros da biblioteca não anunciam resultado via `aria-live` | A11Y | ✅ Resolvido: `aria-live` presente no `CaseLibrary` (08/07) |
| 7 | Header não tem indicador de seção ativa | Navegação | ✅ Resolvido: `useActiveSection` + underline no link ativo (08/07) |
| 8 | Cards de provas não têm thumbnails/screenshots | Percepção de qualidade | `CaseThumbnail` implementado; placeholder SVG até capturas reais (P1) |
| 9 | Stack técnico em texto plano; poderia ser tags | Escaneabilidade | ✅ Resolvido: tags de stack no painel do hero e footer (08/07) |
| 10 | Analytics/Vercel Analytics não implementado | Medição | ✅ Parcial: eventos de clique em `lib/analytics.ts` (08/07) |

Detalhes e priorização completa: [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md).

---

## Performance (Lighthouse)

Scores pós-refinamento premium (2026-07-07):

| | Desktop | Mobile |
|---|--------:|-------:|
| **Local** (`next start`) | 100 / 96 / 100 / 100 | — |
| **Prod** (Vercel URL) | **100 / 96 / 100 / 100** | **96 / 96 / 100 / 100** |

Colunas: Performance / Acessibilidade / Best Practices / SEO. Meta lançamento: desktop Performance ≥ 90 ✅.

---

## Mudanças da última rodada (08/07/2026)

### Landing page

- **Densidade e tipografia revisadas**: fontes de corpo aumentadas (mínimo `text-sm`/14px em metadados, `text-base`/16px em leitura), espaçamentos verticais reduzidos (`py-14 lg:py-20`), cards mais compactos.
- **Hero redesenhado**: coluna de texto à esquerda + painel de credibilidade à direita com avatar, stack, empresas, provas e foco — elimina lacuna da foto placeholder.
- **Perfil**: card principal de direção de carreira + 4 diferenciais + FAQ de triagem do headhunter + faixa de credibilidade.
- **Cases**: cards âncora exibem problema, decisão apoiada, limitação declarada e métrica; biblioteca filtrável desktop/mobile; roadmap mantido.
- **Trajetória**: timeline, stack, impactos, experiências e formação/certificações/idiomas consolidados em cards mais densos.
- **Testes E2E**: 8/8 passando com Playwright contra build de produção.
- **Build**: `validate`, `lint`, `typecheck`, `build` passando; cache CSS limpo após rebuild.
- **Documentação**: `CANON.md`, `AVALIACAO.md`, `AGENTS.md`, `.codex/AGENTS.md`, `.agents/skills/*`, `docs/A11Y.md`, `docs/MOBILE_SPEC.md` e `docs/GAPS.md` sincronizados.

### Demos Streamlit

- Tokens de cor alinhados à landing (teal/warm-accent/ink).
- CSS premium em `lib/ui.py`: header escuro translúcido, KPI cards com hover, badges destacados, tabelas estilizadas.
- `lib/viz.py` e `lib/folium_maps.py` ajustados para novas cores e hoverlabels escuros.
- Páginas refinadas visualmente sem alterar lógica de negócio.
- Smoke test: **13/13 OK**.

### Documentação e agentes

- `.cursorrules` atualizado para refletir stack atual (Next.js 16, Tailwind v4, tokens editoriais, componentes atuais).
- Skills em `.agents/skills/` atualizadas: `design-system.md`, `component-patterns.md`, `ux-writing.md`, `a11y.md`, `mobile-first.md`, `accessibility.md`, `performance.md`, `seo-meta.md`.
- `.codex/AGENTS.md` atualizado com ordem canônica atual.
- `.cursor/mcp.json` configurado com placeholders + `.cursor/MCP_SETUP.md` com instruções.
- `.gitignore` atualizado para ignorar `.cursor/mcp.json` (pode conter tokens).
- Criado `docs/P0_P1_P2_CHECKLIST.md` com plano de refatoração progressiva.

---

## Pendências desejáveis

- Substituir foto placeholder em `public/profile.jpg` (P0)
- Capturas reais 16:9 para thumbnails dos cases (P1)
- `useReducedMotion` no MotionProvider (P1)
- Revalidar Lighthouse após ajustes de densidade (P1)
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

### Densificação visual e sincronização de skills — 08/07/2026

Redução de whitespace, aumento de fontes, preenchimento de blocos ociosos, rebuild limpo do Next.js para resolver cache CSS desatualizado, e atualização completa de skills e documentação. Testes E2E 8/8 passando.

### Auditoria de documentação e agentes — 07/07/2026

Atualização de `.cursorrules`, skills em `.agents/skills/`, `.codex/AGENTS.md`, configuração de MCPs e criação do checklist P0/P1/P2. Identificadas 10 divergências entre documentação e código a serem resolvidas nas próximas sprints.

### Redesign Premium + Deploy — 07/07/2026

Hero escuro, animações Framer Motion, paleta premium, grid denso no Perfil, timeline na Trajetória, cores por categoria nos Cases, demos Streamlit refinadas, deploy na Vercel com Lighthouse 100/96/100/100.

### Canonicalização — 06/07/2026 (tarde)

`docs/CANON.md` criado; ordem seções Perfil → Cases → Trajetória; copy comercial extraído para `data/archive/`; status honesto; agent docs alinhados.

### Executive Proof System — 06/07/2026

Pivot headhunter-first; landing comercial arquivada; Figma removido do fluxo.

---

*Documento vivo. Atualize após cada marco ou deploy.*
