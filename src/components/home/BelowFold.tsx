import { BrandsStrip } from "./BrandsStrip";
import { ContactsBlock } from "./ContactsBlock";
import { Reviews } from "./Reviews";

/**
 * Below-the-fold home sections. Rendered statically on the server so
 * crawlers, RSS readers, and users with JS disabled see real content
 * (brand logos, store contacts, reviews) instead of empty headings.
 * Previously these were `next/dynamic({ ssr: false })` which left the
 * sections blank in the initial HTML and broke SEO / no-JS browsing.
 */
export function BelowFold() {
  return (
    <>
      <BrandsStrip />
      <ContactsBlock />
      <Reviews />
    </>
  );
}
