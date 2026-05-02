"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/data/types";

export function AddToCart({
  product,
  size,
  onError,
}: {
  product: Product;
  size: string | undefined;
  onError?: (msg: string) => void;
}) {
  const t = useTranslations();
  const add = useCartStore((s) => s.add);
  const [pulse, setPulse] = useState(false);

  const requiresSize = product.sizes.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="lg"
        fullWidth
        leftIcon={<ShoppingBag className="h-4 w-4" />}
        onClick={() => {
          if (requiresSize && !size) {
            onError?.(t("common.sizeChooseFirst"));
            return;
          }
          add(product, size);
          setPulse(true);
          window.setTimeout(() => setPulse(false), 1400);
        }}
      >
        {t("product.addToCart")}
      </Button>

      <AnimatePresence>
        {pulse && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-lime-400/40 bg-lime-400/10 px-4 py-2 text-xs text-lime-300"
          >
            <Check className="h-4 w-4" />
            {t("common.addedToCart")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
