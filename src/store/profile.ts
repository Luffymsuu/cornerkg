"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { OrderRecord, ProfileData } from "@/lib/data/types";

interface ProfileState {
  data: ProfileData;
  orders: OrderRecord[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  updateData: (patch: Partial<ProfileData>) => void;
  addOrder: (order: OrderRecord) => void;
}

const DEFAULT_DATA: ProfileData = {
  name: "",
  phone: "",
  city: "Бишкек",
  address: "",
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      data: DEFAULT_DATA,
      orders: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      updateData: (patch) => set({ data: { ...get().data, ...patch } }),
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
    }),
    {
      name: "corner.profile",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
