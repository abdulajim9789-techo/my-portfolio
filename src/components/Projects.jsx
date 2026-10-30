
import { ExternalLink, Code2, FolderKanban } from "lucide-react";
import Section from "./Section";

export default function Projects({ projects = [] }) {
  return (
    <Section
      id="projects"
      number="05"
      eyebrow="Projects"
      title="Things I've built."
      text="A selection of projects I've developed and explored."
    >
      <div className="project-grid">
        {projects.map((p) => {
          const technologies = Array.isArray(p.technologies)
            ? p.technologies
            : Array.isArray(p.tech)
              ? p.tech
              : [];

          return (
            <article className="project-card" key={p.id}>
              <div className="project-cover">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="project-image"
                  />
                ) : (
                  <>
                    <FolderKanban size={34} />
                    <span>PROJECT</span>
                  </>
                )}
              </div>

              <div className="project-body">
                <h3>{p.title}</h3>

                <p className="project-description">
                  {p.description}
                </p>

                <div className="tags">
                  {technologies.map((tech, index) => (
                    <span key={`${tech}-${index}`}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {p.github && p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Code2 size={15} />
                      GitHub
                    </a>
                  )}

                  {p.live && p.live !== "#" && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
