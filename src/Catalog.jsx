import { Github } from "./BrandIcons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import Background from "./Backgrounds/Background";
import ProjectCard from "./ProjectCard";
import { projects, syncedAt } from "./data/projects";

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];
export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const filtered = projects.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      (language === "All" || project.language === language) &&
      `${project.title} ${project.description} ${project.language || ""} ${project.topics.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section className="section standalone">
      <Background />
      <div className="container">
        <Link to="/?section=projects" className="text-link back-link">
          <ArrowLeft size={17} /> Back to home
        </Link>
        <p className="eyebrow">The project catalog</p>
        <div className="section-heading">
          <div>
            <h1>
              Built. Tested. Explored<span className="accent-dot">.</span>
            </h1>
            <p>Applications, experiments, and everything in between.</p>
          </div>
          <a
            href="https://github.com/Bojan-Ivanovski"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} /> GitHub profile
          </a>
        </div>
        <div className="catalog-controls">
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects, technologies…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="language-filter">
            <span className="sr-only">Filter by language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="All">All languages</option>
              {[
                ...new Set(
                  projects.map((project) => project.language).filter(Boolean),
                ),
              ]
                .sort()
                .map((value) => (
                  <option key={value}>{value}</option>
                ))}
            </select>
          </label>
        </div>
        <div className="filter-list" aria-label="Filter by category">
          {categories.map((value) => (
            <button
              key={value}
              className={value === category ? "filter active" : "filter"}
              aria-pressed={value === category}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="catalog-count" role="status">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"} ·
          Synced{" "}
          {new Date(syncedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
        <div className="project-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h2>No projects found</h2>
            <p>Try another keyword or reset the filters.</p>
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLanguage("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
