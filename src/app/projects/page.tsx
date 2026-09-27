import ProjectStack from "@/components/ProjectStack";
import { getFeaturedProjects, projects } from "@/lib/projects";

export const metadata = {
  title: "Projects | Tami.log",
  description: "반복 작업을 데이터, API, 사용자 화면 흐름으로 바꾼 프로젝트",
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const featuredSlugs = new Set(featured.map((project) => project.slug));
  const ordered = [
    ...featured,
    ...projects.filter((project) => !featuredSlugs.has(project.slug)),
  ];

  return (
    <main className="editorial-page editorial-shell editorial-projects-page">
      <header className="editorial-projects-intro">
        <p className="editorial-label">TAMI.LOG / WORK INDEX</p>
        <h1>
          PROJECTS<span>({String(projects.length).padStart(2, "0")})</span>
        </h1>
        <div>
          <h2>반복 작업을 서비스 흐름으로 바꾼 프로젝트</h2>
          <p>
            수동 확인, 반복 판단, 흩어진 데이터를 구조화하고 자동화하는 과정에
            집중한 프로젝트입니다. 각 프로젝트는 문제를 발견한 지점, 데이터/API
            흐름, 사용자에게 보이는 결과, 구현 역할을 중심으로 정리했습니다.
          </p>
        </div>
      </header>
      <section aria-label="프로젝트 목록">
        <ProjectStack projects={ordered} />
      </section>
    </main>
  );
}
