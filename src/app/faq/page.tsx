import type { Metadata } from "next";
import { StubPage } from "@/components/info/StubPage";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Ответы на типовые вопросы клиентов магазина Cornerkg в Бишкеке.",
};

export default function FaqPage() {
  return <StubPage pageKey="faq" />;
}
