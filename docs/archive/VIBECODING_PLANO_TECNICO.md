# Vibecoding — Plano Técnico de Execução
## Portfólio Lucas Batista | Cursor + Kimi Code

---

## 1. O Que é Vibecoding com Kimi Code

**Vibecoding** é a prática de construir software inteiro descrevendo em linguagem natural o que você quer, e deixando a IA (Kimi Code no Cursor) gerar todo o código. Você não escreve código — você escreve **prompts**.

**Kimi Code** é a extensão de IA do Kimi (Moonshot AI) dentro do Cursor, que entende contexto de projetos inteiros, gera código, refatora, debuga e integra arquivos.

### 1.1 Como Funciona na Prática

1. Você abre o Cursor, conecta Kimi Code
2. Descreve o que quer em português ou inglês
3. Kimi Code gera o código, cria arquivos, instala dependências
4. Você revisa, testa e pede ajustes
5. Itera até ficar perfeito

### 1.2 O Que Você Precisa Ter Instalado

| Ferramenta | Onde Baixar | Para Que Serve |
|---|---|---|
| **Cursor** | [cursor.com](https://cursor.com) | Editor de código com IA integrada |
| **Node.js** | [nodejs.org](https://nodejs.org) | Runtime JavaScript para Next.js |
| **Git** | [git-scm.com](https://git-scm.com) | Controle de versão |
| **Conta GitHub** | [github.com](https://github.com) | Hospedar repositórios |
| **Conta Vercel** | [vercel.com](https://vercel.com) | Deploy da landing page |
| **Conta Streamlit Cloud** | [streamlit.io/cloud](https://streamlit.io/cloud) | Deploy das demos |

---

## 2. Estrutura do Projeto no Cursor

### 2.1 Organização de Repositórios

Você vai trabalhar com **2 repositórios** no GitHub:

```
Repositório 1 — Landing Page (Next.js na Vercel)
└── github.com/SEU-USUARIO/portfolio-lucas-batista
    ├── app/                  # Código Next.js (páginas, componentes)
    ├── components/           # Componentes reutilizáveis
    ├── data/                 # Dados de conteúdo (JSON/JS)
    ├── public/               # Imagens, ícones, PDFs
    ├── api/                  # Funções Python (Vercel serverless)
    ├── next.config.js
    └── package.json

Repositório 2 — Demos Streamlit (Streamlit Cloud)
└── github.com/SEU-USUARIO/demos-logistica
    ├── app.py                # Entry point (navegação entre demos)
    ├── pages/
    │   ├── 01_precificacao_frete.py
    │   ├── 02_cvrp_urbano.py
    │   ├── 10_promessa_cep.py
    │   └── 13_classificador_ocorrencias.py
    ├── data/                 # CSVs sintéticos dos cases
    └── requirements.txt
```

### 2.2 Arquivo `.cursorrules` — O Cérebro do Projeto

O `.cursorrules` é um arquivo que você coloca na raiz do projeto e que instrui o Kimi Code sobre como gerar código para **esse projeto específico**. É como dar um briefing técnico permanente à IA.

**Crie este arquivo na raiz do repositório de landing page:**

```
portfolio-lucas-batista/
├── .cursorrules          ← AQUI
├── app/
├── components/
└── ...
```

**Conteúdo do `.cursorrules`:**

```markdown
# Portfolio Lucas Batista — Inteligencia Logistica

## Contexto
- Este é o portfolio profissional de Lucas Batista, especialista autonomo em inteligencia operacional para logistica, transporte, varejo e e-commerce no Brasil.
- O site é uma landing page one-page construida com Next.js 15, Tailwind CSS, TypeScript e shadcn/ui.
- O objetivo é gerar leads de consultoria — o visitante deve entender em 30 segundos qual problema resolve, para quem, e como contratar.

## Tecnologias
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (componentes UI)
- Framer Motion (animacoes)
- Lucide React (icones)

## Design
- Estetica profissional, limpa, confiavel
- Cores primarias: azul escuro (#1e3a5f) e verde-agua (#0d9488) — transmitem seriedade e inovacao
- Tipografia: Inter (Google Fonts) para headings, Geist Sans para body
- Layout responsivo: mobile-first
- Secoes com scroll suave (scroll-behavior: smooth)
- Animacoes sutis com Framer Motion (fade-in, slide-up)

## Estrutura de Secoes (na ordem)
1. Header/Nav: logo "Lucas Batista" + links: Dores | Servicos | Cases | Metodo | Contato | CTA "Falar sobre minha operacao"
2. Hero: headline "Transformo dados e rotinas logisticas em clareza para decidir melhor" + subheadline + 2 CTAs
3. Dores: 8 cards com dores logisticas que resolve
4. Servicos: 5 niveis de contratacao (Diagnostico → Estudo → Painel → Acompanhamento → Produto com IA)
5. Cases: grid de cards com 13 cases de logistica (Frete, Roteirizacao, Last Mile, Armazenagem, IA)
6. Metodo: 5 passos do processo de trabalho
7. IA/Vibecoding: secao explicando uso de IA como acelerador
8. Contato: formulario + email + LinkedIn
9. Footer: copyright + links sociais

## Regras de Codigo
- Todos os componentes devem ser funcionais (React function components)
- Use TypeScript com tipos definidos
- Use Tailwind classes utilitarias (nao criar CSS custom a menos que necessario)
- Componentes reutilizaveis: SectionHeader, CaseCard, ServiceCard, PainPointCard
- Imagens dos cases: usar placeholders ou icones Lucide (nunca imagens genericas de stock)
- Textos em portugues do Brasil
- SEO: meta tags, Open Graph, title, description em cada pagina
- Performance: lazy loading de imagens, animacoes com will-change

## Dados de Conteudo
Os textos do site vêm de arquivos de dados (data/content.ts ou similar).
Nunca hardcode textos diretamente nos componentes — sempre importar do arquivo de dados.
Isso facilita edicoes futuras via vibecoding.

## Integracao com Demos Streamlit
- Cada case na secao Cases tem um link "Ver demo interativa"
- A demo é embedada via iframe: src="https://lucas-logistica-demos.streamlit.app/?embed=true"
- O iframe usa ?embed=true para remover toolbar do Streamlit
- Estilo do iframe: width 100%, height 700px, border none, border-radius 12px

## Deploy
- Target: Vercel (gratuito)
- Build output: next export (static)
- Variaveis de ambiente no painel da Vercel
```

---

## 3. Prompts de Vibecoding — Fase a Fase

### 3.1 FASE 1: Setup Inicial do Projeto

**Prompt 1.1 — Criar estrutura base Next.js:**

```
Crie um projeto Next.js 15 usando App Router na pasta atual.
Use TypeScript, Tailwind CSS, e configure para static export (output: 'export').
Instale tambem: framer-motion, lucide-react, clsx, tailwind-merge.
Configure o tailwind.config.ts com as cores primarias:
- primary: #1e3a5f (azul escuro)
- accent: #0d9488 (verde-agua)
- background: #f8fafc (cinza muito claro)
- foreground: #0f172a (quase preto)
Crie a estrutura de pastas:
- app/ (com layout.tsx e page.tsx)
- components/ (vazio por enquanto)
- data/ (com content.ts vazio)
- public/ (vazio)
- lib/ (com utils.ts)
Use a fonte Inter do Google Fonts no layout.
```

**Prompt 1.2 — Criar arquivo de dados de conteúdo:**

```
No arquivo data/content.ts, crie e exporte um objeto CONST CONTENT com todas as informacoes do portfolio de Lucas Batista:

Dados pessoais:
- nome: "Lucas Batista"
- titulo: "Especialista em Inteligencia Operacional para Logistica"
- headline: "Transformo dados e rotinas logisticas em clareza para decidir melhor"
- subheadline: "Diagnosticos, analises, automacoes, paineis e prototipos digitais para operacoes de transporte, varejo e e-commerce que precisam enxergar custo, prazo, frete, gargalos e performance com mais seguranca."
- email: "lucas@exemplo.com" (substituir pelo real depois)
- linkedin: "https://linkedin.com/in/lucasbatista" (substituir)

Array de DORES (8 itens):
1. "Frete caro sem explicacao clara"
2. "Indicadores que mudam dependendo da planilha"
3. "Entregas atrasadas sem causa raiz visivel"
4. "Relatorios manuais que consomem horas"
5. "Dados espalhados entre sistemas, planilhas e mensagens"
6. "Decisoes sobre rota, origem e SLA sem simulacao"
7. "Promessa de entrega pouco confiavel por CEP/regiao"
8. "Ocorrencias operacionais sem classificacao acionavel"

Array de SERVICOS (5 niveis):
1. Nivel 1 - Diagnostico de Clareza Operacional: checklist de maturidade, mapa de dores, matriz impacto x esforco
2. Nivel 2 - Estudo Pontual: analise estruturada de uma pergunta especifica (frete, SLA, regiao, rota)
3. Nivel 3 - Painel, Automacao ou Simulador Enxuto: mini torre de controle, painel de frete, simulador de custo
4. Nivel 4 - Acompanhamento Recorrente: leitura mensal de KPIs, atualizacao de painel, identificacao de desvios
5. Nivel 5 - Produto Interno ou Piloto com IA: assistente de consulta, triagem de ocorrencias, cockpit operacional

Array de CASES (13 itens com: id, titulo, descricao, categoria, icone, linkDemo, tags):
Categorias: "Frete e Custo", "Roteirizacao e SLA", "Last Mile e E-commerce", "Operacao de CD", "Metodo e Governanca"
Use icones do Lucide React como nomes de strings (ex: "Truck", "MapPin", "Package", etc.)

Array METODO (5 passos):
1. "Entendo a dor real"
2. "Mapeio dados e processo"
3. "Crio uma primeira entrega util"
4. "Valido com a rotina real"
5. "Documento e evoluo"

Texto IA:
- titulo: "IA como acelerador, nao como atalho cego"
- descricao: explicar que usa IA e vibecoding para acelerar analise, automacao, documentacao e prototipagem, mas nenhuma decisao critica depende de IA sem validacao humana.

Exporte tudo como constantes tipadas em TypeScript.
```

**Prompt 1.3 — Criar componentes base reutilizáveis:**

```
Crie os componentes reutilizaveis base do portfolio na pasta components/:

1. SectionHeader.tsx:
   - Props: title (string), subtitle (string opcional), align?: 'left' | 'center' | 'right'
   - Estilo: titulo em h2 com text-3xl font-bold text-primary, subtitle em text-lg text-muted-foreground
   - Com animacao fade-in com Framer Motion (initial opacity 0, y 20; animate opacity 1, y 0; duration 0.5)

2. PainPointCard.tsx:
   - Props: icon (Lucide icon name string), title (string), index (number)
   - Estilo: card com bg-white rounded-xl p-6 shadow-sm border border-slate-200, hover:shadow-md transition
   - O icone deve ser renderizado dinamicamente usando um map de icones do Lucide
   - Numero do card (index + 1) em badge verde-agua no canto superior direito

3. ServiceCard.tsx:
   - Props: nivel (number), titulo (string), descricao (string), entregas (string[])
   - Estilo: card com borda lateral esquerda 4px colorida (cor muda por nivel), bg-white p-6 rounded-xl
   - Numero do nivel em circulo com bg-primary text-white
   - Lista de entregas com checkmarks

4. CaseCard.tsx:
   - Props: id, titulo, descricao, categoria, icone, tags (string[]), linkDemo (string)
   - Estilo: card com hover:scale-[1.02] transition, imagem/icone no topo, tags em badges coloridas por categoria
   - Botao "Ver demo interativa" que abre modal com iframe do Streamlit

5. Header.tsx:
   - Nav fixo no topo com backdrop-blur-md
   - Logo "Lucas Batista" + links de navegacao (scroll para secoes)
   - CTA "Falar sobre minha operacao" em botao primary
   - Menu mobile hamburger

6. Footer.tsx:
   - Copyright + links sociais (LinkedIn, GitHub, Email)
   - Texto curto sobre limitacoes eticas dos dados

Exporte todos os componentes com tipagem TypeScript completa.
```

---

### 3.2 FASE 2: Página Principal (One-Page)

**Prompt 2.1 — Criar seção Hero:**

```
Na page.tsx (ou em um componente Hero.tsx), crie a secao Hero do portfolio:

Layout:
- Altura minima: min-h-[90vh], centralizado vertical e horizontalmente
- Fundo: gradiente sutil de slate-50 para white, ou um padrao sutil de grid/dots
- Conteudo centralizado:
  * Badge acima do titulo: "Consultor em Inteligencia Logistica" com bg-accent/10 text-accent
  * H1: headline do content.ts (text-4xl md:text-6xl font-bold text-primary)
  * P: subheadline (text-lg md:text-xl text-muted-foreground max-w-2xl)
  * Dois botoes lado a lado:
    - Primario: "Quero uma leitura inicial" → scroll para secao Contato
    - Secundario (outline): "Ver cases demonstraveis" → scroll para secao Cases
  * Elemento decorativo: um grafico/ilustracao sutil de KPIs logisticos (pode ser um SVG animado ou componente React com barras de chart)

Animacoes com Framer Motion:
- Badge: fade-in delay 0
- Titulo: fade-in + slide-y delay 0.1
- Subtitulo: fade-in + slide-y delay 0.2
- Botoes: fade-in + slide-y delay 0.3
- Use staggerChildren no container

Responsivo: em mobile, botoes empilham verticalmente, titulo reduz tamanho.
```

**Prompt 2.2 — Criar seção Dores:**

```
Crie a secao Dores na page.tsx. Importe os dados de CONTENT.dores do data/content.ts.

Layout:
- ID da secao: "dores" (para navegacao por anchor)
- Use SectionHeader com title="Dores que resolvo" subtitle="Problemas comuns em operacoes logisticas que ja encontrei e sei como enderecar"
- Grid de 8 PainPointCard em 4 colunas (desktop), 2 colunas (tablet), 1 coluna (mobile)
- Gap de 6 (gap-6)
- Cada card usa um icone diferente do Lucide: Truck, BarChart3, Clock, FileSpreadsheet, Database, Route, MapPin, AlertTriangle

Animacao:
- Secao inteira fade-in ao entrar na viewport (use whileInView do Framer Motion)
- Cards com stagger: cada card aparece 0.1s depois do anterior
```

**Prompt 2.3 — Criar seção Serviços:**

```
Crie a secao Servicos na page.tsx. Importe CONTENT.servicos.

Layout:
- ID: "servicos"
- SectionHeader: title="Como posso ajudar" subtitle="Escada de contratacao: do diagnostico rapido ao produto com IA"
- Cards de servicos em layout vertical (um abaixo do outro), nao em grid
- Cada ServiceCard ocupa largura total com max-w-4xl mx-auto
- Entre os cards, uma linha tracejada vertical conectando os niveis (1 → 2 → 3 → 4 → 5)
- A cor da borda lateral muda por nivel:
  * Nivel 1: border-slate-400
  * Nivel 2: border-blue-400
  * Nivel 3: border-teal-400
  * Nivel 4: border-amber-400
  * Nivel 5: border-purple-400

Animacao:
- Cards aparecem sequencialmente com scroll
- Linha conectora se "desenha" a medida que o usuario scrolla (use framer-motion com pathLength)
```

**Prompt 2.4 — Criar seção Cases:**

```
Crie a secao Cases na page.tsx. Importe CONTENT.cases.

Layout:
- ID: "cases"
- SectionHeader: title="Cases demonstraveis" subtitle="Biblioteca pratica de analises logisticas com dados sinteticos. Cada case responde a uma pergunta real de negocio."
- Filtro por categoria: botoes de filtro na horizontal ("Todos", "Frete e Custo", "Roteirizacao e SLA", "Last Mile e E-commerce", "Operacao de CD", "Metodo e Governanca")
- Grid de CaseCard: 3 colunas (desktop), 2 (tablet), 1 (mobile)
- Cada card tem:
  * Icone grande no topo (cor primaria)
  * Titulo do case
  * Descricao curta (2 linhas max)
  * Tags de categoria como badges pequenas
  * Botao "Ver demo interativa" → abre modal/drawer com iframe do Streamlit
  * Link "Ver no GitHub" → link para o repositorio do case

Modal de demo:
- Drawer lateral (ou modal central) que abre ao clicar "Ver demo interativa"
- Dentro: iframe embedando a demo Streamlit correspondente
- URL do iframe: https://lucas-logistica-demos.streamlit.app/NOME_DO_CASE?embed=true
- Fechar com X ou clicar fora

Filtro:
- State React para filtro ativo
- Quando clica em uma categoria, mostra so os cases daquela categoria
- Animacao de transicao suave entre filtros

Animacao:
- Cards stagger-in ao entrar na viewport
- Efeito de hover: scale leve + sombra
```

**Prompt 2.5 — Criar seções Método, IA e Contato:**

```
Crie as tres secoes finais: Metodo, IA, e Contato.

### SECAO METODO
- ID: "metodo"
- SectionHeader: title="Meu metodo" subtitle="Processo simples e validado em operacoes reais"
- Layout horizontal de 5 passos (desktop), vertical (mobile)
- Cada passo: numero em circulo + titulo + descricao curta
- Setas conectando os passos (→)
- Fundo alternado (cards com bg-slate-50)
- Animacao: numeros contam de 1 a 5 com scroll

### SECAO IA/VIBECODING
- ID: "ia"
- Layout em 2 colunas (desktop):
  * Esquerda: texto explicativo sobre uso de IA
  * Direita: visual ilustrativo (pode ser um componente com icones de IA, dados, engrenagens)
- Texto: titulo "IA como acelerador, nao como atalho cego"
- Paragrafos explicando:
  * Como usa IA para acelerar analise e prototipagem
  * Por que nenhuma decisao critica depende so de IA
  * Como vibecoding ajuda a entregar mais rapido
- Destaque em destaque visual (caixa com borda accent)

### SECAO CONTATO
- ID: "contato"
- Layout em 2 colunas:
  * Esquerda: texto "Vamos conversar sobre sua operacao?" + beneficio do diagnostico inicial
  * Direita: formulario de contato
- Formulario com campos:
  * Nome (required)
  * Email (required, validacao)
  * Empresa (opcional)
  * Principal dor/desafio (textarea, opcional)
  * Botao "Solicitar leitura inicial"
- Abaixo do formulario: email direto e link LinkedIn
- Validacao frontend simples
- Mensagem de sucesso apos submit
```

**Prompt 2.6 — Integrar tudo na page.tsx e configurar navegação:**

```
No arquivo app/page.tsx, integre TODAS as secoes criadas na ordem correta:

1. Header (fixo no topo)
2. Hero
3. Dores
4. Servicos
5. Cases
6. Metodo
7. IA/Vibecoding
8. Contato
9. Footer

Configure:
- Scroll suave para as secoes (scroll-behavior: smooth no CSS global)
- Navegacao do Header: cada link deve scrollar suavemente para o ID da secao correspondente
- Estado ativo no menu: a secao visivel na viewport fica destacada no header (use Intersection Observer ou similar)
- Mobile: menu hamburger com drawer lateral contendo todos os links

No layout.tsx:
- Configure metadata completa (title, description, keywords, Open Graph, Twitter Card)
- Title: "Lucas Batista | Inteligencia Operacional para Logistica"
- Description: "Transformo dados e rotinas logisticas em clareza para decidir melhor. Diagnosticos, analises, automacoes e prototipos para logistica, transporte e e-commerce."
- Keywords: logistica, supply chain, analise de dados, frete, transporte, e-commerce, consultoria, inteligencia operacional, Brasil
- Adicione favicon

Estilo global:
- Cores do Tailwind configuradas
- Fonte Inter
- Scroll-smooth
- Selecao de texto com cor accent
```

---

### 3.3 FASE 3: Demos Streamlit

**Prompt 3.1 — Criar estrutura base das demos:**

```
Crie um projeto Streamlit para as demos logisticas. Estrutura:

repo: demos-logistica/
├── app.py                    # Pagina principal com navegacao
├── requirements.txt          # Dependencias
├── data/                     # Dados sinteticos CSV
│   ├── frete_embarques.csv
│   ├── cvrp_entregas.csv
│   └── ocorrencias.csv
└── pages/
    ├── 01_precificacao_frete.py
    ├── 02_cvrp_urbano.py
    └── 13_classificador_ocorrencias.py

No app.py, crie:
- Titulo: "Demos Interativas — Inteligencia Logistica"
- Descricao: "Biblioteca de analises logisticas interativas. Selecione um case no menu lateral."
- Sidebar com navegacao entre os cases
- Informacao sobre dados sinteticos e limitacoes

No requirements.txt:
streamlit
pandas
numpy
plotly
matplotlib
scikit-learn
```

**Prompt 3.2 — Demo Case 01: Precificação de Frete:**

```
Crie o arquivo pages/01_precificacao_frete.py — Simulador de Precificacao de Frete.

Conteudo:
- Titulo: "01. Precificacao de Frete BR"
- Descricao: "Analise de componentes de custo em embarques logisticos. Dados sinteticos para demonstracao."

Inputs interativos (sidebar):
- Slider: peso do embarque (0.5 a 5000 kg, default 100)
- Selectbox: regiao de destino (Sudeste, Sul, Nordeste, Norte, Centro-Oeste)
- Selectbox: tipo de carga (Seca, Refrigerada, Granel, Fragil)
- Number input: valor declarado (R$)
- Checkbox: incluir GRIS, incluir ad valorem

Visualizacoes principais:
1. Cards com KPIs (3 colunas):
   - Frete estimado (R$)
   - Peso cubado (kg)
   - Custo por kg (R$/kg)
2. Grafico de barras: composicao do frete (frete-peso, GRIS, ad valorem, taxa de coleta, outros)
3. Grafico de pizza ou donut: % de cada componente no total
4. Tabela com detalhamento do calculo (componente, valor, formula)
5. Alerta visual se algum componente estiver acima de um threshold

Use dados sinteticos em data/frete_embarques.csv ou gere dados de exemplo no proprio script.
Estilo: use st.metric, st.bar_chart, st.dataframe, st.info, st.warning do Streamlit.
Adicione um expander "Como este calculo funciona?" com explicacao das formulas.
```

**Prompt 3.3 — Demo Case 02: CVRP Urbano:**

```
Crie o arquivo pages/02_cvrp_urbano.py — Simulador de Roteirizacao Urbana.

Conteudo:
- Titulo: "02. CVRP Urbano SP"
- Descricao: "Capacitated Vehicle Routing Problem para distribuicao urbana. Dados sinteticos."

Inputs interativos:
- Slider: numero de entregas (5 a 50)
- Slider: capacidade do veiculo (kg)
- Slider: numero maximo de veiculos
- Button: "Gerar rota"

Visualizacoes:
1. Mapa de dispersao: pontos de entrega (scatter plot com Plotly, eixo x=longitude, y=latitude, colorido por rota/veiculo)
2. Cards de resultado: numero de veiculos usados, distancia total (km), tempo estimado
3. Tabela: sequencia de entregas por veiculo (parada, endereco, janela de tempo, demanda)
4. Grafico de barras: distancia por veiculo

Algoritmo:
- Use Nearest Neighbor heuristic como baseline (simples, rapido)
- Calcule distancias com Haversine
- Agrupe entregas respeitando capacidade do veiculo
- Gere pontos aleatorios em torno de Sao Paulo (lat -23.55, lon -46.63) como dados sinteticos

Adicione explicacao do metodo em expander.
```

**Prompt 3.4 — Demo Case 13: Classificador de Ocorrências:**

```
Crie o arquivo pages/13_classificador_ocorrencias.py — Classificador de Ocorrencias Operacionais.

Conteudo:
- Titulo: "13. Classificador de Ocorrencias Operacionais"
- Descricao: "Classificacao automatica de ocorrencias logisticas usando NLP."

Interface:
- Text area: "Cole aqui o texto da ocorrencia" (exemplo pre-preenchido)
- Button: "Classificar"

Resultado:
1. Cards com classificacao:
   - Categoria: (Entrega, Devolucao, Avaria, Endereco, etc.)
   - Prioridade: (Alta, Media, Baixa) com cor correspondente
   - Causa provavel: texto explicativo
   - Acao sugerida: proximo passo recomendado
2. Score de confianca (progress bar)
3. Historico de classificacoes (session_state)

Implementacao:
- Use regras baseadas em TF-IDF + LinearSVC (treinado com dados sinteticos)
- Ou use regras simples baseadas em keywords (mais rapido para demo)
- Categorias pre-definidas: Atraso, Endereco Incorreto, Cliente Ausente, Avaria, Devolucao, Recusa, Outros
- Dados de treino sinteticos: 50-100 exemplos de ocorrencias por categoria

Adicione secao "Como funciona?" explicando o metodo de classificacao.
```

**Prompt 3.5 — Deploy das demos:**

```
Configure o deploy das demos Streamlit:

1. Crie um repositorio GitHub: SEU-USUARIO/demos-logistica
2. Faca push de todos os arquivos (app.py, pages/, data/, requirements.txt)
3. Acesse streamlit.io/cloud
4. Crie novo app, selecione o repositorio, arquivo principal: app.py
5. Deploy
6. O app ficara em: https://demos-logistica-SEU-USUARIO.streamlit.app
7. Teste cada pagina

Para embedar na landing page, use:
<iframe src="https://demos-logistica-SEU-USUARIO.streamlit.app/01_precificacao_frete?embed=true" ...>
```

---

### 3.4 FASE 4: Deploy e Ajustes Finais

**Prompt 4.1 — Configurar deploy na Vercel:**

```
Configure o deploy do portfolio Next.js na Vercel:

1. No next.config.js, adicione:
   output: 'export',
   distDir: 'dist'

2. Certifique-se que nao ha rotas dinamicas que dependam de server-side rendering
   (tudo deve ser static export)

3. Crie o arquivo vercel.json se necessario para rewrites ou headers

4. Faca push para GitHub

5. Na Vercel:
   - Importe o projeto do GitHub
   - Framework preset: Next.js
   - Build command: next build
   - Output directory: dist
   - Deploy

6. Configure dominio personalizado se tiver (opcional)

7. Verifique se todas as secoes estao funcionando corretamente
```

**Prompt 4.2 — Ajustes de SEO e performance:**

```
Otimize o portfolio para SEO e performance:

1. No layout.tsx, verifique e ajuste:
   - metadata completo (title, description, openGraph, twitter)
   - keywords relevantes
   - robots: index, follow

2. Adicione arquivo robots.txt na pasta public/

3. Adicione sitemap.xml (pode ser gerado automaticamente ou estatico)

4. Verifique performance no Lighthouse:
   - Imagens: use next/image com lazy loading
   - Fontes: preload Inter
   - CSS: nao inclua CSS nao utilizado
   - Animacoes: use will-change, nao bloqueie o thread principal

5. Meta tags Open Graph para compartilhamento no LinkedIn:
   - og:title, og:description, og:image, og:url

6. Adicione schema.org JSON-LD para Person e Organization

7. Verifique responsividade em diferentes tamanhos de tela
```

---

## 4. Tabela de Prompts por Fase

| Fase | Prompt | O Que Gera | Tempo Estimado |
|---|---|---|---|
| **1.1** | Setup Next.js | Estrutura base do projeto, config, dependencias | 5 min |
| **1.2** | Dados de conteudo | Arquivo content.ts com todos os textos | 10 min |
| **1.3** | Componentes base | 6 componentes reutilizaveis tipados | 15 min |
| **2.1** | Secao Hero | Hero completo com animacoes | 10 min |
| **2.2** | Secao Dores | Grid de 8 cards com animacoes | 10 min |
| **2.3** | Secao Servicos | 5 niveis com conector visual | 15 min |
| **2.4** | Secao Cases | Grid com filtro e modal de demo | 20 min |
| **2.5** | Metodo + IA + Contato | 3 secoes finais + formulario | 20 min |
| **2.6** | Integracao | page.tsx completa com navegacao | 15 min |
| **3.1** | Setup Streamlit | Estrutura base das demos | 5 min |
| **3.2** | Demo Frete | Simulador de precificacao | 15 min |
| **3.3** | Demo CVRP | Simulador de roteirizacao | 15 min |
| **3.4** | Demo Ocorrencias | Classificador NLP | 15 min |
| **3.5** | Deploy Streamlit | Publicacao no Streamlit Cloud | 10 min |
| **4.1** | Deploy Vercel | Publicacao na Vercel | 10 min |
| **4.2** | SEO + Performance | Otimizacoes finais | 15 min |
| **TOTAL** | | | **~4-5 horas de vibecoding** |

---

## 5. Dicas de Vibecoding com Kimi Code

### 5.1 Como Dar Contexto

Sempre que pedir algo novo, inclua contexto sobre:
- **Onde** o arquivo deve ser criado (pasta, nome)
- **O que** já existe (mencione arquivos relevantes)
- **Para que** serve (contexto de negocio)

Exemplo ruim:
```
Crie um botao.
```

Exemplo bom:
```
No componente Hero.tsx (ja existe em components/Hero.tsx), adicione um segundo CTA ao lado do botao existente. Este botao deve ser outline (borda primary, fundo transparente) com texto "Ver cases demonstraveis" e ao clicar deve fazer scroll suave ate a secao #cases. Use o mesmo estilo do botao primario mas com variant="outline".
```

### 5.2 Como Iterar

1. **Primeiro prompt**: gere a estrutura basica
2. **Teste**: veja se funciona, se o layout esta razoavel
3. **Segundo prompt**: ajuste detalhes (cores, espacamentos, animacoes)
4. **Terceiro prompt**: adicione funcionalidades (filtro, modal, validacao)
5. **Quarto prompt**: polimento final (responsive, acessibilidade)

### 5.3 Como Debugar

Se algo nao funcionar:
- **Copie a mensagem de erro** inteira e cole no prompt
- **Descreva o comportamento esperado** vs o atual
- **Pergunte especificamente**: "Por que o componente X nao renderiza?"

### 5.4 Como Manter a Coerencia

- Sempre que criar um novo componente, **mencione os componentes existentes** que ele deve seguir o padrao
- Use o `@` para referenciar arquivos: "@data/content.ts" ou "@components/CaseCard.tsx"
- Mantenha o `.cursorrules` atualizado se mudar decisoes de design

---

## 6. Arquivos de Contexto Úteis

Além do `.cursorrules`, crie estes arquivos para dar contexto ao Kimi Code:

### 6.1 `docs/REGRAS_DE_DESIGN.md`

```markdown
# Regras de Design do Portfolio

## Paleta de Cores
- Primary: #1e3a5f (azul escuro — confianca, seriedade)
- Accent: #0d9488 (verde-agua — inovacao, tecnologia)
- Background: #f8fafc (cinza muito claro)
- Card: #ffffff (branco puro)
- Text: #0f172a (quase preto)
- Muted: #64748b (cinza medio)
- Border: #e2e8f0 (cinza claro)

## Tipografia
- Headings: Inter, bold, tracking-tight
- Body: Geist Sans, normal
- Tamanhos: hero 4xl-6xl, section 3xl, card xl, body base

## Espacamento
- Secoes: py-20 (padding vertical grande)
- Cards: p-6 (padding interno)
- Grid gap: gap-6
- Max-width: max-w-7xl (container centralizado)

## Animacoes
- Entrada: fade-in + slide-y de 20px
- Duracao: 0.5s
- Easing: ease-out
- Stagger: 0.1s entre elementos
- Hover: scale-[1.02], shadow-md, transition 0.2s

## Icones
- Biblioteca: Lucide React
- Tamanho: 24px default, 48px para hero icons
- Cor: primary ou accent conforme contexto
```

### 6.2 `docs/CONTEUDO_CASES.md`

Copie o RESUMO_EXECUTIVO_CASES.md que voce ja tem, e adicione para cada case:
- URL da demo Streamlit
- URL do repositorio GitHub
- Status (pronto / em desenvolvimento)
- Prioridade (P0 / P1 / P2)

### 6.3 `docs/PROMPTS_PARA_EMBED.md`

Lista de URLs de demos para embedar:
```
Case 01: https://demos-logistica.streamlit.app/01_precificacao_frete
Case 02: https://demos-logistica.streamlit.app/02_cvrp_urbano
Case 13: https://demos-logistica.streamlit.app/13_classificador_ocorrencias
```

---

## 7. Checklist Final Pre-Deploy

Antes de publicar, execute este checklist via prompt no Kimi Code:

```
Faca uma revisao completa do portfolio verificando:

[ ] Todos os textos estao em portugues do Brasil
[ ] Nao ha placeholder text ("Lorem ipsum", "exemplo.com")
[ ] Email e LinkedIn estao atualizados com dados reais
[ ] Todos os 13 cases aparecem na secao Cases
[ ] Os 3 cases P0 tem demos Streamlit funcionando e linkadas
[ ] Formulario de contato envia dados para algum lugar (Firebase, Formspree, ou console)
[ ] Navegacao mobile funciona (menu hamburger)
[ ] Scroll suave funciona em todas as secoes
[ ] Imagens tem alt text para acessibilidade
[ ] Nao ha erros no console do navegador
[ ] Lighthouse score > 90 em Performance, Accessibility, Best Practices, SEO
[ ] Meta tags OG/Twitter estao configuradas
[ ] Favicon esta definido
[ ] robots.txt permite indexacao
[ ] O site funciona em mobile (teste com DevTools)
[ ] As demos Streamlit carregam corretamente nos iframes
[ ] O footer tem a declaracao de limitacao etica dos dados
```

---

## 8. Fluxo de Trabalho Diario com Vibecoding

```
MANHA (2h)
├── Abra o Cursor
├── Leia o .cursorrules para refrescar contexto
├── Escolha o prompt do dia (ex: "Criar secao Cases")
├── Execute o prompt com Kimi Code
├── Teste o resultado localmente (npm run dev)
├── Faca ajustes via novos prompts
├── Commit e push

TARDE (2h)
├── Continue proximo prompt (ex: "Criar demo Streamlit")
├── Teste a demo (streamlit run app.py)
├── Ajuste e refine
├── Deploy no Streamlit Cloud
├── Verifique integracao com landing
├── Commit e push

FINAL DO DIA
├── Revise o que foi feito
├── Atualize o checklist de progresso
├── Planeje os prompts do dia seguinte
```

---

*Documento gerado para execucao via Cursor + Kimi Code. Atualize conforme o projeto evolui.*
