# GAPS — Diagnostico Honesto: Docs vs Site vs Necessidades

> **Data:** 08/07/2026 | **Analista:** Revisao externa de UI/UX | **Atualizacao:** pos-redesign de densidade
>
> **Metodologia:** Comparacao tripla entre (1) documentacao do repo, (2) site em producao, (3) padroes profissionais de portfolio senior.

---

## Resumo Executivo

Seu projeto tem a **documentacao mais completa** que ja vi em um portfolio pessoal. AGENTS.md, CANON.md, design.md e tokens.md sao referencias de excelencia. O redesign premium (commits recentes) parece ter resolvido a maioria dos problemas visuais que eu identifiquei no site ao vivo — o Lighthouse 100/96/100/100 (desktop) e 96/96/100/100 (mobile) comprovam isso.

No entanto, **cinco gaps estrategicos** persistem e merecem atencao.

---

## Gap 1: Acessibilidade (A11Y) — Prioridade ALTA

**Status:** Parcialmente resolvido. `docs/A11Y.md` e `.agents/skills/a11y.md` existem.

**Evidencia:**
- AVALIACAO.md mostra "Acessibilidade 96" no Lighthouse — faltam 4 pontos para 100
- ✅ Checklist WCAG em `docs/A11Y.md`
- Nao ha padrao de contraste além de "Contraste AA" generico no design.md
- Nao ha documentacao de keyboard navigation, skip links, aria-labels, screen readers
- ✅ `prefers-reduced-motion` respeitado em `MotionProvider`
- ProfileCockpit mantido com `aria-label` ou `aria-hidden`

**Impacto:** Um headhunter usando screen reader nao consegue avaliar o portfolio. Além disso, acessibilidade e sinal de profissionalismo em dados — voce trabalha com inclusao operacional, o site deve refletir isso.

**Solucao:** Ver `docs/A11Y.md` (gerado neste pacote).

---

## Gap 2: Mobile-First Detalhado — Prioridade ALTA

**Status:** A reavaliar após redesign de densidade. `docs/MOBILE_SPEC.md` e `.agents/skills/mobile-first.md` existem.

**Evidencia:**
- MAPEAMENTO.md lista componentes mas nao especifica comportamento mobile por componente
- design.md nao tem secao dedicada a mobile
- tokens.md nao tem tokens mobile-specific (touch targets, font sizes mobile, spacing mobile)
- Nao ha spec de navegacao gestual, bottom sheet para modais, ou otimizacao de scroll
- Hero com cockpit SVG em mobile pode consumir viewport excessiva
- ✅ `CaseLibrary` renomeado e responsivo (sidebar desktop + lista mobile)

**Impacto:** Headhunters acessam via LinkedIn no celular. 96 vs 100 no mobile pode significar LCP mais lento ou CLS em componentes especificos.

**Solucao:** Ver `docs/MOBILE_SPEC.md` (gerado neste pacote).

---

## Gap 3: Analytics e Medicao de Conversao — Prioridade MEDIA

**Status:** Pendente no AVALIACAO.md como "Vercel Analytics + dominio custom 🟡"

**Evidencia:**
- Nao ha documentacao de eventos a serem rastreados
- Nao ha definicao de "conversao" para um portfolio (clique em demo? download CV? contato LinkedIn?)
- Nao ha integracao com GA4, Plausible, ou Vercel Analytics documentada
- Nao ha heatmap ou session recording configurado

**Impacto:** Sem analytics, voce nao sabe se headhunters estao abrindo demos, onde desistem, ou qual CTA funciona. Um portfolio sem metricas e como um dashboard sem KPIs.

**Solucao rapida:**
```tsx
// Adicionar no layout.tsx
import { Analytics } from "@vercel/analytics/react";

// Eventos a rastrear (definir em data/content.ts ou lib/analytics.ts):
// - "demo_opened" | "cv_downloaded" | "linkedin_clicked" | "case_filter_used"
```

---

## Gap 4: Tom de Voz e Copy — Prioridade MEDIA

**Status:** Parcial. Copy centralizado em content.ts (otimo), mas sem guia de como escrever.

**Evidencia:**
- AGENTS.md diz "sempre em portugues do Brasil" e "nao hardcode" — mas nao guia COMO escrever
- Nao ha definicao de tom de voz (formal vs acessivel, tecnico vs direto)
- Nao ha lista de palavras proibidas ou substituicoes obrigatorias
- Nao ha limites de caracteres por tipo de conteudo (hero, card, badge)
- Nao ha guia de escrita para casos futuros (o 11º case, por exemplo)

**Impacto:** Quando voce adicionar novos casos ou atualizar copy, nao ha padrao garantindo consistencia. Um tom oscilante entre secoes quebra a credibilidade do "dossie executivo".

**Solucao parcial:** O `ux-writing.md` do pacote anterior de skills pode ser adaptado. Copiar para `.cursor/skills/copy-guide.md` e personalizar com exemplos do seu content.ts.

---

## Gap 5: Testes Além de Build — Prioridade MEDIA

**Status:** Parcialmente resolvido. Existem 8 testes Playwright E2E cobrindo homepage, navegacao, cases, filtros e modal de demo.

**Evidencia:**
- Nao ha Jest/Testing Library para componentes React
- ✅ Playwright E2E ativo: modal, iframe, scroll, filtros, metadados
- Nao ha testes de regressao visual (Chromatic, Percy, Loki)
- Nao ha testes de acessibilidade automatizados (axe-core, pa11y)
- `npm run validate` valida dados, nao comportamento

**Impacto:** Cada mudanca visual exige QA manual completo. Com 15+ componentes, isso nao escala.

**Solucao sugerida:**
```bash
# Instalar (prioridade)
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install -D @axe-core/react

# Testes criticos a automatizar:
# 1. Modal de demo abre e fecha
# 2. Filtros de case funcionam
# 3. Scroll suave para ancoras
# 4. Lighthouse a11y >= 100
# 5. Contraste WCAG AA em todos os componentes
```

---

## Gap 6: Onboarding para Novos Agentes/Devs — Prioridade BAIXA

**Status:** AGENTS.md e excelente mas nao tem um "primeiros 15 minutos".

**Evidencia:**
- Nao ha comando unico de "setup completo" (landing + demos + env + build)
- Nao ha troubleshooting guide
- Nao ha FAQ de erros comuns

**Solucao:** Pequena secao no AGENTS.md ou doc separado `docs/ONBOARDING.md`.

---

## Matriz de Prioridade

| # | Gap | Severidade | Esforco | Doc Gerado |
|---|-----|-----------|---------|------------|
| 1 | Acessibilidade | Alta | Medio | `docs/A11Y.md` + `.cursor/skills/a11y.md` |
| 2 | Mobile-first | Alta | Medio | `docs/MOBILE_SPEC.md` + `.cursor/skills/mobile-first.md` |
| 3 | Analytics | Media | Baixo | Secao neste doc |
| 4 | Copy/UX Writing | Media | Baixo | Adaptar `ux-writing.md` anterior |
| 5 | Testes | Media | Alto | Secao neste doc |
| 6 | Onboarding | Baixa | Baixo | Secao neste doc |

---

## O que JA ESTA EXCELENTE (nao tocar)

| Area | Avaliacao |
|------|-----------|
| Documentacao geral | Referencia do mercado |
| Design system | Completo e coeso |
| SSOT (content.ts) | Arquitetura impecavel |
| Pipeline de build | Validate + lint + typecheck + build |
| Deploy | Vercel + Streamlit, bem documentado |
| Lighthouse desktop | 100/96/100/100 — excelente |
| Lighthouse mobile | 96/96/100/100 — muito bom |
| Estrutura de componentes | Bem organizada (sections, ui, visual, layout) |
| Demos Streamlit | 10 cases + smoke tests 13/13 |
| CV PDF automatizado | Pipeline content.ts -> PDF |
| OG Image + SEO basico | Implementado |

---

*Documento vivo. Revisar apos cada marco ou quando novos gaps forem identificados.*
