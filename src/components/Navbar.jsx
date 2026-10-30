
import { useState } from "react";
import {
  Menu,
  X,
  Download,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Learning", id: "learning" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
  };

  const goHome = () => {
    setOpen(false);
    navigate("/");

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const goAdmin = () => {
    setOpen(false);
    navigate("/admin");
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <button
          className="logo"
          type="button"
          onClick={goHome}
          aria-label="Abdul Ajim S. - Home"
        >
          <span>&lt;</span>
          Abdul Ajim S.
          <span>/&gt;</span>
        </button>

        {/* NAVIGATION */}
        <nav
          className={open ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <button
            className="admin-mini"
            type="button"
            onClick={goAdmin}
          >
            <LayoutDashboard size={15} />
            Admin
          </button>

          {/* Resume PDF: add your file to public/resume.pdf */}
          <a
            className="resume-button"
            href="/resume.pdf"
            download="Abdul-Ajim-S-Resume.pdf"
            aria-label="Download Abdul Ajim S. resume"
          >
            <Download size={15} />
            Resume
          </a>

          <button
            className="mobile-menu"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
