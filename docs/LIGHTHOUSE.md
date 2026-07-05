# Lighthouse Audit — Portfólio Lucas Batista

> Relatório de validação de performance e acessibilidade (Fase 4 — Documentação & Validação).

---

## 1. Resumo Executivo

### Desktop (`next start` local)

| Categoria | Score | Meta | Status |
|-----------|-------|------|--------|
| **Performance** | **100** | ≥ 90 | ✅ Aprovado |
| **Acessibilidade** | **100** | ≥ 95 | ✅ Aprovado |
| Best Practices | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

### Mobile (`next start` local)

| Categoria | Score | Meta | Status |
|-----------|-------|------|--------|
| **Performance** | **93** | ≥ 90 | ✅ Aprovado |
| **Acessibilidade** | **100** | ≥ 95 | ✅ Aprovado |
| Best Practices | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

**Data do audit:** 2026-07-05  
**URL auditada:** `http://localhost:3000` (build de produção local)  
**Configuração:** Lighthouse CLI v12.x, Chrome 149 headless, `--preset=desktop` e `--form-factor=mobile`  
**Artefatos brutos:** `lighthouse-desktop.json`, `lighthouse-mobile.json` (raiz do projeto)

---

## 2. Core Web Vitals

### Desktop

| Métrica | Valor | Threshold Bom | Status |
|---------|-------|---------------|--------|
| First Contentful Paint (FCP) | 0.3 s | ≤ 1.8 s | ✅ Bom |
| Largest Contentful Paint (LCP) | 0.7 s | ≤ 2.5 s | ✅ Bom |
| Total Blocking Time (TBT) | 0 ms | ≤ 200 ms | ✅ Bom |
| Cumulative Layout Shift (CLS) | 0 | ≤ 0.1 | ✅ Bom |
| Speed Index | 0.4 s | ≤ 3.4 s | ✅ Bom |
| Time to Interactive (TTI) | 0.7 s | ≤ 3.8 s | ✅ Bom |

### Mobile

| Métrica | Valor | Threshold Bom | Status |
|---------|-------|---------------|--------|
| First Contentful Paint (FCP) | 1.1 s | ≤ 1.8 s | ✅ Bom |
| Largest Contentful Paint (LCP) | 3.2 s | ≤ 2.5 s | ⚠️ Precisa melhorar |
| Total Blocking Time (TBT) | 110 ms | ≤ 200 ms | ✅ Bom |
| Cumulative Layout Shift (CLS) | 0 | ≤ 0.1 | ✅ Bom |
| Speed Index | 1.1 s | ≤ 3.4 s | ✅ Bom |
| Time to Interactive (TTI) | 3.5 s | ≤ 3.8 s | ✅ Bom |

### Diagnóstico de Performance

- **Desktop:** todas as métricas estão no verde. A página estática + cache local produzem resultados excelentes.
- **Mobile:** o LCP de 3.2 s fica levemente acima do ideal (2.5 s). Provável causa: hidratação do React / Framer Motion e carregamento da fonte Inter em hardware emulado. Ainda assim, o score de Performance (93) atende a meta ≥ 90.
- **CLS = 0** em ambos — layout estável, nenhum shift visual detectado.

---

## 3. Acessibilidade — Correções aplicadas

### 3.1 `color-contrast` ✅

**Problema anterior:** o tom `accent` (`#0d9488`) sobre fundo branco tinha razão de contraste 3.74:1, abaixo do exigido 4.5:1 para texto normal. O mesmo tom como fundo de badges P0 com texto branco também falhava.

**Correção:** substituídas as classes `text-accent` em labels de categoria, perguntas, destaques e badges por um tom mais escuro (`#0a7369`), que passa no WCAG AA. Badges P0 passaram a usar fundo escuro com texto branco.

### 3.2 `landmark-one-main` ✅

**Situação:** o `<main>` já existia em `app/layout.tsx`; essa auditoria não apresentou falha nos relatórios finais.

---

## 4. Recomendações por Prioridade

### P0 — Bloqueadores (todos resolvidos)
- [x] Garantir `<main>` landmark.
- [x] Corrigir contraste de cores.
- [x] Re-rodar Lighthouse e confirmar scores ≥ 90 / ≥ 95.

### P1 — Melhoria de Performance (mobile)
- [ ] Investigar LCP mobile: avaliar `font-display: swap`, pré-carregar a fonte Inter ou reduzir o trabalho de hidratação das seções animadas.
- [ ] Revisar se há espaço para lazy-load de componentes abaixo da dobra (`dynamic` do Next.js) sem prejudicar o SEO.

### P2 — Polish
- [ ] Rodar novo audit após deploy em produção para comparar com os resultados locais.
- [ ] Adicionar relatórios ao CI (opcional).

---

## 5. Impedimentos Técnicos Encontrados

### ✅ Servidor na porta 3000
Durante a execução, uma instância anterior do Next.js ainda ocupava a porta 3000 (`EADDRINUSE`). Foi necessário matar o processo com `npx kill-port 3000` antes de reiniciar `npm run start`.

### ⚠️ Erro de cleanup do Chrome Launcher
Ocorreu `EPERM` ao tentar remover o diretório temporário do Chrome (`\Temp\lighthouse.*`). Isso é um problema de permissão do Windows que **não afetou a geração dos relatórios** — os JSONs foram salvos corretamente.

### Ferramentas utilizadas
- Node.js v24.15.0
- Lighthouse CLI (via `npx`)
- Chrome 149 headless
- `CHROME_PATH` setado manualmente (`C:\Program Files\Google\Chrome\Application\chrome.exe`)

---

## 6. Re-audit em Produção (2026-07-05)

Deploy do commit `a93c3a1` concluído com sucesso na Vercel. Audit executado na URL pública `https://portfolio-lucas-batista-murex.vercel.app`.

### Desktop

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 99 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals desktop: FCP 0,7 s · LCP 0,7 s · TBT 0 ms · CLS 0.

### Mobile

| Categoria | Score | Meta | Status |
|-----------|------:|------|:------:|
| Performance | 95 | ≥ 90 | ✅ |
| Acessibilidade | 100 | ≥ 95 | ✅ |
| Boas práticas | 100 | — | ✅ |
| SEO | 100 | — | ✅ |

Core Web Vitals mobile: FCP 1,2 s · LCP 2,9 s · TBT 60 ms · CLS 0,004.

**Resultado:** todos os scores atendem às metas. A produção está performática e acessível.

---

## 7. Próximos Passos

1. **Configurar `NEXT_PUBLIC_FORMSPREE_FORM_ID`** e validar o envio do formulário.
2. **Adicionar Vercel Analytics** (opcional) para monitorar Core Web Vitals reais dos usuários.
3. **Considerar domínio custom** para estabilizar a URL de divulgação.

---

*Documento atualizado após correções de contraste, deploy e re-audit de produção no dia 2026-07-05.*
