import { Github, Linkedin } from "./BrandIcons";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import Background from "./Backgrounds/Background";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <Background />
      <div className="container">
        <p className="eyebrow">04 — Get in touch</p>
        <div className="contact-grid">
          <div>
            <h2>
              Have an idea?
              <br />
              <span className="muted-heading">Let’s talk.</span>
            </h2>
            <p className="lead">
              A project, a question, or just a hello.
              <br />
              I’d love to hear from you.
            </p>
            <a className="email-link" href="mailto:0ivanovskibojan@gmail.com">
              0ivanovskibojan@gmail.com <ArrowUpRight size={20} />
            </a>
            <div className="contact-socials">
              <a
                href="https://github.com/Bojan-Ivanovski"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} /> GitHub <ArrowUpRight size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/bojan-ivanovski-aa9a34271"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} />
              </a>
            </div>
            <p className="contact-caption">
              <Mail size={15} /> Prefer email? Reach out directly.
            </p>
          </div>
          <form
            className="contact-form"
            action="https://formspree.io/f/xrgwznlp"
            method="POST"
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Name and surname"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              Subject
              <input
                name="subject"
                placeholder="What’s on your mind?"
                required
                maxLength={200}
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me a little about it…"
                required
                maxLength={10000}
              />
            </label>
            <div className="form-bottom">
              <span>Delivered via Formspree.</span>
              <button className="button primary" type="submit">
                Send message <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
