import { site, getPageSeo } from "./seo.js";
import { skillGroups } from "./profile.js";
import { projects } from "./projects.js";

export function structuredData(pathname) {
  const page = getPageSeo(pathname);
  const home = `${site.origin}${site.base}`;
  const person = {
    "@type": "Person",
    "@id": `${home}#person`,
    name: site.name,
    url: home,
    jobTitle: "AI Engineer",
    description:
      "AI Engineer at Stonebranch developing AI products, integration tooling, and custom solutions with guardrails for organizational projects.",
    worksFor: { "@type": "Organization", name: "Stonebranch" },
    homeLocation: { "@type": "Place", name: "Skopje, North Macedonia" },
    knowsLanguage: ["English", "Macedonian"],
    knowsAbout: skillGroups.flatMap((group) => group.skills),
    sameAs: [
      "https://github.com/Bojan-Ivanovski",
      "https://www.linkedin.com/in/bojan-ivanovski-aa9a34271",
    ],
  };
  const webpage = {
    "@type": page.type,
    "@id": `${page.url}#webpage`,
    url: page.url,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": `${home}#website` },
    about: { "@id": person["@id"] },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: site.image,
      width: 1200,
      height: 630,
      caption: site.imageAlt,
    },
    ...(page.path === "/MoreAboutMe"
      ? { mainEntity: { "@id": person["@id"] } }
      : {}),
  };
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      url: home,
      name: `${site.name} — AI Engineer`,
      inLanguage: "en",
      publisher: { "@id": person["@id"] },
    },
    person,
    webpage,
  ];
  if (page.path !== "/") {
    const breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${page.url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: page.label, item: page.url },
      ],
    };
    webpage.breadcrumb = { "@id": breadcrumb["@id"] };
    graph.push(breadcrumb);
  }
  if (page.path === "/Projects") {
    const list = {
      "@type": "ItemList",
      "@id": `${page.url}#projects`,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          "@id": project.url,
          name: project.title,
          description: project.description,
          codeRepository: project.url,
          url: project.url,
          author: { "@id": person["@id"] },
          ...(project.language
            ? { programmingLanguage: project.language }
            : {}),
        },
      })),
    };
    webpage.mainEntity = { "@id": list["@id"] };
    graph.push(list);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
