import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils/cn";

export function Section({
  title,
  subtitle,
  action,
  children,
  className,
  id,
  fullBleed,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  fullBleed?: boolean;
}) {
  return (
    <section id={id} className={cn("py-12 sm:py-20", className)}>
      <Container>
        {(title || action) && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              {title && (
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                  {subtitle}
                </p>
              )}
            </div>
            {action}
          </div>
        )}
        {fullBleed ? <div className="-mx-4 sm:-mx-6 lg:-mx-8">{children}</div> : children}
      </Container>
    </section>
  );
}
