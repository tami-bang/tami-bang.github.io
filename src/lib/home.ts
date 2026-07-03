export const homeHero = {
  eyebrow: "미감 있는 자동화 개발자",
  titleLines: ["감각 있게 만들고,", "반복은 자동화합니다."],
  descriptionLines: [],
  actions: [
    { href: "/projects", label: "프로젝트 보기", variant: "primary" },
    { href: "/blog", label: "기록 보기", variant: "secondary" },
  ],
  signals: [
    { label: "Sense", value: "미감 있는 구현" },
    { label: "Auto", value: "반복 자동화" },
    { label: "Vibe", value: "바이브코딩" },
  ],
} as const;

export const workingPatternSteps = [
  {
    title: "문제 포착",
    description: "수동 처리와 흩어진 기록에서 개선할 지점을 찾습니다.",
  },
  {
    title: "흐름 정리",
    description: "입력, 처리, 저장, 결과를 나누어 구조를 잡습니다.",
  },
  {
    title: "도구 구현",
    description: "크롤링, API, DB, 리포트로 실제 동작을 만듭니다.",
  },
  {
    title: "결과 확인",
    description: "결과를 다시 확인할 수 있게 로그와 문서로 남깁니다.",
  },
] as const;

export const homeSections = {
  workflow: {
    eyebrow: "WORKFLOW",
    eyebrowDescription:
      "작은 개선이라도 입력, 처리, 저장, 화면에 보이는 결과까지 이어지는 구조로 생각합니다.",
  },
  projects: {
    eyebrow: "PROJECTS",
    eyebrowDescription:
      "데이터 수집, API, 관리자 화면, 리포트로 이어지는 구현 사례를 정리했습니다.",
  },
  study: {
    eyebrow: "STUDY LOG",
    eyebrowDescription:
      "리눅스, 네트워크, C언어, 웹, 파이썬/Django를 프로젝트와 연결해 정리합니다.",
  },
} as const;

export const homeFocusItems = [
  "UI와 API 흐름",
  "데이터 자동화",
  "크롤링 파이프라인",
  "결과 화면 설계",
  "AI 도구 활용",
] as const;
