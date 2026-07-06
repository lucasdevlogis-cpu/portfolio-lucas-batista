# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio antes dos próximos passos. Consulte após cada fase ou deploy significativo.
>
> **Última atualização:** 06/07/2026 — **Pass editorial v3** (Hero, Cases, DemoModal). Pass anterior: Continuação Fase 3 embed Streamlit.

---

## Pass editorial v3 — 06/07/2026 (Hero, Cases, DemoModal)

Execução do plano "Refatoração visual editorial". North star: **briefing de operações** — tipografia forte, layout assimétrico, sensação de relatório executivo (não landing template).

### Referências e spec

- **`design/references-editorial.md`:** Stripe Press, Linear, padrões usar/evitar.
- **`design/figma-v3-editorial-frames.md`:** spec high-fidelity (Hero 1440, Case briefing `2:31`, Cases section, DemoModal `3:15`).

### Landing — componentes editoriais

- **`components/editorial/`:** `EditorialHero`, `BriefStrip`, `SectionLead`, `BriefingCaseCard`, `CaseBriefingGrid`, `CaseLibraryRow`, `CategoryTabs`, `DemoBriefingModal`.
- **Hero:** 2 colunas desktop (narrativa + brief strip); mobile stack headhunter 60s; **sem grade decorativa**, **sem pill blur**, eyebrow tipográfico.
- **Cases:** destaques assimétricos (1 featured + 2 compact); biblioteca em **lista editorial**; filtros **tabs underline**; roadmap em lista simples.
- **DemoModal:** faixa 2 colunas pergunta/decisão; métrica tipográfica; contexto colapsável no mobile; iframe lazy preservado.
- **Tokens:** `--prose-width`, `--brief-width`, utilities `.text-display`, `.text-lede`, `.text-eyebrow` em `globals.css`.
- **`CaseCard`:** wrapper deprecated sobre `BriefingCaseCard`.

### QA

- **Build:** `npm run lint && npm run build` OK (local).
- **Lighthouse mobile:** não re-medido neste pass (CLI EPERM no ambiente); baseline produção **93** performance — sem `backdrop-blur` novo no hero editorial.
- **Diff visual 3 vias:** pendente pós-deploy (prod vs local vs spec Figma).

### Próximo passo

- ~~Deploy Vercel~~ ✅ commit `1f71590` → produção **READY** em `portfolio-lucas-batista-murex.vercel.app` (06/07/2026).
- Re-medir Lighthouse mobile (meta ≥ 94) — PageSpeed API quota esgotada no ambiente do agente.
- Screenshot diff Hero/Cases/Modal após revisão visual no browser.

### Revert pass editorial v3 — 06/07/2026

O pass editorial (`1f71590`) **regrediu o layout** em produção (hero, cases assimétricos, biblioteca em lista). **Revertido** para `Hero`, `Cases`, `CaseCard` e `DemoModal` do commit `12d3873`. A pasta `components/editorial/` permanece no repo mas **não está em uso** até nova spec visual aprovada.

---

- **Landing:** push `1f71590` → `origin/main` → Vercel `dpl_HXuLvrkzW82bYY4jMcxvC7eTPFkY` **READY**.
- **Smoke HTTP:** produção retorna hero editorial (brief strip, eyebrow tipográfico), cases assimétricos e biblioteca em lista.
- **Lighthouse:** não re-medido (quota PageSpeed API); baseline anterior mobile **93** performance.

---

## Continuação Fase 3 — 06/07/2026

Itens pendentes do plano de elevação de design executados nesta sessão:

### Streamlit — embed em todas as pages

- **`filter_container()` + `breadcrumb()`** propagados às pages **04–09** (antes só 01–03). Pages **07, 10, 11** receberam breadcrumb (sem filtros sidebar).
- **`kpi_grid()`** propagado às pages **04–10** (grade 2×2 no embed; antes só 01–03).
- **VRPTW (05):** `st.spinner("Simulando rotas e janelas...")` no solver, alinhado ao CVRP.

### Landing — polish

- **Hero:** badge com ícone `Route` (logística) em vez de `Sparkles`.
- **`CaseCard`:** linha de triagem `{categoria} · {metricaResumo}`; categoria duplicada removida.
- **Sobre:** parágrafo intermediário removido (menos densidade).

### Documentação

- **`design/design.md`:** matriz de paridade landing ↔ Streamlit + link Figma v2.
- **`AGENTS.md`:** link Figma v2 + referência a `.cursor/rules/figma-mcp.mdc`.
- **FigJam:** jornadas criadas — [Jornada headhunter 60s](https://www.figma.com/board/oo6IohJkFVx2jYnenXMlC5) · [Jornada embed demo](https://www.figma.com/board/iOesutJfRKn3HxB4Mm5lc3).

### QA

- **Build:** `npm run lint && npm run build` OK.
- **Smoke demos:** 13/13.
- **Lighthouse produção (pré-deploy deste pass):** Desktop **100/100/100/100** em `portfolio-lucas-batista-murex.vercel.app`. Mobile não re-medido neste pass (recomendado pós-deploy com as mudanças locais).

### Deploy e QA pós-push — 06/07/2026

- **Landing:** push `caa057f` → `origin/main` → Vercel produção OK (conteúdo novo visível: triagem `categoria · métrica`, Sobre enxuto, selo Serviços).
- **Demos:** sync → `lucasdevlogis-cpu/demos-logistica` commit `2476cd4` (Streamlit Cloud redeploy).
- **Testes locais:** `npm run lint` OK · `npm run build` OK · `validate-cases` 10+1 OK · smoke demos **13/13**.
- **Lighthouse produção pós-deploy:**
  - Desktop: **97 / 100 / 100 / 100**
  - Mobile: **93 / 100 / 100 / 100** (LCP **2,9 s** — meta performance ≥ 94: **1 ponto abaixo**)
- **HTTP smoke URLs:** landing + 3 demos destaque (`?embed=true`) → **200 OK**.

---

## Pass de elevação de design — 06/07/2026 (B2B + headhunter, Figma como spec)

Execução do "Plano de Elevação de Design". Direção: evoluir a identidade navy/teal (sem rebrand), servindo **dois públicos** — decisor B2B e headhunter em triagem rápida. Figma usado como spec visual (arquivo `Portfolio Lucas — Design System v2`, key `857tvb7je0mJctJWYujqG7`): coleção `Tokens` (23 variáveis com code syntax WEB) + frames de referência (paleta, CaseCard slim, ProfileStrip headhunter, KPI row Streamlit, DemoModal).

### Landing Next.js

- **Tokens de seção escura** (`app/globals.css`): `--surface-dark`, `--surface-dark-2/3`, `--text-on-dark`, `--text-on-dark-muted`, `--text-on-dark-accent`. Novo componente **`DarkSection`** encapsula fundo navy + glow radial + grade — fonte única para Hero/Método/IA. Removido todo hex hardcoded (`#122845`, `#16304f`, `#0f2038`, `text-teal-200/300`).
- **`CaseCard` slim:** densidade reduzida — categoria, título, **linha de triagem `domínio · métrica`** (novo campo `metricaResumo` em `data/content.ts`) e pergunta de negócio; descrição, decisão, métrica longa e tags migraram para o `DemoModal`.
- **Escada de Serviços:** conector alinhado aos números; nível recomendado (`recomendado` em `Servico`) com anel accent, número teal e selo "Porta de entrada mais procurada".
- **Camada headhunter:** Hero com identidade (nome + título) e contato (LinkedIn/email) acima da dobra; `Sobre` escaneável (ferramentas agrupadas em Dados/Análise/Apps/IA via `ferramentasGrupos`, selo de `disponibilidade`, LinkedIn/email diretos); LinkedIn no Header (desktop + mobile).
- **A11y:** skip link em `layout.tsx`; `aria-current="page"` no nav ativo; `aria-invalid`/`aria-describedby` no formulário; animações de `Dores`/`Servicos` corrigidas (fade real no `initial`).
- **DemoModal:** no mobile o iframe carrega **sob demanda** (botão "Carregar demo aqui") — contexto de negócio primeiro, menos scroll-in-scroll.

### Demos Streamlit

- **UX de embed** (`lib/ui.py`): `filter_container()` move filtros para um `st.expander` aberto no topo quando `?embed=true` (a sidebar fica escondida no iframe); nav multipage ocultada no embed; `breadcrumb()` de contexto; `kpi_grid()`/`kpi_row()` responsivos em 2×2 no embed.
- **Bugs:** `folium_maps.add_points` agora consulta `STATUS_COLORS` **e** `SEVERITY_COLORS` (mapa da torre voltou a colorir por status); fonte **Inter** carregada via `@import` no CSS; `config.toml` `primaryColor` alinhado ao navy `#1e3a5f`; deps mortas removidas (`streamlit-echarts`, `streamlit-aggrid`).
- **3 demos destaque** (01 frete, 02 torre, 03 CVRP) adotam os helpers; CVRP com `st.spinner` no solver (percepção de produto).
- **Nota POC:** em vez de adicionar `streamlit-facade` (nova dependência que duplicaria `brand.py` e arriscaria o smoke), o preset navy-teal foi mantido nativo em `brand.py` — o objetivo do POC (tokens consistentes cross-surface) já está atendido.

### Documentação e regras

- `.cursor/rules/figma-mcp.mdc` (alwaysApply) com mapa de tokens Figma→CSS/Python e fluxo por componente.
- `design/design.md` §2 atualizado com os tokens de seção escura.

**Build:** `npm run build` OK; TypeScript limpo; `npm run lint` OK. **Smoke demos:** 13/13. **Lighthouse:** não re-rodado neste pass (mudanças sem `backdrop-blur` novo nem assets pesados; recomendado re-medir pós-deploy).

---

## Pass de melhoria — 05/07/2026 (redesign desktop-first + conversão)

Revisão pedida como "revisor sênior de UX/UI, marketing B2B e portfólio". Foco: impacto no navegador (desktop), clareza, conversão e honestidade. **Sem `output: export`; deploy Vercel nativo.**

### Conteúdo / conversão (`data/content.ts`)

- **Honestidade de dados:** removida a inconsistência "dados reais" na seção Sobre → **"dados sintéticos inspirados em problemas reais de operação"**. Padronizado em hero, Sobre e subtítulo de cases.
- **Hero mais direto:** headline "Clareza para decidir custo, prazo e frete na sua operação"; subheadline curta e escaneável.
- **Cases reorganizados:** 3 **cases em destaque** (`CASE_DESTAQUE_IDS`: frete, torre/SLA, CVRP) + **Biblioteca de análises** filtrável com os demais 7; roadmap mantido. Removido o jargão `P0/P1/P2` dos badges → `Destaque` / `Demo interativa`.
- **Serviços como ofertas compráveis:** interface `Servico` agora tem `paraQuem`, `quandoContratar`, `entregas`, `exemplo`; copy reescrita nos 5 níveis.
- **CTA final:** microcopy de baixo atrito (`Resposta em até 1 dia útil. Sem compromisso e sem custo inicial.`); título/descrição enxutos; benefício em caixa accent.
- Eyebrows por seção (`SecaoCopy.eyebrow`, `IaConteudo.eyebrow`).

### Visual / design (desktop-first)

- **Hero escuro** (`Hero.tsx`): fundo navy com gradiente + glow teal + grade sutil mascarada; headline branca grande; CTAs grandes (primário teal); **barra de provas** integrada na base (fim do layout que deixava metade direita vazia < 1024px).
- **Contraste de página:** **Método** e **IA** viraram faixas escuras navy (quebram a monotonia branca). `SectionDivider` removido ao redor dessas faixas escuras.
- **SectionHeader:** eyebrow com risco accent + títulos maiores; suporte a `tone="dark"`.
- **Cards:** destaque com gradiente/ring/shadow + bloco "Decisão apoiada"; `PainPointCard` com hover lift + barra accent; botões maiores (hero, header, cases, contato).

### Infra

- **ESLint:** `demos-logistica/**` adicionado a `globalIgnores` (o `.venv` empacota JS gigante que estourava a memória do lint). `npm run lint` volta a passar (~7s).

**Build:** `npm run build` OK; TypeScript limpo. **Lint:** OK. **Validate:** 10 demonstráveis + 1 roadmap.

---

## Resumo executivo

| Área | Status | Nota |
|------|--------|------|
| Landing page (código) | ✅ Completa | 10 seções (incl. Sobre); build + lint OK |
| Cases | ✅ Completo | **10 demonstráveis** + 1 roadmap (`06-kpis-cd`); filtro por 6 categorias |
| Demos Streamlit (código) | ✅ Completa | **11 pages** + `lib/` compartilhada; smoke **13/13** |
| UX demos Streamlit | ✅ Padronizado | `hero`, `section`, `plot`, `sidebar_brand`; home com cards navegáveis |
| Deploy produção | ✅ No ar | Vercel + Streamlit Cloud funcionando |
| Conteúdo / credibilidade | ✅ OK | Email, LinkedIn e GitHub configurados |
| SEO assets | ✅ OK | `public/og-image.png` (1200×630) e `app/icon.png` |
| Formulário de leads | 🟡 Parcial | Formspree integrado; sem ID usa fallback `mailto` |
| Documentação | ✅ Enxuta | `AVALIACAO.md` + `DEPLOY.md` |
| Lighthouse | ✅ Aprovado | Desktop 100/100/100/100; Mobile 94/100/100/100 (produção) |

**Veredicto:** revisão visual/layout concluída. Pronto para divulgação após **Formspree**.

---

## Pass de melhoria — 05/07/2026 (manhã)

- Documentação enxugada: removidos docs de scaffolding (`INDEX`, `VISION`, `ARCHITECTURE`, `PROMPTS`, etc.). Essencial de posicionamento migrou para o `README.md`.
- Assets de SEO criados (`public/og-image.png`, `app/icon.png`).
- Cases: modelo distingue demonstráveis (`CASE_DEMO_SLUGS`) de roadmap; `CaseCard` e `DemoModal` enriquecidos.
- Visual: Hero com card de provas, seção Sobre, `prefers-reduced-motion` respeitado.
- Formulário: fallback `mailto` quando Formspree não está configurado.

## Pass de melhoria — 05/07/2026 (tarde)

### Demos Streamlit (`demos-logistica/`)

- **`lib/ui.py`:** `hero()`, `section()`, `plot()` (modebar off), `sidebar_brand()`, `nav_link()`, CSS ampliado.
- **`.streamlit/config.toml`:** `toolbarMode = "minimal"` para embed mais limpo.
- **11 pages** com esqueleto padronizado: hero → sidebar → KPIs → mapas/gráficos → tabela + download → expanders → footer.
- **`app.py`:** mapa herói (rede inter-hubs) + grade de cards navegáveis (Profundas / Pontuais).
- **Dados:** `data/raw/` + `scripts/build_datasets.py` (seed fixa) + `scripts/smoke_test.py` (13/13 OK).

### Site Next.js

- **4 novos cases** na landing: CVRP, VRPTW, Rede Inter-hubs, TSP.
- **Corrigidos** `04-ship-from-store` e `05-auditoria-endereco` (links de demo vazios).
- Nova categoria **`Rede e Estratégia`**; ícones `Network` e `Waypoints`.
- **`DemoModal`:** link "Abrir em nova aba" (URL sem `?embed=true`).

### Mapeamento case → demo

Arquivo `pages/08_ship_from_store.py` → URL `/ship_from_store` (Streamlit remove o prefixo numérico).

| Case ID | Arquivo page | URL embed |
|---------|--------------|-----------|
| `01-precificacao-frete` | `01_precificacao_frete.py` | `/precificacao_frete` |
| `02-torre-controle` | `02_mini_torre_controle.py` | `/mini_torre_controle` |
| `03-promessa-cep` | `04_promessa_cep.py` | `/promessa_cep` |
| `04-ship-from-store` | `08_ship_from_store.py` | `/ship_from_store` |
| `05-auditoria-endereco` | `10_auditoria_endereco.py` | `/auditoria_endereco` |
| `07-classificador-ocorrencias` | `07_classificador_ocorrencias.py` | `/classificador_ocorrencias` |
| `08-cvrp-urbano` | `03_cvrp_urbano.py` | `/cvrp_urbano` |
| `09-vrptw-ultima-milha` | `05_vrptw_ultima_milha.py` | `/vrptw_ultima_milha` |
| `10-rede-interhubs` | `06_rede_interhubs.py` | `/rede_interhubs` |
| `11-tsp-baseline-sp` | `09_tsp_baseline_sp.py` | `/tsp_baseline_sp` |

## Pass de melhoria — 05/07/2026 (noite)

### Landing (Visual e UX)

- **Hero:** badge "Consultor em Inteligência Logística" agora com ícone `Sparkles` (Lucide); CTA secundário "Ver cases demonstráveis" com ícone `ArrowDown`; fundo com mesh gradient (`bg-slate-50` → `bg-gradient-to-br` com stops sutis) para quebrar o cinza plano.
- **Seção Sobre:** avatar inicial com gradiente `from-primary to-accent` e sombra; mini-timeline com 3 bullets (ícones `Clock`, `BarChart3`, `FileSpreadsheet`); lista de ferramentas em badges `variant="secondary"`.
- **Footer:** badge "10 cases demonstráveis" com ícone `Star`; botão "Voltar ao topo" com ícone `ArrowUp`; links rápidos com `underline underline-offset-4` + ícone `ArrowUpRight` para indicar navegação interna.

**Commit:** `085226c` — `fix(footer): adiciona underline e icone ArrowUpRight nos links rapidos`

---

## Validação de modais — 05/07/2026 (noite)

Teste automatizado dos 10 modais de demo via Kimi WebBridge.

| # | Case | Modal | Nova aba | GitHub | Iframe | Status |
|---|------|:-----:|:--------:|:------:|:------:|:------:|
| 1 | Simulador de Custo de Frete | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 2 | Mini Torre de Controle | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 3 | Promessa de Entrega por CEP | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 4 | Ship from Store | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 5 | Auditoria de Endereço | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 6 | Classificador de Ocorrências | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 7 | Roteirização Urbana (CVRP) | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 8 | Última Milha com Janelas (VRPTW) | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 9 | Rede Inter-hubs / Corredores | ✅ | ✅ | ✅ | ✅ | **APROVADO** |
| 10 | Sequência de Visitas (TSP) | ✅ | ✅ | ✅ | ✅ | **APROVADO** |

**Resultado: 10/10 cases aprovados.**

---

## Pass de melhoria — 05/07/2026 (revisão visual/layout)

### Landing Next.js

- **Tokens visuais:** `ring` agora usa accent `#0d9488`; adicionado `--accent-contrast: #0a7369`; removidos aliases `--color-brand-primary/accent` duplicados.
- **Hero:** card de provas com fundo sólido, borda e sombra mais fortes (sem `backdrop-blur` para preservar performance); gap entre texto e card reduzido; mesh gradient mantido sutil.
- **Cases:** grid passou a usar `lg:grid-cols-3`; cards do roadmap com mais respiro (`p-5 gap-5`) e tipografia maior.
- **IA:** título em negrito consistente com as outras seções; grid de ícones corrigido para `lg:grid-cols-3`; cards com hover/elevação via CSS.
- **Método:** maior gap entre passos e setas maiores no mobile.
- **Sobre:** avatar responsivo (`size-24` mobile → `size-28` lg).
- **Cards:** `CaseCard` badge P2 agora usa tom de primary; tags com `text-xs` mínimo; `PainPointCard` e `ServiceCard` com hover/escala padronizado.
- **Footer:** animação de entrada sutil; botão "Voltar ao topo" integrado à barra de copyright.
- **Modal:** contexto de negócio com fundo mais visível; iframe mobile usa `60vh` com `max-h-[500px]`; botão fechar do Dialog maior.
- **Dividers:** linha brand entre seções brancas mais visível (`h-6`, opacidade 16%).

### Demos Streamlit

- **`lib/ui.py`:** CTA final reescrito como `st.container(border=True)` (card real); removido seletor CSS global de border-radius que afetava todos os containers.
- **`lib/folium_maps.py`:** `add_routes()` reusa uma única `PolyLine`; `add_flows()` adiciona `LayerControl`; exposto `icon_for` público.
- **`lib/tables.py`:** emojis para `Crítico`, `Atenção`, `OK`, `Violou SLA`; colunas de texto com `width` padrão; `format_dataframe()` usa `width="stretch"`.
- **Padronização cross-page:** KPIs fora das tabs (page 04); method/provenance/CTA fora das tabs (pages 06, 09); KPI rows convertidos para cards (`kpi_metric`); alturas de mapas/gráficos alinhadas; margens de donuts ajustadas; Gantt com altura dinâmica; tabela de exportação da page 10 reduzida para menos scroll horizontal.

**Build:** `npm run build` OK; lint OK (escopo do projeto).
**Smoke test demos:** 13/13 OK.

---

## Pass de melhoria — 05/07/2026 (final)

### Demos Streamlit — upgrade visual

- **`pages/06_rede_interhubs.py`:**
  - Mapa migrado para Folium (`lib/folium_maps.add_network`) com ícones de hub, popups por lane e espessura das arestas proporcional ao volume.
  - Layout reorganizado em `st.tabs(["Visão Geral", "Análise", "Exportar"])`.
  - Gráficos com alturas padronizadas (`brand.CHART_HALF_HEIGHT`), linhas de referência e hovertemplate formatado (`lib.format.fmt_hover`).
  - Tabela de corredores via `lib.tables.format_dataframe`.
  - CTA final `ui.demo_cta(next_demo_path="pages/07_classificador_ocorrencias.py")`.

- **`pages/09_tsp_baseline_sp.py`:**
  - Mapa migrado para Folium (`lib.folium_maps.add_routes`) com marcadores numerados e setas de direção.
  - Layout em tabs; gráfico de comparação com cores semânticas e linha de referência do baseline.
  - Tabela de sequência via `lib.tables.format_dataframe`.
  - CTA final `ui.demo_cta(next_demo_path="pages/10_auditoria_endereco.py")`.

- **Helpers:** `lib/folium_maps.py` corrigido para preservar o nome do ícone ao recolorir marcadores; `lib/tables.py` usa `width="stretch"`.

**Smoke test:** 13/13 OK.

---

## URLs de produção

| Serviço | URL |
|---------|-----|
| Landing (Vercel) | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos (Streamlit) | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

## O que está funcionando

- **Build local:** `npm run build` passa (Next.js 16.2.9, Turbopack).
- **Lint:** `npm run lint` passa.
- **Deploy Vercel:** Next.js nativo (`.next/`), Output Directory vazio.
- **Demos:** URLs Streamlit embutidas no bundle quando `NEXT_PUBLIC_DEMOS_BASE_URL` está definida **no build**.
- **Footer:** badge "10 cases demonstráveis" com ícone `Star`, botão "Voltar ao topo" com `ArrowUp`, links rápidos com `underline` + ícone `ArrowUpRight`.
- **Validação de cases (automatizada):** 10/10 modais de demo testados via WebBridge.
- **Smoke test demos:** `python scripts/smoke_test.py` → 13/13 checagens OK (inclui cenário de filtro vazio na page 02).
- **Carregamento resiliente de dados:** `ui.load_csv()` mostra instrução amigável se um CSV não existe.
- **DemoModal:** estado de carregamento/erro, CTA "abrir em tela cheia" no mobile e `DialogDescription` para acessibilidade.
- **Navegação:** scroll suave, menu mobile (Sheet), Intersection Observer para nav ativa.
- **Cases:** 10 cards demonstráveis com filtro; modal com contexto de negócio + iframe + link nova aba.
- **SEO:** meta tags, OG, JSON-LD, favicon, `robots.txt`, `sitemap.xml`.
- **Acessibilidade:** `prefers-reduced-motion` respeitado.

---

## Pendências (para fechar o lançamento)

| # | Ação | Onde | Status |
|---|------|------|--------|
| 1 | Configurar `NEXT_PUBLIC_FORMSPREE_FORM_ID` + redeploy | Dashboard Vercel | 🟡 Pendente |
| 2 | Confirmar preview do `og-image.png` no LinkedIn/WhatsApp | — | 🟡 Pendente |

### Lighthouse (05/07/2026, local `next start`)

Após correção das falhas de contraste (`text-accent` → tom acessível `#0a7369`), os audits locais passaram na meta.

#### Desktop (`--preset=desktop`)

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 100 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals desktop: FCP 0,3 s · LCP 0,7 s · TBT 0 ms · CLS 0.

#### Mobile (`--form-factor=mobile`)

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 94 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals mobile: FCP 1,2 s · LCP 2,9 s · TBT 80 ms · CLS 0.

O LCP mobile (2,9 s) fica levemente acima do ideal (2,5 s), mas o score de Performance (94) atende à meta. A revisão visual priorizou equilíbrio entre aparência e performance: o card de provas do Hero ganhou destaque sem `backdrop-blur` e as animações do footer/IA cards foram mantidas só quando não penalizam a hidratação.

### Lighthouse em produção (05/07/2026, `https://portfolio-lucas-batista-murex.vercel.app`)

Após o deploy do commit `13e5f94`, os scores de produção atenderam às metas em ambos os dispositivos.

#### Desktop

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 99 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals desktop: FCP 0,7 s · LCP 0,7 s · TBT 0 ms · CLS 0.

#### Mobile

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 94 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals mobile: FCP 1,2 s · LCP 2,9 s · TBT 80 ms · CLS 0.

Possíveis ganhos futuros: pré-carregar fonte Inter, lazy-load de seções abaixo da dobra e reduzir hidratação do Framer Motion.

---

## Backlog (desejável)

- Vercel Analytics
- Domínio custom / alias estável
- READMEs por case no repo demos
- Migrar `scattermapbox` → `scattermap` (Plotly deprecation)
- Campo "limite" no tipo `Servico`

---

## Estado das fases

| Fase | Progresso | Pendências |
|------|-----------|------------|
| 0 Setup | ✅ 100% | — |
| 1 Landing | ✅ 100% | — |
| 2 Demos | ✅ 100% | push repo demos separado |
| 3 GitHub | 🟡 ~40% | READMEs por case |
| 4 Deploy | ✅ ~95% | Formspree env; validação cases OK |
| 5 Lançamento | 🟡 | Formspree, analytics, domínio (Lighthouse ✅) |

---

## Comandos de verificação

```bash
# Site
npm run validate       # integridade dos cases (slug ↔ page ↔ 10 cases); roda no prebuild
npm run build          # dispara prebuild (validate) antes do next build
npm run lint
npm run dev            # localhost:3000

# Demos
cd demos-logistica
python scripts/build_datasets.py
python scripts/validate_slugs.py   # slugs esperados pela landing existem como pages
python scripts/smoke_test.py       # 13/13 checagens OK (inclui filtro vazio na page 02)
streamlit run app.py               # localhost:8501
```

**Env local** (copiar de `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
NEXT_PUBLIC_FORMSPREE_FORM_ID=   # opcional até criar conta Formspree
```

---

## Próximos passos sugeridos

1. **Deploy:** commit + push landing (Vercel) e demos (Streamlit Cloud) com as mudanças deste pass — **concluído** (`caa057f` + `2476cd4`)
2. **Lighthouse mobile** pós-deploy — **93** performance (meta ≥ 94; LCP 2,9 s). Opcional: micro-otimização de LCP se quiser recuperar 1 ponto
3. Configurar **Formspree** (`NEXT_PUBLIC_FORMSPREE_FORM_ID`) → redeploy
4. Teste manual: DemoModal iframe on-demand no iPhone/Android; embed `?embed=true` nas 3 demos destaque (HTTP 200; validar visual após redeploy Streamlit ~2 min)
5. Push demos para repo `demos-logistica` no GitHub — **concluído**

---

*Documento vivo. Atualize após cada marco ou deploy.*
