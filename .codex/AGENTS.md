# Portfólio Lucas Batista — regras Codex do projeto

Leia primeiro [`AGENTS.md`](../AGENTS.md), depois
[`docs/CANON.md`](../docs/CANON.md) e
[`docs/ARQUITETURA.md`](../docs/ARQUITETURA.md). Não mantenha uma segunda
versão dessas regras aqui.

## Contexto essencial

- Produto: _Executive Proof System_ headhunter-first.
- Repositório único: Next.js na raiz e Streamlit em `apps/demos/`.
- Copy: `data/content.ts`.
- Catálogo: `contracts/demo-catalog.json`.
- Snapshots Python → React: `contracts/demo-snapshots/`.
- Tokens: `design/tokens.json` → `npm run tokens:sync`.
- Estado e fila: `docs/ROADMAP.md`.
- Operação: `docs/OPERACAO.md`.

Não recrie `demos-logistica/`, arquivos `archive/`, Framer Motion ou listas
paralelas de slugs. Não publique nem faça push sem autorização explícita.

## Gate local

```powershell
npm run format
npm run verify
npm run demos:smoke
npm run test:e2e
npm audit --audit-level=moderate
```

Para mudanças visuais, execute ainda `npm run qa:visual`,
`npm run qa:streamlit` e `npm run lighthouse:all` com os serviços locais
ativos. O critério e os resultados ficam em `docs/QUALIDADE.md`.
