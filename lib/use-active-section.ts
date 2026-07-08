"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], rootMargin = "-40% 0px -55% 0px") {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibility = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const id = entry.target.id;
        visibility.set(id, entry.intersectionRatio);
      }

      let maxRatio = 0;
      let mostVisible = sectionIds[0] ?? "";
      for (const [id, ratio] of visibility.entries()) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisible = id;
        }
      }

      if (maxRatio > 0) {
        setActiveSection(mostVisible);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        visibility.set(id, 0);
      }
    }

    observers.push(observer);

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
}
