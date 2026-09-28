import Image from "next/image";
import Link from "next/link";
import EditorialMotion from "@/components/EditorialMotion";
import ProjectStackItem from "@/components/ProjectStackItem";
import {
  getProjectCover,
  projectKindLabels,
  type Project,
} from "@/lib/projects";

const workScreens: Record<
  string,
  { imageSrc: string; alt: string; width: number; height: number }
> = {
  "jobkorea-job-radar": {
    imageSrc: "/images/jobradar-home-preview-hq.png",
    alt: "JobRadar 실제 화면",
    width: 1912,
    height: 813,
  },
  "saengdam-website-maintenance": {
    imageSrc: "/images/saengdam-home-preview-full-height-hq.png",
    alt: "생담 자사몰 실제 화면",
    width: 1892,
    height: 1164,
  },
  gogisise: {
    imageSrc: "/images/gogisise-two-screens-warning-removed.png",
    alt: "고기시세 모바일 UI 두 화면",
    width: 1822,
    height: 1562,
  },
  "pcfilter-qa-case-study": {
    imageSrc: "/pcfilter-internship-preview.png",
    alt: "QA 인턴 업무 대상인 PCFILTER 제품 화면",
    width: 1604,
    height: 1108,
  },
};

export default function ProjectStack({
  projects,
  indexStack = false,
  preview = false,
}: {
  projects: Project[];
  indexStack?: boolean;
  preview?: boolean;
}) {
  return (
    <EditorialMotion>
      <div
        className={`project-stack${indexStack ? " project-stack--index" : ""}${preview ? " project-stack--preview" : ""}`}
        role="list"
      >
        {projects.map((project, index) => {
          const workScreen =
            indexStack ||
            (preview &&
              ["jobkorea-job-radar", "saengdam-website-maintenance"].includes(
                project.slug,
              ))
              ? workScreens[project.slug]
              : undefined;
          const cover = getProjectCover(project);

          return (
            <ProjectStackItem
              key={project.slug}
              last={index === projects.length - 1}
              indexStack={indexStack}
              index={index}
            >
              {indexStack && (
                <div className="project-sheet__tab" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.title}</span>
                </div>
              )}
              <div className="editorial-project__sheet">
                <header className="editorial-project__header">
                  <span className="editorial-project__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="editorial-project__metadata">
                      <span>{projectKindLabels[project.kind]}</span>
                      <span>{project.period}</span>
                    </p>
                    <h2>{project.title}</h2>
                  </div>
                </header>
                <div className="editorial-project__body">
                  <div className="editorial-project__copy">
                    {!indexStack && (
                      <p className="editorial-project__category">
                        {project.domain}
                      </p>
                    )}
                    <h3>{project.subtitle}</h3>
                    {!indexStack && !preview && (
                      <p className="editorial-project__description">
                        {project.description}
                      </p>
                    )}
                    <ul
                      className="editorial-project__tech"
                      aria-label="핵심 기술"
                    >
                      {project.techStack.slice(0, 5).map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <Link
                      className="editorial-link"
                      href={`/projects/${project.slug}`}
                      aria-label={`${project.title} 자세히 보기`}
                    >
                      프로젝트 자세히 보기 <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                  {workScreen ? (
                    <figure
                      className={
                        cover
                          ? "editorial-project__visual"
                          : "editorial-project__index-visual editorial-project__screen"
                      }
                    >
                      <Image
                        src={workScreen.imageSrc}
                        alt={workScreen.alt}
                        width={workScreen.width}
                        height={workScreen.height}
                        sizes="(max-width: 999px) 90vw, 58vw"
                      />
                    </figure>
                  ) : cover ? (
                    <figure className="editorial-project__visual">
                      <Image
                        src={cover.imageSrc}
                        alt={cover.alt}
                        width={cover.width}
                        height={cover.height}
                        sizes="(max-width: 999px) 90vw, 58vw"
                      />
                      {!indexStack && <figcaption>{cover.title}</figcaption>}
                    </figure>
                  ) : indexStack || preview ? (
                    <div className="editorial-project__index-visual">
                      <p className="editorial-label">{project.status}</p>
                      <p>{project.resultSummary ?? project.subtitle}</p>
                    </div>
                  ) : (
                    <div className="editorial-project__flow">
                      <p className="editorial-label">
                        DATA FLOW / {project.title}
                      </p>
                      <ol>
                        {(project.backendFlow ?? project.structuredFlow ?? "")
                          .split("→")
                          .map((step, stepIndex) => (
                            <li key={step}>
                              <span>
                                {String(stepIndex + 1).padStart(2, "0")}
                              </span>
                              {step.trim()}
                            </li>
                          ))}
                      </ol>
                      <p>{project.resultSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            </ProjectStackItem>
          );
        })}
      </div>
    </EditorialMotion>
  );
}
