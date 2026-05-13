# pp-seoul-cohort

프프서울 금융·AI 리터러시 코호트 교육을 **Claude Code 안에서 슬래시 커맨드 하나로** 돌리는 플러그인입니다. 별도 웹앱, API 키, Node, 빌드 단계 없이 Claude Code 자체의 Skill 기능만 사용합니다.

매주 운영자가 새 주차 Skill을 push하면, 참여자는 `/plugin marketplace update`로 받아 슬래시 커맨드 하나만 더 외우면 됩니다.

## 지원 환경

| 항목 | 요구 사양 |
|---|---|
| Claude Code | 최신 안정 버전 (`/plugin` marketplace 지원) |
| 인터넷 | https 통신 (RSS / 공시 출처 + GitHub) |
| OS | macOS / Windows / Linux 무관 — Skill은 Claude Code 안에서 동작 |

Node, npm, 빌드 도구 모두 불필요. Claude Code만 있으면 됩니다.

## 참여자 사용법

```
/plugin marketplace add siwonblue/pp-seoul-cohort
/plugin install pp-seoul-cohort@pp-seoul-cohort
```

그 다음은 주차별로 안내되는 슬래시 커맨드(`/pp-seoul-cohort:<name>`)를 실행하세요.

## 1주차 — 산업 사이클 분석 (준비 중)

1주차 Skill 묶음은 다음 능력을 다룹니다 (구체적 커맨드 이름은 정식 출시 때 README에 갱신).

- 산업 하나의 사이클 단계 추론 (early/mid/late expansion, recession)
- 다수 산업의 사이클 위치 표 작성
- 글로벌·국내 RSS 출처 요약(주요 IB·매크로·뉴스·한국 매체)
- 주장 출처 확인 (2개 이상 출처 + 반대 근거)
- 1주차 과제 산출물 템플릿 자동 생성

준비되는 대로 이 README가 갱신되고, `/plugin marketplace update pp-seoul-cohort` 한 번이면 받습니다.

## 다음 주차 받기

```
/plugin marketplace update pp-seoul-cohort
```

새 주차 Skill이 즉시 활성화됩니다(설치 추가 단계 없음).

## 더 알아보기 — "Claude Code로 웹앱까지 만들어보기" (선택 과제)

이 플러그인의 v0는 Claude Code Skill이 사용자 바탕화면에 **로컬 Next.js 대시보드**를 만드는 노선이었습니다. RSS 위젯이 사이드바에 누적되는 풀스택 구현으로, "Claude Code로 풀스택을 어디까지 자동화할 수 있나"를 가늠해 볼 수 있는 좋은 표본입니다.

본 코호트 진행에 **필수는 아닙니다**. 다만 다음 호기심이 있다면 1주차 끝나고 한 번 둘러보세요.

- Claude Code Skill에 macOS/Windows 분기와 npm ci까지 들어간 보수적 환경 잠금이 어떻게 구현되는지
- RSS 7종을 카드 그리드로 스캐닝하는 Linear 미감 UI
- 매 주차 사이드바에 위젯이 누적되는 멱등 레지스트리 패턴

🔗 브랜치: https://github.com/siwonblue/pp-seoul-cohort/tree/archive/dashboard-v0

직접 띄워보려면:

```bash
git clone --branch archive/dashboard-v0 https://github.com/siwonblue/pp-seoul-cohort.git pp-dashboard-archive
# 이 브랜치의 README가 설치 방법을 안내합니다.
```

## 운영자: 새 주차 추가

1. `skills/weekN-xxxx/SKILL.md` 한 장 작성 (frontmatter + 본문 markdown).
2. 커밋 + push.
3. 참여자에게 `/plugin marketplace update pp-seoul-cohort` 안내.

## 구조

```
.claude-plugin/   플러그인 메타 + 마켓플레이스 정의
skills/           주차·주제별 슬래시 커맨드 (SKILL.md 묶음)
```

## 브랜치

| 브랜치 | 용도 |
|---|---|
| `main` | Skill 묶음 (활성 코호트용) |
| `archive/dashboard-v0` | 초기 Next.js 대시보드 구현 (참고용 보존) |
