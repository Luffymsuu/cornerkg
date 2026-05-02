"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/data/types";

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  add: (product: Product, size?: string, quantity?: number) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;

  totalQuantity: () => number;
  subtotal: () => number;
}

function lineIdFor(product: Product, size?: string): string {
  return `${product.id}::${size ?? "default"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      add: (product, size, quantity = 1) => {
        const lineId = lineIdFor(product, size);
        const existing = get().items.find((i) => i.lineId === lineId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { lineId, product, size, quantity },
            ],
          });
        }
      },

      removeLine: (lineId) =>
        set({ items: get().items.filter((i) => i.lineId !== lineId) }),

      setQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.lineId !== lineId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.lineId === lineId ? { ...i, quantity } : i,
          ),
        });
      },

      clear: () => set({ items: [] }),

      totalQuantity: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0,
        ),
    }),
    {
      name: "corner.cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
