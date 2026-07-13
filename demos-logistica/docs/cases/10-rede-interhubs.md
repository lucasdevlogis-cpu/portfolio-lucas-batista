# Rede Inter-hubs / Corredores

**Pergunta de negócio:** Quais corredores concentram custo e volume para priorizar consolidação?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/rede_interhubs.py` |
| URL | `/rede_interhubs` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/rede_interhubs.py
```

## Abordagem

Custo por tonelada por corredor, ranking de lanes e visualização de rede (NetworkX + mapa).

## Stack

Python, Pandas, Plotly, Folium, NetworkX, Streamlit.

## Limitações

Rede e volumes sintéticos. Produção integra TMS, tarifário e capacidade real dos hubs.
