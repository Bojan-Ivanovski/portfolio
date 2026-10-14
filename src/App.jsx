import { Link, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import Catalog from "./Catalog";
import SubpageLayout from "./SubpageLayout";

export default function App() {
  return (
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
              <Link className="button" to="/">
                Back to home
              </Link>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
