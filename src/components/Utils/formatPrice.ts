/** INR: when `showDecimals` is true, fraction digits appear only if needed (no trailing ".00"). */
export function formatPrice(price: number, showDecimals = false) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
}
