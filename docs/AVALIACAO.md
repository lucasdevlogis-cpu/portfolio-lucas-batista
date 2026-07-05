# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio antes dos próximos passos. Consulte após cada fase ou deploy significativo.
>
> **Última atualização:** 05/07/2026 — redesign UX demos + integração de 10 cases demonstráveis na landing.

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
| Documentação | ✅ Enxuta | Só `AVALIACAO.md` + `DEPLOY.md` |
| Lighthouse | 🟡 Pendente | Rodar `npx lighthouse` mobile e registrar aqui |

**Veredicto:** pronto para divulgação após redeploy da Vercel (novos cases) e **Formspree** + **Lighthouse**.

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

| Case ID | Page Streamlit |
|---------|----------------|
| `01-precificacao-frete` | `01_precificacao_frete` |
| `02-torre-controle` | `02_mini_torre_controle` |
| `03-promessa-cep` | `04_promessa_cep` |
| `04-ship-from-store` | `08_ship_from_store` |
| `05-auditoria-endereco` | `10_auditoria_endereco` |
| `07-classificador-ocorrencias` | `07_classificador_ocorrencias` |
| `08-cvrp-urbano` | `03_cvrp_urbano` |
| `09-vrptw-ultima-milha` | `05_vrptw_ultima_milha` |
| `10-rede-interhubs` | `06_rede_interhubs` |
| `11-tsp-baseline-sp` | `09_tsp_baseline_sp` |

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
- **Smoke test demos:** `python scripts/smoke_test.py` → 12/12 pages OK.
- **Navegação:** scroll suave, menu mobile (Sheet), Intersection Observer para nav ativa.
- **Cases:** 10 cards demonstráveis com filtro; modal com contexto de negócio + iframe + link nova aba.
- **SEO:** meta tags, OG, JSON-LD, favicon, `robots.txt`, `sitemap.xml`.
- **Acessibilidade:** `prefers-reduced-motion` respeitado.

---

## Pendências (para fechar o lançamento)

| # | Ação | Onde |
|---|------|------|
| 1 | **Redeploy Vercel** após novos cases (URLs de demo fixadas no build) | Dashboard Vercel |
| 2 | Configurar `NEXT_PUBLIC_FORMSPREE_FORM_ID` + redeploy | Dashboard Vercel |
| 3 | Rodar Lighthouse mobile (meta ≥ 90) e registrar aqui | — |
| 4 | Confirmar preview do `og-image.png` no LinkedIn/WhatsApp | — |
| 5 | Push das demos para `lucasdevlogis-cpu/demos-logistica` (repo separado) | GitHub |

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
| 4 Deploy | ✅ ~90% | Formspree env; redeploy pós-novos cases |
| 5 Lançamento | 🟡 | Formspree, Lighthouse, analytics, domínio |

---

## Comandos de verificação

```bash
# Site
npm run build
npm run lint
npm run dev            # localhost:3000

# Demos
cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 12/12 pages OK
streamlit run app.py           # localhost:8501
```

**Env local** (copiar de `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
NEXT_PUBLIC_FORMSPREE_FORM_ID=   # opcional até criar conta Formspree
```

---

## Próximos passos sugeridos

1. Redeploy Vercel (novos cases + env demos)
2. Push demos para repo `demos-logistica` no GitHub
3. Configurar Formspree → redeploy
4. Lighthouse mobile

---

*Documento vivo. Atualize após cada marco ou deploy.*
