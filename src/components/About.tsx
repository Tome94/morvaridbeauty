"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useBooking } from "@/context/BookingContext";

export default function About() {
  const t = useTranslations("about");
  const { openBooking } = useBooking();

  return (
    <section id="about" className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro Text */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-warm-gray leading-relaxed max-w-4xl mx-auto">
            {t("intro")}
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Hidden on mobile */}
          <div className="relative order-2 lg:order-1 hidden lg:block">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
              <Image
                src="/images/morvaridImage.png"
                alt="Morvarid - Hair and Makeup Artist"
                fill
                className="object-cover rounded-sm shadow-xl"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-sm -z-10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-1">
              <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] uppercase text-gold">
                {t("experience")}
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-warm-gray">
                {t("heading")}
              </h2>
            </div>

            <div className="space-y-4 font-[family-name:var(--font-montserrat)] text-warm-gray-light leading-relaxed">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
              <p>{t("bio3")}</p>
            </div>

            <blockquote className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-warm-gray italic leading-relaxed border-l-2 border-gold pl-6 mt-8">
              "{t("quote")}"
              <cite className="block text-base mt-2 not-italic text-gold">{t("quoteAuthor")}</cite>
            </blockquote>

            <button
              onClick={openBooking}
              className="inline-block mt-4 font-[family-name:var(--font-montserrat)] text-sm tracking-[0.15em] uppercase px-8 py-3 border-2 border-warm-gray text-warm-gray hover:bg-warm-gray hover:text-white transition-all duration-300"
            >
              {t("cta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
