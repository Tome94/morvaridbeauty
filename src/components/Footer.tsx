"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer id="booking" className="bg-warm-gray text-white py-8 px-6">
      {/* Copyright */}
      <div className="text-center order-t border-white/10">
        <p className="font-[family-name:var(--font-montserrat)] text-xs text-white/50">
          © {currentYear} Morvarid Beauty. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
