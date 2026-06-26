# ROADMAP.md — Roteiro de Execução do Portfólio

> **Uso:** Este documento define a sequência de execução, prioridades, dependências e prazos. Use-o para planejar cada sessão de vibecoding. Marque itens como concluídos à medida que avança.
>
> **Referência cruzada:** Para visão estratégica, veja [VISION.md](VISION.md). Para arquitetura técnica, veja [ARCHITECTURE.md](ARCHITECTURE.md). Para prompts, veja [PROMPTS.md](PROMPTS.md). Para conteúdo, veja [CONTENT.md](CONTENT.md). Para validação, veja [CHECKLIST.md](CHECKLIST.md). Para avaliação atual, veja [AVALIACAO.md](AVALIACAO.md).

---

## Fase 0 — Design e Setup do Template (Dias 1-2)

**Objetivo:** Ter o projeto Next.js rodando localmente, com estrutura, shadcn/ui e Tailwind v4 configurados.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 1 | Scaffold limpo (Next 16 + Tailwind v4) | Manual | [x] |
| 1 | Instalar dependências e rodar local (`npm install`, `npm run dev`) | Manual | [x] |
| 1 | Instalar shadcn/ui e componentes necessários | Manual | [x] |
| 2 | Criar design.md em `design/design.md` | [PROMPTS.md](PROMPTS.md) - 0.1 | [x] |
| 2 | Criar estrutura de pastas | Manual | [x] |
| 2 | Configurar `globals.css` com Tailwind v4 | Manual | [x] |
| 2 | Verificar `npm run dev` funciona sem erros | Manual | [x] |

**Entregável da Fase 0:** ✅ Projeto Next.js rodando localmente.

---

## Fase 1 — Landing Page: Componentes e Seções (Dias 3-10)

**Objetivo:** Landing page one-page completa, com todas as 9 seções, navegação, animações e formulário visual.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 3 | Criar arquivo `data/content.ts` com todos os textos | [PROMPTS.md](PROMPTS.md) - 1.1 | [x] |
| 3-4 | Criar componentes base reutilizáveis | [PROMPTS.md](PROMPTS.md) - 1.2 | [x] |
| 4 | Configurar `layout.tsx` com metadata, fontes | [PROMPTS.md](PROMPTS.md) - 1.3 | [x] |
| 5-8 | Seções Hero → Cases | [PROMPTS.md](PROMPTS.md) - 2.1–2.4 | [x] |
| 8 | Seções Método, IA e Contato | [PROMPTS.md](PROMPTS.md) - 2.5 | [x] |
| 9 | Integrar `page.tsx` e navegação | [PROMPTS.md](PROMPTS.md) - 2.6 | [x] |
| 10 | Testar localmente: navegação, mobile, animações | Manual | [~] QA formal pendente |
| 10 | Commit e push | Manual | [x] |

**Entregável da Fase 1:** ✅ Landing completa localmente.

---

## Fase 2 — Demos Streamlit (Dias 11-18)

**Objetivo:** 3-4 demos no Streamlit Cloud embedadas na landing.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 11 | Estrutura `demos-logistica/` + CSVs | [PROMPTS.md](PROMPTS.md) - 3.1 | [x] |
| 12-16 | Demos P0 + classificador | [PROMPTS.md](PROMPTS.md) - 3.2–3.4 | [x] |
| 17 | Deploy Streamlit Cloud | [DEPLOY.md](DEPLOY.md) | [x] URL: `…btzrqdx4gjru2c3ekzbtkq.streamlit.app` |
| 18 | Embedar demos na landing | Manual | [x] `demoUrl()` + env no build |
| 18 | Testar fluxo landing → demo | Manual | [~] Registrar em CHECKLIST |

**Entregável da Fase 2:** ✅ Demos no ar; teste E2E documentado pendente.

---

## Fase 3 — Biblioteca Técnica e GitHub (Dias 19-26)

| Dia | Tarefa | Status |
|---|---|---|
| 19 | README profissional na raiz | [x] |
| 20-22 | Cases em pastas numeradas | [ ] |
| 22-24 | README individual por case | [ ] |
| 24 | GitHub Topics | [x] |
| 25 | Limitações e ética no README | [x] |
| 26 | Conectar landing ↔ GitHub ↔ demos | [~] Links GitHub vazios em `content.ts` |

**Entregável da Fase 3:** 🟡 Repositórios criados; READMEs por case pendentes.

---

## Fase 4 — Integração de Formulário e Deploy (Dias 27-32)

| Dia | Tarefa | Status |
|---|---|---|
| 27 | Integrar Formspree | [x] Código pronto — aguarda `NEXT_PUBLIC_FORMSPREE_FORM_ID` |
| 28 | Testar envio de leads | [ ] |
| 29 | Deploy na Vercel | [x] <https://portfolio-lucas-batista-murex.vercel.app> |
| 30 | Testar em mobile | [ ] |
| 31 | SEO: meta, OG, sitemap, robots | [~] Meta OK; **og-image + favicon faltando** |
| 32 | Lighthouse > 90 | [ ] |

**Entregável da Fase 4:** 🟡 Site no ar; Formspree + assets SEO + Lighthouse pendentes.

**Bloqueios resolvidos (Jun/2026):**

- Erro `routes-manifest.json` → não usar `output: 'export'` nem Output Directory `dist`/vazio com override ligado. Ver [DEPLOY.md](DEPLOY.md).

**Bloqueios atuais:**

- Placeholders `[substituir pelo real]` em `data/content.ts`
- Formspree ID não configurado
- `public/og-image.png` e `public/favicon.ico` ausentes

---

## Fase 5 — Lançamento e Evolução (Dias 33-40)

| Dia | Tarefa | Status |
|---|---|---|
| 33 | Domínio personalizado (opcional) | [ ] |
| 34 | Mensagem LinkedIn | [ ] |
| 35 | Primeiro post com case | [ ] |
| 36-37 | Vercel Analytics | [ ] |
| 38-40 | Ajustes com feedback | [ ] |

**Entregável da Fase 5:** ⬜ Não iniciado.

---

## Fase 6 — Evolução Contínua (Mês 2+)

| Semana | Tarefa | Status |
|---|---|---|
| 6-7 | Cases P1 com demos | [ ] |
| 8-9 | Cases P2 restantes | [ ] |
| 10+ | Lead magnet, ofertas empacotadas | [ ] |
| Contínua | LinkedIn 1-2x/semana | [ ] |

---

## Dependências entre Fases

```
Fase 0 → Fase 1 → Fase 2 ──┐
              ↓            ├──► Fase 4 (Deploy) → Fase 5
         Fase 3 ───────────┘
```

---

## Tempo Total Estimado

| Fase | Status atual |
|------|--------------|
| 0–2 | ✅ Concluídas (código + deploy) |
| 3 | 🟡 ~40% |
| 4 | 🟡 ~75% |
| 5 | ⬜ 0% |

**Próximo foco:** ver [AVALIACAO.md](AVALIACAO.md) — sprint pré-lançamento.

---

*Documento de roteiro. Atualize o status conforme avança.*
