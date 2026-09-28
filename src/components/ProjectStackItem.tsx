"use client";

import { m, useScroll, useTransform } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/components/EditorialMotion";

export default function ProjectStackItem({
  children,
  last,
  indexStack = false,
  index = 0,
}: {
  children: ReactNode;
  last: boolean;
  indexStack?: boolean;
  index?: number;
}) {
  const target = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLElement>(null);
  const [fitsViewport, setFitsViewport] = useState(false);
  const indexMotion = useMediaQuery(
    "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
  );
  useEffect(() => {
    if (!indexStack || !sheet.current) return;
    const element = sheet.current;
    const update = () => {
      const peek = window.innerWidth < 1000 ? 26 : 30;
      setFitsViewport(
        element.offsetHeight + 96 + index * peek + 24 <= window.innerHeight,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [indexStack, index]);
  const animate = useMediaQuery(
    "(min-width: 1000px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
  );
  // sticky 요소 자체가 아닌 원래 문서 위치의 앵커를 추적합니다.
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 112px", "start -50vh"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, indexStack ? 0.985 : 0.97],
  );

  return (
    <>
      <div ref={target} className="project-stack__anchor" aria-hidden="true" />
      <div
        className="project-stack__item"
        role="listitem"
        data-stackable={indexStack ? fitsViewport : undefined}
        style={
          indexStack
            ? ({ "--sheet-index": index, zIndex: index + 1 } as CSSProperties)
            : undefined
        }
      >
        <m.article
          ref={sheet}
          className="editorial-project"
          style={{
            scale:
              (indexStack ? indexMotion && fitsViewport : animate) && !last
                ? scale
                : 1,
          }}
        >
          {children}
        </m.article>
      </div>
    </>
  );
}
