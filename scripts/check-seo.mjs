import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { seoPages, getPageSeo } from "../src/data/seo.js";
for (const path of Object.keys(seoPages)) {
  const file = path === "/" ? "index.html" : `${path.slice(1)}/index.html`;
  const html = await readFile(
    new URL(`../dist/${file}`, import.meta.url),
    "utf8",
  );
  const page = getPageSeo(path);
  assert.equal((html.match(/<title>/g) || []).length, 1, `${file}: one title`);
  assert.equal(
    (html.match(/rel="canonical"/g) || []).length,
    1,
    `${file}: one canonical`,
  );
  assert.ok(html.includes(`href="${page.url}"`));
  assert.ok(html.includes("<h1>"), `${file}: prerendered page heading`);
  assert.ok(!html.includes("<!--seo-head-->"));
  const schema = html.match(
    /<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s,
  );
  assert.ok(schema, `${file}: JSON-LD`);
  JSON.parse(schema[1]);
  for (const asset of html.matchAll(
    /(?:src|href)="(\/portfolio\/assets\/[^"]+)"/g,
  ))
    await access(
      new URL(
        `../dist/${asset[1].slice("/portfolio/".length)}`,
        import.meta.url,
      ),
    );
}
const missing = await readFile(
  new URL("../dist/404.html", import.meta.url),
  "utf8",
);
assert.ok(missing.includes("noindex, follow"));
const sitemap = await readFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  "utf8",
);
for (const path of Object.keys(seoPages))
  assert.ok(sitemap.includes(`<loc>${getPageSeo(path).url}</loc>`));
assert.ok(!sitemap.includes("#"));
await access(new URL("../dist/social-card.png", import.meta.url));
console.log(
  "SEO output verified: static content, metadata, JSON-LD, sitemap, 404, image, and asset paths.",
);
