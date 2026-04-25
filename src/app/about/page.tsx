import Link from "next/link"; // 용도 프로젝트 및 공부 기록 페이지 이동
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시

export const metadata = {
  title: "About | Tami.log",
  description: "AI를 활용해 문제를 구조화하고 구현하는 개발자 소개",
};

const strengths = [
  "AI를 활용해 요구사항을 구조화하고 구현 흐름으로 전환",
  "Backend, AI, Network, Frontend를 연결하는 서비스형 프로젝트 경험",
  "README, 실행 방법, 설계 의도까지 정리하는 기록 중심 개발",
];

const focusAreas = [
  "Health AI Search API",
  "GateGuard",
  "FastAPI Backend",
  "Next.js Portfolio",
  "Network Security",
  "AI Pipeline",
];

export default function AboutPage() {
  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="About"
          title="I structure problems, then build working products"
          description="AI를 단순 코드 생성 도구로만 쓰지 않고, 요구사항 정리, 설계 판단, 구현, 문서화까지 연결하는 개발자 타미입니다."
        />
      </section>

      <section className="about-grid page-section--reveal-delayed">
        <article className="about-card about-card--wide">
          <h2>Developer Direction</h2>

          <p>
            사용자가 어떤 문제를 겪고 있고 그 문제를 어떤 데이터 흐름과 기능 구조로 해결할 수 있는지
            먼저 정리합니다. 이후 API, UI, 데이터, AI 기능을 연결해 실제로
            동작하는 포트폴리오 프로젝트로 구현합니다.
          </p>
        </article>

        <article className="about-card">
          <h2>Strengths</h2>

          <ul className="detail-list">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </article>

        <article className="about-card">
          <h2>Current Focus</h2>

          <div className="project-detail-stack">
            {focusAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="project-detail-actions">
        <Link className="hero-primary-link" href="/projects">
          View Projects
        </Link>

        <Link className="hero-github-link" href="/blog">
          Read Study Log
        </Link>
      </section>
    </main>
  );
}