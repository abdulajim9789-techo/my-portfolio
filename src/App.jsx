
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Learning from "./components/Learning";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

import { defaultPortfolio } from "./data/defaultData";

const STORAGE_KEY = "portfolioData";

function loadPortfolioFromStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return defaultPortfolio;
    }

    const saved = JSON.parse(savedData);

    return {
      ...defaultPortfolio,
      ...saved,

      profile: {
        ...defaultPortfolio.profile,
        ...(saved.profile || {}),
      },

      projects: Array.isArray(saved.projects)
        ? saved.projects
        : defaultPortfolio.projects,

      skills: Array.isArray(saved.skills)
        ? saved.skills
        : defaultPortfolio.skills,

      education: Array.isArray(saved.education)
        ? saved.education
        : defaultPortfolio.education,

      learning: Array.isArray(saved.learning)
        ? saved.learning
        : defaultPortfolio.learning,

      achievements: Array.isArray(saved.achievements)
        ? saved.achievements
        : defaultPortfolio.achievements,

      certifications: Array.isArray(saved.certifications)
        ? saved.certifications
        : defaultPortfolio.certifications,
    };
  } catch (error) {
    console.error("Could not load saved portfolio:", error);
    return defaultPortfolio;
  }
}

function PortfolioHome({ portfolio }) {
  return (
    <>
      <Navbar />

      <main>
        <Hero profile={portfolio.profile} />

        <About profile={portfolio.profile} />

        <Education education={portfolio.education} />

        <Skills skills={portfolio.skills} />

        <Learning learning={portfolio.learning} />

        <Projects projects={portfolio.projects} />

        <Achievements achievements={portfolio.achievements} />

        <Certifications certifications={portfolio.certifications} />

        <Contact profile={portfolio.profile} />
      </main>

      <Footer />
    </>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState(
    loadPortfolioFromStorage
  );

  // Save portfolio changes in the current browser.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(portfolio)
      );
    } catch (error) {
      console.error("Could not save portfolio:", error);
      alert(
        "Portfolio could not be saved. Browser storage may be full."
      );
    }
  }, [portfolio]);

  // Admin login state.
  const [isAdmin, setIsAdmin] = useState(
    () =>
      sessionStorage.getItem("adminAuthenticated") === "true"
  );

  const handleLogin = () => {
    sessionStorage.setItem("adminAuthenticated", "true");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    setIsAdmin(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<PortfolioHome portfolio={portfolio} />}
      />

      <Route
        path="/admin/login"
        element={
          isAdmin ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogin onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/admin"
        element={
          isAdmin ? (
            <AdminDashboard
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
