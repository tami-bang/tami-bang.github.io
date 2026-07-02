"use client";

import Image from "next/image";
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
  visualSrc: string;
  visualAlt: string;
  visualWidth: number;
  visualHeight: number;
};

const journeyItems: JourneyItem[] = [
  {
    period: "2016.02 ~ 2017.02",
    title: "싱가포르 콩코드 호텔",
    role: "F&B Server",
    description:
      "낯선 해외에서 다양한 사람들을 만나며 서비스 마인드와 적응력을 배웠습니다.",
    kind: "singapore",
    visualSrc: "/images/싱가폴.png",
    visualAlt: "싱가포르 스카이라인과 비행기 비주얼",
    visualWidth: 1536,
    visualHeight: 1024,
  },
  {
    period: "2017.11 ~ 2022.05",
    title: "범주해운",
    role: "수출입 정산, 일본 & 동남아 수출",
    description:
      "수출입 업무를 통해 문서, 데이터, 프로세스의 중요성을 깨닫고 효율적인 업무 흐름을 고민했습니다.",
    kind: "shipping",
    visualSrc: "/images/범주해운.png",
    visualAlt: "컨테이너선과 물류 경로 비주얼",
    visualWidth: 1774,
    visualHeight: 887,
  },
  {
    period: "2022.08 ~ 2022.11",
    title: "광고콘텐츠제작 훈련 수료",
    role: "Photoshop, Premiere Pro, After Effects, Illustrator",
    description:
      "어떻게 효과적으로 전달할지 고민하며 콘텐츠 제작과 시각적 표현을 배웠습니다.",
    kind: "creative",
    visualSrc: "/images/광고콘텐츠제작.png",
    visualAlt: "광고콘텐츠 제작 도구와 그래픽 비주얼",
    visualWidth: 1658,
    visualHeight: 949,
  },
  {
    period: "2022.11 ~ 2023.02",
    title: "바리스타 2급 수료",
    role: "2023.02 커피바리스타 2급 취득",
    description:
      "커피를 배우며 작은 디테일이 경험을 완성한다는 것을 느꼈습니다.",
    kind: "coffee",
    visualSrc: "/images/바리스타.png",
    visualAlt: "바리스타와 커피 경험 비주얼",
    visualWidth: 1536,
    visualHeight: 1024,
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "클라우드 운영자 과정 수료",
    role: "Cloud Operation",
    description:
      "클라우드 환경과 인프라 운영을 배우며 서비스가 동작하는 기반을 이해했습니다.",
    kind: "cloud",
    visualSrc: "/images/클라우드 운영자.png",
    visualAlt: "클라우드와 서버 인프라 비주얼",
    visualWidth: 1672,
    visualHeight: 941,
  },
  {
    period: "2025.09 ~ 2026.04",
    title: "KDT - AI기반 웹 접근제어 보안 솔루션 구축",
    role: "Web Security Project",
    description:
      "웹 보안 기술과 서비스 개발을 배우며 개발자로서의 역량을 키웠습니다.",
    kind: "security",
    visualSrc: "/images/보안솔루션구축.png",
    visualAlt: "보안 솔루션 구축 비주얼",
    visualWidth: 1672,
    visualHeight: 941,
  },
  {
    period: "2026.04 ~ 2026.06",
    title: "지란지교데이터",
    role: "IT 보안 소프트웨어 QA 인턴",
    description:
      "보안 솔루션의 품질을 검증하며 문제를 발견하고 더 나은 서비스를 만드는 과정에 함께했습니다.",
    kind: "qa",
    visualSrc: "/images/지란지교QA인턴.png",
    visualAlt: "QA 검증과 보안 소프트웨어 품질 비주얼",
    visualWidth: 1672,
    visualHeight: 941,
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

function VisualPanel({ item }: { item: JourneyItem }) {
  return (
    <div
      className={`journey-visual journey-visual--${item.kind}`}
      aria-hidden="true"
    >
      <Image
        src={item.visualSrc}
        alt={item.visualAlt}
        width={item.visualWidth}
        height={item.visualHeight}
        className="journeyVisualImage"
        sizes="(max-width: 720px) 100vw, (max-width: 980px) calc(100vw - 126px), 58vw"
      />
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
