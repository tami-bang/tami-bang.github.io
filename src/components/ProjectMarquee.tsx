"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EditorialMotion, { useMediaQuery } from "@/components/EditorialMotion";
import type { ProjectVisualHighlight } from "@/lib/projects";

export type MarqueeVisual = ProjectVisualHighlight & {
  slug: string;
  projectTitle: string;
};

export default function ProjectMarquee({
  visuals,
}: {
  visuals: MarqueeVisual[];
}) {
  const target = useRef<HTMLElement>(null);
  const animate = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const desktop = useMediaQuery("(min-width: 1000px)");
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const distance = desktop ? 70 : 18;
  const forward = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const backward = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rows = [
    visuals.filter((_, i) => i % 2 === 0),
    visuals.filter((_, i) => i % 2 !== 0),
  ];

  return (
    <section
      ref={target}
      className="project-marquee"
      id="project-preview"
      aria-labelledby="project-preview-title"
    >
      <div className="editorial-shell project-marquee__heading">
        <h2 className="editorial-label" id="project-preview-title">
          PROJECT NOTES / 프로젝트의 장면들
        </h2>
        <span aria-hidden="true">01 — 06</span>
      </div>
      <EditorialMotion>
        <div className="project-marquee__window">
          {rows.map((row, index) => (
            <m.div
              className="project-marquee__row"
              key={index}
              style={{ x: animate ? (index === 0 ? forward : backward) : 0 }}
            >
              {row.map((visual) => (
                <Link
                  className="project-marquee__frame"
                  href={`/projects/${visual.slug}`}
                  key={visual.imageSrc}
                >
                  <Image
                    src={visual.imageSrc}
                    alt={visual.alt}
                    width={visual.width}
                    height={visual.height}
                    sizes="(max-width: 999px) 48vw, 36vw"
                  />
                  <span>
                    <strong>{visual.projectTitle}</strong>
                    <span>{visual.title}</span>
                  </span>
                </Link>
              ))}
            </m.div>
          ))}
        </div>
      </EditorialMotion>
    </section>
  );
}
