# Deploy — Portfólio Lucas Batista

Guia de deploy. Conta GitHub: **lucasdevlogis-cpu** (`lucas.dev.logis@gmail.com`).

## Repositórios (conta correta)

| Repo | URL |
|------|-----|
| Landing Next.js | <https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista> |
| Demos Streamlit | <https://github.com/lucasdevlogis-cpu/demos-logistica> |

> **Nota:** Repositórios criados anteriormente em `lucas109895-dev` devem ser excluídos manualmente em GitHub → Settings → Delete repository.

---

## 1. Streamlit Cloud (demos)

Desenvolvimento na pasta local `demos-logistica/` deste workspace. Publicação: **copiar a pasta** para o repo GitHub que alimenta o Streamlit Cloud.

1. Acesse [share.streamlit.io](https://share.streamlit.io) e faça login com GitHub.
2. App apontando para `lucasdevlogis-cpu/demos-logistica` · **Branch:** `main` · **Main file path:** `app.py`
3. URL atual:

```
https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

### Publicar alterações das demos

```powershell
# clone único (se ainda não existir)
git clone https://github.com/lucasdevlogis-cpu/demos-logistica.git ..\demos-logistica-deploy

# a cada release: copiar da pasta local deste repo
robocopy demos-logistica ..\demos-logistica-deploy /E /XD .git __pycache__ .venv .pytest_cache /NFL /NDL /NJH /NJS

cd ..\demos-logistica-deploy
git add -A
git commit -m "sync: atualiza demos do portfolio-lucas-batista"
git push origin main
```

O Streamlit Cloud redeploya automaticamente após o push.

### Verificação local antes do push

```bash
cd demos-logistica
pip install -r requirements.txt
python scripts/build_datasets.py
python scripts/smoke_test.py   # meta: 12/12 pages OK
streamlit run app.py
```

### Conectar à landing

Na Vercel (ou `.env.local` local):

```env
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app
```

**Rebuild** o Next.js após definir ou alterar a variável.

> **10 cases demonstráveis** na landing mapeiam para 10 pages Streamlit via `CASE_DEMO_SLUGS` em `data/content.ts`. Após adicionar ou alterar cases, faça **Redeploy** na Vercel.

---

## 2. Vercel (landing)

1. Acesse [vercel.com/new](https://vercel.com/new) → importe `portfolio-lucas-batista`.
2. **Framework Preset:** Next.js (detecção automática).
3. **Build command:** deixe em branco (usa `npm run build`, que roda `prebuild` → `npm run validate` antes; um desync de cases/slug falha o deploy).
4. **Output Directory:** deixe em branco — **não** preencha `dist`, `out` nem `.next`.
5. **Environment variables:**

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://portfolio-lucas-batista-murex.vercel.app` |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL do Streamlit Cloud (já deployada) |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ID Formspree (opcional) |

6. Deploy.

> **URLs de demo:** `linkDemo` em `data/content.ts` é calculado **no build**. Slugs seguem a URL Streamlit (sem prefixo numérico: `08_ship_from_store.py` → `/ship_from_store`). Após alterar `NEXT_PUBLIC_DEMOS_BASE_URL` ou `CASE_DEMO_SLUGS`, faça **Redeploy** na Vercel.

**Produção atual:**

| Serviço | URL |
|---------|-----|
| Landing | <https://portfolio-lucas-batista-murex.vercel.app> |
| Demos | <https://demos-logistica-btzrqdx4gjru2c3ekzbtkq.streamlit.app> |

**Importante — toggles de override no painel:** em cada campo (Framework, Build Command, Output Directory, Install Command), o toggle **Override deve estar DESLIGADO** (usar padrão). Não basta deixar o campo vazio com override ligado — isso grava `outputDirectory: ""` e faz a Vercel pular o build do Next.js (site vazio / 404).

### Erro `routes-manifest.json` ou output `dist` não encontrado

Esse erro aparece quando a Vercel procura artefatos do Next.js (`.next/routes-manifest.json`), mas o **Output Directory** no painel aponta para pasta errada (`dist`, `out`, etc.) ou um `vercel.json` antigo força `outputDirectory`.

**Correção (neste projeto):**

1. **Project Settings → General → Build & Output**
   - Output Directory: **vazio** (padrão)
   - Build Command: **vazio** ou `npm run build`
   - Framework: **Next.js**
2. Remova `vercel.json` do repo se existir com `outputDirectory` ou `framework`.
3. O projeto **não** usa `output: 'export'` — a Vercel roda `next build` e usa `.next/` nativamente.
4. **Redeploy** após salvar.

---

```bash
npx vercel login
npx vercel --prod
```

---

## 3. Formspree (formulário de contato)

1. Crie conta em [formspree.io](https://formspree.io).
2. Novo form → copie o ID (ex: `abcxyzde`).
3. Adicione `NEXT_PUBLIC_FORMSPREE_FORM_ID=abcxyzde` na Vercel e faça **Redeploy**.
4. Sem ID configurado, o form abre um `mailto` pré-preenchido para o e-mail do `data/content.ts` (o lead não se perde).

---

## 4. Checklist pós-deploy

- [ ] Site abre na URL Vercel
- [ ] **10 cases** aparecem na grade com filtro por categoria
- [ ] Demos abrem no modal (iframe) com contexto de negócio
- [ ] Link "Abrir em nova aba" no modal funciona
- [ ] Formulário envia (Formspree) ou abre `mailto`
- [ ] `robots.txt` e `sitemap.xml` acessíveis
- [ ] `og-image.png` aparece no preview de link (LinkedIn/WhatsApp)
- [ ] email, LinkedIn, GitHub preenchidos em `data/content.ts`
- [ ] Lighthouse ≥ 90 em mobile

---

## 5. Atualizar URLs estáticas

Após definir domínio final, editar:

- `public/robots.txt` — linha Sitemap
- `public/sitemap.xml` — `<loc>`
- `.env.example` — exemplos

Ou usar `NEXT_PUBLIC_SITE_URL` em build futuro (sitemap dinâmico = pós-MVP).
