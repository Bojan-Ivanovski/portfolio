import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, Cpu, Database, Wrench } from "lucide-react";
import Background from "./Backgrounds/Background";

const skills = [
  {
    icon: Code2,
    title: "Web & applications",
    text: "Interfaces and services, from the browser to the backend.",
  },
  {
    icon: Database,
    title: "Data & intelligent systems",
    text: "Research, model evaluation, and tools for working with data.",
  },
  {
    icon: Cpu,
    title: "Engineering & electronics",
    text: "A curiosity for robotics, hardware, and how systems fit together.",
  },
  {
    icon: Wrench,
    title: "IT & infrastructure",
    text: "Practical experience with support, networks, and databases.",
  },
];
export default function AboutMe() {
  return (
    <section id="about" className="section about-section">
      <Background />
      <div className="container">
        <p className="eyebrow">02 — About me</p>
        <div className="about-grid">
          <div>
            <h2>
              A curious mind.
              <br />
              <span className="muted-heading">A practical approach.</span>
            </h2>
            <p className="lead">
              Hello, I’m Bojan. I enjoy understanding how things work—and
              building things that make a difference.
            </p>
            <p>
              My background in computer engineering brings together software
              development, IT, and a lasting interest in electronics. I work
              across frontend and backend systems, with projects that explore
              everything from web applications to machine learning.
            </p>
            <Link className="text-link" to="/MoreAboutMe/">
              A little more about me <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="skills-grid">
            {skills.map(({ icon: Icon, title, text }) => (
              <article className="skill-card" key={title}>
                <Icon size={24} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
