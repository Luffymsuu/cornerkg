"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { useProfileStore } from "@/store/profile";

export function ProfileForm() {
  const t = useT();
  const data = useProfileStore((s) => s.data);
  const update = useProfileStore((s) => s.updateData);
  const hydrated = useProfileStore((s) => s.hydrated);

  const [form, setForm] = useState(data);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(data);
  }, [hydrated, data]);

  return (
    <form
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        update(form);
        setSaved(true);
        window.setTimeout(() => setSaved(false), 1800);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="name"
          label={t.common.name}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          name="phone"
          label={t.common.phone}
          inputMode="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          name="city"
          label={t.common.city}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <Input
          name="address"
          label={t.common.address}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button leftIcon={<Save className="h-4 w-4" />} type="submit">
          {t.common.save}
        </Button>
        {saved && (
          <span className="text-xs font-medium text-lime-400">
            {t.profile.saveSuccess}
          </span>
        )}
      </div>
    </form>
  );
}
