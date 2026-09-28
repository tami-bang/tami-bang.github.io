"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import {
  getLocalDayNumber,
  getMascotForDay,
  subscribeToLocalDate,
} from "@/components/hero-mascot-date";

const getServerDay = () => null;

export default function FooterMascot() {
  const day = useSyncExternalStore(
    subscribeToLocalDate,
    getLocalDayNumber,
    getServerDay,
  );
  const mascot = day === null ? null : getMascotForDay(day);

  if (!mascot) return null;

  return (
    <div className="site-footer__mascot" aria-hidden="true">
      <Image
        src={`/mascots/${mascot}.webp`}
        alt=""
        width={900}
        height={600}
        sizes="(max-width: 720px) 76px, 96px"
        draggable={false}
      />
    </div>
  );
}
