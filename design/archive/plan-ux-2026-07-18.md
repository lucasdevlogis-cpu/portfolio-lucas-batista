# Plano Estratégico UX/UI & Marketing — Portfólio Lucas Batista

> **Versão:** 2.0 (pós-audit visual em produção)  
> **Data:** 18/07/2026  
> **Base de análise:** Screenshots capturados em produção (desktop 1920×889, mobile 375×812)  
> **URL auditada:** https://portfolio-lucas-batista-murex.vercel.app  
> **Status:** Aguardando aprovação para execução  

---

## 1. Diagnóstico Visual — Baseado em Evidências Reais

### 1.1 Audit Visual por Seção

#### 🔴 Hero (Viewport Inicial)

**Observação real do screenshot:**
- Fundo: dot pattern em cinza claro sobre gradiente `secondary/50 → background`. O pattern é **quase invisível** em monitor de alta resolução — parece um fundo plano genérico.
- Card de provas: retângulo branco com borda sutil, sem glassmorphism real. Texto "POR ONDE EU ATUO" em uppercase accent é bom, mas o card inteiro parece "colado" na página.
- Badge "Consultor em Inteligência Logística": sem ícone, tamanho pequeno (`text-sm`), fácil de ignorar.
- Headline: "Transformo dados e rotinas logísticas em clareza para decidir melhor" — tipografia boa, peso bold, tracking tight. Funciona.
- Botões: primário (bg primary) + outline. O outline é muito sutil — quase não diferencia do fundo.
- **Veredito:** Funcional mas genérico. Não transmite "autoridade técnica" em 3 segundos.

#### 🔴 Seção Dores

**Observação real do screenshot (scroll 800px):**
- Título "Dores que resolvo" centrado com subtitle — OK.
- **BUG VISUAL CRÍTICO:** O primeiro card aparece com **opacity extremamente baixa** durante a animação de entrada Framer Motion. No screenshot, o card "Frete carro sem explicação clara" está quase invisível — parece que ainda está no estado `hidden: { opacity: 0 }`.
- O visitante que scrolla rapidamente pode **nunca ver os cards** porque a animação demora para iniciar.
- Cards brancos sobre fundo `#f8fafc` — contraste baixo. Os cards "desaparecem" no fundo.
- Badge numérico "1" no canto superior direito — funcional mas pequeno.

#### 🟡 Seção Serviços

**Observação real do screenshot (scroll 1700px):**
- Timeline tracejada à esquerda é **praticamente invisível** em fundo branco.
- **Mesmo bug de animação:** O primeiro card ("Diagnóstico de Clareza Operacional") aparece faded/quase transparente durante a transição de entrada.
- Cards são **grandes verticalmente** — cada um ocupa ~40% da viewport. Em mobile, isso exige scroll excessivo.
- Números em círculos azul escuro (`bg-primary`) são bons indicadores visuais.
- Checkmarks em accent (`text-accent`) são claras e funcionam bem.
- Borda lateral colorida (border-l-4) é sutil mas visível.

#### 🟡 Seção Cases

**Observação real do screenshot (scroll ~50% e 3800px):**
- Grid de 3 colunas em desktop funciona bem.
- **Cards MUITO densos:** Cada card contém: ícone + badge + categoria + título + descrição + "PERGUNTA DE NEGÓCIO" + métrica + tags + 2 botões. Isso é **muita informação para um único card**.
- "PERGUNTA DE NEGÓCIO" com borda esquerda accent e bg accent/5 é um bom padrão — destaca o valor de negócio.
- Tags ocupam **múltiplas linhas** em alguns cards (ex: tags do CVRP, Ship from Store), empurrando os botões para baixo.
- **Prioridade visual falha:** 
  - P0·Essencial = badge bg-accent (teal) → BOM, destaca
  - P1·Forte = badge bg-primary/10 (azul muito claro) → RUIM, quase invisível
  - P2·Complementar = badge bg-muted (cinza) → OK, subdued intencional
  - **Resultado:** A diferença entre P0 e P1 não é óbvia. Um visitante não consegue identificar os cases essenciais em 1 segundo.
- Botões "Ver demo e detalhes" e "Ver código" são consistentes e funcionais.

#### 🔴 Seção Sobre

**Observação real do screenshot (scroll ~75%):**
- **Avatar "LB" em cinza claro (`bg-gray-300` aproximado) — EXTREMAMENTE genérico.** Parece um placeholder de template, não um portfólio profissional.
- Nome e título abaixo do avatar — ok, mas o avatar quebra a impressão.
- Texto descritivo à direita em coluna maior — bom conteúdo, mas a seção parece **"vazia"** com muito espaço em branco entre avatar e texto.
- Badge de ferramentas no final — funcionais mas sem destaque.

#### 🟡 Seção IA

**Observação real do screenshot (scroll ~75%):**
- Título "IA como acelerador, não como atalho cego" com cor **muito clara/cinza** — baixo contraste contra o fundo branco.
- Card com "Exemplos seguros" (✓ verde) e "O que não prometo" (✗ cinza) — bom conteúdo, mas o card é visualmente "pesado" com borda grossa (`border-2`).
- 3 icon cards à direita (Análise assistida, Prototipagem rápida, Validação humana) — bons, mas o grid responsivo parece estranho (`sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3`).

#### 🟡 Seção Contato

**Observação real do screenshot (scroll final):**
- Layout 2 colunas: texto explicativo à esquerda, formulário à direita — funcional.
- Formulário com campos padrão (Nome, Email, Empresa, Desafio) — sem validação visual em tempo real.
- Botão "Solicitar leitura inicial" largo, bg primary — funcional mas sem destaque especial.
- Links de contato (email, LinkedIn) abaixo do formulário — pequenos e discretos.

#### 🔴 Footer

**Observação real do screenshot (scroll final):**
- **Muito básico.** Duas colunas: brand + links sociais à esquerda, declaração à direita.
- Sem navegação rápida para seções.
- Sem CTA de retorno ao topo.
- Sem reforço de proposta de valor.
- Copyright centralizado — funcional mas genérico.

#### 🟡 Mobile (375×812)

**Observação real dos screenshots mobile:**
- Header com hamburger menu funcional.
- Cards de serviço são **grandes verticalmente** — exigem scroll excessivo.
- Tipografia escala bem — títulos legíveis.
- Círculos com número do serviço funcionam bem como indicadores.
- Checkmarks em accent são claras.

---

### 1.2 Problemas Críticos Confirmados (com evidência visual)

| # | Problema | Evidência | Impacto | Severidade |
|---|----------|-----------|---------|------------|
| 1 | **Bug de animação Framer Motion** | Cards em Dores e Serviços aparecem com opacity ~0.1 durante transição de entrada — quase invisíveis | Visitante pode scrollar sem ver conteúdo | 🔴 **CRÍTICO** |
| 2 | **Hero sem gancho visual** | Fundo plano com dot pattern invisível; card de provas sem glassmorphism | Primeira impressão = "template genérico" | 🔴 **ALTO** |
| 3 | **Avatar impessoal** | "LB" em cinza claro — parece placeholder de template | Quebra conexão humana e credibilidade | 🔴 **ALTO** |
| 4 | **Prioridade visual falha** | P1 badge (`bg-primary/10`) é praticamente invisível; indistinguível de P0 à distância | Visitante não identifica cases essenciais | 🔴 **ALTO** |
| 5 | **Cards de cases densos** | 8+ elementos por card; tags em múltiplas linhas; informação visual sobrecarregada | Dificuldade de escanear rápido | 🟡 **MÉDIO** |
| 6 | **Seção IA com baixo contraste** | Título em cinza claro sobre fundo branco; card com borda grossa | Texto difícil de ler; card parece "pesado" | 🟡 **MÉDIO** |
| 7 | **Footer básico demais** | Sem navegação, sem CTA, sem reforço — apenas copyright e links | Perda de oportunidade de conversão na base | 🟡 **MÉDIO** |
| 8 | **Timeline invisível** | Linha tracejada em Serviços é imperceptível em fundo branco | Elemento decorativo falha | 🟢 **BAIXO** |
| 9 | **Botão outline sutil** | Botão secundário do Hero tem borda quase invisível | CTA secundário não chama atenção | 🟢 **BAIXO** |
| 10 | **Contraste cards vs fundo** | Cards brancos sobre `#f8fafc` — diferença mínima | Cards "flutuam" sem definição | 🟢 **BAIXO** |

---

### 1.3 Pontos Fortes Confirmados ✅

| Aspecto | Evidência |
|---------|-----------|
| Navegação funcional | Header com scroll spy ativo, menu mobile com Sheet, links âncora funcionam |
| Copy comercial | Headline clara, CTAs diretas, "pergunta de negócio" diferencia dos concorrentes |
| Cases com demos | 10 cards demonstráveis com modal + iframe Streamlit — diferencial real |
| Badge numérico em Dores | Indicadores 1-8 funcionam como "checklist de problemas" |
| Checkmarks em Serviços | Verde accent em lista de entregas é claro e confiável |
| Responsividade | Layout adapta bem para mobile, tipografia escala corretamente |

---

## 2. Objetivos Estratégicos

### 2.1 North Star
> **"Converter visitantes do LinkedIn em leads qualificados através de uma experiência visual que transmite autoridade técnica, clareza comercial e proximidade humana — em qualquer dispositivo."**

### 2.2 KPIs de sucesso

| Métrica | Baseline (atual) | Meta pós-execução | Como medir |
|---------|-----------------|-------------------|------------|
| Lighthouse Mobile Performance | 73 (Lantern) / 87 (DevTools) | ≥ 90 | `npx lighthouse` |
| Lighthouse Acessibilidade | 94 | ≥ 95 | `npx lighthouse` |
| Percepção visual (subjetivo) | "Template genérico" | "Autoridade técnica" | Teste com 3 peers |
| Cards visíveis no primeiro scroll | ~30% (bug de animação) | 100% | Screenshot audit |

---

## 3. Roadmap de Execução

### Fase 1 — Correções Críticas (Semana 1)
**Foco:** Bug de animação, hero, avatar, prioridade visual. Alto impacto, baixo risco.

| # | Tarefa | Descrição técnica | Critério de aceitação | Evidência que motivou |
|---|--------|-------------------|----------------------|----------------------|
| 1.1 | **Corrigir bug de animação Framer Motion** | Em `Dores.tsx` e `Servicos.tsx`, o `cardItem.hidden` usa `opacity: 0`. Alterar para `opacity: 0.6` ou remover opacity da animação de entrada, mantendo apenas `y` (slide-up). Alternativa: usar `opacity: 1` em hidden e animar só `y`. | Cards são visíveis imediatamente ao entrar no viewport; animação de slide-up ainda funciona | Screenshot mostra card "Frete caro" quase invisível |
| 1.2 | **Hero redesign — fundo com identidade** | Substituir dot pattern genérico por: gradiente sutil usando primary+accent em ~5% opacidade, OU mesh gradient orgânico, OU padrão geométrico logístico (rotas, nós de rede) em SVG sutil. Manter card de provas mas adicionar glassmorphism real (`bg-white/60 backdrop-blur-xl border-white/20 shadow-xl`). | Hero não parece mais "template genérico" em 3 segundos de olhar | Screenshot mostra fundo plano e card sem profundidade |
| 1.3 | **Humanizar seção Sobre** | Substituir avatar de iniciais "LB" por: (a) foto profissional se disponível, OU (b) ilustração/avatar estilizado (gradiente primary→accent em vez de cinza), OU (c) adicionar foto real + mini-timeline de experiência (3 bullets: "X anos em logística", "Y setores atendidos", "Z cases entregues"). | Avatar gera conexão, não parece placeholder | Screenshot mostra "LB" cinza genérico |
| 1.4 | **Refinar badges de prioridade nos cases** | P0: manter bg-accent + adicionar ícone `Star` ou `Flame` no badge. P1: mudar de `bg-primary/10` para `bg-primary/20` + texto `text-primary` + ícone `Zap`. P2: manter `bg-muted` subdued. Adicionar tooltip no hover explicando o que significa cada prioridade. | Diferença P0/P1/P2 óbvia em 1 segundo de olhar; P1 não mais invisível | Screenshot mostra P1 quase indistinguível de texto comum |
| 1.5 | **Aumentar contraste cards** | Mudar fundo dos cards de `bg-card` (`#ffffff`) para `bg-white` com shadow mais pronunciada, OU mudar fundo da seção Dores de `bg-background` (`#f8fafc`) para `bg-white` para que cards com fundo `#f8fafc` + shadow criem definição. | Cards "saltam" visualmente do fundo da seção | Screenshot mostra cards fundindo com fundo |

### Fase 2 — Redesign Seletivo (Semana 2)
**Foco:** Cards de cases, seção IA, footer, formulário. Médio impacto, médio risco.

| # | Tarefa | Descrição técnica | Critério de aceitação | Evidência que motivou |
|---|--------|-------------------|----------------------|----------------------|
| 2.1 | **Redesenhar cards de cases — densidade** | (a) Mover tags para abaixo do botão ou para um expander "Ver tags". (b) Reduzir descrição para 2 linhas com `line-clamp-2`. (c) Aumentar destaque da "PERGUNTA DE NEGÓCIO" com borda mais grossa (`border-l-4`) e padding maior. (d) Adicionar indicador lateral colorido no card inteiro: barra vertical esquerda P0=accent, P1=primary, P2=muted. | Card é escaneável em 3 segundos; pergunta de negócio é o elemento dominante | Screenshot mostra cards com 8+ elementos empilhados |
| 2.2 | **Seção IA — contraste e peso** | (a) Aumentar peso do título para `font-semibold` e cor para `text-primary` (não cinza). (b) Reduzir borda do card de exemplos de `border-2` para `border`. (c) Adicionar ícones Lucide aos itens da lista (checkmark/circle-xmark) em vez de caracteres Unicode. | Título legível à primeira vista; card não parece "pesado" | Screenshot mostra título cinza claro e borda grossa |
| 2.3 | **Footer enrichment** | Adicionar: (a) 3 colunas: Brand+social, Links rápidos (âncoras), Newsletter/CTA. (b) Botão "Voltar ao topo". (c) Badge de "10 cases demonstráveis" como prova social. (d) Declaração ética em caixa separada com borda sutil. | Footer funciona como "última chance de conversão" | Screenshot mostra footer de 2 colunas sem navegação |
| 2.4 | **Formulário de contato — UX refinada** | (a) Adicionar validação visual em tempo real: borda verde (`border-success`) quando válido, vermelha (`border-destructive`) quando inválido. (b) Estado de sucesso com animação: checkmark scale-in + card de confirmação com bg accent/5. (c) Adicionar ícone `Mail` ao campo de email, `Building` ao campo empresa. | Submit é uma experiência recompensadora; campos têm feedback imediato | Screenshot mostra formulário padrão sem estados visuais |
| 2.5 | **Botão outline do Hero** | Aumentar visibilidade do botão secundário: `border-primary/30` em vez de borda padrão, adicionar ícone `ArrowDown` ou `ChevronRight`. | CTA secundário é visível mas não compete com o primário | Screenshot mostra outline quase invisível |

### Fase 3 — Polish & Motion (Semana 3)
**Foco:** Animações refinadas, microinterações, consistência. Médio impacto, baixo risco.

| # | Tarefa | Descrição técnica | Critério de aceitação |
|---|--------|-------------------|----------------------|
| 3.1 | **Thread visual entre seções** | Adicionar divisor sutil (gradiente fade) entre seções que alternam bg. Ou: padronizar todo o site em `bg-background` e usar cards com shadow para criar profundidade. | Transições entre seções parecem fluidas |
| 3.2 | **Timeline de Serviços visível** | Aumentar opacidade/contraste da linha tracejada: `border-l-2 border-dashed border-primary/20` em vez de `border-border`. | Linha timeline é perceptível em fundo branco |
| 3.3 | **Microinterações nos cards** | Hover: `translateY(-4px)` + `shadow-lg` + `border-accent/20`. Não usar `scale` (causa repaints). Active: `translateY(0)` + `shadow-sm`. | Cards parecem "vivos" sem serem distraidores |
| 3.4 | **Modal de demo — skeleton** | Substituir spinner por skeleton screen que imita a estrutura da demo Streamlit (header + 3 cards de KPI + gráfico placeholder). | Visitante percebe que algo está carregando, não quebrado |
| 3.5 | **Seleção de texto brandada** | `::selection` já existe com accent/25. Verificar se cobre todos os elementos. Adicionar cor do texto (`text-primary`) na seleção. | Seleção de texto é brandada e legível |

### Fase 4 — Documentação & Validação (Semana 4)
**Foco:** Tokens, testes, Lighthouse, cases. Baixo impacto individual, alto impacto acumulado.

| # | Tarefa | Descrição técnica | Critério de aceitação |
|---|--------|-------------------|----------------------|
| 4.1 | **Design tokens documentados** | Criar `design/tokens.md` com: paleta completa, tipografia, espaçamento, bordas, sombras, breakpoints, animações. | Futuras alterações são consistentes |
| 4.2 | **Lighthouse mobile** | Rodar `npx lighthouse` mobile e registrar scores. Target: Performance ≥ 90, Acessibilidade ≥ 95. | Scores documentados e meta atingida |
| 4.3 | **Validação de cases** | Rodar checklist por case (demo carrega, contexto claro, mobile OK, links funcionam). | 10/10 cases validados |
| 4.4 | **Teste visual comparativo** | Screenshots antes/depois lado a lado de cada seção modificada. | Evidência visual de melhoria |

---

## 4. Decisões de Design — Diretrizes

### 4.1 Paleta refinada (evidência-baseada)

| Token | Valor | Uso | Motivo da mudança |
|-------|-------|-----|-------------------|
| Primary | `#1e3a5f` | Headings, nav, botões primários | Mantido — funciona bem |
| Primary Light | `#2a4f7c` | Hover em primary | Novo — melhora feedback de hover |
| Accent | `#0d9488` | Destaques, badges P0, hover secundário | Mantido — diferencia bem |
| Accent Light | `#14b8a6` | Hover em accent, ícones de destaque | Novo — mais vibrante para ícones |
| Background | `#f8fafc` | Fundo base | Mantido |
| Surface | `#ffffff` | Cards, modais, formulários | Mantido |
| Text Primary | `#0f172a` | Body text, labels | Mantido |
| Text Secondary | `#475569` | Subtítulos, descrições | **Mudança:** era `#64748b` (muito claro no screenshot da seção IA) |
| Text Muted | `#64748b` | Legends, placeholders | **Mudança:** antes era usado para subtítulos; agora só para elementos realmente muted |
| Border | `#e2e8f0` | Bordas de cards, inputs | Mantido |
| Border Strong | `#cbd5e1` | Focus rings, divisores | Novo — para visibilidade da timeline |
| Success | `#059669` | Estados de sucesso | Novo — para validação de formulário |
| Error | `#dc2626` | Estados de erro | Novo — para validação de formulário |

### 4.2 Escala tipográfica refinada

| Elemento | Tamanho | Peso | Line-height | Letter-spacing | Motivo |
|----------|---------|------|-------------|----------------|--------|
| Hero H1 | `text-4xl md:text-5xl lg:text-6xl` | 700 | 1.1 | -0.02em | Mantido — funciona bem |
| Section H2 | `text-3xl md:text-4xl` | 600 | 1.2 | -0.01em | Mantido — OK |
| Card H3 | `text-xl` | 600 | 1.3 | 0 | Mantido — OK |
| Body | `text-base` | 400 | 1.6 | 0 | Mantido — OK |
| Body Large | `text-lg` | 400 | 1.5 | 0 | Mantido — OK |
| IA Title | `text-3xl md:text-4xl` | 600 | 1.2 | -0.01em | **Mudança:** peso 600 (não 400) e cor primary (não muted) |
| Caption | `text-sm` | 500 | 1.4 | 0 | Mantido |
| Badge/Label | `text-xs` | 600 | 1 | 0.05em uppercase | Mantido |

### 4.3 Sombras (elevação)

| Nível | Valor | Uso |
|-------|-------|-----|
| Shadow SM | `0 1px 2px rgb(0 0 0 / 0.05)` | Cards default |
| Shadow MD | `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)` | Cards hover |
| Shadow LG | `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)` | Modais, hero card |
| Shadow XL | `0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)` | Hero card glassmorphism |

### 4.4 Animações

| Tipo | Duração | Easing | Uso |
|------|---------|--------|-----|
| Micro (hover) | 150ms | `ease-out` | Botões, links |
| Default | 200ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Cards, modais |
| Entrance | 400ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Seções, elementos |
| Stagger | 60ms delay | — | Grids, listas |
| **Crítico: nunca `opacity: 0` em hidden** | — | — | Cards devem começar visíveis (`opacity: 0.6+` ou `opacity: 1`) |

---

## 5. Validação dos Cases/Demos

### 5.1 Checklist de qualidade por case

Para cada um dos 10 cases demonstráveis, verificar:

| # | Item | Como validar | Status atual (estimado) |
|---|------|-------------|------------------------|
| 1 | Demo carrega em < 30s | Abrir modal, cronometrar | ⚠️ Necessita teste |
| 2 | Contexto de negócio está claro | Ler pergunta/decisão/métrica/limitação no modal | ✅ Do código, parece OK |
| 3 | iframe não quebra layout mobile | Testar em viewport 375px | ⚠️ Necessita teste |
| 4 | Link "Abrir em nova aba" funciona | Clicar, verificar URL sem `?embed=true` | ✅ Implementado no código |
| 5 | Código GitHub está acessível | Clicar "Ver código", não dar 404 | ✅ URLs configurados |
| 6 | Tags e categoria estão corretas | Conferir contra `data/content.ts` | ✅ OK |
| 7 | Ícone representa o case | Verificar se ícone faz sentido sem ler título | 🟡 Alguns podem melhorar |
| 8 | Prioridade (P0/P1/P2) reflete importância | Revisar com stakeholder | 🟡 P1 precisa ser mais visível |

### 5.2 Cases em roadmap (1 case)

| Case | Status | Ação sugerida |
|------|--------|---------------|
| `06-kpis-cd` | Sem demo Streamlit | Manter como roadmap com card "em breve" — não bloqueia lançamento |

---

## 6. Ordem de Implementação Recomendada

```
Semana 1 — Correções Críticas
  ├── 1.1 Corrigir bug de animação (Dores + Serviços)
  ├── 1.2 Hero redesign (fundo + glassmorphism)
  ├── 1.3 Avatar Sobre (foto/ilustração real)
  ├── 1.4 Badges de prioridade (P0/P1/P2 visuais)
  └── 1.5 Contraste cards vs fundo

Semana 2 — Redesign Seletivo
  ├── 2.1 Cards de cases (densidade + barra lateral)
  ├── 2.2 Seção IA (contraste + peso)
  ├── 2.3 Footer enrichment
  ├── 2.4 Formulário (validação + estados)
  └── 2.5 Botão outline Hero

Semana 3 — Polish & Motion
  ├── 3.1 Thread visual entre seções
  ├── 3.2 Timeline visível (Serviços)
  ├── 3.3 Microinterações nos cards
  ├── 3.4 Skeleton no modal de demo
  └── 3.5 Seleção de texto brandada

Semana 4 — Documentação & Validação
  ├── 4.1 Design tokens (tokens.md)
  ├── 4.2 Lighthouse mobile
  ├── 4.3 Validação de cases (10/10)
  └── 4.4 Screenshots antes/depois
```

---

## 7. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Regressão visual em mobile | Média | Alto | Testar cada alteração em 375px antes de commit |
| Performance piorar (TBT) | Média | Alto | Medir Lighthouse após cada fase; reverter animações se necessário |
| Avatar/foto não disponível | Alta (se depender de foto real) | Médio | Fallback: ilustração estilizada com gradiente brand |
| Scope creep | Alta | Médio | Strictamente seguir as 4 fases; novas ideias vão para backlog |
| Demo Streamlit offline | Baixa | Alto | Manter fallback `mailto` sempre funcional |

---

## 8. Aprovação

| Papel | Nome | Aprovação | Data |
|-------|------|-----------|------|
| Stakeholder / Product Owner | Lucas Batista | ☐ Pendente | — |
| UX/UI Lead | (este plano) | ✅ | 18/07/2026 |

**Próximo passo:** Stakeholder revisa e aprova o plano. Após aprovação, a **Fase 1 — Correções Críticas** é iniciada imediatamente.

---

## Apêndice A — Screenshots do Audit

| Seção | Arquivo | Tamanho | Observação chave |
|-------|---------|---------|-----------------|
| Hero Desktop | `screenshot_20260705_152106.736.png` | 152KB | Fundo plano, card sem glassmorphism |
| Cases (grid) | `screenshot_20260705_152147.883.png` | 182KB | Cards densos, P1 badge invisível |
| Sobre + IA | `screenshot_20260705_152155.355.png` | 67KB | Avatar "LB" cinza genérico, IA título cinza claro |
| Contato + Footer | `screenshot_20260705_152203.407.png` | 123KB | Footer básico, formulário sem estados |
| Dores (animação) | `screenshot_20260705_152318.872.png` | 41KB | **BUG: card quase invisível** |
| Serviços (animação) | `screenshot_20260705_152330.035.png` | 88KB | **BUG: primeiro card faded** |
| Cases + Método | `screenshot_20260705_152340.056.png` | 197KB | Cards densos, P2 visible |
| Mobile Serviços | `screenshot_20260705_152453.489.png` | 136KB | Cards grandes, tipografia OK |
| Mobile Hero | `screenshot_20260705_152534.141.png` | 143KB | Layout mobile funcional |

*Plano estratégico UX/UI & Marketing — Portfólio Lucas Batista. Documento confidencial. Baseado em evidências visuais reais do site em produção.*
