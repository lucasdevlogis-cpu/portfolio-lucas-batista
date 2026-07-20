# Tokens — Executive Proof System

> A única fonte editável é [`tokens.json`](tokens.json). Rode `npm run tokens:sync` para gerar `app/design-tokens.css` e `demos-logistica/lib/brand.py`.

## Paleta

| Família | Token | Valor | Uso |
|---|---|---:|---|
| Base | `background` / `editorial` | `#f5f2ed` | fundo principal |
| Base | `editorial2` | `#e8e4dc` | alternância de seção |
| Base | `card` | `#ffffff` | leitura e painéis |
| Texto | `ink` / `foreground` | `#07111f` | texto forte e superfícies escuras |
| Marca | `primary` | `#153451` | azul petróleo técnico |
| Marca | `accent` | `#16a99c` | sinal visual em fundo escuro ou decorativo |
| Marca | `accentContrast` | `#0d746d` | texto/fundo acessível em superfícies claras |
| Marca | `warmAccent` | `#c9983f` | sinal editorial decorativo |
| Marca | `warmAccentContrast` | `#7a5a1a` | texto dourado em fundo claro |
| Escuro | `surfaceDark` | `#07111f` | hero e contato |
| Escuro | `surfaceDark2` | `#101b2b` | elevação escura |
| Escuro | `surfaceDark3` | `#17263a` | painéis escuros |
| Leitura | `mutedForeground` | `#556070` | texto secundário |
| Leitura | `border` | `#c8c2b8` | divisórias |
| Dark text | `textOnDarkMuted` | `#aeb9c7` | texto secundário em dark |
| Dark text | `textOnDarkAccent` | `#5eead4` | destaque em dark |
| Estado | `success` | `#16865a` | sucesso |
| Estado | `warning` | `#b7791f` | atenção |
| Estado | `danger` | `#c2413b` | erro/risco |

`accent` e `warmAccent` não são cores de texto pequeno em fundo claro. Use as variantes `Contrast`.

## Tipografia

- Heading: Source Serif 4.
- Corpo: Inter.
- Corpo principal: 16 px; metadados nunca abaixo de 14 px.
- Eyebrow: 12 px, peso alto, uppercase, tracking amplo.

## Raio e elevação

| Token | Valor |
|---|---:|
| `radius.base` | `0.875rem` |
| `radius.sm` | `0.55rem` |
| `radius.md` | `0.7rem` |
| `radius.lg` | `0.875rem` |
| `radius.xl` | `1.2rem` |
| `radius.pill` | `999px` |

Sombras são geradas no CSS como `editorial`, `card`, `elevated`, `premium` e `glow`. Use elevação para hierarquia, não em todos os blocos.

## Dimensões de visualização

| Uso | Valor |
|---|---:|
| Gráfico meia coluna | 340 px |
| Gráfico full | 430 px |
| Gráfico embed | 320 px |
| Mapa full | 460 px |
| Mapa embed | 330 px |
| Container das demos | 1180 px |

## Fluxo de alteração

1. Editar `design/tokens.json`.
2. Rodar `npm run tokens:sync`.
3. Revisar o diff dos dois arquivos gerados.
4. Rodar lint, typecheck, build, smoke Streamlit e QA visual.

Não editar `app/design-tokens.css` ou `demos-logistica/lib/brand.py` manualmente.
