# Ship from Store / Origem Ótima

**Pergunta de negócio:** Qual origem atende melhor: CD, loja, hub ou parceiro?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/ship_from_store.py` |
| URL | `/ship_from_store` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/ship_from_store.py
```

## Abordagem

Compara origens de atendimento por prazo, custo, estoque e capacidade. Mapa de origens e pedidos.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Modelo simplificado. Dados reais de estoque e capacidade são necessários para decisão real.
