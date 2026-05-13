import { Week1ResearchPanel } from "@/components/widgets/Week1ResearchPanel";
import { getSourcesByWeek } from "@/lib/sources";

export default function Week1ResearchPage() {
  const count = getSourcesByWeek(1).length;
  return (
    <>
      <header className="page-header">
        <div className="page-header__row">
          <span className="page-header__chip">Week 01 · Research</span>
          <span className="page-header__meta">
            <span className="page-header__meta-dot" aria-hidden />
            {count} sources · live
          </span>
        </div>
        <h1 className="page-header__title">산업 사이클 리서치</h1>
        <p className="page-header__subtitle">
          글로벌 거시 · 시장 뉴스 · 기관 리서치 · 국내 매체를 한 화면에서
          훑습니다. 출처를 늘리기 전에 가설을 먼저 잡고, 어느 출처가 그
          가설을 강화하거나 반박하는지 표시하세요.
        </p>
      </header>
      <Week1ResearchPanel />
    </>
  );
}
