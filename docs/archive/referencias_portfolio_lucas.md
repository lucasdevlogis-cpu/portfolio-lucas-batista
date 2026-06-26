# Referências Estratégicas para o Portfólio de Lucas Batista

## TL;DR — Decisões Técnicas Definitivas

Como especialista, minhas recomendações para a sua stack no **Vercel** são:

| Componente | Decisão | Justificativa |
|---|---|---|
| **Landing Page** | **[jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio)** [^111^] | Template Next.js feito para freelancers gerarem leads — tem formulário de contato com Firebase, timeline de experiência, projetos com tags e deploy one-click na Vercel |
| **Demos Interativas** | **Streamlit no Streamlit Cloud** [^91^] | Embedado na landing via `iframe` com `?embed=true` — suas 13 análises Python viram apps navegáveis sem código frontend |
| **APIs de Processamento** | **Python serverless na Vercel** [^86^][^101^] | FastAPI/Flask na pasta `/api/` para endpoints leves (cálculo de frete, geocoding) — mesmo domínio, sem CORS |
| **Hospedagem** | **Vercel (gratuito)** | Um projeto só: Next.js na raiz + Python em `/api/` + variáveis de ambiente no dashboard |

**Arquitetura resumida**: Uma landing page Next.js na Vercel apresenta seus serviços, cases e CTA de contato. Cada case linka para uma demo Streamlit hospedada no Streamlit Cloud (gratuito), embedada via iframe na própria página do case. Se precisar de API Python para processamento em tempo real (ex: simular frete), usa Vercel Functions na mesma conta. Tudo gratuito, tudo no mesmo domínio, e você nunca precisa tocar em servidor.

---

## 1. Decisões Técnicas do Especialista — Por Que Essa Stack

Você definiu **Vercel** como plataforma. Com base nas pesquisas técnicas aprofundadas, tomei três decisões que otimizam custo, tempo e resultado para o seu perfil de consultor autônomo em logística.

### 1.1 Template Definitivo: jigar-sable/next-portfolio

Depois de avaliar 15+ templates Next.js [^8^][^96^][^97^], a escolha definitiva é o **[jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio)** [^111^]. Não é o mais bonito nem o mais minimalista — é o mais **funcional para gerar leads de consultoria**.

O que o diferencia para o seu caso:

- **Formulário de contato com backend Firebase** [^97^]: submissions de leads são armazenadas em banco de dados e disparam notificações por e-mail (SendGrid). Para um consultor autônomo, isso é essencial — você não quer depender só de LinkedIn para receber contatos.
- **Timeline de experiência profissional** [^117^]: exibe trajetória de forma visual, com descrições de cargo, responsabilidades e skills. Você adapta para mostrar sua experiência em logística/transporte.
- **Seção de projetos com tags de tecnologia** [^111^]: cada projeto tem título, descrição, link de demo, link do GitHub e tags. Ideal para os seus 13 cases — o visitante filtra por interesse técnico.
- **Deploy one-click na Vercel** [^111^]: conecta o GitHub, adiciona 4 variáveis de ambiente no dashboard da Vercel, e está no ar. Zero configuração de servidor.

A alternativa **[AbdulBasit313/nextjs-portfolio-template (Flexy Dev)](https://github.com/AbdulBasit313/nextjs-portfolio-template)** [^88^] tem uma **seção explícita de Services** que o jigar-sable não tem — se você priorizar listar "Diagnóstico de Clareza", "Estudo Pontual", "Painel/Automação" etc. diretamente na landing, esse template é melhor. A desvantagem é que o formulário de contato usa Formspree (serviço externo) em vez de Firebase próprio.

### 1.2 Arquitetura na Vercel: O Que Funciona e O Que Não

A descoberta mais importante das pesquisas é que **Vercel agora suporta Python nativamente** via serverless functions [^86^][^87^][^101^]. Isso abre possibilidades, mas com limitações que definem a arquitetura:

| O Que Funciona na Vercel | O Que NÃO Funciona na Vercel |
|---|---|
| Next.js App Router (frontend) | Streamlit (precisa de servidor Python contínuo) [^99^] |
| Python serverless functions (FastAPI/Flask) em `/api/` [^102^] | Aplicações Python com dependências pesadas (>100MB) [^108^] |
| FastAPI + Next.js no mesmo deploy [^103^] | Servidores persistentes (Vercel é serverless) |
| APIs leves: geocoding, cálculo de frete, classificação [^86^] | Banco de dados embutido (precisa PostgreSQL externo) |

A conclusão técnica é clara: **Streamlit não roda na Vercel** porque requer um processo Python contínuo [^99^]. Mas **Streamlit pode ser embedado via iframe** [^91^] a partir do Streamlit Cloud (gratuito). E **Python serverless na Vercel** é perfeito para APIs leves de processamento [^86^][^101^].

A arquitetura ótima para o seu caso é:

```
┌─────────────────────────────────────────────────────────────┐
│  SEU-DOMINIO.VERCEL.APP (Next.js na Vercel)               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │   Landing   │  │    Cases     │  │   API Python    │    │
│  │   Page      │  │   (Next.js)  │  │   /api/frete    │    │
│  │             │  │              │  │   /api/geocode  │    │
│  │  Hero       │  │  Cards com   │  │   /api/classify │    │
│  │  Dores      │  │  link para   │  │                 │    │
│  │  Serviços   │  │  demos ↓     │  │  FastAPI/Flask  │    │
│  │  Método     │  │              │  │  Serverless     │    │
│  │  Contato    │  │  iframe ↓    │  │                 │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  iframe src="SEU-APP.streamlit.app/?embed=true"      │   │
│  │  Demo Streamlit: simulador, dashboard, classificador │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼ (separado — Streamlit Cloud) │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  streamlit.io/cloud (gratuito)                       │   │
│  │  Seus scripts Python + dados sintéticos              │   │
│  │  Interativos, sem código frontend                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Por Que Não Usar Só Streamlit ou Só Next.js

**Só Streamlit**: o site parece uma ferramenta interna, não uma vitrine comercial. SEO ruim, URL estranha (`*.streamlit.app`), e a interface não transmite credibilidade de consultor. É ótimo para demos, péssimo para primeira impressão.

**Só Next.js**: você mostra descrições dos cases, mas o visitante não interage com os dados. Para um consultor de "inteligência operacional", a prova está na interatividade — o prospect precisa *tocar* no simulador de frete, não só ler sobre ele.

**A combinação**: a landing page Next.js cria a primeira impressão profissional e captura leads. O iframe Streamlit entrega a prova técnica interativa. Cada ferramenta faz o que faz melhor.

O **[Samir Saci](https://github.com/samirsaci)** [^79^] é um **Senior Supply Chain Engineer** e fundador da LogiGreen Consulting que construiu exatamente o tipo de presença digital que o Lucas precisa. Sua estratégia é a referência mais valiosa encontrada porque demonstra como um especialista técnico em operações logísticas se posiciona como consultor autônomo sem parecer um desenvolvedor genérico.

### 1.4 Estrutura do Portfólio do Samir Saci

O portfólio do Samir ([samirsaci.github.io](https://samirsaci.github.io/)) [^65^] segue uma arquitetura de **separação clara entre vitrine comercial e prova técnica** — exatamente o que o seu plano estratégico recomenda na seção 7 ("Separar público, apoio e bastidor"). A página principal funciona como uma **landing page de especialista**: headline posicionada ("Senior Supply Chain Engineer"), descrição do valor entregue em setores específicos (Retail, Luxury, Automotive, Cosmetics, E-Commerce, FMCG), e múltiplos CTAs direcionados (LinkedIn, blog, aplicações web). Essa estrutura resolve o problema central do seu plano: como um profissional de operações com forte base técnica se apresenta como consultor estratégico sem que a tecnologia sufoque a mensagem de negócio.

A página organiza o conteúdo em **três categorias visuais distintas**: Blog (conteúdo educativo que demonstra expertise), YouTube (canal de tutoriais que construiu audiência), e Web Applications (ferramentas interativas que provam capacidade técnica). Cada card tem imagem, título descritivo e explicação do valor para o público-alvo. Essa abordagem de **"prova em camadas"** permite que diferentes perfis de visitante encontrem o que precisam — executivos clicam no LinkedIn, analistas técnicos exploram as aplicações, e prospects avaliam o conhecimento pelo blog.

### 1.5 Repositórios Técnicos do Samir Saci como Referência de Conteúdo

O GitHub do Samir contém **mais de 100 tutoriais Python** organizados por tema, que servem como modelo direto para a estruturação dos seus 13 cases. Os repositórios mais relevantes para o seu contexto incluem:

| Repositório | Tema | Estrelas | Relevância para Lucas |
|---|---|---|---|
| [picking-route](https://github.com/samirsaci/picking-route) | Otimização de rotas de picking em armazém | ⭐ 133 | Case 09 (KPIs de Armazenagem) — mesma dor operacional |
| [supply-chain-optimization](https://github.com/samirsaci/supply-chain-optimization) | Otimização de rede logística | ⭐ 109 | Case 05 (Rede Interhubs) — modelagem similar |
| [segmentation](https://github.com/samirsaci/segmentation) | Análise ABC e segmentação de produtos | — | Case 09 — classificação de SKUs |
| [geocoding-api](https://github.com/samirsaci/geocoding-api) | API de roteamento GPS com Flask | — | Case 13 (Auditoria de Endereço) — geocoding operacional |
| [inventory-streamlit-app](https://github.com/samirsaci/inventory-streamlit-app) | Simulador de inventário com Streamlit | — | Case 09 — demonstração de simulador enxuto |
| [last-mile](https://github.com/samirsaci/last-mile) | Otimização de last mile delivery | — | Cases 02, 03, 10, 11, 12 — entrega urbana e promessa |
| [supply-chain-sustainability](https://github.com/samirsaci/supply-chain-sustainability) | Relatório de sustentabilidade | ⭐ 58 | Modelo de documentação executiva |
| [violin-plot](https://github.com/samirsaci/violin-plot) | Visualização interativa com Flask + D3.js | — | Case 01 — visualização de distribuição de custos |

A estrutura que o Samir usa em cada repositório é um **modelo direto para os seus cases**: README com explicação do problema de negócio, descrição da solução técnica, link para artigo/tutorial completo, instruções de uso, e seção "About me" com CTA de consultoria. Essa padronização cria uma **biblioteca de provas coerente** — o visitante reconhece o padrão e confia mais em cada novo case que explora.

### 1.6 Lições de Posicionamento

O Samir Saci demonstra três princípios que o Lucas deve replicar. **Primeiro**, o posicionamento é sempre **"Senior Supply Chain Engineer"** ou "Supply Chain Optimisation Consultant" — nunca "Python Developer" ou "Data Scientist". A tecnologia é mencionada como capacidade de entrega, não como identidade profissional. **Segundo**, cada projeto tem uma **pergunta de negócio clara** ("How many SKUs represent 80% of your total sales?"), não uma descrição técnica do algoritmo. **Terceiro**, há uma **escada de engajamento clara**: o visitante pode consumir conteúdo gratuito (blog), testar ferramentas (aplicações web), ou contratar serviços (consultoria via LogiGreen).

---

## 2. Guia de Implementação na Vercel — Passo a Passo

Esta seção é um **manual prático** para colocar a stack em funcionamento. Cada etapa foi validada com base na documentação oficial da Vercel [^86^][^102^][^103^] e nos templates recomendados.

### 2.1 Etapa 1: Landing Page Next.js (30 minutos)

**Fork e deploy do template:**

```bash
# 1. Fork o repositório no GitHub
# Acesse https://github.com/jigar-sable/next-portfolio e clique "Fork"

# 2. Clone o fork localmente
git clone https://github.com/SEU-USUARIO/next-portfolio.git
cd next-portfolio

# 3. Instale dependências
npm install

# 4. Rode localmente para verificar
npm run dev
# Acesse http://localhost:3000
```

**Personalize o conteúdo editando estes arquivos:**

| Arquivo | O Que Editar | Exemplo para o Lucas |
|---|---|---|
| `data/config.js` ou similar | Nome, título, headline | "Lucas Batista — Inteligência Operacional para Logística" |
| Componente Hero | Subheadline, descrição | "Transformo dados e rotinas logísticas em clareza para decidir melhor" |
| Seção Projects | Cards dos 13 cases | Título: "Precificação de Frete BR", descrição: "Análise de componentes de custo em embarques" |
| Seção Experience | Timeline profissional | Cargos em logística, transporte, operações |
| Seção Contact | E-mail para notificações | Seu e-mail (para receber leads do formulário) |

**Deploy na Vercel (2 minutos):**

1. Acesse [vercel.com](https://vercel.com), faça login com GitHub
2. Clique "Add New Project", selecione o fork do next-portfolio
3. Adicione as variáveis de ambiente no dashboard [^111^]:
   - `SENDGRID_API_KEY` = sua chave do SendGrid (para e-mails de notificação)
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL` = URL do Realtime Database Firebase
   - `MAIL_FROM` = seu e-mail
   - `MAIL_TO` = seu e-mail (onde recebe os contatos)
4. Clique "Deploy"

Seu site estará em `https://seu-projeto.vercel.app` em menos de 2 minutos.

### 2.2 Etapa 2: Demos Streamlit (1-2 horas por case)

**Criar uma demo Streamlit para o Case 01 (Precificação de Frete):**

```python
# app.py — salve em um repositório separado no GitHub
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Simulador de Frete", layout="wide")

st.title("💰 Simulador de Precificação de Frete")
st.markdown("Análise de componentes de custo em embarques logísticos.")

# Dados sintéticos do seu case
df = pd.read_csv("dados_frete.csv")  # seus dados sintéticos

# Inputs interativos
peso = st.number_input("Peso (kg)", min_value=0.1, value=10.0)
destino = st.selectbox("Região de destino", ["Sudeste", "Sul", "Nordeste", "Norte", "Centro-Oeste"])

# Cálculo (sua lógica de negócio)
# ... (insira a lógica do seu case 01 aqui)

# Visualização
st.bar_chart(df.groupby("componente")["valor"].sum())
st.dataframe(df)
```

**Deploy no Streamlit Cloud:**

1. Acesse [streamlit.io/cloud](https://streamlit.io/cloud), faça login com GitHub
2. Clique "New app", selecione o repositório com o `app.py`
3. Clique "Deploy"
4. Seu app ficará em `https://seu-app.streamlit.app`

**Embedar na landing page:**

No arquivo do case na landing page Next.js, adicione:

```tsx
// Dentro da página do case
<iframe
  src="https://seu-app.streamlit.app/?embed=true"
  style={{ width: "100%", height: "700px", border: "none" }}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
></iframe>
```

O parâmetro `?embed=true` remove a toolbar, o padding e o footer do Streamlit, deixando apenas o conteúdo da aplicação [^91^].

### 2.3 Etapa 3: API Python na Vercel (opcional, 30 minutos)

Se você quiser endpoints Python para processamento leve (ex: calcular frete via API sem abrir o Streamlit completo):

```python
# api/index.py — crie na pasta /api/ na RAIZ do projeto (não em /pages/api/)
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/frete', methods=['POST'])
def calcular_frete():
    dados = request.get_json()
    peso = dados.get('peso', 0)
    regiao = dados.get('regiao', '')
    # sua lógica de cálculo
    return jsonify({"custo_estimado": 150.0, "componentes": [...]})
```

Adicione `flask` no `requirements.txt` na raiz do projeto. A Vercel detecta automaticamente Python na pasta `/api/` e deploya como serverless function [^86^][^102^].

### 2.4 Diagrama de Arquitetura Final

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (um único projeto)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (/)                                  │   │
│  │  ├── / → Landing page (hero, serviços, cases, contato)  │   │
│  │  ├── /cases → Grid dos 13 cases                         │   │
│  │  ├── /cases/precificacao-frete → Página do case + iframe │   │
│  │  ├── /cases/cvrp-urbano → Página do case + iframe        │   │
│  │  └── ... (outros cases)                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Python Serverless (/api/)                               │   │
│  │  ├── /api/frete → POST: calcula frete                    │   │
│  │  └── /api/geocode → POST: valida endereço/CEP          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────┼──────────────────────────────┐  │
│  │                           ▼ iframe                       │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  Streamlit Cloud (separado, gratuito)              │ │  │
│  │  │  ├── Simulador de Frete (streamlit.app)            │ │  │
│  │  │  ├── Dashboard de KPIs (streamlit.app)             │ │  │
│  │  │  └── Classificador de Ocorrências (streamlit.app)  │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Templates de Landing Page — Detalhamento das Opções

> **Decisão já tomada na Seção 1**: o template recomendado é o **[jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio)**. As opções abaixo são documentadas para referência caso você queira avaliar alternativas antes de começar.

A escolha do template de landing page depende do equilíbrio entre **complexidade técnica**, **tempo de implementação** e **qualidade do resultado visual**. Para o perfil do Lucas — que precisa de uma landing profissional mas não tem frontend como core skill —, a recomendação é priorizar templates que sejam **fáceis de customizar via arquivo de dados** e que tenham uma **seção de serviços/projetos** bem estruturada.

### 3.1 Opção Recomendada: jigar-sable/next-portfolio

| Template | Tecnologia | Destaque | Complexidade | Link |
|---|---|---|---|---|
| **jigar-sable/next-portfolio** | Next.js App Router + Tailwind + TypeScript + Firebase + Framer Motion | **Formulário de contato com backend**, timeline de experiência, projetos com tags, deploy one-click na Vercel | ⭐⭐⭐ Média | [GitHub](https://github.com/jigar-sable/next-portfolio) [^111^] |

Este é o template escolhido porque foi projetado especificamente para **freelancers que precisam capturar leads** [^97^]. O formulário de contato não é um simples `mailto:` — é um backend completo com Firebase (armazena submissions em banco de dados) e SendGrid (dispara notificações por e-mail). Para um consultor autônomo, isso é a diferença entre um site que *mostra* trabalho e um site que *gera oportunidades de negócio*.

A timeline de experiência profissional [^117^] permite exibir sua trajetória em logística de forma visual, com descrições de cargo, responsabilidades e skills por posição. A seção de projetos com tags de tecnologia permite que o visitante entenda rapidamente qual case é relevante para sua dor específica.

**Deploy na Vercel** [^111^]:
```bash
# 1. Fork no GitHub
# 2. Connect na Vercel dashboard
# 3. Adicione 4 environment variables:
#    SENDGRID_API_KEY=XXXXXXXX
#    NEXT_PUBLIC_FIREBASE_DATABASE_URL=XXXXXXXXXX
#    MAIL_FROM=seu@email.com
#    MAIL_TO=seu@email.com
# 4. Deploy — site no ar em 2 minutos
```

### 3.2 Alternativa com Seção de Serviços: Flexy Dev

| Template | Tecnologia | Destaque | Complexidade | Link |
|---|---|---|---|---|
| **AbdulBasit313/nextjs-portfolio-template** | Next.js 15 + Tailwind V4 | **Seção explícita de Services**, skills, testimonials, contact form via Formspree, SEO otimizado | ⭐⭐ Baixa | [GitHub](https://github.com/AbdulBasit313/nextjs-portfolio-template) [^88^] |

O Flexy Dev tem um diferencial que o jigar-sable não tem: uma **seção explícita de Services** onde você lista "Diagnóstico de Clareza Operacional", "Estudo Pontual", "Painel/Automação Enxuta", "Acompanhamento Recorrente" e "Produto com IA" — exatamente a escada comercial do seu plano estratégico. O formulário de contato usa Formspree (serviço externo gratuito) em vez de Firebase próprio, o que simplifica o setup mas depende de terceiro.

**Quando escolher o Flexy Dev em vez do jigar-sable**: se você quer listar seus serviços de consultoria de forma explícita na landing page, com descrição de cada nível de contratação. O jigar-sable foca mais em projetos/portfólio do que em serviços.

### 3.3 Alternativa com Filtro de Cases: realstoman

| Template | Tecnologia | Destaque | Complexidade | Link |
|---|---|---|---|---|
| **realstoman/nextjs-tailwindcss-portfolio** | Next.js + Tailwind + Framer Motion | **Filtro e busca de projetos por categoria** — ideal para 13+ cases em 5 pilares | ⭐⭐⭐ Média | [GitHub](https://github.com/realstoman/nextjs-tailwindcss-portfolio) [^8^] |

Com 13 cases organizados em 5 pilares (Frete e Custo, Roteirização e SLA, Last Mile e E-commerce, Operação de CD, Método e Governança), o **filtro por categoria** permite que o visitante encontre rapidamente o case relevante para sua dor específica. A maioria dos templates lista projetos sem ajudar na navegação — esse resolve o problema de forma elegante.

### 3.4 Alternativa Minimalista: Nim

| Template | Tecnologia | Destaque | Complexidade | Link |
|---|---|---|---|---|
| **Nim (ibelick)** | Next.js 15 + React 19 + Tailwind v4 | Uma página só, dark mode, estilo "business card digital", carregamento instantâneo | ⭐⭐ Baixa | [GitHub](https://github.com/ibelick/nim) [^8^] |

O Nim é a escolha se você quer **máxima simplicidade** — uma única página com hero, descrição breve, links sociais e nada mais. Carrega em menos de 1 segundo e tem 100 no Lighthouse [^97^]. A desvantagem é a falta de seções de projetos, serviços e formulário de contato — você teria que adicionar manualmente.

---

## 4. Repositórios de Logística para Replicar/Adaptar

Esta seção lista repositórios GitHub que demonstram as mesmas capacidades técnicas dos seus 13 cases, organizados por pilar de atuação. A maioria usa **Python + Streamlit** ou **Python + Flask**, tornando a replicação acessível sem necessidade de dominar JavaScript/frontend.

### 4.1 Frete, Custo e Margem Logística

Os repositórios desta categoria demonstram como transformar análise de frete em ferramenta interativa. O [Shipping_cost_prediction](https://github.com/keerthikkn/Shipping_cost_prediction) [^50^] usa regressão linear para estimar custo de envio com base em peso, dimensões, origem, destino e modalidade — exatamente a lógica do seu **Case 01 (Precificação de Frete)**. A aplicação Flask permite input de dados via formulário web e retorna o custo estimado, servindo como modelo direto para um **Simulador de Custo de Frete** (P0 no seu roadmap).

O [Supply-Chain-Dashboard](https://github.com/akeDataAnalyst/Supply-Chain-Dashboard) [^10^] é um dashboard Streamlit que cobre **demand forecasting**, **inventory management** e **supplier analytics** — incluindo métricas de custo e performance de fornecedores. A arquitetura (Python + Pandas + Prophet + Streamlit + Plotly) é replicável para um painel de frete e performance (P1 no roadmap). O [AI-Driven-Forecast-Resilience-Simulator](https://github.com/AquarlisPrime/AI-Driven-Forecast-Resilience-Simulator-for-Supply-Chain) [^48^] vai além: é uma plataforma completa de simulação com **Prophet, XGBoost, LSTM, SHAP e PyVis** para modelar cenários de risco na cadeia de suprimentos — referência de complexidade para quando você quiser evoluir para análises preditivas.

### 4.2 Roteirização e Otimização de Veículos (CVRP/VRP/VRPTW)

Esta é a categoria mais madura em termos de repositórios open-source, com múltiplas implementações do Vehicle Routing Problem que mapeiam diretamente para seus cases 02, 03, 06, 07 e 08.

| Repositório | Problema | Algoritmo | Interface | Relevância |
|---|---|---|---|---|
| [PyVRP/VRPLIB](https://github.com/PyVRP/VRPLIB) [^32^] | Leitura/escrita de instâncias VRP | Parser de formatos VRPLIB e Solomon | Python library | Base para benchmark de solvers (Case 06) |
| [Khixinhxan/vrp_ortools_python](https://github.com/Khixinhxan/vrp_ortools_python) [^33^] | 17 variantes de VRP | Google OR-Tools | Python scripts | CVRP, VRPTW, CVRPMTW, PADVRP (Cases 02, 03, 04) |
| [ngchunlong279645/CVRP](https://github.com/ngchunlong279645/Capacitated-Vehicle-Routing-Problem-CVRP-) [^30^] | CVRP básico | OR-Tools + Nearest Neighbor | Matplotlib | Case 02 — distribuição urbana |
| [aws-samples/delivery-routes-optimization](https://github.com/aws-samples/delivery-routes-optimization-for-logistics) [^14^] | VRPTW com rotas reais | OptaPlanner + GraphHopper + OpenStreetMap | React + MapLibre | Case 07 — malha viária real |
| [samirsaci/last-mile](https://github.com/samirsaci/last-mile) [^20^] | Last mile delivery | Otimização OR-Tools | Python | Cases 10, 11, 12 — última milha |

O **[Khixinhxan/vrp_ortools_python](https://github.com/Khixinhxan/vrp_ortools_python)** [^33^] é particularmente valioso porque implementa **17 variantes diferentes do VRP** usando Google OR-Tools — do CVRP básico até problemas com múltiplos depósitos, janelas de tempo múltiplas, pickup e delivery simultâneos, e recargas. Cada variante é um script Python independente, o que permite adaptar individualmente para os seus cases específicos sem precisar entender toda a biblioteca.

O **[aws-samples/delivery-routes-optimization](https://github.com/aws-samples/delivery-routes-optimization-for-logistics)** [^14^] é um projeto enterprise completo da AWS que resolve VRPTW com **distâncias reais de rede viária** (GraphHopper sobre OpenStreetMap) e interface web React. É mais complexo que o que você precisa inicialmente, mas serve como referência de arquitetura para quando quiser evoluir para rotas com mapa real (Case 07).

### 4.3 Last Mile, E-commerce e Geografia

Para os cases relacionados à **promessa de entrega por CEP**, **ship from store** e **análise territorial**, os seguintes repositórios são referências diretas:

O **[samirsaci/geocoding-api](https://github.com/samirsaci/geocoding-api)** [^62^] é uma API Flask simples que calcula distância entre dois endereços usando geocodificação — exatamente a base técnica para o **Case 13 (Auditoria de Endereço)** e o **Case 10 (Promessa por CEP)**. A API recebe dois endereços textuais e retorna a distância em quilômetros, com deploy no Heroku. Você pode adaptar essa lógica para validar CEPs brasileiros usando a API dos Correios ou OpenStreetMap.

O **[Abish-gupta/Delivery_route_optimisation](https://github.com/Abish-gupta/Delivery_route_optimisation)** [^11^] é uma ferramenta web que combina **algoritmos Python de roteamento com frontend JavaScript** para otimização de última milha. Inclui dashboard interativo, sequenciamento de entregas com algoritmos genéticos, e módulo de rastreamento visual. A arquitetura (Python backend + JS frontend) é um modelo para quando você quiser criar demos mais sofisticadas que o Streamlit sozinho permite.

### 4.4 Armazenagem, KPIs e Operação de CD

Para o **Case 09 (KPIs de Armazenagem)** e futuras ferramentas de diagnóstico operacional:

O **[LogiTrack](https://github.com/tanishpoddar/LogiTrack)** [^12^] é um sistema completo de **inventory management** com Streamlit que inclui dashboard de analytics, distribuição de inventário por geografia, order management, warehouse management e supplier management. A interface tem gráficos interativos, mapas de distribuição e métricas de performance — tudo em uma única aplicação Python. Serve como referência para um **mini torre de controle de armazém**.

O **[samirsaci/inventory-streamlit-app](https://github.com/samirsaci/inventory-streamlit-app)** [^17^] é um **simulador de inventário** focado em replenishment: o usuário ajusta parâmetros (demanda, lead time, safety stock) e vê em tempo real o impacto em métricas como dias de ruptura, inventário médio e custo total. A interface usa cards de contexto inline, gráficos de 3 painéis (Demanda / Pedidos / Inventário) e KPIs destacados. É o modelo perfeito para um **Simulador de Cenários Logísticos** que você pode oferecer como ferramenta de diagnóstico.

### 4.5 Classificação de Ocorrências e IA Operacional

Para o **Case P2 (Classificador de Ocorrências Operacionais)** e o pilar de **Automação e IA Assistida**:

O **[Customer_support_intelligence](https://github.com/abh2050/Customer_support_intelligence)** [^72^] é uma aplicação Streamlit que usa **NLP embeddings + Gemini AI** para analisar, classificar e extrair insights de tickets de suporte ao cliente. As funcionalidades incluem: análise de causa raiz via clustering semântico, rastreamento de tendências ao longo do tempo, recomendação de soluções baseadas em dados históricos, e classificador de novos tickets. A arquitetura (processamento de embeddings + UMAP + K-means + API Gemini) é diretamente adaptável para classificar **ocorrências operacionais logísticas** (atraso, insucesso, endereço incorreto, recusa, etc.).

O **[Support-Ticket-Classifier](https://github.com/mohd-musheer/Support-Ticket-Classifier)** [^75^] usa **TF-IDF + LinearSVC** para classificar tickets de suporte em categorias e atribuir prioridade (High/Medium/Low) via regras de negócio. A aplicação tem interface web profissional com FastAPI, suporte a Docker, e está deployada no Render. A simplicidade do modelo (TF-IDF em vez de embeddings caros) torna-o ideal para um **classificador de ocorrências logísticas** que pode rodar localmente ou em servidor barato.

O **[versus-incident](https://github.com/VersusControl/versus-incident)** [^25^] é um **agente AI SRE self-hosted** que aprende o comportamento normal de sistemas e escala apenas o que é novo ou inesperado. Embora seja para infraestrutura de TI, a arquitetura de **triage automático com classificação de padrões** é aplicável a ocorrências logísticas: o sistema aprende os tipos normais de ocorrência e alerta apenas quando surge um padrão anômalo.

---

## 5. Dashboards e Simuladores Interativos

### 5.1 Modelo de Arquitetura: Vitrine + Demo

A estratégia recomendada para os cases interativos segue o padrão **"landing page estática + links para demos Streamlit"**. Essa arquitetura resolve o problema de separar público e apoio que seu plano estratégico identifica:

- **Vitrine (landing page Next.js/HTML)**: apresenta o problema de negócio, a metodologia, os resultados e um link "Experimentar a demo"
- **Demo (Streamlit)**: permite ao visitante interagir com dados sintéticos, ajustar parâmetros e ver resultados em tempo real

O [SupplyChainDataModelling](https://github.com/josericodata/SupplyChainDataModelling) [^13^] demonstra essa arquitetura com páginas separadas para Forecast, Inventory Optimization, Segmentation e Hypothesis Testing — cada uma com dados sintéticos, visualizações interativas e explicações do método. O [inventory-streamlit-app](https://github.com/samirsaci/inventory-streamlit-app) [^17^] é ainda mais focado: uma única página de simulação com controles deslizantes, botões de ação e gráficos que se atualizam automaticamente.

### 5.2 Deploy de Demos Streamlit

Todas as aplicações Streamlit podem ser deployadas gratuitamente no **[Streamlit Community Cloud](https://streamlit.io/cloud)** conectando o repositório GitHub. O processo é: push do código para GitHub, conectar a conta Streamlit ao repositório, selecionar o arquivo principal (`app.py`), e publicar. O URL gerado pode ser embedado na landing page como link ou iframe. Essa abordagem elimina a necessidade de servidor próprio para as demos.

---

## 6. Tabela Comparativa — Por Que Essa Stack é a Melhor para Você

> **Decisão já tomada na Seção 1**: Next.js na Vercel (landing) + Streamlit no Streamlit Cloud (demos) + iframe embed. A tabela abaixo explica por que essa combinação vence outras alternativas para o seu perfil específico.

| Dimensão | HTML/CSS Puro | Next.js na Vercel | Streamlit como LP | **Stack Recomendada** |
|---|---|---|---|---|
| **Tempo para primeira versão** | 2-3 dias | 3-5 dias | 1-2 dias | **3-5 dias** |
| **Curva de aprendizado** | Baixa | Média | Muito baixa | **Média** |
| **SEO (aparecer no Google)** | Boa | Excelente | Ruim | **Excelente** |
| **Formulário de contato funcional** | Não (só mailto) | Sim (Firebase/Formspree) | Limitado | **Sim (Firebase)** |
| **Cases interativos** | Não | Via iframe Streamlit | Integrado nativo | **Via iframe Streamlit** |
| **Custo total** | Grátis | Grátis | Grátis | **Grátis** |
| **Hospedagem** | GitHub Pages | **Vercel** (um projeto só) | Streamlit Cloud | **Vercel + Streamlit Cloud** |
| **Credibilidade profissional** | Média | **Alta** | Baixa | **Alta** |
| **Captura de leads** | Não | **Sim** | Não | **Sim** |
| **Customização visual** | Limitada | **Alta** | Limitada | **Alta** |
| **Seu esforço de manutenção** | Baixo | **Baixo** | Baixo | **Baixo** |

### Por que não outras alternativas

**HTML/CSS puro** não captura leads — e para um consultor autônomo, um site que não gera oportunidades de negócio é apenas um cartão de visitas digital. O formulário de contato com backend (Firebase) do template Next.js transforma o visitante em lead automaticamente.

**Streamlit como landing page inteira** parece uma ferramenta interna, não uma vitrine comercial. A URL `*.streamlit.app` não transmite credibilidade, o SEO é quase inexistente, e a interface limita a personalização visual. Streamlit é excelente para demos, péssimo para primeira impressão profissional.

**Next.js sozinho** (sem demos Streamlit) mostra descrições dos cases, mas o visitante não interage com os dados. Para um consultor de "inteligência operacional", a prova está na interatividade — o prospect precisa *tocar* no simulador de frete, não só ler sobre ele. O iframe Streamlit resolve isso sem que você precise escrever código frontend complexo.

A **stack recomendada** (Next.js + Streamlit embedado) coloca cada ferramenta no lugar certo: Next.js cuida da primeira impressão profissional, do SEO e da captura de leads. Streamlit cuida da prova técnica interativa. Vercel cuida do hosting gratuito e rápido. Você foca no conteúdo, não na infraestrutura.

---

## 7. Roteiro de Implementação por Fase

### Fase 1 — Landing Page na Vercel (Dias 1-5)
1. **Fork o [jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio)** no GitHub
2. **Clone localmente** e rode `npm install` + `npm run dev`
3. **Edite o conteúdo**: nome, headline ("Transformo dados e rotinas logísticas em clareza..."), dores, método, cases (13 cards com links para demos)
4. **Configure Firebase** para formulário de contato (gratuito, guia no README do template)
5. **Deploy na Vercel**: connect GitHub, adicione 4 env vars, clique Deploy
6. **Teste o formulário**: envie um contato de teste e verifique se chega notificação no e-mail

### Fase 2 — Demos Streamlit no Streamlit Cloud (Dias 6-12)
1. **Crie conta no [Streamlit Cloud](https://streamlit.io/cloud)** com login GitHub
2. **Priorize 3 cases P0** para demo: Precificação de Frete, CVRP Urbano, Classificador de Ocorrências
3. **Para cada case**: crie um repo GitHub separado com `app.py` + dados sintéticos CSV
4. **Deploy cada demo**: no Streamlit Cloud, connect o repo, clique Deploy
5. **Embede na landing**: adicione iframes com `?embed=true` nas páginas de case do Next.js
6. **Teste a integração**: acesse a landing, clique em um case, verifique se a demo carrega

### Fase 3 — Biblioteca Técnica e GitHub (Dias 13-20)
1. **Estruture o repositório principal** com README profissional no padrão Samir Saci
2. **Organize os 13 cases** em pastas numeradas (`01_precificacao_frete/`, `02_cvrp_urbano/`, etc.)
3. **Crie README individual** para cada case: problema de negócio → solução técnica → resultados → limitações → CTA
4. **Adicione GitHub Topics**: `logistics`, `supply-chain`, `analytics`, `python`, `streamlit`, `brazil`
5. **Crie seção de limitações e ética** no README principal
6. **Conecte tudo**: landing page linka para GitHub, GitHub linka para landing, demos embedadas na landing

### Fase 4 — Ajustes e Lançamento (Dias 21-30)
1. **Teste em mobile**: 60%+ dos acessos serão em celular
2. **Otimize SEO**: meta tags, título, descrição, imagem social
3. **Configure domínio personalizado** (opcional, ~R$50/ano)
4. **Prepare mensagem de LinkedIn** com link do portfólio
5. **Publique primeiro post**: escolha um case e conte a história do problema → solução
6. **Meça resultados**: Vercel Analytics (gratuito) mostra visitas, origem, páginas mais vistas

---

## 8. Checklist de Ações Imediatas

- [ ] **Fork o template escolhido**: [jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio) (ou [Flexy Dev](https://github.com/AbdulBasit313/nextjs-portfolio-template) se preferir seção de Services)
- [ ] **Criar conta Vercel** (login com GitHub) para deploy da landing
- [ ] **Criar conta Streamlit Cloud** (login com GitHub) para deploy das demos
- [ ] **Criar projeto Firebase** (gratuito) para formulário de contato do template
- [ ] **Preparar dados sintéticos** dos 13 cases em CSV para uso nas demos Streamlit
- [ ] **Escrever README modelo** seguindo estrutura: problema de negócio → solução técnica → resultados → limitações → CTA de consultoria
- [ ] **Personalizar conteúdo do template**: headline, dores, método, cases, experiência, contato
- [ ] **Deploy da landing na Vercel** e testar formulário de contato
- [ ] **Criar e deployar primeira demo Streamlit** (comece pelo Case 01 — Precificação de Frete)
- [ ] **Embedar demo na landing** via iframe com `?embed=true`
- [ ] **Testar fluxo completo**: landing → case → demo interativa → formulário de contato

---

## 9. Recursos Adicionais de Referência

### Artigos sobre Portfólio de Data/Analytics
- [How to Make a Free Data Science Portfolio Website With GitHub Pages](https://medium.com/the-data-entrepreneurs/how-to-make-a-free-data-science-portfolio-website-with-github-pages-aa1e496e155) [^31^] — guia prático passo a passo
- [9 Data Analytics Portfolio Examples](https://careerfoundry.com/en/blog/data-analytics/data-analytics-portfolio-examples/) [^39^] — análise de portfólios reais de consultores
- [Create Your Supply Chain Analytics Portfolio](https://www.youtube.com/watch?v=Zn9mB5DKajw) [^45^] — vídeo do próprio Samir Saci

### Templates e Starters
- [GitHub Topics: nextjs-portfolio](https://github.com/topics/nextjs-portfolio) [^1^] — 103+ repositórios
- [GitHub Topics: portfolio-nextjs](https://github.com/topics/portfolio-nextjs) [^3^] — 15+ repositórios curados
- [GitHub Topics: nextjs-portfolio-template](https://github.com/topics/nextjs-portfolio-template) [^6^] — 21+ templates

### Comunidades e Benchmarks
- [webportfolios.dev](https://www.webportfolios.dev/blog/free-developer-portfolio-website-templates) [^7^] — templates gratuitos com análise de prós/contras
- [Tutorials Dojo: Portfolio Website with GitHub Codespaces](https://tutorialsdojo.com/portfolio-website-with-github-codespaces-and-next-js/) [^4^] — tutorial completo de Next.js + AWS
