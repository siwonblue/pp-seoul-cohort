---
name: research-feed
description: 프프서울 1주차 — Federal Reserve, WSJ, CNBC, Seeking Alpha, 한국경제 등 7종 RSS를 동시에 가져와 최근 헤드라인을 매크로/산업 관점으로 묶어 요약합니다. 특정 산업명이 주어지면 해당 산업 관련도 높은 항목만 필터. 종목 추천 X.
allowed-tools: [WebFetch, Bash]
---

# 글로벌·국내 리서치 피드 요약

프프서울 1주차의 정보 수집 단계. 7종 RSS를 한 번에 훑어 **매크로·산업 관점**으로 묶어 보여줍니다.

## 코호트 원칙

- 종목 추천 금지.
- 단순 헤드라인 나열 X. 매크로/산업 관점의 **묶음 + 한 줄 의미**를 제공.
- 모든 항목에 출처(매체명) + 시간 표기.

## 절차

### 1) 산업 필터 옵션 확인

사용자에게 묻습니다 (한 번):

> 특정 산업/주제로 필터할까요? (예: "반도체", "AI", "금리". 비워두면 매크로/시장 전반으로 진행)

### 2) RSS 7종 fetch

다음 7개 URL을 WebFetch로 가져옵니다. 각 응답에서 최신 5개 아이템(title, link, pubDate)을 추출.

| 카테고리 | 매체 | URL |
|---|---|---|
| 매크로 | Federal Reserve | https://www.federalreserve.gov/feeds/press_all.xml |
| 시장 뉴스 | WSJ Markets | https://feeds.content.dowjones.io/public/rss/RSSMarketsMain |
| 시장 뉴스 | WSJ World | https://feeds.content.dowjones.io/public/rss/RSSWorldNews |
| 시장 뉴스 | CNBC Finance | https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664 |
| 기관 리서치 | Seeking Alpha Currents | https://seekingalpha.com/market_currents.xml |
| 기관 리서치 | Seeking Alpha Main | https://seekingalpha.com/feed.xml |
| 한국 | 한국경제 — 경제 | https://www.hankyung.com/feed/economy |

가져오기가 실패한 출처는 그대로 보고 (그 출처만 빈 결과로). 7개 모두 실패하지 않는 한 진행.

### 3) 분류 + 요약

다음 카테고리로 묶어 출력 (필터가 없을 때):

```markdown
## 📊 매크로 (Fed/금리/정책)
- [한 줄 의미 + 출처(매체, 시간)]
- ...

## 🌐 시장 뉴스 (WSJ/CNBC)
- ...

## 🏦 기관 리서치 (Seeking Alpha)
- ...

## 🇰🇷 한국 (한국경제)
- ...
```

필터가 있을 때 (예: "반도체"):

```markdown
## "반도체" 관련 (전 출처 종합)
- [매체 · 시간] 한 줄 의미. 헤드라인 원문은 링크로.
- ...

## 매크로 흐름 (참고)
- [반도체와 관련 깊은 매크로 항목만 1-3개]
```

### 4) 다음 액션 제안

마지막에:

> 가장 관심 가는 산업이 있다면 `/pp-seoul-cohort:industry-cycle` 로 깊게 분석하거나, 다수 산업을 비교하려면 `/pp-seoul-cohort:cycle-map` 을 실행하세요.
>
> 헤드라인 중 사실확인이 필요하다면 `/journalism-core:fact-check-workflow` 활용 권장.

## 안전 규칙

- 헤드라인을 **직접 인용**할 때 매체와 시간 명시. 의역은 허용하지만 곡해 금지.
- 종목 코드/티커는 헤드라인에 포함되어 있어도 그대로만 전달, 매수/매도 시그널로 해석 X.
- "방금/N시간 전" 형식의 상대 시간 표기.
- 한국어 출력 (출처명은 원문 그대로).
