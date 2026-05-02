import { cn } from "@/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tailwind utilities to override the default rectangular size. */
  className?: string;
  /** Hint kept in the DOM so screen readers announce loading state. */
  label?: string;
}

/**
 * Solid placeholder block with a subtle shimmer animation. Use these
 * in loading states for any async data (cart hydration, profile
 * orders / favorites, product grid, gallery slides). Combine with
 * `aria-busy` on the parent so assistive tech announces the wait.
 */
export function Skeleton({ className, label, ...rest }: SkeletonProps) {
  return (
    <div
      role={label ? "status" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "relative overflow-hidden rounded-md bg-zinc-800/70",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-700/30 before:to-transparent",
        className,
      )}
      {...rest}
    />
  );
}

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-3",
        className,
      )}
    >
      <Skeleton className="aspect-[4/5] w-full rounded-xl" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      aria-busy
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="space-y-3" aria-busy>
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div className="flex gap-2">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <Skeleton className="h-16 w-16 rounded-lg" />
        <Skeleton className="h-16 w-16 rounded-lg" />
      </div>
    </div>
  );
}

export function CartRowSkeleton() {
  return (
    <div className="flex gap-3 border-b border-zinc-800 py-4 last:border-b-0">
      <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export function ListRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
      <Skeleton className="h-14 w-14 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
