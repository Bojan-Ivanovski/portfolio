import test from "node:test";
import assert from "node:assert/strict";
import { getPageSeo, seoPages, site } from "../src/data/seo.js";
import { structuredData } from "../src/data/structured-data.js";
import { projects } from "../src/data/projects.js";

test("indexable pages have unique metadata and canonical URLs without fragments", () => {
  const pages = Object.keys(seoPages).map(getPageSeo);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(
    new Set(pages.map((page) => page.description)).size,
    pages.length,
  );
  for (const page of pages) {
    assert.ok(page.title.length <= 65);
    assert.ok(page.description.length <= 165);
    assert.ok(page.url.startsWith(`${site.origin}${site.base}`));
    assert.equal(new URL(page.url).hash, "");
    assert.ok(page.url.endsWith("/"));
    assert.ok(page.robots.startsWith("index,"));
  }
});

test("trailing slashes resolve consistently and unknown pages are excluded from indexing", () => {
  assert.deepEqual(getPageSeo("/Projects/"), getPageSeo("/Projects"));
  assert.deepEqual(getPageSeo("/MoreAboutMe/"), getPageSeo("/MoreAboutMe"));
  assert.equal(getPageSeo("/not-a-page").robots, "noindex, follow");
});

test("profile schema reflects the current role without claiming a completed degree", () => {
  const schema = structuredData("/MoreAboutMe/");
  const person = schema["@graph"].find((item) => item["@type"] === "Person");
  const profile = schema["@graph"].find(
    (item) => item["@type"] === "ProfilePage",
  );
  assert.equal(person.jobTitle, "AI Engineer");
  assert.equal(person.worksFor.name, "Stonebranch");
  assert.equal(profile.mainEntity["@id"], person["@id"]);
  assert.equal(person.alumniOf, undefined);
  assert.ok(!person.knowsAbout.includes("System design"));
});

test("project schema matches the visible catalog and its source repositories", () => {
  const graph = structuredData("/Projects")["@graph"];
  const list = graph.find((item) => item["@type"] === "ItemList");
  assert.equal(list.numberOfItems, projects.length);
  assert.deepEqual(
    list.itemListElement.map((entry) => entry.item.codeRepository),
    projects.map((project) => project.url),
  );
  assert.ok(graph.some((item) => item["@type"] === "BreadcrumbList"));
});
