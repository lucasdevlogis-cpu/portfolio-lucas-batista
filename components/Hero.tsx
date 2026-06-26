"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function KpiBars() {
  const heights = [40, 65, 50, 80, 55, 72];

  return (
    <div className="flex h-32 items-end justify-center gap-2 rounded-xl border bg-white/80 p-4 shadow-sm backdrop-blur-sm">
      {heights.map((height, index) => (
        <motion.div
          key={height}
          className="w-4 rounded-t-sm bg-accent/80"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.08 }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { pessoal, hero } = CONTENT;

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-slate-50 to-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <motion.div
          className="max-w-2xl text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent"
          >
            {hero.badge}
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary md:text-6xl"
          >
            {pessoal.headline}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 text-lg text-muted-foreground md:text-xl"
          >
            {pessoal.subheadline}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection("#contato")}
            >
              {hero.ctaPrimario}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#cases")}
            >
              {hero.ctaSecundario}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <KpiBars />
        </motion.div>
      </div>
    </section>
  );
}
