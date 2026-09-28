"use client";

import { useEffect } from "react";

export default function FooterReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (
      !footer ||
      footer.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    footer.setAttribute("data-enter-pending", "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        footer.removeAttribute("data-enter-pending");
        footer.setAttribute("data-entering", "");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    const finishEntrance = () => footer.removeAttribute("data-entering");
    footer.addEventListener("animationend", finishEntrance, { once: true });
    observer.observe(footer);

    return () => {
      observer.disconnect();
      footer.removeEventListener("animationend", finishEntrance);
      footer.removeAttribute("data-enter-pending");
      footer.removeAttribute("data-entering");
    };
  }, []);

  return null;
}
