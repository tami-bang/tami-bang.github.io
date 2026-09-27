"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/components/EditorialMotion";

export default function ProjectStackItem({
  children,
  last,
}: {
  children: ReactNode;
  last: boolean;
}) {
  const target = useRef<HTMLDivElement>(null);
  const animate = useMediaQuery(
    "(min-width: 1000px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
  );
  // sticky 요소 자체가 아닌 원래 문서 위치의 앵커를 추적합니다.
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 112px", "start -50vh"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <>
      <div ref={target} className="project-stack__anchor" aria-hidden="true" />
      <div className="project-stack__item" role="listitem">
        <m.article
          className="editorial-project"
          style={{ scale: animate && !last ? scale : 1 }}
        >
          {children}
        </m.article>
      </div>
    </>
  );
}
