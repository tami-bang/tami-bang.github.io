"use client";

import { useEffect } from "react"; // 용도 브라우저 전역 포인터 이벤트 등록 및 해제

// cards.css의 공통 카드 베이스 목록과 맞춰야 네온 위치 추적이 누락되지 않습니다.
const GLOW_CARD_SELECTOR = [
  ".post-card-large",
  ".glass-panel",
  ".project-card",
  ".study-card",
  ".project-story-card",
  ".project-detail-card",
  ".about-card",
  ".about-story",
  ".about-process-card",
  ".about-project-link",
  ".about-contact-panel",
  ".empty-panel",
  ".blog-detail-card",
  ".study-list-item",
  ".about-flow-board",
  ".about-flow-node",
  ".internship-story",
  ".internship-journey__item",
  ".project-work-sample-card",
  ".project-visual-card",
  ".automation-step-card",
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

  if (
    event.relatedTarget instanceof Node &&
    glowCard.contains(event.relatedTarget)
  ) {
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
