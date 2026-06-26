import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-lucas-batista-murex.vercel.app";

const title = "Lucas Batista | Inteligência Operacional para Logística";
const description =
  "Transformo dados e rotinas logísticas em clareza para decidir melhor. Diagnósticos, análises, automações e protótipos para logística, transporte e e-commerce.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "logística",
    "supply chain",
    "análise de dados",
    "frete",
    "transporte",
    "e-commerce",
    "consultoria",
    "inteligência operacional",
    "Brasil",
  ],
  robots: "index, follow",
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
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
    name: "Lucas Batista",
    jobTitle: "Especialista em Inteligência Operacional para Logística",
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
