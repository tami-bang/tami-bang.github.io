"use client";

import { useEffect, useRef, useState } from "react";

type JourneyKind =
  | "plane"
  | "ship"
  | "film"
  | "coffee"
  | "cloud"
  | "code"
  | "shield";

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
    kind: "plane",
  },
  {
    period: "2017.11 ~ 2022.05",
    title: "범주해운",
    role: "수출입 정산, 일본 & 동남아 수출",
    description:
      "수출입 업무를 통해 문서, 데이터, 프로세스의 중요성을 깨닫고 효율적인 업무 흐름을 고민했습니다.",
    kind: "ship",
  },
  {
    period: "2022.08 ~ 2022.11",
    title: "광고콘텐츠제작 훈련 수료",
    role: "어도비 포토샵, 프리미어, 애프터이펙트, 일러스트레이터 수료",
    description:
      "어떻게 효과적으로 전달할지 고민하며 콘텐츠 제작과 시각적 표현을 배웠습니다.",
    kind: "film",
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
    kind: "code",
  },
  {
    period: "2026.04 ~ 2026.06",
    title: "지란지교데이터",
    role: "IT 보안 소프트웨어 QA 인턴",
    description:
      "보안 솔루션의 품질을 검증하며 문제를 발견하고 더 나은 서비스를 만드는 과정에 함께했습니다.",
    kind: "shield",
  },
];

const coreSteps = [
  { label: "문제 발견", kind: "search" },
  { label: "흐름 구조화", kind: "flow" },
  { label: "자동화", kind: "gear" },
  { label: "서비스 구현", kind: "screen" },
  { label: "사용자 가치", kind: "heart" },
] as const;

function NeonIcon({
  kind,
}: {
  kind: JourneyKind | (typeof coreSteps)[number]["kind"];
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {kind === "plane" && (
        <path d="M55 10 27 38 11 33l8-8L5 16l10-6 27 8 8-8c6-6 10-5 5 0ZM27 38l-4 17 10-13" />
      )}
      {kind === "ship" && (
        <path d="M12 37h40l-8 14H20l-8-14ZM20 37V18h25v19M27 18V10h10v8M9 53c6 3 11 3 17 0s11-3 17 0 11 3 17 0" />
      )}
      {kind === "film" && (
        <path d="M14 14h36v36H14zM23 14v36M41 14v36M14 25h36M14 39h36" />
      )}
      {kind === "coffee" && (
        <path d="M23 10c-5 6 5 8 0 15M32 8c-5 7 5 8 0 17M41 10c-5 6 5 8 0 15M17 31h31v8c0 10-7 17-16 17s-15-7-15-17v-8ZM48 34h4a6 6 0 0 1 0 12h-4M14 58h38" />
      )}
      {kind === "cloud" && (
        <path d="M20 47h29a11 11 0 0 0 0-22 17 17 0 0 0-33-3A13 13 0 0 0 20 47Z" />
      )}
      {kind === "code" && (
        <path d="m22 22-12 10 12 10M42 22l12 10-12 10M36 16 28 48" />
      )}
      {kind === "shield" && (
        <path d="M32 7 51 15v16c0 14-8 23-19 28-11-5-19-14-19-28V15l19-8ZM23 32l6 6 13-16" />
      )}
      {kind === "search" && (
        <path d="M28 44a16 16 0 1 1 0-32 16 16 0 0 1 0 32ZM40 40l13 13" />
      )}
      {kind === "flow" && (
        <path d="M30 10h18v14H30zM10 40h18v14H10zM38 40h18v14H38zM39 24v8H19v8M39 32h8v8" />
      )}
      {kind === "gear" && (
        <path d="M32 22a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6" />
      )}
      {kind === "screen" && <path d="M10 14h44v30H10zM25 54h14M32 44v10" />}
      {kind === "heart" && (
        <path d="M32 54S11 41 11 24c0-8 5-14 13-14 5 0 8 3 8 3s3-3 8-3c8 0 13 6 13 14 0 17-21 30-21 30Z" />
      )}
    </svg>
  );
}

function Visual({ kind }: { kind: JourneyKind }) {
  return (
    <div
      className={`reference-visual reference-visual--${kind}`}
      aria-hidden="true"
    >
      <span className="reference-visual__glow" />
      <span className="reference-visual__ground" />

      {kind === "plane" && (
        <>
          <div className="visual-skyline">
            <span className="visual-skyline__mbs" />
            <span className="visual-skyline__merlion" />
            <span className="visual-skyline__wheel" />
            <span className="visual-skyline__city" />
          </div>
        </>
      )}

      {kind === "ship" && (
        <>
          <svg className="visual-map" viewBox="0 0 520 250">
            <path d="M25 88c80-54 134-18 216-24 78-6 98-55 246-14" />
            <path d="M42 158c76-18 108 32 180 18 70-14 96 18 236 16" />
            <path
              className="visual-map__route"
              d="M48 148C142 80 262 195 370 104c42-35 75-28 112-2"
            />
          </svg>
          <div className="visual-ship">
            <span />
          </div>
        </>
      )}

      {kind === "film" && (
        <div className="visual-adobe">
          {["Ps", "Pr", "Ae", "Ai"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}

      {kind === "coffee" && (
        <div className="visual-coffee-photo">
          <span className="visual-coffee-photo__cup" />
          <span className="visual-coffee-photo__machine" />
          <span className="visual-coffee-photo__handle" />
        </div>
      )}

      {kind === "cloud" && (
        <div className="visual-cloud">
          <span className="visual-cloud__cloud" />
          <span className="visual-cloud__server" />
          <span className="visual-cloud__grid" />
        </div>
      )}

      {kind === "code" && (
        <div className="visual-security">
          <span className="visual-security__screen visual-security__screen--one" />
          <span className="visual-security__screen visual-security__screen--two" />
          <span className="visual-security__shield" />
        </div>
      )}

      {kind === "shield" && (
        <div className="visual-qa">
          <span className="visual-qa__monitor" />
          <span className="visual-qa__lens" />
          <span className="visual-qa__check" />
        </div>
      )}
    </div>
  );
}

export default function JourneyTimeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(
    () => new Set([0]),
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.22 },
    );

    itemRefs.current.forEach((item) => {
      if (item) {
        itemObserver.observe(item);
      }
    });

    return () => {
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section
      className="reference-journey"
      aria-label="경험이 흐르는 커리어 스토리"
    >
      <svg
        className="reference-journey__path"
        viewBox="0 0 180 1260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M92 0C154 72 26 130 90 205C158 285 22 340 90 420C158 500 24 555 92 636C158 716 24 774 92 854C158 936 22 990 90 1072C154 1152 28 1200 92 1260" />
      </svg>

      <div className="reference-journey__items">
        {journeyItems.map((item, index) => (
          <div
            className="reference-journey__item"
            data-visible={visibleItems.has(index)}
            data-index={index}
            key={`${item.period}-${item.title}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
          >
            <div className="reference-journey__icon">
              <NeonIcon kind={item.kind} />
            </div>

            <article className="reference-journey__text">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <strong>{item.role}</strong>
              <p>{item.description}</p>
            </article>

            <Visual kind={item.kind} />
          </div>
        ))}
      </div>

      <section className="reference-core" aria-label="My Core">
        <p>My Core</p>
        <div className="reference-core__track">
          {coreSteps.map((step, index) => (
            <div className="reference-core__item" key={step.label}>
              <NeonIcon kind={step.kind} />
              <span>{step.label}</span>
              {index < coreSteps.length - 1 && <b aria-hidden="true">»</b>}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
