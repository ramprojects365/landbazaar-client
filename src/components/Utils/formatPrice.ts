/** When `showDecimals` is true, fraction digits appear only if needed (no trailing ".00"). */
export function formatPrice(price: number, showDecimals = false): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
  return `INR ${formatted}`;
}

export function parsePriceAmount(
  price?: number | string | null,
): number {
  const value = parseFloat(String(price ?? ""));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function formatScaledAmount(amount: number): string {
  const rounded = Math.round(amount * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return String(rounded).replace(/\.0$/, "");
}

function pluralizeUnit(amount: number, singular: string, plural: string): string {
  const formatted = formatScaledAmount(amount);
  return `INR ${formatted} ${amount > 1 ? plural : singular}`;
}

/** Display filter/URL price tokens (e.g. "100k", "1M") with INR prefix. */
export function formatFilterPriceLabel(value?: string | null): string {
  if (!value || value === "Any") return value ?? "Any";
  return `INR ${value}`;
}

/**
 * Display total price in Indian units for UI only.
 * Backend continues to store/send the raw numeric amount.
 */
export function formatTotalPriceDisplay(
  price?: number | string | null,
): string {
  const value = parsePriceAmount(price);
  if (value <= 0) return "—";

  if (value < 100_000) {
    return pluralizeUnit(value / 1_000, "thousand", "thousands");
  }
  if (value <= 10_000_000) {
    return pluralizeUnit(value / 100_000, "lakh", "lakhs");
  }
  return pluralizeUnit(value / 10_000_000, "crore", "crores");
}
