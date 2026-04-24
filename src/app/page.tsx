/**
 * 메인 페이지
 * 용도: 우주형 개발 블로그 홈, 공부 기록, 프로젝트, GitHub 프로필 연결
 */

import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import HeroObjectScene from "@/components/HeroObjectScene"; // 용도 히어로 3D 오브젝트 인터랙션 표시
import {
  featuredPosts,
  featuredProjects,
  studyCategories,
} from "@/lib/site"; // 용도 메인 화면 콘텐츠 데이터 조회

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.75 5.4.75 11.75c0 5.08 3.29 9.39 7.85 10.92.57.1.78-.25.78-.56 0-.27-.01-1.16-.02-2.1-3.19.69-3.87-1.37-3.87-1.37-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.17a11.1 11.1 0 0 1 5.79 0c2.2-1.48 3.17-1.17 3.17-1.17.63 1.59.24 2.77.12 3.06.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.64.41.36.77 1.06.77 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.2.67.79.56a11.27 11.27 0 0 0 7.84-10.92C23.25 5.4 18.35.5 12 .5z" />
    </svg>
  );
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

function GithubProfileLink() {
  return (
    <a
      href="https://github.com/tami-bang"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub 프로필 새 창으로 열기"
      className="hero-github-link"
      draggable={false}
    >
      <GithubIcon />
      <span>GitHub</span>
    </a>
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
              Python, C, Network, Backend, Frontend, AI를 공부하며 기록한
              내용을 실제 프로젝트와 포트폴리오로 연결합니다.
            </p>

            <div className="hero-actions">
              <GithubProfileLink />

              <Link href="/blog" className="hero-primary-link" draggable={false}>
                View Study Log
              </Link>
            </div>
          </div>

          <HeroObjectScene />
        </div>
      </div>
    </section>
  );
}

function FeaturedPostsSection() {
  return (
    <section className="home-section">
      <div>
        <p className="section-eyebrow">Articles and Tutorials</p>

        <div className="post-list">
          {featuredPosts.map((post) => (
            <article key={post.title} className="post-card-large">
              <p className="category-pill">{post.category}</p>

              <h2>{post.title}</h2>

              <p>{post.description}</p>

              <Link href={post.href} className="read-more-link">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>

      <aside className="home-aside">
        <section className="glass-panel">
          <p className="section-eyebrow">Browse by Category</p>

          <div className="category-grid">
            {studyCategories.map((category) => (
              <Link key={category} href="/blog" className="category-link">
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="glass-panel">
          <p className="section-eyebrow">Popular Projects</p>

          <div className="project-list">
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="project-card"
              >
                <span>→</span>
                <strong>{project.title}</strong>
                <small>{project.description}</small>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedPostsSection />
    </main>
  );
}