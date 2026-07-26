# Copilot Instructions — Portfólio Lucas Batista

Leia `docs/CANON.md` e `docs/ARQUITETURA.md` antes de editar qualquer arquivo.

## Produto

Executive Proof System headhunter-first: em até 60 segundos um avaliador deve
entender o posicionamento de Lucas, as provas técnicas, a trajetória e os
canais de contato. Não transformar em landing SaaS, currículo genérico ou
dashboard decorativo.

## Setup local

Requisitos: Node.js 24.x e Python 3.12+.

```powershell
npm ci
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env.local
```

Servidores de desenvolvimento em terminais separados:

```powershell
npm run dev          # http://localhost:3000
streamlit run apps/demos/app.py   # http://localhost:8501
```

## Comandos essenciais

### Build e validação

```powershell
npm run build              # build de produção Next.js
npm run validate           # arquitetura, tokens, contratos e catálogo
npm run typecheck          # TypeScript
npm run verify             # format:check + lint + lint:python + demos:test + build
npm run verify:full        # verify + smoke + E2E + npm audit
```

### Testes

```powershell
# E2E — Playwright (sobe build automaticamente)
npm run test:e2e
npm run test:e2e -- tests/e2e/homepage.spec.ts
npm run test:e2e -- --grep "carrega com metadados"

# Python — pytest (executar de apps/demos/)
cd apps/demos
python -m pytest
python -m pytest tests/test_catalog.py
python -m pytest tests/test_catalog.py::test_every_published_demo_has_a_page
```

### Lint e formatação

```powershell
npm run lint
npm run lint:python
npm run format
npm run format:check
```

### Geração de contratos

```powershell
npm run tokens:sync        # design/tokens.json → CSS, Python e Streamlit
npm run demos:build        # recria datasets determinísticos
npm run demos:export       # gera contracts/demo-snapshots/*.json
npm run demos:validate     # valida catálogo e snapshots
npm run demos:smoke        # 13 checagens de runtime Streamlit
npm run cv:generate        # atualiza public/lucas-batista-cv.pdf a partir de data/content.ts
```

### QA visual e performance

Exigem `npm run build && npm run start` ativo, ou servidor de preview/produção
com variáveis de ambiente conforme `docs/OPERACAO.md`.

```powershell
npm run qa:visual          # capturas em 375, 768 e 1440 px
npm run qa:streamlit       # 12 rotas desktop + 7 embeds mobile
npm run lighthouse:all     # desktop e mobile
```

## Arquitetura de alto nível

Repositório único com dois runtimes e contratos compartilhados:

```text
app/                    Next.js App Router; rotas /provas/{slug}
components/             UI da landing e das provas React
components/sections/    seções da homepage na ordem canônica
components/demos/       modal, shell, charts e mapa das provas
components/ui/          primitives mínimos
data/content.ts         copy, cases, CTAs e metadados editoriais
lib/                    catálogo, contratos e helpers compartilhados
apps/demos/             aplicação Streamlit completa
  app.py                entrypoint e navegação
  domain/               cálculo sem dependência de UI
  presentation/         tema, charts, mapas, tabelas e formatadores
  pages/                composição fina de cada prova
  data/raw/             amostras curadas
  data/generated/       datasets determinísticos
  scripts/              build, export e smoke
  tests/                pytest
contracts/              catálogo e snapshots entre Python e TypeScript
design/tokens.json      tokens editáveis
scripts/                automação transversal e QA
.artifacts/             saídas locais ignoradas
```

Ordem canônica da homepage no DOM e na navegação:

```text
Header → ExecutiveHero → EvidenceStrip → ProfileBrief
→ SignatureCases → TrajectoryBoard → ContactPanel → Footer
```

### Fluxos de dados

- `design/tokens.json` gera `app/design-tokens.css`,
  `apps/demos/presentation/tokens.py` e `.streamlit/config.toml` via
  `npm run tokens:sync`.
- `contracts/demo-catalog.json` alimenta `data/content.ts`,
  `lib/demo-catalog.ts` e `apps/demos/catalog.py`.
- `apps/demos/data/raw/` → `build_datasets.py` →
  `apps/demos/data/generated/` → `export_demo_snapshots.py` →
  `contracts/demo-snapshots/*.json` → rotas React e experiência web.
- React não recalcula frete, SLA ou roteirização; consome snapshots Python.

### Camadas Python

```text
pages → domain
pages → presentation
presentation → settings/tokens
domain ↛ streamlit
```

## Convenções

### React e TypeScript

- Server Components por padrão; `'use client'` apenas quando há interação real.
- Não use `any`, `console.log` em produção ou copy narrativa hardcoded em TSX.
- Passe apenas os dados necessários para Client Components.
- Use `next/image`, links externos com `rel="noopener noreferrer"` e ícones
  Lucide (única biblioteca de ícones React).
- Preserve um único `<main id="conteudo">` por rota.
- ECharts, MapLibre, modal e Analytics permanecem lazy.

### Visual

- Mobile-first em 375 px; validar também 768 e 1440 px.
- Tipografia: Hanken Grotesk nos títulos, Inter no corpo, JetBrains Mono em
  índices e dados.
- Cores via tokens: fundo grafite, laranja para ação, verde somente para
  resultado positivo.
- Cantos entre 2 e 8 px; evitar cardismo, arco-íris, glassmorphism, gradientes e
  sombras sem função.
- Até 3 KPIs por prova; gráfico ou mapa principal, método e limitação visíveis.
- Touch target mínimo de 44 px e contraste WCAG AA.
- Movimento curto, funcional e respeitando `prefers-reduced-motion`.

### Python

- Cálculo em `apps/demos/domain/`; apresentação em
  `apps/demos/presentation/`; pages finas em `apps/demos/pages/`.
- UI em português; dados sintéticos, públicos ou anonimizados.
- Nenhuma API paga obrigatória.

## Fontes da verdade

| Assunto                                 | Fonte                                     |
| --------------------------------------- | ----------------------------------------- |
| Copy, links, cases, CTAs e metadata     | `data/content.ts`                         |
| Publicação, tier, slug e page das demos | `contracts/demo-catalog.json`             |
| Dados das 3 âncoras                     | `contracts/demo-snapshots/*.json`         |
| Tokens visuais                          | `design/tokens.json`                      |
| Estado e fila                           | `docs/ROADMAP.md`                         |
| Arquitetura e deploy                    | `docs/ARQUITETURA.md`, `docs/OPERACAO.md` |
| Critérios de qualidade                  | `docs/QUALIDADE.md`                       |

Não edite manualmente arquivos gerados:
`app/design-tokens.css`, `apps/demos/presentation/tokens.py`,
`.streamlit/config.toml` e `contracts/demo-snapshots/*.json`.

## Gate técnico

Antes de considerar uma alteração pronta:

```powershell
npm run format
npm run verify
npm run demos:smoke
npm run test:e2e
npm audit --audit-level=moderate
```

Mudança visual também exige `npm run qa:visual`, `npm run qa:streamlit` e
`npm run lighthouse:all` com servidores locais ativos. Lighthouse deve manter
pelo menos 90 nas quatro categorias em desktop e mobile.

## Deploy e restrições

- Vercel: preset Next.js, sem `vercel.json` e sem `output: "export"`.
- Streamlit Cloud: repo `portfolio-lucas-batista`, branch `main`, main file
  `apps/demos/app.py`.
- Variáveis obrigatórias nos ambientes Vercel:
  `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_DEMOS_BASE_URL`.
- Não commitar `.env.local`, `.vercel/`, `.venv/`, `.artifacts/` ou segredos.
- Não reintroduzir o pacote `framer-motion`; usar `motion` para movimento curto.
- Não criar uma segunda fonte para slugs, tokens, copy ou cálculos.
- Não recriar `demos-logistica/`, clones de deploy, pastas `archive/` na árvore
  ativa ou sincronização por `robocopy`.
- Não publicar, alterar serviços externos ou fazer push sem autorização
  explícita.
