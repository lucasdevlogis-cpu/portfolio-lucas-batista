# Skill: Design System

> Canônico: [`design/design.md`](../../design/design.md) · [`design/tokens.json`](../../design/tokens.json) · catálogo em [`design/tokens.md`](../../design/tokens.md).

## Fluxo

1. Edite somente `design/tokens.json`.
2. Rode `npm run tokens:sync`.
3. Revise `app/design-tokens.css` e `demos-logistica/lib/brand.py`.
4. Valide landing e Streamlit.

## Princípios

- Source Serif 4 em headings; Inter no corpo.
- Fundo editorial quente, card branco, ink/primary para leitura.
- `accent` e `warmAccent` sinalizam; texto em fundo claro usa `accentContrast` e `warmAccentContrast`.
- Hierarquia por tipografia e espaço antes de borda, badge, sombra ou gradiente.
- Cards `rounded-xl`; elevação curta e sutil.
- Container da landing: `max-w-[1440px]`, paddings `px-5 sm:px-8 lg:px-10 xl:px-12`.
- Seção padrão: `py-14 lg:py-20`.
- Lucide é a única biblioteca de ícones React.
- Motion abaixo da dobra, respeitando reduced motion. O conteúdo LCP do hero é estático.

## Utilitários ativos

`SectionShell`, `EditorialBadge`, `PremiumCard`, `MetricPill`, `.eyebrow`, `.section-title`, `.section-lead`, `.focus-ring`, `.demo-panel`.

Não copie valores hex para skills ou componentes. Se um token não existe, adicione-o na fonte e regenere.
