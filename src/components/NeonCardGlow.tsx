"use client";

import { useEffect } from "react"; // 용도 브라우저 전역 포인터 이벤트 등록 및 해제

const GLOW_CARD_SELECTOR = [
  ".project-story-card",
  ".post-card-large",
  ".glass-panel",
  ".project-card",
  ".project-detail-card",
].join(",");

function findGlowCard(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const glowCard = target.closest(GLOW_CARD_SELECTOR);

  if (!(glowCard instanceof HTMLElement)) {
    return null;
  }

  return glowCard;
}

function updateGlowPosition(event: PointerEvent) {
  const glowCard = findGlowCard(event.target);

  if (!glowCard) {
    return;
  }

  const cardRect = glowCard.getBoundingClientRect();
  const glowX = event.clientX - cardRect.left;
  const glowY = event.clientY - cardRect.top;

  glowCard.style.setProperty("--glow-x", `${glowX}px`);
  glowCard.style.setProperty("--glow-y", `${glowY}px`);
}

function resetGlowPosition(event: PointerEvent) {
  const glowCard = findGlowCard(event.target);

  if (!glowCard) {
    return;
  }

  glowCard.style.removeProperty("--glow-x");
  glowCard.style.removeProperty("--glow-y");
}

export default function NeonCardGlow() {
  useEffect(() => {
    window.addEventListener("pointermove", updateGlowPosition);
    window.addEventListener("pointerout", resetGlowPosition);

    return () => {
      window.removeEventListener("pointermove", updateGlowPosition);
      window.removeEventListener("pointerout", resetGlowPosition);
    };
  }, []);

  return null;
}