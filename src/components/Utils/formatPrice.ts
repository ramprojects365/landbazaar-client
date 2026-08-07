/** INR: when `showDecimals` is true, fraction digits appear only if needed (no trailing ".00"). */
export function formatPrice(price: number, showDecimals = false) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
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
    return `${formatScaledAmount(value / 1_000)} thousands`;
  }
  if (value <= 10_000_000) {
    return `${formatScaledAmount(value / 100_000)} lakhs`;
  }
  return `${formatScaledAmount(value / 10_000_000)} crores`;
}
