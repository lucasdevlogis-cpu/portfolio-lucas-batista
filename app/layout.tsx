import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { CONTENT } from "@/data/content";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["700", "800", "900"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-lucas-batista-murex.vercel.app";

const { title, description, keywords, jobTitle } = CONTENT.siteMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords,
  robots: "index, follow",
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
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
  themeColor: "#102033",
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
    knowsAbout: [
      "Logística",
      "Supply Chain",
      "Análise de dados",
      "Frete",
      "E-commerce",
    ],
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
