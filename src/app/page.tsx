import Link from "next/link";
import HeroMascot from "@/components/HeroMascot";
import ProjectMarquee from "@/components/ProjectMarquee";
import ProjectStack from "@/components/ProjectStack";
import { homeHero, workingPatternSteps } from "@/lib/home";
import { getFeaturedProjects, getMarqueeVisuals } from "@/lib/projects";

export default function Home() {
  return (
    <main className="editorial-page editorial-home">
      <section
        className="editorial-hero editorial-shell"
        aria-labelledby="hero-title"
      >
        <p className="editorial-label editorial-hero__identity">
          {homeHero.identity}
        </p>
        <div className="editorial-hero__composition">
          <h1 id="hero-title" className="editorial-hero__title">
            <span>{homeHero.greeting}</span> <span>{homeHero.name}</span>
          </h1>
          <HeroMascot />
        </div>
        <a className="editorial-hero__scroll" href="#project-preview">
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <ProjectMarquee visuals={getMarqueeVisuals()} />

      <section
        className="editorial-section editorial-shell"
        aria-labelledby="workflow-title"
      >
        <div className="editorial-section__header">
          <h2 id="workflow-title">WORKFLOW</h2>
        </div>
        <ol className="editorial-workflow">
          {workingPatternSteps.map((step, index) => (
            <li key={step.title}>
              <span className="editorial-workflow__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="editorial-section editorial-shell"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="editorial-section__header">
          <h2 id="projects-title">
            SELECTED
            <br />
            PROJECTS
          </h2>
          <div>
            <Link className="editorial-link" href="/projects">
              전체 프로젝트 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <ProjectStack projects={getFeaturedProjects().slice(0, 2)} preview />
      </section>

      <section
        className="editorial-section editorial-shell editorial-about"
        aria-labelledby="about-title"
      >
        <h2 className="editorial-label" id="about-title">
          ABOUT / JIHYUN
        </h2>
        <Link className="editorial-link" href="/about">
          About & Journey <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
