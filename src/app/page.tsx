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
    title: "문제 포착",
    description: "수동 처리와 흩어진 기록에서 개선할 지점을 찾습니다.",
  },
  {
    title: "흐름 정리",
    description: "입력, 처리, 저장, 결과를 나누어 구조를 잡습니다.",
  },
  {
    title: "도구 구현",
    description: "크롤링, API, DB, 리포트로 실제 동작을 만듭니다.",
  },
  {
    title: "결과 확인",
    description: "결과를 다시 확인할 수 있게 로그와 문서로 남깁니다.",
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
            <p className="section-eyebrow">서비스 자동화 개발자</p>

            <h1 className="hero-title">
              흩어진 일을 정리해,
              <br />
              흐름을 서비스로 만듭니다.
            </h1>

            <p className="hero-description">
              데이터, API, 관리자 화면을 연결해 사람이 확인하던 과정을 줄입니다.
              작게 시작한 개선을 사용자가 이해하기 쉬운 서비스 흐름으로 구현합니다.
            </p>

            <div className="hero-actions">
              <Link className="hero-primary-link" href="/projects">
                프로젝트 보기
              </Link>

              <Link className="hero-github-link" href="/blog">
                공부 기록 보기
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
        eyebrow="작업 방식"
        title="문제를 흐름으로 정리합니다"
        description="작은 개선도 입력, 처리, 저장, 화면에 보이는 결과까지 이어지는 구조로 생각합니다."
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
        eyebrow="프로젝트"
        title="자동화와 서비스 구현"
        description="데이터 수집, API, 관리자 화면, 리포트로 이어지는 구현 사례를 정리했습니다."
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
  const featuredStudyPosts = getFeaturedStudyPosts();

  return (
    <section className="page-section page-section--study page-section--reveal-delayed">
      <SectionHeader
        eyebrow="공부 기록"
        title="배운 것을 기록합니다"
        description="리눅스, 네트워크, C언어, 웹, 파이썬/Django를 프로젝트와 연결해 정리합니다."
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
              <span className="read-more-link">자세히 보기</span>
            </Link>
          ))}
        </div>

        <aside className="home-aside">
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
              <p>UI와 API 흐름</p>
              <p>데이터 자동화</p>
              <p>크롤링 파이프라인</p>
              <p>결과 화면 설계</p>
              <p>AI 도구 활용</p>
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
