# MAPEAMENTO — Portfólio Lucas Batista

> Inventário detalhado do repositório. **Entrada:** [`CANON.md`](CANON.md) · **Arquitetura:** [`ARQUITETURA.md`](ARQUITETURA.md)
>
> Última atualização: 13/07/2026.

---

## 1. Repositório

| Item | Valor |
|------|-------|
| Landing | `lucasdevlogis-cpu/portfolio-lucas-batista` · branch `main` |
| Demos (deploy) | `lucasdevlogis-cpu/demos-logistica` |
| Produção | <https://portfolio-lucas-batista-murex.vercel.app> |
| Commit de refino | `9b57869` — confirmar deploy com `npx vercel inspect` |

---

## 2. Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16.2.9 (App Router) |
| React | 19.2.4 |
| TypeScript | 5.x · Node 24.x |
| Estilo | Tailwind CSS v4 (`app/globals.css`) |
| UI | shadcn/ui + wrappers (`PremiumCard`, `EditorialBadge`, …) |
| Motion | Framer Motion (`LazyMotion` + `domAnimation`) |
| Ícones | Lucide React |
| Fontes | Inter + Source Serif 4 |
| E2E | Playwright — **9** testes |
| Demos | Streamlit + Pandas/Plotly/Folium |

### Scripts

```bash
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e
npm run cv:generate
npm run seo:generate
```

---

## 3. Árvore de componentes (ativos)

```
HomePage
├── Header → MobileNav
├── ExecutiveHero
├── EvidenceStrip          # 3 métricas
├── ProfileBrief           # #perfil
├── SignatureCases         # #cases
│   ├── CaseThumbnail      # public/cases/*.webp nos âncora
│   ├── CaseDemoLauncher → DemoModal (lazy)
│   ├── CaseLibrary        # filtros dinâmicos
│   └── Roadmap
├── TrajectoryBoard        # #trajetoria
├── ContactPanel           # #contato
├── Footer
└── BackToTop
```

Detalhes e contrato demos: [`ARQUITETURA.md`](ARQUITETURA.md).

### UI primitives (`components/ui/`)

`button`, `card`, `dialog`, `badge`, `PremiumCard`, `MetricPill`, `EditorialBadge`

### Shelved

`components/archive/{consultoria,legacy,ui}/` — não montar.

---

## 4. Dados e cases

| Conjunto | Origem | Qtd |
|----------|--------|-----|
| Âncora | `featuredProofCases` | 3 |
| Biblioteca | demos não âncora | 7 |
| Roadmap | sem `linkDemo` | 1 |
| Demos publicadas | `CASE_DEMO_SLUGS` | 10 |

Thumbnails âncora: `public/cases/01-precificacao-frete.webp`, `02-torre-controle.webp`, `08-cvrp-urbano.webp`.

---

## 5. Documentação

Índice: [`docs/README.md`](README.md).

| Doc | Papel |
|-----|-------|
| CANON | Entrada única |
| ARQUITETURA | Mapa estrutural |
| AVALIACAO | Saúde |
| DEPLOY / VERCEL | Publicação |
| A11Y / MOBILE_SPEC | Specs profundas |
| archive/ | Histórico |

---

## 6. QA rápido pós-deploy

- [ ] Site abre na URL Vercel
- [ ] 3 âncora com WebP + Case ID correto (incl. **Case 08**)
- [ ] Filtros sem categorias zeradas
- [ ] Modal: preview → iframe; ESC fecha; “Abrir em nova aba”
- [ ] LinkedIn, email, GitHub, CV PDF
- [ ] `robots.txt` / `sitemap.xml` / `og-image.jpg`

Checklist completo: [`VERCEL.md`](VERCEL.md).

---

*Atualize quando mudar a árvore de montagem, scripts ou contagens de cases.*
