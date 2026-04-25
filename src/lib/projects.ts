export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  description: string;
  status: string;
  period: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string[];
  highlights: string[];
  techStack: string[];
  results: string[];
  retrospective: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "health-ai-search-api",
    title: "Health AI Search API",
    subtitle: "증상 기반 의료 정보 검색 및 응급도 판단 API",
    domain: "Healthcare AI",
    description:
      "사용자의 증상 입력을 기반으로 의료 정보를 검색하고, 응급도 판단과 AI 재랭킹을 결합한 FastAPI 기반 검색 시스템입니다.",
    status: "Service-level MVP",
    period: "2026",
    role: "Backend / AI Pipeline / API Design",
    problem:
      "단순 키워드 검색만으로는 사용자의 증상 의도를 정확히 반영하기 어렵고, 의료 정보 검색 결과의 우선순위와 응급도 안내가 분리되는 문제가 있었습니다.",
    solution:
      "증상 정규화, 내부 문서 검색, 외부 의료 정보 검색, AI 재랭킹, 응급도 판단을 하나의 API 흐름으로 연결했습니다.",
    architecture: [
      "사용자 증상 입력",
      "언어 감지 및 입력 검증",
      "증상 정규화",
      "내부 문서 및 외부 의료 정보 검색",
      "AI 기반 재랭킹",
      "응급도 판단",
      "사용자 친화적 응답 포맷 반환",
    ],
    highlights: [
      "FastAPI 기반 검색 API 설계",
      "증상 정규화와 검색 결과 재랭킹 구조 분리",
      "응급도 판단 결과를 response guidance로 분리",
      "LLM 요약 기능을 선택적으로 사용할 수 있도록 설계",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "Hugging Face",
      "Sentence Transformers",
      "MedlinePlus API",
    ],
    results: [
      "검색, 응급도 판단, 결과 포맷을 하나의 서비스 흐름으로 통합",
      "의료 정보 검색 결과를 단순 나열이 아닌 우선순위 기반으로 제공",
      "실제 포트폴리오와 면접 설명이 가능한 AI 서비스 구조 확보",
    ],
    retrospective: [
      "AI 기능은 단독으로 보이기보다 검색 흐름 안에서 자연스럽게 연결될 때 서비스 가치가 커진다는 점을 확인했습니다.",
      "요약 생성보다 빠르고 정확한 검색 결과 제공이 먼저라는 기준을 세웠습니다.",
    ],
    githubUrl: "https://github.com/tami-bang/health-ai-search-api",
  },
  {
    slug: "gateguard",
    title: "GateGuard",
    subtitle: "AI 기반 웹 접근 제어 보안 솔루션",
    domain: "Security / Network",
    description:
      "패킷 캡처, URL 분석, 정책 기반 차단, AI 스코어링을 결합한 웹 접근 제어 보안 프로젝트입니다.",
    status: "Capstone MVP",
    period: "2026",
    role: "Packet Engine / Backend / Admin Flow / AI Integration",
    problem:
      "유해 웹 접근을 탐지하더라도 운영자가 빠르게 원인을 파악하고 정책으로 연결하지 못하면 보안 대응 흐름이 끊기는 문제가 있었습니다.",
    solution:
      "C 기반 패킷 탐지 엔진, FastAPI AI 스코어링, Django Admin UI, DB 로그 저장 구조를 연결해 탐지부터 차단, 기록, 운영까지 이어지는 흐름을 설계했습니다.",
    architecture: [
      "네트워크 패킷 캡처",
      "HTTP Host/Path 파싱",
      "정책 DB 조회",
      "정책 미일치 시 AI 스코어링 요청",
      "PASS/BLOCK 판단",
      "차단 응답 주입",
      "로그 및 이벤트 저장",
      "관리자 화면에서 분석",
    ],
    highlights: [
      "libpcap 기반 패킷 캡처 및 HTTP 요청 파싱",
      "정책 기반 판단과 AI 기반 판단을 분리",
      "관리자 트래픽 노이즈 필터링",
      "운영자가 로그에서 정책으로 이어갈 수 있는 Admin UI 구성",
    ],
    techStack: [
      "C",
      "libpcap",
      "pthread",
      "Python",
      "FastAPI",
      "Django",
      "MariaDB",
      "scikit-learn",
    ],
    results: [
      "패킷 탐지부터 차단, DB 저장, 관리자 분석까지 E2E 흐름 구현",
      "정책 기반 판단과 AI 판단을 함께 사용하는 보안 제품 구조 경험",
      "네트워크, 백엔드, AI, 운영 UI를 연결한 포트폴리오 완성",
    ],
    retrospective: [
      "보안 프로젝트는 탐지 자체보다 운영자가 해석하고 대응할 수 있는 흐름이 중요하다는 점을 배웠습니다.",
      "실시간 시스템에서는 기능보다 로그 품질, 예외 처리, 노이즈 제거가 중요했습니다.",
    ],
    githubUrl: "https://github.com/tami-bang",
  },
];

export function getFeaturedProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}