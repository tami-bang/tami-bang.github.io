"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type SceneKind =
  | "singapore"
  | "shipping"
  | "creative"
  | "coffee"
  | "cloud"
  | "security"
  | "qa";

type JourneyScene = {
  period: string;
  title: string;
  role: string;
  summary: string;
  keywords: string[];
  kind: SceneKind;
};

const journeyScenes: JourneyScene[] = [
  {
    period: "2016.02 ~ 2017.02",
    title: "싱가포르 콩코드 호텔",
    role: "F&B Server",
    summary:
      "낯선 환경에서 다양한 사람들과 일하며 새로운 환경에 빠르게 적응하는 법과 서비스 마인드를 배웠습니다.",
    keywords: ["적응력", "서비스 마인드"],
    kind: "singapore",
  },
  {
    period: "2017.11 ~ 2022.05",
    title: "범주해운",
    role: "수출입 정산, 일본·동남아 수출",
    summary:
      "문서, 일정, 데이터, 프로세스가 맞물려 돌아가는 업무를 경험했고 반복되는 업무를 보며 더 효율적인 체계를 고민하기 시작했습니다.",
    keywords: ["프로세스", "체계화", "데이터"],
    kind: "shipping",
  },
  {
    period: "2022.08 ~ 2022.11",
    title: "광고콘텐츠제작 과정 수료",
    role: "Photoshop, Premiere Pro, After Effects, Illustrator",
    summary:
      "정보를 어떻게 보여주고 전달할지 고민하며 콘텐츠를 사용자 관점에서 바라보는 습관을 얻었습니다.",
    keywords: ["전달", "표현", "사용자 관점"],
    kind: "creative",
  },
  {
    period: "2022.11 ~ 2023.02",
    title: "커피바리스타 2급 취득",
    role: "Barista Certificate",
    summary: "작은 디테일 하나가 사용자 경험을 바꾼다는 것을 배웠습니다.",
    keywords: ["디테일", "경험"],
    kind: "coffee",
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "클라우드 운영자 과정 수료",
    role: "Cloud Operation",
    summary: "서비스가 동작하는 기반과 시스템의 흐름에 대해 배웠습니다.",
    keywords: ["인프라", "시스템"],
    kind: "cloud",
  },
  {
    period: "2025.09 ~ 2026.04",
    title: "KDT - AI 기반 웹 접근제어 보안 솔루션 구축",
    role: "Web Security Project",
    summary:
      "웹 보안과 서비스 개발을 배우며 개발자로서의 방향성을 구체화했습니다.",
    keywords: ["보안", "개발", "서비스"],
    kind: "security",
  },
  {
    period: "2026.04 ~ 2026.06",
    title: "지란지교데이터",
    role: "IT 보안 소프트웨어 QA 인턴",
    summary:
      "문제 발견, 재현, 로그 분석, 문서화 과정을 경험하며 품질의 중요성을 배웠습니다.",
    keywords: ["문제 해결", "문서화", "품질"],
    kind: "qa",
  },
];

const workChecklist = [
  "해야 할 일을 먼저 정리합니다.",
  "먼저 동작하는 최소 기능(MVP)을 만듭니다.",
  "해결이 필요한 일은 메모해 둡니다.",
  "한 번 해결한 문제는 문서로 남깁니다.",
  "반복되는 일은 자동화할 방법을 고민합니다.",
  "완료한 일은 체크하고 다음 작업으로 넘어갑니다.",
];

function SingaporeScene() {
  return (
    <>
      <div className="story-plane" aria-hidden="true">
        <svg viewBox="0 0 180 120">
          <path d="M160 18 76 78 40 65 58 52 18 33 37 24l60 18 42-30c12-8 26-5 21 6Z" />
          <path d="M77 78 68 110l19-24" />
          <path d="M94 65 128 96l11-9-29-35" />
        </svg>
      </div>

      <svg
        className="story-flight-path"
        viewBox="0 0 720 420"
        aria-hidden="true"
      >
        <path d="M20 320C160 160 260 390 382 215 488 64 570 156 694 72" />
      </svg>

      <div className="story-singapore-skyline" aria-hidden="true">
        <span className="story-mbs" />
        <span className="story-tower story-tower--one" />
        <span className="story-tower story-tower--two" />
        <span className="story-wheel" />
        <span className="story-merlion" />
      </div>
    </>
  );
}

function ShippingScene() {
  return (
    <>
      <svg className="story-world-map" viewBox="0 0 900 470" aria-hidden="true">
        <path d="M88 176c54-42 124-58 200-40 44 10 82 8 126-16 70-38 150-22 220 14 48 24 92 24 150 9 42-11 82 6 96 42" />
        <path d="M132 268c70-20 124-10 173 31 45 37 112 36 170 7 74-37 156-24 216 20 44 31 83 36 142 15" />
        <path
          className="story-route"
          d="M188 250C322 178 455 333 596 230c66-48 115-42 184 6"
        />
        <circle cx="188" cy="250" r="7" />
        <circle cx="596" cy="230" r="7" />
        <circle cx="780" cy="236" r="7" />
      </svg>

      <div className="story-ship" aria-hidden="true">
        <span className="story-ship__stack story-ship__stack--one" />
        <span className="story-ship__stack story-ship__stack--two" />
        <span className="story-ship__stack story-ship__stack--three" />
        <span className="story-ship__bridge" />
        <span className="story-ship__hull" />
      </div>
    </>
  );
}

function CreativeScene() {
  return (
    <>
      <div className="story-orbit" aria-hidden="true" />
      <div className="story-adobe-grid" aria-label="Adobe creative tools">
        {["Ps", "Pr", "Ae", "Ai"].map((tool) => (
          <span
            className={`story-adobe story-adobe--${tool.toLowerCase()}`}
            key={tool}
          >
            {tool}
          </span>
        ))}
      </div>
      <div className="story-edit-timeline" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  );
}

function CoffeeScene() {
  return (
    <>
      <div className="story-coffee-bar" aria-hidden="true">
        <span className="story-cup">
          <span className="story-steam story-steam--one" />
          <span className="story-steam story-steam--two" />
          <span className="story-steam story-steam--three" />
          <span className="story-latte" />
        </span>
        <span className="story-portafilter" />
        <span className="story-counter" />
      </div>
    </>
  );
}

function CloudScene() {
  return (
    <>
      <div className="story-cloud-network" aria-hidden="true">
        <span className="story-cloud-shape" />
        <span className="story-server story-server--one" />
        <span className="story-server story-server--two" />
        <span className="story-server story-server--three" />
        <span className="story-network-line story-network-line--one" />
        <span className="story-network-line story-network-line--two" />
        <span className="story-network-dot story-network-dot--one" />
        <span className="story-network-dot story-network-dot--two" />
        <span className="story-network-dot story-network-dot--three" />
      </div>
    </>
  );
}

function SecurityScene() {
  return (
    <>
      <div className="story-code-wall" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="story-shield" aria-hidden="true">
        <svg viewBox="0 0 220 260">
          <path d="M110 14 190 48v66c0 68-34 108-80 130-46-22-80-62-80-130V48l80-34Z" />
          <path d="m75 132 26 27 48-62" />
        </svg>
      </div>
    </>
  );
}

function QaScene() {
  return (
    <>
      <div className="story-qa-desk" aria-hidden="true">
        <span className="story-monitor story-monitor--main" />
        <span className="story-monitor story-monitor--left" />
        <span className="story-monitor story-monitor--right" />
        <span className="story-magnifier" />
        <span className="story-checkmark" />
      </div>
    </>
  );
}

function SceneVisual({ kind }: { kind: SceneKind }) {
  return (
    <div className={`journey-scene__visual journey-scene__visual--${kind}`}>
      <div className="journey-scene__stars" aria-hidden="true" />
      {kind === "singapore" && <SingaporeScene />}
      {kind === "shipping" && <ShippingScene />}
      {kind === "creative" && <CreativeScene />}
      {kind === "coffee" && <CoffeeScene />}
      {kind === "cloud" && <CloudScene />}
      {kind === "security" && <SecurityScene />}
      {kind === "qa" && <QaScene />}
    </div>
  );
}

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const checkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleScenes, setVisibleScenes] = useState<Set<number>>(
    () => new Set([0]),
  );
  const [checkedItems, setCheckedItems] = useState<Set<number>>(
    () => new Set(),
  );

  const glowStyle = useMemo(
    () =>
      ({
        "--story-mouse-x": "50%",
        "--story-mouse-y": "20%",
      }) as CSSProperties,
    [],
  );

  useEffect(() => {
    const updateActiveScene = () => {
      const viewportCenter = (window.innerHeight || 1) / 2;
      let nextActive = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) {
          return;
        }

        const rect = scene.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActive = index;
        }
      });

      setActiveIndex(nextActive);
    };

    updateActiveScene();
    window.addEventListener("scroll", updateActiveScene, { passive: true });
    window.addEventListener("resize", updateActiveScene);

    return () => {
      window.removeEventListener("scroll", updateActiveScene);
      window.removeEventListener("resize", updateActiveScene);
    };
  }, []);

  useEffect(() => {
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        setVisibleScenes((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number((entry.target as HTMLElement).dataset.index));
            }
          });

          return next;
        });
      },
      { rootMargin: "-12% 0px -18% 0px", threshold: 0.28 },
    );

    const checkObserver = new IntersectionObserver(
      (entries) => {
        setCheckedItems((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number((entry.target as HTMLElement).dataset.index));
            }
          });

          return next;
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.35 },
    );

    sceneRefs.current.forEach((scene) => {
      if (scene) {
        sceneObserver.observe(scene);
      }
    });

    checkRefs.current.forEach((item) => {
      if (item) {
        checkObserver.observe(item);
      }
    });

    return () => {
      sceneObserver.disconnect();
      checkObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    section.style.setProperty(
      "--story-mouse-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    section.style.setProperty(
      "--story-mouse-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  return (
    <section
      className="journey-documentary"
      ref={sectionRef}
      style={glowStyle}
      onPointerMove={handlePointerMove}
      aria-labelledby="journey-documentary-title"
    >
      <div className="journey-documentary__intro">
        <p className="section-eyebrow">Interactive Career Documentary</p>
        <h2 id="journey-documentary-title">
          경험이 쌓여, 지금의 저를 만들었습니다.
        </h2>
        <p>
          사람, 업무, 데이터, 그리고 시스템을 이해하는 장면들을 지나 서비스
          개발자가 되었습니다. 스크롤하며 제 커리어가 하나의 여정처럼 이어지는
          흐름을 따라가 보세요.
        </p>
      </div>

      <div className="journey-documentary__progress" aria-hidden="true">
        {journeyScenes.map((scene, index) => (
          <span data-active={activeIndex === index} key={`${scene.kind}-dot`} />
        ))}
      </div>

      <div className="journey-story">
        {journeyScenes.map((scene, index) => (
          <article
            className={`journey-scene journey-scene--${scene.kind}`}
            data-active={activeIndex === index}
            data-visible={visibleScenes.has(index)}
            data-index={index}
            key={`${scene.period}-${scene.title}`}
            ref={(element) => {
              sceneRefs.current[index] = element;
            }}
          >
            <SceneVisual kind={scene.kind} />

            <div className="journey-scene__caption">
              <span className="journey-scene__number">
                Scene {String(index + 1).padStart(2, "0")}
              </span>
              <span className="journey-scene__period">{scene.period}</span>
              <h3>{scene.title}</h3>
              <strong>{scene.role}</strong>
              <p>{scene.summary}</p>

              <div className="journey-scene__keywords" aria-label="핵심 키워드">
                {scene.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section
        className="journey-work-style"
        aria-labelledby="journey-work-title"
      >
        <div>
          <p className="section-eyebrow">Work Style</p>
          <h2 id="journey-work-title">저는 이렇게 일합니다</h2>
        </div>

        <ul className="journey-checklist">
          {workChecklist.map((item, index) => (
            <li
              data-checked={checkedItems.has(index)}
              data-index={index}
              key={item}
              ref={(element) => {
                checkRefs.current[index] = element;
              }}
              style={{ "--check-delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className="journey-checklist__box" aria-hidden="true" />
              <span className="journey-checklist__text">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
