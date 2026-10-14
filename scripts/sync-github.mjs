import { writeFile, rename } from "node:fs/promises";

const username = "Bojan-Ivanovski";
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "bojan-portfolio",
};
if (process.env.GITHUB_TOKEN)
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
const repos = [];
for (let page = 1; ; page++) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?type=owner&per_page=100&sort=updated&page=${page}`,
    { headers, signal: AbortSignal.timeout(15000) },
  );
  if (!response.ok)
    throw new Error(
      `GitHub sync failed (${response.status}); existing snapshot is unchanged.`,
    );
  const batch = await response.json();
  if (!Array.isArray(batch)) throw new Error("Unexpected GitHub response");
  repos.push(...batch);
  if (batch.length < 100) break;
}
const projects = repos
  .filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !repo.disabled &&
      repo.name.toLowerCase() !== username.toLowerCase(),
  )
  .map((repo) => ({
    name: repo.name,
    description:
      repo.description ||
      "Explore the source code and documentation on GitHub.",
    url: repo.html_url,
    homepage:
      repo.homepage && /^https:\/\//.test(repo.homepage) ? repo.homepage : null,
    language: repo.language,
    topics: repo.topics || [],
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at,
  }));
if (!projects.length)
  throw new Error("Refusing to replace the snapshot with an empty catalog.");
const target = new URL("../src/data/github.json", import.meta.url);
const temporary = new URL("../src/data/github.json.tmp", import.meta.url);
await writeFile(
  temporary,
  `${JSON.stringify({ username, syncedAt: new Date().toISOString(), projects }, null, 2)}\n`,
);
await rename(temporary, target);
console.log(`Synced ${projects.length} public projects for ${username}.`);
