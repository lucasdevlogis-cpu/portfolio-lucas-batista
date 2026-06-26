# CHANGELOG.md — Histórico de Revisões da Documentação

> Registro de todas as mudanças aplicadas à documentação do portfólio durante a revisão crítica por Especialista em Projetos Senior (Vibecoding, IA, Skills).

---

## Revisão v1.0 — Junho de 2026

**Autor:** Especialista em Projetos Senior (Vibecoding, Cursor, IA, Skills)
**Contexto:** Análise crítica da documentação gerada a partir de 3 documentos originais (plano estratégico, referências técnicas, plano técnico vibecoding). Objetivo: corrigir inconsistências, ajustar para realidade da execução, e preparar para início do vibecoding.

---

### Mudanças Críticas (Bloqueantes para Execução)

#### 1. `.cursorrules` movido para raiz do projeto

- **Problema:** Arquivo estava em `docs/.cursorrules`, onde o Cursor não reconhece.
- **Solução:** Criado novo `.cursorrules` na raiz `portfolio-lucas-batista/.cursorrules`.
- **Impacto:** O Cursor agora carrega contexto automático ao abrir arquivos do projeto.
- **Arquivos afetados:** Novo arquivo na raiz; referência removida de `docs/`.

#### 2. Tailwind CSS v4 configurado corretamente

- **Problema:** Documentação mencionava `tailwind.config.ts` (sintaxe v3), mas o projeto usa Tailwind v4.
- **Solução:**
  - `ARCHITECTURE.md` seção 2.4: adicionada explicação completa de Tailwind v4 (CSS-based config via `@import "tailwindcss"` e `@theme` block).
  - `PROMPTS.md` Fase 1.2: adicionada instrução de verificar `globals.css` para Tailwind v4.
  - `CHECKLIST.md`: adicionado item "Tailwind v4 configurado corretamente".
  - `.cursorrules`: adicionada instrução específica de Tailwind v4.
- **Impacto:** Evita erros de build e confusão durante o vibecoding.
- **Arquivos afetados:** `ARCHITECTURE.md`, `PROMPTS.md`, `CHECKLIST.md`, `.cursorrules`.

#### 3. shadcn/ui init atualizado para v4

- **Problema:** Prompts mencionavam `npx shadcn-ui@latest init` (comando v3).
- **Solução:** Corrigido para `npx shadcn@latest init` (comando v4) em todos os documentos.
- **Impacto:** Comando de instalação funciona corretamente.
- **Arquivos afetados:** `ARCHITECTURE.md`, `PROMPTS.md`.

#### 4. Tempos de execução ajustados para realistas

- **Problema:** Documentação original sugeria ~4-5 horas para site completo, o é irrealista.
- **Solução:**
  - `PROMPTS.md`: tabela de tempos ajustada para ~60-80h totais (prompts + testes + iteração).
  - `ROADMAP.md`: tempo estimado por fase revisado (~74h totais, 3-6 semanas a 2-4h/dia).
- **Impacto:** Expectativas realistas, planejamento confiável.
- **Arquivos afetados:** `PROMPTS.md`, `ROADMAP.md`.

#### 5. Fase 0 (Design e Setup) adicionada ao ROADPAD

- **Problema:** ROADMAP começava direto na Fase 1 (Landing Page), sem fase de design e configuração inicial.
- **Solução:** Adicionada Fase 0 com: fork do template, instalação de dependências, decisão Tailwind v3 vs v4, shadcn init, criação de `design.md`, e verificação de `npm run dev`.
- **Impacto:** Setup inicial documentado, decisões técnicas explicitadas antes do desenvolvimento.
- **Arquivos afetados:** `ROADMAP.md`, `PROMPTS.md` (prompt 0.1 e 0.2 adicionados).

---

### Mudanças Importantes (Melhorias de Qualidade)

#### 6. `DemoModal` adicionado aos prompts

- **Problema:** Faltava instrução para criar o componente de modal que abre demos Streamlit em iframe.
- **Solução:** Adicionado `DemoModal.tsx` (shadcn Dialog) aos prompts de componentes base (Fase 1.2).
- **Impacto:** Fluxo de demo (case → modal → iframe) documentado e pronto para implementação.
- **Arquivos afetados:** `PROMPTS.md`.

#### 7. `IASection` renomeado para evitar conflito com `IA`

- **Problema:** Seção "IA / Vibecoding" tinha ID "IA", que conflita com o termo geral.
- **Solução:** Renomeado para `IASection` (componente) e seção mantida como "IA como acelerador".
- **Impacto:** Evita ambiguidade de nomenclatura.
- **Arquivos afetados:** `PROMPTS.md`, `ARCHITECTURE.md`.

#### 8. Cases na home reduzidos para 6 (grid simétrico)

- **Problema:** 7 cases na home criam grid assimétrico (3×2 + 1 solitário).
- **Solução:** Documentado que 6 cases na home (2 linhas de 3) é o padrão. Case 07 pode ser adicionado via "Ver todos os cases" ou em página secundária.
- **Impacto:** Layout visualmente balanceado.
- **Arquivos afetados:** `CONTENT.md`, `PROMPTS.md`.

#### 9. Formulário: `useState` obrigatório

- **Problema:** Faltava instrução de usar `useState` para gerenciar estado do formulário no React.
- **Solução:** Adicionada nota explícita em `PROMPTS.md` Fase 2.6: "Use useState para nome, email, empresa, mensagem e enviado."
- **Impacto:** Evita erro de tentar ler valores de ref em vez de state.
- **Arquivos afetados:** `PROMPTS.md`.

#### 10. Rotas simplificadas no MVP

- **Problema:** `ARCHITECTURE.md` mencionava rotas para `/cases` e `/cases/[id]`, mas o projeto usa static export (não suporta SSR dinâmico).
- **Solução:** Adicionada nota: "No MVP, manter one-page. Páginas de case individuais são Fase 5 (pós-MVP)."
- **Impacto:** Evita tentativa de criar rotas dinâmicas que quebram o build.
- **Arquivos afetados:** `ARCHITECTURE.md`.

#### 11. Dependências entre fases documentadas

- **Problema:** ROADMAP não deixava claro quais fases podem rodar em paralelo.
- **Solução:** Adicionada seção "Dependências entre Fases" com diagrama e regras explícitas.
- **Impacto:** Permite paralelização segura (Fase 2 e 3 podem rodar juntas).
- **Arquivos afetados:** `ROADMAP.md`.

#### 12. Streamlit pages numerados corretamente

- **Problema:** Faltava menção às pages 03 e 07 nos prompts.
- **Solução:** Adicionadas pages: `03_promessa_cep` e `07_classificador_ocorrencias`.
- **Impacto:** Todos os cases P0 e P2 com demo estão documentados.
- **Arquivos afetados:** `PROMPTS.md`.

#### 13. Classificador simplificado para keywords

- **Problema:** Classificador de ocorrências mencionava TF-IDF, que é complexo para vibecoding rápido.
- **Solução:** Simplificado para classificador por keywords + regras de mapeamento.
- **Impacto:** Demo viável em 1-2h de vibecoding.
- **Arquivos afetados:** `PROMPTS.md`, `CONTENT.md`.

#### 14. `CHECKLIST.md` expandido com severidade e primeira execução

- **Problema:** Checklist original não diferenciava severidade dos itens.
- **Solução:**
  - Adicionada seção "Severidade dos Itens" (🔴 Crítico, 🟡 Importante, 🟢 Desejável).
  - Adicionada seção "Checklist de Primeira Execução" (setup inicial, contas, dependências).
  - Adicionada seção "Checklist de Pré-Deploy" (24h antes, 1h antes, após deploy).
  - Adicionada seção "Checklist de Pós-Lançamento" (Semana 1).
- **Impacto:** Checklist usaável em múltiplos momentos do projeto, não apenas no final.
- **Arquivos afetados:** `CHECKLIST.md`.

#### 15. `CONTENT.md` com notas sobre links placeholder

- **Problema:** Múltiplos campos de "Link Demo" e "Link GitHub" estavam vazios, sem orientação.
- **Solução:** Adicionada nota global: "⚠️ Preencher email, LinkedIn e GitHub reais antes de qualquer deploy." e notas individuais em cada case.
- **Impacto:** Evita deploy com links quebrados.
- **Arquivos afetados:** `CONTENT.md`.

---

### Mudanças Menores (Refinamentos)

#### 16. Ícone de case verificado

- **Problema:** Dúvida se `Warehouse` existe no Lucide React.
- **Solução:** Verificado: `Warehouse` existe no Lucide React. Mantido. Adicionada nota de verificação em `CONTENT.md`.
- **Arquivos afetados:** `CONTENT.md`.

#### 17. `INDEX.md` atualizado

- **Problema:** INDEX não refletia `.cursorrules` na raiz nem Fase 0.
- **Solução:**
  - Adicionada nota sobre `.cursorrules` na raiz.
  - Adicionada coluna "Nota da Revisão" na tabela de decisões.
  - Adicionados campos: Tempo estimado, Fase inicial, Demos.
  - Adicionado `CHANGELOG.md` ao mapa de documentos.
- **Impacto:** Índice atualizado e alinhado com a realidade da documentação.
- **Arquivos afetados:** `INDEX.md`.

#### 18. Conflito "fork vs criar estrutura" resolvido

- **Problema:** ROADMAP.md tinha tarefas conflitantes: "Fork do template" e "Criar estrutura do projeto".
- **Solução:** Fase 0 agora começa com fork do template, mas inclui decisão explícita: "Se template falhar, pivotar para scaffold limpo".
- **Impacto:** Evita tentar fazer as duas coisas ao mesmo tempo.
- **Arquivos afetados:** `ROADMAP.md`.

#### 19. Fase 3 (GitHub) marcada como paralelizável

- **Problema:** Fase 3 parecia sequencial, mas pode rodar em paralelo com Fase 2.
- **Solução:** Adicionada nota em "Dependências entre Fases": "Fase 3 pode rodar em paralelo com Fase 2 (GitHub é independente)."
- **Impacto:** Ganho de tempo no cronograma.
- **Arquivos afetados:** `ROADMAP.md`.

---

## Estado Pós-Revisão

| Documento | Status | Observações |
|---|---|---|
| `.cursorrules` (raiz) | ✅ Revisado e criado | Pronto para uso no Cursor |
| `docs/VISION.md` | ✅ Não alterado | Estava correto desde a geração |
| `docs/ARCHITECTURE.md` | ✅ Reescrito | Tailwind v4, shadcn v4, rotas simplificadas |
| `docs/PROMPTS.md` | ✅ Reescrito | Fase 0, tempos reais, DemoModal, Tailwind v4 |
| `docs/CONTENT.md` | ✅ Reescrito | Notas sobre links, 6 cases na home, ícones verificados |
| `docs/ROADMAP.md` | ✅ Reescrito | Fase 0, dependências, tempos reais, paralelização |
| `docs/CHECKLIST.md` | ✅ Reescrito | Severidade, primeira execução, pré-deploy, pós-lançamento |
| `docs/INDEX.md` | ✅ Reescrito | `.cursorrules` na raiz, Fase 0, CHANGELOG |
| `docs/CHANGELOG.md` | ✅ Criado | Este documento |

---

## Próximos Passos Recomendados (Pós-Revisão)

1. **Executar Fase 0:** Fork do template e setup inicial (verificar se Tailwind v4 funciona).
2. **Decisão técnica:** Se template usar Tailwind v3, decidir entre migrar ou manter.
3. **Preencher dados pessoais:** Email, LinkedIn e GitHub em `CONTENT.md` e `data/content.ts`.
4. **Criar conta Streamlit Cloud:** Necessária para Fase 2 (Demos).
5. **Primeiro deploy:** Após Fase 1 (Landing Page), fazer deploy na Vercel para testar.

---

## Revisão v1.1 — Junho de 2026 — Fase 0 + Fase 1 (Landing Page)

**Autor:** Gerente de projeto (Cursor Agent)
**Contexto:** Execução E2E dos prompts 0.1–2.6 de `PROMPTS.md`.

### Fase 0 — Concluída

- Scaffold limpo Next.js 16.2.9 + Tailwind v4 + shadcn/ui (pivot em relação ao fork jigar-sable).
- `design/design.md`, `next.config.ts` (static export), paleta em `globals.css`.
- Git inicializado, `AGENTS.md` e extensões VS Code recomendadas.

### Fase 1 — Concluída

- `data/content.ts` completo com tipos TypeScript (prompt 1.1).
- 7 componentes base + 8 seções + `HomePage` com Intersection Observer (prompts 1.2–2.6).
- Metadata OG/Twitter, viewport, Inter + Geist em `layout.tsx`.
- `npm run build` passa (static export).

### Decisões de gestão

| Decisão | Motivo |
|---------|--------|
| Scaffold limpo vs fork | Tailwind v4 nativo, sem conflito com docs/ existente |
| Case 07 fora do grid default | Grid 3×2 simétrico; botão "Ver todos os cases" |
| Ícones LinkedIn/GitHub | Lucide v0.5x removeu brand icons → `Link` + `Code2` |
| Demo sem URL | Modal exibe placeholder até Fase 2 (Streamlit) |

### Pendências antes do deploy (Fase 4)

- [ ] Preencher email, LinkedIn, GitHub em `CONTENT.md` e `data/content.ts`
- [ ] `public/og-image.png`, `robots.txt`, `sitemap.xml`
- [ ] URLs de demo Streamlit nos cases P0
- [ ] Commit/push e deploy Vercel

### Próxima fase

**Fase 2 (deploy)** — Streamlit Cloud + `.env.local` com `NEXT_PUBLIC_DEMOS_BASE_URL`
**Fase 4** — Vercel, formulário, SEO

---

## Revisão v1.2 — Junho de 2026 — Fase 2 (Demos Streamlit)

**Autor:** Gerente de projeto (Cursor Agent)

### Entregue

- Pasta `demos-logistica/` com 5 pages Streamlit + CSVs sintéticos
- Pages: `01_precificacao_frete`, `02_mini_torre_controle`, `03_cvrp_urbano`, `04_promessa_cep`, `07_classificador_ocorrencias`
- `data/content.ts`: `DEMOS_BASE_URL`, `demoUrl()`, `CASE_DEMO_SLUGS`
- `.env.example` para URL do Streamlit Cloud

### Decisão de numeração

| Page | Motivo |
|------|--------|
| `02_mini_torre_controle` | Alinhado ao case P0 da landing (case 02) |
| `03_cvrp_urbano` | Prompt 3.3 — demo técnica extra |
| `04_promessa_cep` | Case P0 promessa (case 03) |

### Pendente (manual)

- [x] Deploy Streamlit Cloud
- [x] Deploy Vercel
- [x] `NEXT_PUBLIC_DEMOS_BASE_URL` na Vercel
- [ ] `NEXT_PUBLIC_FORMSPREE_FORM_ID` na Vercel
- [ ] Preencher email, LinkedIn, GitHub em `data/content.ts`
- [ ] Criar `public/og-image.png` e `public/favicon.ico`

---

## Revisão v1.4 — Junho de 2026 — Deploy Vercel + avaliação

### Deploy

- Landing em produção: <https://portfolio-lucas-batista-murex.vercel.app>
- Streamlit: <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app>
- Pivot de static export (`dist/`) para **Next.js nativo** na Vercel
- Removido `vercel.json`; Output Directory deve ficar vazio (override desligado)
- Env vars de produção: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMOS_BASE_URL`

### Documentação

- Novo: `docs/AVALIACAO.md` — problemas, melhorias, próximos passos
- Atualizados: README, AGENTS, INDEX, ROADMAP, CHECKLIST, DEPLOY, PROMPTS (4.1), ARCHITECTURE

### Pendências confirmadas

- `[substituir pelo real]` em email/LinkedIn/GitHub
- `public/og-image.png`, `public/favicon.ico` — **não existem** (CHANGELOG v1.3 estava incorreto)
- `NEXT_PUBLIC_FORMSPREE_FORM_ID` — não configurado
- Lighthouse / QA mobile — não executado

---

## Revisão v1.3 — Junho de 2026 — GitHub + Fase 4 parcial

### Repositórios GitHub (conta lucasdevlogis-cpu)

- <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista>
- <https://github.com/lucasdevlogis-cpu/demos-logistica>

> Conta `lucas109895-dev` foi desvinculada do `gh` CLI. Exclua repos antigos manualmente se ainda existirem.

### Fase 4 (parcial)

- `public/robots.txt`, `public/sitemap.xml`
- Formulário com Formspree (`NEXT_PUBLIC_FORMSPREE_FORM_ID`)
- Schema.org JSON-LD em `layout.tsx`
- `docs/DEPLOY.md`
- ⚠️ `og-image.png` e `favicon.ico` referenciados em `layout.tsx` mas **ainda não criados**
- ⚠️ `vercel.json` foi removido na v1.4 (não usar)

---

*Changelog da documentação. Atualize a cada revisão significativa.*
