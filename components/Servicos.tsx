"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CONTENT } from "@/data/content";

export function Servicos() {
  const { secoes, servicos } = CONTENT;

  return (
    <section id="servicos" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={secoes.servicos.eyebrow}
          title={secoes.servicos.title}
          subtitle={secoes.servicos.subtitle}
        />
        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute top-0 left-6 hidden h-full w-px origin-top border-l-2 border-dashed border-primary/20 md:block"
            aria-hidden
          >
            <motion.div
              className="h-full w-full bg-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "top" }}
            />
          </div>
          <div className="flex flex-col gap-6">
            {servicos.map((servico, index) => (
              <motion.div
                key={servico.numero}
                initial={{ opacity: 1, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <ServiceCard {...servico} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
