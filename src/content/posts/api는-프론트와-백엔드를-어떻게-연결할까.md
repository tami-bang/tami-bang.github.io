---
title: "API는 프론트와 백엔드를 어떻게 연결할까?"
description: "HTTP 요청, REST API, OSI 7계층, TCP/IP 흐름을 웹 서비스 기준으로 정리합니다."
category: "Backend/API"
createdAt: "2026-04-25"
---

# API + OSI 7계층 기반 웹 서비스 동작 정리

## 1. 개념 정의

### API (Application Programming Interface)
- 프론트엔드와 백엔드를 연결하는 인터페이스
- HTTP 기반으로 요청과 응답 수행
- 데이터 형식은 일반적으로 JSON 사용

핵심: API는 클라이언트와 서버 간 통신 규칙이다

## OSI 7계층
- 네트워크 통신을 7단계로 나눈 모델

| 계층 | 이름 | 역할 |
|------|------|------|
| 7 | 응용 계층 | HTTP, API |
| 6 | 표현 계층 | JSON, 인코딩 |
| 5 | 세션 계층 | 로그인, 세션 |
| 4 | 전송 계층 | TCP |
| 3 | 네트워크 계층 | IP |
| 2 | 데이터링크 계층 | MAC |
| 1 | 물리 계층 | 전기 신호 |

## 2. 전체 흐름

- 사용자 → 프론트 → HTTP 요청 → TCP 연결
- 네트워크 전송 → 서버 → API 처리
- DB 또는 AI 처리 → 응답 생성
- 클라이언트 반환 → 화면 렌더링

## 3. 단계별 흐름

### 1단계 사용자 인터랙션
- 사용자가 버튼 클릭
- 프론트엔드가 API 호출 준비

### 2단계 HTTP 요청 생성
GET /api/data
POST /login
- URL, Header, Body 구성
- JSON 데이터 생성

### 3단계 TCP 연결
- 3-way handshake 수행
SYN → SYN-ACK → ACK

### 4단계 네트워크 전송
- IP 기반으로 서버 이동

### 5단계 서버 도착
- 물리 → 링크 → IP → TCP → HTTP 순으로 해석

### 6단계 API 처리
- URL 라우팅
- 요청 데이터 파싱
- 로직 실행

### 7단계 내부 처리
- DB 조회
- AI 모델 호출
- 외부 API 호출

### 8단계 응답 생성
{
  "result": "success",
  "data": {}
}

### 9단계 응답 전송
- TCP → IP → 클라이언트

### 10단계 프론트 렌더링
setState(response.data)

## 4. 핵심 정리

프론트 역할
- 사용자 입력 처리
- API 호출
- 화면 렌더링

백엔드 역할
- 요청 처리
- 로직 수행
- 데이터 반환

네트워크 역할
- TCP/IP 기반 데이터 전달

## 5. 전체 흐름 암기

- 사용자 클릭
- HTTP 요청 생성
- TCP 연결
- 서버 전달
- API 처리
- DB/AI 처리
- JSON 응답
- 클라이언트 반환
- 화면 렌더링

## 6. 실무 포인트

### API는 단순 연결이 아니다
- 인증 처리
- 에러 처리
- 성능 최적화
- 보안 적용

### 문제 발생 위치

| 문제 | 계층 |
|------|------|
| CORS | 7계층 |
| 404 / 500 | 7계층 |
| Timeout | 4계층 |
| 연결 실패 | 3계층 |
| 네트워크 끊김 | 1~2계층 |

## 7. GateGuard 적용

:::details GateGuard 흐름
사용자 요청 → HTTP 생성 → 패킷 전달 → Detection Engine → FastAPI → AI 분석 → BLOCK 또는 PASS → 응답 반환
:::

## 8. 최종 정리

웹 서비스에서 API는 HTTP 기반으로 동작하며 TCP/IP를 통해 서버로 전달되고 서버 처리 결과는 JSON으로 반환되어 프론트에서 렌더링된다
