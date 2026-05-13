"use client";

import { useEffect, useState } from "react";
import { getSourcesByWeek, type RssSource } from "@/lib/sources";

type FeedItem = { title: string; link: string; pubDate: string | null };

type FeedState =
  | { state: "loading" }
  | { state: "ok"; items: FeedItem[] }
  | { state: "error"; message: string };

const CATEGORY_KO: Record<RssSource["category"], string> = {
  macro: "거시",
  disclosure: "공시",
  "ib-insights": "IB",
  news: "뉴스",
  korea: "한국",
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
}

export function Week1ResearchPanel() {
  const [sources] = useState<RssSource[]>(() => getSourcesByWeek(1));
  const [feeds, setFeeds] = useState<Record<string, FeedState>>(() => {
    const init: Record<string, FeedState> = {};
    for (const s of sources) init[s.id] = { state: "loading" };
    return init;
  });

  useEffect(() => {
    let cancelled = false;

    for (const s of sources) {
      fetch(`/api/rss?source=${encodeURIComponent(s.id)}`)
        .then(async (r) => {
          if (!r.ok) {
            const body = await r.json().catch(() => ({}));
            throw new Error(body?.error ?? r.statusText);
          }
          return r.json();
        })
        .then((data) => {
          if (cancelled) return;
          setFeeds((f) => ({
            ...f,
            [s.id]: { state: "ok", items: data.items ?? [] },
          }));
        })
        .catch((err) => {
          if (cancelled) return;
          setFeeds((f) => ({
            ...f,
            [s.id]: { state: "error", message: String(err?.message ?? err) },
          }));
        });
    }

    return () => {
      cancelled = true;
    };
  }, [sources]);

  if (sources.length === 0) {
    return (
      <div className="empty-state__body">
        1주차 소스가 등록되지 않았습니다. SKILL이 sources.ts에 항목을 삽입했는지 확인하세요.
      </div>
    );
  }

  return (
    <div className="rss-grid">
      {sources.map((s) => {
        const state = feeds[s.id];
        return (
          <article className="card" key={s.id}>
            <div className="rss-feed__header">
              <div className="rss-feed__label">{s.label}</div>
              <div className="rss-feed__category">
                {CATEGORY_KO[s.category]} · {s.country}
              </div>
            </div>

            {state?.state === "loading" && (
              <div className="rss-feed__loading">불러오는 중…</div>
            )}

            {state?.state === "error" && (
              <div className="rss-feed__error">{state.message}</div>
            )}

            {state?.state === "ok" && state.items.length === 0 && (
              <div className="rss-feed__loading">아이템 없음</div>
            )}

            {state?.state === "ok" && state.items.length > 0 && (
              <ul className="rss-feed__items">
                {state.items.map((it, idx) => (
                  <li className="rss-item" key={idx}>
                    <a
                      href={it.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="rss-item__title">{it.title}</div>
                      {it.pubDate && (
                        <div className="rss-item__date">
                          {formatDate(it.pubDate)}
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
  );
}
