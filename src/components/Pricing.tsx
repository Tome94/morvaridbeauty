"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

const pricingData = {
  colour: {
    key: "colour",
    title: "COLOUR",
    items: [
      { name: "Balayage", price: "$156" },
      { name: "Highlights", price: "from $70" },
      { name: "Full Color & Style", price: "$155" },
      { name: "Ombré / Sombré", price: "$156" },
      { name: "Roots Touch Up", price: "from $90" },
    ],
  },
  cuts: {
    key: "cuts",
    title: "CUT & STYLE",
    items: [
      { name: "Haircut & Style", price: "$75" },
      { name: "Wash & Style", price: "$50" },
      { name: "Up-do", price: "$50 – $120" },
      { name: "Wash & Dry", price: "$35" },
      { name: "Fringe / Bangs Trim", price: "$15" },
    ],
  },
  treatments: {
    key: "treatments",
    title: "TREATMENTS",
    items: [
      { name: "Deep Conditioning", price: "$30" },
      { name: "Keratin Treatment", price: "$400" },
      { name: "Hair Botox", price: "from $400" },
      { name: "Dr. Sorbie Treatment", price: "from $80" },
    ],
  },
  browFace: {
    key: "browFace",
    title: "BROW & FACE",
    items: [
      { name: "Eyebrow Wax", price: "$13" },
      { name: "Eyebrow Threading", price: "$30" },
      { name: "Full Face Wax", price: "$35" },
      { name: "Full Face Threading", price: "$50" },
    ],
  },
  makeup: {
    key: "makeup",
    title: "MAKE UP",
    items: [
      { name: "Daily", price: "$75" },
      { name: "Evening", price: "$95" },
      { name: "Bridal", price: "$150" },
    ],
  },
};

export default function Pricing() {
  const t = useTranslations("pricing");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("colour");
  const categories = Object.values(pricingData);

  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl lg:text-5xl text-warm-gray text-center mb-4">
          {t("title")}
        </h2>
        <p className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray-light text-center mb-16 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-2">
          {categories.map((category) => (
            <div key={category.key} className="border-b border-warm-gray/10">
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <h3 className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.2em] text-warm-gray">
                  {category.title}
                </h3>
                <svg 
                  className={`w-4 h-4 text-warm-gray transition-transform duration-300 ${expandedCategory === category.key ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  expandedCategory === category.key ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-3 pl-2">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex justify-between items-baseline">
                      <span className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray">
                        {item.name}
                      </span>
                      <span className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray-light">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {categories.map((category) => (
            <div key={category.key}>
              <h3 className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.2em] text-warm-gray mb-6 pb-3 border-b border-warm-gray/20">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-baseline lg:flex-col lg:items-start gap-2">
                    <span className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray">
                      {item.name}
                    </span>
                    <span className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray-light">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Book Button */}
        <div className="mt-16 text-center">
          <Link
            href="https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-[family-name:var(--font-montserrat)] text-sm tracking-[0.15em] uppercase px-10 py-4 border border-warm-gray text-warm-gray hover:bg-warm-gray hover:text-white transition-all duration-300"
          >
            {t("viewFullMenu")}
          </Link>
        </div>
        
        {/* Disclaimer */}
        <p className="font-[family-name:var(--font-montserrat)] text-xs text-warm-gray-light text-center mt-6">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
