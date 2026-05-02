"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Input, Textarea, FieldRadioGroup } from "@/components/ui/Input";
import { ButtonLink } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { useCartStore } from "@/store/cart";
import { useProfileStore } from "@/store/profile";
import { buildWhatsAppOrderUrl } from "@/lib/utils/whatsapp";
import { formatPrice } from "@/lib/utils/formatPrice";

type Delivery = "pickup" | "courier" | "regions";
type Payment = "cash" | "card" | "transfer";

export function CheckoutForm() {
  const t = useT();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);
  const profile = useProfileStore((s) => s.data);
  const updateProfile = useProfileStore((s) => s.updateData);
  const addOrder = useProfileStore((s) => s.addOrder);

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city || "Бишкек");
  const [address, setAddress] = useState(profile.address);
  const [comment, setComment] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("pickup");
  const [payment, setPayment] = useState<Payment>("cash");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync values once profile rehydrates from localStorage.
  useEffect(() => {
    setName(profile.name);
    setPhone(profile.phone);
    setCity(profile.city || "Бишкек");
    setAddress(profile.address);
  }, [profile.name, profile.phone, profile.city, profile.address]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.common.requiredField;
    if (!phone.trim()) e.phone = t.common.requiredField;
    if (delivery !== "pickup" && !address.trim()) e.address = t.common.requiredField;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    // Persist profile data + record order before opening WhatsApp.
    updateProfile({ name, phone, city, address });
    addOrder({
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      total: subtotal,
      status: "sent_to_whatsapp",
      customer: { name, phone, city, address, comment, delivery, payment },
    });
    // Empty the cart after a short delay so the user keeps the WhatsApp tab.
    window.setTimeout(() => clear(), 600);
  };

  const url =
    items.length === 0
      ? "#"
      : buildWhatsAppOrderUrl({
          name,
          phone,
          city,
          address,
          comment,
          delivery,
          payment,
          items,
          total: subtotal,
        });

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <h2 className="text-lg font-bold tracking-tight">
        {t.cart.checkoutTitle}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="name"
          label={t.common.name}
          placeholder="Айдана"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          name="phone"
          label={t.common.phone}
          placeholder="+996 ___ __ __ __"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
        <Input
          name="city"
          label={t.common.city}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          name="address"
          label={t.common.address}
          placeholder="Улица, дом, кв."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address}
        />
      </div>

      <FieldRadioGroup
        label={t.common.delivery}
        name="delivery"
        value={delivery}
        onChange={setDelivery}
        options={[
          { value: "pickup", label: t.common.pickup },
          { value: "courier", label: t.common.courier },
          { value: "regions", label: t.common.regions },
        ]}
      />

      <FieldRadioGroup
        label={t.common.payment}
        name="payment"
        value={payment}
        onChange={setPayment}
        options={[
          { value: "cash", label: t.common.cash },
          { value: "card", label: t.common.card },
          { value: "transfer", label: t.common.transfer },
        ]}
      />

      <Textarea
        name="comment"
        label={t.common.comment}
        placeholder="…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-sm">
        <div className="flex items-center justify-between text-zinc-400">
          <span>{t.cart.subtotal}</span>
          <span>{formatPrice(subtotal, t.common.currency)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-zinc-400">
          <span>{t.cart.delivery}</span>
          <span className="text-zinc-300">
            {delivery === "pickup" ? "0" : "—"}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3 text-base font-bold">
          <span>{t.cart.total}</span>
          <span className="text-lime-400">
            {formatPrice(subtotal, t.common.currency)}
          </span>
        </div>
      </div>

      <ButtonLink
        href={url}
        size="lg"
        fullWidth
        leftIcon={<MessageCircle className="h-4 w-4" />}
        onClick={handleSubmit}
        target="_blank"
      >
        {t.cart.submit}
      </ButtonLink>

      <p className="text-[11px] leading-relaxed text-zinc-500">{t.cart.hint}</p>
    </div>
  );
}
