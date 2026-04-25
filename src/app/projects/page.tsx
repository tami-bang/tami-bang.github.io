import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { projects } from "@/lib/projects"; // 용도 전체 프로젝트 데이터 조회

export const metadata = {
  title: "Projects | Tami.log",
  description: "AI, Backend, Network 기반 프로젝트 Case Study 목록",
};

export default function ProjectsPage() {
  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="Case Studies"
          title="Projects designed from real problems"
          description="단순히 만든 결과물이 아니라 문제 정의, 설계 판단, 구현 흐름, 결과를 함께 기록합니다."
        />
      </section>

      <section className="page-section page-section--reveal-delayed">
        <div className="project-story-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}