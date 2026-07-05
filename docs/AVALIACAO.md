# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio antes dos próximos passos. Consulte após cada fase ou deploy significativo.
>
> **Última atualização:** 05/07/2026 — **Footer atualizado** (`underline` + `ArrowUpRight` nos links rápidos); hero e Sobre com ícones Lucide.

---

## Resumo executivo

| Área | Status | Nota |
|------|--------|------|
| Landing page (código) | ✅ Completa | 10 seções (incl. Sobre); build + lint OK |
| Cases | ✅ Completo | **10 demonstráveis** + 1 roadmap (`06-kpis-cd`); filtro por 6 categorias |
| Demos Streamlit (código) | ✅ Completa | **11 pages** + `lib/` compartilhada; smoke **12/12** |
| UX demos Streamlit | ✅ Padronizado | `hero`, `section`, `plot`, `sidebar_brand`; home com cards navegáveis |
| Deploy produção | ✅ No ar | Vercel + Streamlit Cloud funcionando |
| Conteúdo / credibilidade | ✅ OK | Email, LinkedIn e GitHub configurados |
| SEO assets | ✅ OK | `public/og-image.png` (1200×630) e `app/icon.png` |
| Formulário de leads | 🟡 Parcial | Formspree integrado; sem ID usa fallback `mailto` |
| Documentação | ✅ Enxuta | `AVALIACAO.md` + `DEPLOY.md` |
| Lighthouse | 🟡 Pendente | Rodar `npx lighthouse` mobile e registrar aqui |

**Veredicto:** pronto para divulgação após **Formspree** + **Lighthouse**.

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
- **Dados:** `data/raw/` + `scripts/build_datasets.py` (seed fixa) + `scripts/smoke_test.py` (12/12 OK).

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

Critérios validados:
- Modal abre ao clicar no card
- Link "Abrir em nova aba" presente com `target="_blank"`
- Link GitHub presente
- Iframe da demo detectado com `src` correto (`?embed=true`)

Artefatos:
- `validacao_cases_relatorio.txt` — relatório completo
- `screenshot_modal_00.png` — evidência visual (Simulador de Custo de Frete)
- `screenshot_modal_03.png` — evidência visual (Ship from Store, iframe carregado)

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

### Lighthouse mobile (05/07/2026, local `next start`)

| Categoria | Simulate (Lantern) | DevTools (throttling aplicado) |
|-----------|:---:|:---:|
| Performance | 73 | **87** (LCP 2,3 s · FCP 2,3 s) |
| Acessibilidade | 94 | — |
| Boas práticas | 100 | — |
| SEO | 100 | — |

O LCP simulado do Lantern (7,7 s) é pessimista para esta página estática; o insight baseado em trace mostra ~1,4 s de render e o método DevTools confirma LCP real de 2,3 s. Ganho de performance ainda possível reduzindo o TBT do Framer Motion (hydration das seções animadas).

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
| 5 Lançamento | 🟡 | Formspree, Lighthouse, analytics, domínio |

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

1. Configurar Formspree → redeploy
2. Lighthouse mobile
3. Push demos para repo `demos-logistica` no GitHub

---

*Documento vivo. Atualize após cada marco ou deploy.*
