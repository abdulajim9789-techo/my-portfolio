import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Briefcase,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function Hero({ profile = {} }) {
  /* ================================
     SMOOTH SCROLL
  ================================= */

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================================
     PROFILE INITIALS
  ================================= */

  const initials =
    profile.name
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "YN";

  /* ================================
     PROFILE DATA
  ================================= */

  const name = profile.name || "Your Name";

  const role =
    profile.role ||
    "B.Tech IT Student & Frontend Developer";

  const about =
    profile.about ||
    profile.bio ||
    "I build modern, responsive and user-friendly digital experiences.";

  const location =
    profile.location || "Tamil Nadu, India";

  const github =
    profile.github && profile.github !== "#"
      ? profile.github
      : null;

  const linkedin =
    profile.linkedin && profile.linkedin !== "#"
      ? profile.linkedin
      : null;

  const email = profile.email || "";

  return (
    <section id="home" className="hero section-shell">

      {/* =================================
          BACKGROUND GRID
      ================================= */}

      <div className="hero-grid" />

      {/* =================================
          HERO CONTENT
      ================================= */}

      <div className="hero-inner">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <motion.div
          className="hero-copy"
          initial={{
            opacity: 0,
            x: -35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
        >

          {/* Availability */}

          <div className="availability">
            <span />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Greeting */}

          <p className="kicker">
            Hello, I'm
          </p>

          {/* Name */}

          <h1>
            {name}
            <span className="gradient-text">
              .
            </span>
          </h1>

          {/* Role */}

          <h2>
            {role}
          </h2>

          {/* Description */}

          <p className="hero-description">
            {about}
          </p>

          {/* Location */}

          <div className="hero-location">
            <MapPin size={16} />
            <span>{location}</span>
          </div>

          {/* =================================
              MAIN BUTTONS
          ================================= */}

          <div className="hero-buttons">

            <button
              className="primary-button"
              type="button"
              onClick={() => go("projects")}
            >
              <span>
                View My Projects
              </span>

              <ArrowRight size={18} />
            </button>

            <a
              className="secondary-button"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={16} />

              <span>
                Download Resume
              </span>
            </a>

          </div>

          {/* =================================
              SOCIAL LINKS
          ================================= */}

          <div className="social-links">

            {/* GitHub */}

            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <Code2 size={19} />
              </a>
            ) : (
              <span
                className="social-disabled"
                aria-label="GitHub not available"
                title="GitHub not available"
              >
                <Code2 size={19} />
              </span>
            )}

            {/* LinkedIn */}

            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Briefcase size={19} />
              </a>
            ) : (
              <span
                className="social-disabled"
                aria-label="LinkedIn not available"
                title="LinkedIn not available"
              >
                <Briefcase size={19} />
              </span>
            )}

            {/* Email */}

            {email ? (
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                title={`Email ${email}`}
              >
                <Mail size={19} />
              </a>
            ) : (
              <span
                className="social-disabled"
                aria-label="Email not available"
                title="Email not available"
              >
                <Mail size={19} />
              </span>
            )}

          </div>

        </motion.div>

        {/* =================================
            RIGHT SIDE
        ================================= */}

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            scale: 0.82,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            delay: 0.15,
            ease: "easeOut",
          }}
        >

          {/* Decorative orbit */}

          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />

          {/* =================================
              PROFILE CARD
          ================================= */}

          <div className="profile-card">

            {/* Glow */}

            <div className="profile-glow" />

            {/* =================================
                PROFILE IMAGE
            ================================= */}

            <div className="avatar">

              {profile.image ? (
                <img
                  src={profile.image}
                  alt={`${name} profile`}
                  className="avatar-image"
                />
              ) : (
                <span className="avatar-initials">
                  {initials}
                </span>
              )}

            </div>

            {/* =================================
                STATUS
            ================================= */}

            <div className="profile-status">
              <Sparkles size={17} />

              <span>
                Building & Learning
              </span>
            </div>

            {/* =================================
                SKILL TAGS
            ================================= */}

            <div className="profile-tags">
              <span>React</span>
              <span>Java</span>
              <span>UI/UX</span>
            </div>

          </div>

        </motion.div>

      </div>

      {/* =================================
          SCROLL INDICATOR
      ================================= */}

      <button
        className="scroll-indicator"
        type="button"
        onClick={() => go("about")}
        aria-label="Explore about section"
      >
        <span>
          Explore my work
        </span>

        <ArrowDown size={16} />
      </button>

    </section>
  );
}