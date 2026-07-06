# Portfólio Lucas Batista

Dossiê profissional — operações, dados e inteligência logística. **Executive Proof System** para headhunters e lideranças que avaliam fit técnico.

## Posicionamento

- **Público:** headhunters, recrutadores e lideranças de operações/dados.
- **Prova:** 10 demos navegáveis (3 âncora + biblioteca) com contexto de negócio, métrica e limitação declarada.
- **Contato:** LinkedIn, email e GitHub — sem formulário como foco.

Landing comercial anterior (Dores, Serviços, etc.) shelved em [`components/archive/consultoria/`](components/archive/consultoria/).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + Lucide React
- Deploy: Vercel (Next.js nativo — **sem** static export)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Node **24.x** (`engines` no `package.json`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (Vercel) |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL base do Streamlit Cloud (**obrigatória no build** para links de demo) |

Sync com a Vercel: `npx vercel env pull .env.local`. Detalhes: [`docs/VERCEL.md`](docs/VERCEL.md).

## Demos Streamlit

Código em [`demos-logistica/`](demos-logistica/) — **11 pages** interativas (frete, roteirização, rede, last mile, ocorrências). Repositório dedicado no deploy: **[github.com/lucasdevlogis-cpu/demos-logistica](https://github.com/lucasdevlogis-cpu/demos-logistica)**.

A landing embute **10 demos** via modal (`DemoModal` + iframe `?embed=true`). Mapeamento em `CASE_DEMO_SLUGS` (`data/content.ts`).

```bash
cd demos-logistica
pip install -r requirements.txt
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens (12 scripts + 1 borda torre)
streamlit run app.py
```

## Deploy

| Serviço | URL produção |
|---------|----------------|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |

Guia completo: [`docs/DEPLOY.md`](docs/DEPLOY.md)

**Vercel:** importe o repo, Framework **Next.js**, Output Directory **vazio** (override desligado). Não use `vercel.json` com `outputDirectory`.

## Documentação

Conteúdo do site: [`data/content.ts`](data/content.ts). Spec ativa: [`design/design.md`](design/design.md). Estado: [`docs/AVALIACAO.md`](docs/AVALIACAO.md).

| Doc | Conteúdo |
|-----|----------|
| [`docs/AVALIACAO.md`](docs/AVALIACAO.md) | Estado atual, bloqueadores e fases |
| [`docs/VERCEL.md`](docs/VERCEL.md) | Auditoria Vercel, env vars, MCP |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | Deploy Vercel + Streamlit |
| [`docs/OPORTUNIDADES_DEMOS.md`](docs/OPORTUNIDADES_DEMOS.md) | Backlog visual/UX das demos |
| [`design/design.md`](design/design.md) | Spec visual ativa (Executive Proof System) |
| [`design/tokens.md`](design/tokens.md) | Tokens CSS resumidos |
| [`design/archive/`](design/archive/) | Planos e specs shelved |
| [`AGENTS.md`](AGENTS.md) | Guia para agentes de código |

## Licença

Projeto pessoal — Lucas Batista © 2026
