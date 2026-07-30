/** MYR: when `showDecimals` is true, fraction digits appear only if needed (no trailing ".00"). */
export function formatPrice(price: number, showDecimals = false) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
}
