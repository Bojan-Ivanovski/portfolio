import { mkdir, readFile, writeFile } from "node:fs/promises";
import { render } from "../dist-ssr/entry-server.js";
import { getPageSeo, seoPages, site } from "../src/data/seo.js";
import { structuredData } from "../src/data/structured-data.js";

const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function metadata(path) {
  const page = getPageSeo(path);
  const values = {
    description: page.description,
    author: site.name,
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
  const metas = Object.entries(values)
    .map(
      ([name, content]) =>
        `<meta ${name.startsWith("og:") ? "property" : "name"}="${name}" content="${escape(content)}" />`,
    )
    .join("\n");
  const json = JSON.stringify(structuredData(path)).replaceAll("<", "\\u003c");
  return `<title>${escape(page.title)}</title>\n<link rel="canonical" href="${page.url}" />\n${metas}\n<script id="structured-data" type="application/ld+json">${json}</script>`;
}
for (const path of [...Object.keys(seoPages), "/404"]) {
  const directory =
    path === "/" || path === "/404"
      ? new URL("../dist/", import.meta.url)
      : new URL(`../dist/${path.slice(1)}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  const body = render(path);
  const html = template
    .replace("<!--seo-head-->", metadata(path))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  await writeFile(
    new URL(path === "/404" ? "404.html" : "index.html", directory),
    html,
  );
}
const urls = Object.keys(seoPages)
  .map((path) => `  <url><loc>${getPageSeo(path).url}</loc></url>`)
  .join("\n");
await writeFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(
  new URL("../dist/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}${site.base}sitemap.xml\n`,
);
console.log(
  "Prerendered home, about, projects, and 404 pages; generated sitemap and robots.txt.",
);
