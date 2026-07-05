# Design — Portfólio Lucas Batista

> Documento vivo de decisões visuais e de layout. Fonte da verdade do design; atualizar quando as decisões mudarem.
> Referências: `README.md`, `.cursorrules`, `data/content.ts`

---

## 1. Estrutura da One-Page

Ordem vertical das seções (IDs para navegação):

| # | Seção | ID | Propósito |
|---|--------|-----|-----------|
| 1 | Header | — | Nav fixo, logo, links, CTA principal |
| 2 | Hero | — | Proposta de valor em 30s + card de provas |
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
| Background | `#f8fafc` | Fundo da página |
| Foreground | `#0f172a` | Texto principal |
| Muted | `#64748b` | Subtítulos, legendas |
| Border | `#e2e8f0` | Bordas de cards |
| Card | `#ffffff` | Cards, modais |

### Tipografia

- **Headings:** Inter (Google Fonts), bold, `tracking-tight`
- **Body:** Geist Sans (Next.js default), normal
- **Escala:** Hero `text-4xl md:text-6xl`, seções `text-3xl`, cards `text-xl`, body `text-base`

### Espaçamento

- Seções: `py-20`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Cards: `p-6`, grid `gap-6`

---

## 3. Layout Responsivo

Mobile-first. Breakpoints Tailwind padrão:

| Breakpoint | Grid Dores | Grid Cases | Nav |
|------------|------------|------------|-----|
| `< md` | 1 coluna | 1 coluna | Sheet (hamburger) |
| `md` | 2 colunas | 2 colunas | Links visíveis |
| `lg` | 4 colunas | 3 colunas | Links + CTA |

Hero: botões empilham (`flex-col`) em mobile, lado a lado em `sm+`.

---

## 4. Componentes Reutilizáveis

| Componente | Responsabilidade |
|------------|------------------|
| `SectionHeader` | Título + subtítulo de seção, alinhamento configurável |
| `PainPointCard` | Card de dor com ícone Lucide + badge numérico |
| `ServiceCard` | Card de serviço com borda lateral colorida + entregas |
| `CaseCard` | Card de case: ícone, prioridade, pergunta de negócio (destaque), métrica, tags, botões demo/código |
| `DemoModal` | Dialog shadcn: contexto de negócio + iframe Streamlit (`?embed=true`) + link "Abrir em nova aba" |
| `Header` | Nav fixo, scroll suave, menu mobile (Sheet) |
| `Footer` | Copyright, links sociais, declaração ética |

Seções de página: `Hero` (com card de provas), `Dores`, `Servicos`, `Cases` (grid de demonstráveis + lista de roadmap), `Metodo`, `Sobre`, `IASection`, `Contato`.

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

| Elemento | Animação | Parâmetros |
|----------|----------|------------|
| Seções | fade-in + slide-up | `opacity 0→1`, `y 20→0`, `duration 0.5s` |
| Cards em grid | stagger | `0.1s` entre filhos |
| Hover cards | scale + shadow | `scale-[1.02]`, `shadow-md`, `transition 0.2s` |
| Hero | stagger children | badge → título → subtítulo → CTAs |

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

- Componente: `DemoModal` (shadcn Dialog), recebe o `Case` selecionado
- Header: título + link **"Abrir em nova aba"** (URL sem `?embed=true`)
- Topo: contexto de negócio (pergunta, decisão apoiada, métrica principal, limitação)
- Abaixo: iframe `{demoUrl}?embed=true`
- Desktop: iframe `height: 700px` · Mobile: `height: 500px`
- Container: `max-h-[90vh] overflow-y-auto` (contexto + iframe cabem na viewport)
- Fechar: X do Dialog ou clique fora

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
