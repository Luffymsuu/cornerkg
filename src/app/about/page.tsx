import type { Metadata } from "next";
import { StubPage } from "@/components/info/StubPage";

export const metadata: Metadata = {
  title: "О магазине",
  description:
    "Cornerkg — стрит-стайл магазин в Бишкеке. Оригиналы и ресейл редких пар.",
};

export default function AboutPage() {
  return <StubPage pageKey="about" />;
}
