# Skill: SEO e Meta Tags

## Descricao
Configuracoes de SEO tecnico e meta tags para maxima visibilidade em buscadores e compartilhamento no LinkedIn.

## Meta Tags Obrigatorias

### layout.tsx — Configuracao Global
```tsx
import { Inter, Source_Serif_4 } from "next/font/google";
import { Metadata } from "next";
import { CONTENT } from "@/data/content";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--font-serif" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-lucas-batista-murex.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: CONTENT.siteMetadata.title,
  description: CONTENT.siteMetadata.description,
  keywords: CONTENT.siteMetadata.keywords,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: CONTENT.siteMetadata.title,
    description: CONTENT.siteMetadata.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: CONTENT.siteMetadata.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTENT.siteMetadata.title,
    description: CONTENT.siteMetadata.description,
    images: ["/og-image.jpg"],
  },
};
```

## Schema.org — Structured Data

### Person Schema (pagina principal)
```tsx
// app/page.tsx ou layout.tsx
export default function Page() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lucas Farias Batista",
    jobTitle: "Analista de Transportes Senior",
    description: "Operacoes logisticas com dados, produto interno, IA aplicada e impacto mensuravel.",
    url: "https://portfolio-lucas-batista-murex.vercel.app",
    url: siteUrl,
    knowsAbout: [
      "Logística",
      "Supply Chain",
      "Análise de dados",
      "Frete",
      "E-commerce",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* resto da pagina */}
    </>
  );
}
```

## OG Image (1200x630)

### Requisitos
- Dimensao: 1200 x 630px (proporcao 1.91:1)
- Formato: JPG (qualidade 90%) ou PNG
- Tamanho maximo: 300KB
- Fundo: slate-900 (#0f172a)
- Texto: Nome + cargo + stats principais
- Fonte: Inter, branco + teal para acento

### Template Visual
```
+------------------------------------------+
|                                          |
|     Lucas Farias Batista                 |
|     Analista de Transportes Senior       |
|                                          |
|     +10 anos  |  +R$ 20M  |  10 provas   |
|                                          |
|     Operacoes, Dados e IA Aplicada       |
|                                          |
+------------------------------------------+
Fundo: #0f172a    Texto: #ffffff    Acento: #0d9488
```

## Sitemap

O projeto usa `scripts/generate-seo-files.ts` para gerar `public/sitemap.xml` e `public/robots.txt`. Regenere após alterações no conteúdo:

```bash
npm run seo:generate
```

### URLs indexadas

| URL | Priority | ChangeFreq |
|-----|----------|------------|
| `/` | 1.0 | weekly |
| `/lucas-batista-cv.pdf` | 0.5 | monthly |

As demos Streamlit são hospedadas em domínio próprio e não devem ser incluídas no sitemap da landing.

## robots.txt

```
User-Agent: *
Allow: /

Sitemap: https://portfolio-lucas-batista-murex.vercel.app/sitemap.xml
```

## URLs e Slugs
| Pagina | URL | Prioridade |
|--------|-----|------------|
| Home | / | 1.0 |
| CV PDF | /lucas-batista-cv.pdf | 0.5 |

As demos Streamlit são acessadas via modal (iframe) ou em nova aba no domínio `NEXT_PUBLIC_DEMOS_BASE_URL`. Slugs atuais (sem prefixo numérico):

| Case ID | Slug Streamlit |
|---------|----------------|
| `01-precificacao-frete` | `precificacao_frete` |
| `02-torre-controle` | `mini_torre_controle` |
| `03-promessa-cep` | `promessa_cep` |
| `04-ship-from-store` | `ship_from_store` |
| `05-auditoria-endereco` | `auditoria_endereco` |
| `07-classificador-ocorrencias` | `classificador_ocorrencias` |
| `08-cvrp-urbano` | `cvrp_urbano` |
| `09-vrptw-ultima-milha` | `vrptw_ultima_milha` |
| `10-rede-interhubs` | `rede_interhubs` |
| `11-tsp-baseline-sp` | `tsp_baseline_sp` |

## Keywords por Secao

### Home
Primary: "analista de transportes senior", "portfolio logistica dados"
Secondary: "operacoes logisticas", "inteligencia logistica", "provas tecnicas navegaveis"

### Provas
Primary: "simulador custo frete", "torre controle entregas", "roteirizacao urbana"
Secondary: "dashboard logistica", "analise SLA", "otimizacao last mile"

### Trajetoria
Primary: "experiencia logistica supply chain", "GRUPO SBF", "Centauro Nike"
Secondary: "analista supply chain", "gestao transportes", "KPIs logistica"
