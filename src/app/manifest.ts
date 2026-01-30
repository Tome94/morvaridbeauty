import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Morvarid Beauty",
    short_name: "Morvarid",
    description:
      "Master hairstylist in Thornhill - Balayage, Keratin, Precision Cuts",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#C9A96E",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
