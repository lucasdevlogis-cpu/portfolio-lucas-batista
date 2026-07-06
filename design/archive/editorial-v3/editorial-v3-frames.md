# Editorial v3 — frames (spec histórica)

> Spec high-fidelity para Hero, Cases e DemoModal. Referências em `references-editorial.md`.
> Nodes v2 herdados: `2:31` CaseCard, `2:38` ProfileStrip, `3:15` DemoModal.

## Hero / editorial — 1440 × 720

| Zona | Desktop | Mobile 390 |
|------|---------|--------------|
| Layout | Grid 2 col: `1fr` + `22rem` (brief) | Stack vertical |
| Fundo | `surface-dark` sólido, glow hero mínimo, **sem grade** | Idem |
| Esquerda | Lede nome·título → eyebrow texto → display headline → lede → 2 CTAs | Ordem: nome → headline → stats → CTAs → contato |
| Direita | Brief strip: 3 stats + rule + LinkedIn/email | Stats inline após headline |

## Case / briefing — card `2:31`

- Eyebrow: 11px uppercase accent-contrast
- Título: 20px bold primary
- Pull quote: `{categoria} · {metricaResumo}` semibold
- Rule `border-t` + pergunta lede muted
- CTA full-width primary
- Variante featured: padding 32px, título 24px

## Cases / section — 1440

- SectionLead (sem risquinho teal)
- Destaques: grid assimétrico — 1 featured `row-span-2` + 2 compactos
- Biblioteca: lista editorial com CategoryTabs underline
- Roadmap: lista compacta (mantida)

## DemoModal — `3:15`

- Header: título + link externo
- Faixa 2 col: pergunta | decisão
- Métrica em bloco tipográfico grande
- Tags inline; limitação footnote
- Mobile: contexto colapsável (`details`)
- Iframe: lazy on-demand mobile (preservado)
