import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import HeroObjectScene from "@/components/HeroObjectScene"; // 용도 히어로 3D 오브젝트 인터랙션 표시
import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공용 섹션 헤더 표시
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { getFeaturedProjects } from "@/lib/projects"; // 용도 대표 프로젝트 데이터 조회
import { studyCategoryItems } from "@/lib/site"; // 용도 학습 카테고리 데이터 조회

const HOME_POST_LIMIT = 5;

const workingPatternSteps = [
  {
    title: "반복 발견",
    description: "수동으로 반복되는 작업과 비효율적인 흐름을 먼저 찾습니다.",
  },
  {
    title: "흐름 구조화",
    description: "입력, 처리, 저장, 결과를 나누어 데이터 흐름으로 정리합니다.",
  },
  {
    title: "자동화 구현",
    description: "크롤링, 리포트, API, DB 구조를 활용해 반복 작업을 줄입니다.",
  },
  {
    title: "결과 검증",
    description: "자동화된 결과가 다시 확인 가능하도록 로그와 문서로 남깁니다.",
  },
];

function createBlogPostHref(slug: string) {
  return `/blog/${slug}`;
}

function getFeaturedStudyPosts() {
  return getAllPosts().slice(0, HOME_POST_LIMIT);
}

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
            <p className="section-eyebrow">Automation-minded Service Developer</p>

            <h1 className="hero-title">
              반복을 줄이고,
              <br />
              흐름을 서비스로 만듭니다.
            </h1>

            <p className="hero-description">
              흩어진 데이터와 수작업을 정리해 API, 자동화, 관리자 화면으로
              연결합니다. 사람이 매번 확인하던 과정을 줄이고, 사용자가 이해하기
              쉬운 서비스 흐름으로 구현하는 데 집중합니다.
            </p>

            <div className="hero-actions">
              <Link className="hero-primary-link" href="/projects">
                View Automation Projects
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

function WorkingPatternSection() {
  return (
    <section className="page-section page-section--pattern page-section--reveal-delayed">
      <SectionHeader
        eyebrow="Working Pattern"
        title="반복을 발견하면 흐름으로 정리합니다"
        description="작은 자동화라도 입력, 처리, 저장, 화면에 보이는 결과가 다시 확인 가능한 구조를 먼저 생각합니다."
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

  return (
    <section className="page-section page-section--projects page-section--reveal">
      <SectionHeader
        eyebrow="Featured Projects"
        title="Automation and Service Flow Case Studies"
        description="반복 작업을 발견하고, 데이터와 API 흐름을 구조화해 리포트, 관리자 화면, 사용자에게 닿는 서비스 흐름으로 구현한 프로젝트입니다."
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
  const featuredStudyPosts = getFeaturedStudyPosts();

  return (
    <section className="page-section page-section--study page-section--reveal-delayed">
      <SectionHeader
        eyebrow="Study Log"
        title="과목별 공부 기록"
        description="리눅스, 네트워크, C언어, HTML/CSS/JS, 파이썬/Django처럼 배운 내용을 과목별로 정리합니다."
      />

      <div className="home-section">
        <div className="post-list">
          {featuredStudyPosts.map((post) => (
            <Link
              className="post-card-large"
              href={createBlogPostHref(post.slug)}
              key={post.slug}
            >
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
            <p className="section-eyebrow">Current Focus</p>

            <div className="focus-list">
              <p>UI and API Flow</p>
              <p>Data Automation</p>
              <p>Crawling Pipeline</p>
              <p>Usable Result Screens</p>
              <p>AI as a Tool</p>
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
      <WorkingPatternSection />
      <FeaturedProjectsSection />
      <FeaturedPostsSection />
    </main>
  );
}
