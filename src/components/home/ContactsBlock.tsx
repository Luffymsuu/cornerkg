"use client";

import { Instagram, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

export function ContactsBlock() {
  const t = useT();
  return (
    <Section title={t.home.contactsTitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ContactCard
          icon={<MapPin className="h-5 w-5" />}
          title={t.common.address}
          value={t.home.contactAddress}
          href="https://2gis.kg/bishkek/firm/70000001075006179"
        />
        <ContactCard
          icon={<Clock className="h-5 w-5" />}
          title="Часы работы"
          value={t.home.contactHours}
        />
        <ContactCard
          icon={<Phone className="h-5 w-5" />}
          title={t.common.phone}
          value={t.home.contactPhone}
          href="tel:+996709993289"
        />
        <ContactCard
          icon={<Instagram className="h-5 w-5" />}
          title="Instagram"
          value={t.home.contactInstagram}
          href="https://www.instagram.com/cornerkg_/"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink
          href="https://wa.me/996709993289"
          leftIcon={<MessageCircle className="h-4 w-4" />}
        >
          WhatsApp
        </ButtonLink>
        <ButtonLink
          href="https://www.instagram.com/cornerkg_/"
          variant="outline"
          leftIcon={<Instagram className="h-4 w-4" />}
        >
          Instagram
        </ButtonLink>
      </div>
    </Section>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex h-full items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-lime-400/60">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-400/10 text-lime-400">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {title}
        </div>
        <div className="mt-1 truncate text-sm text-zinc-100">{value}</div>
      </div>
    </div>
  );

  if (!href) return inner;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}
