
import Section from "./Section";

const defaultItems = [
  "React component architecture",
  "Java fundamentals & DSA",
  "Responsive UI/UX",
  "Git & GitHub workflow",
  "Backend & database fundamentals",
];

export default function Learning({ learning }) {
  const items =
    Array.isArray(learning) && learning.length > 0
      ? learning
      : defaultItems;

  return (
    <Section
      id="learning"
      number="04"
      eyebrow="Learning journey"
      title="What I'm working on next."
      text="A transparent view of the technologies and habits I'm developing."
    >
      <div className="learning-list">
        {items.map((item, index) => {
          const title =
            typeof item === "string" ? item : item.title;

          const status =
            typeof item === "string"
              ? "In progress"
              : item.status || "In progress";

          return (
            <div className="learning-item" key={item.id ?? title ?? index}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <b>{title}</b>

              <i>{status}</i>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
