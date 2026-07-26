# Roadmap e fila ativa

Atualizado em 26/07/2026. Esta é a única fila operacional do projeto.

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

## Concluído — P1: retirar Streamlit da apresentação pública

- [x] Promessa de entrega por CEP — mapa territorial e risco.
- [x] Ship from Store — comparação multicritério de origem.
- [x] Rede inter-hubs — mapa de rede e custo por corredor.
- [x] VRPTW — sequência temporal e violações de janela.
- [x] Auditoria de endereço — qualidade e exceções territoriais.
- [x] TSP — baseline didático de otimização.
- [x] Classificador de ocorrências — regras explicáveis e governança humana.

As sete complementares foram migradas para rotas React consumindo snapshots
Python. As dez provas públicas agora usam o mesmo shell no modal e nas rotas
`/provas/{slug}`, sem iframe ou dependência de runtime do laboratório Streamlit.
O Classificador publica regras determinísticas, amostra curada e revisão humana
obrigatória sem alegar NLP, modelo treinado ou confiança calibrada.

## P2 — diferenciação

- [ ] criar uma visão comparativa entre provas por decisão e método;
- [x] instrumentar abertura, permanência e CTA das provas com payload fechado e
      testes de privacidade;
- [ ] confirmar custom events no dashboard quando o plano do provedor oferecer
      essa capacidade; pageviews seguem disponíveis sem dependência paga;
- [ ] publicar o case de KPIs de CD apenas com narrativa causal completa;
- [x] atualizar OG image, ícone e CV para o mesmo sistema visual;
- [ ] avaliar domínio próprio após aprovação do produto.

## Próximos passos imediatos

1. Criar a visão comparativa entre provas por decisão e método.
2. Confirmar a capacidade de custom events do ambiente Vercel sem contratar ou
   acoplar uma dependência paga obrigatória.
3. Definir a narrativa causal e o contrato de dados do case de KPIs de CD.

## Critério de pronto do P0

- landing e três âncoras parecem partes do mesmo produto;
- não há cardismo, arco-íris, texto minúsculo ou placeholder visual;
- mapas e gráficos têm tema autoral, legenda e decisão explícita;
- teclado, foco, reduced motion e contraste permanecem íntegros;
- preview público aprovado antes do merge na `main`.
