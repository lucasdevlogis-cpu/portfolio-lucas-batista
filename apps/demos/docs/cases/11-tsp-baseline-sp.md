# TSP Baseline — São Paulo

**Pergunta de negócio:** Quanto a heurística reduz a rota frente à ordem de cadastro?

## Demo

| Item   | Valor                      |
| ------ | -------------------------- |
| Página | `pages/tsp_baseline_sp.py` |
| URL    | `/tsp_baseline_sp`         |
| Tipo   | Profunda (tabs)            |

## Como rodar

```bash
streamlit run pages/tsp_baseline_sp.py
```

## Abordagem

A ordem de cadastro forma o baseline operacional. O domínio calcula uma rota
fechada com nearest-neighbor, usando índice original como desempate estável, e
aplica uma melhoria local 2-opt. Na amostra, a distância cai de 34,5 km para
28,0 km (19,0%); o resultado é uma referência heurística, não um ótimo global
garantido.

## Stack

Python, Pandas, Haversine, nearest-neighbor, 2-opt, Plotly e Folium no laboratório;
React/Next, ECharts e MapLibre na prova pública.

## Limitações

Os segmentos são geodésicos, em linha reta, e o tempo usa velocidade constante.
A prova não modela tráfego, capacidade ou SLA. Uma decisão real precisa validar
a sequência em matriz rodoviária e com as restrições da operação.
