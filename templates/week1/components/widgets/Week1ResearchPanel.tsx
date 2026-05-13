"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Landmark,
  Newspaper,
  BarChart3,
  FileText,
  Languages,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { getSourcesByWeek, type RssSource } from "@/lib/sources";

type FeedItem = { title: string; link: string; pubDate: string | null };

type FeedState =
  | { state: "loading" }
  | { state: "ok"; items: FeedItem[] }
  | { state: "error"; message: string };

type Category = RssSource["category"];

const CAT_META: Record<
  Category,
  { label: string; icon: LucideIcon; section: string; order: number }
> = {
  macro: { label: "거시", icon: Landmark, section: "GLOBAL MACRO", order: 1 },
  news: { label: "뉴스", icon: Newspaper, section: "MARKETS · NEWS", order: 2 },
  "ib-insights": {
    label: "IB",
    icon: BarChart3,
    section: "INSTITUTIONAL RESEARCH",
    order: 3,
  },
  disclosure: {
    label: "공시",
    icon: FileText,
    section: "DISCLOSURE",
    order: 4,
  },
  korea: { label: "한국", icon: Languages, section: "KOREA", order: 5 },
};

const COUNTRY_LABEL: Record<RssSource["country"], string> = {
  US: "US",
  KR: "KR",
  GLOBAL: "GL",
};

function formatRelative(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "방금";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const days = Math.floor(hr / 24);
  if (days < 30) return `${days}일 전`;
  return d.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
}

function isRecent(iso: string | null): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  return Date.now() - d.getTime() < 24 * 3600 * 1000;
}

function groupByCategory(sources: RssSource[]): Map<Category, RssSource[]> {
  const m = new Map<Category, RssSource[]>();
  for (const s of sources) {
    if (!m.has(s.category)) m.set(s.category, []);
    m.get(s.category)!.push(s);
  }
  return m;
}

export function Week1ResearchPanel() {
  const [sources] = useState<RssSource[]>(() => getSourcesByWeek(1));
  const [feeds, setFeeds] = useState<Record<string, FeedState>>(() => {
    const init: Record<string, FeedState> = {};
    for (const s of sources) init[s.id] = { state: "loading" };
    return init;
  });
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const [, setTick] = useState(0);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setFeeds(() => {
      const init: Record<string, FeedState> = {};
      for (const s of sources) init[s.id] = { state: "loading" };
      return init;
    });

    await Promise.allSettled(
      sources.map(async (s) => {
        try {
          const r = await fetch(
            `/api/rss?source=${encodeURIComponent(s.id)}&t=${Date.now()}`,
            { cache: "no-store" }
          );
          if (!r.ok) {
            const body = await r.json().catch(() => ({}));
            throw new Error(body?.error ?? r.statusText);
          }
          const data = await r.json();
          setFeeds((f) => ({
            ...f,
            [s.id]: { state: "ok", items: data.items ?? [] },
          }));
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          setFeeds((f) => ({
            ...f,
            [s.id]: { state: "error", message },
          }));
        }
      })
    );

    setRefreshing(false);
    setLastRefreshedAt(new Date());
  }, [sources]);

  useEffect(() => {
    refresh();
    // Re-render relative times every 30s
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, [refresh]);

  if (sources.length === 0) {
    return (
      <div className="empty-state__body">
        1주차 소스가 등록되지 않았습니다.
      </div>
    );
  }

  const grouped = groupByCategory(sources);
  const categories = Array.from(grouped.keys()).sort(
    (a, b) => CAT_META[a].order - CAT_META[b].order
  );

  return (
    <>
      <div className="research__toolbar">
        <span>
          {lastRefreshedAt
            ? `마지막 갱신 ${formatRelative(lastRefreshedAt.toISOString())}`
            : "갱신 대기"}
        </span>
        <button
          type="button"
          className={`research__refresh${
            refreshing ? " research__refresh--loading" : ""
          }`}
          onClick={refresh}
          disabled={refreshing}
          aria-label="피드 다시 불러오기"
        >
          <RefreshCw
            className="research__refresh-icon"
            size={12}
            strokeWidth={2.2}
          />
          {refreshing ? "갱신 중" : "Refresh"}
        </button>
      </div>

      <div className="research">
        {categories.map((cat) => {
          const meta = CAT_META[cat];
          const items = grouped.get(cat)!;
          return (
            <section key={cat}>
              <header className="section__header">
                <h2 className="section__title">{meta.section}</h2>
                <span className="section__count">{items.length}</span>
                <div className="section__rule" />
              </header>
              <div className="rss-grid">
                {items.map((s) => {
                  const state = feeds[s.id];
                  const Icon = meta.icon;
                  const hasItems =
                    state?.state === "ok" && state.items.length > 0;
                  const recent =
                    state?.state === "ok" &&
                    state.items.some((i) => isRecent(i.pubDate));

                  return (
                    <article className="card" key={s.id}>
                      <header className="card__header">
                        <div className="card__source">
                          <Icon
                            className="card__source-icon"
                            size={14}
                            strokeWidth={2}
                          />
                          <span className="card__label">{s.label}</span>
                          <span className="card__country">
                            {COUNTRY_LABEL[s.country]}
                          </span>
                        </div>
                        <div className="card__meta">
                          {hasItems && (
                            <span className="card__count">
                              {state.items.length}
                            </span>
                          )}
                          {recent && (
                            <span
                              className="card__live"
                              aria-label="최근 24시간 내 업데이트"
                            />
                          )}
                        </div>
                      </header>

                      {state?.state === "loading" && (
                        <div className="card__loading">불러오는 중</div>
                      )}

                      {state?.state === "error" && (
                        <div className="card__error">{state.message}</div>
                      )}

                      {state?.state === "ok" && state.items.length === 0 && (
                        <div className="card__loading">아이템 없음</div>
                      )}

                      {state?.state === "ok" && state.items.length > 0 && (
                        <ul className="card__items">
                          {state.items.map((it, idx) => (
                            <li key={idx}>
                              <a
                                className="card__item"
                                href={it.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className="card__item-title">
                                  {it.title}
                                </div>
                                {it.pubDate && (
                                  <div className="card__item-time">
                                    {formatRelative(it.pubDate)}
                                  </div>
                                )}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
