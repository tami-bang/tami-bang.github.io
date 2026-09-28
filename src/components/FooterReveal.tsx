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
    const content = footer?.querySelector<HTMLElement>(".site-footer__inner");
    if (
      !footer ||
      !content ||
      content.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    content.setAttribute("data-enter-pending", "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        content.removeAttribute("data-enter-pending");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      content.removeAttribute("data-enter-pending");
    };
  }, []);

  return null;
}
