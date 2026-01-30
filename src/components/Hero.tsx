"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useBooking } from "@/context/BookingContext";

export default function Hero() {
  const t = useTranslations("hero");
  const { openBooking } = useBooking();

  return (
    <section 
      className="relative h-screen overflow-hidden w-screen"
      style={{
        backgroundColor: '#c5bfb5', // fallback color
        marginLeft: 0,
        marginRight: 0,
        maxWidth: '100vw',
      }}
    >
      {/* Layer 1: Background Image (diagonal stripes) - scaled 110% to cover */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/Hero-bg.png"
          alt=""
          fill
          className="object-cover"
          style={{ transform: 'scale(1.05)' }}
          priority
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* Layer 2: Main Hero Image (woman) - centered on mobile, right-aligned on desktop */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[5%] lg:right-[10%] bottom-0 h-full w-[100%] sm:w-[85%] md:w-[60%] lg:w-[50%]"
        style={{ minWidth: '600px' }}
      >
        <Image
          src="/images/Hero-main.png"
          alt="Morvarid Beauty - Professional Hair Styling"
          fill
          className="object-contain glow-gold"
          style={{ objectPosition: 'center bottom' }}
          priority
          quality={75}
        />
      </div>

      {/* Layer 3: Logo - converges with woman, overlays on mobile (z-20) */}
      <div className="relative z-20 md:z-10 h-full flex flex-col items-center md:items-start justify-start pt-[28vh] sm:pt-[26vh] md:pt-[22vh] lg:pt-[30vh] px-4 sm:px-6 md:pl-[15%] lg:pl-[25%]">
        {/* Logo Image - responsive sizing */}
        <div className="mb-3 animate-fade-in">
          <Image
            src="/images/Logo.png"
            alt="Morvarid Beauty Logo"
            width={350}
            height={250}
            className="w-[220px] h-auto sm:w-[260px] md:w-[300px] lg:w-[350px]"
            priority
          />
        </div>
      </div>

      {/* Tagline Banner - CTA only on mobile, full banner on desktop */}
      <div className="absolute bottom-28 sm:bottom-32 md:bottom-28 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in-up delay-400 opacity-0">
        {/* Mobile: CTA button only - larger since no tagline */}
        <div className="md:hidden">
          <button
            onClick={openBooking}
            className="font-[family-name:var(--font-montserrat)] text-sm sm:text-base tracking-[0.15em] uppercase px-8 py-4 sm:px-10 sm:py-5 border-2 border-white/50 text-white hover:bg-white hover:text-gold transition-all duration-300 whitespace-nowrap bg-warm-gray/90 backdrop-blur-sm"
          >
            {t("cta")}
          </button>
        </div>
        
        {/* Desktop: Full banner with tagline */}
        <div className="hidden md:block">
          <div className="bg-warm-gray/90 backdrop-blur-sm px-8 py-4 md:px-12 md:py-5 flex flex-row items-center gap-8">
            <p className="font-[family-name:var(--font-montserrat)] text-base md:text-lg tracking-[0.12em] text-white whitespace-nowrap">
              {t("tagline")}
            </p>
            <button
              onClick={openBooking}
              className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase px-5 py-2 border border-white/50 text-white hover:bg-white hover:text-gold transition-all duration-300 whitespace-nowrap"
            >
              {t("cta")}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg
          className="w-5 h-5 text-warm-gray/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
