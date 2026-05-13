"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, type LucideIcon } from "lucide-react";
import { sidebarItems, type SidebarItem } from "@/lib/sidebar-registry";

function groupByWeek(items: SidebarItem[]): Map<number, SidebarItem[]> {
  const map = new Map<number, SidebarItem[]>();
  for (const item of items) {
    if (!map.has(item.week)) map.set(item.week, []);
    map.get(item.week)!.push(item);
  }
  return map;
}

const DEFAULT_ICON: LucideIcon = TrendingUp;

export function Sidebar() {
  const pathname = usePathname();
  const grouped = groupByWeek(sidebarItems);
  const weeks = Array.from(grouped.keys()).sort((a, b) => a - b);

  return (
    <nav className="sidebar" aria-label="주차 위젯">
      <Link href="/" className="sidebar__brand">
        <div className="sidebar__brand-name">프프서울</div>
        <div className="sidebar__brand-sub">cohort research</div>
      </Link>

      {weeks.length === 0 && (
        <div className="sidebar__empty">
          위젯이 없습니다.
          <br />
          <code>/pp-seoul-cohort:week1</code> 을 실행해 보세요.
        </div>
      )}

      {weeks.map((week) => (
        <section className="sidebar__section" key={week}>
          <div className="sidebar__section-label">Week {String(week).padStart(2, "0")}</div>
          {grouped.get(week)!.map((item) => {
            const Icon = DEFAULT_ICON;
            const href = `/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.slug}
                href={href}
                className={`sidebar__item${active ? " sidebar__item--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="sidebar__item-icon" size={14} strokeWidth={2} />
                <span className="sidebar__item-text">{item.label}</span>
              </Link>
            );
          })}
        </section>
      ))}
    </nav>
  );
}
