"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Metodo() {
  const { secoes, metodo } = CONTENT;

  return (
    <section id="metodo" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={secoes.metodo.title}
          subtitle={secoes.metodo.subtitle}
        />
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-start lg:justify-between">
          {metodo.map((passo, index) => (
            <motion.div
              key={passo.numero}
              className="flex flex-1 flex-col items-center lg:flex-row lg:items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "w-full rounded-xl border bg-slate-50 p-5 text-center lg:text-left",
                  index % 2 === 1 && "bg-white",
                )}
              >
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground lg:mx-0">
                  {passo.numero}
                </div>
                <h3 className="font-heading font-semibold text-primary">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {passo.descricao}
                </p>
              </div>
              {index < metodo.length - 1 ? (
                <>
                  <ArrowRight
                    className="my-2 hidden size-5 shrink-0 text-muted-foreground lg:mx-2 lg:my-8 lg:block"
                    aria-hidden
                  />
                  <ArrowDown
                    className="my-1 size-5 text-muted-foreground lg:hidden"
                    aria-hidden
                  />
                </>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
