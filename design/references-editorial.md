# Referências editoriais — pass Hero / Cases / Modal

> Artefato da Fase 0. Fonte para frames Figma v3 e implementação React. **Não** substitui `design.md` (atualizado na Fase 5).

## Referências analisadas

| Fonte | O que extrair |
|-------|----------------|
| [Stripe Press / Tacit](https://press.stripe.com) | Tipografia manda; whitespace generoso; hierarquia de leitura longa; credibilidade sem ornamento |
| [Linear marketing](https://linear.app) | Hero assimétrico; headline display com tracking negativo; um acento por tela; densidade baixa |
| [Refero — Linear DS](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1) | Max-width ~1200px; gaps verticais ~96px; evitar grid 3 colunas homogêneo |

## Usar (padrões editoriais)

- **Headline display** — Inter bold, tracking tight, uma ideia por bloco
- **Eyebrow** — 11px uppercase, letter-spacing positivo, cor accent-contrast
- **Pull quote de métrica** — linha `domínio · métrica` em peso semibold, sem ícone decorativo
- **Rule tipográfica** — `border-t` hairline para separar pergunta de negócio (não box teal)
- **Hero 2 colunas desktop** — narrativa esquerda; brief strip direita (stats + contato)
- **Cases destaque assimétrico** — 1 card featured largo + 2 compactos
- **Biblioteca em lista** — rows com underline hover, filtros como tabs (border-bottom)
- **Modal contexto** — faixa 2 colunas pergunta/decisão + métrica em destaque tipográfico

## Evitar (padrões “landing IA”)

- Pill badges com `backdrop-blur`
- `border-l-4` em todos os cards
- Ícone Lucide dentro de quadrado `bg-primary/5` repetido
- Framer stagger em cada seção
- Grid 3×N de cards idênticos
- Gradiente radial + grade decorativa no hero
- Labels uppercase em grid 2×2 no modal

## Tokens derivados (implementação)

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-eyebrow` | 11px / 0.06em tracking | Categoria de case |
| `--text-display` | clamp(2.25rem, 5vw, 3.75rem) | Hero headline |
| `--text-lede` | 1.125rem / 1.6 | Subheadline |
| `--prose-width` | 42rem | Coluna narrativa |
| `--brief-width` | 22rem | Coluna stats/contato |
