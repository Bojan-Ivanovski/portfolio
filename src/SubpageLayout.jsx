import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Languages,
  MapPin,
} from "lucide-react";
import "./profile.css";
import Background from "./Backgrounds/Background";
import { cvProjects, education, experience, skillGroups } from "./data/profile";

function Tags({ items }) {
  return (
    <ul className="profile-tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Period({ entry }) {
  return (
    <p className="experience-period">
      <time dateTime={entry.start}>{entry.startLabel}</time>
      <span aria-hidden="true"> — </span>
      <span className="sr-only"> to </span>
      {entry.end ? (
        <time dateTime={entry.end}>{entry.endLabel}</time>
      ) : (
        <span>{entry.endLabel}</span>
      )}
    </p>
  );
}

export default function SubpageLayout() {
  return (
    <section className="section standalone profile-page">
      <Background />
      <div className="container">
        <Link to="/?section=about" className="text-link back-link">
          <ArrowLeft size={17} /> Back to home
        </Link>
        <header className="profile-intro">
          <p className="eyebrow">A little more about me</p>
          <h1>
            Engineering connections<span className="accent-dot">.</span>
          </h1>
          <p className="lead">
            I’m Bojan Ivanovski—an AI engineer connecting systems, building
            useful tools, and staying curious about what comes next.
          </p>
          <p className="profile-intro-detail">
            At Stonebranch, I develop AI products, agent tooling, and custom
            solutions with guardrails for projects across the organization,
            including new capabilities for the Universal Automation Center
            (UAC). My path here runs through frontend development, IT
            infrastructure, and computer engineering.
          </p>
          <div className="profile-facts">
            <span>
              <BriefcaseBusiness size={16} /> AI Engineer · Stonebranch
            </span>
            <span>
              <MapPin size={16} /> Skopje, North Macedonia
            </span>
            <span>
              <Languages size={16} /> Macedonian & English
            </span>
          </div>
        </header>
        <nav className="profile-navigation" aria-label="About page sections">
          {[
            ["experience", "Experience"],
            ["skills", "Skills"],
            ["education", "Education"],
            ["cv-projects", "Project foundations"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#/MoreAboutMe?section=${id}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                });
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <section
          className="profile-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="profile-section-heading">
            <p className="eyebrow">
              <BriefcaseBusiness size={17} /> 01 — Experience
            </p>
            <h2 id="experience-title">Building on experience.</h2>
            <p>
              From supporting systems to developing the integrations that
              connect them.
            </p>
          </div>
          <ol className="experience-timeline">
            {experience.map((entry) => (
              <li
                key={`${entry.company}-${entry.start}`}
                className="experience-entry"
              >
                <div className="experience-date">
                  <Period entry={entry} />
                  <span className="experience-company">{entry.company}</span>
                </div>
                <article className="experience-content">
                  <p className="experience-focus">{entry.focus}</p>
                  <h3>{entry.role}</h3>
                  <p>{entry.summary}</p>
                  <ul className="experience-highlights">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <Tags items={entry.technologies} />
                </article>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="profile-section"
          id="skills"
          aria-labelledby="skills-title"
        >
          <div className="profile-section-heading">
            <p className="eyebrow">
              <Code2 size={17} /> 02 — Technical skills
            </p>
            <h2 id="skills-title">Across the stack. Into the details.</h2>
            <p>
              Technologies, tools, and engineering practices I’m familiar with.
            </p>
          </div>
          <div className="profile-skills-grid">
            {skillGroups.map((group) => (
              <article className="profile-skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <Tags items={group.skills} />
              </article>
            ))}
          </div>
        </section>
        <section
          className="profile-section"
          id="education"
          aria-labelledby="education-title"
        >
          <div className="profile-section-heading">
            <p className="eyebrow">
              <GraduationCap size={18} /> 03 — Education & learning
            </p>
            <h2 id="education-title">An engineering foundation.</h2>
            <p>
              Formal study, practical training, and a habit of learning by
              building.
            </p>
          </div>
          <div className="education-list">
            {education.map((entry) => (
              <article className="education-entry" key={entry.qualification}>
                <p className="education-period">{entry.period}</p>
                <div>
                  <h3>{entry.qualification}</h3>
                  <p className="education-institution">{entry.institution}</p>
                  <p>{entry.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="profile-section"
          id="cv-projects"
          aria-labelledby="cv-projects-title"
        >
          <div className="profile-section-heading">
            <p className="eyebrow">04 — Project foundations</p>
            <h2 id="cv-projects-title">Where ideas became hands-on.</h2>
            <p>
              A few projects from my CV that helped shape how I build software
              and systems.
            </p>
          </div>
          <div className="cv-project-grid">
            {cvProjects.map((project, index) => (
              <article className="cv-project-card" key={project.title}>
                <span className="cv-project-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Tags items={project.technologies} />
              </article>
            ))}
          </div>
          <Link className="text-link profile-catalog-link" to="/Projects">
            Explore my current projects <ArrowUpRight size={17} />
          </Link>
        </section>
        <aside className="profile-outro">
          <div>
            <h2>Let’s build something useful.</h2>
            <p>
              If my experience fits what you’re working on, I’d love to hear
              about it.
            </p>
          </div>
          <Link className="button primary" to="/?section=contact">
            Let’s connect <ArrowUpRight size={17} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
