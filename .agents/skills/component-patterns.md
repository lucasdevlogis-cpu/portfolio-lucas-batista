# Skill: Padrões de componentes

> Canônico: [`docs/ARQUITETURA.md`](../../docs/ARQUITETURA.md) · [`design/design.md`](../../design/design.md).

## Landing

- `SectionShell`: wrapper semântico, largura e espaçamento de seção.
- `EditorialBadge`: rótulo curto; não transformar toda metadata em badge.
- `PremiumCard`: card claro/escuro; hover só quando houver ação ou agrupamento relevante.
- `SignatureCases`: 3 âncoras, thumbnail 16:9, pergunta, métrica e CTAs específicos.
- `CaseLibrary`: tabela em `lg+`, cards abaixo; filtros só com categorias não vazias e `aria-live`.
- `CaseDemoLauncher`: carrega `DemoModal` dinamicamente e mantém o rótulo visível no nome acessível.

## Modal híbrido

- Âncora: `DemoShell` inline + link `/provas/{slug}`; nenhum iframe.
- Complementar: contexto + preview + iframe Streamlit `?embed=true` + fallback.
- Dialog gerencia foco, ESC e retorno ao acionador.

## Provas React

`DemoShell → DemoHero → KpiRow → ChartCard/MapCard → MethodDisclosure → DemoNavigation`.

- Até 3 KPIs.
- ECharts e MapLibre em import dinâmico.
- Cores semânticas e formatos pt-BR.
- Gráfico tem resumo acessível; mapa é região nomeada com atribuição.
- Pergunta, decisão, método e limitação sempre visíveis.

## Botões

- Principal claro: `bg-ink text-white`.
- Principal teal com branco: `bg-accent-contrast`, nunca `bg-accent` para texto normal.
- Outline escuro: borda e fundo translúcidos, foco visível.
- Mobile: pelo menos 44 px.

## Não usar

- Componentes de `components/archive/`.
- FAQ no perfil, cockpit decorativo ou card sem função.
- Copy hardcoded fora de `data/content.ts`.
- `CaseLibraryDesktop`, `ProfileCockpit` ou iframe para as três âncoras.
