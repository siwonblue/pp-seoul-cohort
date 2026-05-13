"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems, type SidebarItem } from "@/lib/sidebar-registry";

function groupByWeek(items: SidebarItem[]): Map<number, SidebarItem[]> {
  const map = new Map<number, SidebarItem[]>();
  for (const item of items) {
    if (!map.has(item.week)) map.set(item.week, []);
    map.get(item.week)!.push(item);
  }
  return map;
}

export function Sidebar() {
  const pathname = usePathname();
  const grouped = groupByWeek(sidebarItems);
  const weeks = Array.from(grouped.keys()).sort((a, b) => a - b);

  return (
    <nav className="sidebar" aria-label="주차 위젯">
      <Link href="/" className="sidebar__brand">
        프프
        <span className="sidebar__brand-sub">cohort dashboard</span>
      </Link>

      {weeks.length === 0 && (
        <div className="sidebar__empty">
          위젯 없음.<br />
          <code>/pp-seoul-cohort:week1</code>
        </div>
      )}

      {weeks.map((week) => (
        <section className="sidebar__section" key={week}>
          <div className="sidebar__section-label">Week {week}</div>
          {grouped.get(week)!.map((item) => {
            const href = `/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.slug}
                href={href}
                className={`sidebar__item${active ? " sidebar__item--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </section>
      ))}
    </nav>
  );
}
