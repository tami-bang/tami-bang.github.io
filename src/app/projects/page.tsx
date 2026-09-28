import EditorialPageHeader from "@/components/EditorialPageHeader";
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
    <main className="editorial-page editorial-shell editorial-subpage editorial-projects-page">
      <EditorialPageHeader eyebrow="PROJECTS / SELECTED WORK" title="PROJECTS">
        <div>
          <h2>SELECT A PROJECT</h2>
        </div>
      </EditorialPageHeader>
      <section aria-label="프로젝트 목록">
        <ProjectStack projects={ordered} indexStack />
      </section>
    </main>
  );
}
