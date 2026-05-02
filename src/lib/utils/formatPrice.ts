/**
 * Format a price for display. Defaults to Kyrgyz som, e.g. 4500 -> "4 500 с".
 */
export function formatPrice(value: number, currency: string = "с"): string {
  const rounded = Math.round(value);
  // Use a non-breaking space as the thousands separator so the price never
  // wraps to a new line on narrow screens.
  const grouped = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${grouped}\u00A0${currency}`;
}
