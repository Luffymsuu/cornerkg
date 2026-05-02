import type { CartItem } from "@/lib/data/types";
import { formatPrice } from "./formatPrice";
import {
  sanitizeSingleLine,
  sanitizeMultiline,
  sanitizePhone,
} from "./sanitize";
import { FIELD_LIMITS } from "./validation";

export const WHATSAPP_NUMBER = "996709993289";

/**
 * The WhatsApp `wa.me` deep-link only encodes the prefilled message
 * via `?text=`. Any whitespace / control characters inside that text
 * end up base64-decoded inside the chat — they're not directly
 * exploitable, but we still cap the total length and strip control
 * bytes so a malicious paste cannot smuggle, say, hidden Unicode that
 * would render differently to the manager.
 */
const MAX_MESSAGE_LENGTH = 3500;

export interface CheckoutPayload {
  name: string;
  phone: string;
  city: string;
  address: string;
  comment?: string;
  delivery: "pickup" | "courier" | "regions";
  payment: "cash" | "card" | "transfer";
  items: CartItem[];
  total: number;
}

/**
 * Build a human-friendly WhatsApp message from a checkout payload and
 * return a `https://wa.me/...` deep-link. All free-text fields go
 * through the sanitizers in `./sanitize.ts` first, so a paste with
 * control bytes / very long content cannot break the URL or hide
 * payloads inside the manager's chat view.
 */
export function buildWhatsAppOrderUrl(payload: CheckoutPayload): string {
  const safe = {
    name: sanitizeSingleLine(payload.name, FIELD_LIMITS.name),
    phone: sanitizePhone(payload.phone),
    city: sanitizeSingleLine(payload.city, FIELD_LIMITS.city),
    address: sanitizeSingleLine(payload.address, FIELD_LIMITS.address),
    comment: payload.comment
      ? sanitizeMultiline(payload.comment, FIELD_LIMITS.comment)
      : "",
  };

  const lines: string[] = [];
  lines.push("Здравствуйте! Заказ с сайта cornerkg.");
  lines.push("");
  lines.push(`Имя: ${safe.name}`);
  lines.push(`Телефон: ${safe.phone}`);
  lines.push(`Город: ${safe.city}`);
  if (safe.address) lines.push(`Адрес: ${safe.address}`);
  lines.push(`Доставка: ${labelDelivery(payload.delivery)}`);
  lines.push(`Оплата: ${labelPayment(payload.payment)}`);
  if (safe.comment) lines.push(`Комментарий: ${safe.comment}`);
  lines.push("");
  lines.push("Состав заказа:");
  payload.items.forEach((item, idx) => {
    const sizePart = item.size
      ? `, размер ${sanitizeSingleLine(item.size, 10)}`
      : "";
    const title = sanitizeSingleLine(item.product.title, 120);
    const brand = sanitizeSingleLine(item.product.brand, 60);
    const qty = Math.max(1, Math.min(99, Math.floor(item.quantity)));
    lines.push(
      `${idx + 1}) ${title} (${brand})${sizePart} × ${qty} — ${formatPrice(item.product.price * qty)}`,
    );
  });
  lines.push("");
  lines.push(`Итого: ${formatPrice(payload.total)}`);

  const message = lines.join("\n").slice(0, MAX_MESSAGE_LENGTH);
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function labelDelivery(d: CheckoutPayload["delivery"]): string {
  switch (d) {
    case "pickup":
      return "Самовывоз (Тоголок Молдо 5 / Киевская)";
    case "courier":
      return "Курьер по Бишкеку";
    case "regions":
      return "Доставка в регионы";
  }
}

function labelPayment(p: CheckoutPayload["payment"]): string {
  switch (p) {
    case "cash":
      return "Наличные при получении";
    case "card":
      return "Картой при получении";
    case "transfer":
      return "Перевод (MBank / O!Dengi / Optima)";
  }
}
