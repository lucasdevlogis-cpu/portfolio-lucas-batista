# Auditoria de Endereço e Geocoding

**Pergunta de negócio:** Quais endereços precisam de revisão antes da decisão logística?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/auditoria_endereco.py` |
| URL | `/auditoria_endereco` |
| Tipo | Pontual com tabs |

## Como rodar

```bash
streamlit run pages/auditoria_endereco.py
```

## Abordagem

Score de qualidade (CEP, logradouro, número, coordenadas, fonte). Níveis Alta/Média/Baixa com ação recomendada. Mapa e export.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Geocoding depende de APIs externas. Endereços brasileiros têm variação de qualidade.
