# Especificação mobile

> Mobile-first em 375 px. Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

## Critérios globais

- Sem overflow horizontal.
- Fonte mínima de 14 px; leitura principal em 16 px.
- Alvos de toque com pelo menos 44×44 px; CTA principal entre 48 e 56 px.
- LCP abaixo de 2,5 s como meta de campo; Lighthouse mobile nunca abaixo de 90.
- CLS abaixo de 0,1 e INP abaixo de 200 ms.
- Conteúdo essencial da primeira dobra não depende de animação ou biblioteca visual pesada.

## Comportamento por área

| Área | Mobile |
|---|---|
| Header | nome + menu de 44 px; nav desktop escondida |
| Hero | uma coluna, painel lateral escondido, CTAs full-width |
| EvidenceStrip | cards empilhados, leitura sequencial |
| Perfil | uma coluna e blocos escaneáveis |
| Âncoras | cards em uma coluna, thumbnail 16:9, CTAs sem colisão |
| Biblioteca | filtros em pills horizontais; lista de cards, sem tabela |
| Trajetória | timeline sem linha decorativa apertada; cards full-width |
| Contato | links em grade que vira uma coluna quando necessário |
| Footer | conteúdo empilhado e links com wrap |

## Modal híbrido

### Prova âncora

- `DemoShell` é renderizado diretamente, sem iframe.
- Contexto fica acima ou ao lado da visualização conforme a largura.
- Gráficos e mapas ocupam a largura total e carregam sob demanda.
- Link “Abrir em nova aba” aponta para `/provas/{slug}`.

### Prova complementar

- Preview e contexto aparecem antes do iframe Streamlit.
- Iframe usa `?embed=true`, título descritivo e altura controlada.
- Fallback e link externo permanecem disponíveis.

Em ambos os casos: body bloqueado, ESC fecha, foco fica preso no diálogo e retorna ao acionador.

## Provas âncora

- KPI row: até 3 itens; pode empilhar em telas estreitas.
- Gráficos: rótulos rotacionam apenas quando necessário; tooltip usa pt-BR.
- Mapas: altura de 300 px no mobile; controles não cobrem a legenda principal.
- Método, decisão e limitação continuam visíveis sem esconder a leitura principal.

## Performance

- ECharts e MapLibre são importados apenas ao abrir uma âncora.
- `DemoModal` continua em import dinâmico pelo `CaseDemoLauncher`.
- Thumbnails usam `next/image`, dimensões fixas e lazy loading.
- Analytics só monta na Vercel.
- O hero é estático; motion abaixo da dobra usa transform/opacity e reduced motion.

## Matriz de aceite visual

| Viewport | Uso |
|---|---|
| 375×812 | menor viewport obrigatório |
| 768×1024 | transição tablet / menu desktop |
| 1440×900 | referência desktop para comparação |

Capturas atuais: [`audit/screenshots/after/`](audit/screenshots/after/). O comando `npm run qa:visual` valida o modal e recaptura os três viewports.

## Baseline atual

Lighthouse local mobile em 20/07/2026: **91 performance, 100 acessibilidade, 100 boas práticas, 100 SEO**.

```bash
# com build servido em http://localhost:3000
npm run lighthouse:mobile
npm run qa:visual
```

---

*Atualize quando mudar primeira dobra, modal, breakpoints ou biblioteca visual pesada.*
