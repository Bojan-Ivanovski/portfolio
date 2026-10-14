import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeo, site } from "./data/seo";

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageSeo(pathname);
    document.title = page.title;
    const values = {
      description: page.description,
      robots: page.robots,
      "og:title": page.title,
      "og:description": page.description,
      "og:url": page.url,
      "og:type": "website",
      "og:site_name": site.name,
      "og:locale": "en_US",
      "og:image": site.image,
      "og:image:secure_url": site.image,
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": site.imageAlt,
      "twitter:card": "summary_large_image",
      "twitter:title": page.title,
      "twitter:description": page.description,
      "twitter:image": site.image,
      "twitter:image:alt": site.imageAlt,
    };
    for (const [name, content] of Object.entries(values)) {
      const attribute = name.startsWith("og:") ? "property" : "name";
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.append(meta);
      }
      meta.setAttribute("content", content);
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = page.url;
    // The initial document includes page-specific JSON-LD. Replace it on navigation.
    const schema = document.getElementById("structured-data");
    if (schema) schema.remove();
    import("./data/structured-data").then(({ structuredData }) => {
      if (document.querySelector('link[rel="canonical"]')?.href !== page.url)
        return;
      const script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData(pathname));
      document.getElementById("structured-data")?.remove();
      document.head.append(script);
    });
  }, [pathname]);
  return null;
}
