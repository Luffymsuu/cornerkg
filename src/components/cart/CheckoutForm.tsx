"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Input, Textarea, FieldRadioGroup } from "@/components/ui/Input";
import { ButtonLink } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart";
import { useProfileStore } from "@/store/profile";
import { buildWhatsAppOrderUrl } from "@/lib/utils/whatsapp";
import { formatPrice } from "@/lib/utils/formatPrice";
import {
  FIELD_LIMITS,
  validatePhone,
  validateRequired,
  validateOptional,
  type ValidationError,
} from "@/lib/utils/validation";

type Delivery = "pickup" | "courier" | "regions";
type Payment = "cash" | "card" | "transfer";

export function CheckoutForm() {
  const t = useTranslations();
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

  const errorMessage = (code: ValidationError): string => {
    switch (code) {
      case "required":
        return t("common.requiredField");
      case "invalidPhone":
        return t("common.invalidPhone");
      case "tooLong":
      case "tooShort":
        return t("common.tooLong");
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};

    const nameRes = validateRequired(name, FIELD_LIMITS.name);
    if (!nameRes.ok) e.name = errorMessage(nameRes.error);

    const phoneRes = validatePhone(phone);
    if (!phoneRes.ok) e.phone = errorMessage(phoneRes.error);

    const cityRes = validateOptional(city, FIELD_LIMITS.city);
    if (!cityRes.ok) e.city = errorMessage(cityRes.error);

    if (delivery !== "pickup") {
      const addrRes = validateRequired(address, FIELD_LIMITS.address);
      if (!addrRes.ok) e.address = errorMessage(addrRes.error);
    } else {
      const addrRes = validateOptional(address, FIELD_LIMITS.address);
      if (!addrRes.ok) e.address = errorMessage(addrRes.error);
    }

    const commentRes = validateOptional(comment, FIELD_LIMITS.comment);
    if (!commentRes.ok) e.comment = errorMessage(commentRes.error);

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (items.length === 0 || !validate()) {
      e.preventDefault();
      return;
    }
    // Re-running validatePhone gives us the canonical +996XXXXXXXXX form.
    const phoneRes = validatePhone(phone);
    const normalizedPhone = phoneRes.ok ? phoneRes.value : phone;

    // Persist profile data + record order before opening WhatsApp.
    updateProfile({ name, phone: normalizedPhone, city, address });
    addOrder({
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      total: subtotal,
      status: "sent_to_whatsapp",
      customer: {
        name,
        phone: normalizedPhone,
        city,
        address,
        comment,
        delivery,
        payment,
      },
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
        {t("cart.checkoutTitle")}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="name"
          label={t("common.name")}
          placeholder="Айдана"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          maxLength={FIELD_LIMITS.name}
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
        />
        <Input
          name="phone"
          label={t("common.phone")}
          placeholder="+996 ___ __ __ __"
          inputMode="tel"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          maxLength={FIELD_LIMITS.phone}
          required
          aria-invalid={Boolean(errors.phone)}
        />
        <Input
          name="city"
          label={t("common.city")}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={errors.city}
          maxLength={FIELD_LIMITS.city}
          autoComplete="address-level2"
        />
        <Input
          name="address"
          label={t("common.address")}
          placeholder="Улица, дом, кв."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address}
          maxLength={FIELD_LIMITS.address}
          autoComplete="street-address"
          aria-invalid={Boolean(errors.address)}
        />
      </div>

      <FieldRadioGroup
        label={t("common.delivery")}
        name="delivery"
        value={delivery}
        onChange={setDelivery}
        options={[
          { value: "pickup", label: t("common.pickup") },
          { value: "courier", label: t("common.courier") },
          { value: "regions", label: t("common.regions") },
        ]}
      />

      <FieldRadioGroup
        label={t("common.payment")}
        name="payment"
        value={payment}
        onChange={setPayment}
        options={[
          { value: "cash", label: t("common.cash") },
          { value: "card", label: t("common.card") },
          { value: "transfer", label: t("common.transfer") },
        ]}
      />

      <Textarea
        name="comment"
        label={t("common.comment")}
        placeholder="…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={FIELD_LIMITS.comment}
        error={errors.comment}
      />

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-sm">
        <div className="flex items-center justify-between text-zinc-400">
          <span>{t("cart.subtotal")}</span>
          <span>{formatPrice(subtotal, t("common.currency"))}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-zinc-400">
          <span>{t("cart.delivery")}</span>
          <span className="text-zinc-300">
            {delivery === "pickup" ? "0" : "—"}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3 text-base font-bold">
          <span>{t("cart.total")}</span>
          <span className="text-lime-400">
            {formatPrice(subtotal, t("common.currency"))}
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
        {t("cart.submit")}
      </ButtonLink>

      <p className="text-[11px] leading-relaxed text-zinc-500">{t("cart.hint")}</p>
    </div>
  );
}
