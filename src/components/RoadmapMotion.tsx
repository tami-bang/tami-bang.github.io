"use client";

import { useEffect } from "react";

export default function RoadmapMotion() {
  useEffect(() => {
    const root = document.documentElement;
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
      const page = document.querySelector<HTMLElement>(".roadmap-page");
      if (!page) return;

      const rect = page.getBoundingClientRect();
      const travel = Math.max(page.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      root.style.setProperty("--roadmap-progress", String(progress));

      const marker = window.innerHeight * 0.38;
      let activeId = phases[0]?.id;

      phases.forEach((phase) => {
        if (phase.getBoundingClientRect().top <= marker) activeId = phase.id;
      });

      navLinks.forEach((link) => {
        link.toggleAttribute("data-active", link.hash === `#${activeId}`);
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
      root.style.removeProperty("--roadmap-progress");
    };
  }, []);

  return (
    <div className="roadmap-progress" aria-hidden="true">
      <span />
    </div>
  );
}
