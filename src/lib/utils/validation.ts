/**
 * Form-level validation helpers for the cornerkg storefront.
 *
 * Kept framework-free so the same rules can be reused on the server
 * once a real backend is wired in. Each validator returns
 * `{ ok: true, value }` on success and `{ ok: false, error }` on
 * failure — callers translate `error` codes via the i18n layer.
 */

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: ValidationError };

export type ValidationError =
  | "required"
  | "invalidPhone"
  | "tooLong"
  | "tooShort";

const NAME_MAX = 80;
const CITY_MAX = 80;
const ADDRESS_MAX = 200;
const COMMENT_MAX = 1000;
const PHONE_MAX = 20;

const KG_PHONE_RE = /^\+996\d{9}$/;

/**
 * Strip everything except digits and the leading `+`. Useful both for
 * normalisation before regex matching and for collapsing pasted values
 * with separators (`+996 (709) 99-32-89` → `+996709993289`).
 */
export function digitsOnly(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const hasPlus = trimmed.startsWith("+");
  const stripped = trimmed.replace(/[^\d]/g, "");
  return hasPlus ? `+${stripped}` : stripped;
}

/**
 * Normalise a Kyrgyz phone number to the canonical `+996XXXXXXXXX`
 * form. Accepts the four common shapes:
 *   `+996709993289`
 *   `996709993289`
 *   `0709993289`     (KG mobile with leading zero)
 *   `709993289`      (just the local subscriber number)
 */
export function normalizeKgPhone(input: string): string | null {
  let cleaned = digitsOnly(input);
  if (!cleaned) return null;

  if (cleaned.startsWith("+996")) {
    cleaned = cleaned.slice(4);
  } else if (cleaned.startsWith("996")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith("+")) {
    return null;
  }

  if (!/^\d{9}$/.test(cleaned)) return null;
  return `+996${cleaned}`;
}

export function validatePhone(input: string): ValidationResult<string> {
  if (!input.trim()) return { ok: false, error: "required" };
  if (input.length > PHONE_MAX) return { ok: false, error: "tooLong" };
  const normalized = normalizeKgPhone(input);
  if (!normalized || !KG_PHONE_RE.test(normalized)) {
    return { ok: false, error: "invalidPhone" };
  }
  return { ok: true, value: normalized };
}

export function validateRequired(
  input: string,
  max: number,
): ValidationResult<string> {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "required" };
  if (trimmed.length > max) return { ok: false, error: "tooLong" };
  return { ok: true, value: trimmed };
}

export function validateOptional(
  input: string,
  max: number,
): ValidationResult<string> {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (trimmed.length > max) return { ok: false, error: "tooLong" };
  return { ok: true, value: trimmed };
}

export const FIELD_LIMITS = {
  name: NAME_MAX,
  city: CITY_MAX,
  address: ADDRESS_MAX,
  comment: COMMENT_MAX,
  phone: PHONE_MAX,
} as const;
