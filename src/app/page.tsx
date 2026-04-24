/**
 * 메인 페이지
 * 용도: 기술 공부 기록, GitHub 프로필, 대표 학습글, 대표 프로젝트로 연결되는 블로그 홈 화면
 */

import Link from "next/link"; // 용도 사이트 내부 페이지 이동
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

function PixelRainbow() {
  return (
    <div className="pixel-rainbow" aria-hidden="true">
      {Array.from({ length: 44 }).map((_, index) => (
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
      className="mt-7 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <GithubIcon />
      <span>GitHub</span>
    </a>
  );
}

function HeroGraphic() {
  return (
    <div className="relative hidden items-center justify-center lg:flex">
      <div className="absolute right-0 top-12">
        <PixelRainbow />
      </div>

      <div className="relative mt-20 flex h-64 w-64 items-center justify-center rounded-full bg-yellow-300 shadow-2xl">
        <div className="h-44 w-44 rounded-full bg-white shadow-inner" />
        <div className="absolute top-16 h-24 w-32 rounded-t-full bg-slate-800" />
        <div className="absolute top-28 flex gap-10">
          <span className="h-4 w-4 rounded-full bg-black" />
          <span className="h-4 w-4 rounded-full bg-black" />
        </div>
        <div className="absolute top-36 flex gap-16">
          <span className="h-5 w-5 rounded-full bg-pink-400" />
          <span className="h-5 w-5 rounded-full bg-pink-400" />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-sky px-7 pb-6 pt-14">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="pt-16">
          <p className="mb-6 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
            STUDY LOG + PORTFOLIO
          </p>

          <h1 className="mb-3 max-w-3xl text-3xl font-black leading-[1.18] tracking-tight text-slate-950 md:text-4xl">
            기록으로 성장하는 개발자
          </h1>

          <p className="max-w-2xl text-lg leading-7 text-slate-700">
            Python, C, Network, Backend, Frontend, AI를 공부하며 기록한 내용을
            프로젝트로 연결합니다.
          </p>

          <GithubProfileLink />
        </div>

        <HeroGraphic />
      </div>
    </section>
  );
}

function FeaturedPostsSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-7 pb-20 pt-6 lg:grid-cols-[1.1fr_0.8fr]">
      <div>
        <p className="mb-10 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
          Articles and Tutorials
        </p>

        <div className="space-y-14">
          {featuredPosts.map((post) => (
            <article key={post.title}>
              <p className="mb-3 inline-flex rounded-full bg-sky-200 px-4 py-2 text-sm font-bold text-slate-900">
                {post.category}
              </p>

              <h2 className="text-3xl font-black text-slate-950">
                {post.title}
              </h2>

              <p className="mt-4 max-w-3xl text-xl leading-9 text-slate-700">
                {post.description}
              </p>

              <Link
                href={post.href}
                className="mt-5 inline-block text-lg font-black text-slate-950"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>

      <aside className="space-y-14">
        <section>
          <p className="mb-7 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
            Browse by Category
          </p>

          <div className="flex flex-wrap gap-3">
            {studyCategories.map((category) => (
              <Link
                key={category}
                href="/blog"
                className="rounded-xl bg-sky-200 px-4 py-3 text-base font-bold text-slate-900 transition hover:bg-sky-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-7 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
            Popular Projects
          </p>

          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="grid grid-cols-[32px_1fr] gap-4 rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="pt-1 text-3xl font-black">→</span>
                <span>
                  <strong className="block text-xl font-black">
                    {project.title}
                  </strong>
                  <span className="mt-2 block leading-7 text-slate-600">
                    {project.description}
                  </span>
                </span>
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