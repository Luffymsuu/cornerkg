import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "cornerkg — стрит-стайл магазин в Бишкеке",
    template: "%s · cornerkg",
  },
  description:
    "Cornerkg — магазин одежды и кроссовок в Бишкеке. Оригиналы и ресейл, 2 филиала, доставка по Кыргызстану.",
  metadataBase: new URL("https://cornerkg.kg"),
  openGraph: {
    title: "cornerkg — стрит-стайл магазин в Бишкеке",
    description:
      "Магазин одежды и кроссовок в Бишкеке. Оригиналы и ресейл, 2 филиала, доставка по Кыргызстану.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased"
        suppressHydrationWarning
      >
        <I18nProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
