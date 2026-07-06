# Design — Portfólio Lucas Batista

> Documento vivo de decisões visuais e de layout. Fonte da verdade do design; atualizar quando as decisões mudarem.
> Referências: `README.md`, `.cursorrules`, `data/content.ts`

---

## 1. Estrutura da One-Page

Ordem vertical das seções (IDs para navegação):

| # | Seção | ID | Propósito |
|---|--------|-----|-----------|
| 1 | Header | — | Nav fixo, logo, links, CTA principal |
| 2 | Hero | — | Proposta de valor em 30s + brief strip (stats + contato) |
| 3 | Dores | `dores` | 8 cards — problemas que o visitante reconhece |
| 4 | Serviços | `servicos` | Escada de 5 níveis de contratação |
| 5 | Cases | `cases` | Grid de **10 cases demonstráveis** + filtro por categoria + lista "Próximas análises" |
| 6 | Método | `metodo` | 5 passos do processo de trabalho |
| 7 | Sobre | `sobre` | Quem é o Lucas: bio + ferramentas |
| 8 | IA | `ia` | IA como acelerador, limites éticos |
| 9 | Contato | `contato` | Formulário + CTA de diagnóstico |
| 10 | Footer | — | Links, copyright, declaração ética |

---

## 2. Decisões Visuais

### Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| Primary | `#1e3a5f` | Headings, botões primários, nav |
| Accent | `#0d9488` | Badges, hover, destaques |
| Accent contrast | `#0a7369` | Textos pequenos sobre fundo claro (WCAG AA) |
| Ring | `#0d9488` | Foco acessível |
| Background | `#f8fafc` | Fundo da página |
| Foreground | `#0f172a` | Texto principal |
| Muted | `#64748b` | Subtítulos, legendas |
| Border | `#e2e8f0` | Bordas de cards |
| Card | `#ffffff` | Cards, modais |

### Tokens de seção escura (`DarkSection`)

Faixas escuras (Hero, Método, IA) usam tokens únicos em vez de gradientes hardcoded. Definidos em `globals.css` e consumidos pelo componente `DarkSection`.

| Token | Hex | Uso |
|-------|-----|-----|
| `--surface-dark` | `#122845` | Fundo base das faixas escuras |
| `--surface-dark-2` | `#16304f` | Topo do gradiente navy |
| `--surface-dark-3` | `#0f2038` | Base do gradiente navy |
| `--text-on-dark` | `#ffffff` | Texto principal sobre navy |
| `--text-on-dark-muted` | `#cbd5e1` | Texto secundário sobre navy |

O gradiente radial (glow teal + navy) e a grade sutil ficam encapsulados em `DarkSection`, com prop `glow` para variar a origem do brilho por seção. Espelhados na coleção `Tokens` do Figma v2 (`color/surface-dark*`, `color/text-on-dark*`).

### Paridade landing ↔ Streamlit

| Elemento | Landing (`globals.css`) | Streamlit (`lib/brand.py` + `ui.py`) |
|----------|-------------------------|--------------------------------------|
| Primary | `#1e3a5f` / `--color-primary` | `PRIMARY` / `config.toml` primaryColor |
| Accent | `#0d9488` / `--color-accent` | `ACCENT` |
| Background | `#f8fafc` | `BG` |
| Card | `#ffffff` | `CARD` |
| Muted | `#64748b` | `MUTED` |
| Border | `#e2e8f0` | `BORDER` |
| Surface dark | `--surface-dark*` | Hero navy via CSS injetado |
| Fonte headings | Inter (Google Fonts) | Inter via `@import` no CSS |
| Radius cards | `rounded-xl` (12px) | `RADIUS = "12px"` |
| KPI row embed | — | `kpi_grid()` 2×2 quando `?embed=true` |
| Filtros embed | — | `filter_container()` expander no topo |

**Figma v2 (spec base):** [Portfolio Lucas — Design System v2](https://www.figma.com/design/857tvb7je0mJctJWYujqG7) — coleção `Tokens` + nodes `2:31`, `2:38`, `3:15`.

**Pass editorial v3:** spec de frames em `design/figma-v3-editorial-frames.md` · referências em `design/references-editorial.md`.

**FigJam (jornadas):** [Headhunter 60s](https://www.figma.com/board/oo6IohJkFVx2jYnenXMlC5) · [Embed demo](https://www.figma.com/board/iOesutJfRKn3HxB4Mm5lc3).

### Tipografia

- **Headings:** Inter (Google Fonts), bold, `tracking-tight`
- **Body:** Geist Sans (Next.js default), normal
- **Escala editorial** (`globals.css` utilities): `.text-display` (hero), `.text-lede` (subheadline), `.text-eyebrow` (11px uppercase)
- **Larguras de coluna:** `--prose-width` (42rem narrativa), `--brief-width` (22rem brief strip)

### Tokens editoriais (pass v3)

| Token / utility | Valor | Uso |
|-----------------|-------|-----|
| `--prose-width` | 42rem | Coluna narrativa (hero, SectionLead) |
| `--brief-width` | 22rem | Brief strip stats/contato |
| `.text-display` | clamp(2.25rem → 3.75rem) | Headline hero |
| `.text-lede` | 1.125rem / 1.6 | Subheadline |
| `.text-eyebrow` | 11px / 0.06em tracking | Categoria, labels de modal |

### Escala legado (seções não refatoradas)

- Hero display via `.text-display`; seções `text-3xl`, cards `text-xl`, body `text-base`

### Espaçamento

- Seções: `py-20`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Cards: `p-6`, grid `gap-6` (roadmap `p-5 gap-5`)

---

## 3. Layout Responsivo

Mobile-first. Breakpoints Tailwind padrão:

| Breakpoint | Grid Dores | Cases (destaques) | Cases (biblioteca) | Nav |
|------------|------------|-------------------|--------------------|-----|
| `< md` | 1 coluna | 1 coluna (stack) | lista vertical | Sheet |
| `md` | 2 colunas | 1 coluna | lista vertical | Links visíveis |
| `lg` | 4 colunas | **assimétrico** (1 featured + 2 compact) | lista + tabs underline | Links + CTA |

Hero: **2 colunas** em `lg+` (narrativa + brief strip); mobile stack nome → headline → stats → CTAs → contato. Sem grade decorativa no hero editorial.

---

## 4. Componentes Reutilizáveis

### Camada editorial (`components/editorial/`)

| Componente | Responsabilidade |
|------------|------------------|
| `EditorialHero` | Hero 2 colunas: lede + display headline + CTAs; `BriefStrip` stats/contato |
| `BriefStrip` | Stats + LinkedIn/email (sidebar desktop, inline mobile) |
| `SectionLead` | Cabeçalho editorial sem risquinho teal repetido |
| `BriefingCaseCard` | Card briefing executivo (eyebrow, pull quote métrica, rule + pergunta, CTA) |
| `CaseBriefingGrid` | Destaques assimétricos: 1 featured + 2 compact |
| `CaseLibraryRow` | Linha da biblioteca filtrável |
| `CategoryTabs` | Filtros underline (não pills) |
| `DemoBriefingModal` | Modal 2 colunas pergunta/decisão + métrica tipográfica + iframe |

Wrappers de compatibilidade: `Hero` → `EditorialHero`; `DemoModal` → `DemoBriefingModal`; `CaseCard` → `BriefingCaseCard` (deprecated).

### Demais moléculas

| Componente | Responsabilidade |
|------------|------------------|
| `SectionHeader` | Título + subtítulo (seções ainda não migradas) |
| `PainPointCard` | Card de dor com ícone Lucide + badge numérico |
| `ServiceCard` | Card de serviço com borda lateral colorida + entregas |
| `Header` | Nav fixo, scroll suave, menu mobile (Sheet) |
| `Footer` | Copyright, links sociais, declaração ética |

Seções: `Hero` (editorial), `Dores`, `Servicos`, `Cases` (destaques assimétricos + biblioteca lista + roadmap), `Metodo`, `Sobre`, `IASection`, `Contato`.

Distinção de cases: um case é "demonstrável" quando tem slug em `CASE_DEMO_SLUGS` (`data/content.ts`). Os demais aparecem na lista compacta "Próximas análises" — sem botões desabilitados.

---

## 5. Navegação

### Links do Header

Dores → `#dores` | Serviços → `#servicos` | Cases → `#cases` | Método → `#metodo` | Sobre → `#sobre` | Contato → `#contato`

CTA fixo: **"Falar sobre minha operação"** → scroll para `#contato`

### Comportamento

- `scroll-behavior: smooth` em `globals.css`
- Clique no link: `scrollIntoView({ behavior: 'smooth' })`
- Intersection Observer para destacar seção ativa no menu
- Mobile: Sheet fecha ao clicar em link

---

## 6. Animações (Framer Motion)

| Elemento | Animação | Notas |
|----------|----------|-------|
| Hero editorial | estático | Sem stagger Framer; reduz custo e monotonia |
| Seções legado | fade-in + slide-up | `Dores`, `Servicos` etc. |
| Cards legado | hover scale + shadow | Editorial cards **sem** scale hover |
| Filtro cases | instantâneo | Lista editorial sem AnimatePresence |

`prefers-reduced-motion` é respeitado globalmente via `<MotionConfig reducedMotion="user">` em `HomePage`.

---

## 7. Asset Manifest

| Tipo | Fonte | Notas |
|------|-------|-------|
| Ícones | Lucide React | Truck, BarChart3, MapPin, etc. |
| Imagens | Nenhuma no MVP | Bloco de provas no Hero (sem stock photo) |
| OG Image | `public/og-image.png` | Gerado (1200×630) |
| Favicon | `app/icon.png` | Ícone via convenção do App Router |

---

## 8. Formulário de Contato

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome | text | Sim |
| Email | email | Sim |
| Empresa | text | Não |
| Principal dor/desafio | textarea | Não |

- Validação HTML5 (`required`, `type="email"`)
- Submit: POST para Formspree quando `NEXT_PUBLIC_FORMSPREE_FORM_ID` existe
- Fallback sem Formspree: abre `mailto` pré-preenchido (o lead não se perde)
- CTA: **"Solicitar leitura inicial"**

---

## 9. Modal de Demo (Streamlit)

- Componente: `DemoBriefingModal` (exportado como `DemoModal`)
- Header: título + link **"Abrir em nova aba"** (URL sem `?embed=true`)
- Contexto: faixa **2 colunas** (pergunta | decisão) + métrica em destaque tipográfico + tags inline + limitação footnote
- Mobile: contexto colapsável (`details`); iframe **sob demanda** (botão "Carregar demo aqui")
- Iframe: `{demoUrl}?embed=true` — desktop 700px, mobile até 500px
- Sem grid 2×2 de labels no topo (padrão banido no pass editorial)

### Demos Streamlit (UX interno)

- Marca alinhada: primary `#1e3a5f`, accent `#0d9488`
- `lib/ui.py`: `hero`, `section`, `plot`, `sidebar_brand`
- `.streamlit/config.toml`: `toolbarMode = "minimal"` para embed limpo
- Home: mapa herói + cards navegáveis (Profundas / Pontuais)

---

## 10. Princípios de Design

1. **Clareza comercial** — visitante entende problema, oferta e próximo passo em 30s
2. **Confiança** — paleta sóbria, sem stock photos, declaração ética visível
3. **Prova técnica** — cases com demo interativa, não só texto
4. **Mobile-first** — maioria do tráfego B2B vem de LinkedIn no celular
5. **Sem ruído** — animações sutis, uma CTA principal por viewport

---

*Design document — documento vivo. Atualizar quando decisões visuais mudarem.*
