import Section from "./Section";
import { Code2 } from "lucide-react";

export default function Skills({ skills = [] }) {
  return (
    <Section
      id="skills"
      number="03"
      eyebrow="Skills"
      title="Tools I use and skills I'm growing."
      text="My current technical stack and learning areas."
    >
      <div className="skill-grid">
        {skills.map((skill, index) => {
          const skillName =
            typeof skill === "string" ? skill : skill.name;

          const category =
            typeof skill === "string" ? "" : skill.category;

          const level =
            typeof skill === "string" ? "" : skill.level;

          return (
            <div
              className="skill-card"
              key={skill._id || `${skillName}-${index}`}
            >
              <Code2 size={20} />

              <div>
                <span>{skillName}</span>

                {category && level && (
                  <small>
                    {category} • {level}
                  </small>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}