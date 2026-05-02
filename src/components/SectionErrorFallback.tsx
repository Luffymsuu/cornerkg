"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface SectionErrorFallbackProps {
  reset: () => void;
  /** Optional override for the headline. Defaults to the global error
   *  string so we get a consistent voice across boundaries. */
  title?: string;
  className?: string;
}

/**
 * Compact in-place fallback shown by `<ErrorBoundary>` when a
 * specific section (cart, gallery, catalog grid, ...) throws. Keeps
 * the rest of the page interactive instead of forcing a full reload.
 */
export function SectionErrorFallback({
  reset,
  title,
  className,
}: SectionErrorFallbackProps) {
  const t = useTranslations();
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center ${className ?? ""}`}
      role="alert"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-bold text-zinc-100">
          {title ?? t("errors.title")}
        </p>
        <p className="mt-0.5 text-xs text-zinc-400">{t("errors.subtitle")}</p>
      </div>
      <Button
        size="sm"
        variant="outline"
        leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
        onClick={reset}
      >
        {t("errors.retry")}
      </Button>
    </div>
  );
}
