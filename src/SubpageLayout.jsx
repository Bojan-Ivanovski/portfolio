import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Background from "./Backgrounds/Background";

export default function SubpageLayout() {
  return (
    <section className="section standalone">
      <Background />
      <div className="container about-detail">
        <Link to="/?section=about" className="text-link back-link">
          <ArrowLeft size={17} /> Back to home
        </Link>
        <p className="eyebrow">A little more about me</p>
        <h1>
          Driven by curiosity<span className="accent-dot">.</span>
        </h1>
        <p className="lead">
          I’m Bojan Ivanovski, a developer with a background in computer
          engineering and a broad interest in technology.
        </p>
        <article>
          <h2>From understanding to building</h2>
          <p>
            I started learning programming in high school and continued through
            computer engineering at the Faculty of Computer Science and
            Engineering. I enjoy working across the stack: designing interfaces,
            building services, and understanding the systems that connect them.
          </p>
        </article>
        <article>
          <h2>Practical experience</h2>
          <p>
            Alongside web and desktop application development, my experience in
            IT includes technical support, troubleshooting, network
            infrastructure, and working with databases. That mix shapes how I
            approach software: consider the whole system and build something
            useful.
          </p>
        </article>
        <article>
          <h2>Beyond the browser</h2>
          <p>
            Robotics and electronics have always interested me. My projects also
            explore machine learning, research pipelines, and intelligent
            systems—different ways to combine a practical engineering mindset
            with an appetite for learning.
          </p>
        </article>
        <Link className="button primary" to="/?section=contact">
          Let’s connect <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
