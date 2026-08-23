import { congestionStyle, noDataStyle, type Congestion } from "./congestion";

export function getCongestionLevel(
  cnctrRate: string | number | null | undefined,
): Congestion | null {
  if (cnctrRate === null || cnctrRate === undefined) {
    return null;
  }

  const rate =
    typeof cnctrRate === "string" ? parseFloat(cnctrRate) : cnctrRate;

  if (Number.isNaN(rate)) {
    return null;
  }

  const clamped = Math.min(100, Math.max(0, rate));

  const level = (Object.keys(congestionStyle) as Congestion[]).find(
    (key) =>
      clamped >= congestionStyle[key].min &&
      clamped <= congestionStyle[key].max,
  );

  return level ?? "혼잡";
}

export function getCongestionStyle(
  cnctrRate: string | number | null | undefined,
) {
  const level = getCongestionLevel(cnctrRate);

  if (level === null) {
    return noDataStyle;
  }

  return congestionStyle[level];
}
