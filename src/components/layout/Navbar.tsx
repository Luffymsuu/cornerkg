"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, ShoppingBag, User2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useT } from "@/lib/i18n";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalQty = useCartStore((s) => s.totalQuantity());
  const favCount = useFavoritesStore((s) => s.ids.length);
  const cartHydrated = useCartStore((s) => s.hydrated);
  const favHydrated = useFavoritesStore((s) => s.hydrated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/profile", label: t.nav.profile },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur"
          : "border-b border-transparent bg-zinc-950/60 backdrop-blur",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-black tracking-tight"
        >
          <span className="rounded-md bg-lime-400 px-2 py-1 text-xs uppercase text-zinc-950">
            CK
          </span>
          <span>cornerkg</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-lime-400"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />

          <Link
            href="/profile"
            aria-label={t.nav.favorites}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-lime-400 hover:text-lime-400 sm:inline-flex"
          >
            <Heart className="h-5 w-5" />
            {favHydrated && favCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-zinc-950">
                {favCount}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            aria-label={t.nav.profile}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-lime-400 hover:text-lime-400 sm:inline-flex"
          >
            <User2 className="h-5 w-5" />
          </Link>

          <Link
            href="/cart"
            aria-label={t.nav.cart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-lime-400 hover:text-lime-400"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartHydrated && totalQty > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-zinc-950">
                {totalQty}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-lime-400 hover:text-lime-400 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-zinc-800 bg-zinc-950 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-zinc-200 transition hover:bg-zinc-900 hover:text-lime-400"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-zinc-800 pt-3">
                <LocaleSwitcher />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
