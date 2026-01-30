"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "fa" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] text-warm-gray hover:text-gold transition-colors duration-300 disabled:opacity-50"
      aria-label={locale === "en" ? "Switch to Farsi" : "Switch to English"}
    >
      {locale === "en" ? "فارسی" : "EN"}
    </button>
  );
}
