# Vercel — Operação e auditoria

> Referência operacional do projeto `portfolio-lucas-batista` na Vercel. Atualizado em 06/07/2026.

---

## Projeto

| Campo | Valor |
|-------|-------|
| **Team** | `lucasdevlogis-5294s-projects` (`team_lFpQBhlME8YgCExqLddidyuL`) |
| **Project ID** | `prj_9RX6OAg0tm1cLBEXOToIiEFh6hRq` |
| **Framework** | Next.js 16.2.9 (Turbopack no build) |
| **Node** | 24.x (`package.json` `engines`) |
| **Região runtime** | `iad1` |
| **Integração** | GitHub `lucasdevlogis-cpu/portfolio-lucas-batista` → branch `main` |

### URLs

| Tipo | URL |
|------|-----|
| **Produção (alias principal)** | <https://portfolio-lucas-batista-murex.vercel.app> |
| **Produção (git main)** | <https://portfolio-lucas-batista-git-main-lucasdevlogis-5294s-projects.vercel.app> |
| **Inspector (último deploy)** | [Vercel Dashboard](https://vercel.com/lucasdevlogis-5294s-projects/portfolio-lucas-batista) |

---

## Configuração de build (validada)

Configuração **correta** para Next.js App Router — confirmada via CLI, MCP e build logs.

| Setting | Valor esperado | Status |
|---------|----------------|--------|
| Framework Preset | Next.js | ✅ |
| Build Command | vazio (usa `npm run build`) | ✅ |
| Output Directory | vazio (usa `.next/` nativo) | ✅ |
| Install Command | vazio (usa `npm install`) | ✅ |
| `output: 'export'` | **não** usar | ✅ ausente em `next.config.ts` |
| `vercel.json` com override | **não** usar | ✅ ausente no repo |
| `prebuild` | `validate-cases.ts` | ✅ roda no deploy |
| Bundler | Turbopack | ✅ |

Build log típico: `validate-cases OK` → `next build` → rotas estáticas `/`, `/_not-found`, `/icon.png`.

---

## Variáveis de ambiente

| Variável | Production | Preview | Development | Obrigatória |
|----------|:----------:|:-------:|:-----------:|:-----------:|
| `NEXT_PUBLIC_SITE_URL` | ✅ | ✅ (corrigido 06/07) | ✅ (corrigido 06/07) | Sim |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | ✅ | ✅ (corrigido 06/07) | ✅ (corrigido 06/07) | Sim |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | — | — | — | **Não** (form removido) |

> `NEXT_PUBLIC_*` é embutida no bundle no **build**. Alterar env exige **Redeploy**.

### Valores de referência

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

### Sync local

```bash
npx vercel link          # se .vercel/ não existir
npx vercel env pull .env.local
```

`.vercel/` e `.env.local` estão no `.gitignore` — não commitar.

---

## Produção

Verificar commit e estado via CLI ou MCP — **não** confiar em SHA fixo neste doc.

```bash
npx vercel inspect portfolio-lucas-batista-murex.vercel.app
```

| Item | Referência |
|------|------------|
| **Layout** | Executive Proof — ver [`docs/CANON.md`](CANON.md) |
| **Runtime errors** | MCP `get_runtime_errors` |
| **Inspector** | [Vercel Dashboard](https://vercel.com/lucasdevlogis-5294s-projects/portfolio-lucas-batista) |

---

## MCP Vercel (Cursor)

Plugin habilitado em `.cursor/settings.json`. Para o fluxo atual também é possível usar `npx vercel --prod` após push na `main`.

| Tool | Uso |
|------|-----|
| `list_teams` / `list_projects` | Descobrir `teamId` e `projectId` |
| `get_project` | Domínios, último deploy, framework |
| `list_deployments` | Histórico + commit SHA do GitHub |
| `get_deployment` | Alias, estado, região, meta |
| `get_deployment_build_logs` | Diagnosticar falha de build |
| `get_runtime_errors` | Erros em produção |
| `web_fetch_vercel_url` | Fetch de URL Vercel (incl. auth interna) |
| `deploy_to_vercel` | Deploy manual do diretório atual |

### Fluxo de verificação pós-push

1. `list_deployments` → confirmar commit SHA e `READY`
2. `web_fetch_vercel_url` → smoke da homepage
3. `get_runtime_errors` → zerar erros pós-deploy
4. Checklist manual: modal demo, OG, Lighthouse

---

## CLI — comandos recorrentes

```bash
# Status do deploy de produção
npx vercel inspect portfolio-lucas-batista-murex.vercel.app

# Listar env vars
npx vercel env ls

# Deploy manual (emergência, sem push)
npx vercel --prod

# Logs de build do último deploy
npx vercel inspect <deployment-url> --logs
```

---

## Checklist pós-deploy (Executive Proof)

Sincronizado com [`docs/CANON.md`](CANON.md) §6 e [`docs/AVALIACAO.md`](AVALIACAO.md).

- [x] Build `READY` (Next.js nativo, validate-cases no prebuild)
- [x] Env `NEXT_PUBLIC_*` em Production, Preview e Development
- [ ] Homepage: Hero + Evidence + `#perfil` + `#cases` + `#trajetoria` + `#contato` (ordem scroll = nav) — revalidar após deploy
- [ ] Nav: Perfil · Provas · Trajetória · Contato — revalidar após deploy
- [ ] Modal demo + iframe `?embed=true` — links de demo no build com env Production
- [ ] `robots.txt` e `sitemap.xml` → 200
- [ ] OG preview (`public/og-image.jpg`) — asset 200 em prod
- [ ] Lighthouse mobile ≥ 90 — local **100/96/100/100** desktop; prod a revalidar
- [ ] Preview de PR — env Preview configurada 06/07 (herda `NEXT_PUBLIC_*`)
- [ ] CV PDF em `/lucas-batista-cv.pdf`

---

## O que **não** está configurado (backlog)

| Item | Impacto | Prioridade |
|------|---------|------------|
| Vercel Analytics | Sem métricas de visita | Baixa |
| Speed Insights | Sem Web Vitals contínuos | Baixa |
| Domínio custom | URL `*.vercel.app` provisória | Média |
| Sitemap dinâmico via `NEXT_PUBLIC_SITE_URL` | ✅ `npm run seo:generate` | Baixa |

---

## Erros conhecidos (troubleshooting)

### `routes-manifest.json` / output `dist` não encontrado

Output Directory no painel apontando para pasta errada. Corrigir: toggle **Override OFF**, campo vazio. Ver [`DEPLOY.md`](DEPLOY.md).

### Demos sem link no site

`NEXT_PUBLIC_DEMOS_BASE_URL` ausente no build. `validate-cases` avisa mas **não falha** — links ficam vazios. Garantir env em Production + redeploy.

### Preview de PR sem demos

Antes de 06/07: Preview não tinha env vars. Corrigido — novos previews herdam `NEXT_PUBLIC_*`.

---

*Manter sincronizado com `docs/DEPLOY.md` e `docs/AVALIACAO.md`.*
