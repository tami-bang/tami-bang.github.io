import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import { getFeaturedProjects } from "@/lib/projects"; // 용도 프로젝트 목록 데이터 조회

export default function ProjectsPage() {
  const projects = getFeaturedProjects();

  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="section-eyebrow">Portfolio</p>

        <h1>Projects</h1>

        <p>
          GitHub와 중복되지 않도록 코드 설명보다 문제 정의, 설계 방향,
          기술적 판단, 결과 중심으로 정리합니다.
        </p>
      </section>

      <section className="project-story-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}