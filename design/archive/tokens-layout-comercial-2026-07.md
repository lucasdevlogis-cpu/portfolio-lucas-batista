# Design Tokens — Portfólio Lucas Batista

> Fonte da verdade para decisões visuais implementadas. Referência para manutenção, evolução e consistência do design system.
> **Atualizar sempre que tokens mudarem em `app/globals.css` ou componentes.**

---

## 1. Paleta de Cores

### 1.1 Brand

| Token | Hex | CSS Variable | Uso Principal |
|-------|-----|--------------|---------------|
| **Primary** | `#1e3a5f` | `--color-primary` | Headings, botões primários, navegação, ícones em círculo |
| **Accent** | `#0d9488` | `--color-accent` | Badges, hover states, destaques, CTAs secundários, seleção |
| **Primary Foreground** | `#ffffff` | `--color-primary-foreground` | Texto sobre primary |
| **Accent Foreground** | `#ffffff` | `--color-accent-foreground` | Texto sobre accent |

### 1.2 Neutros

| Token | Hex | CSS Variable | Uso Principal |
|-------|-----|--------------|---------------|
| **Background** | `#f8fafc` | `--color-background` | Fundo da página (seções alternadas) |
| **Foreground** | `#0f172a` | `--color-foreground` | Texto principal (body) |
| **Card** | `#ffffff` | `--color-card` | Cards, modais, superfícies elevadas |
| **Card Foreground** | `#0f172a` | `--color-card-foreground` | Texto dentro de cards |
| **Muted** | `#f1f5f9` | `--color-muted` | Fundos secundários, estados hover sutis |
| **Muted Foreground** | `#64748b` | `--color-muted-foreground` | Subtítulos, legendas, texto terciário |
| **Border** | `#e2e8f0` | `--color-border` | Bordas de cards, divisores, inputs |
| **Secondary** | `#f1f5f9` | `--color-secondary` | Fundo de badges secundários, filtros inativos |
| **Secondary Foreground** | `#0f172a` | `--color-secondary-foreground` | Texto sobre secondary |

### 1.3 Semânticos / Estados

| Token | Valor | Uso |
|-------|-------|-----|
| **Destructive** | `oklch(0.577 0.245 27.325)` | Erros, validação negativa, "não prometo" |
| **Success / Valid** | `border-green-500` | Campo válido no formulário |
| **Error / Invalid** | `border-red-500` | Campo inválido no formulário |
| **Selection Background** | `color-mix(in srgb, #0d9488 25%, transparent)` | Texto selecionado |
| **Selection Text** | `var(--color-primary)` | Cor do texto durante seleção |

### 1.4 Opacidades Brand (Gradientes & Overlays)

| Uso | Valor |
|-----|-------|
| Mesh gradient spot 1 | `color-mix(in oklab, var(--color-primary) 8%, transparent)` |
| Mesh gradient spot 2 | `color-mix(in oklab, var(--color-accent) 6%, transparent)` |
| Mesh gradient spot 3 | `color-mix(in oklab, var(--color-primary) 5%, transparent)` |
| Mesh gradient spot 4 | `color-mix(in oklab, var(--color-accent) 4%, transparent)` |
| Mesh gradient spot 5 | `color-mix(in oklab, var(--color-primary) 7%, transparent)` |
| Glassmorphism card | `bg-white/60` + `backdrop-blur-xl` |
| Glassmorphism border | `border-white/20` |
| Hero badge | `bg-accent/10` |
| Primary subtle | `bg-primary/5`, `text-primary` |
| Accent subtle | `bg-accent/10`, `border-accent/30` |

### 1.5 Prioridade de Cases (Badge System)

| Prioridade | Background | Texto | Borda | Ícone |
|------------|-----------|-------|-------|-------|
| **P0 — Essencial** | `bg-accent` | `text-white` | — | `Star` |
| **P1 — Forte** | `bg-primary/20` | `text-primary` | `border-primary/20` | `Zap` |
| **P2 — Complementar** | `bg-slate-100` | `text-slate-600` | `border-slate-200` | `Zap` |

### 1.6 Timeline / Serviços

| Elemento | Valor |
|----------|-------|
| Linha tracejada | `border-l-2 border-dashed border-primary/20` |

---

## 2. Tipografia

### 2.1 Fontes

| Função | Fonte | Font Stack | Peso Padrão |
|--------|-------|-----------|-------------|
| **Headings** | Inter | `var(--font-inter)` | Bold (`700`) |
| **Body** | Geist Sans | `var(--font-geist-sans)` | Normal (`400`) |
| **Monospace** | Geist Mono | `var(--font-geist-mono)` | Normal (`400`) |

> Configuração em `app/layout.tsx` via `next/font/google` com `display: swap`.

### 2.2 Escala Tipográfica

| Elemento | Mobile | Desktop (`md:`) | Peso | Tracking | Cor |
|----------|--------|-----------------|------|----------|-----|
| **Hero H1** | `text-4xl` (2.25rem) | `text-6xl` (3.75rem) | Bold | `tracking-tight` | `text-primary` |
| **Section H2** | `text-3xl` (1.875rem) | `text-4xl` (2.25rem) | Bold | `tracking-tight` | `text-primary` |
| **Card H3** | `text-xl` (1.25rem) | — | Semibold (`600`) | — | `text-primary` |
| **Body** | `text-base` (1rem) | `text-lg` (1.125rem) | Normal | — | `text-foreground` / `text-muted-foreground` |
| **Small / Caption** | `text-sm` (0.875rem) | — | Medium (`500`) | — | `text-muted-foreground` |
| **XS / Label** | `text-xs` (0.75rem) | — | Semibold (`600`) | `uppercase tracking-wide` | `text-accent` |
| **Mini** | `text-[0.7rem]` | — | Semibold | `uppercase tracking-wide` | `text-accent` / `text-muted-foreground` |
| **Tags** | `text-[0.65rem]` | — | — | — | `text-secondary-foreground` |

### 2.3 Estilos Específicos

| Uso | Classe |
|-----|--------|
| Headings | `font-heading` (alias para Inter) |
| Prova social (hero) | `font-heading text-2xl font-bold text-primary` |
| Badge numérico (dores) | `bg-accent/10 text-accent` |
| Categoria case | `text-xs font-medium uppercase tracking-wide text-accent` |
| Pergunta de negócio label | `text-[0.7rem] font-semibold uppercase tracking-wide text-accent` |
| Declaração limitação | `text-sm leading-relaxed text-muted-foreground` |

---

## 3. Espaçamento

### 3.1 Seções

| Elemento | Valor |
|----------|-------|
| Padding vertical seções | `py-20` (5rem / 80px) |
| Scroll margin (anchor offset) | `scroll-mt-20` (5rem) |
| Section divider height | `h-3` (0.75rem) ou `h-4` (1rem) com brand line |

### 3.2 Container

| Elemento | Valor |
|----------|-------|
| Max width | `max-w-7xl` (80rem / 1280px) |
| Padding horizontal | `px-4` → `sm:px-6` → `lg:px-8` |
| Centering | `mx-auto` |

### 3.3 Grid & Gaps

| Contexto | Grid | Gap |
|----------|------|-----|
| Dores (cards) | `1 col` → `md:2 cols` → `lg:4 cols` | `gap-6` (1.5rem) |
| Cases (demonstráveis) | `1 col` → `sm:2 cols` → `xl:3 cols` | `gap-6` |
| Cases (roadmap) | `1 col` → `sm:2 cols` → `lg:3 cols` | `gap-4` (1rem) |
| Serviços (timeline) | Flex col | `gap-6` |
| Método | Flex col → `lg:flex-row` | `gap-4` |
| IA Section | `lg:grid-cols-2` | `gap-12` (3rem) |
| Sobre | `lg:grid-cols-[1fr_1.4fr]` | `gap-12` |
| Contato | `lg:grid-cols-2` | `gap-12` |
| Footer | `lg:grid-cols-3` | `gap-8` (2rem) |
| Hero content | Flex col → `lg:flex-row` | `gap-12` |

### 3.4 Component Interno

| Elemento | Valor |
|----------|-------|
| Card padding | `p-6` (1.5rem) |
| Card footer padding | `p-4` (1rem) |
| Section header margin bottom | `mb-12` (3rem) |
| Badge padding | `px-4 py-1` (hero) / `px-3 py-1` (footer) |
| Button gap (icon+text) | `gap-1.5` a `gap-2` |
| List item gap | `gap-2` a `gap-3` |
| Form spacing | `space-y-4` |

---

## 4. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `calc(var(--radius) * 0.6)` ≈ 0.375rem (6px) | Inputs pequenos |
| `--radius-md` | `calc(var(--radius) * 0.8)` ≈ 0.5rem (8px) | Badges, tags |
| `--radius-lg` | `var(--radius)` = 0.625rem (10px) | Botões, cards pequenos |
| `--radius-xl` | `calc(var(--radius) * 1.4)` ≈ 0.875rem (14px) | — |
| `--radius-2xl` | `calc(var(--radius) * 1.8)` ≈ 1.125rem (18px) | Cards principais |
| `--radius-3xl` | `calc(var(--radius) * 2.2)` ≈ 1.375rem (22px) | — |
| `--radius-4xl` | `calc(var(--radius) * 2.6)` ≈ 1.625rem (26px) | — |

| Uso Específico | Valor |
|----------------|-------|
| Cards (CaseCard, PainPointCard, ServiceCard) | `rounded-xl` |
| Avatar (Sobre) | `rounded-2xl` |
| ProofCard (Hero) | `rounded-2xl` |
| Badges / Tags | `rounded-full` |
| Botões | `rounded-md` (shadcn padrão) ou herdado |
| Ícones em círculo | `rounded-full` |
| Números do método | `rounded-full` |
| Modal dialog | Herdado do shadcn |

---

## 5. Sombras

| Token / Uso | Valor Tailwind | Aplicação |
|-------------|----------------|-----------|
| **Card default** | `shadow-sm` | ServiceCard, CaseCard base |
| **Card elevated** | `shadow-md` | PainPointCard, hover states |
| **Card prominent** | `shadow-lg` | PainPointCard hover, Avatar |
| **ProofCard** | `shadow-xl` | Hero proof card (glassmorphism) |
| **Form card** | `shadow-sm` | Formulário de contato |
| **Modal overlay** | Herdado shadcn Dialog | DemoModal |

### 5.1 Shadow Hover States

| Componente | Hover Shadow | Notas |
|------------|--------------|-------|
| PainPointCard | `hover:shadow-lg` | — |
| ServiceCard | `hover:shadow-md` | — |
| CaseCard | `hover:shadow-md` | + `hover:scale-[1.02]` (com demo) |
| Footer social links | `hover:bg-slate-100` | Sem shadow, cor de fundo |

---

## 6. Animações & Motion

### 6.1 Configuração Global

```tsx
// HomePage.tsx
<MotionConfig reducedMotion="user">
```

- **Respeito a `prefers-reduced-motion`:** Sim, via `MotionConfig reducedMotion="user"`
- **Scroll behavior:** `scroll-behavior: smooth` em `html`

### 6.2 Padrões de Animação por Componente

#### SectionHeader
| Propriedade | Valor |
|-------------|-------|
| Initial | `{ opacity: 0, y: 20 }` |
| whileInView | `{ opacity: 1, y: 0 }` |
| viewport | `{ once: true, margin: "-80px" }` |
| duration | `0.5s` |

#### Dores (Grid Stagger)
| Propriedade | Valor |
|-------------|-------|
| Container initial | `{ opacity: 0 }` |
| Container show | `{ opacity: 1, transition: { staggerChildren: 0.1 } }` |
| Card item initial | `{ opacity: 1, y: 20 }` |
| Card item show | `{ opacity: 1, y: 0, transition: { duration: 0.4 } }` |
| viewport | `{ once: true, margin: "-100px" }` |

#### Serviços (Timeline)
| Propriedade | Valor |
|-------------|-------|
| Timeline line | `initial: { scaleY: 0 }` → `whileInView: { scaleY: 1 }` |
| Timeline duration | `0.8s` |
| Card initial | `{ opacity: 1, y: 24 }` |
| Card animate | `{ opacity: 1, y: 0 }` |
| Card duration | `0.45s` |
| Card stagger | `delay: index * 0.08` |
| Card viewport | `{ once: true, margin: "-60px" }` |

#### Hero
| Elemento | Propriedade | Valor |
|----------|-------------|-------|
| Container | staggerChildren | `0.1s` |
| Item (badge, title, subtitle, CTAs) | initial | `{ opacity: 1, y: 16 }` |
| Item | animate | `{ opacity: 1, y: 0 }` |
| Item | duration | `0.5s` |
| ProofCard | initial | `{ opacity: 0, y: 20 }` |
| ProofCard | animate | `{ opacity: 1, y: 0 }` |
| ProofCard | duration | `0.5s`, delay `0.4s` |
| Provas (linhas) | initial | `{ opacity: 0, x: 12 }` |
| Provas | animate | `{ opacity: 1, x: 0 }` |
| Provas | duration | `0.4s` |
| Provas | stagger | `delay: 0.5 + index * 0.12` |

#### Cases (Filter Animation)
| Propriedade | Valor |
|-------------|-------|
| layout | `true` (AnimatePresence + layout) |
| initial | `{ opacity: 0, scale: 0.96 }` |
| animate | `{ opacity: 1, scale: 1 }` |
| exit | `{ opacity: 0, scale: 0.96 }` |
| duration | `0.25s` |

#### Metodo
| Propriedade | Valor |
|-------------|-------|
| initial | `{ opacity: 0, y: 20 }` |
| whileInView | `{ opacity: 1, y: 0 }` |
| duration | `0.4s` |
| stagger | `delay: index * 0.1` |
| viewport | `{ once: true, margin: "-60px" }` |

#### Sobre
| Propriedade | Valor |
|-------------|-------|
| Coluna 1 | duration `0.5s`, viewport `margin: "-80px"` |
| Coluna 2 | duration `0.5s`, delay `0.1s` |

#### IA Section
| Propriedade | Valor |
|-------------|-------|
| Esquerda | duration `0.5s`, viewport `margin: "-80px"` |
| Direita (cards) | duration `0.5s`, delay `0.15s` |

#### Contato (Formulário)
| Estado | Propriedade | Valor |
|--------|-------------|-------|
| Sucesso enter | initial | `{ opacity: 0, scale: 0.95, y: 10 }` |
| Sucesso enter | animate | `{ opacity: 1, scale: 1, y: 0 }` |
| Sucesso enter | duration | `0.35s`, ease `"easeOut"` |
| Sucesso exit | exit | `{ opacity: 0, scale: 0.95, y: -10 }` |
| Checkmark | initial | `{ scale: 0 }` |
| Checkmark | animate | `{ scale: 1 }` |
| Checkmark | spring | `stiffness: 260, damping: 20, delay: 0.15` |
| Form exit | exit | `{ opacity: 0, y: -10 }` |
| Form exit | duration | `0.2s` |

#### DemoModal (Skeleton)
| Propriedade | Valor |
|-------------|-------|
| Skeleton pulse | `animate-pulse` + `motion-reduce:animate-none` |

### 6.3 Resumo dos Tokens de Motion

| Token | Valor | Uso |
|-------|-------|-----|
| **Duration fast** | `0.2s` — `0.25s` | Transições CSS, filtros, exit |
| **Duration base** | `0.4s` — `0.5s` | Entrada padrão de elementos |
| **Duration slow** | `0.8s` | Timeline tracejada |
| **Stagger base** | `0.1s` | Grid de cards, método |
| **Stagger fast** | `0.08s` | Serviços |
| **Stagger hero** | `0.12s` | Linhas do proof card |
| **Delay hero proof** | `0.4s` | Card de provas |
| **Delay hero lines** | `0.5s` | Primeira linha de prova |
| **Ease default** | Framer Motion default | Suave ease-in-out |
| **Ease success** | `"easeOut"` | Card de sucesso do formulário |
| **Spring checkmark** | `stiffness: 260, damping: 20` | Ícone de sucesso |
| **TranslateY entrance** | `16px` — `24px` | Distância de slide-up |
| **TranslateX entrance** | `12px` | Provas (direita) |

### 6.4 Hover & Active States (CSS Transitions)

| Componente | Hover | Active / Transition |
|------------|-------|---------------------|
| CaseCard (com demo) | `hover:scale-[1.02]` + `hover:shadow-md` | `transition-all` |
| CaseCard (sem demo) | `hover:shadow-md` | `transition-all` |
| PainPointCard | `hover:shadow-lg` | `transition-shadow` |
| ServiceCard | `hover:shadow-md` | `transition-shadow` |
| Footer links | `hover:text-primary` | `transition-colors` |
| Footer social | `hover:bg-slate-100 hover:text-primary` | `transition-colors` |
| Filtro ativo | `hover:bg-primary/90` | `transition-colors` |
| Filtro inativo | `hover:bg-secondary/80` | `transition-colors` |
| Botão primário | `hover:bg-primary/90` | — |
| CTA outline | `border-primary/30` | — |

---

## 7. Layout & Grid

### 7.1 Breakpoints (Tailwind V4 Padrão)

| Nome | Largura | Uso no Projeto |
|------|---------|----------------|
| `sm` | 640px | Hero botões lado a lado, cases 2 cols |
| `md` | 768px | Dores 2 cols, nav links visíveis, timeline vertical visível |
| `lg` | 1024px | Dores 4 cols, cases 3 cols, grid 2 cols em Sobre/Contato |
| `xl` | 1280px | Cases 3 cols (confirmação) |
| `2xl` | 1536px | — |

### 7.2 Z-Index / Layering

| Camada | Valor | Elemento |
|--------|-------|----------|
| Background mesh | `pointer-events-none` | Hero gradient overlay |
| Content | Default | Texto, cards |
| Skeleton overlay | `z-10` | DemoModal loading state |
| Modal | Herdado shadcn | DialogContent |
| Header (fixo) | `sticky` / `fixed` implícito | Header component |

---

## 8. Componentes UI (shadcn/ui)

### 8.1 Tokens Herdados

| Componente | Tokens Relevantes |
|------------|-------------------|
| Button | `primary`, `primary-foreground`, `secondary`, `accent` variants |
| Card | `card`, `card-foreground`, `border`, `shadow-sm` |
| Badge | `secondary`, `accent`, `destructive` variants |
| Dialog | `card`, `popover`, overlay padrão shadcn |
| Input | `border`, `input`, `ring`, focus states |
| Textarea | Mesmo que Input |
| Label | Herdado de texto |
| Sheet | Mobile menu (slide from side) |

### 8.2 Variações de Botão

| Variante | Classes |
|----------|---------|
| Primary | `bg-primary text-primary-foreground hover:bg-primary/90` |
| Outline | `border-primary/30` (hero CTA secundário) |
| Default shadcn | `variant="default"`, `variant="outline"` |

---

## 9. Assets & Ícones

| Fonte | Biblioteca | Uso |
|-------|-----------|-----|
| Ícones | Lucide React | Todos os ícones do site |
| Ícones comuns | `Sparkles`, `ArrowDown`, `Check`, `X`, `Star`, `Zap`, `Target`, `ExternalLink`, `PlayCircle`, `Brain`, `Shield`, `Mail`, `Link`, `Code2`, `ArrowUp`, `ArrowRight`, `User`, `Building2`, `MessageSquare`, `CheckCircle2` | — |
| Ícones dinâmicos | `LucideIconByName` | Renderização por string do `data/content.ts` |

---

## 10. Arquivos de Referência

| Token / Decisão | Arquivo Fonte |
|-----------------|---------------|
| CSS Variables, cores, radius | `app/globals.css` |
| Fontes (Inter, Geist) | `app/layout.tsx` |
| Decisões visuais de layout | `design/design.md` |
| Conteúdo textual | `data/content.ts` |
| Componentes com animação | `components/HomePage.tsx`, `components/Hero.tsx`, `components/Dores.tsx`, `components/Servicos.tsx`, `components/Cases.tsx`, `components/Metodo.tsx`, `components/Sobre.tsx`, `components/IASection.tsx`, `components/Contato.tsx`, `components/DemoModal.tsx` |
| Cards reutilizáveis | `components/CaseCard.tsx`, `components/PainPointCard.tsx`, `components/ServiceCard.tsx` |

---

*Design Tokens — documento vivo. Última atualização: Fase 4 (Documentação & Validação).*
