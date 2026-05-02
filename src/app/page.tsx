import { Hero } from "@/components/home/Hero";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { HitsRow } from "@/components/home/HitsRow";
import { BelowFold } from "@/components/home/BelowFold";
import { listHits, listNew } from "@/lib/data/repository";

export default function HomePage() {
  const hits = listHits(8);
  const newest = listNew(8);
  return (
    <>
      <Hero />
      <CategoryTiles />
      <HitsRow products={hits} variant="hits" />
      <HitsRow products={newest} variant="new" />
      {/* BrandsStrip / ContactsBlock / Reviews are deferred — see BelowFold. */}
      <BelowFold />
    </>
  );
}
