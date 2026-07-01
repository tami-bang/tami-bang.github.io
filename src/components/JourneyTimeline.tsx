"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type JourneyIcon =
  | "plane"
  | "ship"
  | "film"
  | "coffee"
  | "cloud"
  | "shield"
  | "bug";

type JourneyItem = {
  period: string;
  title: string;
  role: string;
  description: string[];
  keywords: string[];
  icon: JourneyIcon;
};

const journeyItems: JourneyItem[] = [
  {
    period: "2016.02 ~ 2017.02",
    title: "싱가포르 콩코드 호텔",
    role: "F&B Server",
    description: [
      "낯선 환경에서 다양한 사람들과 일하며 새로운 환경에 빠르게 적응하는 법과 서비스 마인드를 배웠습니다.",
    ],
    keywords: ["적응력", "서비스 마인드"],
    icon: "plane",
  },
  {
    period: "2017.11 ~ 2022.05",
    title: "범주해운",
    role: "수출입 정산, 일본·동남아 수출",
    description: [
      "문서, 일정, 데이터, 프로세스가 맞물려 돌아가는 업무를 경험했습니다.",
      "반복되는 업무를 보며 더 효율적인 방법과 체계를 고민하기 시작했습니다.",
    ],
    keywords: ["프로세스", "체계화", "데이터"],
    icon: "ship",
  },
  {
    period: "2022.08 ~ 2022.11",
    title: "광고콘텐츠제작 과정 수료",
    role: "Design & Motion Tools",
    description: [
      "Photoshop, Premiere Pro, After Effects, Illustrator를 배우며 정보를 어떻게 보여주고 전달할지 고민하는 습관을 얻었습니다.",
    ],
    keywords: ["전달", "표현", "사용자 관점"],
    icon: "film",
  },
  {
    period: "2022.11 ~ 2023.02",
    title: "커피바리스타 2급 취득",
    role: "Barista Certificate",
    description: ["작은 디테일 하나가 사용자 경험을 바꾼다는 것을 배웠습니다."],
    keywords: ["디테일", "경험"],
    icon: "coffee",
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "클라우드 운영자 과정 수료",
    role: "Cloud Operation",
    description: ["서비스가 동작하는 기반과 시스템의 흐름에 대해 배웠습니다."],
    keywords: ["인프라", "시스템"],
    icon: "cloud",
  },
  {
    period: "2025.09 ~ 2026.04",
    title: "KDT - AI 기반 웹 접근제어 보안 솔루션 구축",
    role: "Web Security Project",
    description: [
      "웹 보안과 서비스 개발을 배우며 개발자로서의 방향성을 구체화했습니다.",
    ],
    keywords: ["보안", "개발", "서비스"],
    icon: "shield",
  },
  {
    period: "2026.04 ~ 2026.06",
    title: "지란지교데이터",
    role: "IT 보안 소프트웨어 QA 인턴",
    description: [
      "문제 발견, 재현, 로그 분석, 문서화 과정을 경험하며 품질의 중요성을 배웠습니다.",
    ],
    keywords: ["문제 해결", "문서화", "품질"],
    icon: "bug",
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

function JourneyIconGraphic({ icon }: { icon: JourneyIcon }) {
  if (icon === "plane") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M42 7 21 28" />
        <path d="m42 7-8 32-13-11-11 6 6-11L5 10l37-3Z" />
      </svg>
    );
  }

  if (icon === "ship") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 28h26l-5 10H16l-5-10Z" />
        <path d="M17 28V14h14v14" />
        <path d="M21 14V8h6v6" />
        <path d="M8 39c4 2 7 2 11 0 4-2 7-2 11 0 4 2 7 2 11 0" />
      </svg>
    );
  }

  if (icon === "film") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="9" y="10" width="30" height="28" rx="4" />
        <path d="M17 10v28M31 10v28M9 19h30M9 29h30" />
      </svg>
    );
  }

  if (icon === "coffee") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          className="journey-icon__steam journey-icon__steam--one"
          d="M18 8c-3 4 3 5 0 9"
        />
        <path
          className="journey-icon__steam journey-icon__steam--two"
          d="M25 7c-3 4 3 5 0 10"
        />
        <path
          className="journey-icon__steam journey-icon__steam--three"
          d="M32 8c-3 4 3 5 0 9"
        />
        <path d="M13 22h22v5c0 7-5 12-11 12s-11-5-11-12v-5Z" />
        <path d="M35 24h3a4 4 0 0 1 0 8h-3" />
        <path d="M11 41h27" />
      </svg>
    );
  }

  if (icon === "cloud") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M16 35h20a8 8 0 0 0 0-16 12 12 0 0 0-23-2 9 9 0 0 0 3 18Z" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6 38 12v11c0 10-6 16-14 19-8-3-14-9-14-19V12l14-6Z" />
        <path d="m18 24 4 4 8-9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 18h16v14a8 8 0 0 1-16 0V18Z" />
      <path d="M20 18v-4a4 4 0 0 1 8 0v4" />
      <path d="M11 23h5M32 23h5M10 32h6M32 32h6M14 41l4-4M34 41l-4-4" />
      <path className="journey-icon__bug-eye" d="M21 25h.1M27 25h.1" />
    </svg>
  );
}

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const checkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(
    () => new Set(),
  );
  const [checkedItems, setCheckedItems] = useState<Set<number>>(
    () => new Set(),
  );
  const glowStyle = useMemo(
    () =>
      ({
        "--journey-mouse-x": "50%",
        "--journey-mouse-y": "20%",
      }) as CSSProperties,
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const updateScrollState = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const rawProgress =
        (viewportHeight * 0.58 - rect.top) /
        Math.max(rect.height - viewportHeight * 0.3, 1);
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(nextProgress);

      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const viewportCenter = viewportHeight / 2;

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number((entry.target as HTMLElement).dataset.index));
            }
          });

          return next;
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.18 },
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
      { rootMargin: "0px 0px -22% 0px", threshold: 0.35 },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });

    checkRefs.current.forEach((item) => {
      if (item) {
        checkObserver.observe(item);
      }
    });

    return () => {
      cardObserver.disconnect();
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
      "--journey-mouse-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    section.style.setProperty(
      "--journey-mouse-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  return (
    <section
      className="journey-timeline"
      ref={sectionRef}
      style={
        {
          ...glowStyle,
          "--journey-progress": `${progress * 100}%`,
        } as CSSProperties
      }
      onPointerMove={handlePointerMove}
      aria-labelledby="journey-timeline-title"
    >
      <div className="journey-timeline__header">
        <p className="section-eyebrow">Journey Timeline</p>
        <h2 id="journey-timeline-title">
          경험이 쌓여, 지금의 저를 만들었습니다.
        </h2>
        <p>
          사람, 업무, 데이터, 그리고 시스템을 이해하는 과정을 지나 서비스
          개발자가 되었습니다.
        </p>
      </div>

      <ol className="journey-timeline__list">
        {journeyItems.map((item, index) => (
          <li
            className="journey-timeline__item"
            data-active={activeIndex === index}
            data-visible={visibleCards.has(index)}
            data-index={index}
            key={`${item.period}-${item.title}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <div className="journey-timeline__marker" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>

            <article className={`journey-card journey-card--${item.icon}`}>
              <div className="journey-card__icon">
                <JourneyIconGraphic icon={item.icon} />
              </div>

              <div className="journey-card__content">
                <span className="journey-card__period">{item.period}</span>
                <h3>{item.title}</h3>
                <strong>{item.role}</strong>

                {item.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}

                <div
                  className="journey-card__keywords"
                  aria-label="핵심 키워드"
                >
                  {item.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

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
