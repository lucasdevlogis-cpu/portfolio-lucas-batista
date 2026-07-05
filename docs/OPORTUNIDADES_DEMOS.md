# Oportunidades de Melhoria — Demos Visuais

> **Data:** 05/07/2026  
> **Contexto:** Análise pós-deploy das demos Streamlit com foco em **desktop-first**. As demos atualmente são embedadas via iframe (`?embed=true`) no modal da landing, mas o formato de consumo principal é **navegador desktop em tela cheia** (usuário clicando "Abrir em nova aba").
>
> **Premissa:** O Streamlit é excelente para protótipos rápidos e validação de conceito, mas **não é uma plataforma de visualização de dados premium**. Este documento propõe alternativas e melhorias para elevar a percepção de valor das demos.

---

## 1. Diagnóstico do Streamlit como Plataforma Visual

### 1.1 Limitações Inerentes (arquitetura)

| Problema | Impacto Visual | Observação |
|----------|---------------|------------|
| **Layout estático (top-down)** | Impossível criar dashboards tipo "grid" ou "drag-and-drop" | Tudo é empilhado verticalmente; sem controle de posicionamento absoluto |
| **Sidebar binária (aberta/fechada)** | Ocupa ~20% da largura ou some completamente | No desktop, desperdiça espaço lateral quando colapsada |
| **Componentes padrão do Streamlit** | Visual genérico, "cartão de Bootstrap"; não há cards estilizados | `st.metric`, `st.dataframe`, `st.info` têm aparência de "framework de admin" |
| **Mapas Plotly em iframe** | Interação limitada, zoom lento, sem tiles customizados | `scatter_map` usa WebGL do Plotly, não Leaflet/MapLibre nativo |
| **Gráficos Plotly sem modebar** | Perde funcionalidade (zoom, pan, save) em troca de "limpeza" | Decisão correta para embed, mas limita exploração no desktop |
| **Falta de animações/transições** | Sem `st.animation`, transições de estado são instantâneas e brutas | Troca de filtros recarrega tudo abruptamente |
| **Fonte limitada** | `sans serif` genérico; não carrega Inter/Outfit do projeto | Streamlit não permite fontes custom via tema |

### 1.2 Problemas Visuais Específicos (constatados)

#### Mapas
- **Linhas retas (Haversine)** entre pontos: visualmente "plano" e técnicamente incorreto para apresentação. No Brasil, as rotas reais seguem rodovias — linhas retas cortam o relevo, rios, cidades.
- **Sem setas de direção** em rotas CVRP/TSP: impossível saber a sequência de visitas apenas olhando o mapa.
- **Marcadores idênticos** para todos os pontos: sem diferenciação visual entre CD, entrega, hub, loja.
- **Sem clustering** em mapas densos (promessa CEP, auditoria): 100+ pontos sobrepostos criam "sopa de pixels".
- **Legendas horizontais no topo** competem com o título da seção por espaço vertical.

#### Gráficos
- **Cores contínuas em bar charts** (ranking de custo/ton): o gradiente verde→vermelho confunde mais do que ajuda; categorias discretas (verde/amarelo/vermelho) seriam melhores.
- **Donut chart na torre de controle**: donut é pior que barra para comparação de categorias. Olhos humanos comparam comprimentos melhor do que ângulos.
- **Falta de linhas de referência**: frete vs piso ANTT sem linha de "100%"; ocupação vs capacidade sem linha de "100%".
- **Tooltips genéricos** do Plotly: mostram coordenadas brutas em vez de informação acionável (nome da cidade, entrega, status).
- **Altura inconsistente** entre gráficos (340px vs 420px vs 460px): quebra o ritmo visual da page.

#### Tabelas
- **Sem formatação condicional**: `st.dataframe` puro não destaca status crítico, valores acima do limite, ou scores baixos.
- **Números sem formatação**: `1234.5` em vez de `R$ 1.234,50`; `15.3` em vez de `+15,3%`.
- **Alinhamento à esquerda** para todos os valores: dificulta comparação visual de números.
- **Sem ícones de status**: texto "Atrasado" em vez de 🔴 "Atrasado" ou barra de progresso para score de confiança.

#### Layout Geral
- **Scroll infinito**: todas as pages são uma longa página sem quebras visuais. Não há "capítulos" ou seções separadas.
- **Sem tabs/steps**: demos profundas (precificação, CVRP, rede) poderiam ser organizadas em "Visão Geral → Análise → Detalhe" mas são empilhadas linearmente.
- **KPIs neutros**: `st.metric` não usa cores para sinalizar severidade (verde=OK, amarelo=atenção, vermelho=critico).
- **Falta de CTA final**: após a tabela, o usuário não tem próximo passo claro (só expanders de texto).

---

## 2. Oportunidades de Melhoria por Categoria

### 2.1 Mapas — Oportunidades

| # | Oportunidade | Impacto | Esforço | Framework Alternativo |
|---|-------------|---------|---------|----------------------|
| 1 | **Roteamento real (OSRM)** | Linhas seguem rodovias reais, não Haversine | Alto | OSRM + Folium + Leaflet |
| 2 | **Setas de direção nas rotas** | Indica claramente A→B→C | Baixo | Plotly `annotation` + marcadores numerados |
| 3 | **Ícones diferenciados por tipo** | CD=depósito, entrega=caixa, hub=estrela | Baixo | Plotly `marker_symbol` ou Folium `custom_icon` |
| 4 | **Clustering de pontos** | 100+ pontos não se sobrepõem | Médio | Leaflet `MarkerCluster` (Folium) ou Deck.gl |
| 5 | **Mapa de calor (choropleth)** | Para análise territorial de CEP | Médio | Plotly `choropleth_map` ou Folium `HeatMap` |
| 6 | **Remover legendas redundantes** | Ganha 40px de altura no embed | Baixo | `showlegend=False` + título descritivo |
| 7 | **Tiles customizados** | Mapa visualmente mais limpo (CartoDB, Stamen) | Baixo | Folium `tiles="CartoDB positron"` |

**Recomendação:** Migrar mapas de Plotly `Scattermap` para **Folium + Leaflet** ou **Deck.gl (via PyDeck)**. Isso permite:
- Tiles customizados (visual mais limpo)
- Clustering nativo
- Ícones customizados (FontAwesome/Material)
- Roteamento real (via OSRM ou ORS API)
- Setas de direção (plugins do Leaflet)

### 2.2 Gráficos — Oportunidades

| # | Oportunidade | Impacto | Esforço | Implementação |
|---|-------------|---------|---------|---------------|
| 1 | **Substituir donut por stacked bar** | Comparação de status mais precisa | Baixo | `px.bar` com `color="status"` |
| 2 | **Cores semânticas discretas** | Verde=OK, amarelo=atenção, vermelho=critico | Baixo | `color_discrete_map` explícito no Plotly |
| 3 | **Linhas de referência** | Piso ANTT, capacidade 100%, prazo máximo | Baixo | `add_hline`/`add_vline` no Plotly |
| 4 | **Tooltips customizados** | Informação acionável, não coordenadas | Médio | `hovertemplate` no Plotly |
| 5 | **Pareto charts (80/20)** | "20% das lanes = 80% do custo" | Médio | Cumsum + dual axis no Plotly |
| 6 | **Sparklines na tabela** | Tendência em linha (histórico de atraso) | Médio | Plotly `make_subplots` ou ag-grid |
| 7 | **Altura padronizada** | Ritmo visual consistente | Baixo | `height=360` para meia coluna, `height=480` para full |
| 8 | **Annotations em gráficos** | Destacar "ponto de inflexão" no diesel | Baixo | `add_annotation` no Plotly |

**Recomendação:** Manter Plotly como motor, mas elevar o nível de customização. Não basta `px.bar` padrão — precisa de `update_traces`, `update_layout`, `hovertemplate`, `add_hline`. Considerar **ECharts (via streamlit-echarts)** para gráficos mais "premium" (sankey, sunburst, gauge).

### 2.3 Tabelas — Oportunidades

| # | Oportunidade | Impacto | Esforço | Implementação |
|---|-------------|---------|---------|---------------|
| 1 | **Formatação condicional** | Status crítico em vermelho, score baixo destacado | Médio | `st.dataframe` com `column_config` + `background_color` |
| 2 | **Formatação de moeda** | `R$ 1.234,50` em vez de `1234.50` | Baixo | `st.column_config.NumberColumn(format="R$ %.2f")` |
| 3 | **Formatação de porcentagem** | `+15,3%` em vez de `15.3` | Baixo | `st.column_config.NumberColumn(format="+%.1f%%")` |
| 4 | **Alinhamento à direita para números** | Leitura comparativa mais fácil | Baixo | `st.column_config` com `alignment="right"` |
| 5 | **Barras de progresso para scores** | Score de confiança visual como barra | Médio | `st.column_config.ProgressColumn` |
| 6 | **Ícones de status** | 🔴 Atrasado, 🟡 Em risco, 🟢 No prazo | Médio | `st.column_config` com `icon` ou custom HTML |
| 7 | **Resumo executivo (top 5)** | Cards com as linhas mais importantes antes da tabela completa | Médio | `st.columns` com `st.metric` ou `st.container` |
| 8 | **Ordenação padrão inteligente** | Tabela já vem ordenada por relevância | Baixo | `.sort_values()` antes do `st.dataframe` |

**Recomendação:** Maximizar `st.column_config` (recurso relativamente novo do Streamlit, 1.28+). Para tabelas muito ricas, considerar **ag-grid (streamlit-aggrid)** que permite:
- Formatação condicional avançada
- Edição inline
- Grupamento
- Filtros de coluna
- Sparklines em células

### 2.4 Layout e UX — Oportunidades

| # | Oportunidade | Impacto | Esforço | Implementação |
|---|-------------|---------|---------|---------------|
| 1 | **Tabs para demos profundas** | Separar "Dashboard" / "Análise" / "Detalhe" | Médio | `st.tabs(["Visão Geral", "Análise", "Exportar"])` |
| 2 | **Expansores contextuais** | Seções colapsáveis para não poluir a tela | Baixo | `st.expander` já existe, mas mal utilizado |
| 3 | **KPIs com cor por severidade** | Verde/Amarelo/Vermelho no `st.metric` | Médio | CSS custom ou `st.metric` com `delta_color` + HTML |
| 4 | **Separadores visuais** | Quebras entre "Análise" e "Detalhe" | Baixo | `st.divider()` + texto descritivo |
| 5 | **CTA final estilizado** | Botão "Baixar relatório" ou "Próxima demo" | Médio | `st.button` + CSS custom + link |
| 6 | **Sidebar flutuante ou persistente** | Filtros sempre visíveis, não ocultos | Baixo | Manter `initial_sidebar_state="expanded"` no desktop |
| 7 | **Resumo no topo (executivo)** | 3-4 bullets do "então o que?" antes de tudo | Médio | `st.container` com `st.markdown` estilizado |
| 8 | **Breadcrumb de navegação** | "Home > Roteirização > CVRP" | Baixo | `st.caption` com links |

### 2.5 Alternativas de Framework (além do Streamlit puro)

#### Opção A: Manter Streamlit, mas elevar o nível
**Premissa:** Streamlit ainda é o motor, mas com componentes custom, CSS avançado, e bibliotecas visuais premium.

**Adições:**
- `streamlit-echarts` — gráficos interativos premium (sankey, sunburst, gauge, heatmap)
- `streamlit-folium` — mapas Leaflet com clustering, tiles custom, ícones
- `streamlit-aggrid` — tabelas avançadas com formatação condicional
- `streamlit-elements` — dashboard tipo React (draggable, resizable cards)
- CSS custom injetado via `st.markdown(..., unsafe_allow_html=True)` — cards, badges, KPIs coloridos

**Prós:** Menor esforço de migração; mantém o ecossistema Python.
**Contras:** Ainda limitado pela arquitetura top-down do Streamlit; "maquiagem" sobre framework limitado.

#### Opção B: Next.js como Frontend das Demos
**Premissa:** Criar uma camada de visualização em Next.js (mesmo projeto da landing) que consome APIs/JSON das análises Python.

**Arquitetura:**
- Python (Streamlit ou FastAPI) → gera JSON/CSV com resultados da análise
- Next.js → consome o JSON e renderiza visualizações premium com:
  - **Recharts / D3** — gráficos customizados
  - **Leaflet / MapLibre GL** — mapas nativos com tiles custom, clustering, rotas
  - **TanStack Table** — tabelas avançadas
  - **Framer Motion** — animações de transição
  - **Tailwind CSS** — design system consistente com a landing

**Prós:** Visual premium, consistente com a landing, controle total do layout, SEO-friendly, shareable URLs.
**Contras:** Esforço alto (novo frontend), manutenção de duas bases de código, necessidade de API entre Python e Next.js.

#### Opção C: Frameworks Python Alternativos
| Framework | Diferencial | Adequado para |
|-----------|-------------|---------------|
| **Dash (Plotly)** | Layout declarativo (HTML-like), mais controle de posicionamento | Dashboards complexos, múltiplas páginas |
| **Panel (HoloViz)** | Integra Bokeh, Matplotlib, Plotly; layout flexível | Análises exploratórias com múltiplas viz |
| **Gradio** | Foco em ML/demo, mas visual mais moderno que Streamlit | Protótipos de IA, classificadores |
| **NiceGUI** | Vue.js-based, visual moderno, reactive | Aplicações com interação real-time |
| **Flet** | Flutter-based, visual nativo/mobile | Apps com UI mobile-like |

**Recomendação:** Para o portfólio de logística, **Dash** ou **Panel** seriam mais adequados que Streamlit para dashboards de monitoramento. Mas o esforço de migração é alto.

#### Opção D: "Visualização como Serviço" (Híbrida)
**Premissa:** Manter Streamlit para a lógica/análise, mas gerar artefatos visuais premium (imagens/JSON) que são consumidos pela landing.

**Exemplo:**
- Análise CVRP roda no Streamlit, mas gera:
  - JSON com rotas otimizadas
  - Imagem PNG do mapa (Folium + selenium/playwright)
  - CSV de resultados
- Landing Next.js consome o JSON e renderiza o mapa com Leaflet, o gráfico com Recharts, a tabela com TanStack.

**Prós:** Melhor dos dois mundos — lógica Python + visual premium web.
**Contras:** Complexidade de integração, latência, necessidade de cache.

---

## 3. Recomendação Estratégica

### Caminho 1: Elevação do Streamlit (Curto Prazo — 1-2 semanas)
Manter Streamlit, mas aplicar todas as melhorias de baixo esforço:

1. **Mapas:** Migrar de `Scattermap` para `Folium` (`streamlit-folium`) com:
   - Tiles `CartoDB positron` (visual limpo)
   - Clustering `MarkerCluster`
   - Ícones FontAwesome (`truck`, `box`, `warehouse`)
   - Marcadores numerados para sequência de rota

2. **Gráficos:** Customizar Plotly com:
   - `color_discrete_map` semântico (🔴 vermelho=crítico, 🟡 amarelo=atenção, 🟢 verde=OK)
   - `hovertemplate` informativo
   - `add_hline`/`add_vline` para referências
   - Altura padronizada: 360px (meia coluna), 480px (full)

3. **Tabelas:** Usar `st.column_config` ao máximo:
   - `NumberColumn` com formatos de moeda/porcentagem
   - `ProgressColumn` para scores
   - `TextColumn` com ícones (🔴🟡🟢)
   - Ordenação padrão por relevância

4. **Layout:**
   - `st.tabs` para demos profundas (3 tabs: "Dashboard", "Análise", "Exportar")
   - KPIs com cor por severidade (CSS custom)
   - Separadores visuais entre seções
   - CTA final em cada demo ("Ver próxima demo" ou "Baixar relatório")

5. **CSS:** Expandir o CSS custom para:
   - Cards de KPI com borda colorida por severidade
   - Badges de framework mais estilizados
   - Footer mais limpo

### Caminho 2: Next.js como Visualização (Médio Prazo — 1-2 meses)
Criar uma rota `/demo/[slug]` na landing que consome JSON da análise e renderiza visual premium:

1. **API bridge:** Streamlit gera JSON + CSV a cada execução; salva em cache
2. **Next.js frontend:**
   - Mapa: `react-leaflet` com tiles custom, clustering, rotas OSRM
   - Gráficos: `recharts` ou `d3` com design system consistente
   - Tabelas: `tanstack-table` com formatação condicional, sorting, filtros
   - Animações: `framer-motion` para transições de estado
3. **Shareable URLs:** cada demo tem URL própria com parâmetros (ex: `/demo/cvrp?entregas=24&capacidade=500`)
4. **SEO:** demos indexáveis, com meta description e OG image

### Caminho 3: Dashboard Framework (Longo Prazo — 3+ meses)
Migrar para **Dash** ou **Panel** para dashboards de monitoramento real:
- Layout declarativo, mais controle
- Suporte nativo a múltiplas páginas
- Integração com WebSocket para dados real-time
- Visual mais próximo de produto enterprise (tipo Tableau/PowerBI)

---

## 4. Roadmap Prioritizado

### Fase 1: Quick Wins (Semana 1)
- [ ] Padronizar altura dos gráficos (360px meia, 480px full)
- [ ] Adicionar linhas de referência (piso ANTT, capacidade 100%)
- [ ] Tooltips customizados nos gráficos Plotly
- [ ] Formatação de moeda/porcentagem nas tabelas (`st.column_config`)
- [ ] Cores semânticas discretas nos gráficos (status, severidade)
- [ ] Separadores visuais entre seções (`st.divider` + texto)
- [ ] Remover legendas redundantes dos mapas

### Fase 2: Mapas Premium (Semana 2)
- [ ] Migrar mapas para `streamlit-folium`
- [ ] Tiles `CartoDB positron`
- [ ] Clustering com `MarkerCluster`
- [ ] Ícones FontAwesome por tipo (CD, entrega, hub)
- [ ] Marcadores numerados para sequência de rota
- [ ] Mapa de calor para promessa CEP

### Fase 3: Tabelas e Layout (Semana 3)
- [ ] `st.column_config` completo: `ProgressColumn`, `NumberColumn`, `TextColumn` com ícones
- [ ] Resumo executivo (top 5) antes da tabela completa
- [ ] `st.tabs` para demos profundas (3 tabs)
- [ ] KPIs com cor por severidade (CSS custom)
- [ ] CTA final em cada demo (botão estilizado)

### Fase 4: Visual Premium (Semana 4-6)
- [ ] Avaliar `streamlit-echarts` para gráficos avançados (sankey, sunburst, gauge)
- [ ] Avaliar `streamlit-aggrid` para tabelas premium
- [ ] Protótipo de Next.js consumindo JSON das análises
- [ ] Teste de mapa Leaflet no Next.js com rotas OSRM
- [ ] Avaliar `streamlit-elements` para dashboard tipo grid

### Fase 5: Arquitetura Híbrida (Mês 2)
- [ ] API bridge: Streamlit gera JSON/CSV cacheado
- [ ] Rota `/demo/[slug]` na landing Next.js
- [ ] Mapa `react-leaflet`, gráficos `recharts`, tabelas `tanstack-table`
- [ ] Parâmetros de URL para estado compartilhável
- [ ] Teste de integração com análises Python

---

## 5. Benchmark de Referência

### Dashboards de Logística — Inspirações Visuais

| Referência | O que Destaca | Como Aplicar |
|------------|--------------|--------------|
| **Onfleet Dashboard** | Mapa com rotas coloridas, cards de entrega, timeline | Cards laterais no mapa; timeline de status |
| **OptimoRoute** | Mapa + lista de rotas lado a lado; otimização em tempo real | Layout 2-colunas: mapa + tabela de paradas |
| **Bringg** | Dashboard de entregas com KPIs coloridos, mapa com clustering | KPIs com badge de cor; mapa com clusters |
| **Route4Me** | Visualização de rota com setas, sequência numerada, distância acumulada | Marcadores numerados; setas de direção; distância por trecho |
| **Google Maps Platform** | Directions API com rotas reais, traffic, street view | Tiles custom; rotas reais (OSRM); traffic layer |
| **Mapbox Studio** | Mapas estilizados, 3D buildings, data-driven styling | Tiles custom; 3D para hubs/CDs; data-driven colors |
| **ObservableHQ** | Notebooks interativas com D3, embeddable, shareable | Cada demo como "notebook" compartilhável |
| **Superset** | Dashboards enterprise, drill-down, filtros cruzados | Filtros globais; drill-down por região/categoria |

### Frameworks Python — Inspirações Técnicas

| Framework | Demo Visual | O que Aplica ao Projeto |
|-----------|-------------|------------------------|
| **Streamlit (atual)** | `demos-logistica` | Baseline; funcional mas visualmente limitado |
| **Dash** | `dash-gallery.plotly.host` | Layout declarativo; múltiplas páginas; callbacks |
| **Panel** | `panel.holoviz.org` | Integração Bokeh/Plotly; layout flexível |
| **Streamlit + ECharts** | `streamlit-echarts` | Gráficos premium; sankey, sunburst, gauge |
| **Streamlit + Folium** | `streamlit-folium` | Mapas Leaflet; clustering; tiles custom |
| **NiceGUI** | `nicegui.io` | UI moderna; reactive; Vue.js-based |
| **Next.js + Recharts** | `recharts.org` | Gráficos React; consistente com landing |
| **Next.js + Leaflet** | `react-leaflet.js.org` | Mapas nativos; controle total do visual |

---

## 6. Conclusão

O Streamlit cumpre seu papel como **protótipo rápido e validação de conceito**, mas não é uma plataforma de visualização premium. Para o portfólio de Lucas Batista, que precisa comunicar **inteligência operacional** e **tomada de decisão**, a percepção visual é tão importante quanto a precisão técnica.

**Recomendação tática:**
1. **Curto prazo:** Aplicar todos os quick wins (Fase 1) e elevar os mapas com Folium (Fase 2). Isso já separa o portfólio de 90% dos protótipos Streamlit genéricos.
2. **Médio prazo:** Avaliar a arquitetura híbrida (Next.js + JSON) para 2-3 demos mais importantes. Se o impacto for positivo, expandir para todas.
3. **Longo prazo:** Considerar Dash ou Panel para dashboards de monitoramento real (se o portfólio evoluir para produto/SaaS).

A mensagem que o visual precisa comunicar: **"Isso não é uma planilha com gráficos. Isso é uma ferramenta de decisão."**
