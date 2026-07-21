# Design — Executive Proof System

## Norte

O visual deve comunicar repertório executivo e capacidade técnica sem parecer
template SaaS. A referência é um casebook editorial: tipografia forte, densidade
controlada, superfícies claras e contraste alto.

## Hierarquia

1. Nome e posicionamento.
2. Evidências quantitativas.
3. Fit profissional.
4. Três provas âncora.
5. Biblioteca complementar.
6. Trajetória e contato.

Cada seção precisa justificar sua presença. Informação repetida é removida, não
reembalada em outro card.

## Linguagem visual

- base editorial quente e superfícies brancas;
- azul escuro para autoridade e estrutura;
- teal para ação, seleção e dados primários;
- dourado somente para ênfase editorial;
- verde, âmbar e vermelho apenas para estado semântico;
- Source Serif 4 para títulos e Inter para interface/corpo;
- raio moderado, borda discreta e sombra curta.

Evitar:

- gradientes em todos os blocos;
- glassmorphism e blur decorativo;
- pilhas de badges para texto que cabe em uma linha;
- cards dentro de cards;
- animação de entrada que atrasa leitura;
- dashboards com muitas cores ou métricas sem ação.

## Componentes

### Landing

- `SectionShell`: largura, ritmo e cabeçalho de seção;
- `EditorialBadge`: eyebrow pontual, não categoria repetida em massa;
- `PremiumCard`: agrupamento editorial simples;
- `CaseThumbnail`: evidência visual somente nas âncoras;
- `CaseLibrary`: lista filtrável, tabela no desktop e cards compactos no mobile;
- `ContactPanel`: caminhos diretos sem formulário decorativo.

### Provas

- `DemoShell`: estrutura comum;
- `DemoHero`: pergunta e decisão;
- `KpiRow`: no máximo 3 indicadores;
- `ChartCard`: ECharts analítico;
- `MapCard`: MapLibre com atribuição e limitação;
- `MethodDisclosure`: método e limite;
- `DemoNavigation`: retorno ao casebook.

As âncoras usam esses componentes no modal e na rota pública. Complementares
usam o sistema de apresentação em `apps/demos/presentation/`.

## Gráficos

- Começar pela comparação que sustenta a decisão.
- Preferir barras, linha temporal e mapa quando forem a forma mais direta.
- Até duas séries principais; estado semântico pode usar três cores.
- Tooltips em português e unidade em eixo/legenda.
- Referência em traço discreto e domínio calculado para não achatar os dados.
- Tabela é fallback de detalhe, não visual principal.

## Mapas

- Usar mapa apenas quando distância, cobertura, corredor ou região importam.
- Teal e azul para rede/rota; cores semânticas para status.
- Informar que coordenadas são aproximadas quando aplicável.
- Preservar atribuição do OpenStreetMap.

## Responsividade

- 375 px: uma coluna, CTA 44 px+, contexto recolhível e iframe sob demanda;
- 768 px: transição sem saltos de hierarquia;
- 1440 px: largura editorial, sem esticar texto ou gráfico indefinidamente.

## Movimento

Somente feedback curto de hover, foco, dialog e carregamento. Todo movimento
deve respeitar `prefers-reduced-motion`. Não usar biblioteca de animação para
efeitos que CSS resolve.

## Critério de aceite

- leitura principal compreensível sem interação;
- cada prova explicita pergunta, decisão, métrica, método e limite;
- nenhuma seção usa decoração para compensar conteúdo fraco;
- contraste, foco e touch targets aprovados;
- capturas em 375, 768 e 1440 px revisadas em navegador real;
- Lighthouse ≥ 90 nas quatro categorias.
