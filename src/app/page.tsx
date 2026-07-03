import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import HeroObjectScene from "@/components/HeroObjectScene"; // 용도 히어로 3D 오브젝트 인터랙션 표시
import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공용 섹션 헤더 표시
import {
  homeFocusItems,
  homeHero,
  homeSections,
  workingPatternSteps,
} from "@/lib/home"; // 용도 홈 화면 콘텐츠 데이터
import { getFeaturedProjects } from "@/lib/projects"; // 용도 대표 프로젝트 데이터 조회
import { studyCategoryItems } from "@/lib/site"; // 용도 학습 카테고리 데이터 조회

function SpaceDots() {
  return (
    <div className="space-dots" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function HeroTitle() {
  return <h1 className="hero-title">{homeHero.titleLines.join(" ")}</h1>;
}

function HeroDescription() {
  if (homeHero.descriptionLines.length === 0) {
    return null;
  }

  return (
    <p className="hero-description">{homeHero.descriptionLines.join(" ")}</p>
  );
}

function HeroSignals() {
  return (
    <div className="hero-signal-list" aria-label="작업 방향 요약">
      {homeHero.signals.map((signal) => (
        <p key={signal.label}>
          <span>{signal.label}</span>
          {signal.value}
        </p>
      ))}
    </div>
  );
}

function HeroActions() {
  return (
    <div className="hero-actions">
      {homeHero.actions.map((action) => (
        <Link
          className={
            action.variant === "primary"
              ? "hero-primary-link"
              : "hero-github-link"
          }
          href={action.href}
          key={action.href}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-universe page-section--reveal">
      <SpaceDots />

      <div className="hero-universe__inner">
        <div className="hero-universe__content">
          <div className="hero-copy">
            <p className="section-eyebrow">{homeHero.eyebrow}</p>

            <HeroTitle />
            <HeroDescription />
            <HeroSignals />
            <HeroActions />
          </div>

          <HeroObjectScene />
        </div>
      </div>
    </section>
  );
}

function WorkingPatternSection() {
  const section = homeSections.workflow;

  return (
    <section className="page-section page-section--pattern page-section--reveal-delayed">
      <SectionHeader
        eyebrow={section.eyebrow}
        eyebrowDescription={section.eyebrowDescription}
      />

      <div className="automation-pattern-grid">
        {workingPatternSteps.map((step, index) => (
          <article className="automation-step-card" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();
  const section = homeSections.projects;

  return (
    <section className="page-section page-section--projects page-section--reveal">
      <SectionHeader
        eyebrow={section.eyebrow}
        eyebrowDescription={section.eyebrowDescription}
      />

      <div className="project-story-grid">
        {projects.map((project) => (
          <ProjectCard compact key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function FeaturedPostsSection() {
  const section = homeSections.study;

  return (
    <section className="page-section page-section--study page-section--reveal-delayed">
      <SectionHeader
        eyebrow={section.eyebrow}
        eyebrowDescription={section.eyebrowDescription}
      />

      <div className="home-study-hub">
        <div className="glass-panel">
          <p className="section-eyebrow">카테고리</p>

          <div className="category-grid">
            {studyCategoryItems.map((category) => (
              <Link
                className="category-link"
                href={`/blog/category/${category.slug}`}
                key={category.slug}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <p className="section-eyebrow">현재 관심사</p>

          <div className="focus-list">
            {homeFocusItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <HeroSection />
      <WorkingPatternSection />
      <FeaturedProjectsSection />
      <FeaturedPostsSection />
    </main>
  );
}
