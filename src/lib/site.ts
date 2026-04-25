export const siteConfig = {
  name: "Tami",
  title: "Tami's Dev Blog",
  description: "기록 → 성장 → 프로젝트",
  links: {
    github: "https://github.com/tami-bang",
    email: "vjihyun.bangv@gmail.com",
  },
  navItems: [
    { label: "공부기록", href: "/blog" },
    { label: "프로젝트", href: "/projects" },
    { label: "소개", href: "/about" },
  ],
};

export const studyCategoryItems = [
  { label: "Python", slug: "python" },
  { label: "C", slug: "c" },
  { label: "Network", slug: "network" },
  { label: "Backend/API", slug: "backend-api" },
  { label: "Frontend", slug: "frontend" },
  { label: "AI", slug: "ai" },
];

export const studyCategories = studyCategoryItems.map((category) => category.label);

export function getCategorySlug(categoryLabel: string) {
  const category = studyCategoryItems.find((item) => item.label === categoryLabel);

  return category?.slug ?? categoryLabel.toLowerCase();
}

export function getCategoryLabel(categorySlug: string) {
  const category = studyCategoryItems.find((item) => item.slug === categorySlug);

  return category?.label ?? "";
}

export function isValidCategorySlug(categorySlug: string) {
  return studyCategoryItems.some((item) => item.slug === categorySlug);
}

export const featuredPosts = [
  {
    title: "API는 프론트와 백엔드를 어떻게 연결할까?",
    description:
      "HTTP 요청, REST API, FastAPI, Swagger의 역할을 서비스 흐름 기준으로 정리합니다.",
    category: "Backend/API",
    href: "/blog",
  },
  {
    title: "네트워크 7계층과 실제 데이터 흐름",
    description:
      "브라우저 요청이 서버와 DB까지 이동하는 과정을 OSI 7계층과 연결해 이해합니다.",
    category: "Network",
    href: "/blog",
  },
];

export const featuredProjects = [
  {
    title: "Health AI Search API",
    description: "증상 검색, 응급도 판단, 의료 정보 검색을 연결한 AI 검색 API",
    href: "/projects",
  },
  {
    title: "GateGuard",
    description: "패킷 탐지, URL 분석, 정책 기반 차단을 수행하는 AI 웹 접근 제어 솔루션",
    href: "/projects",
  },
];

