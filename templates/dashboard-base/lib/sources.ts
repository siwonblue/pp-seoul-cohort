export type RssCategory = "macro" | "disclosure" | "ib-insights" | "news" | "korea";
export type RssCountry = "US" | "KR" | "GLOBAL";

export type RssSource = {
  id: string;
  week: number;
  label: string;
  category: RssCategory;
  country: RssCountry;
  url: string;
};

// 주차 스킬이 이 두 마커 사이에 소스를 누적 삽입합니다. 직접 편집하지 마세요.
export const sources: RssSource[] = [
  // <SOURCES_REGISTRY>
  // </SOURCES_REGISTRY>
];

export function getSourcesByWeek(week: number): RssSource[] {
  return sources.filter((s) => s.week === week);
}

export function getSourceById(id: string): RssSource | undefined {
  return sources.find((s) => s.id === id);
}
