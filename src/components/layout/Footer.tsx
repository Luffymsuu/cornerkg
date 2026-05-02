"use client";

import Link from "next/link";
import { Instagram, MapPin, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-lime-400 px-2 py-1 text-xs font-black uppercase text-zinc-950">
                CK
              </span>
              <span className="text-lg font-bold tracking-tight">cornerkg</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t.nav.catalog}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/catalog?category=sneakers" className="hover:text-lime-400">
                  {t.categories.sneakers}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=hoodies" className="hover:text-lime-400">
                  {t.categories.hoodies}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=tshirts" className="hover:text-lime-400">
                  {t.categories.tshirts}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=outerwear" className="hover:text-lime-400">
                  {t.categories.outerwear}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t.footer.branches}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>{t.footer.mainBranch}</li>
              <li>{t.footer.secondBranch}</li>
              <li>{t.footer.classicBranch}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t.home.contactsTitle}
            </h4>
            <ul className="mt-3 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-lime-400" />
                <span>{t.home.contactAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-lime-400" />
                <a href="tel:+996709993289" className="hover:text-lime-400">
                  {t.home.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-lime-400" />
                <a
                  href="https://wa.me/996709993289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-400"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-lime-400" />
                <a
                  href="https://www.instagram.com/cornerkg_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-400"
                >
                  {t.home.contactInstagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} cornerkg. {t.footer.rights}.
          </span>
          <span>made for streetwear lovers</span>
        </div>
      </Container>
    </footer>
  );
}
