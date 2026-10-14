import { Github, Linkedin } from "./BrandIcons";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Background from "./Backgrounds/Background";

export default function Home() {
  return (
    <section id="home" className="hero section">
      <Background variant={2} />
      <div className="container hero-content">
        <p className="eyebrow">
          <span className="small-line" /> AI Engineer · Software developer
        </p>
        <h1>
          Bojan{" "}
          <span>
            Ivanovski<span className="accent-dot">.</span>
          </span>
        </h1>
        <p className="hero-description">
          Curiosity into code.
          <br />
          Ideas into things that work.
        </p>
        <p className="hero-detail">
          Building AI products, automation integrations, and developer tools,
          with a foundation in computer engineering.
        </p>
        <div className="button-row">
          <a
            href="#projects"
            className="button primary"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("projects").scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              });
            }}
          >
            Explore my work <ArrowUpRight size={18} />
          </a>
          <a
            href="https://github.com/Bojan-Ivanovski"
            className="social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={21} />
          </a>
          <a
            href="https://www.linkedin.com/in/bojan-ivanovski-aa9a34271"
            className="social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={21} />
          </a>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>Software / Systems / Exploration</span>
        <a
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("about").scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          Scroll to discover <ArrowDown size={17} />
        </a>
      </div>
      <span className="section-number" aria-hidden="true">
        01 / 04
      </span>
    </section>
  );
}
