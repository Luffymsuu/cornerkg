import type { Metadata } from "next";
import { StubPage } from "@/components/info/StubPage";

export const metadata: Metadata = {
  title: "Возврат и обмен",
  description:
    "Условия возврата и обмена товара в магазине Cornerkg. Информация уточняется.",
};

export default function ReturnsPage() {
  return <StubPage pageKey="returns" />;
}
