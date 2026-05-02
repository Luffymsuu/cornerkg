import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const baseField =
  "w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-lime-400/70 focus:outline-none focus:ring-2 focus:ring-lime-400/20 transition";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <label className="block" htmlFor={fieldId}>
      {label && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={fieldId}
        className={cn(baseField, error ? "border-red-500/70" : "", className)}
        {...rest}
      />
      {hint && !error && (
        <span className="mt-1 block text-[11px] text-zinc-500">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-[11px] text-red-400">{error}</span>
      )}
    </label>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, error, className, id, ...rest }, ref) {
    const fieldId = id ?? rest.name;
    return (
      <label className="block" htmlFor={fieldId}>
        {label && (
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={3}
          className={cn(baseField, "resize-y", error ? "border-red-500/70" : "", className)}
          {...rest}
        />
        {hint && !error && (
          <span className="mt-1 block text-[11px] text-zinc-500">{hint}</span>
        )}
        {error && (
          <span className="mt-1 block text-[11px] text-red-400">{error}</span>
        )}
      </label>
    );
  },
);

export function FieldRadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  name,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-xs font-medium transition",
                selected
                  ? "border-lime-400 bg-lime-400/10 text-lime-300"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
