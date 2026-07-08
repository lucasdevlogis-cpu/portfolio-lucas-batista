# Skill: Performance Web

## Descricao
Regras de performance para garantir carregamento rapido e experiencia fluida. Next.js ja faz muito, mas ha otimizacoes essenciais.

## Checklist de Performance

### Imagens
- [ ] Formato WebP para todas as imagens fotograficas
- [ ] Formato SVG para todos os icones e logos
- [ ] Tamanho maximo: 200KB por imagem
- [ ] Dimensao maxima: 1920px de largura (para hero)
- [ ] Usar `next/image` com `priority` apenas para imagens acima da fold
- [ ] Usar `loading="lazy"` para imagens abaixo da fold
- [ ] Implementar placeholder="blur" com blurDataURL
- [ ] Responsive sizes: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`

### Fonts
- [ ] Usar `next/font/google` para Inter e Source Serif 4
- [ ] Configurar `display: 'swap'`
- [ ] Subset: `subsets: ['latin']`
- [ ] Preconnect no `<head>`: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
- [ ] Usar `font-display: swap` no CSS fallback

### Componentes
- [ ] Dynamic import para secoes abaixo da fold:
```tsx
import dynamic from "next/dynamic";

const ProvasSection = dynamic(() => import("./sections/ProvasSection"), {
  loading: () => <div className="h-96 bg-slate-100 animate-pulse rounded-xl" />,
});
```
- [ ] Dynamic import para bibliotecas pesadas (charts, animacoes)

### CSS
- [ ] Tailwind com `content` configurado corretamente (apenas arquivos usados)
- [ ] PurgeCSS ja incluso no Tailwind (nao precisa configurar)
- [ ] Evitar `@import` de CSS externo (usar `<link>` no head)
- [ ] Minimizar CSS customizado (preferir Tailwind utilities)

### JavaScript
- [ ] `script` externos: usar `strategy="lazyOnload"` ou `strategy="afterInteractive"`
- [ ] Analytics: carregar async/deferred
- [ ] Sem bundles desnecessarios (verificar com `@next/bundle-analyzer`)

### Caching
- [ ] Imagens: `Cache-Control: public, max-age=31536000, immutable`
- [ ] Assets estaticos: cache longo (1 ano)
- [ ] HTML: `Cache-Control: public, max-age=0, must-revalidate` (ISR)

### Core Web Vitals — Metas

| Metrica | Meta | Como Medir |
|---------|------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTFB (Time to First Byte) | < 600ms | WebPageTest |
| FCP (First Contentful Paint) | < 1.8s | Lighthouse |
| INP (Interaction to Next Paint) | < 200ms | Chrome DevTools |

## Configuracao do next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizacao de imagens
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Compressao
  compress: true,
  
  // Headers de cache
  async headers() {
    return [
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

## Configuracao de Font (layout.tsx)

```tsx
import { Inter, Source_Serif_4 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

## Loading States

### Skeleton para Secoes
```tsx
// components/SkeletonSection.tsx
export function SkeletonSection() {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Progressive Loading
```tsx
// Usar loading.tsx por rota
// app/provas/loading.tsx
export default function Loading() {
  return <SkeletonSection />;
}
```

## Medicao

### Lighthouse (CLI)
```bash
# Instalar
npm install -g @lhci/cli

# Rodar
lhci autorun
```

### Web Vitals (Runtime)
```tsx
// app/web-vitals.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Enviar para analytics
    console.log(metric);
    // Ex: enviar para Google Analytics 4
    // gtag('event', metric.name, { value: metric.value });
  });
  return null;
}
```

## Bundle Analysis
```bash
# Analisar tamanho do bundle
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

# Rodar
ANALYZE=true npm run build
```
