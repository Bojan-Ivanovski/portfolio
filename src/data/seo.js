export const site = {
  origin: "https://bojan-ivanovski.github.io",
  base: "/portfolio/",
  name: "Bojan Ivanovski",
  image: "https://bojan-ivanovski.github.io/portfolio/social-card.png",
  imageAlt:
    "Bojan Ivanovski — AI Engineer. AI products, integrations, and developer tooling.",
};

export const seoPages = {
  "/": {
    title: "Bojan Ivanovski | AI Engineer & Software Developer",
    description:
      "Bojan Ivanovski, AI Engineer at Stonebranch in Skopje. Explore AI products, automation integrations, developer tools, and software engineering projects.",
    type: "WebPage",
    label: "Home",
  },
  "/MoreAboutMe": {
    title: "About Bojan Ivanovski | AI Engineer at Stonebranch",
    description:
      "Explore Bojan Ivanovski’s experience at Stonebranch, AI Integration Builder, agent tooling, technical skills, and computer engineering education.",
    type: "ProfilePage",
    label: "About me",
  },
  "/Projects": {
    title: "Projects | Bojan Ivanovski — AI & Software Engineering",
    description:
      "Explore Bojan Ivanovski’s GitHub projects in AI, web development, research, and engineering, including Tixyo and Trader Lens. Filter by language and category.",
    type: "CollectionPage",
    label: "Projects",
  },
};

export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function getPageSeo(pathname) {
  const path = normalizePath(pathname);
  const page = seoPages[path];
  return {
    ...(page || {
      title: "Page not found | Bojan Ivanovski",
      description:
        "This page could not be found. Explore Bojan Ivanovski’s portfolio, experience, and projects.",
      label: "Page not found",
      type: "WebPage",
    }),
    path,
    url: `${site.origin}${site.base}${path === "/" ? "" : `${path.slice(1)}/`}`,
    robots: page
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, follow",
  };
}
