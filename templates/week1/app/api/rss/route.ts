import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import { getSourceById } from "@/lib/sources";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UA = "Mozilla/5.0 pp-seoul-cohort siwonblue@users.noreply.github.com";

const parser = new Parser();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("source");
  if (!id) {
    return NextResponse.json({ error: "missing source param" }, { status: 400 });
  }

  const source = getSourceById(id);
  if (!source) {
    return NextResponse.json({ error: `unknown source: ${id}` }, { status: 404 });
  }

  try {
    // 최소 헤더만 전송. SEC EDGAR 등 일부 출처는 Accept/Accept-Language를
    // 보내면 봇으로 판정해 403을 반환하므로 UA만 명시합니다.
    const res = await fetch(source.url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(9000),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `upstream ${res.status}`, source: source.id },
        { status: 502 }
      );
    }

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    const items = (feed.items ?? []).slice(0, 8).map((it) => ({
      title: it.title ?? "(제목 없음)",
      link: it.link ?? "#",
      pubDate: it.isoDate ?? it.pubDate ?? null,
    }));

    return NextResponse.json({
      source: source.id,
      label: source.label,
      feedTitle: feed.title ?? source.label,
      items,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch failed";
    return NextResponse.json(
      { error: message, source: source.id },
      { status: 502 }
    );
  }
}
