import Image from "next/image";
import Link from "next/link";
import EditorialMotion from "@/components/EditorialMotion";
import ProjectStackItem from "@/components/ProjectStackItem";
import {
  getProjectCover,
  projectKindLabels,
  type Project,
} from "@/lib/projects";

export default function ProjectStack({
  projects,
  indexStack = false,
}: {
  projects: Project[];
  indexStack?: boolean;
}) {
  return (
    <EditorialMotion>
      <div
        className={`project-stack${indexStack ? " project-stack--index" : ""}`}
        role="list"
      >
        {projects.map((project, index) => {
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
                  <p className="editorial-project__category">
                    {project.domain}
                  </p>
                  <h3>{project.subtitle}</h3>
                  <p className="editorial-project__description">
                    {project.description}
                  </p>
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
                {cover ? (
                  <figure className="editorial-project__visual">
                    <Image
                      src={cover.imageSrc}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes="(max-width: 999px) 90vw, 58vw"
                    />
                    <figcaption>{cover.title}</figcaption>
                  </figure>
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
            </ProjectStackItem>
          );
        })}
      </div>
    </EditorialMotion>
  );
}
