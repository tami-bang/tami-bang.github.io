"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export default function ScrollProgressGlow() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight <= 0 ? 0 : window.scrollY / scrollableHeight;

      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      className="scroll-progress-glow"
      aria-hidden="true"
      style={{ "--scroll-progress": progress } as CSSProperties}
    />
  );
}
