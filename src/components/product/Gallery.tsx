"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={src}
                  alt={`${alt} — ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="prev"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/70 text-zinc-100 backdrop-blur transition hover:border-lime-400 hover:text-lime-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/70 text-zinc-100 backdrop-blur transition hover:border-lime-400 hover:text-lime-400"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border transition",
                selectedIndex === i
                  ? "border-lime-400"
                  : "border-zinc-800 hover:border-zinc-600",
              )}
            >
              <Image
                src={src}
                alt={`${alt} thumb ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
