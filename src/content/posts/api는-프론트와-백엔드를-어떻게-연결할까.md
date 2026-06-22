---
title: "API는 프론트와 백엔드를 어떻게 연결할까?"
description: "웹 요청이 실제 시스템에서 어떻게 흐르는지, HTTP부터 TCP/IP까지 구조적으로 이해하는 글"
category: "백엔드/API"
createdAt: "2026-04-25"
---

# API는 프론트와 백엔드를 어떻게 연결할까?

웹 서비스는 단순해 보인다.

버튼을 누르면 결과가 나온다.

하지만 실제로는  
**여러 계층과 시스템이 동시에 작동하는 구조**다.

---

## 먼저, 전체 구조를 한 줄로 보면

```text
Client → Request → Transport → Server → Processing → Response → Render
```

이 흐름 하나로  
프론트엔드, 백엔드, 네트워크를 모두 설명할 수 있다.

---

## API는 “코드”가 아니라 “인터페이스”다

API는 특정 기능이 아니다.

**시스템 간 통신을 정의하는 인터페이스**다.

```text
Client: 요청 구조 정의
Server: 응답 구조 정의
```

이 계약(contract)을 기반으로  
서로 다른 시스템이 결합된다.

---

## 요청은 어떻게 생성되는가

사용자 인터랙션은 결국 네트워크 요청으로 변환된다.

```js
fetch("/api/data");
```

이 시점부터

- UI 이벤트 → 네트워크 이벤트로 전환되고
- 브라우저는 통신 스택을 활성화한다

---

## 요청이 실제로 지나가는 경로

이 요청은 단순히 서버로 “전송”되는 것이 아니라  
**네트워크 스택을 통과하면서 처리된다**

---

## 단계별 흐름 (Execution Flow)

| 단계 | 레이어      | 동작             |
| ---- | ----------- | ---------------- |
| 1    | UI          | 사용자 입력 발생 |
| 2    | Application | HTTP 요청 생성   |
| 3    | Transport   | TCP 연결 수립    |
| 4    | Network     | IP 기반 라우팅   |
| 5    | Server      | 요청 수신        |
| 6    | Backend     | API 라우팅       |
| 7    | Logic       | 비즈니스 처리    |
| 8    | Data        | DB / 외부 시스템 |
| 9    | Transport   | 응답 전송        |
| 10   | UI          | 상태 업데이트    |

---

## 이 흐름을 OSI 관점에서 보면

| 계층 | 역할                      |
| ---- | ------------------------- |
| L7   | HTTP / REST API           |
| L6   | 데이터 포맷 (JSON)        |
| L5   | 세션 관리                 |
| L4   | TCP (신뢰성 보장)         |
| L3   | IP (라우팅)               |
| L2   | MAC (네트워크 인터페이스) |
| L1   | 물리 신호                 |

중요한 포인트:

👉 우리가 작성하는 코드는 L7  
👉 실제 데이터 흐름은 L1~L7 전체에서 발생

---

## 서버 내부 처리 흐름

요청이 서버에 도착하면 다음 단계로 처리된다.

```text
1. Endpoint 매칭 (Routing)
2. Request Parsing
3. Validation
4. Business Logic
5. Data Access (DB / External API)
6. Response Construction
```

응답은 일반적으로 JSON 형태로 반환된다.

```json
{
  "status": "success",
  "data": {}
}
```

---

## 시스템 관점에서 보면

이 구조는 3가지 역할로 나뉜다.

### Client Layer

- 입력 처리
- 요청 생성
- 상태 관리
- UI 렌더링

### Application Layer (Backend)

- 요청 처리
- 로직 실행
- 데이터 가공
- 응답 생성

### Network Layer

- 데이터 전달
- 연결 관리
- 패킷 라우팅

---

## 실무에서는 이 구조가 확장된다

실제 서비스에서는 아래 계층이 추가된다.

```text
Authentication → Authorization → Logging → Monitoring → Security → Caching
```

API는 단순한 연결이 아니라  
**시스템의 중심 진입점(entry point)**이다.

---

## 장애는 어디서 발생하는가

| 증상               | 원인 레이어           |
| ------------------ | --------------------- |
| CORS               | Application / Browser |
| 404                | Routing               |
| 500                | Server Logic          |
| Timeout            | Network / Server      |
| Connection Refused | TCP / Port            |
| Packet Loss        | Network Layer         |

---

## GateGuard에 적용하면

이 흐름은 그대로 보인다.

```text
Client Request
→ Packet Capture
→ Policy Engine
→ AI Analysis
→ Decision (BLOCK / PASS)
→ Response Injection
```

여기서 중요한 점:

- 요청을 HTTP가 아니라 **패킷 레벨(L3~L4)**에서 처리한다
- API 이전 단계에서 보안 판단이 이루어진다

즉 GateGuard는  
**Application Layer 이전에서 동작하는 보안 시스템**이다.

---

## 결론

웹 서비스는 복잡해 보이지만  
구조는 단순하다.

```text
Request → Process → Response
```

이 흐름을 이해하면

- API 설계
- 백엔드 구조
- 네트워크 동작

을 하나의 관점으로 연결할 수 있다.
