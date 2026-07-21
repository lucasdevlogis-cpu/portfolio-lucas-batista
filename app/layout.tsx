import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import { BackToTop } from "@/components/BackToTop";
import { Analytics } from "@/components/analytics/Analytics";
import { CONTENT } from "@/data/content";
import designTokens from "@/design/tokens.json";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-lucas-batista-murex.vercel.app";

const { title, description, keywords, jobTitle } = CONTENT.siteMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords,
  authors: [{ name: CONTENT.pessoal.nome, url: siteUrl }],
  creator: CONTENT.pessoal.nome,
  publisher: CONTENT.pessoal.nome,
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
    siteName: title,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: designTokens.colors.surfaceDark,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTENT.pessoal.nome,
    jobTitle,
    description,
    url: siteUrl,
    sameAs: [CONTENT.pessoal.linkedin, CONTENT.pessoal.github],
    knowsAbout: [
      "Logística",
      "Supply Chain",
      "Análise de dados",
      "Frete",
      "E-commerce",
      "Roteirização",
      "Last Mile",
      "SLA / OTD",
      "Inteligência operacional",
      "IA aplicada",
    ],
    worksFor: {
      "@type": "Organization",
      name: "GRUPO SBF",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "USP/Esalq",
      },
      {
        "@type": "EducationalOrganization",
        name: "UNIP",
      },
    ],
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          {CONTENT.a11y.skipToContent}
        </a>
        {children}
        <BackToTop label={CONTENT.footer.voltarTopo} />
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
