export const siteConfig = {
  name: "Tami",
  title: "Tami.log",
  description: "데이터, API, 화면 흐름을 연결하는 개발자 포트폴리오",
  links: {
    github: "https://github.com/tami-bang",
    email: "vjihyun.bangv@gmail.com",
  },
  navItems: [
    { label: "로드맵", href: "/roadmap" },
    { label: "공부 기록", href: "/blog" },
    { label: "프로젝트", href: "/projects" },
    { label: "소개", href: "/about" },
  ],
};

export const studyCategoryItems = [
  { label: "백엔드/API", slug: "backend-api" },
  { label: "파이썬/Django", slug: "python" },
  { label: "리눅스", slug: "linux" },
  { label: "네트워크", slug: "network" },
  { label: "C언어", slug: "c" },
  { label: "HTML/CSS/JS", slug: "html-css" },
  { label: "자동화", slug: "automation" },
  { label: "데이터 파이프라인", slug: "data-pipeline" },
  { label: "QA", slug: "qa-insight" },
  { label: "AI 활용", slug: "ai-as-tool" },
];

export const studyCategories = studyCategoryItems.map(
  (category) => category.label,
);

export function getCategorySlug(categoryLabel: string) {
  const category = studyCategoryItems.find(
    (item) => item.label === categoryLabel,
  );

  return category?.slug ?? categoryLabel.toLowerCase();
}

export function getCategoryLabel(categorySlug: string) {
  const category = studyCategoryItems.find(
    (item) => item.slug === categorySlug,
  );

  return category?.label ?? "";
}

export function isValidCategorySlug(categorySlug: string) {
  return studyCategoryItems.some((item) => item.slug === categorySlug);
}

export const featuredPosts = [
  {
    title: "API는 프론트와 백엔드를 어떻게 연결할까?",
    description:
      "HTTP 요청, REST API, FastAPI, Swagger의 역할을 백엔드 흐름 기준으로 정리합니다.",
    category: "백엔드/API",
    href: "/blog",
  },
  {
    title: "네트워크 7계층과 실제 데이터 흐름",
    description:
      "브라우저 요청이 서버와 DB까지 이동하는 과정을 OSI 7계층과 연결해 이해합니다.",
    category: "네트워크",
    href: "/blog",
  },
];

export const featuredProjects = [
  {
    title: "JobRadar",
    description:
      "채용 공고 확인을 수집, 저장, 점수화, 리포트 생성 흐름으로 자동화",
    href: "/projects",
  },
  {
    title: "GateGuard",
    description:
      "패킷 탐지, URL 분석, 정책 기반 차단을 수행하는 AI 웹 접근 제어 솔루션",
    href: "/projects",
  },
];
