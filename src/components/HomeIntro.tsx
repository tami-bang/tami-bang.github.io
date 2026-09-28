"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getLocalDayNumber,
  getMascotForDay,
  subscribeToLocalDate,
} from "@/components/hero-mascot-date";

const SEEN_KEY = "tami-home-intro-seen";
const getServerDay = () => null;
let seenInMemory = false;

export default function HomeIntro() {
  const day = useSyncExternalStore(
    subscribeToLocalDate,
    getLocalDayNumber,
    getServerDay,
  );
  const mascot = day === null ? null : getMascotForDay(day);
  const layer = useRef<HTMLDivElement>(null);
  const shouldPlay = useRef<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    const element = layer.current;
    if (!element) return;

    if (shouldPlay.current === null) {
      try {
        shouldPlay.current =
          !seenInMemory && sessionStorage.getItem(SEEN_KEY) !== "1";
      } catch {
        shouldPlay.current = !seenInMemory;
      }
    }

    if (!shouldPlay.current) {
      element.hidden = true;
      const timer = window.setTimeout(() => setFinished(true), 0);
      return () => window.clearTimeout(timer);
    }
    if (!mascot) return;

    seenInMemory = true;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage가 차단된 경우에도 현재 탭의 페이지 이동에서는 반복하지 않습니다.
    }
    element.dataset.phase = "opening";
    const reveal = window.setTimeout(() => {
      element.dataset.phase = "revealing";
    }, 820);
    const finish = window.setTimeout(() => setFinished(true), 1270);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [mascot]);

  if (finished) return null;

  return (
    <>
      <div
        ref={layer}
        className="home-intro"
        data-phase="waiting"
        aria-hidden="true"
      >
        {mascot && (
          <Image
            className="home-intro__mascot"
            src={`/mascots/${mascot}.webp`}
            alt=""
            width={900}
            height={600}
            sizes="(max-width: 720px) 120px, (max-width: 999px) 145px, 170px"
            loading="eager"
            draggable={false}
          />
        )}
      </div>
      <noscript>
        <style>{`.home-intro { display: none !important; } .home-intro ~ .editorial-hero { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
    </>
  );
}
