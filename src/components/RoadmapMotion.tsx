"use client";

import { useEffect } from "react";

export default function RoadmapMotion() {
  useEffect(() => {
    const phases = Array.from(
      document.querySelectorAll<HTMLElement>(".roadmap-phase"),
    );
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".roadmap-index a"),
    );
    let frame = 0;
    let revealedPhaseIndex = -1;

    const revealPhasesInOrder = () => {
      const marker = window.innerHeight * 0.76;
      const nextIndex = phases.reduce((visibleIndex, phase, index) => {
        return phase.getBoundingClientRect().top <= marker
          ? index
          : visibleIndex;
      }, -1);

      if (nextIndex <= revealedPhaseIndex) {
        return;
      }

      for (let index = revealedPhaseIndex + 1; index <= nextIndex; index += 1) {
        phases[index]?.setAttribute("data-visible", "");
      }

      revealedPhaseIndex = nextIndex;
    };

    const updateProgress = () => {
      const marker = window.innerHeight * 0.38;
      let activeId = phases[0]?.id;
      let activeIndex = 0;
      const phaseProgresses = Array<number>(phases.length).fill(0);

      phases.forEach((phase, index) => {
        const rect = phase.getBoundingClientRect();
        if (rect.top <= marker) {
          activeId = phase.id;
          activeIndex = index;
        }

        const phaseProgress = Math.min(
          Math.max((marker - rect.top) / Math.max(phase.offsetHeight, 1), 0),
          1,
        );
        phaseProgresses[index] = phaseProgress;
      });

      navLinks.forEach((link, index) => {
        link.toggleAttribute("data-active", link.hash === `#${activeId}`);
        link.toggleAttribute("data-complete", index < activeIndex);
        const progress =
          index < activeIndex
            ? 1
            : index === activeIndex
              ? phaseProgresses[index]
              : 0;
        link.style.setProperty("--phase-progress", String(progress));
      });

      revealPhasesInOrder();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
