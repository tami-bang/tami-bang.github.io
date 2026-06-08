"use client";

import Link from "next/link"; // 용도 사이트 내부 프로젝트 상세 페이지 이동
import { PointerEvent, useRef } from "react"; // 용도 카드 커서 위치 추적 및 DOM 참조 관리
import type { Project } from "@/lib/projects"; // 용도 프로젝트 데이터 타입 참조

type ProjectCardProps = {
  project: Project;
};

type ProjectSummaryItem = {
  label: string;
  value: string;
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

function getProjectSummaryItems(project: Project): ProjectSummaryItem[] {
  const flowValue = project.backendFlow ?? project.structuredFlow;
  const flowLabel = project.backendFlow ? "Backend Flow" : "Structured Flow";

  return [
    { label: "Repeated Problem", value: project.repeatedProblem ?? "" },
    { label: flowLabel, value: flowValue ?? "" },
    { label: "Automation Point", value: project.automationPoint ?? "" },
    { label: "Result", value: project.resultSummary ?? "" },
  ].filter((item) => item.value.length > 0);
}

function ProjectSummary({ items }: { items: ProjectSummaryItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="project-card__summary" aria-label="Project summary">
      {items.map((item) => (
        <p key={item.label}>
          <span>{item.label}</span>
          {item.value}
        </p>
      ))}
    </section>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const summaryItems = getProjectSummaryItems(project);

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
          <div className="project-card__badges">
            {project.featuredBadge && <span>{project.featuredBadge}</span>}
            <span>{project.status}</span>
          </div>
        </header>

        <section className="project-card__body">
          <h2>{project.title}</h2>

          <p className="project-card__subtitle">{project.subtitle}</p>

          <p className="project-card__description">{project.description}</p>
        </section>

        <ProjectSummary items={summaryItems} />

        <section className="project-card__stack" aria-label="Project tech stack">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </section>

        <footer className="project-card__footer">
          <p>{project.role}</p>

          <Link
            className="project-card__cta cta-base cta-primary"
            href={`/projects/${project.slug}`}
          >
            View Case Study
          </Link>
        </footer>
      </div>
    </article>
  );
}
