# Tokens

`design/tokens.json` é a única fonte editável. Rode:

```powershell
npm run tokens:sync
```

O gerador atualiza `app/design-tokens.css`,
`apps/demos/presentation/tokens.py` e `.streamlit/config.toml`.
`npm run tokens:check` falha se qualquer consumidor divergir.

## Paleta

| Papel              | Token                     | Valor     |
| ------------------ | ------------------------- | --------- |
| Fundo              | `background`, `editorial` | `#121214` |
| Superfície         | `card`                    | `#1A1A1D` |
| Texto principal    | `foreground`, `ink`       | `#F4F2EC` |
| Ação e índice      | `primary`                 | `#F97316` |
| Resultado positivo | `accent`, `success`       | `#4EDEA3` |
| Texto secundário   | `mutedForeground`         | `#AAA9B0` |
| Borda              | `border`                  | `#3A3A3F` |
| Atenção            | `warning`                 | `#F4B860` |
| Erro               | `danger`                  | `#FF6B5F` |

Laranja indica ação, seleção e referência técnica. Verde fica reservado para
ganho e estado positivo. Gráficos usam no máximo quatro cores funcionais.

## Tipografia

- títulos e números de impacto: Hanken Grotesk;
- corpo e interface: Inter;
- labels, índices e dados: JetBrains Mono.

## Geometria

- container público e analítico: 1280 px;
- cantos entre 2 e 8 px;
- regras de 1 px como principal separador;
- sombras somente em modal e elementos flutuantes.

Não usar hex em componentes. Valores visuais novos entram primeiro no JSON.
