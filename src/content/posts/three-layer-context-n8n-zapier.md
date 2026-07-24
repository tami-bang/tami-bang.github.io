---
title: "[에이전트/자동화] 3 Layer 컨텍스트 관리 기법과 외부 연동(n8n/Zapier)"
description: "AI 에이전트와 외부 자동화 도구를 사용할 때 프로젝트 맥락, 작업 지시, 검증 기준을 나누어 관리하는 방법을 정리합니다."
category: "바이브코딩"
createdAt: "2026-07-20"
---

# [에이전트/자동화] 3 Layer 컨텍스트 관리 기법과 외부 연동(n8n/Zapier)

바이브코딩 개발자 과정에서 인상 깊었던 부분은 AI에게 한 번에 모든 것을 맡기는 방식이 아니라, 컨텍스트를 층으로 나누어 관리하는 방식이었다.

## 3 Layer 컨텍스트

```text
1. 프로젝트 컨텍스트: 서비스 목적, 기술 스택, 제약 조건
2. 작업 컨텍스트: 지금 수정할 기능과 필요한 입력값
3. 검증 컨텍스트: 성공 기준, 테스트 방법, 배포 전 확인 항목
```

이렇게 나누면 AI 에이전트가 맥락을 잃고 엉뚱한 방향으로 확장하는 일을 줄일 수 있다.

## Antigravity와 외부 액션 자동화

과정에서는 AI 에이전트 연동 흐름과 함께 n8n, Zapier 같은 외부 액션 자동화 도구의 역할도 다뤘다.

- 반복되는 데이터 전달 자동화
- 알림과 후속 액션 연결
- 수집된 정보를 다음 작업으로 넘기는 워크플로 구성
- 사람이 확인해야 할 지점과 자동화할 지점 분리

Gogisise에서도 데이터 수집, 저장, API 제공, 화면 표시가 이어지는 구조를 생각할 때 이 관점이 도움이 됐다.

```text
금천미트 도매 사이트
→ Python Crawler
→ NestJS Crawler API
→ Prisma
→ Supabase
→ NestJS Market API
→ React 모바일 UI
```

특히 크롤러는 Supabase에 직접 쓰지 않고 `POST /crawler/category-tree`, `POST /crawler/ingest`, `POST /crawler/finalize`를 통해 BE에 전달하도록 나눴다. 이 덕분에 상품 UPSERT, 일별 가격 UPSERT, RawRecord 저장, ACTIVE/INACTIVE 상태 동기화 같은 책임을 BE 한 곳에서 관리할 수 있었다.

## 배운 점

자동화는 모든 것을 기계에 맡기는 일이 아니다. 반복되는 흐름은 자동화하고, 판단이 필요한 지점은 사람이 확인할 수 있게 남기는 균형이 중요하다.
