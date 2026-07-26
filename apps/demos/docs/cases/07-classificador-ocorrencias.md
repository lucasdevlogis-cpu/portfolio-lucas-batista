# Triagem de Ocorrências Operacionais

**Pergunta de negócio:** Como regras explícitas podem apoiar a triagem sem
automatizar decisões críticas?

## Superfícies

| Item          | Valor                                 |
| ------------- | ------------------------------------- |
| Rota pública  | `/provas/classificador_ocorrencias`   |
| Laboratório   | `pages/classificador_ocorrencias.py`  |
| URL do lab    | `/classificador_ocorrencias`          |
| Domínio único | `domain/classificador_ocorrencias.py` |
| Snapshot      | `classificador_ocorrencias.json`      |

## Como rodar o laboratório

```bash
streamlit run apps/demos/app.py
```

## Abordagem

A prova normaliza texto com NFKD e `casefold`, aplica termos e frases com
limites de palavra e expõe as correspondências que justificam cada sugestão.
Empate, ausência de termo e prioridade alta acionam revisão humana. A saída
somente sugere categoria, prioridade e fila; nenhuma ação é executada.

## Evidências canônicas

- 10 textos únicos, sem reamostragem;
- categoria 10/10 no próprio conjunto usado para desenvolver as regras;
- prioridade 9/10 após normalização dos rótulos;
- zero decisões autônomas.

## Governança e limitações

A amostra é curada e não tem conjunto de teste separado. A concordância interna
não demonstra generalização. É proibido usar a saída para aplicar penalidade,
autorizar pagamento, bloquear entrega ou encerrar ocorrência sem decisão
humana.
