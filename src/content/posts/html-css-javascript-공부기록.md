---
title: "HTML, CSS, JavaScript 공부 기록"
description: "웹 화면 구조, 스타일, DOM, JavaScript 이벤트를 관리자 UI 구현 관점에서 정리한 프론트엔드 기초 학습 기록"
category: "HTML/CSS"
createdAt: "2026-06-11"
---

# HTML, CSS, JavaScript 공부 기록

HTML, CSS, JavaScript는 웹 화면을 만드는 기본 기술이다.

AI 웹접근제어 프로젝트에서는 관리자 화면을 만들 때 이 지식이 필요하다.

---

## HTML의 역할

HTML은 화면의 구조를 만든다.

예를 들어 관리자 페이지에는 다음 구조가 필요하다.

- 로그인 폼
- 정책 목록 테이블
- 정책 등록 폼
- 변경 이력 목록
- 알림 영역

HTML은 이런 요소들의 의미와 구조를 잡는다.

```html
<form>
  <label for="url">차단 URL</label>
  <input id="url" name="url" type="text" />
  <button type="submit">등록</button>
</form>
```

---

## CSS의 역할

CSS는 화면의 배치와 시각 스타일을 담당한다.

관리자 화면에서는 화려함보다 가독성과 사용성이 중요하다.

- 테이블이 읽기 쉬운가
- 버튼의 역할이 명확한가
- 상태값이 구분되는가
- 모바일에서도 깨지지 않는가

---

## JavaScript의 역할

JavaScript는 사용자의 동작에 반응한다.

예시:

- 버튼 클릭
- 입력값 검증
- API 요청
- 결과 화면 갱신
- 모달 열기
- 필터 적용

```js
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

---

## DOM 이해

DOM은 HTML 문서를 JavaScript가 다룰 수 있는 객체 구조로 만든 것이다.

JavaScript는 DOM을 통해 화면의 요소를 찾고, 값을 읽고, 내용을 바꾼다.

```js
const input = document.querySelector("#url");
console.log(input.value);
```

---

## Django / Bootstrap과 연결

프로젝트에서는 순수 HTML만 쓰기보다 Django template과 Bootstrap을 함께 사용할 수 있다.

초기 관리자 화면은 다음 조합으로 충분하다.

```text
Django Template
Bootstrap
JavaScript
```

이 조합은 빠르게 CRUD 화면을 만들고, 프로젝트의 핵심인 정책 관리와 감사 로그 기능에 집중하기 좋다.

---

## 프로젝트와 연결되는 부분

HTML/CSS/JavaScript 공부는 관리자 UI 구현과 연결된다.

필요한 화면:

- 차단 정책 목록
- 차단 정책 생성
- 정책 수정
- 변경 이력 조회
- URL 위험도 검사
- 관리자 알림 확인

정리하면 프론트엔드 공부의 목표는 예쁜 화면만 만드는 것이 아니라, **관리자가 실수 없이 정책을 다룰 수 있는 화면을 만드는 것**이다.
