import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoShell } from "@/components/demos/DemoShell";
import { ANCHOR_DEMO_SLUGS, getDemoSnapshot } from "@/lib/demo-contract";

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ANCHOR_DEMO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const snapshot = getDemoSnapshot(slug);
  if (!snapshot) return {};
  return {
    title: `${snapshot.title} | Lucas Batista`,
    description: snapshot.question,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const snapshot = getDemoSnapshot(slug);
  if (!snapshot) notFound();

  return (
    <main
      id="conteudo"
      className="min-h-screen bg-background px-0 py-0 sm:px-5 sm:py-5 lg:px-8 lg:py-8"
    >
      <div className="mx-auto max-w-[1280px] overflow-hidden border-border bg-card sm:border">
        <DemoShell snapshot={snapshot} />
      </div>
    </main>
  );
}
