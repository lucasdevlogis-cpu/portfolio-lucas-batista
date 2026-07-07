# Roteirização Urbana (CVRP)

**Pergunta de negócio:** Quantos veículos atendem as entregas e quanta distância dá para economizar?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/03_cvrp_urbano.py` |
| URL | `/cvrp_urbano` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/03_cvrp_urbano.py
```

## Abordagem

Heurística nearest-neighbor com capacidade de veículo. Compara ordem de cadastro vs rota otimizada; mapa com paradas numeradas.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Distância em linha reta. Produção usaria PyVRP/OR-Tools sobre malha viária real.
