import Link from "next/link"; // 용도 프로젝트, 공부 기록, 외부 연락 링크 이동
import JourneyTimeline from "@/components/JourneyTimeline";
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 링크 정보 조회

export const metadata = {
  title: "About | Tami.log",
  description:
    "반복 작업을 데이터, API, 사용자 화면 흐름으로 구조화해 자동화하는 개발자 소개",
};

const projectSummaries = [
  {
    name: "생담 자사몰 콘텐츠·스킨 유지보수",
    href: "/projects/saengdam-website-maintenance",
    description:
      "보내드림 활동가로 첫 자사몰 유지보수를 완료한 뒤 같은 의뢰처에서 두 번째 요청을 받았습니다. 이미지·스킨 정리에 이어 카테고리 확장 구조와 PC·모바일 화면 오류를 개선했습니다.",
  },
  {
    name: "Gogisise (고기시세)",
    href: "/projects/gogisise",
    description:
      "AI 및 LLM 개발 도구를 활용하여 기획부터 모바일 최적화 UI, NestJS API, Python 크롤러, Supabase 가격 이력 저장, Vercel 배포까지 완성한 축산물 시세 모니터링 서비스입니다.",
  },
  {
    name: "JobRadar",
    href: "/projects/jobkorea-job-radar",
    description:
      "채용 공고 확인이라는 반복 작업을 수집, 저장, 점수화하고 결과를 보기 쉬운 리포트로 정리했습니다.",
  },
  {
    name: "GateGuard",
    href: "/projects/gateguard",
    description:
      "탐지 이후 판단과 기록이 끊기지 않도록 정책 조회, 보조 판단, 로그 저장, 관리자 화면 흐름을 연결했습니다.",
  },
  {
    name: "PCFILTER QA Case Study",
    href: "/projects/pcfilter-qa-case-study",
    description:
      "QA 경험을 정체성이 아니라 반복 문제를 발견하고 자동화 후보를 찾는 근거로 정리했습니다.",
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

export default function AboutPage() {
  return (
    <main className="content-shell about-page">
      <JourneyTimeline />

      <section className="about-section about-section--animated">
        <div className="about-section__header">
          <p className="section-eyebrow">What I Build</p>
          <h2>문제 해결과 자동화를 통해 만들어낸 프로젝트입니다.</h2>
        </div>

        <div className="about-project-list">
          {projectSummaries.map((project) => (
            <Link
              className="about-project-link"
              href={project.href}
              key={project.name}
            >
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
          <h2>프로젝트를 계속 다듬고 있습니다.</h2>
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
