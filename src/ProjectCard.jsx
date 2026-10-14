import { Github } from "./BrandIcons";
import { ArrowUpRight, Code2, Star } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className="project-card">
      <div className="project-art" aria-hidden="true">
        <span className="project-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Code2 size={58} strokeWidth={1} />
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.language || "Software"}</span>
          {project.stars > 0 && (
            <span>
              <Star size={13} /> {project.stars}
            </span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          <a href={project.url} target="_blank" rel="noreferrer">
            <Github size={16} /> Source code <ArrowUpRight size={15} />
          </a>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noreferrer">
              Visit site <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
