# AGENTS.md — Portfólio Lucas Batista

Instruções locais para qualquer agente que altere este repositório. Responda em
português do Brasil e leia `docs/CANON.md` e `docs/ARQUITETURA.md` antes de
editar.

## Objetivo do produto

Este projeto é um _Executive Proof System_: em até 60 segundos, um headhunter
deve entender o posicionamento de Lucas, as provas técnicas, a trajetória e os
canais de contato. Não transformar a interface em landing SaaS, currículo
genérico ou dashboard decorativo.

## Topologia canônica

O repositório é único:

```text
app/                    Next.js App Router e rotas /provas/{slug}
components/             UI ativa da landing e das provas React
data/content.ts         copy e metadados editoriais
apps/demos/             aplicação Streamlit completa
contracts/              catálogo e snapshots entre Python e TypeScript
design/tokens.json      tokens editáveis
scripts/                geração e validação
tests/e2e/              Playwright
docs/                   documentação canônica
.artifacts/             QA e intermediários locais, ignorados
```

Não recriar `demos-logistica/`, clones de deploy, pastas `archive/` na árvore
ativa ou sincronização por `robocopy`. O Streamlit Cloud deve usar este mesmo
repositório com main file `apps/demos/app.py`.

## Stack

- Next.js 16.2.10, React 19.2.4 e TypeScript;
- Tailwind CSS v4 em `app/globals.css`, sem `tailwind.config.ts`;
- Base UI para dialog, Lucide para ícones;
- ECharts e MapLibre carregados sob demanda nas 3 âncoras;
- Streamlit 1.58, Pandas, Plotly, Folium e NumPy nas complementares;
- Playwright, Lighthouse, ESLint, Ruff e pytest para qualidade.

## Fontes da verdade

| Assunto                                 | Fonte                                     |
| --------------------------------------- | ----------------------------------------- |
| Copy, links, cases, CTAs e metadata     | `data/content.ts`                         |
| Publicação, tier, slug e page das demos | `contracts/demo-catalog.json`             |
| Dados das 3 âncoras                     | `contracts/demo-snapshots/*.json`         |
| Tokens visuais                          | `design/tokens.json`                      |
| Estado e fila                           | `docs/ROADMAP.md`                         |
| Arquitetura e deploy                    | `docs/ARQUITETURA.md`, `docs/OPERACAO.md` |

`npm run tokens:sync` gera `app/design-tokens.css`,
`apps/demos/presentation/tokens.py` e `.streamlit/config.toml`. Não edite esses
arquivos manualmente.

`npm run demos:export` gera os snapshots a partir do Python. Não replique
cálculos em React.

## Organização ativa

A homepage segue esta ordem, igual no DOM e na navegação:

```text
Header → ExecutiveHero → EvidenceStrip → ProfileBrief
→ SignatureCases → TrajectoryBoard → ContactPanel → Footer
```

- componentes de seção: `components/sections/`;
- modal, shell, charts e mapa das provas: `components/demos/`;
- componentes básicos: `components/ui/`;
- componentes cliente apenas quando há interação real;
- bibliotecas pesadas devem continuar em import dinâmico.

## Regras de código

### React e TypeScript

- Server Components por padrão; mantenha a fronteira cliente pequena.
- Não use `any`, `console.log` em produção ou copy narrativa hardcoded em TSX.
- Passe apenas os dados necessários para Client Components.
- Use `next/image`, links externos com `rel="noopener noreferrer"` e ícones
  Lucide.
- Preserve um único `<main id="conteudo">` por página.

### Visual

- Mobile-first em 375 px; também validar 768 e 1440 px.
- Inter no corpo e Source Serif 4 nos títulos.
- Evitar arco-íris, glassmorphism, gradientes e sombras sem função.
- Cards apenas para agrupamento real; prefira divisores e espaço para listas.
- Até 3 KPIs por prova; gráfico ou mapa principal, método e limitação visíveis.
- Touch target mínimo de 44 px e contraste WCAG AA.

### Python

- domínio em `apps/demos/domain/`;
- apresentação em `apps/demos/presentation/`;
- pages finas em `apps/demos/pages/`;
- dados curados em `data/raw/` e gerados em `data/generated/`;
- UI em português, dados sintéticos/públicos/anonimizados e nenhuma API paga
  obrigatória.

## Comandos obrigatórios

Preparação:

```powershell
npm ci
pip install -r requirements-dev.txt
```

Após alterar tokens ou cálculos:

```powershell
npm run tokens:sync
npm run demos:build
npm run demos:export
```

Gate técnico:

```powershell
npm run verify:full
```

Se `data/content.ts` mudar, rode `npm run cv:generate`.

Antes do aceite visual, rode com `next start` ativo:

```powershell
npm run qa:visual
npm run qa:streamlit
npm run lighthouse:all
```

Artefatos locais pertencem a `.artifacts/` e não devem ser commitados.
Use `npm run format` antes do gate quando editar TypeScript, CSS, JSON,
Markdown ou Python.

## Deploy

- Vercel: preset Next.js, comandos e output automáticos, sem `vercel.json` e
  sem `output: "export"`.
- Streamlit Cloud: repo `portfolio-lucas-batista`, branch `main`, main file
  `apps/demos/app.py`.
- Variáveis obrigatórias nos três ambientes Vercel:
  `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_DEMOS_BASE_URL`.
- Não publicar, alterar serviços externos ou fazer push sem autorização
  explícita.

## Proibições

- Não commitar `.env.local`, `.vercel/`, `.venv/`, `.artifacts/` ou segredos.
- Não reintroduzir Framer Motion, helpers mortos ou componentes arquivados sem
  justificativa técnica e validação.
- Não criar uma segunda fonte para slugs, tokens, copy ou cálculos.
- Não usar exclusões amplas, reset destrutivo ou force-push.

Ao concluir, informe mudanças, preservações, testes executados, riscos e o
próximo passo real.
