import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "lime" | "zinc" | "red";

const TONES: Record<Tone, string> = {
  lime: "bg-lime-400 text-zinc-950",
  zinc: "bg-zinc-800/80 text-zinc-100 border border-zinc-700",
  red: "bg-red-500 text-zinc-50",
};

export function Badge({
  children,
  tone = "lime",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider leading-none",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
