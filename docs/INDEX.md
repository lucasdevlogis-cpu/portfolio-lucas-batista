# Documentação do Portfólio Lucas Batista — Índice da Arquitetura

> Este diretório (`docs/`) contém a documentação padronizada e unificada para execução do projeto de portfólio via vibecoding no Cursor. Todos os documentos são cross-referenciados e seguem uma única lógica de execução.
>
> **Última revisão:** Junho de 2026 — documento revisado por Especialista em Projetos Senior (Vibecoding, IA, Skills).

---

## Mapa dos Documentos

```
docs/
├── INDEX.md          ← Você está aqui. Mapa e guia de uso.
├── VISION.md         ← O QUÊ e o PORQUÊ (visão estratégica)
├── ARCHITECTURE.md   ← O COMO técnico (stack, arquitetura, design)
├── PROMPTS.md        ← Prompts de vibecoding copiar-colar
├── CONTENT.md        ← Todo o conteúdo textual do site
├── ROADMAP.md        ← Roteiro de execução com fases e prazos
├── CHECKLIST.md      ← Checklist de qualidade e pré-deploy
├── DEPLOY.md         ← Guia de deploy GitHub / Streamlit / Vercel
├── AVALIACAO.md      ← Avaliação atual: problemas, melhorias, próximos passos
├── CHANGELOG.md      ← Histórico de revisões e mudanças aplicadas
└── .cursorrules      ← Regras para Kimi Code no Cursor (NA RAIZ DO PROJETO)
```

> ⚠️ **Importante:** O arquivo `.cursorrules` deve estar na **raiz do projeto** (`portfolio-lucas-batista/.cursorrules`), não dentro de `docs/`. O Cursor só reconhece o arquivo quando está na raiz.

---

## Como Usar Esta Documentação

### Para começar um novo ciclo de vibecoding

1. Leia **VISION.md** para refrescar o posicionamento e a tese central.
2. Leia **ARCHITECTURE.md** para confirmar a stack e as decisões técnicas (especialmente Tailwind v4 e shadcn/ui).
3. Verifique que `.cursorrules` está na **raiz** do repositório (não em `docs/`).
4. Consulte **ROADMAP.md** para saber qual fase executar agora (Fase 0 = Design e Setup).
5. Use **PROMPTS.md** para copiar e colar os prompts no Cursor.
6. Use **CONTENT.md** como fonte de verdade para todos os textos.
7. Antes de deploy, execute **CHECKLIST.md**.
8. Consulte **AVALIACAO.md** para bloqueadores e melhorias prioritárias.
9. Consulte **CHANGELOG.md** para ver histórico de revisões.

### Para editar conteúdo sem tocar em código

1. Edite **CONTENT.md** com os novos textos.
2. Copie o conteúdo atualizado para `data/content.ts` no projeto Next.js.
3. O site atualiza automaticamente (Next.js hot reload).

### Para adicionar um novo case

1. Defina o case em **VISION.md** (seção 6) e **CONTENT.md** (seção 4).
2. Crie a demo Streamlit seguindo o padrão de **PROMPTS.md** (Fase 3).
3. Atualize o **ROADMAP.md** com a nova tarefa.
4. Valide com **CHECKLIST.md** antes de publicar.

### Para onboarding de novos colaboradores

1. Entregue este diretório `docs/` como o único ponto de entrada.
2. Peça para ler nesta ordem: INDEX → VISION → ARCHITECTURE → ROADMAP.
3. O restante é consulta sob demanda durante a execução.

---

## Princípios da Arquitetura

1. **Separação de concerns:** VISION (estratégia) ≠ ARCHITECTURE (técnica) ≠ CONTENT (textos) ≠ PROMPTS (execução).
2. **Cross-referenciamento:** Cada documento aponta para os outros quando necessário. Não há duplicação de informação.
3. **Single source of truth:** CONTENT.md é a única fonte de textos. ARCHITECTURE.md é a única fonte de decisões técnicas. VISION.md é a única fonte de posicionamento.
4. **Execução linear:** ROADMAP.md define a sequência. PROMPTS.md define os comandos. CHECKLIST.md define a validação.
5. **Vibecoding-ready:** `.cursorrules` (na raiz) + PROMPTS.md permitem que o Kimi Code no Cursor execute com contexto mínimo de briefing.
6. **Tailwind v4 first:** Toda a documentação assume Tailwind CSS v4 (CSS-based config via `@theme` em `globals.css`). Não usar `tailwind.config.ts`.

---

## Decisões Unificadas (Síntese dos 3 Documentos Originais + Revisões)

| Aspecto | Decisão Unificada | Fonte Principal | Nota da Revisão |
|---|---|---|---|
| **Posicionamento** | Inteligência operacional para logística, transporte, varejo e e-commerce | VISION.md | — |
| **Stack** | Next.js 16 + Tailwind CSS v4 + TypeScript + shadcn/ui + Framer Motion + Lucide React | ARCHITECTURE.md | Node 24.x em `package.json` |
| **Template** | Scaffold limpo (`create-next-app` + `shadcn@latest init`) | ARCHITECTURE.md | Pivot em Jun/2026 — não usar fork jigar-sable |
| **Execução** | Vibecoding via Cursor + Kimi Code + `.cursorrules` na raiz | PROMPTS.md | `.cursorrules` na raiz = requisito crítico |
| **Cases** | 7 cases (3 P0 + 2 P1 + 2 P2) | VISION.md + CONTENT.md | 6 cases na home para grid simétrico (3×2) |
| **Demos** | Streamlit Cloud com iframe embed (`?embed=true`) | ARCHITECTURE.md + DEPLOY.md | Pages: `01_precificacao_frete`, `02_mini_torre_controle`, `03_cvrp_urbano`, `04_promessa_cep`, `07_classificador_ocorrencias` |
| **Ofertas** | 5 níveis de serviço (diagnóstico → produto com IA) | VISION.md | Escada de contratação clara |
| **Público** | PMEs com operação rodando e dores de logística | VISION.md | — |
| **Política de dados** | Dados sintéticos/públicos com declaração explícita | VISION.md + CHECKLIST.md | Limitação declarada em cada case |
| **SEO** | Meta tags, OG, sitemap, robots, schema.org | ARCHITECTURE.md + CHECKLIST.md | og-image.png e favicon.ico ainda pendentes |
| **Deploy** | Vercel (Next.js nativo) + Streamlit Cloud | DEPLOY.md + AVALIACAO.md | Sem `output: 'export'`; Output Directory vazio no painel |
| **Tempo estimado** | ~60-80h de vibecoding (3-6 semanas a 2-4h/dia) | ROADMAP.md | Tempo realista, não ~4-5h |
| **Fase inicial** | Fase 0: Design + Setup do template (2 dias) | ROADMAP.md | Adicionada na revisão — antes não existia |

---

## Documentos Originais (Arquivados)

Os 3 documentos originais foram consolidados nesta arquitetura e estão arquivados em `docs/archive/`:

- `docs/archive/plano_estrategico_portfolio_autonomo_lucas.md` → **VISION.md** e **CONTENT.md**
- `docs/archive/referencias_portfolio_lucas.md` → **ARCHITECTURE.md**
- `docs/archive/VIBECODING_PLANO_TECNICO.md` → **PROMPTS.md**, **ROADMAP.md** e `.cursorrules`

---

## Histórico de Revisões

| Data | Versão | Autor | Mudanças Principais |
|---|---|---|---|
| Jun/2026 | v1.0 | Especialista Senior | Revisão crítica completa: `.cursorrules` movido para raiz, Fase 0 (Design) adicionada, tempos ajustados para ~60-80h realistas, Tailwind v4 configurado corretamente (CSS-based), shadcn init atualizado, DemoModal adicionado aos prompts, rotas simplificadas, CHECKLIST com severidade e primeira execução, CHANGELOG criado. |

Consulte **CHANGELOG.md** para detalhes completos de cada mudança.

---

*Arquitetura de documentação unificada. Mantenha este diretório atualizado como a única fonte de verdade do projeto.*
