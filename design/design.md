# Design — Executivo Brutalista Refinado

## Norte do produto

O portfólio é um **Executive Proof System**: um dossiê operacional que deixa
visíveis capacidade de decisão, repertório técnico e impacto. Não é currículo
decorado, landing SaaS nem galeria de dashboards.

Em menos de 60 segundos, um recrutador deve identificar:

1. posição e escopo profissional de Lucas;
2. três evidências quantitativas verificáveis;
3. como Lucas raciocina por meio das três provas âncora;
4. comparação das dez provas por decisão e método;
5. o caminho direto para contato.

## Personalidade

**Executivo brutalista refinado**: autoridade sem formalismo vazio, densidade
sem ruído e tecnologia sem estética genérica de produto B2B.

- campo quase preto e superfícies grafite;
- laranja como ação, índice e sinal técnico;
- verde exclusivamente para ganho, resultado e estado positivo;
- branco quente para texto principal e blocos de contraste;
- regras finas, cantos de 2–8 px e sombras raras;
- Hanken Grotesk para impacto, Inter para leitura e JetBrains Mono para dados;
- números grandes, títulos curtos e labels monoespaçados.

A referência visual está em
`design/references/stitch-executivo-brutalista-mobile.png`. Ela define direção,
não layout final. O desktop é uma composição editorial própria em até 1280 px.

## Composição canônica

1. `Header`: índice fixo, discreto e funcional.
2. `ExecutiveHero`: nome em escala monumental, posicionamento e ação.
3. `EvidenceStrip`: três números, sem ícones decorativos.
4. `ProfileBrief`: tese profissional, fit e modo de atuação.
5. `SignatureCases`: três provas âncora com evidência visual real.
6. `ProofComparison`: relatório comparativo filtrável, com as dez provas e sem
   galeria de cards.
7. `TrajectoryBoard`: cronologia comprimida e escaneável.
8. `ContactPanel`: bloco claro de conversão, sem formulário falso.

## Provas e demos

Toda prova pública começa pela decisão, não pela ferramenta:

`pergunta → decisão → até 3 KPIs → visual principal → método → limite → CTA`

As dez provas públicas usam React/Next e ECharts; MapLibre aparece somente onde
há evidência espacial. O Streamlit permanece como laboratório independente.
Python continua sendo a origem dos cálculos e exporta snapshots tipados para a
web.

## Gráficos

- Uma pergunta por gráfico.
- Barras horizontais para rótulos longos; linha somente para evolução temporal.
- Laranja para cenário/ação; verde para ganho; cinza para baseline.
- Escala honesta, unidade explícita e grid mínimo.
- Tooltip escuro, rótulos curtos e no máximo duas séries principais.
- Donut apenas para composição com poucas categorias; nunca arco-íris.

## Mapas

- MapLibre nas provas React, com mapa-base escuro e dados em laranja/verde.
- Linha de rota com casing, direção e contraste suficiente.
- Folium/Leaflet no laboratório recebe o mesmo tratamento visual enquanto existir.
- Atribuição sempre visível e limitação geográfica declarada.

## Movimento

Movimento sustenta narrativa e feedback:

- entrada curta do hero e das provas quando chegam ao viewport;
- sublinhado/índice ativo na navegação;
- elevação máxima de 2 px em CTA e mídia;
- transição de filtros e modal entre 160–320 ms;
- nenhum autoplay, parallax ou atraso artificial de leitura;
- `prefers-reduced-motion` elimina movimento não essencial.

## Responsividade

- 375 px: hierarquia vertical, nomes sem corte, ações com 44 px e índice rolável;
- 768 px: composição em duas colunas somente quando melhora leitura;
- 1440 px: conteúdo limitado a 1280 px e uso consciente de espaço negativo.

## Guardrails

Evitar cards dentro de cards, glassmorphism, gradientes decorativos, badges para
texto comum, ícones em círculos, cantos excessivamente arredondados, fontes
menores que 14 px e dashboards com muitas cores.

## Aceite visual

- a primeira dobra comunica posição, senioridade e ação sem depender de scroll;
- as três provas âncora são o centro visual da página;
- cada seção tem uma geometria própria e não parece variação do mesmo card;
- landing, rotas React e Streamlit compartilham tokens e comportamento;
- 375, 768 e 1440 px são comparados à referência no mesmo passe de QA;
- contraste, foco, teclado e reduced motion permanecem íntegros.
