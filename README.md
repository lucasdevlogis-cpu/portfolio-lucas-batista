# Portfólio Lucas Batista

Landing page profissional — inteligência operacional para logística, transporte, varejo e e-commerce.

## Posicionamento

**Tese central:** transformo dados espalhados, processos manuais e decisões lentas em clareza, controle e soluções digitais enxutas para operações de logística, transporte, varejo e e-commerce.

- **Público:** pequenas e médias empresas com operação rodando e dores de frete, SLA, last mile, ocorrências ou indicadores inconsistentes.
- **Escada de ofertas:** do diagnóstico rápido ao piloto com IA — o cliente começa comprando clareza, não um projeto grande.
- **Prova:** 10 cases demonstráveis com dados sintéticos, cada um respondendo a uma pergunta real de negócio.
- **Ética de dados:** dados públicos, sintéticos, anonimizados ou fornecidos pelo cliente com finalidade definida; limitação declarada em cada case.

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

Código em [`demos-logistica/`](demos-logistica/) — **11 pages** interativas (frete, roteirização, rede, last mile, ocorrências). Repositório dedicado no deploy: **[github.com/lucasdevlogis-cpu/demos-logistica](https://github.com/lucasdevlogis-cpu/demos-logistica)**.

A landing embute **10 demos** via modal (`DemoModal` + iframe `?embed=true`). Mapeamento em `CASE_DEMO_SLUGS` (`data/content.ts`).

```bash
cd demos-logistica
pip install -r requirements.txt
python scripts/build_datasets.py
python scripts/smoke_test.py   # 12/12 pages OK
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

Documentação enxuta — apenas o essencial. Conteúdo do site vive em [`data/content.ts`](data/content.ts) (fonte única, sem hardcode nos componentes).

| Doc | Conteúdo |
|-----|----------|
| [`docs/AVALIACAO.md`](docs/AVALIACAO.md) | Estado atual, pendências e próximos passos |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | Guia de deploy (Vercel + Streamlit) |
| [`design/design.md`](design/design.md) | Decisões visuais e de layout |

## Licença

Projeto pessoal — Lucas Batista © 2026
