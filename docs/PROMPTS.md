# PROMPTS.md — Prompts de Vibecoding para o Cursor

> **Uso:** Copie e cole os prompts abaixo no Cursor (Kimi Code) para executar cada fase. O Cursor lê automaticamente o `.cursorrules` na raiz do projeto. Os textos completos estão em `docs/CONTENT.md`.
>
> **Referência cruzada:** Para visão estratégica, veja [VISION.md](VISION.md). Para arquitetura técnica, veja [ARCHITECTURE.md](ARCHITECTURE.md). Para conteúdo, veja [CONTENT.md](CONTENT.md). Para o roteiro, veja [ROADMAP.md](ROADMAP.md).
>
> **⚠️ Tempo realista:** Cada prompt leva 10-20 min para gerar + testar + ajustar. O total é ~60-80h de vibecoding, não 4-5h.

---

## Tabela de Prompts por Fase

| Fase | Prompt | O Que Gera | Tempo Estimado (realista) |
|---|---|---|---|
| **0.1** | Design do site | Design.md com decisões visuais, layout, seções, componentes | 30 min |
| **0.2** | Fork e setup do template | Template Next.js na pasta, instalação de deps, shadcn init | 20 min |
| **1.1** | Dados de conteúdo | Arquivo `data/content.ts` com todos os textos | 15 min |
| **1.2** | Componentes base | 7 componentes reutilizáveis tipados | 30 min |
| **1.3** | Layout e metadata | `layout.tsx` com metadata, fontes, providers, `globals.css` | 20 min |
| **2.1** | Seção Hero | Hero completo com animações | 20 min |
| **2.2** | Seção Dores | Grid de 8 cards com animações | 20 min |
| **2.3** | Seção Serviços | 5 níveis com conector visual | 25 min |
| **2.4** | Seção Cases | Grid com filtro e modal de demo | 35 min |
| **2.5** | Método + IA + Contato | 3 seções finais + formulário | 40 min |
| **2.6** | Integração e navegação | `page.tsx` completa com scroll, mobile menu, footer | 30 min |
| **3.1** | Setup Streamlit | Estrutura base das demos | 15 min |
| **3.2** | Demo Frete | Simulador de precificação | 30 min |
| **3.3** | Demo CVRP | Simulador de roteirização | 30 min |
| **3.4** | Demo Ocorrências | Classificador NLP | 30 min |
| **3.5** | Deploy Streamlit | Publicação no Streamlit Cloud | 15 min |
| **4.1** | Deploy Vercel | Publicação na Vercel | 15 min |
| **4.2** | SEO + Performance | Otimizações finais | 20 min |
| **TOTAL** | | | **~7-10h de prompts** (~60-80h com testes/iteração) |

---

## FASE 0: Design e Setup do Template

### Prompt 0.1 — Design do site

```
Antes de escrever qualquer componente, crie um documento de design em `design/design.md` com:

1. Estrutura de seções da one-page (Header, Hero, Dores, Serviços, Cases, Método, IA, Contato, Footer)
2. Decisões visuais: paleta de cores (primary #1e3a5f, accent #0d9488, etc.), tipografia (Inter, Geist Sans), espaçamento
3. Layout responsivo: mobile-first, breakpoints, grid de cards
4. Lista de componentes reutilizáveis necessários: SectionHeader, PainPointCard, ServiceCard, CaseCard, DemoModal, Header, Footer
5. Mapa de navegação: links do header para IDs de seção, scroll suave, menu mobile
6. Animações: fade-in, slide-up, stagger, hover effects
7. Asset manifest: ícones (Lucide), imagens (nenhuma por enquanto, usar SVG/icones)
8. Formulário de contato: campos, validação, CTA
9. Modal de demo: iframe do Streamlit, dimensões, comportamento mobile

Não escreva código de componentes ainda. Apenas o design.md.
```

### Prompt 0.2 — Fork e setup do template Next.js

```
1. Faça fork do template jigar-sable/next-portfolio no GitHub e clone para a pasta local.
   Se o fork não funcionar, crie um projeto Next.js 15 com App Router:
   npx create-next-app@latest portfolio-lucas-batista --typescript --tailwind --eslint --app --no-src-dir

2. Instale dependências adicionais:
   npm install framer-motion lucide-react clsx tailwind-merge

3. Instale o shadcn/ui:
   npx shadcn@latest init --yes --defaults
   (ou `npx shadcn@latest init` e siga as instruções interativas)

4. Adicione componentes shadcn necessários:
   npx shadcn@latest add button card dialog sheet badge

5. Configure `next.config.ts` para deploy na Vercel (Next.js nativo):
   - NÃO use `output: 'export'` nem `distDir`
   - Apenas `images: { unoptimized: true }` se necessário
   - Ver `docs/DEPLOY.md` para configuração do painel Vercel

6. Configure Tailwind v4 em `app/globals.css`:
   - Adicione `@import "tailwindcss"` no topo
   - Adicione bloco `@theme` com variáveis CSS para as cores do projeto
   - Exemplo:
     @theme {
       --color-primary: #1e3a5f;
       --color-accent: #0d9488;
       --color-background: #f8fafc;
       --color-foreground: #0f172a;
       --color-muted: #64748b;
       --color-border: #e2e8f0;
       --color-card: #ffffff;
     }

7. Configure fonte Inter no `layout.tsx`:
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

8. Crie a estrutura de pastas:
   - app/ (page.tsx, layout.tsx, globals.css)
   - components/ (vazio)
   - data/ (content.ts)
   - public/ (vazio)
   - lib/ (utils.ts — já criado pelo shadcn)
   - design/ (design.md já criado)

9. Verifique se `npm run dev` funciona sem erros.
```

---

## FASE 1: Componentes Base e Dados

### Prompt 1.1 — Criar arquivo de dados de conteúdo

```
No arquivo `data/content.ts`, crie e exporte um objeto `CONTENT` (PascalCase para o objeto, não ALL_CAPS) com todas as informações do portfolio de Lucas Batista. Use os dados de `docs/CONTENT.md` como referência.

Dados pessoais:
- nome: "Lucas Batista"
- titulo: "Especialista em Inteligência Operacional para Logística"
- headline: "Transformo dados e rotinas logísticas em clareza para decidir melhor"
- subheadline: "Diagnósticos, análises, automações, painéis e protótipos digitais para operações de transporte, varejo e e-commerce que precisam enxergar custo, prazo, frete, gargalos e performance com mais segurança."
- email: "[substituir pelo real]"
- linkedin: "[substituir pelo real]"
- github: "[substituir pelo real]"

Array de DORES (8 itens com icone e titulo):
1. { icon: "Truck", title: "Frete caro sem explicação clara" }
2. { icon: "BarChart3", title: "Indicadores que mudam dependendo da planilha" }
3. { icon: "Clock", title: "Entregas atrasadas sem causa raiz visível" }
4. { icon: "FileSpreadsheet", title: "Relatórios manuais que consomem horas" }
5. { icon: "Database", title: "Dados espalhados entre sistemas, planilhas e mensagens" }
6. { icon: "Route", title: "Decisões sobre rota, origem e SLA sem simulação" }
7. { icon: "MapPin", title: "Promessa de entrega pouco confiável por CEP/região" }
8. { icon: "AlertTriangle", title: "Ocorrências operacionais sem classificação acionável" }

Array de SERVIÇOS (5 niveis com numero, titulo, descricao, entregas, cor):
Cores das bordas: slate-400, blue-400, teal-400, amber-400, purple-400

Array de CASES (6 itens para grid simétrico — ou 7 se quiser grid flexível):
Props: id, titulo, descricao, categoria, icone, tags, linkDemo, linkGitHub, prioridade
Categorias: "Frete e Custo", "Roteirização e SLA", "Last Mile e E-commerce", "Operação de CD", "Método e Governança"
Icones: Truck, BarChart3, MapPin, Package, MapPin, Warehouse, AlertTriangle
Use icones do Lucide como strings (ex: "Truck", "MapPin").

Array METODO (5 passos com numero e titulo):
1. "Entendo a dor real"
2. "Mapeio dados e processo"
3. "Crio uma primeira entrega útil"
4. "Valido com a rotina real"
5. "Documento e evoluo"

Texto IA:
- titulo: "IA como acelerador, não como atalho cego"
- descricao: explicar que usa IA para acelerar análise, automação, documentação e prototipagem, mas nenhuma decisão crítica depende de IA sem validação humana.
- exemplosSeguros: array de strings
- naoPrometer: array de strings

Contato:
- titulo: "Vamos começar por uma leitura simples da sua operação?"
- descricao: "Me conte qual problema mais pesa hoje..."
- ctaBotao: "Solicitar leitura inicial"
- camposFormulario: [{ nome, tipo, obrigatorio, validacao }]

Exporte tudo como tipos TypeScript bem definidos.
```

### Prompt 1.2 — Criar componentes base reutilizáveis

```
Crie os componentes reutilizáveis base na pasta components/. Use os componentes shadcn (Button, Card, Dialog, Sheet, Badge) quando possível.

1. SectionHeader.tsx:
   - Props: title (string), subtitle (string, opcional), align?: 'left' | 'center' | 'right'
   - Estilo: h2 text-3xl font-bold text-primary, subtitle text-lg text-muted-foreground
   - Animação: fade-in com Framer Motion (initial opacity 0, y 20; whileInView opacity 1, y 0; duration 0.5)

2. PainPointCard.tsx:
   - Props: icon (LucideIcon string), title (string), index (number)
   - Estilo: Card do shadcn com bg-white, p-6, rounded-xl, shadow-sm, border
   - Icone renderizado dinamicamente via map de Lucide icons
   - Badge verde-água no canto superior direito com index + 1
   - Hover: shadow-md transition

3. ServiceCard.tsx:
   - Props: numero (number), titulo (string), descricao (string), entregas (string[]), corBorda (string)
   - Estilo: Card com borda lateral esquerda 4px (cor dinâmica), bg-white, p-6, rounded-xl
   - Numero do nivel em circulo com bg-primary text-white
   - Lista de entregas com checkmarks (ícone Check do Lucide)

4. CaseCard.tsx:
   - Props: id, titulo, descricao, categoria, icone (string), tags (string[]), linkDemo, linkGitHub, prioridade
   - Estilo: Card com hover:scale-[1.02] transition, icone no topo, tags em badges coloridas
   - Badge de prioridade (P0, P1, P2) em canto superior
   - Botão "Ver demo interativa" — abre Dialog do shadcn com iframe do Streamlit
   - Link "Ver no GitHub" — abre em nova aba

5. DemoModal.tsx:
   - Props: isOpen (boolean), onClose (function), demoUrl (string), titulo (string)
   - Usa Dialog do shadcn
   - Dentro: iframe com src={demoUrl + "?embed=true"}
   - Estilo: width 100%, height 700px (desktop) / 500px (mobile), border none, border-radius 12px
   - Botão fechar (X) no topo

6. Header.tsx:
   - Nav fixo no topo com backdrop-blur-md e bg-white/80
   - Logo "Lucas Batista" à esquerda
   - Links de navegação: Dores | Serviços | Cases | Método | Contato
   - CTA "Falar sobre minha operação" em botão primary (shadcn Button)
   - Mobile: Sheet do shadcn com menu hamburger (ícone Menu do Lucide)
   - Cada link faz scroll suave para o ID da seção correspondente

7. Footer.tsx:
   - Copyright + links sociais (LinkedIn, GitHub, Email) com ícones Lucide
   - Texto curto sobre limitações éticas dos dados
   - Layout em 2 colunas (desktop) ou 1 coluna (mobile)

Exporte todos com tipagem TypeScript completa.
```

### Prompt 1.3 — Layout, metadata e estilos globais

```
Configure o layout.tsx e globals.css:

layout.tsx:
- Importe a fonte Inter do Google Fonts
- Configure metadata completa:
  title: "Lucas Batista | Inteligência Operacional para Logística"
  description: "Transformo dados e rotinas logísticas em clareza para decidir melhor. Diagnósticos, análises, automações e protótipos para logística, transporte e e-commerce."
  keywords: "logística, supply chain, análise de dados, frete, transporte, e-commerce, consultoria, inteligência operacional, Brasil"
  openGraph: { title, description, type: "website", url, image: "/og-image.png" }
  twitter: { card: "summary_large_image", title, description, image: "/og-image.png" }
  robots: "index, follow"
- Adicione viewport meta tag
- Adicione favicon link

globals.css:
- @import "tailwindcss" no topo
- Bloco @theme com as variáveis CSS do projeto (primary, accent, background, foreground, muted, border, card)
- scroll-behavior: smooth
- Seleção de texto com cor accent
- Garanta que as cores shadcn padrão sejam sobrescritas pelas cores do projeto

Teste: `npm run dev` deve funcionar sem erros e a fonte Inter deve estar aplicada.
```

---

## FASE 2: Seções da One-Page

### Prompt 2.1 — Seção Hero

```
Crie o componente Hero.tsx:

- min-h-[90vh], centralizado vertical e horizontalmente
- Fundo: gradiente sutil de slate-50 para white, ou padrão de grid/dots sutil
- Badge acima do título: "Consultor em Inteligência Logística" com bg-accent/10 text-accent
- H1: headline do CONTENT (text-4xl md:text-6xl font-bold text-primary)
- P: subheadline (text-lg md:text-xl text-muted-foreground max-w-2xl)
- Dois botões lado a lado (shadcn Button):
  * Primário: "Quero uma leitura inicial" → scroll para #contato
  * Secundário (variant="outline"): "Ver cases demonstráveis" → scroll para #cases
- Elemento decorativo: componente SVG ou React simples com barras de KPI (pode ser um mini gráfico animado com Framer Motion)

Animações Framer Motion:
- Container com staggerChildren: 0.1
- Badge: delay 0
- Título: delay 0.1
- Subtítulo: delay 0.2
- Botões: delay 0.3
- Elemento decorativo: delay 0.4
- Cada elemento: initial={{ opacity: 0, y: 20 }}, animate={{ opacity: 1, y: 0 }}, transition={{ duration: 0.5 }}

Responsivo: em mobile, botões empilham verticalmente (flex-col), título reduz.
```

### Prompt 2.2 — Seção Dores

```
Crie o componente Dores.tsx:

- ID da seção: "dores"
- Use SectionHeader com title="Dores que resolvo" subtitle="Problemas comuns em operações logísticas que já encontrei e sei como endereçar"
- Grid de PainPointCard: 4 colunas (lg), 2 colunas (md), 1 coluna (sm)
- gap-6
- Importe os dados de CONTENT.dores
- Cada card usa o ícone definido no content.ts

Animação:
- Seção inteira fade-in ao entrar na viewport (whileInView do Framer Motion, once: true)
- Cards com stagger: cada card aparece 0.1s depois do anterior
- Use viewport={{ margin: "-100px" }} para animar antes de entrar completamente
```

### Prompt 2.3 — Seção Serviços

```
Crie o componente Servicos.tsx:

- ID: "servicos"
- SectionHeader: title="Como posso ajudar" subtitle="Escada de contratação: do diagnóstico rápido ao produto com IA"
- Cards em layout vertical (um abaixo do outro), max-w-4xl mx-auto
- Use ServiceCard para cada nível
- Entre os cards, uma linha vertical conectando (pode ser um div com border-l-2 dashed)
- Cores das bordas laterais: border-slate-400, border-blue-400, border-teal-400, border-amber-400, border-purple-400

Animação:
- Cards aparecem sequencialmente com scroll (whileInView)
- Linha conectora pode ter uma animação de "desenho" com Framer Motion (scaleY de 0 a 1)
- Simplifique: não use pathLength (complexo demais para vibecoding). Use scaleY ou simples fade-in.
```

### Prompt 2.4 — Seção Cases

```
Crie o componente Cases.tsx:

- ID: "cases"
- SectionHeader: title="Cases demonstráveis" subtitle="Biblioteca prática de análises logísticas com dados sintéticos. Cada case responde a uma pergunta real de negócio."
- Filtro por categoria: botões de filtro na horizontal ("Todos", + categorias do CONTENT)
- Use shadcn Badge para os botões de filtro. O filtro ativo tem bg-primary text-white.
- Grid de CaseCard: 3 colunas (lg), 2 (md), 1 (sm)
- gap-6
- Cada card usa CaseCard com todos os dados do CONTENT.cases

Filtro:
- State React: useState para filtroAtivo
- Quando clica em categoria, filtra os cases. "Todos" mostra todos.
- Use filter() no array de cases
- Animação: AnimatePresence do Framer Motion para transição suave entre filtros (layout prop)

Modal de demo:
- Ao clicar "Ver demo interativa", abre DemoModal
- URL: demoUrl + "?embed=true"
- Fechar com X (Dialog do shadcn já tem isso) ou clicar fora

Nota: Se tiver 7 cases, o grid de 3 colunas terá 2 linhas completas + 1 sobrando. Isso é aceitável. Se preferir simetria, mostre apenas 6 cases na home e adicione um link "Ver todos os cases".
```

### Prompt 2.5 — Seções Método, IA e Contato

```
Crie 3 componentes: Metodo.tsx, IASection.tsx, Contato.tsx.

### METODO.tsx
- ID: "metodo"
- SectionHeader: title="Meu método" subtitle="Processo simples e validado em operações reais"
- Layout: 5 passos em linha horizontal (desktop) ou vertical (mobile)
- Cada passo: número em círculo (shadcn Badge ou div) + título + descrição
- Setas conectando (→ em desktop, ↓ em mobile)
- Fundo alternado: cards com bg-slate-50
- Animação: números aparecem com fade-in stagger ao scrollar
- Simplifique: não conte números animados (complexo). Apenas fade-in stagger.

### IASECTION.tsx
- ID: "ia"
- Layout 2 colunas (desktop): esquerda texto, direita visual ilustrativo
- Título: "IA como acelerador, não como atalho cego"
- Texto explicando uso de IA, limites, e vibecoding
- Caixa de destaque com borda accent exibindo exemplos seguros e o que não prometer
- Visual direita: componente com 3 ícones grandes (Brain, Zap, Shield) em cards
- Animação: fade-in whileInView

### CONTATO.tsx
- ID: "contato"
- Layout 2 colunas (desktop):
  * Esquerda: texto "Vamos conversar sobre sua operação?" + benefício do diagnóstico
  * Direita: formulário de contato
- Formulário com shadcn Input, Textarea, Button:
  * Nome (obrigatório)
  * Email (obrigatório, type="email")
  * Empresa (opcional)
  * Principal dor/desafio (textarea, opcional)
  * Botão "Solicitar leitura inicial" (shadcn Button primary)
- Validação frontend simples com HTML5 (required, type="email")
- Mensagem de sucesso após submit (useState)
- Abaixo do formulário: email direto e link LinkedIn com ícones Lucide
- Responsivo: em mobile, 1 coluna

Para o submit do formulário: por enquanto, apenas console.log os dados e mostre mensagem de sucesso. A integração com Firebase/Formspree será feita na Fase 4.
```

### Prompt 2.6 — Integrar tudo na page.tsx e navegação

```
No app/page.tsx, integre TODAS as seções na ordem:

1. Header
2. Hero
3. Dores
4. Servicos
5. Cases
6. Metodo
7. IASection
8. Contato
9. Footer

Configure:
- Scroll suave: já está no globals.css (scroll-behavior: smooth)
- Navegação do Header: cada link deve scrollar para o ID da seção usando scrollIntoView({ behavior: 'smooth' })
- Estado ativo no menu: use Intersection Observer para detectar seção visível e destacar link correspondente
- Mobile: menu hamburger (Sheet do shadcn) com todos os links

No Header.tsx:
- Use useState para menu aberto/fechado
- Use useEffect com Intersection Observer para activeSection
- Cada link no menu mobile fecha o Sheet e faz scroll

Teste: navegue por todas as seções, teste o menu mobile, verifique se o scroll suave funciona.
```

---

## FASE 3: Demos Streamlit

### Prompt 3.1 — Criar estrutura base das demos

```
Crie um projeto Streamlit para as demos. Estrutura:

repo: demos-logistica/
├── app.py                    # Página principal com navegação
├── requirements.txt          # Dependências
├── data/                     # Dados sintéticos CSV
│   ├── frete_embarques.csv
│   ├── cvrp_entregas.csv
│   └── ocorrencias.csv
└── pages/
    ├── 01_precificacao_frete.py
    ├── 02_cvrp_urbano.py
    ├── 03_promessa_cep.py
    └── 07_classificador_ocorrencias.py

No app.py:
- Titulo: "Demos Interativas — Inteligência Logística"
- Descrição: "Biblioteca de análises logísticas interativas. Selecione um case no menu lateral."
- Sidebar com navegação entre os cases
- Informação sobre dados sintéticos e limitações

No requirements.txt:
streamlit
pandas
numpy
plotly
matplotlib
scikit-learn

Crie os dados sintéticos CSV:
- frete_embarques.csv: colunas (peso, regiao, tipo_carga, valor_declarado, frete_estimado, componentes...)
- cvrp_entregas.csv: colunas (lat, lon, demanda, janela_inicio, janela_fim)
- ocorrencias.csv: colunas (texto, categoria, prioridade)
```

### Prompt 3.2 — Demo Case 01: Precificação de Frete

```
Crie pages/01_precificacao_frete.py:

- Titulo: "01. Precificação de Frete BR"
- Descricao: "Análise de componentes de custo em embarques logísticos. Dados sintéticos para demonstração."

Inputs (sidebar):
- Slider: peso (0.5 a 5000 kg, default 100)
- Selectbox: região (Sudeste, Sul, Nordeste, Norte, Centro-Oeste)
- Selectbox: tipo de carga (Seca, Refrigerada, Granel, Frágil)
- Number input: valor declarado (R$)
- Checkbox: incluir GRIS, incluir ad valorem

Visualizações (main):
1. Cards com KPIs (3 colunas): Frete estimado, Peso cubado, Custo por kg
2. Gráfico de barras: composição do frete (st.bar_chart)
3. Gráfico de donut (plotly): % de cada componente
4. Tabela com detalhamento (st.dataframe)
5. Alerta visual se componente acima de threshold (st.warning)

Expander: "Como este cálculo funciona?" com explicação das fórmulas.

Use dados do CSV ou gere no próprio script. Mantenha simples — funcional é melhor que perfeito.
```

### Prompt 3.3 — Demo Case 02: CVRP Urbano

```
Crie pages/02_cvrp_urbano.py:

- Titulo: "02. Roteirização Urbana SP"
- Descricao: "Capacitated Vehicle Routing Problem para distribuição urbana. Dados sintéticos."

Inputs:
- Slider: número de entregas (5 a 50)
- Slider: capacidade do veículo (kg)
- Slider: número máximo de veículos
- Button: "Gerar rota"

Visualizações:
1. Scatter plot (Plotly): pontos de entrega coloridos por rota/veículo
2. Cards: veículos usados, distância total, tempo estimado
3. Tabela: sequência de entregas por veículo
4. Gráfico de barras: distância por veículo

Algoritmo: Nearest Neighbor simples + Haversine. Agrupe por capacidade.
Pontos aleatórios em torno de São Paulo (lat -23.55, lon -46.63).
Expander com explicação do método.
```

### Prompt 3.4 — Demo Case 07: Classificador de Ocorrências

```
Crie pages/07_classificador_ocorrencias.py:

- Titulo: "07. Classificador de Ocorrências Operacionais"
- Descricao: "Classificação automática de ocorrencias logísticas usando NLP. Dados sintéticos."

Interface:
- Text area: "Cole aqui o texto da ocorrência" (exemplo pré-preenchido)
- Button: "Classificar"

Resultado:
1. Cards: Categoria, Prioridade (com cor), Causa provável, Ação sugerida
2. Score de confiança (st.progress)
3. Histórico de classificações (st.session_state)

Implementação: regras baseadas em keywords (mais rápido para demo). Não use TF-IDF + LinearSVC — é complexo demais para vibecoding inicial. Use um dicionário de keywords por categoria.

Categorias: Atraso, Endereco Incorreto, Cliente Ausente, Avaria, Devolucao, Recusa, Outros.
Expander "Como funciona?" explicando o método.
```

### Prompt 3.5 — Deploy das demos

```
Deploy das demos Streamlit:

1. Crie repo GitHub: SEU-USUARIO/demos-logistica
2. Push de todos os arquivos
3. Acesse streamlit.io/cloud, conecte o repo
4. Deploy com arquivo principal: app.py
5. URL: https://demos-logistica-SEU-USUARIO.streamlit.app

Para embedar na landing:
<iframe src="https://demos-logistica-SEU-USUARIO.streamlit.app/01_precificacao_frete?embed=true" ...>

Teste cada página no Streamlit Cloud antes de integrar.
```

---

## FASE 4: Deploy e Ajustes Finais

### Prompt 4.1 — Configurar deploy na Vercel

```
Deploy do portfolio Next.js na Vercel (Next.js nativo — SEM static export):

1. Verifique next.config.ts:
   - Sem output: 'export'
   - Sem distDir
   - images: { unoptimized: true } se usar next/image sem optimizer

2. Garanta public/robots.txt e public/sitemap.xml (URLs de produção corretas)

3. Push para GitHub (lucasdevlogis-cpu/portfolio-lucas-batista)

4. Na Vercel:
   - Framework: Next.js
   - Build command: padrão (npm run build)
   - Output Directory: VAZIO — override DESLIGADO
   - NÃO criar vercel.json com outputDirectory

5. Environment variables (obrigatórias para demos):
   NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
   NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
   NEXT_PUBLIC_FORMSPREE_FORM_ID= (opcional)

6. Deploy. Redeploy após alterar env vars (URLs de demo são fixadas no build).

Consulte docs/DEPLOY.md e docs/AVALIACAO.md para troubleshooting.
```

### Prompt 4.2 — SEO e performance finais

```
Otimizações finais:

1. layout.tsx: verifique metadata completo, OG, Twitter Card
2. public/robots.txt e public/sitemap.xml
3. public/og-image.png (crie um PNG simples ou use placeholder)
4. Favicon: adicione favicon.ico em public/
5. Lighthouse: verifique Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90
6. Imagens: next/image com lazy loading
7. Fontes: preload Inter
8. Meta tags: viewport, theme-color
9. Schema.org JSON-LD para Person (opcional):
   <script type="application/ld+json">{...}</script>

Se Lighthouse < 90:
- Otimizar imagens
- Reduzir animações pesadas
- Verificar CSS não utilizado
```

---

## Dicas de Vibecoding

### Como Iterar

1. **Primeiro prompt:** estrutura básica
2. **Teste:** `npm run dev` — verifique se compila
3. **Segundo prompt:** ajustes de cores, espaçamentos, animações
4. **Terceiro prompt:** funcionalidades (filtro, modal, validação)
5. **Quarto prompt:** polimento (responsive, acessibilidade)

### Como Debugar

- Copie a mensagem de erro inteira e cole no prompt
- Descreva o comportamento esperado vs o atual
- Pergunte especificamente: "Por que o componente X não renderiza?"

### Como Manter a Coerência

- Mencione componentes existentes quando criar novos
- Use `@` para referenciar: `@data/content.ts` ou `@components/CaseCard.tsx`
- Atualize `.cursorrules` se mudar decisões de design

---

## Fluxo de Trabalho Diário

```
MANHÃ (2h)
├── Abra o Cursor
├── O .cursorrules já está carregado automaticamente
├── Escolha o prompt do dia
├── Execute com Kimi Code
├── Teste: npm run dev
├── Ajuste via novos prompts
├── Commit e push

TARDE (2h)
├── Continue próximo prompt
├── Teste: npm run dev
├── Ajuste e refine
├── Commit e push

FINAL DO DIA
├── Revise o que foi feito
├── Atualize checklist de progresso
├── Planeje os prompts do dia seguinte
```

---

*Documento de prompts. Versão revisada. Atualize conforme o projeto evolui.*
