# Portfólio Lucas Batista

Dossiê profissional — operações, dados e inteligência logística. **Executive Proof System** para headhunters e lideranças que avaliam fit técnico.

> **Comece aqui:** [`docs/CANON.md`](docs/CANON.md) · Arquitetura: [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) · Índice: [`docs/README.md`](docs/README.md)

## Posicionamento

- **Público:** headhunters, recrutadores e lideranças de operações/dados.
- **Prova:** 10 demos (3 âncora React + 7 biblioteca Streamlit) + 1 roadmap; contexto, métrica e limitação declarada.
- **Contato:** LinkedIn, email, GitHub e CV PDF — sem formulário.

## Stack

- Next.js 16.2.10 (App Router) + React 19 + TypeScript · Node 24.x
- Tailwind CSS v4 + shadcn/ui + Lucide React + ECharts + MapLibre GL JS nas provas âncora
- Deploy: Vercel (nativo — **sem** static export) + Streamlit Cloud

## Desenvolvimento

```bash
npm install
npm run dev
npm run tokens:sync
npm run demos:export
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e          # 14 testes
npm audit --audit-level=moderate
npm run cv:generate   # após editar data/content.ts
```

Abre [http://localhost:3000](http://localhost:3000).

Para Lighthouse, sirva o build com `npm run start` e, em outro terminal, rode `npm run lighthouse:all`.
No mesmo servidor, `npm run qa:visual` revalida o modal e atualiza as capturas em 375, 768 e 1440 px.

## Variáveis de ambiente

Copie `.env.example` → `.env.local`:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública (Vercel) |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL base Streamlit (**obrigatória no build**) |

## Demos Streamlit

Pasta [`demos-logistica/`](demos-logistica/) · repo de deploy: [demos-logistica](https://github.com/lucasdevlogis-cpu/demos-logistica).

```bash
cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py      # 13/13
python scripts/validate_slugs.py  # 10/10
```

## Produção

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |

Guia: [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Documentação

| Doc | Papel |
|-----|-------|
| [`docs/CANON.md`](docs/CANON.md) | Entrada única |
| [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) | Arquitetura |
| [`docs/AVALIACAO.md`](docs/AVALIACAO.md) | Estado / saúde |
| [`design/design.md`](design/design.md) | Spec visual |
| [`data/content.ts`](data/content.ts) | Copy ativo |
| [`AGENTS.md`](AGENTS.md) | Guia para agentes |

## Licença

Projeto pessoal — Lucas Batista © 2026
