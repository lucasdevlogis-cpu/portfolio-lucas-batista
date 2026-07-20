# Oportunidades das demos

> Backlog técnico complementar à fila principal em [`P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md). A auditoria extensa anterior foi absorvida pelas fases já concluídas; este arquivo mantém apenas decisões ainda úteis.

## Estado atual

- 3 provas âncora em React/Next: frete, torre de controle e CVRP.
- ECharts para gráficos e MapLibre para mapas, ambos carregados sob demanda.
- Snapshots gerados pelo Python e validados no TypeScript.
- 7 provas complementares em Streamlit com Plotly/Folium.
- Tema Streamlit centralizado em `lib/ui.py` e tokens gerados em `lib/brand.py`.
- Smoke 13/13 e slugs 10/10.

## Fase 2 — Streamlit complementar

| Prioridade | Oportunidade | Critério |
|---:|---|---|
| 1 | Reduzir CSS baseado em `data-testid` e seletores internos | atualizações do Streamlit não quebram a hierarquia principal |
| 2 | Encurtar primeira dobra das sete demos | pergunta, até 3 KPIs, visual principal e decisão antes da exploração |
| 3 | Padronizar rótulos semânticos | nenhum emoji de status; risco, atenção e sucesso com texto e cor |
| 4 | Revisar gráficos Plotly | tooltips pt-BR, legendas contidas, escala honesta e sem arco-íris |
| 5 | Revisar mapas Folium | atribuição, legenda, contraste e leitura em embed |
| 6 | Separar dados gerados | `data/raw/` e `data/generated/` com paths explícitos |

## Fase 3 — expansão React, se comprovada

Só migrar outra prova para Next quando ela:

1. for relevante para avaliação profissional;
2. ganhar clareza material com layout controlado;
3. tiver contrato de snapshot determinístico;
4. não exigir interação exploratória que o Streamlit atende melhor.

Candidatas naturais: promessa por CEP e última milha com janelas. Não migrar todas por uniformidade estética.

## Ferramentas sob avaliação

| Ferramenta | Usar quando | Evitar quando |
|---|---|---|
| Streamlit Custom Components | um componente React compartilhado reduzir manutenção real | apenas para esconder limitações cosméticas |
| TanStack Table | uma prova React exigir sorting/filtros ricos | tabela pequena e somente leitura |
| OSRM/ORS | rota viária real for parte da evidência | depender de API externa para o fluxo principal |
| Vercel Speed Insights | houver necessidade de monitoramento contínuo | apenas para elevar quantidade de ferramentas |

`streamlit-echarts`, `streamlit-aggrid`, Dash, Panel e NiceGUI não entram por padrão. A arquitetura híbrida atual já resolve o controle visual das âncoras sem multiplicar frameworks.

## Regras visuais

- Cada demo responde pergunta, decisão, método e limitação.
- Até 3 KPIs antes do visual principal.
- Cor é semântica, não categórica por decoração.
- Linha de referência não pode achatar a série principal.
- Moeda, percentual e distância usam pt-BR.
- Mapa declara se usa linha reta, coordenada aproximada ou malha viária.
- CTA final leva à próxima prova ou ao contato; não simula produto inexistente.

---

*Promova um item para a fila principal somente quando houver escopo, critério de aceite e prioridade definida.*
