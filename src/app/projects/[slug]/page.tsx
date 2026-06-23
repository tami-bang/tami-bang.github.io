import Image from "next/image"; // 용도 프로젝트 시각 자료 이미지 최적화 렌더링
import Link from "next/link"; // 용도 사이트 내부 및 외부 링크 이동
import { notFound } from "next/navigation"; // 용도 존재하지 않는 프로젝트 접근 처리
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects"; // 용도 프로젝트 상세 데이터 조회
import type {
  InternshipStory,
  ProjectWorkSample,
  ProjectVisualHighlight,
} from "@/lib/projects"; // 용도 포트폴리오 시각 자료 및 인턴십 스토리 타입 참조

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
            문제 정의, 구조 설계, 구현 흐름, 개선 포인트가 한눈에 보이는 시각
            자료만 선별했습니다.
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

function InternshipStorySection({ story }: { story?: InternshipStory }) {
  if (!story) {
    return null;
  }

  return (
    <section className="project-detail-section internship-story page-section--reveal">
      <header className="internship-story__header">
        <div>
          <p className="section-eyebrow">Internship Story</p>
          <h2>{story.headline}</h2>
        </div>

        <p>{story.summary}</p>
      </header>

      <section className="internship-story__goals">
        <p className="section-eyebrow">What I Wanted To Achieve</p>
        <ul className="detail-list">
          {story.goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="internship-journey" aria-label="2개월 인턴 활동 과정">
        {story.journey.map((item) => (
          <article className="internship-journey__item" key={item.phase}>
            <p>{item.phase}</p>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </article>
        ))}
      </section>

      <section className="project-detail-grid internship-story__outcomes">
        <article className="project-detail-card">
          <h2>Value I Left</h2>
          <ul className="detail-list">
            {story.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </article>

        <article className="project-detail-card">
          <h2>How I Grew</h2>
          <ul className="detail-list">
            {story.growth.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}

function ProjectWorkSamplesSection({
  samples,
}: {
  samples?: ProjectWorkSample[];
}) {
  if (!samples || samples.length === 0) {
    return null;
  }

  return (
    <section className="project-detail-section project-work-samples page-section--reveal">
      <div className="project-work-samples__header">
        <p className="section-eyebrow">Work Samples</p>
        <h2>인턴 기간에 남긴 구체 산출물</h2>
        <p>
          실제 업무에서 반복되던 불편을 테스트 기준과 문서 흐름으로 정리한
          산출물입니다. 내부 정보는 제외하고 구조와 의도를 공개 가능한 형태로
          재구성했습니다.
        </p>
      </div>

      <div className="project-work-samples__grid">
        {samples.map((sample) => (
          <article className="project-work-sample-card" key={sample.title}>
            <p className="section-eyebrow">{sample.label}</p>
            <h3>{sample.title}</h3>
            <p>{sample.description}</p>

            <section>
              <h4>왜 만들었나</h4>
              <p>{sample.why}</p>
            </section>

            <ul className="detail-list">
              {sample.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            {sample.link && (
              <a href={sample.link} target="_blank" rel="noreferrer">
                GitHub 문서 보기
              </a>
            )}
          </article>
        ))}
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
      <section
        className={`project-detail-hero page-section--reveal ${
          project.livePreview ? "project-detail-hero--with-preview" : ""
        }`}
      >
        <div className="project-detail-hero__content">
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
        </div>

        {project.livePreview === "job-radar" && project.liveUrl && (
          <a
            className="job-radar-preview"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="JobRadar 사용해보기"
          >
            <header className="job-radar-preview__header">
              <span>
                <i /> INTERACTIVE DEMO
              </span>
              <b>↗</b>
            </header>

            <div className="job-radar-preview__stage" aria-hidden="true">
              <div className="job-radar-preview__orbit">
                <i />
                <i />
                <i />
                <div>
                  <strong>92</strong>
                  <span>MATCH</span>
                </div>
              </div>

              <div className="job-radar-preview__stats">
                <span>
                  <b>23</b>
                  <small>JOBS</small>
                </span>
                <span>
                  <b>03</b>
                  <small>MATCHED</small>
                </span>
              </div>
            </div>

            <footer className="job-radar-preview__footer">
              <div>
                <strong>JobRadar 사용해보기</strong>
                <span>실제 수집 공고로 검색 · 달력 · 엑셀을 눌러보세요</span>
              </div>
              <b>CLICK</b>
            </footer>
          </a>
        )}
      </section>

      <InternshipStorySection story={project.internshipStory} />
      <ProjectWorkSamplesSection samples={project.workSamples} />

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
        {project.liveUrl && (
          <a
            className="hero-primary-link"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            {project.liveLabel ?? "View Live Demo"}
          </a>
        )}

        <a
          className={project.liveUrl ? "hero-github-link" : "hero-primary-link"}
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          {project.githubLabel ?? "View GitHub"}
        </a>

        <Link className="hero-github-link" href="/blog">
          Read Study Log
        </Link>
      </section>
    </main>
  );
}
