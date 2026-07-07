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
| 2 | Hero executivo | — | Nome, posicionamento, fit e provas rápidas |
| 3 | Perfil em 60s | `perfil` | Leitura de fit, senioridade, modelo de atuação e sinais |
| 4 | Provas técnicas | `cases` | 3 cases âncora + biblioteca complementar |
| 5 | Trajetória e stack | `trajetoria` | Experiência, stack por contribuição e domínios |
| 6 | Contato profissional | `contato` | LinkedIn, email, GitHub e CV quando existir |
| 7 | Footer | — | Links, declaração de uso e retorno ao topo |

**Mapeamento componentes React:**

| Seção | Componente |
|-------|------------|
| Header | `Header` |
| Hero | `ExecutiveHero` |
| Perfil em 60s | `ProfileBrief` (`#perfil`) |
| Provas técnicas | `SignatureCases` (`#cases`) |
| Trajetória e stack | `TrajectoryBoard` (`#trajetoria`) |
| Contato | `ContactPanel` (`#contato`) |
| Footer | `Footer` |

Ordem em `HomePage.tsx`: Hero → EvidenceStrip → Perfil → Cases → Trajetória → Contato → Footer (DOM = nav = esta tabela).

---

## 3. Direção Visual

### Paleta

| Token | Hex | Uso |
|---|---:|---|
| Editorial | `#f7f4ec` | Fundo principal, tom de publicação premium |
| Card | `#ffffff` | Blocos claros e áreas de leitura |
| Ink | `#07111f` | Texto forte, CTA principal, contraste |
| Primary | `#153451` | Azul petróleo técnico |
| Surface dark | `#07111f` | Blocos premium escuros |
| Accent | `#16a99c` | Sinal técnico mínimo |
| Warm accent | `#d4a853` | Eyebrows e acento editorial |
| Muted | `#667085` | Texto secundário |
| Border | `#d7cebd` | Divisórias editoriais |

### Tipografia

- **Headings:** Playfair Display via `next/font/google` (`--font-playfair` → `font-heading`).
- **Body:** Inter via `next/font/google` (`--font-inter` → `font-sans`).
- A combinação serif/sans cria contraste editorial e autoridade sem perder legibilidade.

### Princípios

- Tipografia e hierarquia mandam mais que decoração.
- **CTA sólido:** `ink` (`#07111f`) — variant `executive` em `button.tsx`; não usar `primary` para botões de ação principal.
- Whitespace generoso, blocos densos só onde ajudam a triagem.
- Poucos ícones; ícone só quando melhora reconhecimento.
- Motion discreto: entrada por translação sutil (conteúdo permanece visível), sem competir com leitura.
- Glassmorphism, gradientes sutis e elevação hierárquica para criar dimensão.
- Conteúdo essencial não pode começar invisível por dependência de scroll/JS. Animações usam `opacity: 1` no estado inicial; o movimento vem de `y`/`scale`.

---

## 4. Componentes-Chave

| Componente | Responsabilidade |
|---|---|
| `ExecutiveHero` | Briefing executivo com nome em Playfair, posicionamento, provas, CTAs e cockpit visual |
| `EvidenceStrip` | Faixa de métricas principais com ícones e divisórias |
| `ProfileBrief` | Fit profissional em 60s (`#perfil`) |
| `TrajectoryBoard` | Senioridade, stack e domínios (`#trajetoria`) |
| `SignatureCases` | Provas técnicas: 3 cases âncora em grid + biblioteca filtrável |
| `CaseLibraryDesktop` | Biblioteca complementar em tabela premium com filtros |
| `CaseDemoLauncher` | Botão de demo + lazy loading do `DemoModal` |
| `DemoModal` | Contexto de case study + iframe Streamlit preservado |
| `ContactPanel` | Canais profissionais diretos em painel glass escuro |
| `Header` / `Footer` | Navegação curta, consistência e links |
| `FadeIn` / `Stagger` | Wrappers reutilizáveis de motion |
| `PremiumCard` / `GlassCard` / `MetricPill` | Blocos de UI premium reutilizáveis |

Todo copy deve vir de `data/content.ts`. Componentes não devem hardcodar narrativa de carreira, rótulos de CTA ou textos comerciais.

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
