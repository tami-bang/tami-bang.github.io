import Link from "next/link"; // 용도 사이트 내부 및 외부 링크 이동
import { notFound } from "next/navigation"; // 용도 존재하지 않는 프로젝트 접근 처리
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects"; // 용도 프로젝트 상세 데이터 조회

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Tami.log`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-detail-shell">
      <section className="project-detail-hero page-section--reveal">
        <Link className="back-link" href="/projects">
          Back to Projects
        </Link>

        <SectionHeader
          eyebrow={project.domain}
          title={project.title}
          description={project.subtitle}
        />

        <div className="project-detail-meta">
          <span>{project.status}</span>
          <span>{project.period}</span>
          <span>{project.role}</span>
        </div>

        <p className="project-detail-description">{project.description}</p>
      </section>

      <section className="project-detail-section project-detail-grid page-section--reveal-delayed">
        <article className="project-detail-card">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </article>

        <article className="project-detail-card">
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </article>
      </section>

      <section className="project-detail-section page-section--reveal">
        <article className="project-detail-card project-detail-card--wide">
          <h2>Architecture Flow</h2>

          <ol className="architecture-flow">
            {project.architecture.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="project-detail-section project-detail-grid page-section--reveal">
        <article className="project-detail-card">
          <h2>Technical Highlights</h2>

          <ul className="detail-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="project-detail-card">
          <h2>Tech Stack</h2>

          <div className="project-detail-stack">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="project-detail-section project-detail-grid page-section--reveal">
        <article className="project-detail-card">
          <h2>Results</h2>

          <ul className="detail-list">
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </article>

        <article className="project-detail-card">
          <h2>Retrospective</h2>

          <ul className="detail-list">
            {project.retrospective.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="project-detail-actions">
        <a
          className="hero-primary-link"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          View GitHub
        </a>

        <Link className="hero-github-link" href="/blog">
          Read Study Log
        </Link>
      </section>
    </main>
  );
}