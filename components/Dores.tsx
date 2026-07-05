"use client";

import { motion } from "framer-motion";

import { PainPointCard } from "@/components/PainPointCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CONTENT } from "@/data/content";

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 1, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Dores() {
  const { secoes, dores } = CONTENT;

  return (
    <section id="dores" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={secoes.dores.title}
          subtitle={secoes.dores.subtitle}
        />
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {dores.map((dor, index) => (
            <motion.div key={dor.title} variants={cardItem}>
              <PainPointCard icon={dor.icon} title={dor.title} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
