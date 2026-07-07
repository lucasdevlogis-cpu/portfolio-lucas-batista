# Avaliação do Projeto — Julho 2026

> **Uso:** Snapshot de saúde do portfólio. Consulte após cada fase ou deploy significativo.
>
> **Entrada canônica:** [`docs/CANON.md`](CANON.md) — leia primeiro.
>
> **Última atualização:** 07/07/2026 — redesign premium + deploy.

---

## Estado atual

| Item | Valor |
|------|-------|
| **Layout oficial** | Executive Proof System — dossiê profissional para headhunters |
| **Spec visual** | [`design/design.md`](../design/design.md) + tokens em `app/globals.css` |
| **URL** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Deploy Vercel** | Último deploy: 07/07/2026 às ~19:00 UTC-3 |
| **Lighthouse prod (desktop)** | **100 / 96 / 100 / 100** |

### Homepage (ordem DOM = nav)

`Header` → `Hero` → `ProfileSection` → `Cases` → `TrajectorySection` → `Contato` → `Footer`

### Componentes ativos

`Header`, `Hero`, `ProfileSection`, `SectionHeader`, `EditorialDarkPanel`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `TrajectorySection`, `Contato`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `AnimatedSection`

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
| Layout Executive Proof | ✅ | ✅ |
| Demos Streamlit | ✅ | ✅ 13/13 smoke tests |
| Deploy Vercel | ✅ | ✅ |
| OG + CV PDF | ✅ | ✅ |
| Lighthouse | ✅ | ✅ prod desktop 100/96/100/100 |

---

## Bloqueadores pré-lançamento

| # | Ação | Onde | Status |
|---|------|------|--------|
| 1 | CV gerado de `content.ts` | `public/lucas-batista-cv.pdf` | ✅ `npm run cv:generate` |
| 2 | READMEs por case no repo demos | Fase 3 | ✅ `demos-logistica/docs/cases/` |
| 3 | Lighthouse em produção | Vercel | ✅ desktop **100/96/100/100** — 07/07 |
| 4 | Refinamento UX/UI e build | Local | ✅ desktop **100/96/100/100** — 07/07 |

Checklist QA manual: [`docs/VERCEL.md`](VERCEL.md) — **concluído** 07/07.

---

## Performance (Lighthouse)

Scores pós-refinamento premium (2026-07-07):

| | Desktop | Mobile |
|---|--------:|-------:|
| **Local** (`next start`) | 100 / 96 / 100 / 100 | — |
| **Prod** (Vercel URL) | **100 / 96 / 100 / 100** | — |

Colunas: Performance / Acessibilidade / Best Practices / SEO. Meta lançamento: desktop Performance ≥ 90 ✅.

---

## Mudanças da última rodada (07/07/2026)

### Landing page

- **Hero redesenhado com fundo escuro** (`bg-surface-dark`) para alto impacto visual e contraste.
- **Header fixo escuro translúcido** com texto branco e CTA em teal vibrante.
- **Paleta premium atualizada**: teal `#14B8A6`, dourado `#D4A853`, navy `#0B1220`, fundo editorial `#F8F7F4`.
- **Animações Framer Motion** em todas as seções: fade + slide up, stagger, hover lift, scale em cards e botões.
- **Perfil**: layout denso sem lacunas — card de senioridade em destaque + grid 2×2 de diferenciais + faixa de credibilidade.
- **Cases**: cards com cores de categoria, barra colorida no topo, ícones em gradiente, hover elevado.
- **Trajetória**: timeline vertical conectada, cards de stack/dominios balanceados, experiências e formação em cards visuais.
- **Contato**: mantido em superfície escura para consistência com o hero.
- **Fundo com grid sutil** nas seções claras para textura e sofisticação.

### Demos Streamlit

- Tokens de cor alinhados à landing (teal/dourado/navy).
- CSS premium em `lib/ui.py`: header escuro translúcido, KPI cards com hover, badges destacados, tabelas estilizadas.
- `lib/viz.py` e `lib/folium_maps.py` ajustados para novas cores e hoverlabels escuros.
- Páginas refinadas visualmente sem alterar lógica de negócio.
- Smoke test: **13/13 OK**.

---

## Pendências desejáveis

- Vercel Analytics + domínio custom
- Backlog demos: [`docs/OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md)
- Testes mobile automatizados após novas mudanças visuais

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
| `docs/AVALIACAO.md` | Este arquivo |
| `design/design.md` | Spec visual ativa |
| `design/tokens.md` | Tokens CSS resumidos |
| `docs/VERCEL.md` | Vercel, env, checklist QA |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `docs/OPORTUNIDADES_DEMOS.md` | Backlog demos |
| `AGENTS.md` | Guia para agentes |

---

## Histórico

### Redesign Premium + Deploy — 07/07/2026

Hero escuro, animações Framer Motion, paleta premium, grid denso no Perfil, timeline na Trajetória, cores por categoria nos Cases, demos Streamlit refinadas, deploy na Vercel com Lighthouse 100/96/100/100.

### Canonicalização — 06/07/2026 (tarde)

`docs/CANON.md` criado; ordem seções Perfil → Cases → Trajetória; copy comercial extraído para `data/archive/`; status honesto (Fase 5 🟡); agent docs alinhados.

### Executive Proof System — 06/07/2026

Pivot headhunter-first; landing comercial arquivada; Figma removido do fluxo.

---

*Documento vivo. Atualize após cada marco ou deploy.*
