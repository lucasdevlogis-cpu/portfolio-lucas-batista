# Tokens

`design/tokens.json` é a única fonte editável. Rode:

```powershell
npm run tokens:sync
```

O gerador atualiza:

- `app/design-tokens.css`;
- `apps/demos/presentation/tokens.py`;
- `.streamlit/config.toml`.

`npm run tokens:check` falha se qualquer consumidor divergir.

## Paleta

| Papel                | Token                              | Valor atual |
| -------------------- | ---------------------------------- | ----------- |
| Fundo editorial      | `background`, `editorial`          | `#f5f2ed`   |
| Texto/escuro         | `foreground`, `ink`, `surfaceDark` | `#07111f`   |
| Superfície           | `card`                             | `#ffffff`   |
| Primária             | `primary`                          | `#153451`   |
| Ação/dado            | `accent`                           | `#16a99c`   |
| Accent com contraste | `accentContrast`                   | `#0d746d`   |
| Ênfase quente        | `warmAccent`                       | `#c9983f`   |
| Texto secundário     | `mutedForeground`                  | `#556070`   |
| Borda                | `border`                           | `#c8c2b8`   |
| Sucesso              | `success`                          | `#16865a`   |
| Atenção              | `warning`                          | `#b7791f`   |
| Erro                 | `danger`                           | `#c2413b`   |

Não usar hex em componentes. A exceção é metadata `themeColor`, que deve
continuar equivalente a `surfaceDark`.

## Tipografia

- corpo: Inter;
- títulos: Source Serif 4;
- fallback definido no JSON para o Streamlit.

## Geometria

- container analítico: 1180 px;
- raios: `sm`, `md`, `lg`, `xl` e `pill`;
- alturas de chart/map têm variantes `half`, `full` e `embed`.

Sombras ficam nos tokens CSS gerados e devem ser usadas com parcimônia.
