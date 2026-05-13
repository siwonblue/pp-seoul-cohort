# pp-seoul-cohort

프프서울 금융·AI 리터러시 코호트 교육을 **Claude Code 안에서 슬래시 커맨드 하나로** 돌리는 플러그인입니다. 별도 웹앱, API 키, Node, 빌드 단계 없이 Claude Code 자체의 Skill 기능만 사용합니다.

매주 운영자가 새 주차 Skill을 push하면, 참여자는 `/plugin marketplace update`로 받아 슬래시 커맨드 하나만 더 외우면 됩니다.

## 지원 환경

| 항목 | 요구 사양 |
|---|---|
| Claude Code | 최신 안정 버전 (`/plugin` marketplace 지원) |
| 인터넷 | https 통신 (RSS / 공시 출처 + GitHub) |
| OS | macOS / Windows / Linux 무관 — Skill은 Claude Code 안에서 동작 |

Node, npm, 빌드 도구 모두 불필요.

## 참여자 설치 (1주차 시작 전 1회)

마켓플레이스 두 개 등록 + 플러그인 두 개 설치:

```
# 1) 본 코호트 플러그인
/plugin marketplace add siwonblue/pp-seoul-cohort
/plugin install pp-seoul-cohort@pp-seoul-cohort

# 2) 사실확인·출처검증용 외부 플러그인 (jamditis MIT)
/plugin marketplace add jamditis/claude-skills-journalism
/plugin install journalism-core@claude-skills-journalism
```

이로써 다음 슬래시 커맨드가 사용 가능해집니다.

| 커맨드 | 출처 | 용도 |
|---|---|---|
| `/pp-seoul-cohort:cycle-map` | 본 플러그인 | 다수 산업 사이클 위치를 한 표로 |
| `/pp-seoul-cohort:industry-cycle` | 본 플러그인 | 단일 산업 사이클 딥다이브 |
| `/pp-seoul-cohort:research-feed` | 본 플러그인 | 글로벌·국내 7종 RSS 매크로/산업 요약 |
| `/pp-seoul-cohort:weekly-note` | 본 플러그인 | 1주차 리서치 노트 자동 저장 |
| `/journalism-core:fact-check-workflow` | journalism (외부) | 주장 사실확인 |
| `/journalism-core:source-verification` | journalism (외부) | 출처/딥페이크 검증 |

## 1주차 — 산업 사이클 분석 진행 순서

90분 세션 권장 흐름:

1. **전체 그림** (10분) — `/pp-seoul-cohort:research-feed` 로 최근 매크로/시장/한국 뉴스 훑기
2. **사이클 맵** (15분) — `/pp-seoul-cohort:cycle-map` 으로 산업 10개 위치 표 작성, 딥다이브 산업 1개 결정
3. **딥다이브** (40분) — `/pp-seoul-cohort:industry-cycle` 로 그 산업의 가설·5근거·반박 정리
4. **사실확인** (15분) — 근거 중 의심스러운 주장을 `/journalism-core:fact-check-workflow` 로 검증
5. **노트 저장** (10분) — `/pp-seoul-cohort:weekly-note` 로 한 페이지 산출물 자동 생성 → `~/Documents/pp-seoul-notes/week1/`

## 다음 주차 받기

```
/plugin marketplace update pp-seoul-cohort
```

새 주차 Skill이 즉시 활성화됩니다.

## 코호트 원칙 (모든 Skill이 따름)

- 종목 매수/매도/목표가 추천 금지. 산업·섹터 레벨에서 멈춤.
- 모든 결론은 **가설**로 표현, 근거와 반박 가능성 함께.
- AI는 결론 대신 내리는 도구가 아니라, 질문 정리·근거 보강용.
- 단기 매매보다 장기·가치 투자 관점.

## 더 알아보기 — "Claude Code로 웹앱까지" (선택 과제)

이 플러그인의 v0는 Skill이 사용자 바탕화면에 **로컬 Next.js 대시보드**를 만드는 노선이었습니다. RSS 위젯이 사이드바에 누적되는 풀스택 구현으로, "Claude Code로 풀스택을 어디까지 자동화할 수 있나"를 가늠해 볼 수 있는 표본입니다.

본 코호트에 **필수는 아닙니다**.

🔗 https://github.com/siwonblue/pp-seoul-cohort/tree/archive/dashboard-v0

직접 띄워보려면:

```bash
git clone --branch archive/dashboard-v0 https://github.com/siwonblue/pp-seoul-cohort.git pp-dashboard-archive
# 해당 브랜치의 README가 설치 방법을 안내합니다.
```

## 운영자: 새 주차 추가

1. `skills/<weekN-name>/SKILL.md` 한 장 작성 (frontmatter + 본문 markdown).
2. 커밋 + push.
3. 참여자에게 `/plugin marketplace update pp-seoul-cohort` 안내.

## 구조

```
.claude-plugin/         플러그인 메타 + 마켓플레이스 정의
skills/
  industry-cycle/       단일 산업 사이클 분석
  cycle-map/            다수 산업 비교 표
  research-feed/        RSS 7종 요약
  weekly-note/          1주차 산출물 자동 저장
```

## 브랜치

| 브랜치 | 용도 |
|---|---|
| `main` | Skill 묶음 (활성 코호트용) |
| `archive/dashboard-v0` | 초기 Next.js 대시보드 구현 (참고용 보존) |

## 라이선스

코호트 운영자(siwonblue) 결정 (현재 미설정).  
의존 플러그인 `claude-skills-journalism` 은 MIT (jamditis).
