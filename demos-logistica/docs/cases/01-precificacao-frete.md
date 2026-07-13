# Simulador de Custo de Frete

**Pergunta de negócio:** Qual região concentra maior custo por entrega?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/precificacao_frete.py` |
| URL | `/precificacao_frete` |
| Tipo | Profunda (tabs) |

## Como rodar

```bash
streamlit run pages/precificacao_frete.py
```

## Abordagem

Decomposição de componentes de custo (frete base, ad valorem, GRIS, pedágio) por região e transportadora. KPIs de custo por kg e por entrega; gráficos com linhas de referência.

## Stack

Python, Pandas, Plotly, Streamlit.

## Limitações

Dados sintéticos. Para uso real, precisa de base de frete do cliente e tabelas contratuais.
