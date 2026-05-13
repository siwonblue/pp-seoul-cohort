---
name: week1
description: 프프 코호트 1주차 — 사용자 바탕화면에 로컬 Next.js 대시보드(pp-dashboard)를 만들고, 사이드바에 "1주차 · 산업 사이클 리서치" 위젯(글로벌 IB·매크로·시장뉴스 RSS 7종)을 누적 추가합니다. macOS/Windows/WSL을 자동 감지합니다.
---

# Week 1 — 산업 사이클 RSS 리서치 위젯

이 스킬은 참여자의 **바탕화면**에 `pp-dashboard/`라는 Next.js 앱을 만들거나 갱신합니다. 1주차 위젯이 사이드바에 추가됩니다. 이후 주차 스킬이 같은 대시보드에 위젯을 누적합니다.

## 절차

각 단계를 **반드시 순서대로** 실행하고, 단계마다 결과를 사용자에게 한 줄로 요약해 주세요.

### 1) OS 감지 및 바탕화면 경로 해석

Bash 도구로 다음을 시도하고 결과로 `$DESKTOP` 변수를 정합니다.

- macOS / Linux:
  ```bash
  uname -s
  ```
  결과가 `Darwin` 또는 `Linux`이면 `DESKTOP="$HOME/Desktop"`.
- Windows (PowerShell가 가능한 환경, 예: Git Bash + powershell.exe, 또는 PowerShell 직접):
  ```bash
  powershell.exe -NoProfile -Command "[Environment]::GetFolderPath('Desktop')"
  ```
  반환된 경로를 `DESKTOP`으로 사용 (OneDrive 리다이렉트 자동 해결).
- WSL: `uname -a`에 `microsoft` 또는 `WSL`이 포함되면 위 PowerShell 호출을 사용하고 `wslpath`로 변환:
  ```bash
  wslpath "$(powershell.exe -NoProfile -Command "[Environment]::GetFolderPath('Desktop')" | tr -d '\r')"
  ```

`ls "$DESKTOP"`이 실패하면 사용자에게 "바탕화면 경로를 찾을 수 없습니다. 직접 경로를 알려주세요"라고 묻고 중단합니다. 임의로 디렉터리를 생성하지 마세요.

### 2) Node / npm 버전 검증 (보수적)

대시보드는 `package-lock.json` 기반 `npm ci`로 설치되어 모든 참여자가 **완전히 동일한 의존성 트리**를 갖게 됩니다. 그 전제로 Node 20.11+, npm 10+ 가 요구됩니다.

```bash
node --version   # → v20.11.0 이상 필요
npm --version    # → 10.0.0 이상 필요
```

- Node가 없거나 20.11 미만이면 다음 메시지로 중단:
  > Node.js 20.11 LTS 이상이 필요합니다. https://nodejs.org/ 에서 "LTS" 버튼으로 설치한 뒤 터미널을 다시 열고 실행해 주세요. (참고: Claude Code와 Node.js는 별개 도구입니다.)
- npm이 10 미만이면 안내:
  > npm 10+ 가 필요합니다. `npm install -g npm@latest` 로 업그레이드해 주세요.

### 2.5) macOS iCloud Desktop 동기화 감지 (참고용, 비차단)

```bash
[ -L "$HOME/Desktop" ] && echo "iCloud Desktop sync detected"
```

감지되면 다음 한 줄을 출력하고 계속 진행하세요:

> 참고: macOS iCloud Desktop 동기화가 켜져있어 첫 `npm ci`가 평소보다 1-2분 더 걸릴 수 있습니다.

### 3) 변수 정리

- `DASH="$DESKTOP/pp-dashboard"`
- `PLUGIN="${CLAUDE_PLUGIN_ROOT}"` (플러그인 설치 경로 — Claude Code가 주입)

### 4) 최초 실행 분기 (DASH가 없을 때만)

`test -d "$DASH"` 가 false이면 베이스 대시보드 복사:

```bash
mkdir -p "$DASH"
cp -R "$PLUGIN/templates/dashboard-base/." "$DASH/"
```

`cp -R`의 `.` 끝을 잊지 마세요 — 숨김 파일(`.gitignore` 등) 포함.

사용자에게 한 줄: `"베이스 대시보드를 ${DASH}에 생성했습니다."`

### 5) 1주차 위젯 파일 복사 (매번)

```bash
cp -R "$PLUGIN/templates/week1/." "$DASH/"
```

이 호출은 멱등합니다 — 같은 파일을 덮어써도 내용이 동일하므로 결과 같음.

### 6) 사이드바 등록 (멱등 append)

`$DASH/lib/sidebar-registry.ts` 파일을 Read 도구로 읽어주세요. `"week1-research"` 문자열이 이미 있으면 6단계 skip.

없으면, `// <SIDEBAR_REGISTRY>` 마커 **다음 줄**에 아래 정확한 한 줄을 Edit으로 삽입:

```ts
  { slug: "week1-research", label: "1주차 · 산업 사이클 리서치", week: 1 },
```

### 7) RSS 소스 등록 (멱등 append)

`$DASH/lib/sources.ts` 파일을 읽어 `"fed-press"` 문자열이 있으면 skip.

없으면 `// <SOURCES_REGISTRY>` 다음 줄에 아래 7줄을 정확히 삽입:

```ts
  { id: "fed-press", week: 1, label: "Federal Reserve — Press Releases", category: "macro", country: "US", url: "https://www.federalreserve.gov/feeds/press_all.xml" },
  { id: "wsj-markets", week: 1, label: "WSJ — Markets", category: "news", country: "US", url: "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain" },
  { id: "wsj-world", week: 1, label: "WSJ — World", category: "news", country: "US", url: "https://feeds.content.dowjones.io/public/rss/RSSWorldNews" },
  { id: "cnbc-finance", week: 1, label: "CNBC — Finance", category: "news", country: "US", url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664" },
  { id: "seekingalpha-currents", week: 1, label: "Seeking Alpha — Market Currents", category: "ib-insights", country: "US", url: "https://seekingalpha.com/market_currents.xml" },
  { id: "seekingalpha-main", week: 1, label: "Seeking Alpha — Research", category: "ib-insights", country: "US", url: "https://seekingalpha.com/feed.xml" },
  { id: "hankyung-economy", week: 1, label: "한국경제 — 경제", category: "korea", country: "KR", url: "https://www.hankyung.com/feed/economy" },
```

### 8) 의존성 설치 (최초 실행일 때만, `npm ci` 사용)

4단계에서 베이스를 새로 깐 경우에만 실행. 반드시 `npm install`이 아니라 **`npm ci`** 를 사용해 `package-lock.json`을 그대로 따르도록 합니다 (참여자 간 버전 편차 0).

```bash
cd "$DASH" && npm ci
```

오래 걸릴 수 있음을 미리 알리세요 (보통 30초~2분, iCloud Desktop인 경우 더 김).

`npm ci`가 lockfile 부재로 실패하면 (정상 흐름에선 발생 X), 사용자에게 그 사실을 보고하고 중단하세요. 자동으로 `npm install`로 폴백하지 마세요 — 환경 통일성이 깨집니다.

### 9) 최종 안내

다음 문구를 그대로 사용자에게 보여주세요 (실제 DASH 경로로 치환):

```
✅ 1주차 위젯 추가 완료
   대시보드 위치: <DASH>
   실행:
     cd "<DASH>"
     npm run dev
   브라우저: 터미널에 출력되는 URL을 열어주세요 (보통 http://localhost:3000).
            3000번 포트가 사용 중이면 Next.js가 자동으로 3001, 3002로 이동합니다.
   사이드바에서 "1주차 · 산업 사이클 리서치"를 클릭하세요.
   권장 브라우저: Chrome 또는 Edge 최신 (Safari/Firefox도 정상 동작).
```

## 안전 규칙

- `$DASH` 바깥은 절대 수정하지 않습니다.
- `npm install`과 `npm run dev` 외에 다른 명령(`git`, 전역 `npm`, `brew` 등)은 실행하지 않습니다.
- 사이드바/소스 등록은 마커 사이에만 삽입하며, 같은 id가 있으면 추가하지 않습니다(중복 금지).
- 실패 시 부분 변경을 자동 롤백하지 마세요. 어디까지 진행됐는지 정확히 보고하고 사용자가 결정하게 합니다.
