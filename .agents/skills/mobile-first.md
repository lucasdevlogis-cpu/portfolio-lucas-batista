# Skill: Mobile-First

## Descricao
Regras de implementação mobile para todos os componentes da landing. Meta: Lighthouse mobile **100** (atual: 96).

## Principios
1. Conteúdo essencial em 1 tela (hero deve comunicar perfil sem scroll excessivo)
2. Touch targets: mínimo 44x44px
3. Cada seção: máximo 2-3 telas de scroll
4. Fontes legíveis: nunca menor que 14px em mobile
5. Performance: LCP < 2.5s, CLS < 0.1

## Spec por Componente (Mobile < 768px)

### Header
```
Comportamento: Sticky no topo, altura 64px
Fundo: bg-surface-dark/90 + backdrop-blur
Logo/Nome: "Lucas Batista" ou "LB"
Nav: Hamburger menu (MobileNav.tsx) ✅
CTA Contato: Compacto ou dentro do menu mobile
```

### ExecutiveHero
```tsx
<ExecutiveHero className="min-h-[auto] px-5 pt-10 pb-12">
  <h1 className="font-heading text-4xl sm:text-5xl">Lucas Farias Batista</h1>
  <p className="text-lg font-semibold text-white">Headline curta</p>
  <p className="text-base text-on-dark-muted">Subheadline 1-2 linhas</p>
  <div className="flex flex-col gap-3 mt-8">
    <CTA className="w-full" /> {/* Stack vertical, largura total */}
    <CTA variant="outline" className="w-full" />
  </div>
  {/* Cockpit oculto em mobile */}
  <div className="hidden lg:block">
    <LogisticsIntelligenceCockpit />
  </div>
</ExecutiveHero>
```

### EvidenceStrip
```tsx
// Stack vertical em mobile
<section className="px-5 py-6">
  <div className="flex flex-col gap-4">
    {evidences.map(e => (
      <div key={e.id} className="flex items-center gap-3">
        <Icon className="size-8" />
        <div>
          <span className="text-2xl font-bold">{e.value}</span>
          <span className="text-sm text-muted-foreground">{e.label}</span>
        </div>
      </div>
    ))}
  </div>
</section>
```

### ProfileBrief
```tsx
// Single column
// Cards empilhados
// Grid de diferenciais: 1 coluna em mobile, 2 em sm
// Faixa de credibilidade: 2 colunas
// FAQ opcional: considerar remoção (prioridade P1)
```

### SignatureCases
```tsx
// Grid 1 coluna
// Cards verticais, largura total
// Thumbnail futuro: aspect-video, 16:9
// CTA largura total
```

### CaseLibraryDesktop
```tsx
// Renomear para CaseLibrary (não "Desktop")
// Filtros: scroll horizontal com snap em mobile
// Lista vertical de cards em mobile (não tabela)
// Touch target por item: mínimo 64px de altura
```

### TrajectoryBoard
```tsx
// Single column
// Timeline simplificada
// Stack em tags/grupos
// Experiências em cards verticais
// Formação e certificações empilhadas
```

### DemoModal (mobile)
```tsx
// Full screen ou 95% da altura
// Header fixo: título + botão fechar
// Iframe: altura flexível, min 300px
// Botão "Abrir em nova aba" visível
// Contexto do case em details/summary
```

### ContactPanel
```tsx
// Single column
// Links: stack vertical, largura total
// Cada link: min 56px altura
```

## Tailwind Mobile (padrao)
- Mobile-first: estilos sem prefixo aplicam-se a todas as telas
- Override: `sm:`, `md:`, `lg:`, `xl:` para telas maiores
- Exemplo: `text-3xl md:text-4xl lg:text-5xl xl:text-6xl`

## Performance Mobile
- Imagens: `loading="lazy"` exceto hero (use `priority`)
- SVG cockpit: inline e otimizado
- Framer Motion: `LazyMotion` + `domAnimation` ✅
- Filtros: já otimizados com useMemo
- Modal: lazy load do componente ✅

## Testes
```bash
# Lighthouse mobile
npx lighthouse https://portfolio-lucas-batista-murex.vercel.app \
  --preset=desktop --formFactor=mobile --screenEmulation.mobile

# Meta: Performance 100, A11y 100, BP 100, SEO 100
```

## Tarefas Pendentes Mobile
1. Renomear `CaseLibraryDesktop` → `CaseLibrary`
2. Criar layout de lista para mobile na biblioteca de cases
3. Reduzir densidade do hero em telas muito pequenas
4. Otimizar cockpit SVG para evitar LCP alto

## Referencias
- `docs/MOBILE_SPEC.md` — Spec completa
- `design/tokens.md` — Tokens visuais
- `design/design.md` — Direção visual
