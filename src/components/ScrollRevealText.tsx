"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import EditorialMotion, { useMediaQuery } from "@/components/EditorialMotion";

function RevealPhrase({
  text,
  index,
  count,
  progress,
  animate,
}: {
  text: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const opacity = useTransform(
    progress,
    [index / count, (index + 1) / count],
    [0.55, 1],
  );
  return <m.span style={{ opacity: animate ? opacity : 1 }}>{text} </m.span>;
}

export default function ScrollRevealText({ phrases }: { phrases: string[] }) {
  const target = useRef<HTMLParagraphElement>(null);
  const animate = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.9", "end 0.55"],
  });
  return (
    <EditorialMotion>
      <p className="scroll-reveal-text" ref={target}>
        {phrases.map((text, index) => (
          <RevealPhrase
            key={text}
            text={text}
            index={index}
            count={phrases.length}
            progress={scrollYProgress}
            animate={animate}
          />
        ))}
      </p>
    </EditorialMotion>
  );
}
