import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";

export const metadata = {
  title: "프프 대시보드",
  description: "프프 코호트 교육 — 주차별 위젯이 누적되는 로컬 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell">
          <Sidebar />
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
