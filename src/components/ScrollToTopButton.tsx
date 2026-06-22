"use client";

import { useEffect, useState } from "react";

const SHOW_BUTTON_AFTER = 360;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > SHOW_BUTTON_AFTER);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      className="scroll-to-top"
      data-visible={isVisible ? "true" : "false"}
      aria-label="페이지 맨 위로 이동"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 14 6-6 6 6" />
      </svg>
    </button>
  );
}
