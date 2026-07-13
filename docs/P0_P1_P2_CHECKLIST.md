# Checklist de Prioridade — Refatoração do Portfolio

> **Base:** `docs/GAPS.md` + `docs/AVALIACAO.md`  
> **Princípio:** P0 (fundação) > P1 (refinamento) > P2 (polish)  
> **Regra de ouro:** nenhuma mudança P1/P2 antes de todos os P0 estarem estáveis e validados.

---

## Legenda

| Status | Significado |
|--------|-------------|
| ✅ | Implementado e validado |
| 🟡 | Parcial / precisa de ajuste |
| ❌ | Não implementado |
| ⏸️ | Deliberadamente adiado |

---

## Fase 1: Fundação (P0) — Essencial

| # | Tarefa | Onde | Status | Notas |
|---|--------|------|--------|-------|
| 1 | Definir paleta de cores unificada | `app/globals.css`, `design/tokens.md` | ✅ | Tokens editoriais ativos |
| 2 | Definir escala tipográfica (Source Serif 4 + Inter) | `app/globals.css`, `layout.tsx` | ✅ | Fontes atualizadas; corpo mínimo 14px, leitura 16px |
| 3 | Redesenhar hero: reduzir texto, CTAs claros | `components/sections/ExecutiveHero.tsx` | ✅ | Layout denso com painel de credibilidade à direita |
| 4 | Remover/substituir cockpit estático do hero | `components/visual/LogisticsIntelligenceCockpit.tsx` | ✅ | Componente arquivado em `components/archive/legacy/`; substituído por painel com stack, empresas e provas |
| 5 | Densificar seção Perfil | `components/sections/ProfileBrief.tsx` | ✅ | Card de direção de carreira + 3 diferenciais + domínios como tags + metadados de carreira |
| 6 | Adicionar screenshots/thumbnails nos cards de provas | `components/sections/SignatureCases.tsx`, `public/` | ✅ | `CaseThumbnail` gerando placeholders SVG por categoria; campo `thumbnail` opcional para imagens reais |
| 7 | Cards de provas completos e escaneáveis | `components/sections/SignatureCases.tsx` | ✅ | Problema, decisão apoiada, limitação declarada e métrica em layout compacto |
| 8 | Redesenhar timeline de trajetória (visual vertical) | `components/sections/TrajectoryBoard.tsx` | ✅ | Timeline visual implementada |
| 9 | Resumir experiências (foco em resultado) | `data/content.ts` + `TrajectoryBoard.tsx` | ✅ | `atribuicoes` enxutas; impactos por empresa como badges |
| 10 | Ajustar contraste em todas as seções (WCAG AA) | Todo o site | 🟡 | Lighthouse a11y 96/100 |
| 11 | Alinhar documentação de agentes com código real | `.cursorrules`, `.agents/skills/`, `.codex/AGENTS.md` | ✅ | Atualizado nesta rodada |
| 12 | Configurar MCPs do Cursor sem expor tokens | `.cursor/mcp.json`, `.cursor/MCP_SETUP.md` | ✅ | Placeholders + instruções |

### Bloqueadores P0
- **Foto do hero:** placeholder em `public/profile.jpg`. Substituir por foto profissional real.
- **Lighthouse a11y 96:** revalidar após ajustes de densidade/tipografia.
- **Cache CSS:** rebuild limpo resolveu problema de estilos não aplicados em `next start` local.
- **Cockpit estático no hero:** ✅ resolvido (arquivado e substituído por painel de credibilidade).

---

## Fase 2: Refinamento (P1) — Importante

| # | Tarefa | Onde | Status | Notas |
|---|--------|------|--------|-------|
| 1 | Implementar filtros funcionais na seção de provas | `components/sections/CaseLibraryDesktop.tsx` | ✅ | Filtros laterais funcionais |
| 2 | Destacar 3 provas âncora visualmente | `components/sections/SignatureCases.tsx` | ✅ | Cards maiores com ícone gradiente |
| 3 | Adicionar smooth scroll na navegação | `app/globals.css` | ✅ | `scroll-behavior: smooth` |
| 4 | Adicionar indicador de seção ativa no menu | `components/Header.tsx`, `lib/use-active-section.ts` | ✅ | Scroll spy via IntersectionObserver; underline accent na seção ativa |
| 5 | Implementar hover states em todos os cards e botões | Todo o site | 🟡 | Parcial; revisar inconsistências |
| 6 | Converter stack para badges/tags coloridos | `components/sections/TrajectoryBoard.tsx` | ⏸️ | Adiado — stack atual em texto agrupado já é legível; badges podem virar noise |
| 7 | Destacar cargo atual na timeline | `components/sections/TrajectoryBoard.tsx` | ✅ | Badge "Atual", borda e fundo accent sutil no primeiro cargo |
| 8 | Adicionar botão "Voltar ao topo" flutuante | `components/BackToTop.tsx`, `app/layout.tsx` | ✅ | Botão fixed bottom-right aparece após 500px de scroll |
| 9 | Implementar grid responsivo inteligente para provas | `SignatureCases.tsx` + `CaseLibrary.tsx` | ✅ | Cards âncora empilham em mobile; biblioteca tem filtros pills horizontais |
| 10 | Padronizar ícones (Lucide, um peso) | Todo o site | ✅ | Lucide React exclusivo |
| 11 | Renomear `CaseLibraryDesktop` → `CaseLibrary` | `components/sections/CaseLibrary.tsx` | ✅ | Arquivo renomeado; layout mobile adicionado |
| 12 | Remover FAQ e reduzir densidade textual | `components/sections/ProfileBrief.tsx`, `components/sections/ContactPanel.tsx` | ✅ | FAQ removido; copy enxuta em Perfil e Contato |
| 13 | Adicionar `useReducedMotion` no MotionProvider | `components/providers/MotionProvider.tsx` | ✅ | Respeita `prefers-reduced-motion` via MotionConfig |
| 14 | Adicionar `aria-live` nos filtros da biblioteca | `components/sections/CaseLibrary.tsx` | ✅ | Container com `aria-live="polite"` anuncia mudanças |

---

## Fase 3: Polish (P2) — Diferenciador

| # | Tarefa | Onde | Status | Notas |
|---|--------|------|--------|-------|
| 1 | Adicionar microanimações (fade-in, hover) | Todo o site | ✅ | Framer Motion em todas as seções |
| 2 | Implementar analytics (cliques em CTAs, provas, contato) | `lib/analytics.ts` | ✅ | Helper `analytics` com eventos de CTA, demo, filtro, contato, CV, LinkedIn, GitHub |
| 3 | Adicionar Open Graph tags para LinkedIn | `app/layout.tsx` | ✅ | OG + Twitter Card implementados |
| 4 | Implementar schema.org/Person para SEO | `app/layout.tsx` | ✅ | JSON-LD Person presente |
| 5 | Adicionar calendly ou formulário de contato | `components/sections/ContactPanel.tsx` | ⏸️ | Decisão: manter links diretos por ora |
| 6 | Converter cards "em preparação" para visual desaturado | `components/sections/SignatureCases.tsx` | ✅ | Roadmap com visual dashed/warm-accent |
| 7 | Adicionar transição gradiente entre tema escuro e claro | `components/sections/ExecutiveHero.tsx` | ✅ | Gradient `from-transparent to-editorial` de 128px na base do hero |
| 8 | Otimizar carregamento (lazy load nas imagens de provas) | `components/CaseThumbnail.tsx` | ✅ | `loading="lazy"` explicitado nas thumbnails reais |
| 9 | Adicionar Vercel Analytics | `app/layout.tsx` | ✅ | `<Analytics />` do `@vercel/analytics/react` adicionado ao body |
| 10 | Implementar testes E2E para modal e filtros | `e2e/`, Playwright | ✅ | 8 testes passando: homepage, navegação, cases, biblioteca, modal |

---

## Fase 4: Auditoria e Correções nas Demos Streamlit

> Status após rodada de correções visuais/UX em `demos-logistica/`.

| # | Problema | Arquivos | Status | Notas |
|---|----------|----------|--------|-------|
| 1 | "Ocorrencia aberta" sem acento | `lib/brand.py`, `lib/tables.py`, `scripts/build_datasets.py`, `pages/02_mini_torre_controle.py` | ✅ | Corrigido para "Ocorrência aberta"; datasets regenerados |
| 2 | Mapas Folium sem legendas de cor/espessura | `pages/01_precificacao_frete.py`, `pages/02_mini_torre_controle.py`, `pages/03_cvrp_urbano.py`, `pages/04_promessa_cep.py`, `pages/05_vrptw_ultima_milha.py`, `pages/06_rede_interhubs.py`, `pages/08_ship_from_store.py`, `pages/09_tsp_baseline_sp.py`, `pages/10_auditoria_endereco.py` | ✅ | `folium_maps.add_legend()` aplicado em todos os mapas com semântica de cor ou espessura |
| 3 | Cluster anulando semântica de cor | `pages/02_mini_torre_controle.py`, `pages/04_promessa_cep.py`, `pages/10_auditoria_endereco.py` | ✅ | Threshold de cluster elevado para >60 pontos; legenda mantida |
| 4 | Embed: rotas perdem setas/números | `pages/03_cvrp_urbano.py`, `pages/05_vrptw_ultima_milha.py`, `pages/09_tsp_baseline_sp.py` | 🟡 | `show_numbers/arrows=False` no embed por espaço; legendas ajudam, mas ainda recomenda-se abrir em nova aba |
| 5 | "Apto" na tabela 01 com semântica confusa | `pages/01_precificacao_frete.py`, `lib/tables.py` | ✅ | Renomeado para "Acima do piso"; coluna renomeada para "Status vs piso ANTT" |
| 6 | Acurácia do classificador 07 medindo overfit | `pages/07_classificador_ocorrencias.py` | ✅ | Label alterado para "Concordância na amostra de desenvolvimento" com help explicativo |
| 7 | Score de risco 04 com fórmula caixa-preta | `pages/04_promessa_cep.py` | ✅ | Fórmula exposta no caption do mapa e no `method_expander` |
| 8 | "Otimizado" no TSP/CVRP/VRPTW exagerando | `pages/03_cvrp_urbano.py`, `pages/05_vrptw_ultima_milha.py`, `pages/09_tsp_baseline_sp.py` | ✅ | Substituído por "Melhorado" ou "EDF (heurístico)"; helps reforçam que não é ótimo global |
| 9 | `@st.cache_data` nos carregamentos | `lib/ui.py` | ✅ | `load_csv()` já utiliza `@st.cache_data(show_spinner=False)` |
| 10 | Padronizar `ui.insight` | diversas pages | 🟡 | Uso consistente, mas sem guia formal de quando usar vs `st.info` |
| 11 | Remover helpers Plotly não usados em `viz.py` | `lib/viz.py` | ⏸️ | `map_points`, `map_routes`, `network_map` não são usados; remoção adiada para evitar regressão |

### Validação das demos
- `python scripts/build_datasets.py` ✅
- `python scripts/smoke_test.py` ✅ 13/13 checagens OK

---

## Sequência Recomendada de Execução

### Sprint 1 — Fundação (P0)
1. ✅ Resolver cockpit do hero (arquivado; painel de credibilidade no lugar)
2. ✅ Densificar seção Perfil com FAQ de triagem
3. ✅ Ajustar tipografia e espaçamentos para melhor legibilidade
4. Substituir foto placeholder em `public/profile.jpg`
5. Subir Lighthouse a11y de 96 para 100

### Sprint 2 — Refinamento (P1)
1. Adicionar indicador de seção ativa no Header
2. Renomear `CaseLibraryDesktop` → `CaseLibrary` + layout mobile
3. Adicionar `useReducedMotion` no MotionProvider
4. Adicionar `aria-live` nos filtros
5. Destacar cargo atual na timeline
6. Botão "Voltar ao topo" flutuante

### Sprint 3 — Polish (P2)
1. Implementar analytics básico
2. Adicionar Vercel Analytics
3. Testes E2E críticos (modal, filtros, scroll)
4. Otimizações finais de performance

### Sprint 4 — Demos Streamlit
1. Corrigir acentuação e honestidade de comunicação ("Otimizado", "Apto", acurácia)
2. Adicionar legendas em todos os mapas Folium
3. Revisar clusters e espessuras de aresta
4. Validar com `build_datasets.py` + `smoke_test.py`

---

## Critérios de Pronto por Fase

| Fase | Critérios |
|------|-----------|
| P0 | `npm run validate && npm run lint && npm run typecheck && npm run build` passando; Lighthouse a11y >= 98; nenhum componente falso/interativo estático |
| P1 | Testes manuais em 375px e 1440px; indicador de seção funcional; a11y 100; mobile da biblioteca funcional |
| P2 | Analytics coletando eventos; testes E2E passando; Lighthouse mobile >= 98; deploy em produção validado |
| Demos | `python scripts/build_datasets.py` e `python scripts/smoke_test.py` passando; todas as pages com legenda nos mapas; copy honesta sobre heuristicidade |

---

*Documento vivo. Atualizar após cada sprint ou deploy.*
