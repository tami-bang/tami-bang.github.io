export type ProjectVisualHighlight = {
  title: string;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
};

export type InternshipStory = {
  headline: string;
  summary: string;
  goals: string[];
  journey: {
    phase: string;
    title: string;
    description: string;
  }[];
  contributions: string[];
  growth: string[];
};

export type ProjectWorkSample = {
  title: string;
  label: string;
  description: string;
  why: string;
  details: string[];
  link?: string;
};

export type ProjectRepository = {
  name: string;
  label: string;
  role: string;
  stack: string[];
  deployment: string;
  url: string;
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
  cardTags?: string[];
  repeatedProblem?: string;
  backendFlow?: string;
  structuredFlow?: string;
  automationPoint?: string;
  resultSummary?: string;
  problem: string;
  solution: string | string[];
  architecture: string[];
  highlights: string[];
  techStack: string[];
  results: string[];
  retrospective: string[];
  visualHighlights?: ProjectVisualHighlight[];
  internshipStory?: InternshipStory;
  workSamples?: ProjectWorkSample[];
  repositories?: ProjectRepository[];
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  livePreview?: "job-radar";
};

export const projects: Project[] = [
  {
    slug: "gogisise",
    title: "Gogisise",
    subtitle: "축산물 시세를 모니터링하는 모바일 전용 실시간 가격 정보 서비스",
    domain: "Mobile Web Service / Price Data Platform",
    description:
      "바이브코딩 개발자 과정을 통해 기획·구현된 서비스입니다. React/TypeScript 기반 모바일 UI, NestJS API, Prisma, Supabase PostgreSQL, Python 크롤러를 분리 설계하고 Vercel 및 클라우드 환경에 실제 배포를 완료했습니다.",
    status: "Live Service",
    period: "2026",
    role: "Frontend / Backend API / Crawler / Database Design",
    featured: true,
    featuredOrder: 3,
    featuredBadge: "Vibe Coding MVP",
    cardTags: ["MOBILE WEB SERVICE", "PRICE DATA PLATFORM", "VIBE CODING MVP"],
    repeatedProblem:
      "금천미트 상품 시세와 가격 추이를 모바일에서 빠르게 필터링하고 비교하기 어려운 문제",
    backendFlow:
      "Python 크롤러 → NestJS Crawler API → Prisma → Supabase → React 모바일 UI",
    automationPoint:
      "오늘 수집 상품을 BE로 적재하고 ACTIVE/INACTIVE 상태와 날짜별 가격 이력을 자동 동기화",
    resultSummary:
      "시세 조회, 필터, 즐겨찾기, 최근 7일 가격 추이까지 제공하는 모바일 서비스",
    problem:
      "도매 사이트의 축산물 상품은 카테고리, 등급, 재고, 판매 상태가 계속 바뀌기 때문에 사용자가 모바일에서 한우/한돈, 냉장/냉동, 부위 조건을 빠르게 선택하고 최신 가격과 최근 가격 추이를 함께 확인하기 어렵습니다.",
    solution:
      "경기도일자리재단 바이브코딩 개발자 과정에서 Gemini Pro 기반 기획과 구현 흐름을 활용해 모바일 전용 React/TypeScript 화면, NestJS API 서버, Prisma 기반 데이터 접근, Supabase PostgreSQL 저장소, Python 크롤러를 역할별로 분리했습니다. 크롤러는 도매 사이트에서 카테고리와 상품을 수집해 BE API로 전달하고, BE는 RawRecord, MarketItem, MarketItemPrice를 UPSERT한 뒤 KST 기준 ACTIVE 상품과 가격 이력을 FE에 제공합니다.",
    architecture: [
      "사용자가 FE에서 한우/한돈, 냉장/냉동, 부위, 등급 조건으로 시세를 조회",
      "React/TypeScript FE가 NestJS Market API로 현재 상품과 계산 데이터를 요청",
      "Python Crawler가 금천미트 도매 사이트의 카테고리 트리와 581개 말단 카테고리 상품을 수집",
      "Crawler가 category-tree, ingest, finalize API로 수집 결과를 BE에 전달",
      "NestJS BE가 Prisma를 통해 Supabase에 RawRecord, MarketItem, MarketItemPrice를 UPSERT",
      "전체 수집 완료 후 BE가 판매 가능 상품은 ACTIVE, 품절·판매 종료 상품은 INACTIVE로 동기화",
      "Supabase가 ACTIVE 상품, 날짜별 가격 이력, 즐겨찾기와 사용자 데이터를 저장",
      "BE가 최근 7일 priceHistory와 평균가, 최저가, 최고가, 참여 상품 수를 계산해 FE에 응답",
      "FE는 Vercel에 배포되어 실제 라이브 데모로 접근 가능",
    ],
    highlights: [
      "바이브코딩 개발자 과정 최종 시연/배포 프로젝트로 기획부터 라이브 배포까지 완성",
      "FE, BE, Crawler, Supabase 데이터 모델을 독립 레포지토리로 분리해 책임과 배포 단위를 명확히 구성",
      "한우/한돈, 냉장/냉동, 부위/등급 필터와 가격 정렬, 즐겨찾기, 상세 모달을 모바일 UI로 구현",
      "크롤러가 Supabase에 직접 쓰지 않고 NestJS BE API를 거쳐 검증·가공·상태 동기화를 수행",
      "품절, 재고 0, 판매 종료, 비노출, 유효하지 않은 상품번호·가격·중량, 한우 등급/월령 조건 미일치 상품을 수집에서 제외",
      "KST 시장 기준일로 MarketItemPrice를 저장하고 가격이 없는 날짜는 보간하지 않고 없음으로 표시",
      "체크포인트 기반 수집으로 중간 장애 시 미완료 카테고리부터 재시작하고 전체 완료 후 finalize 수행",
      "Vercel 배포 완료 상태의 실제 서비스 URL을 포트폴리오에서 바로 연결",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Vercel",
      "NestJS",
      "Python",
      "Supabase",
      "Prisma",
      "PostgreSQL",
    ],
    results: [
      "경기도일자리재단 미래융합전문교육 바이브코딩 개발자 과정에서 60시간 동안 최종 시연 가능한 서비스로 구현",
      "모바일 전용 웹 UI부터 Market API, Crawler API, Supabase 저장소, Python 수집기까지 서비스 전체 흐름을 구현",
      "GET /api/v1/market/items, calculations, price-history, categories와 crawler ingest/finalize API 흐름을 연결",
      "RawRecord 기반으로 평균가, 최저가, 최고가, 참여 상품 수를 계산하고 최근 7일 가격 추이를 화면에 제공",
      "프론트엔드를 Vercel에 배포해 포트폴리오 방문자가 실제 서비스 화면을 바로 확인 가능",
      "데이터 수집, 저장, 조회, 화면 표시 흐름을 분리해 유지보수와 확장 기준을 확보",
    ],
    retrospective: [
      "Gemini Pro와 AI 개발 도구를 활용해 아이디어 도출, UI/UX 설계, 구현 우선순위 정리, 배포 검증을 빠르게 반복했습니다.",
      "실서비스 형태로 배포해 보며 화면 구현뿐 아니라 데이터 수집, API 계약, DB 변경 관리가 함께 맞물려야 한다는 점을 확인했습니다.",
      "작은 모바일 서비스라도 레포지토리별 책임을 분리하면 장애 지점과 개선 범위를 더 명확하게 판단할 수 있었습니다.",
    ],
    repositories: [
      {
        name: "gogisise_FE",
        label: "Frontend",
        role: "React 기반 모바일 Web UI 구현 및 Vercel 배포",
        stack: ["React", "Mobile Web", "Vercel"],
        deployment: "Vercel 배포 완료",
        url: "https://github.com/tami-bang/gogisise_FE",
      },
      {
        name: "gogisise_BE",
        label: "Backend",
        role: "NestJS 기반 Market API, Crawler API, 데이터 검증·가공·상태 동기화 구현",
        stack: ["NestJS", "Prisma", "REST API", "Vercel"],
        deployment: "Vercel 배포 및 Supabase 연동",
        url: "https://github.com/tami-bang/gogisise_BE",
      },
      {
        name: "gogisise_crawler",
        label: "Crawler",
        role: "Python 기반 금천미트 카테고리·상품·가격 수집 및 BE API 적재",
        stack: ["Python", "Crawler", "Checkpoint"],
        deployment: "카테고리별 체크포인트와 finalize 수집 흐름 구현",
        url: "https://github.com/tami-bang/gogisise_crawler",
      },
      {
        name: "gogisise_DB",
        label: "Database",
        role: "Supabase PostgreSQL 데이터 모델, 상품 상태, 가격 이력, 사용자 데이터 관리",
        stack: ["Supabase", "PostgreSQL", "Prisma"],
        deployment:
          "Category Tree, Raw Records, Market Items, Price History 스키마 관리",
        url: "https://github.com/tami-bang/gogisise_DB",
      },
    ],
    githubUrl: "https://github.com/tami-bang/gogisise_FE",
    githubLabel: "View Frontend Repo",
    liveUrl: "https://gogisise-fe.vercel.app/",
    liveLabel: "Live Demo (Vercel)",
  },
  {
    slug: "saengdam-website-maintenance",
    title: "생담 자사몰 콘텐츠·스킨 유지보수",
    subtitle:
      "첫 작업 완료 후 경기도일자리재단에서 같은 자사몰의 두 번째 수정 요청을 받아 PC·모바일 화면까지 개선한 Cafe24 유지보수 사례",
    domain: "Cafe24 Storefront / Visual Content Maintenance",
    description:
      "경기도일자리재단 보내드림 활동가로 참여해 생활용품 자사몰 ‘생활을 담다, 생담’의 첫 유지보수 작업을 완료한 뒤, 같은 자사몰의 두 번째 수정 요청을 받았습니다. 첫 작업에서는 Photoshop 이미지 제작과 Cafe24 스킨 정리를, 두 번째 작업에서는 카테고리 확장 구조와 PC·모바일 화면 오류 수정을 맡았습니다.",
    status: "Client Work · Completed",
    period: "2026 · 두 번째 의뢰",
    role: "Photoshop Asset Design / Cafe24 Skin Editing / Verification",
    featured: true,
    featuredOrder: 2,
    featuredBadge: "Real Client Work",
    cardTags: ["두 번째 의뢰", "CAFE24", "MAINTENANCE"],
    repeatedProblem:
      "첫 콘텐츠 정비 이후에도 카테고리가 늘어날 때 레이아웃이 깨지고 PC·모바일 화면에 오류가 남는 문제",
    structuredFlow:
      "1차 콘텐츠·스킨 정비 → 결과 검증·보고 → 동일 의뢰처의 2차 요청 → 반응형 카테고리·화면 오류 개선",
    automationPoint:
      "카테고리 수가 늘어나도 1·2·3줄로 확장되도록 구조를 정리하고 PC와 모바일에 동일한 기준 적용",
    resultSummary:
      "첫 작업 완료 후 경기도일자리재단에서 같은 자사몰의 두 번째 수정 요청을 받아 유지보수 경험을 연속 사례로 확장",
    problem:
      "첫 의뢰 당시 생담 자사몰에는 판매 품목과 맞지 않는 이미지, 잘못된 명칭·링크, 불필요한 스킨 영역이 남아 있었습니다. 작업 완료 후 받은 두 번째 의뢰에서는 카테고리가 추가되면 메인과 전체 카테고리 영역이 깨지는 문제, 버튼 서식 불일치와 고객센터 음영 오류를 PC와 모바일에서 함께 해결해야 했습니다.",
    solution: [
      "첫 번째 작업에서는 Photoshop으로 카테고리 이미지와 배너를 제작해 Cafe24에 업로드하고 이미지 경로·문구·링크를 교체했습니다. 제거 대상 HTML은 되돌릴 수 있도록 주석 처리했습니다.",
      "두 번째 작업에서는 카테고리 개수에 따라 1줄에서 2·3줄로 자연스럽게 확장되도록 메인과 전체 카테고리 구조를 함께 수정했습니다. 상담 버튼의 글자 크기·폰트와 고객센터 회색 음영 오류를 정리한 뒤 모바일에도 같은 기준을 적용했습니다.",
    ],
    architecture: [
      "23개 슬라이드의 요청 내용과 대상 화면 확인",
      "카테고리 이미지와 배너 소스를 Photoshop으로 제작·보정",
      "완성 이미지를 용도에 맞는 파일명으로 정리해 Cafe24에 재업로드",
      "Cafe24 스킨의 이미지 경로, 카테고리명, 상품명과 링크 수정",
      "불필요한 BEST·상품 상세·게시판 영역을 HTML 주석 처리",
      "기존 재검색·초기화, 고객센터 정렬과 게시판 화면 확인",
      "모바일 카테고리 이미지·명칭 교체 및 기존 동작 확인",
      "완료 21건과 기술 제약 1건의 사유·대안을 구분해 결과 보고",
    ],
    highlights: [
      "슬라이드 기반 요구사항을 작업 유형과 검증 기준으로 재구성",
      "맥주병, 비닐, 밀폐용기, 카트, 캐스터, 원예, 장갑, 김포금쌀, 기름정제, 취미 카테고리 이미지를 Photoshop으로 제작·보정",
      "김포금쌀 메인 배너와 김치통 배너 이미지를 수정하고 Cafe24에 재업로드",
      "업로드한 이미지의 파일명과 Cafe24 스킨 경로를 맞춰 PC·모바일 화면에 반영",
      "카테고리명, 오탈자, 상품명과 상세 문구 수정",
      "BEST, 추천메일, 상품조르기, SNS 홍보 등 불필요한 기존 HTML 블록을 주석 처리",
      "기존 결과 내 재검색에서 ‘1.8’ 적용 시 98개 중 14개가 노출되고 초기화 시 목록이 복원되는지 확인",
      "상품 상세 페이지의 단골회원가를 판매가 아래로 재배치",
      "비회원 대상 네이버페이 간편구매 영역의 노출 상태 확인",
      "상품문의 영역의 스킨 소스를 정리한 뒤 고객센터 전체 정렬이 정상화되는지 확인",
      "게시판에서 노출되던 불필요한 소스 영역을 정리하고 여러 게시판 화면에서 재확인",
      "이용안내와 카카오톡 버튼의 링크 경로 수정",
      "모바일 상품별 카테고리 이미지와 명칭 교체",
      "구현 불가능한 요청은 브라우저 제약을 확인하고 사용 가능한 대안까지 제시",
      "첫 작업 완료 후 경기도일자리재단에서 같은 자사몰의 두 번째 수정 요청을 받음",
      "카테고리 추가 시 메인과 전체 카테고리가 2·3줄로 확장되도록 레이아웃 개선",
      "상담 버튼 서식을 기존 고객센터 UI와 통일하고 회색 음영 오류 수정",
      "두 번째 요청의 모든 수정 사항을 모바일 화면에도 동일하게 반영·확인",
    ],
    techStack: [
      "Cafe24",
      "Adobe Photoshop",
      "HTML",
      "CSS",
      "Image Asset Management",
      "Responsive Verification",
    ],
    results: [
      "총 22개 요청 중 21개 콘텐츠·화면·기능·오류 수정 완료",
      "즐겨찾기 직접 등록 요청 1건은 현재 브라우저 정책상 불가능한 이유와 Ctrl+D 대안을 안내",
      "Photoshop으로 제작·보정한 카테고리와 배너 이미지를 Cafe24 PC·모바일 스킨에 반영",
      "주석 처리와 경로·문구 수정으로 기존 스킨을 보존하면서 요청 화면 정리",
      "재검색·초기화, 이용안내 링크, 카카오톡 상담과 게시판 화면의 정상 동작 확인",
      "첫 작업 완료 후 경기도일자리재단에서 같은 자사몰의 두 번째 수정 요청을 받음",
      "추가 카테고리에도 대응하는 PC·모바일 레이아웃과 고객센터 화면 오류 개선",
    ],
    retrospective: [
      "이번 작업의 핵심은 기능 개발보다 요청에 맞는 이미지를 빠르게 제작하고 Cafe24 스킨에 정확히 연결하는 일이었습니다.",
      "Photoshop 작업은 카테고리마다 크기와 배경, 상품 배치를 맞춰야 해서 가장 많은 시간이 들었고 결과 화면의 완성도에 직접 영향을 주었습니다.",
      "기존 스킨 코드는 바로 삭제하기보다 주석 처리해 문제가 생겼을 때 되돌릴 수 있도록 작업했습니다.",
      "이미지 파일명과 업로드 경로가 어긋나면 화면에 바로 반영되지 않기 때문에 에셋 이름과 소스 경로를 함께 관리하는 것이 중요했습니다.",
      "구현할 수 없는 요청도 단순히 불가하다고 답하기보다 기술적 근거와 현실적인 대안을 함께 전달해야 신뢰할 수 있는 결과 보고가 됩니다.",
      "첫 작업을 완료한 뒤 경기도일자리재단에서 같은 자사몰의 두 번째 수정 요청을 받으며, 정확한 반영과 검증·보고 과정이 다음 의뢰로 이어질 수 있다는 점을 경험했습니다.",
    ],
    liveUrl: "https://livingbox.kr/",
    liveLabel: "수정한 생담 자사몰 보기 ↗",
  },
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
    featuredOrder: 4,
    featuredBadge: "Backend Flow",
    repeatedProblem:
      "유해 접근 탐지 후 판단과 기록이 운영 흐름으로 이어지지 않는 문제",
    backendFlow:
      "패킷 분석 → 정책 조회 → AI 보조 판단 → 로그 저장 → 관리자 확인",
    automationPoint:
      "정책 기반 판단과 보조 판단을 연결해 탐지 이후 운영 흐름을 자동화",
    resultSummary:
      "탐지, 차단, 기록, 관리자 화면 분석까지 이어지는 서비스 구조 설계",
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
    subtitle:
      "잡코리아 공고 수집부터 개인 맞춤 매칭 리포트까지 자동화한 채용 데이터 파이프라인",
    domain: "Data Automation / Job Search",
    description:
      "저장된 채용공고를 개인 선호 조건으로 점수화하고, FastAPI와 Next.js 대시보드에서 검색·관심공고·지원 상태까지 관리하는 채용 데이터 프로젝트입니다.",
    status: "Personal Automation MVP",
    period: "2026",
    role: "Crawler / Parser / Data Pipeline / Report Automation",
    featured: true,
    featuredOrder: 1,
    featuredBadge: "Automation Core",
    repeatedProblem: "채용 공고를 매번 직접 확인하고 비교하는 반복 작업",
    backendFlow:
      "크롤링 → 상세 파싱 → SQLite 저장 → 매칭 점수 계산 → 리포트 생성",
    automationPoint:
      "조건에 맞는 공고를 자동으로 선별하고 CSV/XLSX로 보기 쉽게 정리",
    resultSummary:
      "반복 탐색 시간을 줄이고 사용자가 비교하기 쉬운 채용 데이터 리포트 흐름을 확보",
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
      "FastAPI",
      "Next.js",
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
    liveUrl: "https://tami-bang.github.io/job_crawler/",
    liveLabel: "JobRadar 사용해보기 ↗",
    livePreview: "job-radar",
  },
  {
    slug: "pcfilter-qa-case-study",
    title: "PCFILTER QA Internship",
    subtitle:
      "유지보수 및 추가 개발 변경점 검증을 중심으로 한 2개월 QA 인턴 경험",
    domain: "Security Product QA / Workflow Automation",
    description:
      "지란지교에서 QA 인턴으로 근무하며 개발자들이 유지보수하거나 추가 개발한 PCFILTER 변경점에 대해 사용자 화면, 정책 반영, 로그·리포트 일관성을 검증했습니다. 반복되는 문서 작성과 화면 탐색 문제는 자동화 도구와 가이드로 개선했습니다.",
    status: "2-Month Internship Project",
    period: "2026.04.27 - 2026.06.19",
    role: "QA Testing / Regression Check / Documentation Automation",
    featured: true,
    featuredOrder: 5,
    featuredBadge: "Workflow Automation",
    repeatedProblem:
      "개발 변경점마다 사용자 흐름, 정책 반영, 로그/리포트 일관성을 반복 확인해야 하는 문제",
    structuredFlow:
      "개발 변경점 확인 → QA 시나리오 구성 → 재현·회귀 테스트 → 결과 기록",
    automationPoint:
      "반복되는 테스트 문서 초안 생성과 템플릿 안전 검증을 자동화",
    resultSummary:
      "유지보수·추가 개발 검증 흐름을 테스트 기록과 재사용 가능한 가이드로 정리",
    problem:
      "PCFILTER는 DLP 정보유출방지와 개인정보보호 등 여러 보안 기능이 하나의 에이전트와 관리자 정책으로 연결되는 제품입니다. 개발자들이 유지보수하거나 추가 개발한 변경점은 사용자 화면, 정책 반영, 로그·리포트 기록에 함께 영향을 줄 수 있어 QA 과정에서 기능 단위 확인과 회귀 확인이 모두 필요했습니다.",
    solution:
      "변경된 기능이 요구사항대로 동작하는지 확인하고, 관련 정책과 기존 기능에 영향이 없는지 재현·회귀 테스트로 검증했습니다. 동시에 반복되는 테스트 문서 작성과 화면 탐색 흐름을 개선하기 위해 Jira와 Notion API를 연결한 Node.js 자동화 도구, 화면 네비게이션, 스타터 키트를 정리했습니다.",
    architecture: [
      "개발 변경점 또는 이슈 내용 확인",
      "영향 기능과 관련 정책 범위 파악",
      "사용자 화면, 정책 반영, 로그/리포트 기준으로 QA 시나리오 구성",
      "재현 테스트와 회귀 테스트 수행",
      "기대 결과와 실제 결과, 증거, 후속 확인 사항 기록",
      "반복 문서 작성은 자동화 도구와 템플릿 가드로 보조",
      "화면 네비게이션과 온보딩 가이드로 테스트 지식 공유",
    ],
    highlights: [
      "유지보수 및 추가 개발 변경점에 대해 사용자 화면, 정책, 기록 데이터 관점으로 테스트 수행",
      "개인정보 검사, 보호조치, 매체·출력물·파일첨부 제어 등 공개 기능 범위의 QA 시나리오 정리",
      "M-EP Notion 문서, Jira 티켓, Jenkins 가이드를 보며 업무 맥락과 테스트 대상 버전 흐름 이해",
      "Jira 문서 형식과 Notion 블록을 구조화된 테스트 시나리오로 변환하는 자동화 흐름 구현",
      "Dry-run, 완료 마커, 템플릿 상태 검증으로 사용자 작성 내용 보호",
      "기능별 화면 경로와 재현·로그 수집 방법을 업무 목적별 네비게이션으로 정리",
      "설치, 인증정보 설정, MCP 연결 방법을 포함한 신입 사용자용 스타터 키트 제작",
      "파서, 메타데이터 추출, 블록 생성, 안전 검증 모듈에 단위 테스트 작성",
    ],
    techStack: [
      "Node.js",
      "Jira REST API",
      "Notion API",
      "MCP",
      "Jenkins",
      "Test Automation",
      "Documentation",
    ],
    results: [
      "개발 변경점 검증 시 확인해야 할 사용자 흐름, 정책 반영, 로그/리포트 일관성 기준을 정리했습니다.",
      "반복적인 요구사항 해석과 테스트 문서 초안 작성을 재실행 가능한 자동화 흐름으로 전환했습니다.",
      "기존 문서 훼손 위험을 줄이면서 상세 내용, 시나리오, 결과 템플릿을 일관된 구조로 생성하도록 설계했습니다.",
      "흩어진 제품 화면과 테스트 지식을 화면 네비게이션 및 시작 가이드로 구조화했습니다.",
      "자동화 코드, 검증 테스트, 설치 가이드를 묶어 다음 사용자가 이어서 활용할 수 있는 스타터 키트로 남겼습니다.",
      "Notion, Jira, Jenkins 문서를 통해 테스트가 팀의 기록, 티켓, 빌드 흐름과 연결된다는 점을 익혔습니다.",
      "QA 경험을 바탕으로 개발할 때 고려해야 할 재현 조건, 로그, 예외 처리, 기존 기능 영향 범위를 정리했습니다.",
    ],
    retrospective: [
      "업무 자동화에서는 결과를 생성하는 기능만큼 기존 사용자 데이터를 보호하는 검증 장치가 중요했습니다.",
      "화면 가이드는 경로 목록을 늘어놓는 것보다 사용자가 해결하려는 질문에서 출발할 때 실제 활용도가 높아졌습니다.",
      "Notion은 단순 기록 도구가 아니라 팀 지식을 구조화하는 공간이고, Jira는 테스트해야 할 변경 이유를 읽는 출발점이라는 것을 배웠습니다.",
      "개발자는 기능이 동작하는지만 보는 것이 아니라 사용자가 어떤 흐름에서 쓰는지, 실패했을 때 무엇을 보게 되는지, 결과가 어떤 기록으로 남는지 함께 봐야 한다고 느꼈습니다.",
      "실무 자료를 외부에 설명할 때는 내부 정보 대신 문제, 설계 판단, 자동화 흐름과 배운 점을 중심으로 재구성해야 합니다.",
    ],
    workSamples: [
      {
        title: "화면 네비게이션",
        label: "QA Navigation",
        description:
          "사용자 화면, 관리자 정책, 로그/리포트가 떨어져 있어 테스트할 때 같은 경로를 반복해서 찾는 문제가 있었습니다. Notion 페이지로 화면 경로를 정리하고 QA 질문 기준으로 다시 묶었습니다.",
        why: "새 테스트를 시작할 때 확인 범위를 빠르게 잡고, 정책 변경이 어느 화면과 기록에 영향을 주는지 놓치지 않기 위해 만들었습니다. 이 페이지에는 QA 작업 환경을 구성할 수 있는 스타터 키트 zip도 함께 올려두었습니다.",
        details: [
          "정책 반영, 검사 결과, 보호조치, 정보유출방지 흐름을 테스트 목적별로 정리",
          "사용자 화면 확인에서 끝나지 않고 관리자 설정과 로그/리포트 비교까지 연결",
          "내부 화면 경로와 첨부 zip 원본은 공개하지 않고 산출물의 구조와 작성 방식을 공개용으로 재구성",
        ],
        link: "https://github.com/tami-bang/pcfilter-qa-internship/blob/main/docs/screen-navigation.md",
      },
      {
        title: "Codex + MCP 스타터 키트",
        label: "MCP Starter Kit",
        description:
          "Notion 화면 네비게이션 페이지에 QA 작업 폴더를 구성할 수 있는 zip을 올려두고, 화면 경로 기준 문서와 MCP 설정, Notion/Jira 연동 자동화 흐름을 함께 묶었습니다.",
        why: "자연어로 질문해도 Codex가 기준 문서와 업무 맥락을 참고해 어디에서 무엇을 어떻게 확인해야 하는지 안내할 수 있게 하기 위해 만들었습니다.",
        details: [
          "화면 경로 기준 문서, MCP 설정 예시, 자동화 스크립트, 테스트 코드를 하나의 시작 키트로 구성",
          "개인정보 전체검사, USB 차단 정책, 정책 갱신 순서 같은 질문을 실제 QA 절차로 연결",
          "공개 포트폴리오에는 내부 Notion URL, 인증정보, zip 원본을 제외하고 설계 의도만 정리",
        ],
        link: "https://github.com/tami-bang/pcfilter-qa-internship/blob/main/docs/codex-mcp-starter-kit.md",
      },
      {
        title: "테스트 가이드 자동화",
        label: "Guide Automation",
        description:
          "이슈 설명을 읽고 테스트 가이드 초안을 만드는 일이 반복되어, 시나리오 후보 생성과 템플릿 보호 흐름을 작은 Node.js 샘플로 정리했습니다.",
        why: "문서 초안 작성 시간을 줄이고, 사람이 재현 조건과 실제 결과 판단에 더 집중할 수 있게 하기 위해 만들었습니다.",
        details: [
          "이슈 요약과 설명에서 QA 대상과 시나리오 후보 추론",
          "사용자가 이미 작성한 문서가 있으면 자동 수정을 막는 템플릿 가드 구현",
          "파싱과 보호 로직을 테스트 코드로 검증해 공개 Work Sample로 정리",
        ],
        link: "https://github.com/tami-bang/pcfilter-qa-internship/blob/main/docs/test-guide-automation.md",
      },
      {
        title: "개발자로 이어지는 QA 기본기",
        label: "Workflow Learning",
        description:
          "M-EP Notion, Jira, Jenkins를 접하며 팀의 기록과 개발 흐름을 읽는 법을 익혔고, QA 경험을 개발할 때 참고할 기준으로 정리했습니다.",
        why: "개발자가 되기 위해 기능 구현 전후에 무엇을 확인해야 하는지, 어떤 기록을 남겨야 하는지, 예외 상황을 어떻게 바라봐야 하는지 배운 내용을 남기기 위해 정리했습니다.",
        details: [
          "Notion에서 온보딩, 가이드, 업무 DB, 제품 문서가 연결되는 방식 이해",
          "Jira 티켓의 설명, 재현 조건, 기대 결과를 테스트 시나리오로 바꾸는 연습",
          "Jenkins 문서를 통해 테스트 대상 빌드와 버전 맥락을 QA 관점에서 간접 학습",
          "재현 가능한 조건, 명확한 로그, 예외 처리, 회귀 영향 범위를 개발 기준으로 정리",
        ],
        link: "https://github.com/tami-bang/pcfilter-qa-internship/blob/main/docs/developer-takeaways.md",
      },
    ],
    internshipStory: {
      headline:
        "테스트를 수행하는 인턴에서, 반복을 줄이는 결과물을 남기는 인턴으로",
      summary:
        "짧은 인턴 기간을 단순한 업무 체험으로 보내기보다, 매일 수행하는 QA 업무에서 불편과 반복을 관찰하고 직접 개선하는 것을 목표로 삼았습니다. 제품을 이해하고 이슈를 재현하는 기본 업무에 충실하면서도, 다음 업무와 다음 사람이 더 수월해질 수 있는 도구와 문서를 만드는 데 시간을 투자했습니다.",
      goals: [
        "보안 소프트웨어의 클라이언트, 관리자 페이지, 정책, 로그가 연결되는 구조 이해",
        "Notion, Jira, Jenkins 문서를 통해 팀의 업무 기록과 개발 흐름 파악",
        "이슈를 재현 가능한 조건과 기대 결과로 정리하는 QA 기본기 습득",
        "반복 업무를 발견하고 실제 사용 가능한 자동화와 문서로 개선",
        "인턴 이후에도 팀에서 참고하거나 확장할 수 있는 형태로 결과물 정리",
      ],
      journey: [
        {
          phase: "01 · Learn",
          title: "제품과 QA 흐름 이해",
          description:
            "화면, 정책, 로그의 연결 관계를 따라가며 테스트를 수행하고, 이슈가 어떤 조건에서 발생하는지 재현 가능한 형태로 기록했습니다.",
        },
        {
          phase: "02 · Observe",
          title: "반복되는 불편 발견",
          description:
            "테스트 문서 초안 작성과 화면 경로 탐색이 반복되고, 업무 지식이 여러 문서와 화면에 흩어져 있다는 점을 개선 대상으로 정의했습니다.",
        },
        {
          phase: "03 · Build",
          title: "자동화 도구와 가이드 구현",
          description:
            "Jira·Notion 기반 테스트 가이드 자동화, 기존 문서 보호 로직, 업무 목적별 화면 네비게이션, 신입용 스타터 키트를 제작했습니다.",
        },
        {
          phase: "04 · Share",
          title: "재사용 가능한 결과물로 정리",
          description:
            "실행 방법, 보안 원칙, 오류 대응, 검증 테스트를 함께 정리해 개인 작업으로 끝나지 않고 다른 사용자가 이어갈 수 있도록 구성했습니다.",
        },
      ],
      contributions: [
        "반복 문서 작업을 자동화 후보로 정의하고 실제 실행 가능한 Node.js 도구로 구현",
        "사용자 작성 내용을 보호하는 Dry-run과 템플릿 가드를 넣어 실무 적용 안정성 고려",
        "화면 경로를 업무 목적별 질문과 연관 흐름으로 재구성해 탐색 가능한 지식으로 정리",
        "설치·연결·사용·보안 원칙을 하나의 스타터 키트로 묶어 온보딩 기반 마련",
        "코드와 문서를 테스트 및 가이드와 함께 남겨 유지보수와 확장 가능성 확보",
      ],
      growth: [
        "QA를 기능 확인이 아니라 사용자 흐름과 시스템 연결 관계를 이해하는 과정으로 바라보게 됐습니다.",
        "Notion 문서를 찾고 정리하는 법, Jira 티켓에서 테스트 맥락을 읽는 법, 빌드 흐름을 QA 관점에서 이해하는 법을 익혔습니다.",
        "개발할 때는 기능 구현뿐 아니라 재현 가능한 조건, 예외 상황, 로그, 사용자 메시지, 기존 기능 영향까지 함께 고려해야 한다는 기준을 얻었습니다.",
        "불편을 발견했을 때 개인 요령으로 해결하지 않고 반복 가능한 프로세스와 도구로 구조화하는 습관을 얻었습니다.",
        "자동화는 빠르게 만드는 것보다 기존 데이터를 보호하고 사용자가 신뢰할 수 있게 설계하는 일이 중요하다는 점을 배웠습니다.",
        "짧은 기간에도 맡은 업무를 충실히 수행하면서 작은 개선을 누적하면 팀에 남는 결과물을 만들 수 있다는 자신감을 얻었습니다.",
      ],
    },
    githubUrl: "https://github.com/tami-bang/pcfilter-qa-internship",
    githubLabel: "View Public Work Sample",
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
