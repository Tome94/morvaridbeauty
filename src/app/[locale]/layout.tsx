import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { BookingProvider } from "@/context/BookingContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Comprehensive SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.morvaridhairstudio.com"),
  title: {
    default: "Morvarid Beauty | Master Hairstylist in Thornhill",
    template: "%s | Morvarid Beauty",
  },
  description:
    "With over 22 years of experience, Morvarid specializes in balayage, highlights, keratin treatments, and precision haircuts. Serving Thornhill, North York & Toronto. Modern Cuts. Clean Style. Effortless Beauty.",
  keywords: [
    "hairstylist Thornhill",
    "hairstylist North York",
    "balayage Toronto",
    "balayage North York",
    "hair salon Thornhill",
    "hair salon North York",
    "hair salon Toronto",
    "keratin treatment Toronto",
    "keratin treatment North York",
    "hair botox",
    "highlights",
    "bridal hair makeup Toronto",
    "Persian hairstylist Toronto",
    "Iranian hair salon Toronto",
    "Iranian hair salon North York",
    "hair color specialist",
    "precision haircut",
    "Morvarid Beauty",
    "Morvarid Hair Studio",
  ],
  authors: [{ name: "Morvarid Beauty" }],
  creator: "Morvarid Beauty",
  publisher: "Morvarid Beauty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fa_IR",
    url: "https://www.morvaridhairstudio.com",
    siteName: "Morvarid Beauty",
    title: "Morvarid Beauty | Master Hairstylist in Thornhill",
    description:
      "22+ years of experience in balayage, keratin treatments, and precision haircuts. Book your appointment today.",
    images: [
      {
        url: "/images/Hero-main.png",
        width: 1200,
        height: 630,
        alt: "Morvarid Beauty - Professional Hair Styling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morvarid Beauty | Master Hairstylist in Thornhill",
    description:
      "22+ years of experience in balayage, keratin treatments, and precision haircuts.",
    images: ["/images/Hero-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "Beauty & Personal Care",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  // Set direction for RTL languages (Farsi)
  const dir = locale === "fa" ? "rtl" : "ltr";

  // JSON-LD structured data for local business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Morvarid Beauty",
    description:
      "Master hairstylist specializing in balayage, keratin treatments, and precision haircuts with over 22 years of experience. Serving Thornhill, North York, and Toronto.",
    url: "https://www.morvaridhairstudio.com",
    telephone: "+1-416-843-9911",
    address: {
      "@type": "PostalAddress",
      streetAddress: "390 Steeles Ave W",
      addressLocality: "Thornhill",
      addressRegion: "ON",
      postalCode: "L4J 1A1",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.8,
      longitude: -79.46,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    image: "https://www.morvaridhairstudio.com/images/Hero-main.png",
    areaServed: [
      { "@type": "City", name: "Thornhill" },
      { "@type": "City", name: "North York" },
      { "@type": "City", name: "Toronto" },
    ],
    sameAs: ["https://www.instagram.com/morvarid.beauty.ca/"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Balayage",
            description: "Dimensional hair coloring technique",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Keratin Treatment",
            description: "Smoothing and repair treatment",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Precision Haircut",
            description: "Expert haircuts with styling",
          },
        },
      ],
    },
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <BookingProvider>
            <Navbar />
            {children}
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
