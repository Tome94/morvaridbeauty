"use client";

import { useTranslations } from "next-intl";

export default function LocationHours() {
  const t = useTranslations("location");

  const businessHours = [
    { day: "Monday", hours: "10 a.m. – 7 p.m." },
    { day: "Tuesday", hours: "10 a.m. – 7 p.m." },
    { day: "Wednesday", hours: "10 a.m. – 7 p.m." },
    { day: "Thursday", hours: "10 a.m. – 7 p.m." },
    { day: "Friday", hours: "10 a.m. – 7 p.m." },
    { day: "Saturday", hours: "10 a.m. – 7 p.m." },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <section id="location" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Map */}
          <div className="relative">
            <div className="aspect-[4/3] w-full bg-cream overflow-hidden rounded-sm shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.8888888888886!2d-79.46!3d43.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d0e0e0e0e0e%3A0x0!2s390%20Steeles%20Ave%20W%2C%20Thornhill%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Morvarid Beauty Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-warm-gray mb-8">
              {t("hours")}
            </h2>

            {/* Hours List */}
            <ul className="space-y-3 mb-10">
              {businessHours.map((item) => (
                <li
                  key={item.day}
                  className="flex justify-between font-[family-name:var(--font-montserrat)] text-sm"
                >
                  <span className="text-warm-gray">{item.day}</span>
                  <span className={item.hours === "Closed" ? "text-gold" : "text-warm-gray-light"}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-4 pt-8 border-t border-cream">
              <div>
                <h3 className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] text-warm-gray-light mb-2">
                  {t("title")}
                </h3>
                <p dir="ltr" className="font-[family-name:var(--font-cormorant)] text-xl text-warm-gray">
                  Morvarid @ Nola Salon
                </p>
                <p dir="ltr" className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray-light">
                  390 Steeles Ave W, Thornhill, ON
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=390+Steeles+Ave+W,+Thornhill,+ON"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-[family-name:var(--font-montserrat)] text-sm text-gold hover:text-gold-dark transition-colors duration-300"
              >
                {t("getDirections")} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
