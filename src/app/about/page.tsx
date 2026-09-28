import EditorialPageHeader from "@/components/EditorialPageHeader";
import Link from "next/link"; // 용도 프로젝트, 공부 기록, 외부 연락 링크 이동
import JourneyTimeline from "@/components/JourneyTimeline";
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 링크 정보 조회

export const metadata = {
  title: "About | Tami.log",
  description:
    "반복 작업을 데이터, API, 사용자 화면 흐름으로 구조화해 자동화하는 개발자 소개",
};

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
    <main className="content-shell about-page editorial-page editorial-subpage">
      <EditorialPageHeader eyebrow="ABOUT / PROFILE & JOURNEY" title="ABOUT" />
      <JourneyTimeline />

      <section className="about-section">
        <p className="section-eyebrow">Current Focus</p>

        <div className="about-focus-list">
          {focusAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="about-contact-panel">
        <div>
          <p className="section-eyebrow">Contact</p>
          <p>
            GitHub에는 코드와 실행 방법을, 블로그에는 자동화와 UI/API 연결
            과정에서 배운 내용을 기록합니다.
          </p>
        </div>

        <div className="about-contact-actions">
          <Link className="about-contact-primary" href="/projects">
            View Projects
          </Link>

          <Link className="about-contact-secondary" href="/blog">
            Read Study Log
          </Link>

          <a
            className="about-contact-tertiary"
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className="about-contact-tertiary"
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
