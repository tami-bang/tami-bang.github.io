import { roadmapPhases } from "@/lib/roadmap";
import RoadmapMotion from "@/components/RoadmapMotion";
import "../../styles/roadmap.css";

export const metadata = {
  title: "Project Roadmap | Tami.log",
  description:
    "아이디어를 동작하는 서비스 흐름으로 연결하는 Tami의 개발 로드맵",
};

export default function RoadmapPage() {
  return (
    <main className="content-shell roadmap-page">
      <RoadmapMotion />
      <section className="roadmap-hero page-hero page-section--reveal">
        <div className="roadmap-hero__copy">
          <p className="section-eyebrow">Project Playbook</p>
          <h1>
            아이디어를 <span>동작하는 서비스 흐름</span>으로.
          </h1>
        </div>

        <div className="roadmap-hero__stats" aria-label="로드맵 요약">
          <div>
            <strong>25</strong>
            <span>Steps</span>
          </div>
          <div>
            <strong>05</strong>
            <span>Phases</span>
          </div>
          <div>
            <strong>01</strong>
            <span>Service</span>
          </div>
        </div>

        <div className="roadmap-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <nav
        className="roadmap-index page-section--reveal-delayed"
        aria-label="로드맵 단계 바로가기"
      >
        {roadmapPhases.map((phase, index) => (
          <a href={`#${phase.id}`} key={phase.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {phase.label}
          </a>
        ))}
      </nav>

      <div className="roadmap-phases">
        {roadmapPhases.map((phase, phaseIndex) => (
          <section className="roadmap-phase" id={phase.id} key={phase.id}>
            <header className="roadmap-phase__header">
              <div className="roadmap-phase__meta">
                <span>Phase {String(phaseIndex + 1).padStart(2, "0")}</span>
                <strong>{phase.range}</strong>
              </div>
              <div>
                <p className="section-eyebrow">{phase.label}</p>
                <h2>{phase.title}</h2>
                <p>{phase.description}</p>
              </div>
            </header>

            <div className="roadmap-phase__line" aria-hidden="true">
              <span />
            </div>

            <div className="roadmap-step-grid">
              {phase.steps.map((step) => (
                <article
                  className={`roadmap-step${step.tracks ? " roadmap-step--wide" : ""}`}
                  key={step.number}
                >
                  <div className="roadmap-step__heading">
                    <span>{String(step.number).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                  </div>

                  {step.items.length > 0 && (
                    <ul>
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {step.tracks && (
                    <div className="roadmap-tracks">
                      {step.tracks.map((track) => (
                        <div key={track.name}>
                          <strong>{track.name}</strong>
                          <p>{track.items.join(" · ")}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="roadmap-note">
        <span>One more thing</span>
        <p>
          순서는 기준이지만, 프로젝트는 늘 살아 있습니다. 필요한 단계는 앞뒤로
          오가며 검증하고 기록합니다.
        </p>
      </section>
    </main>
  );
}
