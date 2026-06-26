# Design — Portfólio Lucas Batista

> Documento de design da Fase 0. Fonte de decisões visuais antes da implementação dos componentes.
> Referências: `docs/VISION.md`, `docs/ARCHITECTURE.md`, `.cursorrules`

---

## 1. Estrutura da One-Page

Ordem vertical das seções (IDs para navegação):

| # | Seção | ID | Propósito |
|---|--------|-----|-----------|
| 1 | Header | — | Nav fixo, logo, links, CTA principal |
| 2 | Hero | — | Proposta de valor em 30 segundos |
| 3 | Dores | `dores` | 8 cards — problemas que o visitante reconhece |
| 4 | Serviços | `servicos` | Escada de 5 níveis de contratação |
| 5 | Cases | `cases` | Grid de cases demonstráveis + filtro |
| 6 | Método | `metodo` | 5 passos do processo de trabalho |
| 7 | IA | `ia` | IA como acelerador, limites éticos |
| 8 | Contato | `contato` | Formulário + CTA de diagnóstico |
| 9 | Footer | — | Links, copyright, declaração ética |

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
| `CaseCard` | Card de case com tags, prioridade, botão demo |
| `DemoModal` | Dialog shadcn com iframe Streamlit (`?embed=true`) |
| `Header` | Nav fixo, scroll suave, menu mobile (Sheet) |
| `Footer` | Copyright, links sociais, declaração ética |

Seções de página (Fase 1): `Hero`, `Dores`, `Servicos`, `Cases`, `Metodo`, `IASection`, `Contato`.

---

## 5. Navegação

### Links do Header

Dores → `#dores` | Serviços → `#servicos` | Cases → `#cases` | Método → `#metodo` | Contato → `#contato`

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

Respeitar `prefers-reduced-motion` quando possível.

---

## 7. Asset Manifest

| Tipo | Fonte | Notas |
|------|-------|-------|
| Ícones | Lucide React | Truck, BarChart3, MapPin, etc. |
| Imagens | Nenhuma no MVP | SVG decorativo no Hero (mini KPI bars) |
| OG Image | `public/og-image.png` | ✅ Criado |
| Favicon | `app/icon.png` + `public/favicon.ico` | ✅ Criado |
| Favicon | `public/favicon.ico` | Fase 4 |

---

## 8. Formulário de Contato

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome | text | Sim |
| Email | email | Sim |
| Empresa | text | Não |
| Principal dor/desafio | textarea | Não |

- Validação HTML5 (`required`, `type="email"`)
- Submit MVP: `console.log` + mensagem de sucesso
- Integração Firebase/Formspree: Fase 4
- CTA: **"Solicitar leitura inicial"**

---

## 9. Modal de Demo (Streamlit)

- Componente: `DemoModal` (shadcn Dialog)
- URL: `{demoUrl}?embed=true`
- Desktop: iframe `height: 700px`
- Mobile: `height: 500px` ou link "Abrir em nova aba"
- Estilo: `width 100%`, `border none`, `border-radius 12px`
- Fechar: X do Dialog ou clique fora

---

## 10. Princípios de Design

1. **Clareza comercial** — visitante entende problema, oferta e próximo passo em 30s
2. **Confiança** — paleta sóbria, sem stock photos, declaração ética visível
3. **Prova técnica** — cases com demo interativa, não só texto
4. **Mobile-first** — maioria do tráfego B2B vem de LinkedIn no celular
5. **Sem ruído** — animações sutis, uma CTA principal por viewport

---

*Design document — Fase 0. Atualizar quando decisões visuais mudarem.*
