import Image from "next/image";
import Link from "next/link";
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
  const rows = [
    visuals.filter((_, i) => i % 2 === 0),
    visuals.filter((_, i) => i % 2 !== 0),
  ];

  return (
    <section
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
      <div className="project-marquee__window">
        {rows.map((row, index) => (
          <div className="project-marquee__row" key={index}>
            <div className="project-marquee__track">
              {[false, true].map((duplicate) => (
                <div
                  className="project-marquee__group"
                  key={String(duplicate)}
                  aria-hidden={duplicate || undefined}
                >
                  {row.map((visual) => (
                    <Link
                      className="project-marquee__frame"
                      href={`/projects/${visual.slug}`}
                      key={visual.imageSrc}
                      tabIndex={duplicate ? -1 : undefined}
                    >
                      <Image
                        src={visual.imageSrc}
                        alt={duplicate ? "" : visual.alt}
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
