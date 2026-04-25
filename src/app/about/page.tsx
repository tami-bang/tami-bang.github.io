import Link from "next/link"; // 용도 프로젝트, 공부 기록, 외부 연락 링크 이동
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 링크 정보 조회

export const metadata = {
  title: "About | Tami.log",
  description: "문제를 구조화하고 실제로 동작하는 시스템으로 구현하는 개발자 소개",
};

const workSteps = [
  {
    title: "문제 정의",
    description: "사용자가 겪는 문제를 먼저 정리하고, 기능보다 해결해야 할 흐름을 우선 파악합니다.",
  },
  {
    title: "구조 설계",
    description: "데이터, API, UI, AI 기능이 어떤 순서로 연결되어야 하는지 서비스 흐름으로 설계합니다.",
  },
  {
    title: "동작 구현",
    description: "FastAPI, Next.js, DB, 모델 추론, 외부 API를 연결해 실제로 실행 가능한 형태로 만듭니다.",
  },
  {
    title: "기록과 개선",
    description: "README, 실행 방법, 설계 의도, 개선 포인트를 남겨 다음 수정이 쉬운 구조로 정리합니다.",
  },
];

const projectSummaries = [
  {
    name: "Health AI Search API",
    href: "/projects/health-ai-search-api",
    description: "증상 검색, 응급도 판단, 의료 정보 검색, AI 요약을 연결한 의료 정보 검색 API입니다.",
  },
  {
    name: "GateGuard",
    href: "/projects/gateguard",
    description: "패킷 탐지, 정책 엔진, AI URL 판단, 관리자 대시보드를 연결한 웹 접근 제어 시스템입니다.",
  },
];

const focusAreas = [
  "AI Search",
  "FastAPI",
  "Next.js",
  "Network",
  "System Design",
  "Documentation",
];

function createGmailComposeUrl(email: string) {
  const subject = encodeURIComponent("Tami.log 포트폴리오 문의");
  const encodedEmail = encodeURIComponent(email);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${subject}`;
}

function AboutUniverseBackground() {
  return (
    <div className="about-universe" aria-hidden="true">
      <span className="about-orbit about-orbit--large" />
      <span className="about-orbit about-orbit--small" />
      <span className="about-glow about-glow--left" />
      <span className="about-glow about-glow--right" />
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
      <span className="shooting-star shooting-star--three" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="content-shell about-page">
      <AboutUniverseBackground />

      <section className="page-hero about-hero page-section--reveal">
        <SectionHeader
          eyebrow="About"
          title="I structure problems, then build working products"
          description="AI를 단순 코드 생성 도구로만 쓰지 않고, 문제 정의부터 설계, 구현, 문서화까지 하나의 개발 흐름으로 연결합니다."
        />
      </section>

      <section className="about-story page-section--reveal-delayed">
        <div className="about-story__intro">
          <p className="about-story__lead">
            안녕하세요. 저는 문제를 구조화하고 실제로 동작하는 시스템으로
            만드는 개발자 타미입니다.
          </p>

          <p>
            코드를 많이 만드는 것보다 중요한 것은, 어떤 문제가 있고 그 문제를
            어떤 데이터 흐름과 기능 구조로 풀어낼지 판단하는 것이라고 생각합니다.
          </p>

          <p>
            그래서 AI를 사용할 때도 단순히 코드를 생성하는 데서 멈추지 않고,
            요구사항 정리, 설계 판단, 구현 검증, 문서화까지 연결하는 방식으로
            활용합니다.
          </p>
        </div>

        <div className="about-story__note">
          <p>Core Direction</p>
          <strong>문제 → 구조 → 구현 → 기록</strong>
        </div>
      </section>

      <section className="about-section about-section--animated">
        <div className="about-section__header">
          <p className="section-eyebrow">How I Work</p>
          <h2>흐름을 먼저 잡고, 기능을 연결합니다.</h2>
        </div>

        <div className="about-process-grid">
          {workSteps.map((step, index) => (
            <article className="about-process-card" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-section--animated">
        <div className="about-section__header">
          <p className="section-eyebrow">What I Build</p>
          <h2>공부한 개념은 프로젝트로 검증합니다.</h2>
        </div>

        <div className="about-project-list">
          {projectSummaries.map((project) => (
            <Link className="about-project-link" href={project.href} key={project.name}>
              <span>{project.name}</span>
              <p>{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-section about-section--animated">
        <div className="about-section__header">
          <p className="section-eyebrow">Current Focus</p>
          <h2>지금은 서비스형 AI 백엔드와 포트폴리오 완성도에 집중합니다.</h2>
        </div>

        <div className="about-focus-list">
          {focusAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="about-contact-panel about-section--animated">
        <div>
          <p className="section-eyebrow">Contact</p>
          <h2>프로젝트와 기록을 계속 다듬고 있습니다.</h2>
          <p>
            GitHub에는 코드와 실행 방법을, 블로그에는 공부한 개념과 적용 과정을
            정리합니다.
          </p>
        </div>

        <div className="about-contact-actions">
          <Link className="hero-primary-link" href="/projects">
            View Projects
          </Link>

          <Link className="hero-github-link" href="/blog">
            Read Study Log
          </Link>

          <a
            className="hero-github-link"
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className="hero-github-link"
            href={createGmailComposeUrl(siteConfig.links.email)}
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
        </div>
      </section>
    </main>
  );
}