# Última Milha com Janelas (VRPTW)

**Pergunta de negócio:** A sequência de entregas respeita as janelas prometidas ao cliente?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/vrptw_ultima_milha.py` |
| URL | `/vrptw_ultima_milha` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/vrptw_ultima_milha.py
```

## Abordagem

Sequenciamento earliest-deadline-first vs ordem de cadastro. KPIs de violação de SLA e mapa de rotas.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Velocidade média constante. Produção usaria PyVRP com time windows e trânsito real.
