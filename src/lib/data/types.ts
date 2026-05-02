/**
 * Domain types for the cornerkg storefront. All UI components depend only
 * on this file and on `repository.ts`. To swap localStorage / mock data
 * for a real backend, keep these shapes stable and rewrite the repository.
 */

export type Category =
  | "sneakers"
  | "hoodies"
  | "tshirts"
  | "pants"
  | "outerwear"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  /** Available sizes. Empty array means "one size" / accessory. */
  sizes: string[];
  images: string[];
  /** Short description shown on the product page. */
  description: string;
  /** Highlighted in catalog with a "HIT" badge. */
  isHit?: boolean;
  /** Highlighted with a "NEW" badge. */
  isNew?: boolean;
  /** Resale condition tag, free-form (e.g. "новое в коробке", "1/10 носки"). */
  condition?: string;
  /** ISO timestamp; used for sorting "новинки". */
  addedAt: string;
}

export interface CartItem {
  /** Stable client-generated id; lets the same product+size live as one row. */
  lineId: string;
  product: Product;
  size?: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  status: "sent_to_whatsapp";
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    delivery: "pickup" | "courier" | "regions";
    payment: "cash" | "card" | "transfer";
    comment?: string;
  };
}

export interface ProfileData {
  name: string;
  phone: string;
  city: string;
  address: string;
}
