import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-lucas-batista-murex.vercel.app";

const title = "Lucas Batista | Operações, Dados e Inteligência Logística";
const description =
  "Portfólio profissional para headhunters: operações logísticas, analytics, produto interno, IA aplicada e cases demonstráveis em frete, SLA, last mile e roteirização.";

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
    "headhunter",
    "recrutamento executivo",
    "portfólio profissional",
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
    name: "Lucas Batista",
    jobTitle: "Profissional de Operações, Dados e Inteligência Logística",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
