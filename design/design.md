# Design — Executive Proof System

> Fonte da verdade visual do portfólio Lucas Batista. Esta versão substitui a leitura comercial antiga por uma peça premium para headhunters, recrutadores e lideranças que avaliam fit profissional.
>
> **Fluxo de design:** spec em Markdown + tokens CSS (`app/globals.css`) + paridade Streamlit (`demos-logistica/lib/brand.py`). **Figma não faz parte do fluxo** — alterações visuais entram pelo código e por este documento.

---

## 1. Norte

O site deve funcionar como um dossiê profissional de leitura rápida. Em até 60 segundos, a pessoa recrutadora precisa entender:

- quem é Lucas Batista;
- para quais posições o perfil faz sentido;
- quais sinais de senioridade existem;
- quais provas técnicas estão disponíveis;
- qual stack e quais domínios operacionais aparecem no trabalho;
- como entrar em contato.

Não é uma landing de consultoria, não é currículo comum e não é vitrine genérica de apps. Os cases são evidência de julgamento profissional.

---

## 2. Estrutura da One-Page

| Ordem | Seção | ID | Função |
|---|---|---|---|
| 1 | Header | — | Navegação curta e CTA de contato |
| 2 | Hero executivo | — | Nome, posicionamento, CTAs e painel de stack/empresas |
| 3 | Provas rápidas | — | 3 métricas de impacto (`EvidenceStrip`) |
| 4 | Perfil em 60s | `perfil` | Fit, senioridade, diferenciais e domínios |
| 5 | Provas técnicas | `cases` | 3 âncora + biblioteca filtrável + roadmap |
| 6 | Trajetória | `trajetoria` | Experiência, formação, certificações, idiomas |
| 7 | Contato profissional | `contato` | LinkedIn, email, GitHub e CV PDF |
| 8 | Footer | — | Links, declaração e retorno ao topo |

**Mapeamento componentes React:**

| Seção | Componente |
|-------|------------|
| Header | `Header` |
| Hero | `ExecutiveHero` |
| Provas rápidas | `EvidenceStrip` |
| Perfil em 60s | `ProfileBrief` (`#perfil`) |
| Provas técnicas | `SignatureCases` (`#cases`) — inclui `CaseLibrary` + roadmap |
| Trajetória | `TrajectoryBoard` (`#trajetoria`) |
| Contato | `ContactPanel` (`#contato`) |
| Footer | `Footer` |

Ordem em `HomePage.tsx`: Header → ExecutiveHero → EvidenceStrip → ProfileBrief → SignatureCases → TrajectoryBoard → ContactPanel → Footer (DOM = nav = esta tabela).

Arquitetura detalhada: [`docs/ARQUITETURA.md`](../docs/ARQUITETURA.md).

---

## 3. Direção Visual

### Paleta

| Token | Hex | Uso |
|---|---:|---|
| Editorial | `#f5f2ed` | Fundo principal — bege neutro refinado |
| Card | `#ffffff` | Blocos claros e áreas de leitura |
| Ink | `#07111f` | Texto forte, CTA principal |
| Primary | `#153451` | Azul petróleo técnico |
| Surface dark | `#07111f` | Blocos premium escuros |
| Accent | `#16a99c` | Sinal técnico mínimo |
| Warm accent | `#c9983f` | Acento editorial decorativo (bordas, fundos escuros) |
| Warm accent contrast | `#7a5a1a` | Eyebrows e labels dourados em fundos claros (≥ 4.5:1) |
| Muted foreground | `#556070` | Texto secundário |
| Border | `#c8c2b8` | Divisórias |

Resumo vivo: [`design/tokens.md`](tokens.md). Runtime: `app/globals.css`.

### Tipografia

- **Headings:** Source Serif 4 via `next/font/google` (`--font-source-serif` → `font-heading`).
- **Body:** Inter via `next/font/google` (`--font-inter` → `font-sans`).
- Corpo mínimo: `text-sm` (14px) para metadados; `text-base` (16px) para leitura principal.
- A combinação serif/sans cria contraste editorial e autoridade sem perder legibilidade.

### Princípios

- Tipografia e hierarquia mandam mais que decoração.
- **CTA sólido:** `ink` (`#07111f`) — variant `executive` em `button.tsx`; não usar `primary` para botões de ação principal.
- Espaçamentos controlados (`py-18 lg:py-28`); blocos densos onde ajudam a triagem; nenhuma lacuna visual sem função.
- Poucos ícones; ícone só quando melhora reconhecimento.
- Motion discreto: entrada por translação sutil (conteúdo permanece visível), sem competir com leitura.
- Glassmorphism real com backdrop-blur-xl, gradientes sutis e elevação hierárquica para criar dimensão.
- Ambient orbs flutuantes com animate-float para profundidade no hero.
- Shine effect em CTAs primários para hierarquia visual.
- Custom scrollbar e selection brandada para polish final.
- Conteúdo essencial não pode começar invisível por dependência de scroll/JS. Animações usam `opacity: 1` no estado inicial; o movimento vem de `y`/`scale`.

---

## 4. Componentes-Chave

| Componente | Responsabilidade |
|---|---|
| `ExecutiveHero` | Briefing executivo: nome, posicionamento, CTAs, stack e empresas |
| `EvidenceStrip` | Faixa de **3** métricas principais |
| `ProfileBrief` | Fit profissional em 60s (`#perfil`) — sem FAQ |
| `TrajectoryBoard` | Experiência, formação, certificações e idiomas (`#trajetoria`) |
| `SignatureCases` | 3 cases âncora compactos + thumbnails reais + CTAs específicos |
| `CaseLibrary` | Biblioteca complementar (tabela ≥1024px / cards <1024px); filtros só com count > 0 |
| `CaseThumbnail` | WebP real (`public/cases/`) ou SVG fallback |
| `CaseDemoLauncher` | CTA específico + lazy load do `DemoModal` |
| `DemoModal` | Contexto completo + preview progressivo + iframe Streamlit |
| `ContactPanel` | Canais profissionais diretos |
| `Header` / `Footer` | Navegação e links |
| `PremiumCard` / `MetricPill` / `EditorialBadge` / `SectionShell` | Blocos de UI reutilizáveis |

**Shelved (não montar):** `FadeIn`, `Stagger`, `GlassCard` → `components/archive/ui/`. Cockpit → `components/archive/legacy/`.

Todo copy vem de `data/content.ts`. CTAs de demo usam `ctaDemoLabel` + `aria-label` específico (`caseDemoCta`).

---

## 5. Cases Como Prova

Os cases devem responder: que problema Lucas entendeu, qual decisão apoiou, qual métrica usou, qual stack aparece e qual limitação foi declarada.

Cases âncora:

1. `01-precificacao-frete` — frete e custo.
2. `02-torre-controle` — SLA, OTD e follow-up.
3. `08-cvrp-urbano` — roteirização, frota e distância.

Demais cases continuam acessíveis na biblioteca complementar. O modal preserva `?embed=true`, link de nova aba e lazy loading mobile.

---

## 6. Demos Streamlit

As demos não podem parecer outro produto visual. Elas são a camada interativa do mesmo dossiê profissional e devem sustentar a leitura headhunter-first.

### Direção

- Home das demos como índice de provas técnicas, não catálogo genérico.
- Hero escuro editorial com pergunta de negócio, stack, maturidade e métricas compactas.
- Sidebar desktop curada, com agrupamento por cases âncora, biblioteca e método; a navegação automática padrão do Streamlit não deve aparecer.
- Tabs em estilo controle segmentado editorial, não underline padrão cru.
- Cards claros com borda editorial e acentos mínimos em teal ou warm accent.
- Charts Plotly com fundo alinhado ao editorial, grid discreto, hover escuro e legenda contida.
- Linhas de referência em gráficos devem usar o mesmo recorte analítico exibido; não podem distorcer escala a ponto de achatar as séries principais.
- Todos os gráficos Plotly passam por acabamento final compartilhado (`ui.plot`/`viz.polish`) para manter margem, fundo, hover e eixo consistentes.
- Mapas Folium com tiles neutros, círculos e rotas sem excesso de ícones decorativos.
- Embed compacto para modal da landing: altura controlada, sem UI poluída e com contexto visível.
- No embed, a sidebar Streamlit deve sumir e os filtros usam defaults ocultos; o case study deve começar por breadcrumb, pergunta, KPI e contexto. Ajuste fino de filtros pertence à demo em página completa/nova aba.

### Alturas e Densidade

| Elemento | Desktop | Embed |
|---|---:|---:|
| Chart meia coluna | `340px` | `320px` |
| Chart full width | `430px` | `360px` |
| Mapa full width | `460px` | `330px` |
| Container principal | `1180px` máx. | largura disponível |

### Critérios

- Cada demo precisa deixar visível: problema, abordagem, stack, trade-off, métrica e limite.
- KPIs e gráficos devem apoiar decisão, não decorar a tela.
- Tabelas precisam ter formatação de moeda, percentual, score e status quando aplicável.
- Links de contato nas demos devem ser profissionais: LinkedIn, email, GitHub ou CV.
- Não usar CTA de venda consultiva como centro da experiência.

---

## 7. Critérios de Qualidade

- Primeira dobra comunica perfil para headhunter sem depender de rolagem longa.
- CTA de LinkedIn/email fica claro.
- 3 provas técnicas aparecem cedo.
- Biblioteca não parece coleção de clones; deve apoiar repertório.
- Contraste AA em fundos claros e escuros.
- Demos Streamlit preservam a mesma paleta, densidade e linguagem da landing.
- Performance continua como sinal profissional: build limpo e Lighthouse ≥90.
- Mobile precisa ser escaneável para triagem via LinkedIn.
- Animações não escondem conteúdo essencial: estado inicial `opacity: 1`.
- Selection brandada com cor primary e texto branco.
- Custom scrollbar sutil com thumb cinza quente.
- Ambient orbs flutuantes no hero para dimensão visual.
- Hover states premium: elevação + shadow + border accent.

---

## 8. Referências

- `KpG782/3D_Portfolio` — conceito estrutural forte e cases como traces com trade-offs.
- `fuaadabdullah/fuaad-portfolio` — apresentação employer-ready, resume e case studies.
- `M-F-Tushar/My-Portfolio` — orientação explícita para recrutador entender direção, provas, links e contato.
- `mohabbis/personal-portfolio` — estética editorial, neutros quentes, tipografia forte e mínimo chrome.
- SitesPlaced / Portfolio Studio — princípios de recrutamento: projetos cedo, resultados, links funcionais, stack tags e performance.
- Tendências 2025: glassmorphism, Bento layouts, oversized serif typography, subtle scroll reveals.

---

*Documento vivo. Atualize quando a direção de carreira, paleta, tipografia ou estrutura principal mudar.*
