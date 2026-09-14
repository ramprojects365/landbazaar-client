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

const MOCK_OVERALL_SCORES = [
  62, 65, 68, 71, 74, 76, 78, 81, 82, 84, 87, 89, 91, 92, 94,
];

const MOCK_SCORE_OVERRIDES: Record<string, number> = {
  "9c6cab59-a9e3-4663-854c-c0dbd77c81f9": 94,
};

function hashSeed(seed?: string | number | null): number {
  const text = String(seed ?? "dekholand");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getMockDekhoLandScore(seed?: string | number | null): number {
  if (seed != null && seed !== "") {
    const override = MOCK_SCORE_OVERRIDES[String(seed)];
    if (override != null) return override;
  }
  return MOCK_OVERALL_SCORES[hashSeed(seed) % MOCK_OVERALL_SCORES.length];
}

function getMockDekhoLandScoreBreakdown(
  overall: number,
  seed?: string | number | null,
): DekhoLandScoreBreakdownItem[] {
  const offsets = [8, 4, -1, -4, 6];
  return DEFAULT_DEKHOLAND_SCORE_BREAKDOWN.map((item, index) => {
    const jitter = (hashSeed(`${seed ?? "dekholand"}-${item.key}`) % 5) - 2;
    const score = Math.min(98, Math.max(60, overall + offsets[index] + jitter));
    return { ...item, score };
  });
}

export function parseDekhoLandScore(value: unknown): number | undefined {
  if (value == null || value === "") return undefined;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return undefined;
  return Math.round(numeric);
}

export function resolveDekhoLandScore(
  value?: unknown,
  seed?: string | number | null,
): number {
  const parsed = parseDekhoLandScore(value);
  if (parsed == null) return getMockDekhoLandScore(seed);
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
} | null): { lastUpdated?: string; breakdown?: unknown } | undefined {
  if (!item) return undefined;
  const raw = item.dekhoLandScoreDetails;
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  return {
    lastUpdated:
      typeof record.lastUpdated === "string" ? record.lastUpdated : undefined,
    breakdown: record.breakdown ?? record.items,
  };
}

export function resolveDekhoLandScoreDetails(
  score?: unknown,
  details?: { lastUpdated?: string | null; breakdown?: unknown } | null,
  seed?: string | number | null,
): DekhoLandScoreDetails {
  const resolvedScore = resolveDekhoLandScore(score, seed);
  return {
    score: resolvedScore,
    ratingLabel: getDekhoLandScoreLabel(resolvedScore),
    lastUpdated: formatScoreDate(details?.lastUpdated),
    breakdown:
      parseBreakdown(details?.breakdown) ??
      getMockDekhoLandScoreBreakdown(resolvedScore, seed),
  };
}

export function getApiDekhoLandScore(item?: {
  dekhoLandScore?: unknown;
  dekholandScore?: unknown;
} | null): unknown {
  if (!item) return undefined;
  if (item.dekhoLandScore != null && item.dekhoLandScore !== "") {
    return item.dekhoLandScore;
  }
  if (item.dekholandScore != null && item.dekholandScore !== "") {
    return item.dekholandScore;
  }
  return undefined;
}
