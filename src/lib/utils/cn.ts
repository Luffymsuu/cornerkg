/**
 * Lightweight className concat helper. Use this everywhere instead of
 * pulling in the `classnames` package.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
