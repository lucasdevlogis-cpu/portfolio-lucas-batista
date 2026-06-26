# Portfólio Lucas Batista

Landing page profissional — inteligência operacional para logística, transporte, varejo e e-commerce.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + Lucide React
- Static export (`output: 'export'` → pasta `dist/`)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (Vercel) |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL base do Streamlit Cloud |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ID do formulário Formspree (opcional) |

## Demos Streamlit

Código em [`demos-logistica/`](demos-logistica/). Repositório dedicado: [demos-logistica](https://github.com/lucas109895-dev/demos-logistica).

## Deploy

- **Landing:** Vercel — importe este repo, output `dist`
- **Demos:** [Streamlit Cloud](https://share.streamlit.io) — repo `demos-logistica`, main file `app.py`

## Documentação

Consulte [`docs/INDEX.md`](docs/INDEX.md) para roteiro completo do projeto.

## Licença

Projeto pessoal — Lucas Batista © 2026
