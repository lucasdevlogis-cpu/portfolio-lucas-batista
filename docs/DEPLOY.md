# Deploy — Portfólio Lucas Batista

Guia de deploy. Conta GitHub: **lucasdevlogis-cpu** (`lucas.dev.logis@gmail.com`).

## Repositórios (conta correta)

| Repo | URL |
|------|-----|
| Landing Next.js | https://github.com/lucasdevlogis-cpu/portfolio-lucas-batista |
| Demos Streamlit | https://github.com/lucasdevlogis-cpu/demos-logistica |

> **Nota:** Repositórios criados anteriormente em `lucas109895-dev` devem ser excluídos manualmente em GitHub → Settings → Delete repository (a conta foi desvinculada do `gh` CLI).

---

## 1. Streamlit Cloud (demos)

1. Acesse [share.streamlit.io](https://share.streamlit.io) e faça login com GitHub.
2. **New app** → repositório `lucasdevlogis-cpu/demos-logistica`.
3. **Branch:** `main` · **Main file path:** `app.py`
4. Deploy. Anote a URL (ex: `https://demos-logistica-xxxxx.streamlit.app`).

### Conectar à landing

Na Vercel (ou `.env.local` local):

```env
NEXT_PUBLIC_DEMOS_BASE_URL=https://SUA-URL.streamlit.app
```

Rebuild o Next.js após definir a variável.

---

## 2. Vercel (landing)

1. Acesse [vercel.com/new](https://vercel.com/new) → importe `portfolio-lucas-batista`.
2. **Framework:** Next.js (detectado automaticamente).
3. **Build command:** `npm run build`
4. **Output directory:** `dist` (já em `vercel.json`).
5. **Environment variables:**

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://portfolio-lucas-batista.vercel.app` (ou domínio custom) |
| `NEXT_PUBLIC_DEMOS_BASE_URL` | URL do Streamlit Cloud |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ID Formspree (opcional) |

6. Deploy.

### CLI (alternativa)

```bash
npx vercel login
npx vercel --prod
```

---

## 3. Formspree (formulário de contato)

1. Crie conta em [formspree.io](https://formspree.io).
2. Novo form → copie o ID (ex: `abcxyzde`).
3. Adicione `NEXT_PUBLIC_FORMSPREE_FORM_ID=abcxyzde` na Vercel.
4. Sem ID configurado, o form faz `console.log` + mensagem de sucesso (modo dev).

---

## 4. Checklist pós-deploy

- [ ] Site abre na URL Vercel
- [ ] Demos P0 abrem no modal (iframe)
- [ ] Formulário envia (Formspree) ou log no console
- [ ] `robots.txt` e `sitemap.xml` acessíveis
- [ ] Preencher email, LinkedIn, GitHub em `data/content.ts`
- [ ] Lighthouse > 85 em mobile

---

## 5. Atualizar URLs estáticas

Após definir domínio final, editar:

- `public/robots.txt` — linha Sitemap
- `public/sitemap.xml` — `<loc>`
- `.env.example` — exemplos

Ou usar `NEXT_PUBLIC_SITE_URL` em build futuro (sitemap dinâmico = pós-MVP).
