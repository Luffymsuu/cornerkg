import type { Metadata } from "next";
import { FaqList } from "@/components/info/FaqList";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Ответы на типовые вопросы клиентов магазина Cornerkg в Бишкеке: оригинальность, оплата, доставка, возврат, размеры.",
};

export default function FaqPage() {
  return <FaqList />;
}
