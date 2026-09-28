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
    const scene = footer?.querySelector<HTMLElement>(".site-footer__scene");
    const hill = scene?.querySelector<SVGElement>(".site-footer__hill");
    if (!footer || !scene || !hill) {
      return;
    }

    if (hill.getBoundingClientRect().top < window.innerHeight) return;

    scene.setAttribute("data-enter-pending", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        scene.removeAttribute("data-enter-pending");
        scene.setAttribute("data-entering", "");
        observer.disconnect();
      },
      { threshold: 0 },
    );

    const finishEntrance = () => {
      scene.removeAttribute("data-entering");
      scene.setAttribute("data-entered", "");
    };
    scene.addEventListener("animationend", finishEntrance, { once: true });
    observer.observe(hill);

    return () => {
      observer.disconnect();
      scene.removeEventListener("animationend", finishEntrance);
      scene.removeAttribute("data-enter-pending");
      scene.removeAttribute("data-entering");
      scene.removeAttribute("data-entered");
    };
  }, []);

  return null;
}
