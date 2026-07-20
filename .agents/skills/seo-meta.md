# Skill: SEO e metadados

> Fontes: `app/layout.tsx`, `data/content.ts` e `scripts/generate-seo-files.ts`.

- Título, descrição, keywords e job title vêm de `CONTENT.siteMetadata`.
- Canonical e Open Graph usam `NEXT_PUBLIC_SITE_URL`.
- OG image: `public/og-image.jpg`, 1200×630, alt descritivo.
- JSON-LD Person não inclui foto até existir asset profissional real.
- `sameAs` contém LinkedIn e GitHub.
- Sitemap inclui `/`, CV e as 3 rotas `/provas/{slug}`.
- Demos Streamlit não entram no sitemap da landing.
- `prebuild` executa `npm run seo:generate`; não editar robots/sitemap manualmente.

Depois de mudar URL, metadata ou slugs: rode build, valide os arquivos em `public/` e confira produção.
