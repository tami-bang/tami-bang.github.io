# Screen Navigation Guide - Public Sample

기능 이름만 나열하지 않고 사용자가 해결하려는 질문에서 관련 화면과 확인
방법을 찾도록 구성한 화면 네비게이션 샘플입니다.

실제 제품명과 내부 화면 경로는 일반적인 보안 소프트웨어 구조로
대체했습니다.

## 정책을 바꿨는데 클라이언트에 반영되지 않아요

| 확인 목적 | 화면 경로 | 확인 내용 |
| --- | --- | --- |
| 정책 저장 여부 | `Admin console > Policy settings > Target policy` | 변경 값과 적용 대상을 확인합니다. |
| 테스트 장비 포함 여부 | `Admin console > Devices > Assigned policies` | 테스트 장비가 정책 대상인지 확인합니다. |
| 즉시 동기화 | `Desktop client > Settings > Refresh policy` | 정책을 갱신하고 마지막 연결 시각을 확인합니다. |
| 적용 결과 | `Desktop client > Related feature` | 변경한 정책에 맞게 UI와 동작이 바뀌었는지 확인합니다. |

## 파일 검사 문제를 재현하고 로그를 수집하고 싶어요

| 순서 | 화면 경로 | 확인 내용 |
| --- | --- | --- |
| 1 | `Desktop client > Scan > Selective scan` | 재현 대상 파일과 경로만 선택합니다. |
| 2 | `Desktop client > Logs > Scan logs` | 결과, 사유, 처리 시각을 기록합니다. |
| 3 | `Admin console > Logs > Scan logs` | 클라이언트 기록과 서버 기록을 비교합니다. |
| 4 | `Admin console > Reports > Export` | 보고서 다운로드 결과와 파일 내용을 확인합니다. |

## 컨텍스트 메뉴 기능이 보이지 않아요

| 확인 목적 | 화면 경로 | 확인 내용 |
| --- | --- | --- |
| 기능 정책 | `Admin console > Policy settings > Context menu actions` | 해당 기능이 활성화되어 있는지 확인합니다. |
| 정책 갱신 | `Desktop client > Settings > Refresh policy` | 최신 정책을 수신했는지 확인합니다. |
| 확장 기능 상태 | `Operating system settings > Extensions` | 파일 탐색기 확장 기능이 허용되어 있는지 확인합니다. |
| 최종 확인 | `Test file > Context menu` | 정책에 맞는 메뉴가 노출되는지 확인합니다. |

## 문서 설계 원칙

- 화면 이름보다 사용자의 질문을 먼저 배치합니다.
- 클라이언트, 관리자 화면, 운영 도구의 연관 경로를 한 표에서 연결합니다.
- 재현 순서와 증거 수집 위치를 함께 제공합니다.
- 실제 화면과 문서가 다르면 화면을 기준으로 문서를 갱신합니다.
