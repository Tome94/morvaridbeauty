import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="m-0 p-0">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <LocationHours />
      <Footer />
    </main>
  );
}
