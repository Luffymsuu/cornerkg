/**
 * String-sanitization helpers used right before user-supplied data
 * leaves the page (e.g. when serialising into a WhatsApp deep-link or
 * persisting an order). Defence in depth: the form-level
 * `validation.ts` already rejects malformed input, but if any caller
 * forgets to validate, these guards still keep the output safe to ship
 * into a URL.
 */

const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const ZERO_WIDTH_RE = /[\u200B-\u200D\u2060\uFEFF]/g;

/**
 * Strip characters that have no business in a chat message:
 * non-printable control bytes (which can be used to mask malicious
 * payloads) and zero-width joiners. We *keep* `\n` and `\t` so the
 * order template's structure is preserved.
 */
export function stripControlChars(input: string): string {
  return input.replace(CONTROL_CHARS_RE, "").replace(ZERO_WIDTH_RE, "");
}

/**
 * Normalise a single-line free-text field (name, city, address):
 * trims, collapses internal whitespace, removes control characters,
 * and caps length to a hard maximum.
 */
export function sanitizeSingleLine(input: string, maxLength = 200): string {
  return stripControlChars(input)
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Normalise a multi-line free-text field (comment): trims, removes
 * control characters, collapses excessive blank lines, and caps total
 * length.
 */
export function sanitizeMultiline(input: string, maxLength = 1000): string {
  return stripControlChars(input)
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

/**
 * Strip everything except digits and an optional leading `+` and cap
 * length, so a phone string is always safe to drop into a URL.
 */
export function sanitizePhone(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "").slice(0, 15);
  return hasPlus ? `+${digits}` : digits;
}
