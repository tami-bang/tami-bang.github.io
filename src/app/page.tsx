import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import HeroObjectScene from "@/components/HeroObjectScene"; // 용도 히어로 3D 오브젝트 인터랙션 표시
import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공용 섹션 헤더 표시
import { featuredPosts, studyCategories } from "@/lib/site"; // 용도 메인 화면 학습 콘텐츠 데이터 조회
import { getFeaturedProjects } from "@/lib/projects"; // 용도 대표 프로젝트 데이터 조회

function SpaceDots() {
  return (
    <div className="space-dots" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-universe">
      <SpaceDots />

      <div className="hero-universe__inner">
        <div className="hero-universe__content">
          <div className="hero-copy">
            <p className="section-eyebrow">Study Log + Portfolio</p>

            <h1 className="hero-title">
              Design the Logic,
              <br />
              Build the Future.
            </h1>

            <p className="hero-description">
              AI, Backend, Network를 공부하며 얻은 개념을 프로젝트로
              확장해 나갑니다. 이곳은 단순한 블로그가 아니라,
              학습 과정과 개발 결과를 함께 기록하는 공간입니다.
            </p>

            <div className="hero-actions">
              <Link className="hero-primary-link" href="/projects">
                View Projects
              </Link>

              <Link className="hero-github-link" href="/blog">
                Read Study Log
              </Link>
            </div>
          </div>

          <HeroObjectScene />
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <section className="page-section page-section--projects page-section--reveal">
      <SectionHeader
        eyebrow="Selected Case Studies"
        title="Projects built from real problems"
        description="GitHub에는 코드와 실행 방법을 정리하고, 이곳에서는 문제를 어떻게 정의하고 어떤 구조로 해결했는지를 중심으로 기록합니다."
      />

      <div className="project-story-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function FeaturedPostsSection() {
  return (
    <section className="page-section page-section--study page-section--reveal-delayed">
      <SectionHeader
        eyebrow="Study Log"
        title="What I’ve been learning"
        description="AI, Backend, Network, Frontend를 중심으로 학습한 내용을 개념 정리와 실습 기록 형태로 정리합니다."
      />

      <div className="home-section">
        <div className="post-list">
          {featuredPosts.map((post) => (
            <Link className="post-card-large" href={post.href} key={post.title}>
              <p className="category-pill">{post.category}</p>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="read-more-link">Read more</span>
            </Link>
          ))}
        </div>

        <aside className="home-aside">
          <div className="glass-panel">
            <p className="section-eyebrow">Browse by Category</p>

            <div className="category-grid">
              {studyCategories.map((category) => (
                <Link className="category-link"
                  href={`/blog/category/${encodeURIComponent(category)}`}
                  key={category}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-panel">
            <p className="section-eyebrow">Current Focus</p>

            <div className="focus-list">
              <p>AI Search API</p>
              <p>Backend Architecture</p>
              <p>Network Security</p>
              <p>Portfolio Writing</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjectsSection />
      <FeaturedPostsSection />
    </main>
  );
}