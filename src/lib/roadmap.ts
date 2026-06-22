export type RoadmapStep = {
  number: number;
  title: string;
  items: string[];
  tracks?: { name: string; items: string[] }[];
};

export type RoadmapPhase = {
  id: string;
  label: string;
  title: string;
  description: string;
  range: string;
  steps: RoadmapStep[];
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "discover",
    label: "Discover",
    title: "문제를 발견하고 방향을 정합니다",
    description:
      "누구의 어떤 문제를 왜 해결하는지 합의하고, 만들 서비스의 경계를 선명하게 잡습니다.",
    range: "01—03",
    steps: [
      {
        number: 1,
        title: "문제 정의",
        items: ["해결할 문제 정의", "대상 사용자 정의", "목표 정의"],
      },
      {
        number: 2,
        title: "서비스 기획",
        items: [
          "서비스 정의서",
          "핵심 기능 정의",
          "범위(MVP) 정의",
          "우선순위 정의",
        ],
      },
      {
        number: 3,
        title: "요구사항 분석",
        items: [
          "기능 요구사항",
          "비기능 요구사항: 성능 · 보안 · 확장성 · 유지보수성",
        ],
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    title: "구조와 경험을 설계합니다",
    description:
      "시스템과 데이터의 흐름부터 사용자가 만나는 화면까지, 구현 전에 연결 관계를 그립니다.",
    range: "04—11",
    steps: [
      {
        number: 4,
        title: "아키텍처 설계",
        items: ["시스템 구성도", "서버 구성도", "데이터 흐름도"],
      },
      {
        number: 5,
        title: "모듈 설계",
        items: ["기능별 모듈 분리", "책임 정의", "의존성 정의"],
      },
      {
        number: 6,
        title: "데이터 설계",
        items: ["ERD", "테이블 설계", "인덱스 설계", "데이터 정책 정의"],
      },
      {
        number: 7,
        title: "API 설계",
        items: ["REST API 설계", "Request / Response 정의", "에러 코드 정의"],
      },
      {
        number: 8,
        title: "인터페이스 설계",
        items: ["모듈 간 인터페이스 정의", "외부 시스템 연동 정의"],
      },
      {
        number: 9,
        title: "시퀀스 다이어그램",
        items: ["주요 기능 흐름 정의", "예외 흐름 정의"],
      },
      {
        number: 10,
        title: "화면 설계",
        items: ["유저 플로우", "와이어프레임", "화면 목업"],
      },
      {
        number: 11,
        title: "디자인 시스템 설계",
        items: ["Color System", "Typography", "Layout", "Component 규칙"],
      },
    ],
  },
  {
    id: "build",
    label: "Build",
    title: "기반을 만들고 병렬로 구현합니다",
    description:
      "모두가 같은 기준에서 개발할 수 있는 환경을 만든 뒤, 독립적인 트랙으로 나누어 속도를 냅니다.",
    range: "12—13",
    steps: [
      {
        number: 12,
        title: "개발 환경 구축",
        items: [
          "Repository 생성",
          "브랜치 전략",
          "Docker",
          "환경변수",
          "코드 컨벤션",
          "CI 기본 설정",
        ],
      },
      {
        number: 13,
        title: "병렬 개발",
        items: [],
        tracks: [
          { name: "Frontend", items: ["Layout", "Component", "Page", "State"] },
          { name: "Backend", items: ["Domain", "Service", "API", "Auth"] },
          { name: "Database", items: ["Schema", "Migration", "Seed"] },
          { name: "Infra", items: ["Server", "Network", "Storage", "Deploy"] },
          {
            name: "Data / AI",
            items: ["Crawler", "Parser", "Engine", "Model"],
          },
        ],
      },
    ],
  },
  {
    id: "verify-ship",
    label: "Verify & Ship",
    title: "검증하고 안전하게 배포합니다",
    description:
      "작은 단위부터 실제 사용자 흐름까지 확인하고, 자동화된 파이프라인을 거쳐 운영 환경에 전달합니다.",
    range: "14—21",
    steps: [
      {
        number: 14,
        title: "단위 테스트",
        items: ["함수 테스트", "서비스 테스트", "유틸 테스트"],
      },
      {
        number: 15,
        title: "통합 테스트",
        items: ["Frontend ↔ Backend", "Backend ↔ DB", "외부 연동 검증"],
      },
      { number: 16, title: "E2E 테스트", items: ["실제 사용자 시나리오 검증"] },
      {
        number: 17,
        title: "성능 테스트",
        items: ["부하 테스트", "응답속도 측정", "병목 분석"],
      },
      {
        number: 18,
        title: "보안 테스트",
        items: ["인증", "권한", "SQL Injection", "XSS", "CSRF", "취약점 점검"],
      },
      {
        number: 19,
        title: "CI/CD 구축",
        items: ["Build", "Test", "Deploy 자동화"],
      },
      { number: 20, title: "스테이징 배포", items: ["운영 전 검증"] },
      { number: 21, title: "운영 배포", items: ["Production 배포"] },
    ],
  },
  {
    id: "operate-learn",
    label: "Operate & Learn",
    title: "운영하며 배우고 개선합니다",
    description:
      "배포를 끝이 아닌 관찰의 시작으로 보고, 장애와 피드백을 다음 제품 개선으로 연결합니다.",
    range: "22—25",
    steps: [
      {
        number: 22,
        title: "모니터링 구축",
        items: ["로그 수집", "에러 추적", "서버 모니터링", "알림 시스템"],
      },
      {
        number: 23,
        title: "장애 대응",
        items: ["장애 대응 절차", "백업 정책", "롤백 전략"],
      },
      {
        number: 24,
        title: "운영 및 유지보수",
        items: ["버그 수정", "기능 개선", "성능 개선", "보안 업데이트"],
      },
      {
        number: 25,
        title: "문서화 및 회고",
        items: ["README", "API 문서", "트러블슈팅", "회고", "발표자료"],
      },
    ],
  },
];
