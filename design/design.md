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
| Hero | `Hero` |
| Perfil em 60s | `ProfileSection` (`#perfil`) |
| Provas técnicas | `Cases` (`#cases`) |
| Trajetória e stack | `TrajectorySection` (`#trajetoria`) |
| Contato | `Contato` (`#contato`) |
| Footer | `Footer` |

Ordem em `HomePage.tsx`: Perfil → Cases → Trajetória (DOM = nav = esta tabela).

Seções antigas de venda direta (`Dores`, `Servicos`, `Metodo`, `IASection`) não comandam mais a homepage — ver `components/archive/consultoria/` e `data/archive/content-consultoria.ts`.

---

## 3. Direção Visual

### Paleta

| Token | Hex | Uso |
|---|---:|---|
| Editorial | `#f6f1e8` | Fundo principal, tom de publicação premium |
| Card | `#fffdf8` | Blocos claros e áreas de leitura |
| Ink | `#111827` | Texto forte, CTA principal, contraste |
| Primary | `#17324d` | Azul petróleo técnico |
| Surface dark | `#102033` | Blocos premium escuros |
| Accent | `#0f766e` | Sinal técnico mínimo |
| Warm accent | `#9a6a2f` | Eyebrows e acento editorial |
| Muted | `#4b5563` | Texto secundário |
| Border | `#d8cfbf` | Divisórias editoriais |

### Princípios

- Tipografia e hierarquia mandam mais que decoração.
- **Headings:** Inter via `next/font` (`--font-inter` → `font-heading`). Body: system stack (`font-sans`).
- **CTA sólido:** `ink` (`#111827`) — variant `executive` em `button.tsx`; não usar `primary` para botões de ação principal.
- **Tipografia de seção:** utilitários `.eyebrow`, `.section-title`, `.section-lead` em `globals.css`; preferir `SectionHeader`.
- Whitespace generoso, blocos densos só onde ajudam a triagem.
- Poucos ícones; ícone só quando melhora reconhecimento.
- Sem grid homogêneo de cards como linguagem dominante.
- Sem gradientes chamativos, orbs ou estética SaaS genérica.
- Motion discreto: entrada por opacidade/translação, sem competir com leitura.
- Conteúdo essencial não pode começar invisível por dependência de scroll/JS. Animação é aceitável só quando o conteúdo continua presente em screenshot, crawler e fallback sem interação.

---

## 4. Componentes-Chave

| Componente | Responsabilidade |
|---|---|
| `Hero` | Briefing executivo com nome, posicionamento, provas e contato rápido |
| `ProfileSection` | Fit profissional em 60s (`#perfil`) |
| `TrajectorySection` | Senioridade, stack e domínios (`#trajetoria`) |
| `Cases` | Provas técnicas: 3 cases âncora + biblioteca filtrável |
| `CaseCard` | Mini case study: categoria, métrica, pergunta, decisão e links |
| `DemoModal` | Contexto de case study + iframe Streamlit preservado |
| `SectionHeader` | Eyebrow + título + lead reutilizável (light/dark) |
| `EditorialDarkPanel` | Painel escuro com borda glass editorial |
| `Contato` | Canais profissionais diretos, sem formulário como foco |
| `Header` / `Footer` | Navegação curta, consistência e links |

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

---

## 8. Referências

- `KpG782/3D_Portfolio` — conceito estrutural forte e cases como traces com trade-offs.
- `fuaadabdullah/fuaad-portfolio` — apresentação employer-ready, resume e case studies.
- `M-F-Tushar/My-Portfolio` — orientação explícita para recrutador entender direção, provas, links e contato.
- `mohabbis/personal-portfolio` — estética editorial, neutros quentes, tipografia forte e mínimo chrome.
- SitesPlaced / Portfolio Studio — princípios de recrutamento: projetos cedo, resultados, links funcionais, stack tags e performance.

---

*Documento vivo. Atualize quando a direção de carreira, paleta ou estrutura principal mudar.*
