# CANON — Executive Proof System

Atualizado em 21/07/2026.

## Objetivo

O portfólio é um dossiê operacional _headhunter-first_. Em até 60 segundos deve
responder:

1. Quem é Lucas e qual posição faz sentido?
2. Que resultados e repertório sustentam o perfil?
3. Quais provas podem ser abertas e verificadas?
4. Como entrar em contato?

Não é landing comercial, currículo genérico, catálogo de tecnologias ou
dashboard sem decisão associada. Seu posicionamento visual canônico é
**Executivo Brutalista Refinado**: escuro, preciso, tipográfico e orientado a
evidência.

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
| Complementares |          7 | Streamlit como laboratório durante a migração    |
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
- React/Next é a experiência pública desejada para as dez provas.
- Streamlit é laboratório técnico e fallback transitório, não o framework
  visual final do portfólio.
- Python permanece como origem de cálculos e contratos; a interface React não
  duplica regra de negócio.

## Norte visual

- Hanken Grotesk em títulos, Inter em leitura e JetBrains Mono em dados.
- Fundo quase preto, grafite em superfícies, laranja em ação e verde em ganho.
- Regras finas e cantos precisos substituem cards arredondados e sombras.
- Números, screenshots e decisões têm prioridade sobre ícones decorativos.
- Movimento é curto, funcional e respeita `prefers-reduced-motion`.
- A referência fornecida pelo usuário está versionada em `design/references/`;
  `design/design.md` registra decisões e desvios intencionais.

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
- Lighthouse de produção desktop 100/100/100/100 e mobile 96/100/100/100;
- `npm audit` com 0 vulnerabilidades;
- CV regenerado a partir do conteúdo atual.

Resultados detalhados e próximos passos ficam em `QUALIDADE.md` e `ROADMAP.md`.
A CI da `main` está verde, a landing foi recompilada com a origem Streamlit
canônica e a integração pública foi validada. A aplicação legada permanece
somente como rollback até sua retirada deliberada.

## URLs públicas

- Landing: <https://portfolio-lucas-batista-murex.vercel.app>
- Demos:
  <https://portfolio-lucas-batista-asbsqusjhhbyje6pktjpvw.streamlit.app>
- Repositório canônico:
  <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista>

A aplicação Streamlit usa este repositório, a branch `main` e o entrypoint
`apps/demos/app.py`. A aplicação legada permanece apenas como rollback até o
corte da landing ser confirmado, conforme `OPERACAO.md`.
