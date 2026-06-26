# Portfólio Lucas Batista

Landing page profissional — inteligência operacional para logística, transporte, varejo e e-commerce.

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
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ID do formulário Formspree (opcional) |

## Demos Streamlit

Código em [`demos-logistica/`](demos-logistica/). Repositório dedicado: **[github.com/lucasdevlogis-cpu/demos-logistica](https://github.com/lucasdevlogis-cpu/demos-logistica)**.

## Deploy

| Serviço | URL produção |
|---------|----------------|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |

Guia completo: [`docs/DEPLOY.md`](docs/DEPLOY.md)

**Vercel:** importe o repo, Framework **Next.js**, Output Directory **vazio** (override desligado). Não use `vercel.json` com `outputDirectory`.

## Documentação

| Doc | Conteúdo |
|-----|----------|
| [`docs/INDEX.md`](docs/INDEX.md) | Mapa da documentação |
| [`docs/AVALIACAO.md`](docs/AVALIACAO.md) | Avaliação atual, problemas e próximos passos |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Fases de execução |

## Licença

Projeto pessoal — Lucas Batista © 2026
