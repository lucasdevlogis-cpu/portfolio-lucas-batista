# Skill: Mobile-First

> **Canônico:** [`docs/MOBILE_SPEC.md`](../../docs/MOBILE_SPEC.md) · Arquitetura: [`docs/ARQUITETURA.md`](../../docs/ARQUITETURA.md)

## Princípios

1. Implementar primeiro em **375px**; depois desktop.
2. Touch targets ≥ **44×44px** (CTAs principais preferem 48–56px).
3. Fonte mínima **14px** no mobile.
4. Sem overflow horizontal.
5. Performance: LCP < 2.5s, CLS < 0.1.

## Mapa rápido (< 1024px)

| Área | Comportamento |
|------|----------------|
| Header | Sticky · `MobileNav` |
| Hero | Stack vertical · sem cockpit (arquivado) |
| EvidenceStrip | 3 métricas em stack/grid responsivo |
| Cases âncora | 1 coluna · thumbs 16:9 · CTAs full-width |
| CaseLibrary | Cards empilhados (tabela só ≥ `lg`) · filtros em pills |
| DemoModal | Contexto colapsável · preview · “Abrir em tela cheia” |
| Trajetória | Cards full-width · selo Atual só sem data final |
| Contato | CTAs em cards tocáveis |

## Nomes corretos

- `CaseLibrary` (não `CaseLibraryDesktop`)
- Sem `ProfileCockpit` / `LogisticsIntelligenceCockpit` na homepage
