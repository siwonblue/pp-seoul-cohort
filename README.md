# pp-seoul-cohort

프프 금융·AI 리터러시 코호트 교육의 **주차별 사이드바 위젯이 누적되는 로컬 Next.js 대시보드**를 만들어 주는 Claude Code 플러그인입니다.

매주 운영자가 플러그인을 업데이트하면, 참여자는 `/plugin marketplace update`로 받아 새 주차 스킬을 실행만 하면 사이드바에 그 주의 위젯이 한 칸 더 붙습니다.

## 지원 환경 (보수적으로 잠금)

| 항목 | 요구 사양 | 비고 |
|---|---|---|
| Claude Code | 최신 안정 버전 (플러그인 marketplace 지원) | `claude --version` |
| Node.js | **20.11.0 LTS 이상** (22 LTS / 24 가능) | https://nodejs.org/ 에서 "LTS" 설치 |
| npm | **10.0.0 이상** | Node 20.11+에 기본 포함 |
| 운영체제 | macOS 12+, Windows 10/11, WSL 2 | Skill이 자동 감지 |
| 셸 | bash/zsh (mac/linux), PowerShell + Git Bash (Windows) | Windows에서 PowerShell 단독도 가능 |
| 디스크 | 약 500MB (node_modules 포함) | |
| 브라우저 | Chrome / Edge / Safari 최신 | 권장: Chrome |
| 인터넷 | https 통신 (RSS 출처 + npm registry) | 사내 프록시 환경은 별도 설정 필요 |

의존성은 `templates/dashboard-base/package-lock.json`으로 잠겨 있고 Skill이 `npm ci`로 설치하므로, 위 조건만 충족하면 **모든 참여자가 동일한 의존성 트리 (63 패키지, 모두 정확히 같은 버전)** 를 갖습니다.

## 참여자 사용법 (1주차 세션)

```bash
# 1. 마켓플레이스 등록 (최초 1회)
/plugin marketplace add siwonblue/pp-seoul-cohort

# 2. 플러그인 설치
/plugin install pp-seoul-cohort@pp-seoul-cohort

# 3. 1주차 스킬 실행
/pp-seoul-cohort:week1

# 4. 안내된 명령으로 대시보드 띄우기
cd ~/Desktop/pp-dashboard   # mac/linux
npm run dev
# → http://localhost:3000 → 사이드바 "1주차 · 산업 사이클 리서치"
```

Windows에서는 바탕화면이 OneDrive로 리다이렉트될 수 있어 스킬이 자동으로 PowerShell의 `[Environment]::GetFolderPath('Desktop')`로 해석합니다.

## 다음 주차 받기

```bash
/plugin marketplace update pp-seoul-cohort
/pp-seoul-cohort:week2
```

기존 대시보드는 유지되고 사이드바에 2주차 항목이 추가됩니다 (멱등 — 여러 번 돌려도 중복 안 생김).

## 운영자: 새 주차 추가하기

1. `skills/weekN/SKILL.md` 를 `skills/week1/SKILL.md` 복사해서 N 자리만 바꿔 새로 만듭니다.
2. `templates/weekN/` 디렉터리를 만들어 그 주차에 추가될 파일(페이지, 컴포넌트)을 넣습니다.
3. SKILL.md 안의 사이드바 항목, sources 항목 인라인 스니펫을 그 주차 내용으로 바꿉니다.
4. 커밋 + push.
5. 참여자에게 "/plugin marketplace update pp-seoul-cohort 한 번 돌리고 /pp-seoul-cohort:weekN 실행하세요" 안내.

## 구조

```
.claude-plugin/         # 플러그인 메타 + 마켓플레이스 정의
skills/weekN/SKILL.md   # 주차별 스킬 (Claude 따라 실행)
templates/
  dashboard-base/       # 최초 1회만 복사되는 Next.js 베이스
  weekN/                # 매 주차 추가로 복사되는 위젯 파일
design.md               # Linear 기반 디자인 토큰
```

## 디자인

`design.md` 참조. Linear 다크 우선 미감을 기본으로 하며, 추후 프프 브랜드 컬러가 정해지면 `--accent` 변수 하나만 교체하면 됩니다.
