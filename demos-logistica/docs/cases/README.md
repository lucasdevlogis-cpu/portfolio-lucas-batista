# Cases demonstráveis — READMEs

Documentação por case do repositório `demos-logistica`. Cada arquivo descreve problema, como rodar, premissas e limitações.

| Case ID | Slug Streamlit | Página |
|---------|------------------|--------|
| `01-precificacao-frete` | `precificacao_frete` | [01-precificacao-frete.md](01-precificacao-frete.md) |
| `02-torre-controle` | `mini_torre_controle` | [02-torre-controle.md](02-torre-controle.md) |
| `03-promessa-cep` | `promessa_cep` | [03-promessa-cep.md](03-promessa-cep.md) |
| `04-ship-from-store` | `ship_from_store` | [04-ship-from-store.md](04-ship-from-store.md) |
| `05-auditoria-endereco` | `auditoria_endereco` | [05-auditoria-endereco.md](05-auditoria-endereco.md) |
| `07-classificador-ocorrencias` | `classificador_ocorrencias` | [07-classificador-ocorrencias.md](07-classificador-ocorrencias.md) |
| `08-cvrp-urbano` | `cvrp_urbano` | [08-cvrp-urbano.md](08-cvrp-urbano.md) |
| `09-vrptw-ultima-milha` | `vrptw_ultima_milha` | [09-vrptw-ultima-milha.md](09-vrptw-ultima-milha.md) |
| `10-rede-interhubs` | `rede_interhubs` | [10-rede-interhubs.md](10-rede-interhubs.md) |
| `11-tsp-baseline-sp` | `tsp_baseline_sp` | [11-tsp-baseline-sp.md](11-tsp-baseline-sp.md) |

## Setup comum

```bash
cd demos-logistica
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
python scripts/build_datasets.py
streamlit run app.py
```

Smoke test: `python scripts/smoke_test.py` (13 checagens).

Embed (modal da landing): acrescente `?embed=true` à URL da page.
