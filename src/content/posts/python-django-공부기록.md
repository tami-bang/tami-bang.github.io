---
title: "Python, Django"
description: "Python 데이터 처리, requests와 BeautifulSoup 크롤링, Django 관리자 웹, 머신러닝 API 연결 흐름을 정리한 학습 기록"
category: "파이썬/Django"
createdAt: "2026-06-11"
---

# Python, Django

Python은 이번 프로젝트에서 가장 넓게 쓰이는 언어다.

데이터 수집, 전처리, 머신러닝, API 서버, Django 웹 개발까지 여러 역할을 맡을 수 있다.

---

## Python을 쓰는 부분

AI 웹접근제어 프로젝트에서 Python은 다음 영역에 연결된다.

- 보안 뉴스 크롤링
- URL 데이터 전처리
- 머신러닝 모델 학습
- 예측 API 구현
- Django 관리자 웹 구현
- 자동화 스크립트 작성

---

## requests와 BeautifulSoup

보안 뉴스 크롤링 미니 프로젝트에서는 `requests`와 `BeautifulSoup`을 사용한다.

기본 흐름:

```text
웹 페이지 요청
→ HTML 응답 수신
→ BeautifulSoup으로 파싱
→ 기사 제목 / URL / 카테고리 추출
→ DB 저장
→ 로그 기록
```

중요한 고민:

- 같은 기사인데 카테고리별 URL이 다를 때 중복으로 볼 것인가
- 제목 기준으로 중복 제거할 것인가
- URL 기준으로 중복 제거할 것인가
- 실패한 요청은 로그로 어떻게 남길 것인가

---

## Django의 역할

Django는 관리자 웹 화면과 백엔드 로직을 만들 때 사용한다.

이 프로젝트에서 Django가 담당할 수 있는 기능:

- 관리자 로그인
- 차단 정책 CRUD
- 정책 변경 이력 조회
- URL 위험도 검사 요청
- DB 모델 관리
- 관리자 알림 화면

---

## DB와 Django 모델

Django는 DB 테이블을 모델로 표현한다.

예시:

```python
class WebBlockPolicy(models.Model):
    target_url = models.CharField(max_length=500)
    action = models.CharField(max_length=20)
    risk_level = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
```

하지만 감사 로그처럼 반드시 누락되면 안 되는 기록은 Django 코드뿐 아니라 DB trigger로도 남기는 구조가 필요하다.

---

## 머신러닝 흐름

URL이 유해한지 판단하는 모델은 다음 순서로 만들 수 있다.

```text
데이터 수집
→ 전처리
→ Feature Engineering
→ 모델 학습
→ 평가
→ API로 예측 제공
```

처음부터 복잡한 모델을 만들기보다 다음 순서가 좋다.

1. rule-based 점수화
2. 간단한 ML 모델
3. 성능 평가
4. API 연결
5. 서비스 흐름에 통합

---

## API 연결

Python 모델은 API 형태로 만들면 다른 모듈에서 사용할 수 있다.

예상 흐름:

```text
C 탐지엔진 또는 Django
→ URL 전달
→ Python ML API
→ 위험도 점수 반환
→ 차단 / 허용 판단
```

API를 외부에서 사용할 수 있게 하려면 token 인증도 필요하다.

---

## 프로젝트와 연결되는 부분

Python과 Django 공부는 프로젝트의 중심이다.

정리하면:

- Python은 데이터 수집과 AI 판단을 담당한다.
- Django는 관리자 웹과 정책 관리를 담당한다.
- DB는 정책과 변경 이력을 저장한다.
- API는 각 모듈이 서로 통신하는 연결점이 된다.

이번 공부의 목표는 Python 문법만 익히는 것이 아니라, **Python을 실제 서비스 흐름 안에서 어떻게 쓰는지 이해하는 것**이다.
