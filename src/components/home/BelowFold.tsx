"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

/**
 * Defer below-the-fold home sections so they only load when the user
 * scrolls toward them. Each `next/dynamic` import emits its own JS
 * chunk, and `ssr: false` skips server rendering — the user sees a
 * cheap skeleton instead of waiting for client hydration of content
 * they likely won't reach immediately.
 */

const SectionPlaceholder = ({ height = 280 }: { height?: number }) => (
  <Container className="py-8 sm:py-12">
    <Skeleton className="mb-6 h-7 w-48" />
    <Skeleton className="w-full" style={{ height }} />
  </Container>
);

const BrandsStrip = dynamic(
  () => import("./BrandsStrip").then((m) => m.BrandsStrip),
  { ssr: false, loading: () => <SectionPlaceholder height={120} /> },
);
const ContactsBlock = dynamic(
  () => import("./ContactsBlock").then((m) => m.ContactsBlock),
  { ssr: false, loading: () => <SectionPlaceholder height={220} /> },
);
const Reviews = dynamic(() => import("./Reviews").then((m) => m.Reviews), {
  ssr: false,
  loading: () => <SectionPlaceholder height={260} />,
});

export function BelowFold() {
  return (
    <>
      <BrandsStrip />
      <ContactsBlock />
      <Reviews />
    </>
  );
}
