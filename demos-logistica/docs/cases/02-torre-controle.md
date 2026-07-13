# Mini Torre de Controle de Entregas

**Pergunta de negócio:** Quais entregas exigem ação imediata?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/mini_torre_controle.py` |
| URL | `/mini_torre_controle` |
| Tipo | Pontual (scroll único) |

## Como rodar

```bash
streamlit run pages/mini_torre_controle.py
```

## Abordagem

Monitoramento de status (no prazo, em risco, atrasado, ocorrência aberta) por transportadora e região. Mapa Folium com cluster; KPIs com severidade.

## Stack

Python, Pandas, Plotly, Folium, Streamlit.

## Limitações

Não substitui TMS completo. Dados de entrada dependem da integração disponível.

## Embed

Hero e pergunta de negócio permanecem visíveis mesmo com filtros vazios; ajuste transportadora/região na demo em página completa.
