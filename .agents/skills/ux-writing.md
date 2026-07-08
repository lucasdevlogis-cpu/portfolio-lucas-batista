# Skill: UX Writing e Copy

## Descricao
Guia de escrita para o portfolio Executive Proof System. O texto deve ser direto, profissional e escaneável em segundos. Cada palavra deve justificar sua existência.

## Principios Fundamentais

### 1. Economia Maxima
- Remova 50% do texto na primeira revisão, depois mais 20%
- Se uma palavra não muda o significado, ela vai embora
- Parágrafos: máximo 3 linhas no desktop
- Frases: máximo 20 palavras

### 2. Tom de Voz
- **Direto:** "Reduzi custo de frete em 28%" > "Fui responsável pela redução significativa dos custos"
- **Confiante:** Sem hesitação, sem "talvez", "acho", "creio"
- **Profissional:** Sem gírias, sem emojis, sem exclamações excessivas
- **Honesto:** "Dados sintéticos, premissas visíveis e limitações declaradas"
- **Acessível:** Jargão técnico apenas quando necessário, sempre com contexto
- **Editorial premium:** autoridade sem exageros; tono de dossiê, não de pitch

### 3. Estrutura de Secoes

**Hero (máx 40 palavras)**
```
Label: DOSSIÊ EXECUTIVO
Título: Lucas Farias Batista
Headline: Operações logísticas com dados, produto interno, IA aplicada e impacto mensurável
Subheadline: +10 anos conectando execução diária a indicadores em transporte, varejo e e-commerce.
CTAs: Ver provas técnicas + Entrar em contato
Provas rápidas: +10 anos | +R$ 20M impacto | 10 provas navegáveis
```

**Card de Prova (máx 30 palavras)**
```
Número: 01
Título: Simulador de Custo de Frete
Categoria: Frete e Custo
Problema: Qual região concentra maior custo por entrega?
Métrica: -28% no custo médio de frete
Link: Ver demo
```

**Experiência Profissional (máx 25 palavras por cargo)**
```
Período: Fev/2025 — Atual
Cargo: Analista de Transportes Sr
Empresa: GRUPO SBF
Bullets (máx 2, foco em resultado):
  - Redução de 28% no custo médio de frete B2B
  - Dashboards de SLA/OTD para decisões diárias
```

## Palavras Proibidas
Substitua estas palavras/frases por alternativas mais diretas:

| Em vez de... | Use... |
|-------------|--------|
| Fui responsavel por | Gerenciei / Liderei / Reduzi |
| Realizei a implementacao de | Implementei |
| Fui encarregado de | Fui responsável por (se necessário, remova) |
| De forma significativa | (remova, use o número) |
| Com o objetivo de | Para |
| No que tange a | Sobre |
| Nesse sentido | (remova) |
| Vale ressaltar que | (remova) |
| Como pode ser observado | (remova) |
| Diante do exposto | (remova) |
| Perante o contexto | (remova) |
| Nao obstante | (remova) |
| Alem disso | (remova ou use "Também") |
| Por conseguinte | Então / Por isso |
| Doravante | De agora em diante (ou remova) |

## Padrões por Elemento

### Labels de Secao (Eyebrows)
- SEMPRE uppercase
- SEMPRE tracking amplo (`tracking-[0.12em]` a `tracking-[0.18em]`)
- SEMPRE `text-xs` (12px)
- SEMPRE cor warm-accent (light) ou on-dark-accent (dark)
- Máximo 3 palavras
- Exemplos: "PROVAS TÉCNICAS", "PERFIL PROFISSIONAL", "TRAJETÓRIA"

### Títulos de Secao
- Máximo 6 palavras
- Sem ponto final
- Preferencialmente com verbo ou ação
- Fonte Source Serif 4
- Exemplos bons: "Cases com evidência navegável", "Provas técnicas em ação"
- Exemplos ruins: "A seção das provas técnicas que foram desenvolvidas"

### Subtítulos / Leads
- Uma única frase
- Máximo 15 palavras
- Função: contextualizar o título, não explicar tudo
- Exemplo bom: "Dez provas navegáveis para avaliar raciocínio operacional."
- Exemplo ruim: "Nesta seção você encontrará dez provas técnicas que foram cuidadosamente desenvolvidas..."

### CTAs (Call to Action)
- Verbo no infinitivo + objeto
- Máximo 4 palavras
- Exemplos: "Ver provas", "Abrir demo", "Ver no LinkedIn", "Baixar CV"
- Sempre acompanhar com ícone (ArrowRight, ExternalLink, Download, PlayCircle)

### Estatísticas
- Formato: número + contexto em 2-3 palavras
- Exemplo: "+10 anos" / "+R$ 20M impacto" / "10 provas navegáveis"
- Sempre usar o sinal + ou - para indicar direção
- Números arredondados (não: +R$ 20.350.000, sim: +R$ 20M)

## Anti-Padrões (Nunca Faça)

### ❌ "Parede de Texto"
```
// RUIM — 47 palavras, 4 linhas
"Atuo na interseção entre logística, analytics e tecnologia para reduzir custo,
melhorar SLA e traduzir operação em resultado financeiro. Mais de 10 anos conectando
execução diária a indicadores, automações e decisões em transporte, varejo, e-commerce
e indústria."

// BOM — 12 palavras, 2 linhas
"Operações logísticas com dados, IA aplicada e impacto mensurável.
+10 anos em transporte, varejo e e-commerce."
```

### ❌ "CV no Portfolio"
```
// RUIM — Bullet com atividades
- Realizava o acompanhamento diário dos KPIs de transporte
- Efetuava a análise de rotas e performance de transportadoras
- Elaborava dashboards para acompanhamento da diretoria

// BOM — Bullet com resultados
- Redução de 28% no custo médio de frete via renegociação B2B
- Dashboards de SLA/OTD para decisões diárias da operação
```

### ❌ "Tom Acadêmico"
```
// RUIM
"Portfólio reorganizado como dossiê de fit: evidências de julgamento operacional,
clareza analítica, capacidade de prototipagem e comunicação com diretoria."

// BOM
"Portfólio estruturado para triagem rápida de headhunters."
```

## Checklist de Copy
Antes de finalizar qualquer seção, verifique:
- [ ] Texto total reduzido em pelo menos 50% da versão inicial
- [ ] Todas as frases têm 20 palavras ou menos
- [ ] Cada parágrafo tem 3 linhas ou menos
- [ ] Nenhuma palavra da lista "Proibidas" está presente
- [ ] Estatísticas usam formato número + contexto curto
- [ ] CTAs têm verbo no infinitivo + ícone
- [ ] Labels estão em uppercase com tracking amplo
- [ ] Não há redundância com outras seções
- [ ] Copy vem de `data/content.ts` (não hardcoded)
