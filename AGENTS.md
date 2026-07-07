# AGENTS.md — Portfólio Lucas Batista

Guia completo para agentes de código (Cursor, Kimi Code, Codex, etc.) trabalhando neste repositório. Leia este arquivo antes de fazer qualquer alteração. O projeto usa principalmente **português do Brasil** em copy, comentários e documentação.

---

## 1. Visão geral do projeto

Este repositório contém o **portfólio profissional de Lucas Batista**, posicionado como um *Executive Proof System*: um dossiê headhunter-first para avaliação rápida de fit profissional em operações, dados e inteligência logística.

**Objetivo do site:** em até 60 segundos, um headhunter ou líder de operações deve entender quem é Lucas, para quais posições o perfil faz sentido, quais provas técnicas existem, qual stack/domínios aparecem no trabalho e como contatar.

**O que o projeto NÃO é:** landing comercial, currículo genérico, vitrine SaaS ou fluxo Figma.

**Estrutura de alto nível:**

- Landing one-page em Next.js 16 + React 19 + TypeScript + Tailwind CSS v4.
- Demos interativas em Streamlit (pasta `demos-logistica/`), embedadas na landing via iframe.
- CV PDF gerado automaticamente a partir do mesmo conteúdo da landing.
- Deploy na Vercel (landing) e Streamlit Cloud (demos).

**URLs de produção:**

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos Streamlit | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |
| GitHub landing | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| GitHub demos | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

---

## 2. Stack tecnológica

### Landing (Next.js)

| Tecnologia | Versão / Configuração |
|------------|----------------------|
| Framework | Next.js 16.2.9 (App Router) |
| React | 19.2.4 |
| TypeScript | 5.x |
| Node.js | 24.x (`package.json` `engines`) |
| Estilo | Tailwind CSS v4 (configuração CSS-only em `app/globals.css`) |
| UI components | shadcn/ui (`components/ui/`) |
| Ícones | Lucide React |
| Animação | Framer Motion 12.x (entrada, hover e micro-interações em toda a landing) |
| Fonte | Inter via `next/font/google` |
| Bundler | Turbopack |

**Importante:** Tailwind v4 não usa `tailwind.config.ts`. Todas as variáveis, cores e tokens customizados estão em `app/globals.css` dentro do bloco `@theme inline` e `:root`. Não crie um `tailwind.config.ts`.

### Demos (Streamlit)

| Tecnologia | Uso |
|------------|-----|
| Python | 3.x |
| Streamlit | ≥ 1.39.0 |
| Pandas / NumPy | Dados e modelagem |
| Plotly | Gráficos interativos |
| Folium + streamlit-folium | Mapas |

A UI das demos é padronizada por `demos-logistica/lib/ui.py`, com tokens de marca em `demos-logistica/lib/brand.py`.

---

## 3. Organização do código

### Raiz do projeto

```
portfolio-lucas-batista/
├── app/                    # App Router Next.js
│   ├── globals.css         # Tailwind v4 + tokens CSS
│   ├── layout.tsx          # Metadata, viewport, fonte Inter, JSON-LD
│   └── page.tsx            # Renderiza <HomePage />
├── components/             # Componentes React ativos
│   ├── ui/                 # shadcn/ui (button, card, dialog, badge)
│   ├── archive/            # Componentes shelved (não montar)
│   ├── HomePage.tsx        # Monta a página na ordem canônica
│   ├── Header.tsx          # Nav fixa
│   ├── Hero.tsx            # Primeira dobra executiva
│   ├── ProfileSection.tsx  # #perfil
│   ├── Cases.tsx           # #cases (âncora + biblioteca + roadmap)
│   ├── CaseCard.tsx        # Card de case study
│   ├── CaseLibraryInteractive.tsx  # Filtros da biblioteca
│   ├── CaseDemoLauncher.tsx        # Botão/demo launcher
│   ├── DemoModal.tsx               # Modal com iframe Streamlit
│   ├── TrajectorySection.tsx       # #trajetoria
│   ├── Contato.tsx                 # #contato
│   ├── Footer.tsx                  # Rodapé
│   ├── SectionHeader.tsx           # Eyebrow + título + lead
│   ├── EditorialDarkPanel.tsx      # Painel escuro reutilizável
│   ├── MobileNav.tsx               # Menu mobile
│   └── LucideIconByName.tsx        # Resolução dinâmica de ícones
├── data/
│   ├── content.ts          # SSOT de copy, cases, links, nav
│   └── archive/            # Copy shelved (não usar sem aprovação)
├── lib/
│   ├── utils.ts            # `cn()` do shadcn
│   ├── lucide-icons.ts     # Mapa nome → componente Lucide
│   └── scroll.ts           # Helpers de scroll suave
├── scripts/
│   ├── validate-cases.ts   # Validação de cases (prebuild)
│   ├── export-cv-content.ts# Exporta content.ts → public/cv-export.json
│   └── generate-cv-pdf.py  # Gera public/lucas-batista-cv.pdf
├── demos-logistica/        # App Streamlit (subprojeto Python)
│   ├── app.py              # Home das demos
│   ├── paths.py            # DATA_DIR
│   ├── pages/              # 11 pages Streamlit
│   ├── lib/                # brand, ui, viz, folium_maps, geo, frete, format, tables
│   ├── data/               # Datasets gerados
│   ├── data/raw/           # Amostras curadas
│   ├── scripts/
│   │   ├── build_datasets.py   # Gera CSVs com seed fixa
│   │   ├── smoke_test.py       # 13 checagens (12 scripts + 1 borda)
│   │   └── validate_slugs.py   # Valida slugs landing ↔ pages
│   └── .streamlit/config.toml  # Tema + toolbarMode minimal
├── design/
│   ├── design.md           # Spec visual ativa
│   └── tokens.md           # Resumo de tokens
├── docs/
│   ├── CANON.md            # Porta de entrada única (SSOT docs)
│   ├── AVALIACAO.md        # Estado, fases, bloqueadores
│   ├── DEPLOY.md           # Deploy Vercel + Streamlit
│   ├── VERCEL.md           # Operação e auditoria Vercel
│   └── OPORTUNIDADES_DEMOS.md  # Backlog de demos
├── public/                 # Assets estáticos
│   ├── og-image.jpg
│   ├── lucas-batista-cv.pdf
│   ├── cv-export.json
│   ├── robots.txt
│   └── sitemap.xml
├── .cursorrules            # Regras do Cursor (auto-load)
├── .codex/AGENTS.md        # Guia Codex
├── package.json
├── next.config.ts          # Configuração mínima do Next.js
├── tsconfig.json
└── eslint.config.mjs
```

### Ordem canônica da homepage (DOM = nav = scroll)

```
Header → Hero → ProfileSection (#perfil) → Cases (#cases) → TrajectorySection (#trajetoria) → Contato (#contato) → Footer
```

A nav exibe: **Perfil · Provas · Trajetória · Contato**.

### Componentes ativos (não usar archive sem aprovação)

`Header`, `Hero`, `ProfileSection`, `SectionHeader`, `EditorialDarkPanel`, `TrajectorySection`, `Cases`, `CaseCard`, `CaseLibraryInteractive`, `CaseDemoLauncher`, `DemoModal`, `Contato`, `Footer`, `HomePage`, `MobileNav`, `LucideIconByName`, `AnimatedSection`.

---

## 4. Fonte da verdade (SSOT)

| Domínio | Fonte | Não usar |
|---------|-------|----------|
| Copy ativo (landing) | `data/content.ts` | Hardcode nos componentes |
| Copy shelved (comercial) | `data/archive/content-consultoria.ts` | Remontar sem aprovação |
| Spec visual + IA | `design/design.md` | Figma |
| Tokens landing | `app/globals.css` + `design/tokens.md` | Hex inline |
| Tokens demos Streamlit | `demos-logistica/lib/brand.py` | — |
| Padrões viz demos | `.agents/skills/portfolio-demos-viz/SKILL.md` | Specs obsoletas em OPORTUNIDADES |
| Estado do projeto | `docs/AVALIACAO.md` | Claims "100%" sem QA |
| Deploy / Vercel | `docs/DEPLOY.md`, `docs/VERCEL.md` | SHAs hardcoded |
| CV PDF | Gerado de `content.ts` via `npm run cv:generate` | Copy manual no Python |

**Regra de ouro:** todo texto, link, case, CTA, métrica e rótulo da landing vêm de `data/content.ts`. Componentes não devem hardcodar narrativa de carreira, rótulos de CTA ou textos comerciais.

### Cases e demos

- **10 cases demonstráveis** mapeados em `CASE_DEMO_SLUGS` em `data/content.ts`.
- **3 cases âncora** listados em `featuredProofCases` (`01-precificacao-frete`, `02-torre-controle`, `08-cvrp-urbano`).
- **1 roadmap** (`06-kpis-cd`) — sem demo publicada.
- `linkDemo` é derivado automaticamente de `CASE_DEMO_SLUGS` e `NEXT_PUBLIC_DEMOS_BASE_URL`. Nunca declare `linkDemo` manualmente.
- A URL Streamlit usa o **slug sem prefixo numérico**: `pages/08_ship_from_store.py` → `/ship_from_store`.

---

## 5. Comandos de build e teste

### Landing Next.js

```bash
# Instalar dependências
npm install

# Ambiente local
npm run dev                 # http://localhost:3000

# Validação (obrigatória antes do build)
npm run validate            # roda scripts/validate-cases.ts

# Lint
npm run lint                # ESLint 9 (eslint.config.mjs)

# Build de produção (prebuild roda validate automaticamente)
npm run build

# Servir build local
npm run start               # http://localhost:3000

# Gerar CV PDF
npm run cv:generate         # npm run cv:export + python scripts/generate-cv-pdf.py
```

### Demos Streamlit

```bash
cd demos-logistica

# Ambiente Python isolado (recomendado)
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows

pip install -r requirements.txt

# Gerar datasets reprodutíveis
python scripts/build_datasets.py

# Smoke test: meta 13/13 checagens
python scripts/smoke_test.py

# Rodar localmente
streamlit run app.py        # http://localhost:8501
```

### Verificação completa recomendada

```bash
npm run validate && npm run lint && npm run build
npm run cv:generate

cd demos-logistica
python scripts/build_datasets.py
python scripts/smoke_test.py   # 13 checagens
```

---

## 6. Instruções de teste

### Landing

- `npm run validate` é o teste principal: valida contagem de cases, slugs, ícones Lucide, campos obrigatórios, consistência `linkDemo` e correspondência com arquivos `demos-logistica/pages/*.py`.
- `npm run lint` usa `eslint-config-next` (core-web-vitals + typescript).
- `npm run build` deve passar sem erros. O `prebuild` roda `validate` automaticamente.
- QA manual pós-deploy está documentado em `docs/VERCEL.md` (checklist: modal demo, OG image, Lighthouse mobile ≥ 90, links de contato, etc.).

### Demos

- `python scripts/smoke_test.py` executa cada page via `AppTest` e reporta exceções.
- Inclui um teste de borda: filtro vazio na Mini Torre de Controle (page 02).
- Meta: **13/13 checagens OK**.
- Sempre rode `build_datasets.py` antes de `smoke_test.py` se os datasets ainda não existirem.
- Verifique visualmente a página alterada em tela cheia **e** em embed (`?embed=true`).

---

## 7. Diretrizes de estilo de código

### TypeScript / React

- Todos os componentes são **React function components** com TypeScript.
- Use `interface` ou `type` para tipagem. Evite `any`.
- Use Tailwind classes utilitárias. Não crie CSS custom a menos que necessário.
- Para concatenação condicional de classes, use `cn()` de `lib/utils.ts`.
- Imagens: use placeholders, ícones Lucide ou SVG. Nunca imagens genéricas de stock.
- Textos: **sempre em português do Brasil**. Nunca hardcode — importe de `data/content.ts`.
- SEO: meta tags, Open Graph, title, description em `layout.tsx`.
- Performance: lazy loading, `will-change` em animações, conteúdo essencial visível sem depender de JS.

### Tailwind CSS v4

- Configuração em `app/globals.css`.
- Use `@import "tailwindcss"` e `@theme inline` com variáveis CSS.
- Cores customizadas são definidas como variáveis CSS em `:root`.
- **Não crie `tailwind.config.ts`** — isso é v3.
- Tokens ativos: `editorial`, `card`, `ink`, `primary`, `accent`, `warm-accent`, `surface-dark`, `muted`, `border`.

### shadcn/ui

- Para adicionar componentes, use: `npx shadcn@latest add <nome>` (ex: `npx shadcn@latest add button card dialog`).
- Componentes atuais em `components/ui/`: `badge`, `button`, `card`, `dialog`.

### Python (demos)

- Todo texto da UI em português do Brasil.
- Cada demo deve deixar visível: problema, abordagem, stack, trade-off, métrica e limitação.
- Use `lib/ui.py`, `lib/viz.py`, `lib/brand.py`, `lib/folium_maps.py`, `lib/format.py`, `lib/tables.py` para padronizar.
- Não adicione segredos ou chaves de API hardcoded.
- Não introduza APIs pagas como dependências obrigatórias.

---

## 8. Variáveis de ambiente

Crie `.env.local` na raiz (não commitar — está no `.gitignore`). Modelo em `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

| Variável | Obrigatória | Ambientes | Descrição |
|----------|:-----------:|:---------:|-----------|
| `NEXT_PUBLIC_SITE_URL` | Sim | Production, Preview, Development | URL pública do site |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | Sim | Production, Preview, Development | URL base do Streamlit Cloud (sem `/` final) |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Não | — | Form removido; não usar |

`NEXT_PUBLIC_*` é embutida no bundle no **build**. Alterar env exige **redeploy**.

---

## 9. Processo de deploy

### Landing (Vercel)

- Target: Vercel (gratuito), Next.js nativo.
- **Não use** `output: 'export'` no `next.config.ts`.
- **Não crie** `vercel.json` com override de output directory.
- Configuração correta do painel:
  - Framework Preset: **Next.js**
  - Build Command: **vazio** (usa `npm run build`, que roda `prebuild` → `validate`)
  - Output Directory: **vazio** (usa `.next/` nativo)
  - Install Command: **vazio** (usa `npm install`)
- Env vars obrigatórias em Production, Preview e Development.
- Deploy manual (emergência): `npx vercel --prod`.

### Demos (Streamlit Cloud)

- Publicação: copiar a pasta `demos-logistica/` para o repo `lucasdevlogis-cpu/demos-logistica`.
- App aponta para branch `main`, main file path `app.py`.
- Streamlit Cloud redeploya automaticamente após push.

```powershell
# clone único
 git clone https://github.com/lucasdevlogis-cpu/demos-logistica.git ..\demos-logistica-deploy

# a cada release
robocopy demos-logistica ..\demos-logistica-deploy /E /XD .git __pycache__ .venv .pytest_cache /NFL /NDL /NJH /NJS
cd ..\demos-logistica-deploy
git add -A
git commit -m "sync: atualiza demos do portfolio-lucas-batista"
git push origin main
```

### Checklist pós-deploy

- [ ] Site abre na URL Vercel.
- [ ] 3 cases âncora + biblioteca filtrável + roadmap visíveis.
- [ ] Demos abrem no modal (iframe) com contexto de negócio.
- [ ] Link "Abrir em nova aba" no modal funciona.
- [ ] LinkedIn, email e GitHub funcionam na seção Contato.
- [ ] `robots.txt` e `sitemap.xml` acessíveis.
- [ ] `og-image.jpg` aparece no preview de link (LinkedIn/WhatsApp).
- [ ] Lighthouse ≥ 90 em mobile.
- [ ] CV PDF em `/lucas-batista-cv.pdf` acessível.

---

## 10. Considerações de segurança

- **Não commitar** `.env.local`, `.vercel/` nem `.venv/` (já estão no `.gitignore`).
- **Não adicionar** chaves de API, segredos ou credenciais no código.
- **Não introduzir** APIs pagas como dependências obrigatórias das demos.
- Dados das demos são **sintéticos, públicos ou anonimizados** — nunca dados reais de operação.
- O ESLint ignora `demos-logistica/**` para evitar processar o `.venv` (que contém JS empacotado gigante e estoura memória).
- A landing não usa formulário na homepage; a seção Contato usa links diretos (LinkedIn, email, GitHub, CV PDF).

---

## 11. Arquivado / shelved (não montar sem aprovação)

Alguns componentes e copy foram deliberadamente retirados da homepage no pivot para *Executive Proof System*. Não remonte sem revisar `docs/CANON.md` e `docs/AVALIACAO.md`.

| Path | Conteúdo |
|------|----------|
| `components/archive/consultoria/` | Landing comercial (Dores, Serviços, Método, Sobre, IA) |
| `data/archive/content-consultoria.ts` | Copy shelved da landing comercial |
| `design/archive/` | Specs históricos, planos UX, Lighthouse antigo, tokens comerciais |

---

## 12. Integração landing ↔ demos

- As demos são embedadas via `DemoModal` usando iframe: `src="{demoUrl}?embed=true"`.
- O parâmetro `?embed=true` remove a toolbar do Streamlit (complementado por `toolbarMode = "minimal"` no `.streamlit/config.toml`).
- `DemoModal` inclui link "Abrir em nova aba" (URL sem `?embed=true`).
- O modal abre ao clicar no card; mobile reduz altura do iframe para ~500px.
- O mapeamento de slugs está em `data/content.ts` → `CASE_DEMO_SLUGS`.

---

## 13. Geração do CV PDF

O CV é gerado a partir de `data/content.ts` (SSOT):

1. `npm run cv:export` roda `scripts/export-cv-content.ts` e gera `public/cv-export.json`.
2. `scripts/generate-cv-pdf.py` lê `public/cv-export.json` e gera `public/lucas-batista-cv.pdf`.
3. `npm run cv:generate` executa os dois passos.

Fontes TTF candidatas: `scripts/assets/DejaVuSans.ttf`, Arial no Windows, DejaVu no Linux, Arial no macOS. Se nenhuma for encontrada, o script falha com instrução clara.

---

## 14. Documentação complementar

| Doc | Função |
|-----|--------|
| `docs/CANON.md` | Porta de entrada única — leia primeiro |
| `docs/AVALIACAO.md` | Snapshot de saúde, fases, bloqueadores, histórico |
| `docs/DEPLOY.md` | Guia completo de deploy Vercel + Streamlit |
| `docs/VERCEL.md` | Operação, env vars, MCP e checklist QA na Vercel |
| `docs/OPORTUNIDADES_DEMOS.md` | Backlog de demos |
| `design/design.md` | Spec visual ativa |
| `design/tokens.md` | Resumo de tokens CSS/Streamlit |
| `.cursorrules` | Regras do Cursor (auto-load) |
| `.codex/AGENTS.md` | Guia específico para Codex |
| `.agents/skills/portfolio-demos-viz/SKILL.md` | Padrões visuais das demos Streamlit |

---

*AGENTS.md vivo. Atualize quando mudar stack, ordem de seções, critérios de validação ou processo de deploy.*
