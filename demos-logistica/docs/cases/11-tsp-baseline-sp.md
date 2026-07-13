# TSP Baseline — São Paulo

**Pergunta de negócio:** Quanto dá para economizar sequenciando paradas vs ordem de cadastro?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/tsp_baseline_sp.py` |
| URL | `/tsp_baseline_sp` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/tsp_baseline_sp.py
```

## Abordagem

TSP heurístico (nearest neighbor + 2-opt leve) sobre visitas em SP. Baseline comparável para discussão de ganho operacional.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Distâncias euclidianas/retas. Produção exige matriz rodoviária e restrições de frota.
