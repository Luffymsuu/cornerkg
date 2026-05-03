import type { Metadata } from "next";
import { InfoPage } from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "О магазине",
  description:
    "Cornerkg — магазин стритстайла и кроссовок в Бишкеке. Оригиналы и ресейл редких пар.",
  // Keep noindex until the store owner signs off on the copy. Real users
  // still reach the page through the footer; we just don't want it ranking
  // on Google with placeholder copy.
  robots: { index: false, follow: false },
};

const SECTIONS = ["who", "what", "where", "why"] as const;

export default function AboutPage() {
  return <InfoPage pageKey="about" sections={SECTIONS} />;
}
