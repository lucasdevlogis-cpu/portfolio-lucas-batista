# Demos Logística — motor Python

Subprojeto Streamlit das provas de logística. As três âncoras também exportam snapshots para a camada React; as sete complementares continuam embedadas na landing com `?embed=true`.

## Cases

| Case | Slug | Superfície pública principal |
|---:|---|---|
| 01 | `precificacao_frete` | React + Streamlit |
| 02 | `mini_torre_controle` | React + Streamlit |
| 03 | `promessa_cep` | Streamlit |
| 04 | `ship_from_store` | Streamlit |
| 05 | `auditoria_endereco` | Streamlit |
| 07 | `classificador_ocorrencias` | Streamlit |
| 08 | `cvrp_urbano` | React + Streamlit |
| 09 | `vrptw_ultima_milha` | Streamlit |
| 10 | `rede_interhubs` | Streamlit |
| 11 | `tsp_baseline_sp` | Streamlit |

`11_sobre_dados_metodos.py` é documentação de proveniência, não um case numerado. O prefixo do arquivo não aparece na URL.

## Estrutura

```text
app.py                            índice das demos
paths.py                          DATA_DIR
data/raw/                         amostras curadas
data/*.csv                        datasets gerados atualmente
lib/                              domínio, UI, gráficos, mapas e tabelas
pages/                            demos e página de métodos
scripts/build_datasets.py         geração determinística
scripts/export_demo_snapshots.py  Python → JSON das 3 âncoras
scripts/smoke_test.py             13 checagens
scripts/validate_slugs.py         10 slugs
.streamlit/config.toml            tema e toolbar mínima
```

A separação dos CSVs gerados para `data/generated/` está na próxima fase e exige migração coordenada de todos os leitores.

## UI compartilhada

`lib/ui.py` concentra setup, hero, KPIs, seções, gráficos, insights semânticos, método, proveniência, navegação e footer. Cores e dimensões vêm de `lib/brand.py`, gerado por `npm run tokens:sync` na raiz.

## Rodar

```bash
pip install -r requirements.txt
python scripts/build_datasets.py
python scripts/smoke_test.py
python scripts/validate_slugs.py
streamlit run app.py
```

Abra <http://localhost:8501>. Para conferir embed, adicione `?embed=true` à URL da page.

## Exportar âncoras

Na raiz do monorepo:

```bash
npm run demos:export
npm run demos:validate
```

Os JSONs em `data/demo-snapshots/` são artefatos de apresentação. Cálculos permanecem em Python; não os replique no TypeScript.

## Limitação

Dados são sintéticos, públicos ou anonimizados. Resultados não substituem tabela comercial, ANTT vigente, malha viária real, TMS/WMS ou governança operacional.
