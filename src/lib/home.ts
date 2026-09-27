export const homeHero = {
  identity: "TAMI.LOG",
  greeting: "HI, I'M",
  name: "JIHYUN",
} as const;

export const aboutIntroduction = [
  "사람, 업무, 데이터, 시스템을",
  "이해하는 과정이",
  "하나의 흐름으로 이어져",
  "서비스 개발이라는 방향이 되었습니다.",
];

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
      "Gogisise처럼 아이디어, 데이터 수집, API, 모바일 UI, 배포까지 이어지는 구현 사례를 정리했습니다.",
  },
  study: {
    eyebrow: "STUDY LOG",
    eyebrowDescription:
      "AI 활용, 바이브코딩, LLM/프롬프팅, 웹, 파이썬/Django를 프로젝트와 연결해 정리합니다.",
  },
} as const;

export const homeFocusItems = [
  "바이브코딩",
  "LLM/프롬프팅",
  "모바일 UI/UX",
  "데이터 파이프라인",
  "Vercel 배포",
] as const;
