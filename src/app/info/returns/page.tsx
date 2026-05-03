import type { Metadata } from "next";
import { InfoPage } from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "Возврат и обмен",
  description:
    "Условия возврата и обмена товара в магазине Cornerkg в Бишкеке.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  "conditions",
  "timeline",
  "exclusions",
  "defect",
  "process",
] as const;

export default function ReturnsPage() {
  return <InfoPage pageKey="returns" sections={SECTIONS} />;
}
