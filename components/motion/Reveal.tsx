"use client";

import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function Reveal({ children, className, delay = 0, distance = 18 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion === false ? { opacity: 0, y: distance } : { opacity: 1, y: 0 };

  return (
    <m.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
