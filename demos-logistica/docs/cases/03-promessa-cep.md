# Promessa de Entrega por CEP

**Pergunta de negócio:** Qual CEP ou praça tem maior risco de atraso ou insucesso?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/promessa_cep.py` |
| URL | `/promessa_cep` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/promessa_cep.py
```

## Abordagem

Score heurístico combinando insucesso, prazo e custo por CEP5. Mapa Folium, heatmap territorial e export CSV.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

CEP e geocoding são apoio, não verdade absoluta. Precisa validar com dados reais do cliente.
