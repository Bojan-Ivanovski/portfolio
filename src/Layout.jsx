import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const sections = [
  ["home", "Home"],
  ["about", "About me"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      return saved === null
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : saved === "true";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("darkMode", String(dark));
    } catch {
      /* Theme remains usable without storage. */
    }
  }, [dark]);
  useEffect(() => {
    const target = new URLSearchParams(location.search).get("section");
    const frame = requestAnimationFrame(() => {
      if (target) document.getElementById(target)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  function navigate(event, id) {
    setMenuOpen(false);
    if (location.pathname === "/") {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content").focus();
          document.getElementById("main-content").scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Link to="/" className="wordmark" onClick={() => setMenuOpen(false)}>
            Bojan Ivanovski<span>.</span>
          </Link>
          <nav
            id="main-navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            {sections.map(([id, label]) => (
              <Link
                key={id}
                to={`/?section=${id}`}
                onClick={(event) => navigate(event, id)}
                aria-current={
                  location.pathname === "/" && active === id
                    ? "location"
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={() => setDark((value) => !value)}
              aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      {location.pathname === "/" && (
        <nav className="section-indicators" aria-label="Page sections">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#/?section=${id}`}
              onClick={(event) => navigate(event, id)}
              className={active === id ? "active" : ""}
              aria-label={label}
              aria-current={active === id ? "location" : undefined}
            >
              <span>{label}</span>
            </a>
          ))}
        </nav>
      )}
      <footer className="site-footer container">
        <p>© {new Date().getFullYear()} Bojan Ivanovski</p>
        <p>Built with curiosity. Made with React.</p>
        <a
          href="https://github.com/Bojan-Ivanovski/portfolio"
          target="_blank"
          rel="noreferrer"
        >
          View source <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
