import snapshot from "./github.json";

const presentation = {
  tixyo: { title: "Tixyo", category: "Applications" },
  "trader-lens-frontend": { title: "Trader Lens", category: "Applications" },
  "tbt-engine": { title: "TBT Engine", category: "Engineering" },
  "finki-totp": { title: "TOTP Authenticator", category: "Applications" },
  "finki-open-tslm": { title: "SmartHeart · OpenTSLM", category: "Research" },
  "finki-nerf": { title: "Neural Radiance Fields", category: "Research" },
  "finki-snake-tree-search": {
    title: "Snake · Tree Search",
    category: "Engineering",
  },
  "heral-metal": { title: "Heral Metal", category: "Websites" },
  "lift-go-mk": { title: "LiftGoMK", category: "Websites" },
};
export const projects = snapshot.projects.map((project) => ({
  ...project,
  title: presentation[project.name]?.title || project.name,
  category: presentation[project.name]?.category || "Other",
}));
export const featuredProjects = [
  "tixyo",
  "trader-lens-frontend",
  "finki-totp",
  "finki-open-tslm",
]
  .map((name) => projects.find((project) => project.name === name))
  .filter(Boolean);
export const syncedAt = snapshot.syncedAt;
