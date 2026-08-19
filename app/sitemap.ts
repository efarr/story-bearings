import type { MetadataRoute } from "next";
import { catalog } from "@/catalog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    ...catalog.listBooks().map((book) => ({
      url: `${SITE_URL}/${book.slug}`,
    })),
  ];
}
