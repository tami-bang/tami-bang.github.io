import Link from "next/link"; // 용도 프로젝트, Backend Notes, 외부 연락 링크 이동
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 링크 정보 조회

export const metadata = {
  title: "About | Tami.log",
  description: "반복 작업을 데이터, API, 사용자 화면 흐름으로 구조화해 자동화하는 개발자 소개",
};

const workSteps = [
  {
    title: "반복되는 흐름을 먼저 찾습니다",
    description: "수동 확인, 반복 판단, 흩어진 기록처럼 자동화할 수 있는 흐름을 먼저 봅니다.",
  },
  {
    title: "데이터와 상태를 구조화합니다",
    description: "입력, 처리, 저장, 결과를 나누어 다시 확인 가능한 데이터 흐름으로 정리합니다.",
  },
  {
    title: "API와 저장 구조로 연결합니다",
    description: "Python, FastAPI, DB, 크롤링을 활용해 반복 작업을 줄이는 서비스 흐름을 만듭니다.",
  },
  {
    title: "결과를 다시 확인할 수 있게 기록합니다",
    description: "자동화 결과와 한계를 로그, 리포트, 문서로 남겨 다음 개선으로 연결합니다.",
  },
];

const projectSummaries = [
  {
    name: "JobRadar",
    href: "/projects/jobkorea-job-radar",
    description: "채용 공고 확인이라는 반복 작업을 수집, 저장, 점수화하고 결과를 보기 쉬운 리포트로 정리했습니다.",
  },
  {
    name: "GateGuard",
    href: "/projects/gateguard",
    description: "탐지 이후 판단과 기록이 끊기지 않도록 정책 조회, 보조 판단, 로그 저장, 관리자 화면 흐름을 연결했습니다.",
  },
  {
    name: "PCFILTER QA Case Study",
    href: "/projects/pcfilter-qa-case-study",
    description: "QA 경험을 정체성이 아니라 반복 문제를 발견하고 자동화 후보를 찾는 근거로 정리했습니다.",
  },
];

const focusAreas = [
  "Backend/API",
  "Automation",
  "UI Flow",
  "Python",
  "FastAPI",
  "DB Flow",
  "Crawling",
  "AI as Tool",
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
          title="UI와 API 흐름을 함께 이해하는 서비스 개발자"
          description="QA 경험을 통해 반복되는 문제와 수동 검증 흐름을 발견하는 습관을 익혔습니다. 지금은 그 감각을 바탕으로 데이터를 정리하고, API와 화면 흐름을 설계하며, 반복 작업을 자동화하는 개발자로 성장하고 있습니다."
        />
      </section>

      <section className="about-story page-section--reveal-delayed">
        <div className="about-story__intro">
          <p className="about-story__lead">
            안녕하세요. 저는 반복되는 작업을 발견하면 데이터, API, 사용자
            화면 흐름으로 구조화해 자동화하려는 신입 개발자 타미입니다.
          </p>

          <p>
            QA는 제 정체성이라기보다 문제를 발견하는 시야를 만들어준 경험입니다.
            수동으로 반복되는 검증과 흩어진 기록을 보며, 반복을 줄이는 구조를
            만드는 개발에 관심을 갖게 되었습니다.
          </p>

          <p>
            AI는 목표 직무가 아니라 검색과 판단 흐름을 보조하는 도구로
            사용합니다. 중심은 Python, FastAPI, DB, 크롤링을 활용해 데이터를
            정리하고 사용자가 이해할 수 있는 결과 화면과 자동화 흐름을 만드는 일입니다.
          </p>
        </div>

        <div className="about-story__note">
          <p>Core Direction</p>
          <strong>반복 발견 → 흐름 구조화 → 자동화 → 서비스 구현</strong>
        </div>
      </section>

      <section className="about-section about-section--animated">
        <div className="about-section__header">
          <p className="section-eyebrow">How I Work</p>
          <h2>반복을 줄이는 서비스 흐름을 먼저 생각합니다.</h2>
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
          <h2>반복 작업을 자동화 사례로 정리합니다.</h2>
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
          <h2>지금은 자동화와 UI/API 연결 흐름에 집중합니다.</h2>
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
          <h2>자동화와 서비스 구현 프로젝트를 계속 다듬고 있습니다.</h2>
          <p>
            GitHub에는 코드와 실행 방법을, 블로그에는 자동화와 UI/API 연결
            과정에서 배운 내용을 정리합니다. 이 포트폴리오 자체도 일관된 화면
            구성과 다크/라이트 테마를 실험하는 서비스 화면으로 다듬고 있습니다.
          </p>
        </div>

        <div className="about-contact-actions">
          <Link className="hero-primary-link" href="/projects">
            View Projects
          </Link>

          <Link className="hero-github-link" href="/blog">
            Read Backend Notes
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
