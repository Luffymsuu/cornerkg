"use client";

import { cn } from "@/lib/utils/cn";

export function SizePicker({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string | undefined;
  onChange: (s: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {sizes.map((s) => {
        const selected = value === s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={cn(
              "flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition",
              selected
                ? "border-lime-400 bg-lime-400/15 text-lime-300"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600",
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
