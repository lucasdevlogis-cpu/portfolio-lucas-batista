"use client";

import { useEffect, useRef } from "react";

import { analytics, type ProofSurface } from "@/lib/analytics";
import type { ReactDemoSlug } from "@/lib/demo-contract";

const ENGAGEMENT_THRESHOLD_MS = 30_000;

export function ProofAnalytics({
  proofSlug,
  surface,
}: {
  proofSlug: ReactDemoSlug;
  surface: ProofSurface;
}) {
  const openedKeyRef = useRef<string | null>(null);
  const engagedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const analyticsKey = `${proofSlug}:${surface}`;
    if (openedKeyRef.current !== analyticsKey) {
      analytics.proofOpen(proofSlug, surface);
      openedKeyRef.current = analyticsKey;
    }

    let accumulatedMs = 0;
    let activeSince: number | null = null;
    let timerId: number | null = null;
    let focused = document.hasFocus();

    const isForeground = () => document.visibilityState === "visible" && focused;

    const clearTimer = () => {
      if (timerId === null) return;
      window.clearTimeout(timerId);
      timerId = null;
    };

    const emitEngaged = () => {
      if (engagedKeyRef.current === analyticsKey) return;
      engagedKeyRef.current = analyticsKey;
      clearTimer();
      analytics.proofEngaged(proofSlug, surface);
    };

    const pause = () => {
      if (activeSince !== null) {
        accumulatedMs += performance.now() - activeSince;
        activeSince = null;
      }
      clearTimer();
    };

    const resume = () => {
      if (engagedKeyRef.current === analyticsKey || activeSince !== null || !isForeground()) return;
      const remainingMs = ENGAGEMENT_THRESHOLD_MS - accumulatedMs;
      if (remainingMs <= 0) {
        emitEngaged();
        return;
      }
      activeSince = performance.now();
      timerId = window.setTimeout(emitEngaged, remainingMs);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") resume();
      else pause();
    };
    const handleFocus = () => {
      focused = true;
      resume();
    };
    const handleBlur = () => {
      focused = false;
      pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    resume();

    return () => {
      pause();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [proofSlug, surface]);

  return null;
}
