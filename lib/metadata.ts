import type { Metadata, Viewport } from "next";
import { dictionaries, type Locale } from "./content";

export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: "/img/brands/elgarhy-steel-dark.webp" },
    alternates: { languages: { ar: "/", en: "/en/" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: ["/video/steel-loop-poster.webp"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
