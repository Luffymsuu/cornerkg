"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useProfileStore } from "@/store/profile";
import {
  FIELD_LIMITS,
  validatePhone,
  validateOptional,
  type ValidationError,
} from "@/lib/utils/validation";

export function ProfileForm() {
  const t = useTranslations();
  const data = useProfileStore((s) => s.data);
  const update = useProfileStore((s) => s.updateData);
  const hydrated = useProfileStore((s) => s.hydrated);

  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(data);
  }, [hydrated, data]);

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

  const validate = (): { phone: string } | null => {
    const e: Record<string, string> = {};

    let normalizedPhone = form.phone;
    if (form.phone.trim()) {
      const phoneRes = validatePhone(form.phone);
      if (!phoneRes.ok) e.phone = errorMessage(phoneRes.error);
      else normalizedPhone = phoneRes.value;
    }

    const nameRes = validateOptional(form.name, FIELD_LIMITS.name);
    if (!nameRes.ok) e.name = errorMessage(nameRes.error);

    const cityRes = validateOptional(form.city, FIELD_LIMITS.city);
    if (!cityRes.ok) e.city = errorMessage(cityRes.error);

    const addrRes = validateOptional(form.address, FIELD_LIMITS.address);
    if (!addrRes.ok) e.address = errorMessage(addrRes.error);

    setErrors(e);
    if (Object.keys(e).length > 0) return null;
    return { phone: normalizedPhone };
  };

  return (
    <form
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const res = validate();
        if (!res) return;
        update({ ...form, phone: res.phone });
        setSaved(true);
        window.setTimeout(() => setSaved(false), 1800);
      }}
      noValidate
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="name"
          label={t("common.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          maxLength={FIELD_LIMITS.name}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        <Input
          name="phone"
          label={t("common.phone")}
          inputMode="tel"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
          maxLength={FIELD_LIMITS.phone}
          aria-invalid={Boolean(errors.phone)}
        />
        <Input
          name="city"
          label={t("common.city")}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          error={errors.city}
          maxLength={FIELD_LIMITS.city}
          autoComplete="address-level2"
        />
        <Input
          name="address"
          label={t("common.address")}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          error={errors.address}
          maxLength={FIELD_LIMITS.address}
          autoComplete="street-address"
          aria-invalid={Boolean(errors.address)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button leftIcon={<Save className="h-4 w-4" />} type="submit">
          {t("common.save")}
        </Button>
        {saved && (
          <span className="text-xs font-medium text-lime-400">
            {t("profile.saveSuccess")}
          </span>
        )}
      </div>
    </form>
  );
}
