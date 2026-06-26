# Avaliação do Projeto — Junho 2026

> **Uso:** Snapshot de saúde do portfólio antes dos próximos passos. Consulte após cada fase ou deploy significativo.
>
> **Última atualização:** 26/06/2026 — pós-deploy Vercel + Streamlit Cloud.

---

## Resumo executivo

| Área | Status | Nota |
|------|--------|------|
| Landing page (código) | ✅ Completa | 9 seções, 23 componentes, build OK |
| Demos Streamlit (código) | ✅ Completa | 5 pages + CSVs em `demos-logistica/` |
| Deploy produção | ✅ No ar | Vercel + Streamlit Cloud funcionando |
| Conteúdo / credibilidade | ✅ OK | Email, LinkedIn e GitHub configurados |
| SEO assets | ✅ OK | `og-image.png`, `app/icon.png`, `public/favicon.ico` |
| Formulário de leads | 🟡 Parcial | Formspree integrado; ID não configurado |
| Documentação | ✅ Atualizada | Alinhada ao deploy Vercel nativo (sem static export) |
| Testes manuais / Lighthouse | 🟡 Pendente | QA mobile e performance não registrados |

**Veredicto:** MVP pronto para divulgação. Pendente apenas **Formspree** (leads reais) e QA mobile/Lighthouse.

---

## URLs de produção

| Serviço | URL |
|---------|-----|
| Landing (Vercel) | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos (Streamlit) | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

## O que está funcionando

- **Build local:** `npm run build` passa (Next.js 16.2.9, Turbopack).
- **Deploy Vercel:** Next.js nativo (`.next/`), Output Directory vazio, sem `vercel.json`.
- **Demos P0/P2:** URLs Streamlit embutidas no bundle quando `NEXT_PUBLIC_DEMOS_BASE_URL` está definida **no build**.
- **Navegação:** scroll suave, menu mobile (Sheet), Intersection Observer para nav ativa.
- **Modal de demo:** iframe com `?embed=true`, fallback placeholder para cases sem demo.
- **SEO parcial:** meta tags, OG, Twitter Card, JSON-LD em `layout.tsx`; `robots.txt` e `sitemap.xml`.
- **Footer:** declaração ética sobre dados sintéticos.

---

## Problemas identificados

### 🔴 Críticos (corrigir antes de divulgar)

1. **Formspree não configurado** — sem `NEXT_PUBLIC_FORMSPREE_FORM_ID`, formulário faz `console.log`

### 🟡 Importantes

1. **URLs de demo fixadas no build** — redeploy após alterar env na Vercel
2. **Lighthouse / mobile QA** — não executado
3. **READMEs por case** (Fase 3)

### ✅ Resolvido (26/06/2026)

- SEO: `og-image.png`, `app/icon.png`, `favicon.ico`
- Email + LinkedIn + GitHub em `data/content.ts`
- `CaseCard` desabilita demo sem URL; `Contato` usa `camposFormulario`
- `DemoModal` copy atualizada; lint de ícones (`LucideIconByName`)
- ESLint ignore `.vercel/`; `tsconfig` sem paths `dist/`

### 🟢 Desejáveis (backlog)

1. **READMEs por case** (Fase 3) — não criados.
2. **Campo "limite" nos serviços** — CHECKLIST menciona; tipo `Servico` não tem o campo.
3. **DemoModal copy desatualizada** — ~~ainda menciona "Fase 2"~~ corrigido
4. **Lighthouse / mobile QA** — não executado nem documentado.
5. **Vercel Analytics** — não configurado.
6. **Repos antigos** em `lucas109895-dev` — exclusão manual pendente.

---

## Inconsistências doc vs código (corrigidas nesta revisão)

| Tema | Antes (docs) | Realidade (código) |
|------|--------------|-------------------|
| Deploy | `output: 'export'` → `dist/` | Next.js nativo na Vercel, sem export |
| `vercel.json` | CHANGELOG dizia que existia | Removido; não usar |
| Next.js | Docs citavam v15 | v16.2.9 |
| Node | "≥ 18" | `engines.node: 24.x` |
| Slugs demos | INDEX citava `02_cvrp` | `02_mini_torre_controle`, `03_cvrp_urbano`, `04_promessa_cep` |
| Fase 4 deploy | "Pendente" | Parcialmente concluída (site no ar) |

---

## Melhorias recomendadas (prioridade)

### Sprint imediata (pré-lançamento)

| # | Ação | Arquivo(s) |
|---|------|------------|
| 1 | Preencher email, LinkedIn, GitHub reais | `data/content.ts`, `docs/CONTENT.md` |
| 2 | Criar `og-image.png` (1200×630) e `favicon.ico` | `public/` |
| 3 | Configurar Formspree + env na Vercel | Dashboard Vercel |
| 4 | Atualizar sitemap/robots com URL de produção | `public/sitemap.xml`, `public/robots.txt` |
| 5 | Testar fluxo landing → modal → iframe (mobile) | Manual + registrar em CHECKLIST |
| 6 | Desabilitar botão demo quando `linkDemo` vazio | `CaseCard.tsx` |

### Sprint seguinte (polimento)

| # | Ação | Arquivo(s) |
|---|------|------------|
| 7 | Formulário 100% driven by `content.ts` | `Contato.tsx` |
| 8 | Lighthouse mobile ≥ 85 | — |
| 9 | READMEs individuais por case | Fase 3 / `docs/PROMPTS.md` |
| 10 | Domínio custom ou alias estável | Vercel dashboard |
| 11 | Vercel Analytics | Fase 5 |

---

## Estado das fases (ROADMAP)

| Fase | Progresso | Pendências principais |
|------|-----------|----------------------|
| 0 Setup | ✅ 100% | — |
| 1 Landing | ✅ ~95% | QA manual mobile; commit history OK |
| 2 Demos | ✅ ~90% | Teste E2E documentado; case 03_cvrp extra não linkado na landing |
| 3 GitHub | 🟡 ~40% | READMEs por case; pastas numeradas |
| 4 Deploy | 🟡 ~75% | Formspree, og-image, favicon, Lighthouse |
| 5 Lançamento | ⬜ 0% | LinkedIn, analytics, domínio |

---

## Comandos de verificação

```bash
npm run build          # deve passar
npm run lint           # deve passar só em src/ (sem .vercel/)
npm run dev            # localhost:3000
```

**Env local** (copiar de `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
NEXT_PUBLIC_FORMSPREE_FORM_ID=   # opcional até criar conta Formspree
```

---

## Próximos passos sugeridos

1. Configurar Formspree → redeploy Vercel

---

*Documento vivo. Atualize após cada marco ou deploy.*
