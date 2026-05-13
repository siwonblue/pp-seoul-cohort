# 프프 대시보드 — 디자인 토큰

기준 미감: **Linear (linear.app)** 다크 우선. 정확한 hex는 비공개라 근사값이지만, 시각적으로 같은 결을 만들도록 보정한 토큰입니다. `templates/dashboard-base/app/globals.css`에 CSS 변수로 박혀 있고, 위젯들은 이 변수만 참조합니다.

## 컬러 — 다크 (기본)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#08090A` | 페이지 배경 |
| `--bg-elevated` | `#0F1011` | 상단 바, 패널 오버레이 |
| `--surface` | `#131415` | 카드, 사이드바 배경 |
| `--surface-hover` | `#1C1D1F` | 호버 표면 |
| `--surface-active` | `#222326` | 활성 표면 |
| `--border` | `#1F2023` | 기본 구분선 |
| `--border-strong` | `#2A2B2F` | 강조 구분선 |
| `--text-primary` | `#F7F8F8` | 본문 |
| `--text-secondary` | `#8A8F98` | 보조 텍스트 |
| `--text-tertiary` | `#62666D` | 캡션, 메타 |
| `--accent` | `#5E6AD2` | Linear 시그니처 인디고 |
| `--accent-hover` | `#7A82DA` | accent hover |
| `--accent-soft` | `rgba(94,106,210,0.12)` | accent 배경 |
| `--success` | `#4CB782` | |
| `--warning` | `#F2C94C` | |
| `--danger` | `#EB5757` | |

## 타이포

- 본문 패밀리: `'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro', 'Segoe UI', system-ui, sans-serif`
- 디스플레이: `'Inter Display', 'Inter Variable', system-ui, sans-serif`
- 모노: `ui-monospace, 'JetBrains Mono', monospace`
- **본문 기본 13px** (Linear 룩의 핵심)
- weight: 400 / 510 / 590 / 680
- letter-spacing: 본문 `-0.003em`, 디스플레이 `-0.022em`

## 사이즈 스케일

`xs 11 / sm 12 / base 13 / md 14 / lg 16 / xl 18 / 2xl 22 / 3xl 28 / 4xl 36`

## 간격

`0 / 2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64` (px)

## 라운드 / 그림자

- radius: `xs 4 / sm 6 / md 8 / lg 12 / xl 16`
- shadow-low: `0 1px 2px rgba(0,0,0,0.32)`
- shadow-med: `0 4px 12px rgba(0,0,0,0.36), 0 1px 2px rgba(0,0,0,0.24)`
- focus-ring: `0 0 0 2px rgba(94,106,210,0.45)`

## 사이드바 (결정적 디테일)

- 너비: **224px** (collapsed 56px)
- 아이템 높이: **28px**, padding `6px 8px`, radius `6px`, gap `1px`
- 아이콘: 16px
- 본문: 13px, weight 510
- 섹션 라벨: 11px, weight 590 (대문자 X)
- idle: `--text-secondary`, hover: `--surface-hover`, active: `--surface-active` + 텍스트는 `--text-primary`

## 향후 브랜드화

지금은 Linear 그대로지만, 프프 컬러가 정해지면 `--accent` 하나만 교체하면 전체 분위기가 따라옵니다. accent 외 표면/텍스트 토큰은 그대로 유지 권장 (다크 베이스의 가독성을 위해 검증된 값).
