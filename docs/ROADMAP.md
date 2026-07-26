# Roadmap e fila ativa

Atualizado em 25/07/2026. Esta é a única fila operacional do projeto.

## Norte atual

Transformar o portfólio em um **Executive Proof System** de nível premium. A
landing deve vender julgamento e impacto; as demos devem comprovar o raciocínio
sem parecer aplicativos Streamlit genéricos.

## Concluído — fundação técnica

- [x] consolidar landing, demos, contratos e documentação em um repositório;
- [x] mover o Python para `apps/demos/` e separar domínio de apresentação;
- [x] criar catálogo e snapshots compartilhados;
- [x] consolidar tokens para CSS, Python e Streamlit;
- [x] publicar 3 âncoras React e 7 complementares Streamlit;
- [x] estabilizar build, CI, contratos, smoke e deploy;
- [x] registrar a referência visual fornecida e auditar seus acertos e riscos.

## Concluído — P0: redesign Executivo Brutalista Refinado

Mergeado em 25/07/2026. Linguagem visual aprovada; preview isolado publicado e
aceito.

## Concluído — P1 (parcial): retirar Streamlit da apresentação pública

- [x] Promessa de entrega por CEP — mapa territorial e risco.
- [x] Ship from Store — comparação multicritério de origem.
- [x] Rede inter-hubs — mapa de rede e custo por corredor.
- [x] VRPTW — sequência temporal e violações de janela.
- [x] Auditoria de endereço — qualidade e exceções territoriais.

As cinco foram migradas para rotas React consumindo snapshots Python; o modal
da homepage renderiza inline sem iframe.

## P1 — retirar Streamlit da apresentação pública (continuação)

Ordem de migração orientada a valor de recrutamento e variedade visual:

1. ~~Promessa de entrega por CEP — mapa territorial e risco.~~ ✅
2. ~~Ship from Store — comparação multicritério de origem.~~ ✅
3. ~~Rede inter-hubs — mapa de rede e custo por corredor.~~ ✅
4. ~~VRPTW — sequência temporal e violações de janela.~~ ✅
5. ~~Auditoria de endereço — qualidade e exceções territoriais.~~ ✅
6. TSP — baseline didático de otimização.
7. Classificador de ocorrências — NLP com governança humana.

Cada migração exige snapshot Python, schema validado, rota React, modal inline,
estado de loading/erro e retirada do iframe correspondente.

> **Continuidade:** as próximas migrações (TSP e Classificador) seguem em
> branches dedicadas, integradas sequencialmente para preservar contratos,
> exporter e qualidade visual.

## P2 — diferenciação

- [ ] criar uma visão comparativa entre provas por decisão e método;
- [ ] instrumentar abertura, permanência e CTA das provas;
- [ ] publicar o case de KPIs de CD apenas com narrativa causal completa;
- [x] atualizar OG image, ícone e CV para o mesmo sistema visual;
- [ ] avaliar domínio próprio após aprovação do produto.

## Próximos passos imediatos

1. Migrar TSP com baseline didático de otimização.
2. Migrar Classificador de ocorrências com governança humana.
3. Instrumentar abertura das provas e CTAs sem coletar dados sensíveis.
4. Desativar cada iframe somente depois de sua rota pública equivalente.

## Critério de pronto do P0

- landing e três âncoras parecem partes do mesmo produto;
- não há cardismo, arco-íris, texto minúsculo ou placeholder visual;
- mapas e gráficos têm tema autoral, legenda e decisão explícita;
- teclado, foco, reduced motion e contraste permanecem íntegros;
- preview público aprovado antes do merge na `main`.
