import Image from "next/image"; // 용도 프로젝트 시각 자료 이미지 최적화 렌더링
import Link from "next/link"; // 용도 사이트 내부 및 외부 링크 이동
import { notFound } from "next/navigation"; // 용도 존재하지 않는 프로젝트 접근 처리
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects"; // 용도 프로젝트 상세 데이터 조회
import type { ProjectVisualHighlight } from "@/lib/projects"; // 용도 포트폴리오 시각 자료 하이라이트 타입 참조

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ProjectVisualHighlights({
  highlights,
}: {
  highlights?: ProjectVisualHighlight[];
}) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section className="project-detail-section page-section--reveal">
      <div className="project-visual-section">
        <div className="project-visual-section__header">
          <p className="section-eyebrow">Visual Highlights</p>
          <h2>핵심 화면과 설계 흐름</h2>
          <p>
            문제 정의, 구조 설계, 구현 흐름, 개선 포인트가 한눈에 보이는
            시각 자료만 선별했습니다.
          </p>
        </div>

        <div className="project-visual-grid">
          {highlights.map((highlight) => (
            <figure className="project-visual-card" key={highlight.imageSrc}>
              <Image
                src={highlight.imageSrc}
                alt={highlight.alt}
                width={highlight.width}
                height={highlight.height}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              <figcaption>{highlight.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

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

      <ProjectVisualHighlights highlights={project.visualHighlights} />

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
