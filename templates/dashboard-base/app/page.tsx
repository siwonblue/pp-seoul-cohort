import { sidebarItems } from "@/lib/sidebar-registry";

export default function Home() {
  const hasWidgets = sidebarItems.length > 0;

  return (
    <div className="empty-state">
      <h1 className="empty-state__title">프프 대시보드</h1>
      <p className="empty-state__body">
        {hasWidgets
          ? "사이드바에서 주차를 선택해 시작하세요."
          : "아직 위젯이 없습니다. /pp-seoul-cohort:week1 을 실행하면 첫 위젯이 추가됩니다."}
      </p>
      <p className="empty-state__hint">매주 새 위젯이 사이드바에 누적됩니다.</p>
    </div>
  );
}
