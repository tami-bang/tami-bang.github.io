export type ProjectVisualHighlight = {
  title: string;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  description: string;
  status: string;
  period: string;
  role: string;
  featured?: boolean;
  featuredOrder?: number;
  featuredBadge?: string;
  repeatedProblem?: string;
  backendFlow?: string;
  structuredFlow?: string;
  automationPoint?: string;
  resultSummary?: string;
  problem: string;
  solution: string;
  architecture: string[];
  highlights: string[];
  techStack: string[];
  results: string[];
  retrospective: string[];
  visualHighlights?: ProjectVisualHighlight[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "health-ai-search-api",
    title: "Health AI Search API",
    subtitle: "Retrieval-first 의료 정보 검색 및 응급도 판단 API",
    domain: "Backend/API / Healthcare Search",
    description:
      "자연어 증상 입력을 의료 쿼리로 정규화하고, 내부 DB·공공 의료 API·벡터 검색을 결합해 응급도와 행동 가이드를 반환하는 FastAPI 기반 검색 시스템입니다.",
    status: "Service-level MVP",
    period: "2026",
    role: "FastAPI / Retrieval Pipeline / Response Design",
    problem:
      "기존 의료 검색은 정보는 제공하지만 사용자가 무엇을 해야 하는지까지 연결하지 못했습니다. 자연어 증상과 의료 용어의 차이, 낮은 검색 정확도, 외부 API 지연도 함께 해결해야 했습니다.",
    solution:
      "LLM 생성보다 검색 신뢰성을 우선하는 Retrieval-first 구조를 잡고, 증상 정규화, Hybrid Retrieval, Reranking, Triage, UI 친화 응답 생성을 하나의 API 흐름으로 연결했습니다.",
    architecture: [
      "사용자 증상 입력",
      "입력 검증 및 언어 감지",
      "Rule + ML + Semantic 기반 증상 정규화",
      "내부 DB + MedlinePlus API + 벡터 검색 결합",
      "Semantic 0.7 / Keyword 0.3 기반 Hybrid Reranking",
      "Red / Yellow / Green 응급도 판단",
      "행동 가이드를 포함한 UI 친화 응답 반환",
    ],
    highlights: [
      "Retrieval-first 구조로 생성보다 신뢰 가능한 검색 결과 제공을 우선",
      "자연어 증상을 rule, ML, semantic fallback 순서로 정규화",
      "내부 데이터와 외부 공공 의료 API를 병합하고 중복 제거",
      "응급도 판단 결과를 행동 가이드와 함께 응답 구조에 포함",
      "캐싱, 병렬 요청, circuit breaker로 외부 API 지연과 변동성 완화",
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
      "검색, 재정렬, 응급도 판단, 행동 가이드를 하나의 서비스 응답으로 통합",
      "로컬 환경 기준 triage 약 200ms, summary 약 143ms, normalize 약 800ms 수준으로 흐름 검증",
      "인코딩 불일치, 검색 품질 불균형, 외부 API 지연 같은 실제 이슈와 개선 방향을 정리",
    ],
    retrospective: [
      "의료 검색에서는 생성형 응답보다 신뢰 가능한 검색과 우선순위 정렬이 먼저라는 기준을 세웠습니다.",
      "AI는 정체성이 아니라 검색, 재정렬, 판단 흐름을 보조하는 도구로 사용할 때 서비스 가치가 커진다는 점을 확인했습니다.",
    ],
    visualHighlights: [
      {
        title: "Retrieval-first Architecture",
        imageSrc: "/images/case-studies/health-ai-search-api-02.webp",
        alt: "Health AI Search API architecture slide showing query normalization, hybrid retrieval, reranking, triage, and response flow",
        width: 2592,
        height: 1458,
      },
      {
        title: "Problem to Action",
        imageSrc: "/images/case-studies/health-ai-search-api-03.webp",
        alt: "Health AI Search API slide explaining how search results become actionable medical guidance",
        width: 2592,
        height: 1458,
      },
      {
        title: "Service Orchestration",
        imageSrc: "/images/case-studies/health-ai-search-api-06.webp",
        alt: "Health AI Search API core implementation slide showing validation, language detection, normalization, retrieval, reranking, triage, and response generation",
        width: 2592,
        height: 1458,
      },
      {
        title: "Performance Notes",
        imageSrc: "/images/case-studies/health-ai-search-api-11.webp",
        alt: "Health AI Search API performance slide showing endpoint response time and optimization notes",
        width: 2592,
        height: 1458,
      },
      {
        title: "Issues and Improvements",
        imageSrc: "/images/case-studies/health-ai-search-api-12.webp",
        alt: "Health AI Search API slide summarizing encoding, search relevance, API latency, and multilingual quality issues with improvements",
        width: 2592,
        height: 1458,
      },
      {
        title: "System Design Thinking",
        imageSrc: "/images/case-studies/health-ai-search-api-13.webp",
        alt: "Health AI Search API final slide summarizing retrieval-first architecture, performance-aware design, and real problem solving",
        width: 2592,
        height: 1458,
      },
    ],
    githubUrl: "https://github.com/tami-bang/health-ai-search-api",
  },
  {
    slug: "gateguard",
    title: "GateGuard",
    subtitle: "AI 기반 웹 접근 제어 보안 솔루션",
    domain: "Security / Network",
    description:
      "패킷 캡처, 요청 파싱, 정책 기반 판단, AI 보조 스코어링, 차단 응답, 로그 저장, 관리자 화면을 연결한 웹 접근 제어 보안 프로젝트입니다.",
    status: "Capstone MVP",
    period: "2026",
    role: "Packet Engine / Backend / Admin Flow / AI Integration",
    featured: true,
    featuredOrder: 2,
    featuredBadge: "Backend Flow",
    repeatedProblem: "유해 접근 탐지 후 판단과 기록이 운영 흐름으로 이어지지 않는 문제",
    backendFlow: "패킷 분석 → 정책 조회 → AI 보조 판단 → 로그 저장 → 관리자 확인",
    automationPoint: "정책 기반 판단과 보조 판단을 연결해 탐지 이후 운영 흐름을 자동화",
    resultSummary: "탐지, 차단, 기록, 관리자 화면 분석까지 이어지는 서비스 구조 설계",
    problem:
      "유해 사이트가 계속 생성되는 환경에서는 URL 목록만으로 대응하기 어렵고, HTTP 구조 기반 필터링도 한계가 있었습니다. 따라서 URL 자체보다 실제 요청 단위에서 판단하고 운영자가 이후 로그를 확인할 수 있어야 했습니다.",
    solution:
      "libpcap 기반 실시간 HTTP 분석, Policy 우선 판단, AI fallback, 403/TCP RST 기반 차단, DB 로그 저장, 관리자 화면 확인을 하나의 운영 흐름으로 설계했습니다.",
    architecture: [
      "Client 요청 수신",
      "Packet Capture",
      "HTTP Request Parsing",
      "Policy Engine 우선 판단",
      "정책 미일치 시 AI Scoring fallback",
      "PASS / BLOCK Decision",
      "403 응답 또는 TCP RST Injection",
      "Log 저장 및 Database 적재",
      "Admin UI / Dashboard에서 운영 확인",
    ],
    highlights: [
      "URL 단위가 아니라 요청 단위 판단을 위한 패킷 캡처와 HTTP 파싱 흐름 설계",
      "Policy + AI 이중 판단 구조로 정책 우선 적용 후 AI fallback 수행",
      "libpcap 기반 실시간 분석과 injection 기반 차단 흐름 구현",
      "판단 결과를 로그, DB, 관리자 화면까지 연결해 운영자가 확인 가능한 구조 구성",
      "Injection 타이밍, 응답 충돌, FIN/RST 방식, 전송 간격을 조정하며 차단 안정성 개선",
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
      "패킷 탐지부터 정책/AI 판단, 차단, DB 저장, 관리자 화면 분석까지 E2E 흐름 구현",
      "탐지 결과가 단발성 차단으로 끝나지 않고 운영 로그와 정책 개선으로 이어지는 구조 확보",
      "C 기반 네트워크 처리, FastAPI 보조 판단, Django Admin UI를 하나의 서비스 흐름으로 연결",
    ],
    retrospective: [
      "보안 프로젝트는 탐지 자체보다 판단, 차단, 기록, 관리자 확인까지 이어지는 운영 흐름이 중요하다는 점을 배웠습니다.",
      "실시간 네트워크 시스템에서는 기능 구현만큼 injection 타이밍, 응답 충돌 제어, 예외 상황 기록이 중요했습니다.",
    ],
    visualHighlights: [
      {
        title: "Request-level Architecture",
        imageSrc: "/images/case-studies/gateguard-02.webp",
        alt: "GateGuard architecture slide showing packet capture, request parsing, policy engine, AI scoring, pass or block decision, log, database, and admin dashboard",
        width: 1070,
        height: 616,
      },
      {
        title: "Filtering Problem",
        imageSrc: "/images/case-studies/gateguard-03.webp",
        alt: "GateGuard problem slide explaining why traditional filtering fails and why decisions should happen at request level",
        width: 1070,
        height: 616,
      },
      {
        title: "Solution Structure",
        imageSrc: "/images/case-studies/gateguard-06.webp",
        alt: "GateGuard solution infographic showing policy and AI dual decision structure, HTTP analysis, and injection-based blocking",
        width: 1070,
        height: 616,
      },
      {
        title: "Troubleshooting",
        imageSrc: "/images/case-studies/gateguard-11.webp",
        alt: "GateGuard troubleshooting slide showing injection timing, response collision control, connection termination changes, and inject structure improvements",
        width: 1070,
        height: 616,
      },
    ],
    githubUrl: "https://github.com/tami-bang",
  },
  {
    slug: "jobkorea-job-radar",
    title: "JobRadar",
    subtitle: "잡코리아 공고 수집부터 개인 맞춤 매칭 리포트까지 자동화한 채용 데이터 파이프라인",
    domain: "Data Automation / Job Search",
    description:
      "잡코리아 채용공고를 수집하고 상세 페이지를 보강한 뒤, 개인 선호 조건 기반 점수화와 CSV/XLSX 리포트 생성을 연결한 Python 크롤링 프로젝트입니다.",
    status: "Personal Automation MVP",
    period: "2026",
    role: "Crawler / Parser / Data Pipeline / Report Automation",
    featured: true,
    featuredOrder: 1,
    featuredBadge: "Automation Core",
    repeatedProblem: "채용 공고를 매번 직접 확인하고 비교하는 반복 작업",
    backendFlow: "크롤링 → 상세 파싱 → SQLite 저장 → 매칭 점수 계산 → 리포트 생성",
    automationPoint: "조건에 맞는 공고를 자동으로 선별하고 CSV/XLSX로 보기 쉽게 정리",
    resultSummary: "반복 탐색 시간을 줄이고 사용자가 비교하기 쉬운 채용 데이터 리포트 흐름을 확보",
    problem:
      "채용 사이트에서 관심 직무, 지역, 경력 조건을 매번 수동으로 확인하면 시간이 많이 들고 좋은 공고를 놓치기 쉽습니다. 특히 목록 페이지 정보만으로는 마감일, 기술 스택, 주요 업무를 충분히 비교하기 어렵습니다.",
    solution:
      "목록 수집, 상세 페이지 보강, SQLite 저장, 중복 제거, 지역/마감일 필터링, 개인 기준 매칭 점수 계산, Excel 친화 리포트 생성을 하나의 반복 가능한 파이프라인으로 구성했습니다.",
    architecture: [
      "검색 키워드와 사이트 설정 로드",
      "잡코리아 목록 페이지 수집",
      "공고 기본 정보 파싱 및 정규화",
      "상세 페이지에서 기술 스택과 업무 내용 보강",
      "SQLite 기반 저장 및 중복 업데이트",
      "개인 선호 조건 기반 매칭 점수 계산",
      "CSV/XLSX 리포트 생성",
      "수집 품질과 누락 필드 헬스 체크",
    ],
    highlights: [
      "목록 크롤링과 상세 크롤링을 분리해 실패 지점을 추적하기 쉽게 설계",
      "마감일, 지역, 경력, 학력, 고용형태를 정규화해 비교 가능한 데이터로 변환",
      "점수, 매칭 키워드, 부족한 조건, 긍정/부정 사유를 함께 남기는 설명 가능한 매칭 로직 구현",
      "Excel에서 바로 열기 좋은 UTF-8 BOM CSV와 클릭 가능한 링크가 포함된 XLSX 리포트 생성",
    ],
    techStack: [
      "Python",
      "Requests",
      "BeautifulSoup",
      "Selenium",
      "SQLite",
      "Pandas",
      "XLSX XML",
    ],
    results: [
      "서울, 경기, 인천 중심의 유효 공고를 개인 조건에 맞춰 빠르게 선별할 수 있는 리포트 생성",
      "수집된 공고를 누적 저장해 오늘 새로 수집된 공고뿐 아니라 아직 마감되지 않은 기존 공고도 후보로 유지",
      "누락된 마감일과 상세 수집 실패 상태를 헬스 체크로 확인할 수 있어 데이터 신뢰도를 판단 가능",
    ],
    retrospective: [
      "크롤링 프로젝트는 수집 자체보다 데이터 품질 관리와 재실행 가능한 구조가 더 중요하다는 점을 확인했습니다.",
      "개인 자동화 도구도 결과만 보여주는 것보다 왜 추천됐는지 설명할 수 있어야 실제 의사결정에 도움이 됩니다.",
    ],
    githubUrl: "https://github.com/tami-bang/job_crawler",
  },
  {
    slug: "pcfilter-qa-case-study",
    title: "PCFILTER QA Case Study",
    subtitle: "QA 인턴 경험에서 발견한 반복 이슈를 분석하고 기록 체계로 정리한 개선 사례",
    domain: "QA / Automation",
    description:
      "PCFILTER QA 인턴 과정에서 반복되는 검증 흐름과 이슈 재현 과정을 분석하고, 문제 기록과 자동화 관점으로 개선 포인트를 정리한 QA 기반 개발 사례입니다.",
    status: "QA Case Study",
    period: "2026",
    role: "QA Analysis / Issue Documentation / Automation Planning",
    featured: true,
    featuredOrder: 3,
    featuredBadge: "Problem Discovery",
    repeatedProblem: "반복 검증과 이슈 재현 조건이 흩어져 추적이 어려운 문제",
    structuredFlow: "재현 조건 → 실제 결과 → 영향 범위 → 자동화 후보",
    automationPoint: "반복 검증 항목을 자동화 가능한 후보로 분리",
    resultSummary: "QA 경험을 개발 개선과 자동화 사고로 연결",
    problem:
      "QA 과정에서 발견한 문제는 단순히 버그를 찾는 데서 끝나지 않고, 어떤 조건에서 반복되는지와 어떤 흐름을 개선해야 하는지를 함께 남겨야 했습니다.",
    solution:
      "재현 조건, 기대 결과, 실제 결과, 영향 범위, 자동화 가능성을 분리해 기록하고, QA 관찰을 백엔드/API와 자동화 개선 과제로 연결하는 방식으로 정리했습니다.",
    architecture: [
      "QA 시나리오 실행",
      "반복 이슈와 예외 흐름 관찰",
      "재현 조건과 실제 결과 기록",
      "영향 범위와 우선순위 분류",
      "자동화 가능한 검증 항목 도출",
      "개발 개선 과제와 문서로 연결",
    ],
    highlights: [
      "QA 인턴 경험을 단순 테스트 수행이 아닌 문제 분석 역량으로 정리",
      "이슈 재현 조건과 영향 범위를 분리해 개발자가 이해하기 쉬운 기록 구조 구성",
      "반복 검증 항목을 자동화 후보로 분류",
      "AI 활용과 백엔드/API 학습 방향을 QA 문제 해결 경험과 연결",
    ],
    techStack: [
      "QA",
      "Issue Tracking",
      "Test Case",
      "Documentation",
      "Automation Planning",
      "AI-assisted Analysis",
    ],
    results: [
      "QA에서 발견한 문제를 개발 관점의 개선 과제로 설명할 수 있는 사례 확보",
      "문제 분석, 기록, 자동화 후보 도출까지 이어지는 개인 작업 흐름 정리",
      "성장형 개발자로서 실무 관찰을 백엔드/API와 자동화 학습으로 연결",
    ],
    retrospective: [
      "QA 경험은 오류를 찾는 역할을 넘어 사용 흐름과 시스템 약점을 발견하는 훈련이었습니다.",
      "좋은 개발자는 문제를 빨리 고치는 것뿐 아니라 재현 가능하게 기록하고 반복을 줄이는 구조를 만든다는 점을 배웠습니다.",
    ],
    githubUrl: "https://github.com/tami-bang",
  },
];

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
