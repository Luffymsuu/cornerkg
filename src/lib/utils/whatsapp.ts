import type { CartItem } from "@/lib/data/types";
import { formatPrice } from "./formatPrice";

export const WHATSAPP_NUMBER = "996709993289";

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
 * return a `https://wa.me/...` deep-link. The template is intentionally
 * verbose because the manager will read the message manually.
 */
export function buildWhatsAppOrderUrl(payload: CheckoutPayload): string {
  const lines: string[] = [];
  lines.push("Здравствуйте! Заказ с сайта cornerkg.");
  lines.push("");
  lines.push(`Имя: ${payload.name}`);
  lines.push(`Телефон: ${payload.phone}`);
  lines.push(`Город: ${payload.city}`);
  if (payload.address) lines.push(`Адрес: ${payload.address}`);
  lines.push(`Доставка: ${labelDelivery(payload.delivery)}`);
  lines.push(`Оплата: ${labelPayment(payload.payment)}`);
  if (payload.comment) lines.push(`Комментарий: ${payload.comment}`);
  lines.push("");
  lines.push("Состав заказа:");
  payload.items.forEach((item, idx) => {
    const sizePart = item.size ? `, размер ${item.size}` : "";
    lines.push(
      `${idx + 1}) ${item.product.title} (${item.product.brand})${sizePart} × ${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`,
    );
  });
  lines.push("");
  lines.push(`Итого: ${formatPrice(payload.total)}`);

  const text = encodeURIComponent(lines.join("\n"));
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
