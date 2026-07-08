# Skill: SEO e Meta Tags

## Descricao
Configuracoes de SEO tecnico e meta tags para maxima visibilidade em buscadores e compartilhamento no LinkedIn.

## Meta Tags Obrigatorias

### layout.tsx — Configuracao Global
```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  // Basico
  title: "Lucas Farias Batista | Analista de Transportes Senior — Operacoes, Dados e IA Aplicada",
  description: "Portfolio profissional com 10 provas navegaveis em frete, SLA, last mile e IA aplicada. +10 anos de experiencia e +R$ 20M em impacto financeiro mensuravel.",
  
  // Open Graph (LinkedIn, Facebook, WhatsApp)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portfolio-lucas-batista-murex.vercel.app",
    siteName: "Lucas Farias Batista — Portfolio Profissional",
    title: "Lucas Farias Batista | Analista de Transportes Senior",
    description: "10 provas navegaveis em logistica, dados e IA aplicada. +R$ 20M em impacto financeiro.",
    images: [
      {
        url: "https://portfolio-lucas-batista-murex.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio de Lucas Farias Batista — Analista de Transportes Senior",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Lucas Farias Batista | Analista de Transportes Senior",
    description: "10 provas navegaveis em logistica, dados e IA aplicada. +R$ 20M em impacto financeiro.",
    images: ["https://portfolio-lucas-batista-murex.vercel.app/og-image.jpg"],
  },
  
  // Favicon e Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical
  alternates: {
    canonical: "https://portfolio-lucas-batista-murex.vercel.app",
  },
  
  // Keywords (meta search engines)
  keywords: [
    "analista de transportes",
    "logistica",
    "operacoes",
    "dados",
    "inteligencia logistica",
    "SLA",
    "OTD",
    "custo de frete",
    "roteirizacao",
    "last mile",
    "power bi",
    "python",
    "streamlit",
    "supply chain",
  ],
  
  // Autor
  authors: [{ name: "Lucas Farias Batista" }],
  creator: "Lucas Farias Batista",
  publisher: "Lucas Farias Batista",
  
  // Verificacao
  verification: {
    google: "seu-codigo-de-verificacao",
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
    image: "https://portfolio-lucas-batista-murex.vercel.app/lucas-batista.jpg",
    sameAs: [
      "https://linkedin.com/in/lucasfariaslog",
      "https://github.com/lucasdevlogis-cpu",
    ],
    worksFor: {
      "@type": "Organization",
      name: "GRUPO SBF (Centauro e Nike)",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "USP/Esalq",
        description: "MBA Data Science e Analytics",
      },
      {
        "@type": "EducationalOrganization",
        name: "UNIP",
        description: "MBA Engenharia Logistica",
      },
    ],
    knowsAbout: [
      "Logistica",
      "Analise de Dados",
      "Business Intelligence",
      "Supply Chain",
      "Transporte",
      "IA Aplicada",
      "Power BI",
      "Python",
      "Roteirizacao",
      "Last Mile",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sao Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
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

### sitemap.ts
```tsx
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-lucas-batista-murex.vercel.app";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/provas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/provas/simulador-custo-frete`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ... demais provas
  ];
}
```

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
| Provas (lista) | /provas | 0.9 |
| Prova: Frete | /provas/simulador-custo-frete | 0.8 |
| Prova: Torre | /provas/torre-controle-entregas | 0.8 |
| Prova: CVRP | /provas/roteirizacao-urbana-cvrp | 0.8 |
| CV PDF | /lucas-batista-cv.pdf | 0.5 |

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
