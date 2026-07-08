# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) — leia primeiro.
>
> **Checklist de prioridade:** [`docs/P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md)
>
> **Última atualização:** 07/07/2026 — auditoria de documentação e agentes

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | `dpl_AeSkethQEEq4UasUAQgVXhEXNUHV` — 07/07/2026 18:16 UTC-3 |
| **Lighthouse prod (desktop)** | **100 / 96 / 100 / 100** |
| **Lighthouse prod (mobile)** | **96 / 96 / 100 / 100** |

### Homepage (ordem DOM = nav)

`Header` → `ExecutiveHero` → `EvidenceStrip` → `ProfileBrief` → `SignatureCases` → `TrajectoryBoard` → `ContactPanel` → `Footer`

### Componentes ativos

`Header`, `ExecutiveHero`, `EvidenceStrip`, `ProfileBrief`, `SignatureCases`, `CaseLibraryDesktop`, `CaseDemoLauncher`, `DemoModal`, `TrajectoryBoard`, `ContactPanel`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `EditorialBadge`, `PremiumCard`, `SectionShell`, `LogisticsIntelligenceCockpit`, `MotionProvider`

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
| Deploy Vercel | ✅ | ✅ prod `dpl_AeSkethQEEq4UasUAQgVXhEXNUHV` |
| OG + CV PDF | ✅ | ✅ prod |
| Lighthouse | ✅ local | ✅ prod desktop 100/96/100/100, mobile 96/96/100/100 |
| Documentação de agentes | ✅ | ✅ alinhada nesta rodada |
| MCPs do Cursor | 🟡 | 🟡 configurados com placeholders |

---

## Divergências documentadas (pós-auditoria)

| # | Divergência | Impacto | Plano |
|---|-------------|---------|-------|
| 1 | Cockpit SVG estático no hero gera expectativa de interatividade | UX | Decidir: tornar interativo, reduzir ou substituir por screenshot (P0) |
| 2 | Seção Perfil ainda contém FAQ "Perguntas que este perfil responde" | Densidade de texto | Remover FAQ, distribuir conteúdo nos cards (P1) |
| 3 | Cards de provas mostram "Decisão apoiada" (texto denso) | Escaneabilidade | Mover "Decisão apoiada" para o modal apenas (P0/P1) |
| 4 | `CaseLibraryDesktop` tem nome desktop-only e layout de tabela em mobile | Mobile | Renomear para `CaseLibrary` e criar layout de lista mobile (P1) |
| 5 | `MotionProvider` não usa `useReducedMotion()` | A11Y | Adicionar respeito a prefers-reduced-motion (P1) |
| 6 | Filtros da biblioteca não anunciam resultado via `aria-live` | A11Y | Adicionar região live (P1) |
| 7 | Header não tem indicador de seção ativa | Navegação | Implementar scroll spy (P1) |
| 8 | Cards de provas não têm thumbnails/screenshots | Percepção de qualidade | Adicionar imagens 16:9 das demos (P0) |
| 9 | Stack técnico em texto plano; poderia ser tags | Escaneabilidade | Converter para badges por categoria (P1) |
| 10 | Analytics/Vercel Analytics não implementado | Medição | Adicionar eventos básicos (P2) |

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

## Mudanças da última rodada (07/07/2026)

### Landing page

- **Hero redesenhado com fundo escuro** (`bg-surface-dark`) para alto impacto visual e contraste.
- **Header fixo escuro translúcido** com texto branco e CTA em teal vibrante.
- **Paleta premium atualizada**: teal `#16a99c`, warm accent `#d4a853`, ink `#07111f`, editorial `#f7f4ec`.
- **Animações Framer Motion** em todas as seções: fade + slide up, stagger, hover lift, scale em cards e botões.
- **Perfil**: layout denso sem lacunas — card de senioridade em destaque + grid de diferenciais + faixa de credibilidade.
- **Cases**: cards com cores de categoria, ícones em gradiente, hover elevado.
- **Trajetória**: timeline vertical conectada, cards de stack/dominios balanceados, experiências e formação em cards visuais.
- **Contato**: mantido em superfície escura para consistência com o hero.
- **Fundo com grid sutil** nas seções claras para textura e sofisticação.

### Demos Streamlit

- Tokens de cor alinhados à landing (teal/warm-accent/ink).
- CSS premium em `lib/ui.py`: header escuro translúcido, KPI cards com hover, badges destacados, tabelas estilizadas.
- `lib/viz.py` e `lib/folium_maps.py` ajustados para novas cores e hoverlabels escuros.
- Páginas refinadas visualmente sem alterar lógica de negócio.
- Smoke test: **13/13 OK**.

### Documentação e agentes

- `.cursorrules` atualizado para refletir stack atual (Next.js 16, Tailwind v4, tokens editoriais, componentes atuais).
- Skills em `.agents/skills/` atualizadas: `design-system.md`, `component-patterns.md`, `ux-writing.md`, `a11y.md`, `mobile-first.md`, `accessibility.md`.
- `.codex/AGENTS.md` atualizado com ordem canônica atual.
- `.cursor/mcp.json` configurado com placeholders + `.cursor/MCP_SETUP.md` com instruções.
- `.gitignore` atualizado para ignorar `.cursor/mcp.json` (pode conter tokens).
- Criado `docs/P0_P1_P2_CHECKLIST.md` com plano de refatoração progressiva.

---

## Pendências desejáveis

- Resolver cockpit do hero (P0)
- Thumbnails nos cards de provas (P0)
- Indicador de seção ativa no Header (P1)
- `useReducedMotion` no MotionProvider (P1)
- Renomear `CaseLibraryDesktop` → `CaseLibrary` + mobile (P1)
- Analytics/Vercel Analytics (P2)
- Testes E2E (P2)
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
