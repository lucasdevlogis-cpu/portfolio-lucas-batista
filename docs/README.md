# Documentação — índice

> Comece em **[`CANON.md`](CANON.md)**. Este índice só organiza a leitura.

## Hierarquia SSOT

| Tier | Doc | Papel |
|------|-----|-------|
| 0 | [`CANON.md`](CANON.md) | Entrada única — o que é oficial |
| 1 | [`ARQUITETURA.md`](ARQUITETURA.md) | Mapa estrutural do sistema |
| 1 | [`../data/content.ts`](../data/content.ts) | Copy, cases, CTAs |
| 1 | [`../design/design.md`](../design/design.md) | Spec visual |
| 1 | [`../design/tokens.json`](../design/tokens.json) + [`../design/tokens.md`](../design/tokens.md) | Fonte e catálogo de tokens |
| 1 | [`AVALIACAO.md`](AVALIACAO.md) | Saúde / status |
| 2 | [`DEPLOY.md`](DEPLOY.md), [`VERCEL.md`](VERCEL.md) | Como publicar |
| 2 | [`P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md) | Fila ativa e próximos passos |
| 3 | [`A11Y.md`](A11Y.md), [`MOBILE_SPEC.md`](MOBILE_SPEC.md) | Specs profundas |
| 3 | [`MAPEAMENTO.md`](MAPEAMENTO.md) | Inventário detalhado do repo |
| 3 | [`../AGENTS.md`](../AGENTS.md) | Guia completo para agentes |
| 3 | [`audit/`](audit/README.md) | Evidências e automações de QA |
| 3 | [`OPORTUNIDADES_DEMOS.md`](OPORTUNIDADES_DEMOS.md) | Backlog técnico das demos |
| 4 | [`.agents/skills/`](../.agents/skills/) | Skills (apontam para docs canônicos) |
| 5 | [`archive/`](archive/) | Histórico — não usar como verdade |

## Leitura rápida por persona

| Persona | Caminho |
|---------|---------|
| Humano (clone/run) | [`../README.md`](../README.md) → CANON → DEPLOY |
| Agente de código | CANON → ARQUITETURA → AGENTS → skill relevante |
| Design / UX | design.md → tokens.md → A11Y / MOBILE_SPEC |
| Deploy | DEPLOY → VERCEL |
| Demos | [`../demos-logistica/README.md`](../demos-logistica/README.md) + `docs/cases/` |

## Regras anti-deriva

1. **Não duplique** hex, ordem de seções ou contagem de cases fora da SSOT.
2. Skills e `.cursorrules` **espelham** `tokens.md` / CANON — não inventam valores.
3. Status de saúde vive em `AVALIACAO.md` — não em relatórios soltos na raiz.
4. Artefatos de QA pontuais vão para `docs/archive/` ou `docs/audit/`.
