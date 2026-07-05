"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

import { Cases } from "@/components/Cases";
import { Contato } from "@/components/Contato";
import { Dores } from "@/components/Dores";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IASection } from "@/components/IASection";
import { Metodo } from "@/components/Metodo";
import { Servicos } from "@/components/Servicos";
import { Sobre } from "@/components/Sobre";
import { CONTENT } from "@/data/content";
import { sectionIdFromHref } from "@/lib/scroll";

const SECTION_IDS = CONTENT.nav.map((link) => sectionIdFromHref(link.href));

export function HomePage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Header activeSection={activeSection} />
      <Hero />
      <Dores />
      <Servicos />
      <Cases />
      <Metodo />
      <Sobre />
      <IASection />
      <Contato />
      <Footer />
    </MotionConfig>
  );
}
