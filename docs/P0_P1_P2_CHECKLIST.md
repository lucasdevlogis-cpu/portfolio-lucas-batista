# Fila de continuidade — Portfólio Lucas Batista

> Fila ativa após a consolidação de 20/07/2026. O estado comprovado fica em [`AVALIACAO.md`](AVALIACAO.md); decisões estruturais ficam em [`CANON.md`](CANON.md) e [`ARQUITETURA.md`](ARQUITETURA.md).

## Entrega consolidada

| Frente | Estado | Evidência |
|---|---|---|
| Landing mais seletiva e menos decorativa | Concluída | Hero, perfil, provas, trajetória e contato revisados |
| 3 provas âncora em React/Next | Concluída | `/provas/precificacao_frete`, `/provas/mini_torre_controle`, `/provas/cvrp_urbano` |
| Modal híbrido | Concluído | Âncoras inline; 7 complementares em iframe Streamlit |
| Contrato Python → JSON → TypeScript | Concluído | `export_demo_snapshots.py` + `validate-demo-contract.ts` |
| Tokens compartilhados | Concluídos | `design/tokens.json` gera CSS e `brand.py` |
| Limpeza de legado e helpers | Concluída | helpers sem referência removidos; artefatos de QA isolados em `docs/audit/` |
| Foto placeholder | Resolvida | asset e JSON-LD removidos; só voltar com foto profissional real |
| Dependências e segurança | Concluídas | Next 16.2.10; `npm audit` com 0 vulnerabilidades |
| Qualidade automatizada | Concluída | build limpo, E2E 14/14, demos 13/13, slugs 10/10 |
| Lighthouse local | Concluído | desktop 100/100/100/100; mobile 91/100/100/100 |

## P0 — liberar a versão

Estas ações dependem do ciclo de publicação, não de correção local adicional.

1. Publicar o commit de consolidação na branch `main`.
2. Confirmar deploy Vercel `READY` e as três rotas `/provas/{slug}`.
3. Sincronizar `demos-logistica/` com o repositório de deploy do Streamlit.
4. Executar smoke em produção: landing, modal âncora, iframe complementar, contatos, CV, OG, robots e sitemap.
5. Repetir Lighthouse na URL pública; registrar o resultado em `AVALIACAO.md` sem substituir a medição local.

## P1 — próxima fase de produto

| Ordem | Trabalho | Resultado esperado |
|---:|---|---|
| 1 | Elevar as 7 demos Streamlit secundárias | Mesma linguagem visual das âncoras, menos CSS frágil e leitura executiva mais curta |
| 2 | Separar `data/raw/` de `data/generated/` | Origem, artefatos reprodutíveis e limpeza do diretório de dados explícitas |
| 3 | Criar baseline de regressão visual | Capturas comparáveis em 375, 768 e 1440 px no CI |
| 4 | Testar acessibilidade assistiva | NVDA, foco, nomes acessíveis e leitura dos mapas/gráficos |
| 5 | Medir Web Vitals em produção | Decidir se Vercel Speed Insights agrega valor antes de instalar |

## P2 — diferenciação opcional

- Domínio próprio.
- Foto profissional real; não usar avatar, stock ou placeholder.
- Thumbnails autorais para as 7 provas complementares.
- Estado compartilhável por query string nas provas âncora, somente se houver necessidade real de exploração.
- Componente React compartilhado com Streamlit apenas se reduzir manutenção; não introduzir por estética isolada.

## Decisões preservadas

- Next.js é a superfície pública e hospeda as três provas âncora.
- Streamlit continua como motor exploratório das sete provas complementares.
- ECharts e MapLibre carregam apenas quando uma prova âncora é aberta.
- `data/content.ts` continua como SSOT de copy e metadados da landing.
- `design/tokens.json` é a única fonte editável de cor, raio e dimensões compartilhadas.
- Nenhuma correção automática forçada de dependências; upgrades são explícitos e verificados.
- O navegador embutido segue como limitação externa quando retorna `sandboxPolicy`; Playwright Chromium é o fallback operacional já validado.

## Critério de pronto da próxima rodada

Uma rodada só termina com:

```bash
npm run tokens:sync
npm run demos:export
npm run validate && npm run lint && npm run typecheck && npm run build
npm run test:e2e
npm audit --audit-level=moderate

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py
python scripts/validate_slugs.py
```

Para mudanças visuais, servir o build com `npm run start` e executar `npm run qa:visual` e `npm run lighthouse:all`.

---

*Atualize esta fila ao concluir um item ou quando uma decisão de produto mudar; não replique backlog em outros documentos.*
