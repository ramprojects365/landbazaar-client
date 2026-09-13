export const DEFAULT_DEKHOLAND_SCORE = 87;

export const DEKHOLAND_SCORE_COLORS = {
  green: "#16A34A",
  yellow: "#EAB308",
  red: "#DC2626",
} as const;

export type DekhoLandScoreBreakdownKey =
  | "documents"
  | "location"
  | "growth"
  | "price"
  | "road";

export type DekhoLandScoreBreakdownItem = {
  key: DekhoLandScoreBreakdownKey;
  label: string;
  score: number;
};

export type DekhoLandScoreDetails = {
  score: number;
  ratingLabel: string;
  lastUpdated: string;
  breakdown: DekhoLandScoreBreakdownItem[];
};

export const DEFAULT_DEKHOLAND_SCORE_BREAKDOWN: DekhoLandScoreBreakdownItem[] = [
  { key: "documents", label: "Documents & Verification", score: 95 },
  { key: "location", label: "Location & Connectivity", score: 88 },
  { key: "growth", label: "Growth Potential", score: 84 },
  { key: "price", label: "Price Value", score: 82 },
  { key: "road", label: "Road & Infrastructure", score: 92 },
];

export const DEFAULT_DEKHOLAND_SCORE_UPDATED = "13 Sep 2026";

const BREAKDOWN_KEYS: DekhoLandScoreBreakdownKey[] = [
  "documents",
  "location",
  "growth",
  "price",
  "road",
];

export function parseDekhoLandScore(value: unknown): number | undefined {
  if (value == null || value === "") return undefined;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return undefined;
  return Math.round(numeric);
}

export function resolveDekhoLandScore(value?: unknown): number {
  const parsed = parseDekhoLandScore(value);
  if (parsed == null) return DEFAULT_DEKHOLAND_SCORE;
  return Math.min(100, Math.max(0, parsed));
}

export function getDekhoLandScoreColor(score: number): string {
  if (score >= 80) return DEKHOLAND_SCORE_COLORS.green;
  if (score >= 70) return DEKHOLAND_SCORE_COLORS.yellow;
  return DEKHOLAND_SCORE_COLORS.red;
}

export function getDekhoLandScoreTone(score: number): "excellent" | "good" | "average" {
  if (score >= 80) return "excellent";
  if (score >= 70) return "good";
  return "average";
}

export function getDekhoLandScoreLabel(score: number): string {
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  return "Average";
}

function isBreakdownKey(value: string): value is DekhoLandScoreBreakdownKey {
  return BREAKDOWN_KEYS.includes(value as DekhoLandScoreBreakdownKey);
}

function formatScoreDate(value?: string | null): string {
  if (!value?.trim()) return DEFAULT_DEKHOLAND_SCORE_UPDATED;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value.trim();
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function parseBreakdown(value: unknown): DekhoLandScoreBreakdownItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const score = parseDekhoLandScore(record.score);
    if (score == null) return [];
    const rawKey = String(record.key || "").trim();
    const key = isBreakdownKey(rawKey) ? rawKey : BREAKDOWN_KEYS[index];
    if (!key) return [];
    const defaultLabel =
      DEFAULT_DEKHOLAND_SCORE_BREAKDOWN.find((row) => row.key === key)?.label ||
      String(record.label || "Score");
    return [
      {
        key,
        label: String(record.label || defaultLabel),
        score: Math.min(100, Math.max(0, score)),
      },
    ];
  });
  return items.length ? items : undefined;
}

export function getApiDekhoLandScoreDetails(item?: {
  dekhoLandScoreDetails?: unknown;
  scoreDetails?: unknown;
  lastUpdated?: unknown;
} | null): { lastUpdated?: string; breakdown?: unknown } | undefined {
  if (!item) return undefined;
  const raw = item.dekhoLandScoreDetails ?? item.scoreDetails;
  if (raw && typeof raw === "object") {
    const record = raw as Record<string, unknown>;
    return {
      lastUpdated:
        typeof record.lastUpdated === "string"
          ? record.lastUpdated
          : typeof item.lastUpdated === "string"
            ? item.lastUpdated
            : undefined,
      breakdown: record.breakdown ?? record.items,
    };
  }
  if (typeof item.lastUpdated === "string") {
    return { lastUpdated: item.lastUpdated };
  }
  return undefined;
}

export function resolveDekhoLandScoreDetails(
  score?: unknown,
  details?: { lastUpdated?: string | null; breakdown?: unknown } | null,
): DekhoLandScoreDetails {
  const resolvedScore = resolveDekhoLandScore(score);
  return {
    score: resolvedScore,
    ratingLabel: getDekhoLandScoreLabel(resolvedScore),
    lastUpdated: formatScoreDate(details?.lastUpdated),
    breakdown: parseBreakdown(details?.breakdown) ?? DEFAULT_DEKHOLAND_SCORE_BREAKDOWN,
  };
}

export function getApiDekhoLandScore(item?: {
  dekhoLandScore?: unknown;
  dekholandScore?: unknown;
  score?: unknown;
} | null): unknown {
  if (!item) return undefined;
  if (item.dekhoLandScore != null && item.dekhoLandScore !== "") {
    return item.dekhoLandScore;
  }
  if (item.dekholandScore != null && item.dekholandScore !== "") {
    return item.dekholandScore;
  }
  if (item.score != null && item.score !== "") {
    return item.score;
  }
  return undefined;
}
