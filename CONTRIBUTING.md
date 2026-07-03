# Tami.log 운영 규칙

> 적용 시작일: 2026-06-22

작은 변경을 안전하게 배포하고, 나중에 변경 이유를 쉽게 찾기 위한 최소 규칙입니다.

## 작업 흐름

1. 작업 전에 `main`을 최신 상태로 맞춥니다.
2. 작업 목적에 맞는 새 브랜치를 만듭니다.
3. 하나의 논리적 변경 단위로 커밋합니다.
4. 로컬에서 `npm run validate`를 실행합니다.
5. Pull Request를 열고 자동 검사가 통과하면 `main`에 병합합니다.

```bash
git switch main
git pull --ff-only
git switch -c feature/project-filter

# 작업 후
git add <변경한 파일>
git commit -m "feat: 프로젝트 필터 추가"
git push -u origin feature/project-filter
```

## 브랜치 이름

| 종류         | 용도                     | 예시                      |
| ------------ | ------------------------ | ------------------------- |
| `feature/*`  | 새 기능                  | `feature/project-filter`  |
| `fix/*`      | 버그 수정                | `fix/mobile-header`       |
| `content/*`  | 글·프로젝트 콘텐츠       | `content/network-post`    |
| `docs/*`     | 문서만 변경              | `docs/contributing-guide` |
| `refactor/*` | 동작 변화 없는 구조 개선 | `refactor/project-data`   |
| `chore/*`    | 설정·의존성·도구         | `chore/update-next`       |

`main`은 언제든 배포 가능한 상태로 유지합니다. 일반 작업은 별도 브랜치와 PR을 거칩니다.

## 커밋 메시지

`type: 한글 요약` 형식을 사용합니다. Git hook이 형식을 자동 검사합니다.
이 저장소의 커밋 메시지는 항상 기존 톤을 유지해 한글 중심으로 작성합니다.

| 타입       | 용도                   | 예시                               |
| ---------- | ---------------------- | ---------------------------------- |
| `feat`     | 새 기능                | `feat: 카테고리 필터 추가`         |
| `fix`      | 버그 수정              | `fix: 모바일 메뉴 겹침 수정`       |
| `content`  | 게시물·프로젝트 내용   | `content: Linux 학습 내용 추가`    |
| `style`    | 기능 변화 없는 UI·서식 | `style: 프로젝트 카드 간격 조정`   |
| `refactor` | 구조 개선              | `refactor: 프로젝트 데이터 분리`   |
| `docs`     | 문서                   | `docs: 로컬 실행 방법 보완`        |
| `test`     | 테스트                 | `test: 이슈 파서 예외 케이스 추가` |
| `chore`    | 설정·의존성            | `chore: 품질 검사 워크플로 추가`   |

커밋 하나에는 하나의 논리적 변경만 담고, 한글 명령형의 짧은 제목을 사용합니다.

## 자동 품질 검사

- 커밋 전: 변경 파일에 ESLint와 Prettier 실행
- 커밋 메시지 작성 후: Conventional Commits 형식 검사
- Pull Request: 포맷, ESLint, TypeScript, 프로덕션 빌드 검사
- `main` 병합 후: GitHub Pages 자동 배포

필요할 때 다음 명령을 사용할 수 있습니다.

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run validate
```

## Pull Request 원칙

- PR 하나에는 하나의 목적만 담습니다.
- UI 변경은 스크린샷을 첨부합니다.
- 무엇을, 왜 바꿨는지와 확인 방법을 적습니다.
- 자동 검사가 통과한 뒤 병합합니다.
- 가능한 경우 Squash merge로 `main` 기록을 간결하게 유지합니다.
