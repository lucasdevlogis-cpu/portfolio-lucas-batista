# CONTENT.md — Conteúdo Completo do Site

> **Uso:** Este documento centraliza TODO o conteúdo textual do portfólio. Ao editar o site via vibecoding, use este arquivo como fonte de verdade. Os componentes React devem importar de `data/content.ts`, que deve espelhar este documento.
>
> **Referência cruzada:** Para visão estratégica, veja [VISION.md](VISION.md). Para arquitetura técnica, veja [ARCHITECTURE.md](ARCHITECTURE.md). Para execução, veja [PROMPTS.md](PROMPTS.md).

---

## 1. Dados Pessoais

| Campo | Valor | Status |
|---|---|---|
| **Nome** | Lucas Batista | ✅ Fixo |
| **Título** | Especialista em Inteligência Operacional para Logística | ✅ Fixo |
| **Headline** | Transformo dados e rotinas logísticas em clareza para decidir melhor. | ✅ Fixo |
| **Subheadline** | Diagnósticos, análises, automações, painéis e protótipos digitais para operações de transporte, varejo e e-commerce que precisam enxergar custo, prazo, frete, gargalos e performance com mais segurança. | ✅ Fixo |
| **Email** | lucas.farias.log@outlook.com | ✅ |
| **LinkedIn** | https://linkedin.com/in/lucasfariaslog | ✅ |
| **GitHub** | https://github.com/lucasdevlogis-cpu | ✅ |

---

## 1b. Hero (CTAs)

| Campo | Valor |
|---|---|
| **Badge** | Consultor em Inteligência Logística |
| **CTA Primário** | Quero uma leitura inicial |
| **CTA Secundário** | Ver cases demonstráveis |

---

## 1c. Títulos de Seção (SectionHeader)

| Seção | Título | Subtítulo |
|---|---|---|
| Dores | Dores que resolvo | Problemas comuns em operações logísticas que já encontrei e sei como endereçar |
| Serviços | Como posso ajudar | Escada de contratação: do diagnóstico rápido ao produto com IA |
| Cases | Cases demonstráveis | Biblioteca prática de análises logísticas com dados sintéticos. Cada case responde a uma pergunta real de negócio. |
| Método | Meu método | Processo simples e validado em operações reais |
| Contato (benefício) | — | Uma leitura inicial ajuda a identificar se faz sentido avançar — sem compromisso de projeto grande. |

**⚠️ Importante:** Preencher email, LinkedIn e GitHub reais antes de qualquer deploy. São itens críticos do CHECKLIST.md.

---

## 2. Dores (8 cards)

| # | Ícone Lucide | Título |
|---|---|---|
| 1 | Truck | Frete caro sem explicação clara |
| 2 | BarChart3 | Indicadores que mudam dependendo da planilha |
| 3 | Clock | Entregas atrasadas sem causa raiz visível |
| 4 | FileSpreadsheet | Relatórios manuais que consomem horas |
| 5 | Database | Dados espalhados entre sistemas, planilhas e mensagens |
| 6 | Route | Decisões sobre rota, origem e SLA sem simulação |
| 7 | MapPin | Promessa de entrega pouco confiável por CEP/região |
| 8 | AlertTriangle | Ocorrências operacionais sem classificação acionável |

---

## 3. Serviços (5 níveis)

| Nível | Cor da Borda | Título | Descrição | Entregas |
|---|---|---|---|---|
| 1 | border-slate-400 | Diagnóstico de Clareza Operacional | Para empresa com dor, mas sem clareza sobre causa e prioridade. | Checklist de maturidade, mapa de dores, matriz impacto x esforço, recomendação de próximos passos. |
| 2 | border-blue-400 | Estudo Pontual | Análise estruturada de uma pergunta específica (frete, SLA, região, rota). | Leitura de dados, análise com premissas documentadas, relatório executivo, limitações declaradas. |
| 3 | border-teal-400 | Painel, Automação ou Simulador Enxuto | Mini torre de controle, painel de frete, simulador de custo. | Ferramenta navegável, dados sintéticos ou do cliente, documentação de uso, treinamento simples. |
| 4 | border-amber-400 | Acompanhamento Recorrente | Leitura mensal de KPIs, atualização de painel, identificação de desvios. | Ritual de acompanhamento, alertas, revisão semanal/mensal, evolução do painel. |
| 5 | border-purple-400 | Produto Interno ou Piloto com IA | Assistente de consulta, triagem de ocorrências, cockpit operacional. | Protótipo funcional, validação com usuário, documentação, plano de evolução. |

---

## 4. Cases (6 cases na home — 7 no total)

**Nota sobre grid:** O grid de cases na home usa 3 colunas. Com 6 cases, temos 2 linhas completas (simétrico). O case 07 (Classificador de Ocorrências) pode ser o "7º case" ou adicionado em uma página secundária. No MVP, mostre 6 na home e adicione um link "Ver todos os cases".

### Case 01 — Simulador de Custo de Frete (P0)

| Campo | Valor |
|---|---|
| **Título** | Simulador de Custo de Frete |
| **Descrição** | Decomposição de componentes de custo em embarques logísticos. Identifica onde o frete pesa, quais regiões e transportadoras concentram maior custo, e onde há oportunidade de investigação. |
| **Categoria** | Frete e Custo |
| **Ícone** | Truck |
| **Tags** | frete, custo, precificação, componentes, região |
| **Link Demo** | ⚠️ Preencher após deploy no Streamlit Cloud |
| **Link GitHub** | ⚠️ Preencher após criar repo do case |
| **Pergunta de Negócio** | Qual região concentra maior custo por entrega? |
| **Métrica Principal** | Custo por kg, custo por entrega, composição de frete |
| **Decisão Apoiada** | Entender composição e pressão de custo para priorizar negociações |
| **Limitação** | Dados sintéticos. Para uso real, precisa de base de frete do cliente e tabelas contratuais. |

### Case 02 — Mini Torre de Controle de Entregas (P0)

| Campo | Valor |
|---|---|
| **Título** | Mini Torre de Controle de Entregas |
| **Descrição** | Visão acionável de entregas em andamento: status por transportadora, região e canal, alertas de atraso e ocorrências, priorização de follow-up. |
| **Categoria** | Roteirização e SLA |
| **Ícone** | BarChart3 |
| **Tags** | SLA, OTD, atraso, ocorrência, torre de controle |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | Quais entregas exigem ação imediata? |
| **Métrica Principal** | SLA, OTD, tempo de resposta, ocorrências por transportadora |
| **Decisão Apoiada** | Priorizar entregas críticas e follow-ups |
| **Limitação** | Não substitui TMS completo. Dados de entrada dependem da integração disponível. |

### Case 03 — Promessa de Entrega por CEP (P0)

| Campo | Valor |
|---|---|
| **Título** | Promessa de Entrega por CEP |
| **Descrição** | Análise territorial de prazo, custo e risco por CEP5, bairro e região. Ajuda a calibrar promessa de entrega e identificar zonas críticas. |
| **Categoria** | Last Mile e E-commerce |
| **Ícone** | MapPin |
| **Tags** | CEP, last mile, promessa, prazo, risco territorial |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | Qual CEP ou praça tem maior risco de atraso ou insucesso? |
| **Métrica Principal** | Taxa de insucesso, prazo médio por CEP, risco territorial |
| **Decisão Apoiada** | Ajustar prazo, risco e modalidade por região |
| **Limitação** | CEP e geocoding são apoio, não verdade absoluta. Precisa validar com dados reais do cliente. |

### Case 04 — Ship from Store / Origem Ótima (P1)

| Campo | Valor |
|---|---|
| **Título** | Ship from Store / Origem Ótima |
| **Descrição** | Comparação de origens de atendimento (CD, loja, hub) considerando prazo, custo, estoque e capacidade operacional. |
| **Categoria** | Last Mile e E-commerce |
| **Ícone** | Package |
| **Tags** | ship from store, omnichannel, origem, estoque, prazo |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | Qual origem atende melhor: CD, loja, hub ou parceiro? |
| **Métrica Principal** | Custo por origem, prazo por origem, ocupação de estoque |
| **Decisão Apoiada** | Escolher origem considerando prazo, custo, estoque e capacidade |
| **Limitação** | Modelo simplificado. Dados reais de estoque e capacidade são necessários para decisão real. |

### Case 05 — Auditoria de Endereço e Geocoding (P1)

| Campo | Valor |
|---|---|
| **Título** | Auditoria de Endereço e Geocoding |
| **Descrição** | Validação de qualidade de endereços para entrega: geocoding, correção de CEP, identificação de endereços de risco, sugestão de revisão. |
| **Categoria** | Last Mile e E-commerce |
| **Ícone** | MapPin |
| **Tags** | endereço, geocoding, CEP, qualidade, risco |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | Quais endereços precisam de revisão antes da decisão logística? |
| **Métrica Principal** | Score de qualidade de endereço, taxa de geocoding bem-sucedido |
| **Decisão Apoiada** | Bloquear, revisar ou aceitar endereço para análise |
| **Limitação** | Geocoding depende de APIs externas (OpenStreetMap, Google). Endereços brasileiros têm variação de qualidade. |

### Case 06 — KPIs de Armazenagem e Expedição (P2)

| Campo | Valor |
|---|---|
| **Título** | KPIs de Armazenagem e Expedição |
| **Descrição** | Painel de indicadores de CD: ocupação, picking, expedição, SLA interno, backlog. Conecta armazenagem com transporte e entrega. |
| **Categoria** | Operação de CD |
| **Ícone** | Warehouse |
| **Tags** | CD, armazenagem, picking, expedição, SLA, ocupação |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | O atraso de entrega começa no picking, na ocupação ou na expedição? |
| **Métrica Principal** | Ocupação, produtividade de picking, tempo de expedição, backlog |
| **Decisão Apoiada** | Identificar endereços críticos, ocupação e risco de expedição |
| **Limitação** | Dados sintéticos. Para uso real, precisa de integração com WMS/TMS. |

### Case 07 — Classificador de Ocorrências Operacionais (P2)

| Campo | Valor |
|---|---|
| **Título** | Classificador de Ocorrências Operacionais |
| **Descrição** | Classificação automática de textos de ocorrências logísticas (atraso, avaria, endereço incorreto, recusa) usando NLP. Transforma mensagens soltas em categorias acionáveis. |
| **Categoria** | Método e Governança |
| **Ícone** | AlertTriangle |
| **Tags** | IA, NLP, ocorrências, classificação, triagem |
| **Link Demo** | ⚠️ Preencher após deploy |
| **Link GitHub** | ⚠️ Preencher após criar repo |
| **Pergunta de Negócio** | Como transformar mensagens, chamados e justificativas em categorias acionáveis? |
| **Métrica Principal** | Precisão de classificação, tempo de triagem, categorias mais frequentes |
| **Decisão Apoiada** | Organizar textos soltos em categorias, prioridades e resumos com validação humana |
| **Limitação** | IA não decide sozinha exceções críticas. Validação humana obrigatória. Modelo treinado com dados sintéticos. |

---

## 5. Método (5 passos)

| # | Título | Descrição |
|---|---|---|
| 1 | Entendo a dor real | Antes de construir qualquer solução, entender qual decisão está travada. |
| 2 | Mapeio dados e processo | Ver onde a informação nasce, como circula, quem usa e onde quebra. |
| 3 | Crio uma primeira entrega útil | Diagnóstico, estudo, painel, automação, simulador ou protótipo. |
| 4 | Valido com a rotina real | Ajustar linguagem, regra, visual e nível de detalhe. |
| 5 | Documento e evoluo | Deixar claro o uso, limites, próxima evolução e sustentação. |

---

## 6. Seção IA / Vibecoding

| Campo | Valor |
|---|---|
| **Título** | IA como acelerador, não como atalho cego |
| **Descrição** | Uso IA e vibecoding para acelerar análise, automação, documentação e prototipagem. Isso reduz o tempo entre diagnóstico e primeira entrega útil. Mas a decisão continua dependendo de contexto, dados confiáveis, validação humana e entendimento do impacto no negócio. |
| **Exemplos Seguros** | Resumir chamados, classificar ocorrências, gerar documentação inicial, criar protótipos, montar rascunhos de relatórios, apoiar análise exploratória, transformar regras em assistentes consultivos. |
| **Não Prometer** | IA decidindo pagamento de frete sozinha, IA alterando SLA sem validação, IA aprovando exceção crítica, IA substituindo análise operacional, IA como garantia de redução de custo. |

---

## 7. Seção Contato

| Campo | Valor |
|---|---|
| **Título** | Vamos começar por uma leitura simples da sua operação? |
| **Descrição** | Me conte qual problema mais pesa hoje: frete, atraso, reentrega, relatório manual, indicador inconsistente, promessa de entrega ou falta de visibilidade. A partir disso, eu te mostro o próximo passo mais lógico. |
| **CTA Botão** | Solicitar leitura inicial |
| **Campos Formulário** | Nome (obrigatório), Email (obrigatório, validação), Empresa (opcional), Principal dor/desafio (textarea, opcional) |
| **Contato Direto** | Email: ⚠️ [preencher], LinkedIn: ⚠️ [preencher] |

---

## 8. Footer

| Campo | Valor |
|---|---|
| **Copyright** | © 2026 Lucas Batista. Todos os direitos reservados. |
| **Links Sociais** | LinkedIn, GitHub, Email |
| **Declaração de Limitação** | Trabalho com dados públicos, sintéticos, anonimizados ou fornecidos pelo cliente com finalidade definida. Dados sensíveis, bases restritas, credenciais e informações pessoais são tratados com cuidado, acesso controlado e validação de uso. |

---

*Documento de conteúdo. Versão revisada. Atualize quando os textos ou cases evoluírem.*
