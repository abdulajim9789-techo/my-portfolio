
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  FolderKanban,
  Code2,
  GraduationCap,
  Trophy,
  Award,
  BookOpen,
  Globe2,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import ProfileManager from "./ProfileManager";
import ProjectManager from "./ProjectManager";
import SkillManager from "./SkillManager";
import EducationManager from "./EducationManager";
import AchievementManager from "./AchievementManager";
import CertificationManager from "./CertificationManager";
import LearningManager from "./LearningManager";

import "./AdminDashboard.css";

export default function AdminDashboard({
  portfolio = {},
  setPortfolio,
  onLogout,
}) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sections = {
    projects: portfolio.projects || [],
    skills: portfolio.skills || [],
    education: portfolio.education || [],
    learning: portfolio.learning || [],
    achievements: portfolio.achievements || [],
    certifications: portfolio.certifications || [],
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Profile", icon: UserRound },
    {
      label: "Projects",
      icon: FolderKanban,
      count: sections.projects.length,
    },
    {
      label: "Skills",
      icon: Code2,
      count: sections.skills.length,
    },
    {
      label: "Learning",
      icon: BookOpen,
      count: sections.learning.length,
    },
    {
      label: "Education",
      icon: GraduationCap,
      count: sections.education.length,
    },
    {
      label: "Achievements",
      icon: Trophy,
      count: sections.achievements.length,
    },
    {
      label: "Certifications",
      icon: Award,
      count: sections.certifications.length,
    },
  ];

  const stats = [
    {
      label: "Projects",
      count: sections.projects.length,
      icon: FolderKanban,
      color: "violet",
    },
    {
      label: "Skills",
      count: sections.skills.length,
      icon: Code2,
      color: "blue",
    },
    {
      label: "Education",
      count: sections.education.length,
      icon: GraduationCap,
      color: "orange",
    },
    {
      label: "Learning",
      count: sections.learning.length,
      icon: BookOpen,
      color: "green",
    },
    {
      label: "Achievements",
      count: sections.achievements.length,
      icon: Trophy,
      color: "pink",
    },
    {
      label: "Certifications",
      count: sections.certifications.length,
      icon: Award,
      color: "cyan",
    },
  ];

  const pageTitles = {
    Dashboard: "Overview",
    Profile: "Profile management",
    Projects: "Your projects",
    Skills: "Your skills",
    Learning: "Learning journey",
    Education: "Education",
    Achievements: "Achievements",
    Certifications: "Certifications",
  };

  const selectSection = (label) => {
    setActiveMenu(label);
    setMobileOpen(false);
  };

  const viewPortfolio = () => {
    setMobileOpen(false);
    navigate("/");
  };

  const logout = () => {
    if (onLogout) {
      onLogout();
    } else {
      sessionStorage.removeItem("adminAuthenticated");
    }

    navigate("/admin/login");
  };

  const renderManager = () => {
    switch (activeMenu) {
      case "Profile":
        return (
          <ProfileManager
            portfolio={portfolio}
            setPortfolio={setPortfolio}
          />
        );

      case "Projects":
        return (
          <ProjectManager
            projects={sections.projects}
            setPortfolio={setPortfolio}
          />
        );

      case "Skills":
        return (
          <SkillManager
            skills={sections.skills}
            setPortfolio={setPortfolio}
          />
        );

      case "Learning":
        return (
          <LearningManager
            learning={sections.learning}
            setPortfolio={setPortfolio}
          />
        );

      case "Education":
        return (
          <EducationManager
            education={sections.education}
            setPortfolio={setPortfolio}
          />
        );

      case "Achievements":
        return (
          <AchievementManager
            achievements={sections.achievements}
            setPortfolio={setPortfolio}
          />
        );

      case "Certifications":
        return (
          <CertificationManager
            certifications={sections.certifications}
            setPortfolio={setPortfolio}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`premium-admin ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {mobileOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`premium-sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <button
          className="premium-brand"
          type="button"
          onClick={() => selectSection("Dashboard")}
        >
          <span className="brand-symbol">
            <Sparkles size={22} />
          </span>

          <span className="brand-copy">
            <strong>Admin Studio</strong>
            <small>PORTFOLIO WORKSPACE</small>
          </span>
        </button>

        <div className="sidebar-caption">WORKSPACE</div>

        <nav className="premium-nav" aria-label="Admin navigation">
          {menuItems.map(({ label, icon: Icon, count }) => (
            <button
              key={label}
              type="button"
              title={collapsed ? label : undefined}
              className={`premium-nav-item ${
                activeMenu === label ? "active" : ""
              }`}
              onClick={() => selectSection(label)}
              aria-current={
                activeMenu === label ? "page" : undefined
              }
            >
              <Icon size={19} strokeWidth={1.8} />

              <span className="nav-label">{label}</span>

              {typeof count === "number" && (
                <span className="nav-count">{count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <Sparkles size={17} />
            <div>
              <strong>Keep creating</strong>
              <span>Your next idea starts here.</span>
            </div>
          </div>

          <button
            className="premium-bottom-link"
            type="button"
            onClick={viewPortfolio}
          >
            <Globe2 size={18} />
            <span className="nav-label">View portfolio</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            className="premium-bottom-link logout-link"
            type="button"
            onClick={logout}
          >
            <LogOut size={18} />
            <span className="nav-label">Log out</span>
          </button>

          <div className="sidebar-footer">
            <span className="online-dot" />
            <span className="nav-label">Workspace ready</span>
          </div>
        </div>
      </aside>

      {/* Main workspace */}
      <div className="premium-main">
        <header className="premium-topbar">
          <div className="topbar-left">
            <button
              className="icon-action mobile-menu-trigger"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <button
              className="icon-action collapse-trigger"
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={
                collapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen size={19} />
              ) : (
                <PanelLeftClose size={19} />
              )}
            </button>

            <div className="breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={15} />
              <strong>{pageTitles[activeMenu]}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <div className="workspace-status">
              <span className="online-dot" />
              <span>Local workspace</span>
            </div>

            <button
              className="topbar-portfolio-button"
              type="button"
              onClick={viewPortfolio}
            >
              <Globe2 size={16} />
              <span>View site</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </header>

        <main className="premium-content">
          {activeMenu === "Dashboard" ? (
            <>
              <section className="welcome-banner">
                <div className="welcome-copy">
                  <span className="welcome-eyebrow">
                    <Sparkles size={14} />
                    YOUR CREATIVE SPACE
                  </span>

                  <h1>Welcome to your workspace.</h1>

                  <p>
                    Everything you need to manage your portfolio,
                    all in one place.
                  </p>

                  <button
                    type="button"
                    className="welcome-button"
                    onClick={() => selectSection("Projects")}
                  >
                    Manage projects
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="welcome-decoration" aria-hidden="true">
                  <div className="decoration-orbit orbit-one" />
                  <div className="decoration-orbit orbit-two" />
                  <div className="decoration-core">
                    <Sparkles size={38} />
                  </div>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">AT A GLANCE</span>
                    <h2>Your portfolio overview</h2>
                    <p>
                      A live count of the content in your workspace.
                    </p>
                  </div>
                </div>

                <div className="premium-stats-grid">
                  {stats.map(
                    ({ label, count, icon: Icon, color }) => (
                      <button
                        className="premium-stat-card"
                        key={label}
                        type="button"
                        onClick={() => selectSection(label)}
                      >
                        <div className="stat-card-top">
                          <span className={`stat-icon ${color}`}>
                            <Icon size={21} />
                          </span>
                          <ArrowUpRight
                            className="stat-arrow"
                            size={17}
                          />
                        </div>

                        <strong className="stat-number">{count}</strong>
                        <span className="stat-label">{label}</span>
                        <span className="stat-footer">
                          Open management
                          <ChevronRight size={14} />
                        </span>
                      </button>
                    )
                  )}
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">SHORTCUTS</span>
                    <h2>Quick management</h2>
                    <p>
                      Jump directly to the section you want to update.
                    </p>
                  </div>
                </div>

                <div className="premium-shortcuts-grid">
                  {menuItems
                    .filter((item) => item.label !== "Dashboard")
                    .map(({ label, icon: Icon, count }) => (
                      <button
                        key={label}
                        type="button"
                        className="premium-shortcut"
                        onClick={() => selectSection(label)}
                      >
                        <span className="shortcut-icon">
                          <Icon size={20} />
                        </span>

                        <span className="shortcut-copy">
                          <strong>{label}</strong>
                          <small>
                            {typeof count === "number"
                              ? `${count} item${count === 1 ? "" : "s"}`
                              : "Manage information"}
                          </small>
                        </span>

                        <ChevronRight
                          className="shortcut-arrow"
                          size={18}
                        />
                      </button>
                    ))}
                </div>
              </section>

              <footer className="premium-page-footer">
                <span>Admin Studio</span>
                <span>
                  Your portfolio workspace · Data stored in this browser
                </span>
              </footer>
            </>
          ) : (
            <section className="manager-page">
              <div className="manager-page-heading">
                <div>
                  <span className="section-kicker">
                    PORTFOLIO WORKSPACE
                  </span>
                  <h1>{pageTitles[activeMenu]}</h1>
                  <p>
                    Add, edit, or remove information in this section.
                  </p>
                </div>

                <span className="manager-section-count">
                  {menuItems.find(
                    (item) => item.label === activeMenu
                  )?.count ?? "EDIT"}
                </span>
              </div>

              <div className="manager-content">
                {renderManager()}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
