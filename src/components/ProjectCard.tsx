import Link from "next/link"; // 용도 사이트 내부 프로젝트 상세 페이지 이동
import type { Project } from "@/lib/projects"; // 용도 프로젝트 데이터 타입 참조

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

type ProjectSummaryItem = {
  label: string;
  value: string;
};

function getProjectSummaryItems(project: Project): ProjectSummaryItem[] {
  const flowValue = project.backendFlow ?? project.structuredFlow;
  const flowLabel = project.backendFlow ? "구현 흐름" : "정리한 흐름";

  return [
    { label: "문제", value: project.repeatedProblem ?? "" },
    { label: flowLabel, value: flowValue ?? "" },
    { label: "개선 지점", value: project.automationPoint ?? "" },
    { label: "결과", value: project.resultSummary ?? "" },
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

export default function ProjectCard({
  compact = false,
  project,
}: ProjectCardProps) {
  const summaryItems = getProjectSummaryItems(project);
  const cardTags = project.cardTags ?? [];

  return (
    <article className="project-card">
      <div className="project-card__content">
        <header className="project-card__top">
          <p className="section-eyebrow">{project.domain}</p>
          <div className="project-card__badges">
            {cardTags.length > 0 ? (
              cardTags.map((tag) => <span key={tag}>{tag}</span>)
            ) : (
              <>
                {project.featuredBadge && <span>{project.featuredBadge}</span>}
                <span>{project.status}</span>
              </>
            )}
          </div>
        </header>

        <section className="project-card__body">
          <h2>{project.title}</h2>

          <p className="project-card__subtitle">{project.subtitle}</p>

          {!compact && (
            <p className="project-card__description">{project.description}</p>
          )}
        </section>

        {!compact && <ProjectSummary items={summaryItems} />}

        <section
          className="project-card__stack"
          aria-label="Project tech stack"
        >
          {project.techStack.slice(0, 6).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </section>

        <footer className="project-card__footer">
          <p>{project.role}</p>

          <Link
            className="project-card__cta cta-base cta-primary"
            href={`/projects/${project.slug}`}
          >
            자세히 보기
          </Link>
        </footer>
      </div>
    </article>
  );
}
