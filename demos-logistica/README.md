# Demos Logística — Streamlit Cloud

Demos interativas embedadas no portfólio Lucas Batista via iframe (`?embed=true`).
Adaptam cases de logística BR com amostras curadas, mapas Plotly e gráficos. Resultados demonstrativos.

## Pages (11)

| Slug | Case | Tipo | Frameworks (produção) |
|------|------|------|-----------------------|
| `01_precificacao_frete` | Precificação de Frete BR | Profunda | NTC · ANTT · ANP |
| `02_mini_torre_controle` | Mini Torre de Controle | Pontual | TMS/WMS |
| `03_cvrp_urbano` | Roteirização Urbana CVRP | Profunda | PyVRP · OR-Tools |
| `04_promessa_cep` | Promessa por CEP | Pontual | H3 |
| `05_vrptw_ultima_milha` | VRPTW Última Milha | Profunda | PyVRP |
| `06_rede_interhubs` | Rede Inter-hubs | Profunda | NetworkX |
| `07_classificador_ocorrencias` | Classificador de Ocorrências | Pontual | NLP supervisionado |
| `08_ship_from_store` | Ship-from-Store | Profunda | OMS (Fleetbase) |
| `09_tsp_baseline_sp` | TSP Baseline SP | Pontual | OR-Tools · OSMnx |
| `10_auditoria_endereco` | Auditoria de Endereço | Pontual | DNE · CNEFE |
| `11_sobre_dados_metodos` | Proveniência e métodos | Índice | — |

## Mapeamento landing → demo

A landing Next.js usa `CASE_DEMO_SLUGS` em `data/content.ts` (10 cases demonstráveis). Ex.:

| Case ID (landing) | Page Streamlit |
|-------------------|----------------|
| `08-cvrp-urbano` | `03_cvrp_urbano` |
| `09-vrptw-ultima-milha` | `05_vrptw_ultima_milha` |
| `10-rede-interhubs` | `06_rede_interhubs` |
| `11-tsp-baseline-sp` | `09_tsp_baseline_sp` |

## Estrutura

```
demos-logistica/
  app.py                 # home (mapa herói + cards navegáveis)
  paths.py               # DATA_DIR
  lib/                   # brand, viz, geo, frete, ui
  data/raw/              # amostras curadas do Brasil (fonte)
  data/*.csv             # datasets construídos (build_datasets)
  pages/                 # 11 demos
  scripts/
    build_datasets.py    # gera CSVs com seed fixa
    smoke_test.py        # testa 12/12 pages (AppTest)
  .streamlit/config.toml # tema marca + toolbarMode minimal
```

## UI compartilhada (`lib/ui.py`)

| Função | Uso |
|--------|-----|
| `page_setup()` | Config + tema + CSS |
| `hero()` | Primeira dobra: título, frameworks, pergunta, métrica |
| `section()` | Cabeçalho de seção padronizado |
| `plot()` | Plotly sem modebar, largura total |
| `sidebar_brand()` | Marca + link "Todas as demos" |
| `kpi_row()` | Linha de KPIs |
| `method_expander()` / `provenance_expander()` | Expanders padrão |
| `footer()` | Rodapé com disclaimer |

## Rodar localmente

```bash
cd demos-logistica
pip install -r requirements.txt
python scripts/build_datasets.py
python scripts/smoke_test.py   # meta: 12/12 pages OK
streamlit run app.py
```

Abra <http://localhost:8501>.

## Dados

CSVs curados em `data/raw/`. O `build_datasets.py` expande com seed fixa (reprodutível) para densidade de mapas e escreve em `data/`.

**Limitação:** todos os resultados são demonstrativos — não substituem tabela comercial, ANTT vigente, TMS/WMS ou base postal.

## Embed na landing

O componente `DemoModal` adiciona `?embed=true`. Ex.:

```
https://SUA-URL.streamlit.app/06_rede_interhubs?embed=true
```

O modal também oferece link "Abrir em nova aba" (URL sem `?embed=true`).
