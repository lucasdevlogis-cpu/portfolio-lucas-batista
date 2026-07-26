# Auditoria de Endereço

**Pergunta de negócio:** Quais endereços estão prontos, precisam de revisão ou
devem ser bloqueados antes da validação logística?

## Demo

| Item      | Valor                                              |
| --------- | -------------------------------------------------- |
| Página    | `pages/auditoria_endereco.py`                      |
| URL       | `/auditoria_endereco`                              |
| Rota web  | `/provas/auditoria_endereco`                       |
| Contrato  | `contracts/demo-snapshots/auditoria_endereco.json` |
| Domínio   | `domain/auditoria_endereco.py`                     |
| Amostra   | 60 endereços sintéticos                            |
| Cobertura | 45 coordenadas válidas; 15 bloqueadas fora do mapa |

## Como rodar

```bash
streamlit run pages/auditoria_endereco.py
```

## Abordagem

O score parte de 100 e aplica penalidades determinísticas para CEP inválido,
logradouro ou número ausente, coordenada inválida ou fora dos limites do Brasil
e fonte de baixa confiança. Os thresholds separam a fila em:

- Alta (score ≥ 80): aceitar para validação;
- Média (50–79): revisar antes de validar;
- Baixa (< 50): bloquear até corrigir o cadastro.

Os alertas são ocorrências acumuláveis: um mesmo endereço pode acionar mais de
uma regra. O mapa mostra apenas coordenadas finitas dentro dos limites
territoriais definidos pelo protótipo.

## Stack

Python, Pandas, Plotly, Folium, Streamlit, React, ECharts e MapLibre.

## Limitações

Esta prova demonstra triagem de prontidão. Não consulta DNE/CNEFE, não chama API
de geocoding e não corrige CEP ou endereço. Em produção, os casos aceitos ainda
passariam por validação postal/geocoding, score de confiança e revisão humana.
