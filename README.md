# Portfólio Lucas Batista

Casebook técnico para avaliação profissional de Lucas Batista em operações,
analytics e inteligência logística. A landing prioriza leitura executiva; as
provas mostram método, decisão apoiada, métrica e limitação.

## Arquitetura

O projeto é um único repositório com dois runtimes e contratos compartilhados:

| Camada                    | Tecnologia                                    | Caminho                 |
| ------------------------- | --------------------------------------------- | ----------------------- |
| Landing e 3 provas âncora | Next.js 16, React 19, TypeScript              | `app/`, `components/`   |
| 7 provas complementares   | Streamlit, Pandas, Plotly, Folium             | `apps/demos/`           |
| Catálogo e snapshots      | JSON validado por TypeScript e Python         | `contracts/`            |
| Tokens                    | JSON com geração para CSS, Python e Streamlit | `design/tokens.json`    |
| Testes e QA               | Playwright, Lighthouse, pytest e Ruff         | `tests/`, `scripts/qa/` |

Não existe mais sincronização manual entre duas cópias das demos. O entrypoint
canônico do Streamlit é `apps/demos/app.py` neste repositório.

## Preparação local

Requisitos: Node.js 24.x e Python 3.12+.

```powershell
npm ci
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env.local
```

```powershell
npm run dev
streamlit run apps/demos/app.py
```

- Next.js: <http://localhost:3000>
- Streamlit: <http://localhost:8501>

## Comandos principais

```powershell
npm run demos:build      # recria datasets gerados com seed fixa
npm run demos:export     # exporta os 3 snapshots âncora
npm run verify           # contratos, lint, tipos, pytest e build
npm run demos:smoke      # 13 checagens Streamlit
npm run test:e2e         # Playwright em build de produção
npm run qa:visual        # capturas em 375, 768 e 1440 px
npm run lighthouse:all  # performance, a11y, boas práticas e SEO
npm run cv:generate      # atualiza o CV a partir de data/content.ts
```

`npm audit --audit-level=moderate` deve terminar sem vulnerabilidades.

## Fontes da verdade

- narrativa, cases, CTAs e metadados: `data/content.ts`;
- catálogo de publicação e slugs: `contracts/demo-catalog.json`;
- cálculos exibidos pelas âncoras: `contracts/demo-snapshots/*.json`, exportados
  pelo Python;
- tokens visuais: `design/tokens.json`;
- estado e próximos passos: `docs/ROADMAP.md`.

## Variáveis de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

As variáveis `NEXT_PUBLIC_*` são incorporadas no build e exigem novo deploy
quando alteradas.

## Produção

| Serviço | URL                                                            |
| ------- | -------------------------------------------------------------- |
| Landing | <https://portfolio-lucas-batista-murex.vercel.app>             |
| Demos   | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| Código  | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |

Para a configuração de Vercel e Streamlit Cloud, consulte
[`docs/OPERACAO.md`](docs/OPERACAO.md).

## Documentação

Comece por [`docs/CANON.md`](docs/CANON.md). O índice completo está em
[`docs/README.md`](docs/README.md).
