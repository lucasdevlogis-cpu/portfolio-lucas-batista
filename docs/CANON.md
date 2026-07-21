# CANON — Executive Proof System

Atualizado em 21/07/2026.

## Objetivo

O portfólio é um casebook técnico _headhunter-first_. Em até 60 segundos deve
responder:

1. Quem é Lucas e qual posição faz sentido?
2. Que resultados e repertório sustentam o perfil?
3. Quais provas podem ser abertas e verificadas?
4. Como entrar em contato?

Não é landing comercial, currículo genérico, catálogo de tecnologias ou
dashboard sem decisão associada.

## Experiência canônica

```text
Header
→ Hero executivo
→ Evidências rápidas
→ Perfil em 60 segundos
→ 3 provas âncora + biblioteca de 7 provas
→ Trajetória
→ Contato
→ Footer
```

A navegação pública usa `Perfil · Provas · Trajetória · Contato`.

## Inventário de provas

| Grupo          | Quantidade | Renderização                                     |
| -------------- | ---------: | ------------------------------------------------ |
| Âncoras        |          3 | React/Next em `/provas/{slug}` e dentro do modal |
| Complementares |          7 | Streamlit em iframe ou nova aba                  |
| Roadmap        |          1 | conteúdo editorial, sem link publicado           |

Âncoras: precificação de frete, torre de controle e CVRP urbano.

O catálogo completo está em `contracts/demo-catalog.json`. Um case só é
publicado se catálogo, `data/content.ts`, page Python e URL derivada forem
consistentes.

## Fontes da verdade

| Domínio                               | Editar                        | Gerado/consumidor                 |
| ------------------------------------- | ----------------------------- | --------------------------------- |
| Copy, carreira, cases, CTA e metadata | `data/content.ts`             | componentes, metadata e CV        |
| Slug, page, tier e publicação         | `contracts/demo-catalog.json` | Next, validações e Streamlit      |
| Cálculos das âncoras                  | Python em `apps/demos/`       | `contracts/demo-snapshots/*.json` |
| Tokens                                | `design/tokens.json`          | CSS, Python e config Streamlit    |
| Fila                                  | `docs/ROADMAP.md`             | execução e handoff                |

Arquivos gerados não devem ser editados manualmente.

## Princípios de produto

- Uma prova começa pela pergunta de negócio, não pela biblioteca usada.
- Cada prova mostra decisão, até 3 KPIs, visual principal, método e limitação.
- Visualizações usam paleta semântica curta; nada de arco-íris.
- A landing é seletiva; profundidade fica nas provas.
- Dados são sintéticos, públicos ou anonimizados.
- O modal não replica um site nas âncoras: renderiza o shell React diretamente.
- Streamlit continua como motor exploratório das complementares.

## Estado confirmado nesta refatoração

- topologia de repositório único validada;
- clones locais antigos arquivados fora da árvore ativa, sem perda de histórico;
- tokens sincronizados;
- catálogo e 3 snapshots válidos;
- datasets reproduzíveis;
- TypeScript, ESLint, Ruff, pytest e build aprovados;
- smoke Streamlit 13/13;
- Playwright 17/17;
- QA visual renovado em 375, 768 e 1440 px;
- QA Streamlit local em 12 rotas desktop e 7 embeds mobile;
- QA Streamlit público na origem canônica em 12 rotas desktop e 7 embeds mobile;
- Lighthouse de produção desktop 100/100/100/100 e mobile 99/100/100/100;
- `npm audit` com 0 vulnerabilidades;
- CV regenerado a partir do conteúdo atual.

Resultados detalhados e próximos passos ficam em `QUALIDADE.md` e `ROADMAP.md`.
A PR arquitetural foi mesclada, a CI da `main` está verde e a landing está em
produção na Vercel. A aplicação Streamlit canônica já está publicada e validada;
o P0 externo restante é recompilar a landing com a nova origem e validar o corte.

## URLs públicas

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Demos:
  <https://portfolio-lucas-batista-asbsqusjhhbyje6pktjpvw.streamlit.app>
- Repositório canônico:
  <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista>

A aplicação Streamlit usa este repositório, a branch `main` e o entrypoint
`apps/demos/app.py`. A aplicação legada permanece apenas como rollback até o
corte da landing ser confirmado, conforme `OPERACAO.md`.
