import { Hero } from "@/components/home/Hero";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { HitsRow } from "@/components/home/HitsRow";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { ContactsBlock } from "@/components/home/ContactsBlock";
import { Reviews } from "@/components/home/Reviews";
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
      <BrandsStrip />
      <ContactsBlock />
      <Reviews />
    </>
  );
}
