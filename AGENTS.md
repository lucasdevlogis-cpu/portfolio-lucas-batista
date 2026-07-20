<!-- AGENTS.md — Portfólio Lucas Batista -->
# AGENTS.md — Guia para Agentes de Código

Guia completo para agentes de código (Cursor, Kimi Code, Codex, etc.) trabalhando neste repositório. **Leia `docs/CANON.md` e `docs/ARQUITETURA.md` antes de qualquer alteração.** O projeto usa principalmente **português do Brasil** em copy, comentários e documentação.

Índice de docs: [`docs/README.md`](docs/README.md).

---

## 1. Visão geral do projeto

Este repositório contém o **portfólio profissional de Lucas Batista**, posicionado como um *Executive Proof System*: um dossiê headhunter-first para avaliação rápida de fit profissional em operações, dados e inteligência logística.

**Objetivo do site:** em até 60 segundos, um headhunter ou líder de operações deve entender quem é Lucas, para quais posições o perfil faz sentido, quais provas técnicas existem, qual stack/domínios aparecem no trabalho e como contatar.

**O que o projeto NÃO é:** landing comercial, currículo genérico, vitrine SaaS ou fluxo Figma.

**Estrutura de alto nível:**

- Landing one-page em **Next.js 16.2.10 + React 19 + TypeScript + Tailwind CSS v4**.
- 3 provas âncora em **React/Next.js** e 7 demos exploratórias em **Streamlit** (pasta `demos-logistica/`).
- CV PDF gerado automaticamente a partir do mesmo conteúdo da landing (`data/content.ts`).
- Deploy na **Vercel** (landing) e **Streamlit Cloud** (demos).

**URLs de produção:**

| Serviço | URL |
|---|---|
| Landing | `https://portfolio-lucas-batista-murex.vercel.app` |
| Demos Streamlit | `https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app` |
| GitHub landing | `https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista` |
| GitHub demos | `https://github.com/lucasdevlogis-cpu/demos-logistica` |

---

## 2. Stack tecnológica

### Landing (Next.js)

| Tecnologia | Versão / Configuração |
|---|---|
| Framework | Next.js `16.2.10` (App Router) |
| React | `19.2.4` |
| TypeScript | `^5` |
| Node.js | `24.x` (`engines` no `package.json`) |
| Estilo | Tailwind CSS `^4` — configuração **CSS-only** em `app/globals.css` |
| UI base | `@base-ui/react ^1.6.0` + `shadcn/ui` (`components/ui/`) |
| Animação | Framer Motion `^12.42.0` |
| Ícones | Lucide React `^1.21.0` |
| Analytics | `@vercel/analytics ^2.0.1` |
| Fontes | Inter (corpo) + Source Serif 4 (títulos) via `next/font/google` |
| Bundler | Turbopack (`next dev`) |
| E2E | Playwright `^1.61.1` |
| Visualização | ECharts `^6.1.0` + MapLibre GL JS `^5.24.0` |
| Auditoria | Lighthouse `^13.4.1` |

**Importante:** Tailwind v4 não usa `tailwind.config.ts`. Tokens editáveis vivem em `design/tokens.json`; `npm run tokens:sync` gera `app/design-tokens.css` e `demos-logistica/lib/brand.py`, e `app/globals.css` importa o CSS gerado. **Não crie um `tailwind.config.ts`.**

### Demos (Streamlit)

| Tecnologia | Uso |
|---|---|
| Python | 3.x |
| Streamlit | `>= 1.39.0` |
| Pandas / NumPy | Dados e modelagem |
| Plotly | Gráficos interativos |
| Folium + streamlit-folium | Mapas com Leaflet |
| Tema | `.streamlit/config.toml` + CSS injetado em `demos-logistica/lib/ui.py` |

A UI das demos é padronizada por `demos-logistica/lib/ui.py`, com tokens de marca em `demos-logistica/lib/brand.py`.

---

## 3. Organização do código

### Raiz do projeto

```
portfolio-lucas-batista/
├── app/                    # App Router Next.js
│   ├── globals.css         # Tailwind v4 + tokens CSS + utilitários
│   ├── layout.tsx          # Metadata, viewport, fontes, JSON-LD, skip-link
│   └── page.tsx            # Renderiza <HomePage />
├── components/             # Componentes React ativos
│   ├── ui/                 # shadcn/ui (button, card, dialog, badge) e wrappers
│   ├── sections/           # Seções da homepage
│   ├── layout/             # SectionShell
│   ├── providers/          # MotionProvider (LazyMotion + reduced-motion)
│   ├── archive/            # Componentes shelved (não montar sem aprovação)
│   ├── HomePage.tsx        # Monta a página na ordem canônica
│   ├── Header.tsx          # Nav fixa com scroll spy
│   ├── MobileNav.tsx       # Menu mobile
│   ├── Footer.tsx          # Rodapé
│   ├── BackToTop.tsx       # Botão flutuante voltar ao topo
│   ├── CaseDemoLauncher.tsx# Botão que abre DemoModal
│   ├── CaseThumbnail.tsx   # Thumbnail ou SVG gradiente por categoria
│   ├── DemoModal.tsx       # Modal híbrido: âncoras React + iframe Streamlit
│   ├── LucideIconByName.tsx# Resolução dinâmica de ícones
│   └── ...
├── data/
│   ├── content.ts          # SSOT de copy, cases, links, nav
│   └── archive/            # Copy shelved
├── lib/
│   ├── utils.ts            # `cn()` do shadcn
│   ├── lucide-icons.ts     # Mapa nome → componente Lucide
│   ├── scroll.ts           # Helpers de scroll suave
│   ├── use-active-section.ts # Scrollspy
│   └── analytics.ts        # Wrapper tipado Vercel Analytics
├── scripts/
│   ├── validate-cases.ts   # Validação de cases (prebuild)
│   ├── validate-premium-redesign.ts # Validação extra de redesign
│   ├── export-cv-content.ts# Exporta content.ts → public/cv-export.json
│   ├── generate-cv-pdf.py  # Gera public/lucas-batista-cv.pdf
│   └── generate-seo-files.ts # Gera sitemap.xml e robots.txt
├── demos-logistica/        # App Streamlit (subprojeto Python)
│   ├── app.py              # Home das demos
│   ├── paths.py            # DATA_DIR
│   ├── pages/              # 11 pages Streamlit
│   ├── lib/                # brand, ui, viz, folium_maps, geo, frete, format, tables
│   ├── data/               # Datasets gerados
│   │   └── raw/            # Amostras curadas
│   ├── scripts/
│   │   ├── build_datasets.py   # Gera CSVs com seed fixa
│   │   ├── smoke_test.py       # 13 checagens (12 scripts + 1 borda)
│   │   └── validate_slugs.py   # Valida slugs landing ↔ pages
│   └── .streamlit/config.toml  # Tema + toolbarMode minimal
├── design/
│   ├── design.md           # Spec visual ativa
│   └── tokens.md           # Resumo de tokens
├── docs/
│   ├── CANON.md            # Porta de entrada única (SSOT docs)
│   ├── AVALIACAO.md        # Estado, fases, bloqueadores
│   ├── DEPLOY.md           # Deploy Vercel + Streamlit
│   ├── VERCEL.md           # Operação e auditoria Vercel
│   ├── P0_P1_P2_CHECKLIST.md # Plano de refatoração progressiva
│   ├── OPORTUNIDADES_DEMOS.md  # Backlog de demos
│   ├── CANON.md            # Entrada única
│   ├── ARQUITETURA.md      # Mapa estrutural
│   ├── README.md           # Índice da pasta docs
│   ├── AVALIACAO.md        # Estado / saúde
│   ├── MAPEAMENTO.md       # Inventário do repo
│   ├── DEPLOY.md / VERCEL.md
│   ├── A11Y.md / MOBILE_SPEC.md
│   ├── P0_P1_P2_CHECKLIST.md
│   ├── OPORTUNIDADES_DEMOS.md  # backlog técnico das demos
│   └── archive/            # gaps e QA históricos
│   ├── A11Y.md             # Acessibilidade
│   └── MOBILE_SPEC.md      # Especificação mobile
├── public/                 # Assets estáticos
│   ├── og-image.jpg
│   ├── lucas-batista-cv.pdf
│   ├── cv-export.json
│   ├── robots.txt
│   └── sitemap.xml
├── .cursorrules            # Regras globais do Cursor
├── .agents/skills/         # Skills especializadas
├── .env.example
├── .env.local              # Não commitar
├── package.json
├── next.config.ts          # Configuração mínima (vazio)
├── tsconfig.json
├── eslint.config.mjs
└── playwright.config.ts
```

### Ordem canônica da homepage (DOM = nav = scroll)

```
Header → ExecutiveHero → EvidenceStrip → ProfileBrief (#perfil)
→ SignatureCases (#cases) → TrajectoryBoard (#trajetoria)
→ ContactPanel (#contato) → Footer
```

A nav exibe: **Perfil · Provas · Trajetória · Contato**.

### Componentes ativos

Não usar `components/archive/` sem aprovação. Os componentes montados são:

`Header`, `MobileNav`, `ExecutiveHero`, `EvidenceStrip`, `ProfileBrief`, `SignatureCases`, `CaseLibrary`, `CaseDemoLauncher`, `CaseThumbnail`, `DemoModal`, `TrajectoryBoard`, `ContactPanel`, `Footer`, `HomePage`, `BackToTop`, `LucideIconByName`, `MotionProvider`, `SectionShell`, `EditorialBadge`, `PremiumCard`, `MetricPill`.

Componentes arquivados em `components/archive/ui/`: `FadeIn`, `Stagger`, `GlassCard`.

---

## 4. Fonte da verdade (SSOT)

| Domínio | Fonte | Não usar |
|---|---|---|
| Copy ativo (landing) | `data/content.ts` | Hardcode nos componentes |
| Copy shelved (comercial) | `data/archive/content-consultoria.ts` | Remontar sem aprovação |
| Spec visual + IA | `design/design.md` + `design/tokens.json` | Figma |
| Tokens compartilhados | `design/tokens.json` → `app/design-tokens.css` + `demos-logistica/lib/brand.py` | Hex inline |
| Padrões de componentes | `.agents/skills/design-system.md`, `.agents/skills/component-patterns.md` | Specs obsoletas |
| Estado do projeto | `docs/AVALIACAO.md` | Claims "100%" sem QA |
| Deploy / Vercel | `docs/DEPLOY.md`, `docs/VERCEL.md` | SHAs hardcoded |
| CV PDF | Gerado de `content.ts` via `npm run cv:generate` | Copy manual no Python |
| Checklist de refatoração | `docs/P0_P1_P2_CHECKLIST.md` | — |

**Regra de ouro:** todo texto, link, case, CTA, métrica e rótulo da landing vêm de `data/content.ts`. Componentes não devem hardcodar narrativa de carreira, rótulos de CTA ou textos comerciais.

### Cases e demos

- **11 cases** em `CONTENT.cases`.
- **10 cases demonstráveis** mapeados em `CASE_DEMO_SLUGS` (`data/content.ts`).
- **3 cases âncora** listados em `featuredProofCases`: `01-precificacao-frete`, `02-torre-controle`, `08-cvrp-urbano`.
- **1 roadmap** (`06-kpis-cd`) — sem demo publicada.
- `linkDemo` é derivado automaticamente de `CASE_DEMO_SLUGS` e `NEXT_PUBLIC_DEMOS_BASE_URL`. Nunca declare `linkDemo` manualmente.
- A URL Streamlit usa o **slug sem prefixo numérico**: `pages/ship_from_store.py` → `/ship_from_store`.

Mapeamento atual:

| Case ID | Slug Streamlit | Título | Prioridade |
|---|---|---|---|
| `01-precificacao-frete` | `precificacao_frete` | Simulador de Custo de Frete | P0 |
| `02-torre-controle` | `mini_torre_controle` | Mini Torre de Controle de Entregas | P0 |
| `03-promessa-cep` | `promessa_cep` | Promessa de Entrega por CEP | P0 |
| `04-ship-from-store` | `ship_from_store` | Ship from Store / Origem Ótima | P1 |
| `05-auditoria-endereco` | `auditoria_endereco` | Auditoria de Endereço e Geocoding | P1 |
| `07-classificador-ocorrencias` | `classificador_ocorrencias` | Classificador de Ocorrências Operacionais | P2 |
| `08-cvrp-urbano` | `cvrp_urbano` | Roteirização Urbana (CVRP) | P0 |
| `09-vrptw-ultima-milha` | `vrptw_ultima_milha` | Última Milha com Janelas (VRPTW) | P1 |
| `10-rede-interhubs` | `rede_interhubs` | Rede Inter-hubs / Corredores | P1 |
| `11-tsp-baseline-sp` | `tsp_baseline_sp` | Sequência de Visitas (TSP) | P1 |
| `06-kpis-cd` | — | KPIs de Armazenagem e Expedição | P2 (roadmap) |

---

## 5. Comandos de build e teste

### Landing Next.js

```bash
# Instalar dependências
npm install

# Ambiente local
npm run dev                 # http://localhost:3000

# Validação (obrigatória antes do build)
npm run validate            # roda scripts/validate-cases.ts

# Lint e typecheck
npm run lint                # ESLint 9 (eslint.config.mjs)
npm run typecheck           # tsc --noEmit

# SEO
npm run seo:generate        # gera public/sitemap.xml e public/robots.txt

# Build de produção (prebuild roda validate + typecheck + SEO automaticamente)
npm run build

# Servir build local
npm run start               # http://localhost:3000

# CV PDF
npm run cv:generate         # npm run cv:export + python scripts/generate-cv-pdf.py
```

### Demos Streamlit

```bash
cd demos-logistica

# Ambiente Python isolado (recomendado)
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt   # streamlit, pandas, numpy, plotly, folium, streamlit-folium

# Gerar datasets reprodutíveis
python scripts/build_datasets.py

# Smoke test: meta 13/13 checagens
python scripts/smoke_test.py

# Validar slugs entre landing e pages Streamlit
python scripts/validate_slugs.py

# Rodar localmente
streamlit run app.py        # http://localhost:8501
```

### Verificação completa recomendada

```bash
npm run tokens:sync
npm run demos:export
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e            # 14 testes Playwright
npm run qa:visual           # com `next start` ativo; modal + 3 viewports
npm audit --audit-level=moderate
npm run cv:generate         # se content.ts foi alterado

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py        # 13/13
python scripts/validate_slugs.py    # 10/10
```

---

## 6. Instruções de teste

### Landing

- `npm run validate` é o teste principal: valida contagem de cases, slugs, ícones Lucide, campos obrigatórios, consistência `linkDemo`, correspondência com arquivos `demos-logistica/pages/*.py` e frescor dos artefatos de CV.
- `npm run lint` usa `eslint-config-next` (core-web-vitals + typescript).
- `npm run typecheck` roda `tsc --noEmit`.
- `npm run build` deve passar sem erros. O `prebuild` roda `validate`, `typecheck` e `seo:generate` automaticamente.
- `npm run test:e2e` executa 14 testes Playwright contra build de produção (o `playwright.config.ts` sobe o servidor com `next build && next start`).
- QA manual pós-deploy está documentado em `docs/VERCEL.md`.

### Demos

- `python scripts/smoke_test.py` executa `app.py` e todas as `pages/*.py` via `AppTest` e reporta exceções.
- Inclui um teste de borda: filtro vazio na `mini_torre_controle.py` (`at.multiselect[0].set_value([]).run()`).
- Meta: **13/13 checagens OK**.
- Sempre rode `build_datasets.py` antes de `smoke_test.py` se os datasets ainda não existirem.
- `python scripts/validate_slugs.py` garante que os 10 slugs esperados pela landing existam como pages.
- Verifique visualmente a página alterada em tela cheia **e** em embed (`?embed=true`).

---

## 7. Diretrizes de estilo de código

### TypeScript / React

- Todos os componentes são **React function components** com TypeScript.
- Use `interface` ou `type` para tipagem. Evite `any`.
- Use Tailwind classes utilitárias. Não crie CSS custom a menos que necessário.
- Para concatenação condicional de classes, use `cn()` de `lib/utils.ts`.
- Imagens: use `next/image`, `priority={true}` apenas acima da fold, `loading="lazy"` abaixo. Nunca imagens genéricas de stock.
- Textos: **sempre em português do Brasil**. Nunca hardcode — importe de `data/content.ts`.
- Server Components por padrão. Use `'use client'` apenas para interação real (filtros, modal, mobile nav).
- Links externos: `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` descritivo.

### Tailwind CSS v4

- Configuração em `app/globals.css`.
- Use `@import "tailwindcss"` e `@theme inline` com variáveis CSS.
- Cores customizadas são definidas como variáveis CSS em `:root`.
- **Não crie `tailwind.config.ts`** — isso é v3.
- Tokens ativos: `editorial`, `card`, `ink`, `primary`, `accent`, `warm-accent`, `surface-dark`, `muted`, `border`, `muted-foreground`.

### shadcn/ui

- Para adicionar componentes, use: `npx shadcn@latest add <nome>` (ex: `npx shadcn@latest add button card dialog`).
- Componentes atuais em `components/ui/`: `badge`, `button`, `card`, `dialog`.

### Python (demos)

- Todo texto da UI em português do Brasil.
- Cada demo deve deixar visível: problema, abordagem, stack, trade-off, métrica e limitação.
- Use `lib/ui.py`, `lib/viz.py`, `lib/brand.py`, `lib/folium_maps.py`, `lib/format.py`, `lib/tables.py`, `lib/geo.py`, `lib/frete.py` para padronizar.
- Não adicione segredos ou chaves de API hardcoded.
- Não introduza APIs pagas como dependências obrigatórias.

### UX Writing

- Economia máxima: reduzir 50% do texto na primeira revisão, depois mais 20%.
- Frases ≤ 20 palavras; parágrafos ≤ 3 linhas no desktop.
- Hero ≤ 40 palavras; cards de prova ≤ 30 palavras.
- CTAs: verbo no infinitivo + objeto, ≤ 4 palavras, com ícone.
- Eyebrows: uppercase, tracking amplo (`tracking-[0.12em]`–`[0.18em]`), `text-xs`, máx. 3 palavras.
- Anti-padrões: paredes de texto, tom acadêmico, palavras proibidas como `fui responsável por`, `realizei a implementação de`, `de forma significativa`.

### Acessibilidade

- Meta: Lighthouse a11y 100 (baseline local atual: 100 desktop/mobile).
- Contraste mínimo WCAG AA: texto normal 4.5:1, texto grande/bold 3:1, componentes interativos 3:1.
- Skip link (`#conteudo`), ordem de foco lógica, `.focus-ring` visível, ESC fecha modais.
- Ícones com `aria-hidden` quando acompanhados de texto ou `aria-label` quando sozinhos.
- Semântica HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`; H1 único, hierarquia sem pulos.
- Motion: respeitar `prefers-reduced-motion` (já implementado no `MotionProvider`).

### Mobile-first

- Primeiro mobile (375px). Toda implementação deve funcionar em 375px antes do desktop.
- Touch targets mínimos: 44×44px; CTAs principais 56px de altura.
- Fontes: nunca < 14px em mobile.
- Hero, EvidenceStrip, SignatureCases, CaseLibrary, TrajectoryBoard e ContactPanel têm layouts adaptados (stack, lista em vez de tabela, etc.).

### Performance

- Imagens: WebP/AVIF, ≤ 200KB, dimensão máx. 1920px, `placeholder="blur"` quando possível.
- Fontes: `next/font/google` com `display: 'swap'`, subset `latin`.
- Componentes: dynamic import/lazy para seções abaixo da fold e bibliotecas pesadas (`DemoModal` já lazy).
- Framer Motion: `LazyMotion` + `domAnimation` ativo.
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1, TTFB < 600ms, FCP < 1.8s, INP < 200ms.
- Lighthouse local atual: desktop 100/100/100/100, mobile 91/100/100/100.

### Proibições explícitas

- ❌ Cores/hex fora do design system.
- ❌ Fontes que não sejam Source Serif 4 / Inter.
- ❌ Imagens sem alt text.
- ❌ Ícones de bibliotecas misturadas (use Lucide React).
- ❌ Componentes interativos falsos (ex: cockpit estático sem propósito).
- ❌ `console.log` em produção.
- ❌ Hardcode de copy fora de `data/content.ts`.
- ❌ Criar `tailwind.config.ts`.
- ❌ Usar `output: 'export'` ou `vercel.json` com override de output directory.
- ❌ Commitar `.env.local`, `.vercel/`, `.venv/`.
- ❌ Adicionar chaves de API, credenciais ou dependências pagas obrigatórias.
- ❌ Remontar conteúdo de `components/archive/`, `data/archive/` ou `design/archive/` sem aprovação.

---

## 8. Variáveis de ambiente

Crie `.env.local` na raiz (não commitar — está no `.gitignore`). Modelo em `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

| Variável | Obrigatória | Ambientes | Descrição |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sim | Production, Preview, Development | URL pública do site |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | Sim | Production, Preview, Development | URL base do Streamlit Cloud (sem `/` final) |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Não | — | Form removido; não usar |

`NEXT_PUBLIC_*` é embutida no bundle no **build**. Alterar env exige **redeploy**.

---

## 9. Processo de deploy

### Landing (Vercel)

- Target: Vercel (gratuito), Next.js nativo.
- **Não use** `output: 'export'` no `next.config.ts`.
- **Não crie** `vercel.json` com override de output directory.
- Configuração correta do painel:
  - Framework Preset: **Next.js**
  - Build Command: **vazio** (usa `npm run build`, que roda `prebuild` → `validate` + `typecheck` + `seo:generate`)
  - Output Directory: **vazio** (usa `.next/` nativo)
  - Install Command: **vazio** (usa `npm install`)
- Env vars obrigatórias em Production, Preview e Development.
- Deploy manual (emergência): `npx vercel --prod`.

### Demos (Streamlit Cloud)

- Publicação: copiar a pasta `demos-logistica/` para o repo `lucasdevlogis-cpu/demos-logistica`.
- App aponta para branch `main`, main file path `app.py`.
- Streamlit Cloud redeploya automaticamente após push.

```powershell
# clone único
git clone https://github.com/lucasdevlogis-cpu/demos-logistica.git ..\demos-logistica-deploy

# a cada release
robocopy demos-logistica ..\demos-logistica-deploy /E /XD .git __pycache__ .venv .pytest_cache /NFL /NDL /NJH /NJS
cd ..\demos-logistica-deploy
git add -A
git commit -m "sync: atualiza demos do portfolio-lucas-batista"
git push origin main
```

### Checklist pós-deploy

- [ ] Site abre na URL Vercel.
- [ ] 3 cases âncora + biblioteca filtrável + roadmap visíveis.
- [ ] 3 âncoras abrem inline no modal e em `/provas/{slug}`.
- [ ] 7 complementares abrem no modal via iframe `?embed=true`.
- [ ] Link "Abrir em nova aba" no modal funciona.
- [ ] LinkedIn, email, GitHub e CV PDF funcionam na seção Contato.
- [ ] `robots.txt` e `sitemap.xml` acessíveis.
- [ ] `og-image.jpg` aparece no preview de link (LinkedIn/WhatsApp).
- [ ] Lighthouse ≥ 90 em mobile.
- [ ] CV PDF em `/lucas-batista-cv.pdf` acessível.

---

## 10. Considerações de segurança

- **Não commitar** `.env.local`, `.vercel/` nem `.venv/` (já estão no `.gitignore`).
- **Não adicionar** chaves de API, segredos ou credenciais no código.
- **Não introduzir** APIs pagas como dependências obrigatórias das demos.
- Dados das demos são **sintéticos, públicos ou anonimizados** — nunca dados reais de operação.
- O ESLint ignora `demos-logistica/**` para evitar processar o `.venv` (que contém JS empacotado gigante e estoura memória).
- A landing não usa formulário na homepage; a seção Contato usa links diretos (LinkedIn, email, GitHub, CV PDF).

---

## 11. Arquivado / shelved

Alguns componentes e copy foram deliberadamente retirados da homepage no pivot para *Executive Proof System*. Não remonte sem revisar `docs/CANON.md` e `docs/AVALIACAO.md`.

| Path | Conteúdo |
|---|---|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `data/archive/content-consultoria.ts` | Copy shelved da landing comercial |
| `design/archive/` | Specs históricos, planos UX, Lighthouse antigo, tokens comerciais |

---

## 12. Integração landing ↔ demos

- Âncoras `01`, `02` e `08` renderizam `DemoShell` diretamente no `DemoModal` e possuem rotas `/provas/{slug}`.
- As 7 complementares usam iframe `src="{demoUrl}?embed=true"`; `toolbarMode = "minimal"` reduz o chrome do Streamlit.
- `DemoModal` inclui link "Abrir em nova aba": rota Next nas âncoras e URL Streamlit sem `?embed=true` nas complementares.
- ECharts e MapLibre são importados somente quando a âncora é aberta.
- O mapeamento de slugs está em `data/content.ts` → `CASE_DEMO_SLUGS`.

---

## 13. Geração do CV PDF

O CV é gerado a partir de `data/content.ts` (SSOT):

1. `npm run cv:export` roda `scripts/export-cv-content.ts` e gera `public/cv-export.json`.
2. `scripts/generate-cv-pdf.py` lê `public/cv-export.json` e gera `public/lucas-batista-cv.pdf` com `fpdf`.
3. `npm run cv:generate` executa os dois passos.

Fontes TTF candidatas: `scripts/assets/DejaVuSans.ttf`, `C:\Windows\Fonts\arial.ttf`, `/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf`, `/Library/Fonts/Arial.ttf`. Se nenhuma for encontrada, o script falha com instrução clara. Instale `fpdf` no ambiente Python (`pip install fpdf`) se necessário.

---

## 14. Documentação complementar

| Doc | Função |
|---|---|
| `docs/CANON.md` | Porta de entrada única — leia primeiro |
| `docs/ARQUITETURA.md` | Arquitetura do sistema |
| `docs/README.md` | Índice da pasta docs |
| `docs/AVALIACAO.md` | Snapshot de saúde, fases, bloqueadores |
| `docs/MAPEAMENTO.md` | Inventário do repositório |
| `docs/P0_P1_P2_CHECKLIST.md` | Plano de refatoração progressiva |
| `docs/DEPLOY.md` | Deploy Vercel + Streamlit |
| `docs/VERCEL.md` | Operação Vercel / QA |
| `docs/OPORTUNIDADES_DEMOS.md` | Backlog técnico das demos |
| `docs/A11Y.md` / `docs/MOBILE_SPEC.md` | Specs profundas |
| `docs/archive/` | Gaps e QA históricos |
| `design/design.md` / `design/tokens.md` | Spec visual e tokens |
| `.cursorrules` / `.codex/AGENTS.md` | Regras Cursor / Codex |
| `.agents/skills/` | Skills (apontam para docs canônicos) |

---

*AGENTS.md vivo. Atualize quando mudar stack, ordem de seções, critérios de validação ou processo de deploy.*
