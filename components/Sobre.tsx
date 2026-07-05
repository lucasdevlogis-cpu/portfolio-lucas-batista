"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { CONTENT } from "@/data/content";
import { LucideIconByName } from "@/components/LucideIconByName";

function iniciais(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export function Sobre() {
  const { sobre, pessoal } = CONTENT;

  return (
    <section id="sobre" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent font-heading text-4xl font-bold text-white shadow-lg lg:size-28">
            {iniciais(pessoal.nome)}
          </div>
          <p className="mt-4 font-heading text-lg font-semibold text-primary">
            {pessoal.nome}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pessoal.titulo}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {sobre.titulo}
          </h2>

          <ul className="mt-4 space-y-2">
            {sobre.miniTimeline.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <LucideIconByName name={item.icon} className="size-3" />
                </span>
                {item.texto}
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {sobre.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold text-primary">
              {sobre.ferramentasTitulo}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sobre.ferramentas.map((ferramenta) => (
                <Badge
                  key={ferramenta}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {ferramenta}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
