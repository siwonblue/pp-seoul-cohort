import { Week1ResearchPanel } from "@/components/widgets/Week1ResearchPanel";

export default function Week1ResearchPage() {
  return (
    <>
      <header className="page-header">
        <div className="page-header__week">Week 1</div>
        <h1 className="page-header__title">산업 사이클 리서치</h1>
        <p className="page-header__subtitle">
          글로벌 IB · 거시 · 시장 뉴스 · 한국 매체 RSS를 한 화면에서 훑습니다.
          출처를 확장하기 전에 가설을 먼저 잡고, 어느 출처가 가설을 강화/반박하는지 표시하세요.
        </p>
      </header>
      <Week1ResearchPanel />
    </>
  );
}
