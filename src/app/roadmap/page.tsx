import EditorialPageHeader from "@/components/EditorialPageHeader";
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
    <main className="content-shell editorial-page editorial-subpage roadmap-page">
      <RoadmapMotion />
      <section className="roadmap-hero page-hero">
        <EditorialPageHeader eyebrow="ROADMAP / LEARNING PATH" title="ROADMAP">
          <p className="editorial-label">Project Playbook</p>
        </EditorialPageHeader>
      </section>

      <nav className="roadmap-index" aria-label="로드맵 단계 바로가기">
        {roadmapPhases.map((phase, index) => (
          <a href={`#${phase.id}`} key={phase.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="roadmap-index__label">{phase.label}</span>
            <span className="roadmap-index__progress" aria-hidden="true">
              <span />
            </span>
          </a>
        ))}
      </nav>

      <div className="roadmap-phases">
        {roadmapPhases.map((phase, phaseIndex) => (
          <section className="roadmap-phase" id={phase.id} key={phase.id}>
            <div className="roadmap-phase__scene">
              <header className="roadmap-phase__header">
                <div className="roadmap-phase__meta">
                  <span>Phase {String(phaseIndex + 1).padStart(2, "0")}</span>
                  <strong>{String(phaseIndex + 1).padStart(2, "0")}</strong>
                  <span className="roadmap-phase__range">
                    Steps {phase.range}
                  </span>
                </div>
                <p className="section-eyebrow">{phase.label}</p>
                <h2>{phase.title}</h2>
              </header>

              <div className="roadmap-phase__steps">
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
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="roadmap-note">
        <p className="section-eyebrow">END NOTE</p>
        <div className="roadmap-note__content">
          <h2>끝맺음말.</h2>
          <p className="roadmap-note__lead">순서는 기준일 뿐입니다.</p>
          <p className="roadmap-note__body">
            필요한 단계는 다시 돌아가 검증하고 기록합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
