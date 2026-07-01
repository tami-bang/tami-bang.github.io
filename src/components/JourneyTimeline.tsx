"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type JourneyKind =
  | "singapore"
  | "shipping"
  | "creative"
  | "coffee"
  | "cloud"
  | "security"
  | "qa";

type JourneyItem = {
  period: string;
  title: string;
  role: string;
  description: string;
  kind: JourneyKind;
};

const journeyItems: JourneyItem[] = [
  {
    period: "2016.02 ~ 2017.02",
    title: "싱가포르 콩코드 호텔",
    role: "F&B Server",
    description:
      "낯선 해외에서 다양한 사람들을 만나며 서비스 마인드와 적응력을 배웠습니다.",
    kind: "singapore",
  },
  {
    period: "2017.11 ~ 2022.05",
    title: "범주해운",
    role: "수출입 정산, 일본 & 동남아 수출",
    description:
      "수출입 업무를 통해 문서, 데이터, 프로세스의 중요성을 깨닫고 효율적인 업무 흐름을 고민했습니다.",
    kind: "shipping",
  },
  {
    period: "2022.08 ~ 2022.11",
    title: "광고콘텐츠제작 훈련 수료",
    role: "Photoshop, Premiere Pro, After Effects, Illustrator",
    description:
      "어떻게 효과적으로 전달할지 고민하며 콘텐츠 제작과 시각적 표현을 배웠습니다.",
    kind: "creative",
  },
  {
    period: "2022.11 ~ 2023.02",
    title: "바리스타 2급 수료",
    role: "2023.02 커피바리스타 2급 취득",
    description:
      "커피를 배우며 작은 디테일이 경험을 완성한다는 것을 느꼈습니다.",
    kind: "coffee",
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "클라우드 운영자 과정 수료",
    role: "Cloud Operation",
    description:
      "클라우드 환경과 인프라 운영을 배우며 서비스가 동작하는 기반을 이해했습니다.",
    kind: "cloud",
  },
  {
    period: "2025.09 ~ 2026.04",
    title: "KDT - AI기반 웹 접근제어 보안 솔루션 구축",
    role: "Web Security Project",
    description:
      "웹 보안 기술과 서비스 개발을 배우며 개발자로서의 역량을 키웠습니다.",
    kind: "security",
  },
  {
    period: "2026.04 ~ 2026.06",
    title: "지란지교데이터",
    role: "IT 보안 소프트웨어 QA 인턴",
    description:
      "보안 솔루션의 품질을 검증하며 문제를 발견하고 더 나은 서비스를 만드는 과정에 함께했습니다.",
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

function PathIcon({ kind }: { kind: JourneyKind }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {kind === "singapore" && (
        <>
          <path d="M42 7 21 28" />
          <path d="m42 7-8 32-13-11-11 6 6-11L5 10l37-3Z" />
        </>
      )}
      {kind === "shipping" && (
        <>
          <path d="M11 28h26l-5 10H16l-5-10Z" />
          <path d="M17 28V14h14v14" />
          <path d="M8 39c4 2 7 2 11 0 4-2 7-2 11 0 4 2 7 2 11 0" />
        </>
      )}
      {kind === "creative" && (
        <>
          <rect x="9" y="10" width="30" height="28" rx="4" />
          <path d="M17 10v28M31 10v28M9 19h30M9 29h30" />
        </>
      )}
      {kind === "coffee" && (
        <>
          <path d="M18 8c-3 4 3 5 0 9M25 7c-3 4 3 5 0 10M32 8c-3 4 3 5 0 9" />
          <path d="M13 22h22v5c0 7-5 12-11 12s-11-5-11-12v-5Z" />
          <path d="M35 24h3a4 4 0 0 1 0 8h-3M11 41h27" />
        </>
      )}
      {kind === "cloud" && (
        <path d="M16 35h20a8 8 0 0 0 0-16 12 12 0 0 0-23-2 9 9 0 0 0 3 18Z" />
      )}
      {kind === "security" && (
        <>
          <path d="M13 18 5 24l8 6M35 18l8 6-8 6M28 12l-8 24" />
        </>
      )}
      {kind === "qa" && (
        <>
          <path d="M24 6 38 12v11c0 10-6 16-14 19-8-3-14-9-14-19V12l14-6Z" />
          <path d="m18 24 4 4 8-9" />
        </>
      )}
    </svg>
  );
}

function VisualIcon({ kind }: { kind: JourneyKind }) {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true">
      {kind === "singapore" && (
        <>
          <path
            className="visual-line"
            d="M16 86C70 22 96 118 144 48c18-26 36-31 60-24"
          />
          <path
            className="visual-main"
            d="m80 32 78 18-54 25-18 38-12-6 5-30-45-14 9-9 43 2-18-17 12-7Z"
          />
          <path
            className="visual-soft"
            d="M42 124h136M72 124V76h23v48M104 124V64h25v60M140 124V84h18v40"
          />
        </>
      )}
      {kind === "shipping" && (
        <>
          <path
            className="visual-map"
            d="M18 64c28-26 62-28 96-14 32 13 53-9 86 5M28 100c46-13 75 17 117 5 28-8 41 4 57 16"
          />
          <path className="visual-line" d="M38 94C82 62 126 112 174 72" />
          <path
            className="visual-main"
            d="M52 92h112l-14 28H66L52 92ZM70 72h72v20H70zM85 55h42v17H85z"
          />
        </>
      )}
      {kind === "creative" && (
        <>
          <path className="visual-line" d="M24 112c50-40 112-42 172-4" />
          <rect
            className="visual-app visual-app--ps"
            x="36"
            y="38"
            width="38"
            height="38"
            rx="7"
          />
          <rect
            className="visual-app visual-app--pr"
            x="82"
            y="24"
            width="38"
            height="38"
            rx="7"
          />
          <rect
            className="visual-app visual-app--ae"
            x="128"
            y="38"
            width="38"
            height="38"
            rx="7"
          />
          <rect
            className="visual-app visual-app--ai"
            x="174"
            y="24"
            width="38"
            height="38"
            rx="7"
          />
        </>
      )}
      {kind === "coffee" && (
        <>
          <path
            className="visual-soft"
            d="M82 46c-10-18 13-18 3-34M112 46c-10-18 13-18 3-34M142 46c-10-18 13-18 3-34"
          />
          <path
            className="visual-main"
            d="M56 66h100v22c0 30-23 50-50 50S56 118 56 88V66Z"
          />
          <path
            className="visual-soft"
            d="M156 74h14a18 18 0 0 1 0 36h-14M46 140h126"
          />
          <path className="visual-line" d="M72 82c24 14 47 14 70 0" />
        </>
      )}
      {kind === "cloud" && (
        <>
          <path
            className="visual-main"
            d="M66 82h92a28 28 0 0 0-4-56 42 42 0 0 0-80-7A32 32 0 0 0 66 82Z"
          />
          <path
            className="visual-soft"
            d="M82 110h72v28H82zM104 82v28M128 82v28"
          />
          <path className="visual-line" d="M28 124h54M154 124h42M118 138v10" />
        </>
      )}
      {kind === "security" && (
        <>
          <path
            className="visual-soft"
            d="M28 38h72v70H28zM118 38h74v70h-74zM42 56h42M42 72h28M132 56h42M132 72h30"
          />
          <path
            className="visual-main"
            d="M110 52 158 72v34c0 38-21 62-48 76-27-14-48-38-48-76V72l48-20Z"
          />
          <path className="visual-line" d="m88 104 16 16 31-42" />
        </>
      )}
      {kind === "qa" && (
        <>
          <path
            className="visual-soft"
            d="M34 34h152v86H34zM92 120h36v20M76 140h68"
          />
          <circle className="visual-main" cx="134" cy="82" r="34" />
          <path className="visual-soft" d="m158 106 34 34" />
          <path className="visual-line" d="m118 80 12 12 24-29" />
        </>
      )}
    </svg>
  );
}

function VisualPanel({ item }: { item: JourneyItem }) {
  const appLabels = item.kind === "creative" ? ["Ps", "Pr", "Ae", "Ai"] : [];

  return (
    <div
      className={`journey-visual journey-visual--${item.kind}`}
      aria-hidden="true"
    >
      <span className="journey-visual__halo" />
      <span className="journey-visual__scan" />
      <VisualIcon kind={item.kind} />
      {appLabels.length > 0 && (
        <div className="journey-visual__apps">
          {appLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JourneyTimeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(
    () => new Set([0]),
  );
  const [checkedItems, setCheckedItems] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        setVisibleItems((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next.add(Number((entry.target as HTMLElement).dataset.index));
            }
          });

          return next;
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.22 },
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

    itemRefs.current.forEach((item) => {
      if (item) {
        itemObserver.observe(item);
      }
    });

    checkRefs.current.forEach((item) => {
      if (item) {
        checkObserver.observe(item);
      }
    });

    return () => {
      itemObserver.disconnect();
      checkObserver.disconnect();
    };
  }, []);

  return (
    <section className="journey-board" aria-labelledby="journey-board-title">
      <div className="journey-board__intro">
        <p className="section-eyebrow">Journey Storyboard</p>
        <h2 id="journey-board-title">경험이 쌓여, 지금의 저를 만들었습니다.</h2>
        <p>
          사람, 업무, 데이터, 시스템을 이해하는 과정이 하나의 흐름으로 이어져
          서비스 개발이라는 방향이 되었습니다.
        </p>
      </div>

      <div className="journey-board__canvas">
        <svg
          className="journey-board__path"
          viewBox="0 0 150 1160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M76 8C132 82 18 128 78 198C134 264 22 306 76 378C130 448 22 492 78 562C134 632 20 678 76 748C130 820 20 864 78 934C134 1004 24 1050 76 1152" />
        </svg>

        {journeyItems.map((item, index) => (
          <div
            className="journey-board__item"
            data-visible={visibleItems.has(index)}
            data-index={index}
            key={`${item.period}-${item.title}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
          >
            <div className="journey-board__icon">
              <PathIcon kind={item.kind} />
            </div>

            <article className="journey-board__text">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <strong>{item.role}</strong>
              <p>{item.description}</p>
            </article>

            <VisualPanel item={item} />
          </div>
        ))}
      </div>

      <section
        className="journey-work-style"
        aria-labelledby="journey-work-title"
      >
        <div>
          <p className="section-eyebrow">My Core</p>
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
