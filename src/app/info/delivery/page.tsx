import type { Metadata } from "next";
import { InfoPage } from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Самовывоз из Бишкека и доставка по Кыргызстану. Конкретные тарифы и сроки уточняйте в WhatsApp.",
  robots: { index: false, follow: false },
};

const SECTIONS = ["pickup", "bishkek", "regions", "timing", "payment"] as const;

export default function DeliveryPage() {
  return <InfoPage pageKey="delivery" sections={SECTIONS} />;
}
