import ProjectCard from "@/components/ProjectCard"; // 용도 프로젝트 카드 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { getFeaturedProjects, projects } from "@/lib/projects"; // 용도 전체 및 대표 프로젝트 데이터 조회

export const metadata = {
  title: "Projects | Tami.log",
  description: "반복 작업을 데이터, API, 사용자 화면 흐름으로 바꾼 프로젝트",
};

function getOrderedProjects() {
  const featuredProjects = getFeaturedProjects();
  const featuredSlugs = new Set(
    featuredProjects.map((project) => project.slug),
  );
  const otherProjects = projects.filter(
    (project) => !featuredSlugs.has(project.slug),
  );

  return [...featuredProjects, ...otherProjects];
}

export default function ProjectsPage() {
  const orderedProjects = getOrderedProjects();

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="Service Automation Projects"
          title="반복 작업을 서비스 흐름으로 바꾼 프로젝트"
          description="수동 확인, 반복 판단, 흩어진 데이터를 구조화하고 자동화하는 과정에 집중한 프로젝트입니다. 각 프로젝트는 문제를 발견한 지점, 데이터/API 흐름, 사용자에게 보이는 결과, 구현 역할을 중심으로 정리했습니다."
        />
      </section>

      <section className="page-section page-section--reveal-delayed">
        <div className="project-story-grid">
          {orderedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
