import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Background from "./Backgrounds/Background";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "./data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <Background variant={2} />
      <div className="container">
        <p className="eyebrow">03 — Selected work</p>
        <div className="section-heading">
          <div>
            <h2>
              Ideas, put into practice<span className="accent-dot">.</span>
            </h2>
            <p>A selection of things I’ve been building and exploring.</p>
          </div>
          <Link className="text-link" to="/Projects/">
            All projects <ArrowUpRight size={18} />
          </Link>
        </div>
        <Swiper
          className="project-slider"
          modules={[A11y, Keyboard, Pagination]}
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            680: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {featuredProjects.map((project, index) => (
            <SwiperSlide key={project.name}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="github-note">Connected to GitHub. Curated here.</p>
      </div>
    </section>
  );
}
