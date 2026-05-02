"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Route-level error boundary picked up automatically by the Next.js
 * App Router. Rendered when a Server Component throws *or* when a
 * client component throws and there's no nested `<ErrorBoundary>`
 * higher in the tree.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    // Hook for Sentry / Datadog wiring. Avoid logging the stack here
    // beyond what Next.js already prints in dev.
    if (process.env.NODE_ENV !== "production") {
      console.error("Route error boundary caught:", error);
    }
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t("errors.title")}
      </h1>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        {t("errors.subtitle")}
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          ID: {error.digest}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={() => reset()}
        >
          {t("errors.retry")}
        </Button>
        <ButtonLink
          href="/"
          variant="outline"
          leftIcon={<Home className="h-4 w-4" />}
        >
          {t("errors.home")}
        </ButtonLink>
      </div>
    </Container>
  );
}
