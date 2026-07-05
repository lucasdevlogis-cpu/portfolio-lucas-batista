# Lighthouse Audit — Portfólio Lucas Batista

> Relatório de validação de performance e acessibilidade (Fase 4 — Documentação & Validação).

---

## 1. Resumo Executivo

| Categoria | Score | Meta | Status |
|-----------|-------|------|--------|
| **Performance** | **92** | ≥ 90 | ✅ Aprovado |
| **Acessibilidade** | **94** | ≥ 95 | ❌ Reprovado |
| Best Practices | 100 | — | ✅ |
| SEO | 100 | — | ✅ |
| Agentic Browsing | 100 | — | ✅ |

**Data do audit:** 2026-07-05  
**URL auditada:** `https://portfolio-lucas-batista-murex.vercel.app`  
**Configuração:** Lighthouse mobile (default), Chrome 149 headless, emulação Moto G Power  
**Artefato bruto:** `lighthouse-report.json` (raiz do projeto)

---

## 2. Core Web Vitals (Mobile)

| Métrica | Valor | Threshold Bom | Status |
|---------|-------|---------------|--------|
| First Contentful Paint (FCP) | 1.5 s | ≤ 1.8 s | ✅ Bom |
| Largest Contentful Paint (LCP) | 2.9 s | ≤ 2.5 s | ⚠️ Precisa melhorar |
| Total Blocking Time (TBT) | 100 ms | ≤ 200 ms | ✅ Bom |
| Cumulative Layout Shift (CLS) | 0 | ≤ 0.1 | ✅ Bom |
| Speed Index | 4.3 s | ≤ 3.4 s | ❌ Ruim |
| Time to Interactive (TTI) | 2.9 s | ≤ 3.8 s | ✅ Bom |

### Diagnóstico de Performance
- **LCP em 2.9 s** está acima do ideal (2.5 s). Provável causa: carregamento de fontes (Inter / Geist) ou execução de JS de hidratação do React.
- **Speed Index em 4.3 s** indica que a página visível leva tempo para estabilizar visualmente, apesar do FCP rápido. Isso pode estar relacionado ao render-blocking do CSS do Tailwind ou ao carregamento dos scripts do Next.js.
- **CLS = 0** é excelente — layout estável, nenhum shift visual detectado.

---

## 3. Acessibilidade — Gaps vs Meta (≥ 95)

O score de 94 está **1 ponto abaixo da meta**. Duas auditorias críticas falharam:

### 3.1 `color-contrast` — Score 0 🔴

**Problema:** Elementos na página não possuem razão de contraste suficiente entre cor de fundo e cor de primeiro plano (WCAG AA exige 4.5:1 para texto normal, 3:1 para grande).

**Prováveis causas no projeto:**
- Texto `muted-foreground` (`#64748b`) sobre fundo `background` (`#f8fafc`) pode estar abaixo do limiar em certos tamanhos.
- Badges P1 com `bg-primary/20 text-primary border-primary/20` podem ter contraste insuficiente.
- Placeholders de inputs ou legendas subtis.

**Ação recomendada:**
1. Rodar a ferramenta de inspeção de contraste do DevTools (Chrome → Elements → Accessibility pane) para identificar elementos exatos.
2. Ajustar tokens de cor ou escurecer textos secundários se necessário.

### 3.2 `landmark-one-main` — Score 0 🔴

**Problema:** A página não possui um landmark `<main>` ou `role="main"`. Isso prejudica a navegação por leitores de tela (screen readers).

**Provável causa:** O conteúdo principal da one-page está diretamente dentro de `<body>` ou de `<div>` sem o elemento `<main>`.

**Ação recomendada:**
1. Envolver o conteúdo principal da página (entre Header e Footer) em uma tag `<main>`.
2. Garantir que não haja mais de um `<main>` por página.
3. Verificar se o `HomePage` ou `layout.tsx` precisa dessa alteração.

---

## 4. Recomendações por Prioridade

### P0 — Bloqueador para meta de Acessibilidade
- [ ] **Adicionar `<main>` landmark** no `layout.tsx` ou `HomePage`.
- [ ] **Corrigir contraste de cores** — identificar elementos com falha via DevTools e ajustar tokens ou classes.

### P1 — Melhoria de Performance
- [ ] **Otimizar LCP:** considerar `font-display: swap` para fontes do Google Fonts (se ainda não estiver aplicado) ou pré-carregar a fonte Inter.
- [ ] **Reduzir Speed Index:** avaliar se há CSS não crítico bloqueando render (Tailwind pode ser pesado sem purge no dev, mas em produção a Vercel já otimiza). Verificar se o bundle JS do Next.js pode ser reduzido.
- [ ] **Revisar third-party scripts:** se houver analytics/tag manager, adiar carregamento com `strategy="lazyOnload"` ou `defer`.

### P2 — Polish
- [ ] Rodar novo audit após correções para confirmar scores ≥ 90 / ≥ 95.
- [ ] Considerar rodar audit também no modo **desktop** para comparativo.

---

## 5. Impedimentos Técnicos Encontrados

### ⚠️ Erro de cleanup do Chrome Launcher
Durante a execução do Lighthouse, ocorreu um erro `EPERM` ao tentar remover o diretório temporário do Chrome (`\Temp\lighthouse.*`). Isso é um problema de permissão do Windows que **não afetou a geração do relatório** — o JSON foi salvo corretamente com 476 KB.

**Mitigação:** Rodar o comando em um terminal com privilégios de administrador ou ignorar o erro, já que o artefato foi gerado.

### ✅ Ferramentas utilizadas
- Node.js v24.15.0
- Lighthouse CLI (via npx)
- Chrome 149 headless
- CHROME_PATH setado manualmente (`C:\Program Files\Google\Chrome\Application\chrome.exe`)

---

## 6. Próximos Passos

1. **Corrigir os dois gaps de acessibilidade** (`<main>` landmark + contraste de cores).
2. **Re-rodar o Lighthouse** para validar que o score de acessibilidade subiu para ≥ 95.
3. **Investigar LCP/Speed Index** — se houver margem de melhoria sem grande refatoração.
4. **Atualizar este documento** com os novos scores após as correções.

---

*Documento gerado automaticamente durante a execução da Fase 4 do plano UX/UI.*
