# Skill: Padrões de Componentes

## Descricao
Padrões reutilizáveis de componentes para o portfolio Executive Proof System. Use estes como base para não reinventar.

## Section Shell (Wrapper de Secao)

### Estrutura
```tsx
interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
  innerClassName?: string;
  headerClassName?: string;
  children: React.ReactNode;
}
```

### Uso
```tsx
<SectionShell
  id="perfil"
  eyebrow="PERFIL PROFISSIONAL"
  title="Fit em 60 segundos"
  lead="Texto curto de uma linha"
>
  {/* conteúdo */}
</SectionShell>
```

### Tailwind
```
scroll-mt-24 overflow-hidden py-20 lg:py-28
bg-editorial text-ink  (light)
bg-surface-dark text-white  (dark)
container max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12
```

---

## Editorial Badge

### Estrutura
```tsx
interface EditorialBadgeProps {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
}
```

### Tailwind
```
inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5
text-[11px] font-extrabold uppercase leading-none tracking-[0.16em]

// light
border-primary/12 bg-primary/[0.04] text-primary

// dark
border-white/12 bg-white/[0.06] text-on-dark-accent

// gold
border-warm-accent/25 bg-warm-accent/10 text-[#8A651F]
```

---

## Premium Card

### Estrutura
```tsx
interface PremiumCardProps {
  as?: "article" | "div";
  tone?: "light" | "dark";
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
  children: React.ReactNode;
}
```

### Tailwind
```
relative overflow-hidden rounded-xl border transition-all duration-normal ease-editorial will-change-transform

// light
border-primary/10 bg-card/95 shadow-card
hover:-translate-y-1 hover:shadow-elevated hover:border-primary/20

// dark
border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.18)]
hover:border-white/20

// gradientBorder adiciona .gradient-border
```

---

## Card de Prova (Signature Case)

### Estrutura
```tsx
interface Case {
  id: string;
  titulo: string;
  descricao: string;
  categoria: CaseCategoria;
  icone: LucideIconName;
  tags: string[];
  linkDemo: string;
  linkGitHub: string;
  prioridade: "P0" | "P1" | "P2";
  perguntaNegocio: string;
  metricaPrincipal: string;
  metricaResumo: string;
  decisaoApoiada: string;
  limitacao: string;
}
```

### Layout
- Desktop: 3 colunas, cards verticais
- Mobile: 1 coluna, cards verticais
- Ícone em gradiente primary no topo
- Badge de categoria (EditorialBadge)
- Título Playfair 2xl
- Descrição curta
- "Problema de negócio" (resumido no card, detalhado no modal)
- "Métrica principal" destacada
- CTA "Ver demo" + link GitHub (quando existir)

### Tailwind
```
rounded-2xl border border-border bg-card p-6 shadow-card
hover:border-accent/40 hover:shadow-elevated hover:-translate-y-2
```

---

## Case Library (Biblioteca Complementar)

### Estrutura
- Filtro lateral em desktop (sticky)
- Tabela premium em desktop
- Lista de cards em mobile
- Filtros via `CASE_CATEGORIAS`
- Anúncio de mudança de filtro via `aria-live`

### Tailwind Desktop
```
grid lg:grid-cols-[16rem_1fr]
```

### Tailwind Mobile
```
// filtros horizontal scroll
flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5

// cards lista
flex flex-col gap-4
```

---

## Evidence Strip (Faixa de Métricas)

### Estrutura
```tsx
interface ProofStat {
  valor: string;
  label: string;
  detalhe: string;
}
```

### Layout
- 3 métricas em desktop
- Stack vertical ou 2+1 em mobile
- Ícone + valor grande + label + detalhe

### Tailwind
```
border-l-2 border-primary/20 bg-card/60 px-5 py-4
hover:border-accent hover:bg-card
```

---

## Botao CTA

### Variantes (button.tsx)

**Executive (acao principal em fundo escuro)**
```
bg-ink text-white hover:bg-ink/90
focus-visible:ring-ink/30
```

**Accent (CTA primário colorido)**
```
bg-accent text-white hover:bg-accent-contrast hover:shadow-glow hover:-translate-y-0.5
```

**Outline em dark**
```
border-white/15 bg-white/[0.055] text-white hover:bg-white/10 hover:text-white
```

**Outline em light**
```
border-border bg-background hover:bg-muted hover:text-foreground
```

---

## Demo Modal

### Estrutura
- Dialog shadcn/ui
- Contexto do case (pergunta, decisão, métrica, limitação, tags)
- Iframe Streamlit com `?embed=true`
- Link "Abrir em nova aba"
- Skeleton de loading
- Tratamento mobile: botão para carregar iframe inline

### Acessibilidade
```
aria-modal="true"
aria-labelledby="demo-title"
aria-describedby="demo-context"
fechar com ESC
foco gerenciado pelo Dialog do shadcn
```

---

## Navbar

### Comportamento
- Sticky no topo: `sticky top-0 z-40`
- Fundo escuro translúcido: `bg-surface-dark/90 backdrop-blur-md`
- Texto branco, links com hover
- Mobile: hamburger menu (`MobileNav.tsx`)

### Tailwind
```
sticky top-0 z-40 border-b border-white/10 bg-surface-dark/90 backdrop-blur-md
h-16 max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12
```

---

## Footer Minimalista

### Estrutura
- 3 colunas em desktop / stack em mobile
- Nome + cargo
- Links rápidos
- Redes sociais
- Copyright + disclaimer
- Link "Voltar ao topo"

### Tailwind
```
border-t border-border bg-card py-14
```

---

## Profile Brief (Perfil)

### Estrutura
- Card grande de senioridade à esquerda
- Grid 2x2 de diferenciais à direita
- Faixa de credibilidade abaixo
- FAQ opcional (pendente de remoção por prioridade)

### Tailwind
```
grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-2 lg:items-stretch
```

---

## Trajectory Board (Trajetória)

### Estrutura
- Narrativa de senioridade (timeline visual)
- Stack técnico em card escuro
- Impactos em metric pills
- Experiências em cards
- Formação e certificações compactas

### Tailwind
```
grid gap-8 lg:grid-cols-[0.46fr_0.54fr]
```
