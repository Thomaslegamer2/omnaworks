import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { products } from "@/lib/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const pages = ["/", "/equipe", "/produits", "/approche", "/contact", "/mentions", ...products.map((product) => product.href)];

  return pages.map((path) => ({
    url: `${site}${path === "/" ? "/" : path}`,
    changeFrequency: path === "/" || path === "/produits" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
