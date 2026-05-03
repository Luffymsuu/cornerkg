"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { Favorites } from "@/components/profile/Favorites";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type Tab = "info" | "orders" | "favorites";

export default function ProfilePage() {
  const t = useTranslations();
  const [tab, setTab] = useState<Tab>("info");

  const tabs: Array<{ key: Tab; label: string }> = [
    { key: "info", label: t("profile.tabsInfo") },
    { key: "orders", label: t("profile.tabsOrders") },
    { key: "favorites", label: t("profile.tabsFavs") },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("profile.title")}
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">
        {t("profile.localOnlyNote")}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            type="button"
            onClick={() => setTab(tb.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
              tab === tb.key
                ? "border-lime-400 bg-lime-400/10 text-lime-300"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600",
            )}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "info" && <ProfileForm />}
      {tab === "orders" && <OrderHistory />}
      {tab === "favorites" && <Favorites />}
    </Container>
  );
}
