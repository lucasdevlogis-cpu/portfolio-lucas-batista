# Portfólio Lucas Batista

Dossiê profissional — operações, dados e inteligência logística. **Executive Proof System** para headhunters e lideranças que avaliam fit técnico.

> **Documentação canônica:** [`docs/CANON.md`](docs/CANON.md) — leia primeiro.

## Posicionamento

- **Público:** headhunters, recrutadores e lideranças de operações/dados.
- **Prova:** 10 demos navegáveis (3 âncora + biblioteca) com contexto de negócio, métrica e limitação declarada.
- **Contato:** LinkedIn, email, GitHub e CV PDF — sem formulário.

Copy shelved (landing comercial): [`components/archive/consultoria/`](components/archive/consultoria/) + [`data/archive/content-consultoria.ts`](data/archive/content-consultoria.ts).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui + Lucide React
- Deploy: Vercel (Next.js nativo — **sem** static export)

## Desenvolvimento

```bash
npm install
npm run dev
npm run cv:generate   # regen CV PDF após editar data/content.ts
```

Abre [http://localhost:3000](http://localhost:3000). Node **24.x** (`engines` no `package.json`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (Vercel) |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL base do Streamlit Cloud (**obrigatória no build**) |

Sync: `npx vercel env pull .env.local` · [`docs/VERCEL.md`](docs/VERCEL.md)

## Demos Streamlit

[`demos-logistica/`](demos-logistica/) — 11 pages. Deploy: [github.com/lucasdevlogis-cpu/demos-logistica](https://github.com/lucasdevlogis-cpu/demos-logistica).

10 demos embutidas via `DemoModal` (`?embed=true`). Mapeamento: `CASE_DEMO_SLUGS` em `data/content.ts`.

```bash
cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

## Deploy

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |

[`docs/DEPLOY.md`](docs/DEPLOY.md) · Vercel: Output Directory **vazio**.

## Documentação

| Doc | Papel |
|-----|-------|
| [`docs/CANON.md`](docs/CANON.md) | **Entrada única** |
| [`docs/AVALIACAO.md`](docs/AVALIACAO.md) | Estado e fases |
| [`design/design.md`](design/design.md) | Spec visual |
| [`data/content.ts`](data/content.ts) | Copy ativo |

## Licença

Projeto pessoal — Lucas Batista © 2026
