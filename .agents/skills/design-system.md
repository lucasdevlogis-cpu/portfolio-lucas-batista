# Skill: Design System do Portfolio

## Descricao
Define o sistema visual completo do portfolio Lucas Batista (Executive Proof System). Todo código gerado deve seguir estas regras estritamente.

## Paleta de Cores

### Cores Base
| Token | Hex | CSS var | Uso |
|-------|-----|---------|-----|
| Editorial | `#f7f4ec` | `--background` / `--editorial` | Fundo principal das seções claras |
| Card | `#ffffff` | `--card` | Blocos claros, áreas de leitura |
| Ink | `#07111f` | `--ink` | Texto forte, CTA principal |
| Primary | `#153451` | `--primary` | Azul petróleo técnico |
| Surface dark | `#07111f` | `--surface-dark` | Hero, contato, blocos escuros |
| Accent | `#16a99c` | `--accent` | Sinal técnico, CTAs de destaque |
| Warm accent | `#d4a853` | `--warm-accent` | Eyebrows, acento editorial |
| Muted | `#667085` | `--muted-foreground` | Texto secundário |
| Border | `#d7cebd` | `--border` | Divisórias editoriais |

### Cores Derivadas
| Token | Hex | Uso |
|-------|-----|-----|
| Accent contrast | `#0d746d` | Hover de accent, texto em fundo claro |
| Editorial 2 | `#eee8dc` | Fundo alternativo para contraste sutil |
| Surface dark 2 | `#0b1220` | Glass escuro, overlays |
| Surface dark 3 | `#101b2d` | Elevação em superfícies escuras |
| Text on dark muted | `#cbd5e1` | Texto secundário em fundo escuro |
| Text on dark accent | `#5eead4` | Acento em fundo escuro |

## Tipografia

### Fontes
- **Headings:** Source Serif 4 via `next/font/google` (`--font-source-serif` → `font-heading`)
- **Body:** Inter via `next/font/google` (`--font-inter` → `font-sans`/`font-body`)

### Escala Modular
| Token | Tamanho | Peso | Line-height | Uso |
|-------|---------|------|-------------|-----|
| text-3xl/4xl/5xl | 1.875rem / 2.25rem / 3rem | 700 | 1.08 | Título de seção (Source Serif 4) |
| text-2xl | 1.5rem | 700 | 1.1 | Subtítulo de destaque (Source Serif 4) |
| text-2xl | 1.5rem | 600/700 | 1.1 | Títulos de cards, métricas |
| text-xl | 1.25rem | 600 | 1.2 | Destaques, subtítulos |
| text-lg | 1.125rem | 500/600 | 1.4 | Subtítulo hero, lead de seção |
| text-base | 1rem | 400/500 | 1.6 | Texto corrido |
| text-sm | 0.875rem | 400/500 | 1.5 | Descrições secundárias |
| text-xs | 0.75rem | 500/700/800 | 1.4 | Labels, badges, metadata |
| text-xs | 0.75rem | 800 | 1 | Eyebrows uppercase |

### Regras
- Títulos: `font-heading`, semibold/bold
- Texto corrido: `font-sans` (Inter), normal (400), nunca font-light
- Labels uppercase: `uppercase` + `tracking-[0.12em]`/`tracking-[0.14em]` + `text-xs`
- Corpo mínimo: `text-sm` (14px) para metadados; `text-base` (16px) para leitura principal
- Nunca usar fonte menor que 12px

## Espacamento

### Secoes
- Padding vertical padrão: `py-14 lg:py-20`
- Gap entre seções: 0 (fundo contínuo) ou divisória sutil

### Containers
- Max-width: `max-w-[1440px]`
- Padding horizontal: `px-5 sm:px-8 lg:px-10 xl:px-12`
- Centralizado: `mx-auto`

### Grid de Cards
- Desktop (lg+): `grid-cols-3`, gap-6
- Tablet (md): `grid-cols-2`, gap-6
- Mobile: `grid-cols-1`, gap-4

### Componentes
| Elemento | Padding | Border | Shadow |
|----------|---------|--------|--------|
| Card padrão | p-6 / p-7 | border-primary/10 ou border-border | shadow-card |
| Card hover | - | - | shadow-elevated + translateY(-4px/-5px) |
| Botão primário | px-5/6 py-3 | none | shadow-glow (para accent) |
| Botão secundário | px-5/6 py-3 | border-white/15 (dark) / border-border (light) | none |
| Badge | px-3 py-1.5 | border sutil | none |
| Input/Link card | p-4 | border border-border | shadow-card |

## Transicoes e Animacoes

### Padrao
```css
transition: all var(--duration-normal) var(--ease-editorial);
```
- `--duration-fast`: 120ms
- `--duration-normal`: 220ms
- `--duration-slow`: 350ms
- `--ease-editorial`: cubic-bezier(0.22, 1, 0.36, 1)

### Hover States
- Cards: `hover:-translate-y-1 hover:shadow-elevated hover:border-primary/20`
- Botões: `hover:-translate-y-0.5 hover:bg-accent-contrast hover:shadow-glow`
- Links: mudança de cor + underline animado

### Scroll Animations
- Framer Motion `whileInView` com `viewport={{ once: true }}`
- Estado inicial `opacity: 1` (conteúdo nunca invisível)
- Movimento principal em `y` (20-40px) e escala sutil
- Respeitar `prefers-reduced-motion`

## Breakpoints
| Nome | Largura | Tailwind Prefix |
|------|---------|-----------------|
| Mobile | < 640px | (default) |
| Tablet | 640px+ | sm: |
| Desktop | 1024px+ | lg: |
| Wide | 1280px+ | xl: |

## Icones
- Biblioteca: lucide-react
- Tamanho padrão: size-5 (20px)
- Tamanho grande: size-6 (24px) para títulos de seção
- Tamanho pequeno: size-4 (16px) para inline/metadata
- Cor: text-muted-foreground (default), text-primary/accent (acento)

## Z-Index Hierarchy
| Valor | Uso |
|-------|-----|
| z-50 | Skip link focado |
| z-40 | Navbar fixa |
| z-30 | Modais, overlays |
| z-10 | Elementos com posicionamento relativo |
| z-0 | Conteúdo padrão |

## Utilitarios Premium
- `.card-surface` — card padrão
- `.hover-lift` — elevação no hover
- `.focus-ring` — foco acessível
- `.eyebrow` / `.eyebrow-dark` — labels de seção
- `.section-title` / `.section-title-dark` — títulos de seção
- `.section-lead` / `.section-lead-dark` — leads de seção
- `.glass` / `.glass-dark` — fundos translúcidos
- `.gradient-border` — borda com gradiente warm/accent
- `.text-gradient` — gradiente ink → primary → accent
- `.shine` — efeito de brilho no hover

## Sombra e Elevação
| Token | Valor |
|-------|-------|
| --shadow-card | `0 8px 32px rgba(7,17,31,0.08)` |
| --shadow-elevated | `0 18px 56px rgba(7,17,31,0.14)` |
| --shadow-premium | `0 32px 80px rgba(7,17,31,0.2)` |
| --shadow-glow | `0 0 48px rgba(22,169,156,0.16)` |
