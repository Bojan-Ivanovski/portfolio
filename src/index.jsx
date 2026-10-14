import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import Catalog from "./Catalog";
import SubpageLayout from "./SubpageLayout";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <>
                <Home />
                <AboutMe />
                <Projects />
                <Contact />
              </>
            }
          />
          <Route path="Projects" element={<Catalog />} />
          <Route path="MoreAboutMe" element={<SubpageLayout />} />
          <Route
            path="*"
            element={
              <div className="container standalone">
                <h1>Page not found</h1>
                <a className="button" href="#/">
                  Back to home
                </a>
              </div>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
