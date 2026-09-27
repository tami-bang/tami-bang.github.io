"use client";

import Image from "next/image";
import { m, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import EditorialMotion, { useMediaQuery } from "@/components/EditorialMotion";
import {
  getLocalDayNumber,
  getMascotForDay,
  subscribeToLocalDate,
} from "@/components/hero-mascot-date";

const spring = { stiffness: 150, damping: 28, mass: 0.7 };
const getServerDay = () => null;

export default function HeroMascot() {
  const day = useSyncExternalStore(
    subscribeToLocalDate,
    getLocalDayNumber,
    getServerDay,
  );
  const mascot = day === null ? null : getMascotForDay(day);
  const anchor = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery(
    "(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const transform = useMotionTemplate`translate3d(${smoothX}px, ${smoothY}px, 0)`;

  useEffect(() => {
    const element = anchor.current;
    const hero = element?.closest(".editorial-hero");
    if (!enabled || !element || !hero) {
      x.jump(0);
      y.jump(0);
      smoothX.jump(0);
      smoothY.jump(0);
      return;
    }

    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      x.set(0);
      y.set(0);
    };
    const move = (event: Event) => {
      const pointer = event as PointerEvent;
      if (pointer.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // 이동하지 않는 바깥 영역을 측정해 커서와 오브젝트가 서로 쫓는 피드백을 방지합니다.
        const rect = element.getBoundingClientRect();
        const dx = pointer.clientX - (rect.left + rect.width / 2);
        const dy = pointer.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const reach = rect.width / 2 + 140;
        if (distance === 0 || distance >= reach) {
          x.set(0);
          y.set(0);
          return;
        }
        const edge = Math.min(1, Math.max(0, (reach - distance) / 80));
        const fade = edge * edge * (3 - 2 * edge);
        const pull = Math.min(9, distance * 0.045) * fade;
        x.set((dx / distance) * pull);
        y.set((dy / distance) * pull);
      });
    };

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    return () => {
      reset();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
    };
  }, [enabled, x, y, smoothX, smoothY]);

  return (
    <div
      ref={anchor}
      className="hero-mascot"
      aria-hidden="true"
      data-mascot={mascot ?? undefined}
    >
      <EditorialMotion>
        <m.div
          className="hero-mascot__visual"
          style={{ transform: enabled ? transform : "none" }}
        >
          {mascot && (
            <Image
              key={mascot}
              src={`/mascots/${mascot}.webp`}
              alt=""
              width={900}
              height={600}
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          )}
        </m.div>
      </EditorialMotion>
    </div>
  );
}
