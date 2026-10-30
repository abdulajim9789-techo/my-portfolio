
import Section from "./Section";
import { Trophy } from "lucide-react";

export default function Achievements({ achievements = [] }) {
  return (
    <Section
      id="achievements"
      number="06"
      eyebrow="Achievements"
      title="Milestones and experiences."
    >
      <div className="achievement-grid">
        {achievements.map((a, index) => {
          const description = a.description || a.text || a.about || "";

          return (
            <article
              className="info-panel"
              key={a.id ?? a._id ?? index}
            >
              <Trophy />

              <h3>{a.title}</h3>

              {a.year && <span className="achievement-year">{a.year}</span>}

              {description && <p>{description}</p>}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
