import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import type { Project } from "@/lib/projects"; // 용도 프로젝트 데이터 타입 참조

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-story-card">
      <div className="project-story-card__meta">
        <span>{project.domain}</span>
        <span>{project.status}</span>
      </div>

      <h3>{project.title}</h3>

      <p className="project-story-card__subtitle">{project.subtitle}</p>

      <p className="project-story-card__description">{project.description}</p>

      <div className="project-story-card__stack">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <Link className="project-story-card__link" href={`/projects/${project.slug}`}>
        View Case Study
      </Link>
    </article>
  );
}