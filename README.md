# Tami.log

자동화를 좋아하는 서비스 개발자 포트폴리오입니다.

반복되는 작업을 발견하면 데이터, API, 사용자 화면 흐름으로 구조화하고, Python, FastAPI, DB, 크롤링, 리포트 자동화를 활용해 실제로 동작하는 서비스 프로젝트로 정리합니다. QA 경험은 정체성이 아니라 반복 문제를 발견하는 시야로 사용하고, AI는 검색과 판단 흐름을 보조하는 도구로 활용합니다.

## Purpose

- 자동화와 서비스 흐름 중심의 프로젝트 포트폴리오 운영
- 반복 작업 발견, 데이터/API/화면 흐름 구조화, 자동화 구현 과정 정리
- JobRadar, GateGuard, PCFILTER QA Case Study 같은 대표 사례 관리
- Markdown 기반 Backend Notes 축적
- 포트폴리오 사이트 자체를 UI 구성과 테마 일관성을 보여주는 화면으로 관리
- GitHub Pages 기반 정적 사이트 배포

## Pages

- `/` : 메인 페이지
- `/projects` : 자동화와 서비스 구현 프로젝트 Case Study
- `/blog` : Backend Notes
- `/about` : 개발자 소개

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- GitHub Pages

## Run Locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Add Blog Posts

GitHub Pages 정적 배포를 사용하므로 별도 관리자 페이지를 두지 않습니다.

블로그 글은 `src/content/posts/*.md` 파일을 추가한 뒤 commit/push하면 GitHub Actions가 정적 사이트를 다시 빌드하고 배포합니다.

Markdown 파일 예시:

```md
---
title: "글 제목"
description: "목록에 표시될 짧은 설명"
category: "Backend/API"
createdAt: "2026-06-08"
---

본문을 Markdown으로 작성합니다.
```

## Update Projects

프로젝트 데이터는 `src/lib/projects.ts`에서 관리합니다.

프로젝트 카드에 표시되는 핵심 요약은 아래 필드를 사용합니다.

- `repeatedProblem`
- `backendFlow` 또는 `structuredFlow`
- `automationPoint`
- `resultSummary`
- `featuredBadge`
- `featuredOrder`

`featured: true`인 프로젝트는 Home의 Featured Projects에 표시됩니다.

## Portfolio Rules

포트폴리오의 포지셔닝, 콘텐츠 톤, 디자인 방향, 배포 제약은 `PORTFOLIO_RULES.md`를 기준으로 관리합니다.

## Deployment

이 사이트는 Next.js 정적 export와 GitHub Pages를 사용합니다.

- `next.config.ts`에서 `output: "export"`를 유지합니다.
- `main` 브랜치에 push하면 GitHub Actions가 `npm ci`, `npm run build`를 실행합니다.
- 생성된 `out` 디렉터리가 GitHub Pages에 배포됩니다.
