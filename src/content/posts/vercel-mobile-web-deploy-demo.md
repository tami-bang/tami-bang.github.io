---
title: "[배포/DevOps] Vercel 환경에서의 모바일 웹 서비스 최종 배포 및 결과물 시연"
description: "Gogisise 프론트엔드를 Vercel에 배포하고, 최종 시연 가능한 모바일 웹 서비스로 검증한 과정을 정리합니다."
category: "바이브코딩"
createdAt: "2026-07-20"
---

# [배포/DevOps] Vercel 환경에서의 모바일 웹 서비스 최종 배포 및 결과물 시연

Gogisise는 로컬에서 동작하는 코드로 끝내지 않고, React/TypeScript FE와 NestJS BE를 Vercel 환경에 연결해 실제 URL로 접근 가능한 모바일 웹 서비스로 완성했다.

## 배포 전 확인한 항목

- 모바일 화면에서 주요 UI가 깨지지 않는지
- FE의 API 연결 주소와 BE의 Supabase 환경변수가 올바른지
- 빈 데이터, 로딩, 오류 상태가 표시되는지
- ACTIVE 상품과 최근 7일 priceHistory가 API 응답으로 내려오는지
- 가격이 없는 날짜를 보간하지 않고 “없음”으로 표시하는지
- 배포된 URL에서 실제 서비스 흐름을 시연할 수 있는지
- GitHub 레포지토리와 배포 결과가 포트폴리오에서 연결되는지

배포는 마지막 버튼을 누르는 일이 아니라, 사용자가 보는 결과물을 기준으로 다시 확인하는 과정이었다.

## Vercel 배포 흐름

```text
GitHub Repository
→ FE / BE Vercel 프로젝트 연결
→ Supabase URL과 key 등 환경변수 설정
→ Production Build
→ Market API와 Crawler API 동작 확인
→ 배포 URL과 모바일 화면 확인
→ 모바일 브라우저에서 최종 시연
```

Gogisise의 라이브 데모는 `https://gogisise-fe.vercel.app/`로 배포되어 있으며, 포트폴리오 프로젝트 페이지에서도 바로 이동할 수 있게 연결했다.

## 배운 점

실제 배포까지 해 보면 구현의 기준이 달라진다. 컴포넌트가 로컬에서 보이는지보다, 사용자가 배포 URL에서 문제없이 흐름을 따라갈 수 있는지가 더 중요해진다.
