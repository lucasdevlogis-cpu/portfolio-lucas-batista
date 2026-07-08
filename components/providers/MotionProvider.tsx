"use client";

import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "framer-motion";

function ReducedMotionConfig({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ReducedMotionConfig>{children}</ReducedMotionConfig>
    </LazyMotion>
  );
}
