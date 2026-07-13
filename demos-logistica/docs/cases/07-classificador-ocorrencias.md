# Classificador de Ocorrências Operacionais

**Pergunta de negócio:** Como transformar mensagens soltas em categorias acionáveis?

## Demo

| Item | Valor |
|------|-------|
| Página | `pages/classificador_ocorrencias.py` |
| URL | `/classificador_ocorrencias` |
| Tipo | Pontual (NLP inline) |

## Como rodar

```bash
streamlit run pages/classificador_ocorrencias.py
```

## Abordagem

Classificação de textos de ocorrências (atraso, avaria, endereço, recusa) com regras/NLP demonstrativo e validação humana.

## Stack

Python, Pandas, Streamlit.

## Limitações

IA não decide sozinha exceções críticas. Validação humana obrigatória. Modelo com dados sintéticos.
