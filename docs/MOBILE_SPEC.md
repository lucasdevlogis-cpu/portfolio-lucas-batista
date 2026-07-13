# MOBILE SPEC — Portfolio Lucas Batista

> **Canônico para mobile.** Skill thin: [`.agents/skills/mobile-first.md`](../.agents/skills/mobile-first.md)  
> **Entrada:** [`CANON.md`](CANON.md) · **Arquitetura:** [`ARQUITETURA.md`](ARQUITETURA.md)
>
> **Aplica-se a:** landing Next.js (`components/`)  
> **Breakpoints:** `sm:640` · `md:768` · `lg:1024` · `xl:1280`  
> **Nota:** sem cockpit na homepage; biblioteca em cards abaixo de `lg`.

---

## 1. Principios Mobile-First

1. **Conteudo essencial primeiro**: Hero deve comunicar perfil em **1 tela (100vh)**
2. **Touch targets**: Minimo 44x44px para todos os elementos interativos
3. **Scroll economico**: Cada secao deve caber em **2-3 telas** no maximo
4. **Gestos**: Swipe horizontal para carrossel de cases (se aplicavel)
5. **Performance**: LCP < 2.5s em 4G, CLS < 0.1

---

## 2. Spec por Componente (Mobile < 768px)

### Header
```
Comportamento: Fixo no topo, altura 56px
Fundo: bg-surface-dark/95 + backdrop-blur
Logo/Nome: Escondido ou reduzido (apenas "LB" ou icone)
Nav: Hamburger menu (MobileNav.tsx) — ja implementado ✅
CTA Contato: Botao compacto (icone + texto curto) ou icone-only
```

### ExecutiveHero
```
Layout: Single column, padding generoso
Prioridade:
  1. Nome (Source Serif 4, text-3xl)
  2. Posicionamento (1-2 linhas max)
  3. CTAs (stack vertical, largura total)

Decisao sobre painel lateral:
  - Esconder em mobile (painel e contexto secundario; stack e empresas ja resumidos no Hero)
  - Preservar 100vh para conteudo essencial

Altura maxima: 100vh - 56px (header)
Padding: px-5 py-12
CTAs: Stack vertical, largura total, gap-3
```

### EvidenceStrip
```
Layout: Stack vertical ou 2+1 grid
Cada evidencia: Icono + numero + label em linha unica
Padding: px-5 py-8
Fonte: Numero text-2xl, label text-sm
Separador: Divisoria horizontal (nao vertical)
```

### ProfileBrief
```
Layout: Single column
Card de senioridade: Largura total, padding confortavel
Grid de diferenciais: 2 colunas (grid-cols-2) ou 1 coluna se texto longo
Faixa de credibilidade: Scroll horizontal se necessario
Padding: px-5 py-12
```

### SignatureCases (3 ancora)
```
Layout: Stack vertical (1 coluna)
Card: Largura total, aspecto compacto
Thumbnail: aspect-video (16:9) — usar screenshot da demo
Titulo: text-lg, 1 linha com truncate
Descricao: 2 linhas max com line-clamp-2
CTA: Largura total

Touch target do card: Minimo 120px de altura total
Gap entre cards: gap-4
```

### CaseLibrary
```
Nome: CaseLibrary (responsivo: sidebar desktop + lista mobile)
Layout: Stack vertical
Filtros: Scroll horizontal com snap-x (pills compactos)
Tabela: Converter para cards lista ou accordion
Touch target por item: Minimo 64px de altura

Filtros scroll:
<div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5">
  {categories.map(c => <button className="snap-start shrink-0">{c}</button>)}
</div>
```

### TrajectoryBoard
```
Layout: Single column
Timeline: Linha a esquerda (8px margin), conteudo a direita
Experiencias: Card unico, padding confortavel
Formacao / Certificacoes / Idiomas: Empilhados em cards compactos

Touch target: Cards de experiencia min 80px altura
```

### ContactPanel
```
Layout: Single column
CTAs: Stack vertical, largura total, min 72px altura
Manifesto + Localizacao + Nota: Cards compactos abaixo dos CTAs
Padding: px-5 py-12
```

### DemoModal
```
Layout: Full screen ou 95% da altura
Header fixo: Titulo + botao fechar
Iframe: Altura flexivel, min 400px
Footer: Link "Abrir em nova aba" sticky

Comportamento: 
  - Scroll do body bloqueado quando aberto
  - Fechar com gesto de swipe-down (opcional)
  - Back button do navegador fecha modal (history API)
```

### Footer
```
Layout: Stack vertical, centralizado
Links: Em linha (flex-wrap), gap-4
Copyright: Texto menor, centralizado
Padding: px-5 py-8
```

---

## 3. Tokens Mobile-Specific

Adicionar em `app/globals.css`:

```css
@theme inline {
  /* Touch targets */
  --touch-min: 44px;
  --touch-comfortable: 48px;
  
  /* Font sizes mobile */
  --text-hero-mobile: 2rem;      /* 32px — Playfair */
  --text-section-mobile: 1.75rem; /* 28px */
  --text-card-mobile: 1.125rem;   /* 18px */
  
  /* Spacing mobile */
  --section-py-mobile: 3rem;      /* 48px */
  --card-py-mobile: 1.25rem;      /* 20px */
  
  /* Motion mobile — mais rapido */
  --duration-mobile: 250ms;
}
```

---

## 4. Performance Mobile

### LCP (Largest Contentful Paint)
Elemento LCP provavel: texto do nome no hero ou imagem OG (quando compartilhada).

**Otimizacoes:**
- Hero: sem imagem principal; texto renderizado imediatamente
- Fontes: `font-display: swap` ja deve estar configurado
- Preconnect: `https://fonts.googleapis.com` e `https://fonts.gstatic.com`

### CLS (Cumulative Layout Shift)
Causas comuns de CLS em mobile:
- Fontes carregando com FOUT (Flash of Unstyled Text)
- Imagens sem width/height explicito
- SVG decorativos redimensionando
- Conteudo dinamico (filtros de cases) empurrando layout

**Correcoes:**
```tsx
// Sempre definir width/height em imagens
<Image src="/og-image.jpg" width={1200} height={630} priority />

// SVG cockpit com viewBox fixo
<svg viewBox="0 0 400 300" className="w-full h-auto">

// Container para conteudo dinamico com min-height
<div className="min-h-[200px]">
  {filteredCases.map(...)}
</div>
```

### INP (Interaction to Next Paint)
Com Framer Motion, animacoes pesadas podem bloquear a thread principal.

**Otimizacoes:**
- Usar `transform` e `opacity` apenas (GPU-accelerated)
- `will-change: transform` em elementos animados
- `LazyMotion` + `domAnimation` ja ajuda ✅
- Debounce em filtros de cases (300ms)

---

## 5. Testes Mobile

### Device Testing Checklist
- [ ] iPhone SE (375px) — menor tela comum
- [ ] iPhone 14 Pro (393px)
- [ ] Samsung Galaxy S23 (360px)
- [ ] iPad Mini (768px) — breakpoint md
- [ ] iPad Pro (1024px) — breakpoint lg

### Ferramentas
```bash
# Lighthouse mobile
npx lighthouse https://portfolio-lucas-batista-murex.vercel.app 
  --preset=desktop --formFactor=mobile --screenEmulation.mobile

# Chrome DevTools
# 1. Toggle device toolbar
# 2. Selecionar "iPhone SE"
# 3. Verificar touch targets (Settings > Show touch size rulers)

# WebPageTest
# URL: webpagetest.org
# Config: Mobile 4G, Motorola G7, Chrome
```

---

## 6. Meta: Lighthouse Mobile 100

Para subir de 96 para 100, focar em:

| Metrica | Valor Atual | Meta | Acao |
|---------|:-----------:|:----:|------|
| Performance | 96 | 100 | Verificar LCP e INP |
| LCP | ? | < 2.5s | Otimizar imagem hero |
| TBT | ? | < 200ms | Verificar JS long tasks |
| CLS | ? | < 0.1 | Fixar dimensoes de SVG/fonts |

---

*Atualizar quando novos componentes forem adicionados ou quando o score mudar.*
