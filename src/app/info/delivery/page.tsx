import type { Metadata } from "next";
import { StubPage } from "@/components/info/StubPage";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Самовывоз из Бишкека и доставка по Кыргызстану. Условия будут уточнены.",
};

export default function DeliveryPage() {
  return <StubPage pageKey="delivery" />;
}
