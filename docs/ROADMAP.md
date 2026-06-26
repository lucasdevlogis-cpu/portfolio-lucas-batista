# ROADMAP.md — Roteiro de Execução do Portfólio

> **Uso:** Este documento define a sequência de execução, prioridades, dependências e prazos. Use-o para planejar cada sessão de vibecoding. Marque itens como concluídos à medida que avança.
>
> **Referência cruzada:** Para visão estratégica, veja [VISION.md](VISION.md). Para arquitetura técnica, veja [ARCHITECTURE.md](ARCHITECTURE.md). Para prompts, veja [PROMPTS.md](PROMPTS.md). Para conteúdo, veja [CONTENT.md](CONTENT.md). Para validação, veja [CHECKLIST.md](CHECKLIST.md).

---

## Fase 0 — Design e Setup do Template (Dias 1-2)

**Objetivo:** Ter o projeto Next.js rodando localmente, com estrutura, shadcn/ui e Tailwind v4 configurados.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 1 | Fork do template jigar-sable/next-portfolio no GitHub e clone | Manual | [~] Pivot: scaffold limpo (Next 16 + Tailwind v4) |
| 1 | Instalar dependências e rodar local (`npm install`, `npm run dev`) | Manual | [x] |
| 1 | Se o template usar Tailwind v3, decidir: migrar para v4 ou manter v3 | Manual | [x] Tailwind v4 nativo |
| 1 | Se o template não funcionar, pivotar para scaffold limpo: `npx create-next-app@latest` + `npx shadcn@latest init` | Manual | [x] |
| 1 | Instalar shadcn/ui e componentes necessários: `npx shadcn@latest add button card dialog sheet badge input textarea` | Manual | [x] |
| 2 | Criar design.md em `design/design.md` com decisões visuais, layout, seções, componentes | [PROMPTS.md](PROMPTS.md) - 0.1 | [x] |
| 2 | Criar estrutura de pastas (components/, data/, design/, public/) | Manual | [x] |
| 2 | Configurar `globals.css` com Tailwind v4 (`@import "tailwindcss"`, `@theme` block) | Manual | [x] |
| 2 | Verificar `npm run dev` funciona sem erros | Manual | [x] |

**Entregável da Fase 0:** Projeto Next.js rodando localmente em `localhost:3000`, com shadcn/ui instalado, Tailwind v4 configurado, e design.md criado.

**Bloqueios possíveis:**

- Template com dependências desatualizadas → usar `npm audit fix` ou pivotar para scaffold limpo.
- Tailwind v4 config diferente do template → adaptar `globals.css` conforme ARCHITECTURE.md seção 2.4.
- shadcn/ui init falha → verificar versão do Node.js (≥18), tentar `npx shadcn@latest init --yes --defaults`.

---

## Fase 1 — Landing Page: Componentes e Seções (Dias 3-10)

**Objetivo:** Ter a landing page one-page completa, com todas as 9 seções, navegação, animações e formulário visual.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 3 | Criar arquivo `data/content.ts` com todos os textos | [PROMPTS.md](PROMPTS.md) - 1.1 | [x] |
| 3-4 | Criar componentes base reutilizáveis (7 componentes) | [PROMPTS.md](PROMPTS.md) - 1.2 | [x] |
| 4 | Configurar `layout.tsx` com metadata, fontes, providers | [PROMPTS.md](PROMPTS.md) - 1.3 | [x] |
| 5 | Criar seção Hero | [PROMPTS.md](PROMPTS.md) - 2.1 | [x] |
| 6 | Criar seção Dores | [PROMPTS.md](PROMPTS.md) - 2.2 | [x] |
| 6 | Criar seção Serviços | [PROMPTS.md](PROMPTS.md) - 2.3 | [x] |
| 7 | Criar seção Cases | [PROMPTS.md](PROMPTS.md) - 2.4 | [x] |
| 8 | Criar seções Método, IA e Contato | [PROMPTS.md](PROMPTS.md) - 2.5 | [x] |
| 9 | Integrar tudo na `page.tsx` e configurar navegação (scroll, mobile menu, estado ativo) | [PROMPTS.md](PROMPTS.md) - 2.6 | [x] |
| 10 | Testar localmente: navegação, mobile, formulário, animações | Manual | [~] Build OK; teste manual pendente |
| 10 | Commit e push | Manual | [ ] |

**Entregável da Fase 1:** Landing page completa rodando localmente, com todas as seções, navegação e formulário visual.

**Bloqueios possíveis:**

- Animações Framer Motion quebram em mobile → simplificar ou usar `prefers-reduced-motion`.
- Menu mobile não fecha ao clicar em link → adicionar `onClick={() => setOpen(false)}` nos links.
- Scroll suave não funciona → usar `scrollIntoView({ behavior: 'smooth' })` em vez de anchor links puros.

---

## Fase 2 — Demos Streamlit (Dias 11-18)

**Objetivo:** Ter 3-4 demos funcionando no Streamlit Cloud e embedadas na landing page.

| Dia | Tarefa | Prompt | Status |
|---|---|---|---|
| 11 | Criar conta Streamlit Cloud e estrutura base | [PROMPTS.md](PROMPTS.md) - 3.1 | [x] `demos-logistica/` criado |
| 11 | Preparar dados sintéticos CSV dos 3 cases P0 | Manual | [x] `scripts/generate_data.py` |
| 12-13 | Demo 01: Precificação de Frete | [PROMPTS.md](PROMPTS.md) - 3.2 | [x] |
| 14-15 | Demo 02: Mini Torre de Controle + CVRP | [PROMPTS.md](PROMPTS.md) - 3.3 | [x] `02_mini_torre` + `03_cvrp` |
| 15-16 | Demo 03: Promessa de Entrega por CEP | adaptado | [x] `04_promessa_cep` |
| 16 | Demo 07: Classificador de Ocorrências | [PROMPTS.md](PROMPTS.md) - 3.4 | [x] |
| 17 | Deploy das demos no Streamlit Cloud | [PROMPTS.md](PROMPTS.md) - 3.5 | [~] Repo criado — deploy manual em share.streamlit.io |
| 18 | Embedar demos na landing page | Manual | [x] `demoUrl()` — aguarda `NEXT_PUBLIC_DEMOS_BASE_URL` |
| 18 | Testar fluxo landing → demo | Manual | [ ] Após Streamlit + Vercel |

**Entregável da Fase 2:** 3-4 demos no Streamlit Cloud, embedadas via iframe, com fluxo completo testado.

**Bloqueios possíveis:**

- Streamlit Cloud não aceita app → verificar `requirements.txt`, estrutura de pastas, e nome do arquivo principal.
- Iframe não carrega → verificar URL com `?embed=true`, CORS, e altura do container.
- Dados sintéticos não geram visualizações interessantes → ajustar ranges e distribuições.

---

## Fase 3 — Biblioteca Técnica e GitHub (Dias 19-26)

**Objetivo:** Repositório GitHub profissional com cases documentados e READMEs padronizados.

| Dia | Tarefa | Status |
|---|---|---|
| 19 | Estruturar repositório principal com README profissional | [x] |
| 20-22 | Organizar cases em pastas numeradas | [ ] |
| 22-24 | Criar README individual para cada case (modelo em ARCHITECTURE.md seção 10) | [ ] |
| 24 | Adicionar GitHub Topics | [x] |
| 25 | Criar seção de limitações e ética no README principal | [x] |
| 26 | Conectar tudo: landing ↔ GitHub ↔ demos | [~] Repos criados — deploy pendente |

**Entregável da Fase 3:** Repositório GitHub profissional com 7 cases documentados.

**Bloqueios possíveis:**

- README muito genérico → usar o modelo de case definido em ARCHITECTURE.md seção 10.
- Falta de dados para demonstrar → usar dados sintéticos com declaração explícita.

---

## Fase 4 — Integração de Formulário e Deploy (Dias 27-32)

**Objetivo:** Formulário de contato funcional e site no ar na Vercel.

| Dia | Tarefa | Status |
|---|---|---|
| 27 | Integrar formulário com Formspree | [x] Código pronto — aguarda `FORMSPREE_FORM_ID` |
| 28 | Testar envio de leads | [ ] |
| 29 | Deploy na Vercel | [~] Repo GitHub — import manual [DEPLOY.md](DEPLOY.md) |
| 30 | Testar em mobile | [ ] |
| 31 | SEO: meta tags, OG, sitemap, robots, favicon | [x] |
| 32 | Lighthouse > 90 | [ ] |

**Entregável da Fase 4:** Site no ar na Vercel, formulário enviando leads, otimizado para SEO.

**Bloqueios possíveis:**

- Firebase não configurado → usar Formspree (gratuito, mais simples) ou console.log + mensagem de sucesso no MVP.
- Build falha na Vercel → verificar `output: 'export'`, não usar rotas dinâmicas com SSR.
- Lighthouse score baixo → otimizar imagens, fontes, animações.

---

## Fase 5 — Lançamento e Evolução (Dias 33-40)

**Objetivo:** Site finalizado, com primeiro post no LinkedIn e métricas de acompanhamento.

| Dia | Tarefa | Status |
|---|---|---|
| 33 | Configure domínio personalizado (opcional, ~R$50/ano) | [ ] |
| 34 | Prepare mensagem de LinkedIn com link do portfólio | [ ] |
| 35 | Publique primeiro post: escolha um case e conte a história problema → solução | [ ] |
| 36-37 | Configure Vercel Analytics (gratuito) | [ ] |
| 38-40 | Ajustes finos com base em feedback e analytics | [ ] |

**Entregável da Fase 5:** Portfólio no ar, com primeiro post no LinkedIn e métricas ativas.

---

## Fase 6 — Evolução Contínua (Mês 2 em diante)

| Semana | Tarefa | Status |
|---|---|---|
| Semana 6-7 | Adicionar cases P1 (Ship from Store, Auditoria de Endereço) | [ ] |
| Semana 8-9 | Adicionar cases P2 (KPIs de CD, Classificador de Ocorrências) | [ ] |
| Semana 10-11 | Criar lead magnet: "Diagnóstico de Visibilidade Logística" | [ ] |
| Semana 12-13 | Página de ofertas empacotadas com cards claros | [ ] |
| Contínua | Post no LinkedIn 1-2x por semana | [ ] |
| Contínua | Acompanhar métricas: visitas, origem, conversão, cases mais clicados | [ ] |

---

## Dependências entre Fases

```
Fase 0 (Setup) ──► Fase 1 (Landing) ──► Fase 2 (Demos) ──► Fase 3 (GitHub) ──► Fase 4 (Deploy)
     │                  │                    │                   │
     ▼                  ▼                    ▼                   ▼
  Template           content.ts          Streamlit          READMEs
  + shadcn           + componentes       Cloud URLs         + CTAs
```

**Regras de dependência:**

- Fase 1 depende de Fase 0 (precisa do projeto configurado).
- Fase 2 pode começar em paralelo com Fase 1 (demos são independentes da landing).
- Fase 3 pode rodar em paralelo com Fase 2 (GitHub é independente).
- Fase 4 depende de Fase 1, 2 e 3 (tudo deve estar pronto para deploy).
- Fase 5 depende de Fase 4 (só lançar depois do deploy).

---

## Tempo Total Estimado (Realista)

| Fase | Dias | Horas de Vibecoding |
|---|---|---|
| Fase 0 | 2 | ~6h |
| Fase 1 | 8 | ~20h |
| Fase 2 | 8 | ~18h |
| Fase 3 | 8 | ~12h |
| Fase 4 | 6 | ~10h |
| Fase 5 | 8 | ~8h |
| **Total** | **40** | **~74h** |

**Assumindo 2-4h de vibecoding por dia:** ~3-4 semanas para versão mínima funcional (Fases 0-4), ~5-6 semanas para versão completa (Fases 0-5).

**Dica:** Não tente fazer tudo de uma vez. Foque em uma fase por vez. O MVP (Fases 0-4) é o que gera valor imediato.

---

*Documento de roteiro. Versão revisada. Atualize o status conforme avança.*
