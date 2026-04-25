"use client";

import Link from "next/link"; // 용도 사이트 내부 프로젝트 상세 페이지 이동
import { PointerEvent, useRef } from "react"; // 용도 카드 커서 위치 추적 및 DOM 참조 관리
import type { Project } from "@/lib/projects"; // 용도 프로젝트 데이터 타입 참조

type ProjectCardProps = {
  project: Project;
};

const POINTER_CENTER_VALUE = "50%";

function getPointerPosition(
  pointerPosition: number,
  elementPosition: number,
  elementSize: number,
) {
  const ratio = ((pointerPosition - elementPosition) / elementSize) * 100;
  return `${ratio.toFixed(2)}%`;
}

function updateCardPointer(
  event: PointerEvent<HTMLElement>,
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect();

  const pointerX = getPointerPosition(event.clientX, rect.left, rect.width);
  const pointerY = getPointerPosition(event.clientY, rect.top, rect.height);

  element.style.setProperty("--glow-x", pointerX);
  element.style.setProperty("--glow-y", pointerY);
}

function resetCardPointer(element: HTMLElement) {
  element.style.setProperty("--glow-x", POINTER_CENTER_VALUE);
  element.style.setProperty("--glow-y", POINTER_CENTER_VALUE);
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!cardRef.current) {
      return;
    }

    updateCardPointer(event, cardRef.current);
  }

  function handlePointerLeave() {
    if (!cardRef.current) {
      return;
    }

    resetCardPointer(cardRef.current);
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="project-card__content">
        <header className="project-card__top">
          <p className="section-eyebrow">{project.domain}</p>
          <span>{project.status}</span>
        </header>

        <section className="project-card__body">
          <h2>{project.title}</h2>

          <p className="project-card__subtitle">{project.subtitle}</p>

          <p className="project-card__description">{project.description}</p>
        </section>

        <section className="project-card__stack" aria-label="Project tech stack">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </section>

        <footer className="project-card__footer">
          <p>{project.role}</p>

          <Link
            className="cta-base cta-primary project-card__cta"
            href={`/projects/${project.slug}`}
          >
            View Case Study
          </Link>
        </footer>
      </div>
    </article>
  );
}