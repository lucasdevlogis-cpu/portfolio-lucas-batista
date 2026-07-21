# Cases demonstráveis

Documentação de método e limitações das 10 provas publicadas.

| ID   | Slug                        | Documento                                         |
| ---- | --------------------------- | ------------------------------------------------- |
| `01` | `precificacao_frete`        | [Precificação](01-precificacao-frete.md)          |
| `02` | `mini_torre_controle`       | [Torre de controle](02-torre-controle.md)         |
| `03` | `promessa_cep`              | [Promessa por CEP](03-promessa-cep.md)            |
| `04` | `ship_from_store`           | [Ship from Store](04-ship-from-store.md)          |
| `05` | `auditoria_endereco`        | [Auditoria de endereço](05-auditoria-endereco.md) |
| `07` | `classificador_ocorrencias` | [Classificador](07-classificador-ocorrencias.md)  |
| `08` | `cvrp_urbano`               | [CVRP](08-cvrp-urbano.md)                         |
| `09` | `vrptw_ultima_milha`        | [VRPTW](09-vrptw-ultima-milha.md)                 |
| `10` | `rede_interhubs`            | [Rede inter-hubs](10-rede-interhubs.md)           |
| `11` | `tsp_baseline_sp`           | [TSP](11-tsp-baseline-sp.md)                      |

Setup comum, a partir da raiz:

```powershell
pip install -r requirements-dev.txt
npm run demos:build
streamlit run apps/demos/app.py
```

O catálogo canônico de IDs, slugs e pages é
`contracts/demo-catalog.json`. Não manter uma segunda tabela em código.
